// İnvestor portal autentifikasiyası — /api/investor-auth/*
// Diqqət: bu, ERP-nin normal personel girişi (/api/auth) DEYİL.
// Yalnız ERP-də portal hesabı aktiv (portalEnabled) olan investor daxil ola bilər.

import axios from 'axios';
import { config } from '../config';
import { apiClient } from './client';

const BASE_URL = `${config.apiBaseUrl}${config.apiPrefix}`;

// Login — bare axios (public endpoint, interceptor lazım deyil).
// data: { accessToken, refreshToken, investor: {id, companyName, accountEmail, contactPerson, contactPhone} }
export async function login(email, password) {
  const { data } = await axios.post(`${BASE_URL}/investor-auth/login`, {
    email,
    password,
  });
  return data.data;
}

export async function logout(refreshToken) {
  if (!refreshToken) return;
  try {
    await axios.post(`${BASE_URL}/investor-auth/logout`, { refreshToken });
  } catch {
    // Logout backend xətası sessiyanın yerli təmizlənməsinə mane olmamalıdır.
  }
}

// Authenticated investor profili — /api/portal/me
export async function getMe() {
  const { data } = await apiClient.get('/portal/me');
  return data.data;
}
