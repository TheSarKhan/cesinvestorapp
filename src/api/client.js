// Axios instance — investor portal API.
// ERP frontend/src/api/axios.js məntiqinin React Native portu:
//  • request interceptor: access token vaxtı bitibsə proaktiv refresh
//  • response interceptor: 401 → refresh → retry, paralel sorğular üçün növbə
// Fərqlər: localStorage → tokenStore (yaddaş+SecureStore), tam baseURL (proxy yox),
// refresh endpoint /api/investor-auth/refresh, toast yox (ekranlar idarə edir).

import axios from 'axios';
import { config } from '../config';
import { tokenStore } from './tokenStore';
import { isTokenExpired } from '../lib/jwt';

const BASE_URL = `${config.apiBaseUrl}${config.apiPrefix}`; // məs. http://192.168.1.11:8083/api

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

// Auth tələb etməyən endpointlər
const PUBLIC_ENDPOINTS = ['/investor-auth/login', '/investor-auth/refresh'];

// Refresh uğursuz olduqda authStore tərəfindən qeyd olunan callback (logout).
let onAuthFailure = null;
export function setOnAuthFailure(fn) {
  onAuthFailure = fn;
}

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

// Refresh — interceptor rekursiyasından qaçmaq üçün bare axios.
async function doRefresh() {
  const refreshToken = tokenStore.getRefreshToken();
  if (!refreshToken || isTokenExpired(refreshToken, 0)) {
    throw new Error('Refresh token yoxdur və ya vaxtı bitib');
  }
  const { data } = await axios.post(`${BASE_URL}/investor-auth/refresh`, {
    refreshToken,
  });
  const payload = data?.data ?? {};
  await tokenStore.setTokens({
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
  });
  return payload.accessToken;
}

function handleAuthFailure() {
  tokenStore.clear();
  if (onAuthFailure) onAuthFailure();
}

// Etibarlı access token qaytarır — lazımsa refresh edir.
// axios interceptor-undan kənar istifadə üçün (məs. expo-file-system downloadAsync).
export async function ensureAccessToken() {
  const access = tokenStore.getAccessToken();
  if (access && !isTokenExpired(access)) return access;

  if (isRefreshing) {
    return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }));
  }
  isRefreshing = true;
  try {
    const token = await doRefresh();
    processQueue(null, token);
    return token;
  } catch (e) {
    processQueue(e, null);
    handleAuthFailure();
    throw e;
  } finally {
    isRefreshing = false;
  }
}

// ── Request interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  async (cfg) => {
    const isPublic = PUBLIC_ENDPOINTS.some((ep) => cfg.url?.includes(ep));
    if (isPublic) return cfg;

    const accessToken = tokenStore.getAccessToken();
    const refreshToken = tokenStore.getRefreshToken();

    if (!accessToken && !refreshToken) {
      handleAuthFailure();
      return Promise.reject(new Error('Token yoxdur'));
    }

    // Access bitibsə — proaktiv refresh
    if (accessToken && isTokenExpired(accessToken)) {
      if (!refreshToken || isTokenExpired(refreshToken, 0)) {
        handleAuthFailure();
        return Promise.reject(new Error('Session vaxtı bitdi'));
      }

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await doRefresh();
          processQueue(null, newToken);
          cfg.headers.Authorization = `Bearer ${newToken}`;
        } catch (e) {
          processQueue(e, null);
          handleAuthFailure();
          return Promise.reject(new Error('Session vaxtı bitdi'));
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          cfg.headers.Authorization = `Bearer ${token}`;
          return cfg;
        });
      }
    } else if (accessToken) {
      cfg.headers.Authorization = `Bearer ${accessToken}`;
    }

    return cfg;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: 401 → refresh → retry ──────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const newToken = await doRefresh();
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        handleAuthFailure();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Backend ApiResponse / axios xətasından oxunaqlı mesaj çıxar.
export function extractErrorMessage(error, fallback = 'Xəta baş verdi. Yenidən cəhd edin.') {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message === 'Network Error') return 'Serverə qoşulmaq olmadı. Şəbəkəni yoxlayın.';
  if (error?.code === 'ECONNABORTED') return 'Sorğu vaxtı bitdi. Yenidən cəhd edin.';
  return fallback;
}

export default apiClient;
