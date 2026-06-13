// İnvestor auth state — Zustand. ERP authStore-un RN portu.
// status: 'loading' (hydrate gözləyir) | 'authenticated' | 'unauthenticated'

import { create } from 'zustand';
import { tokenStore } from '../api/tokenStore';
import { setOnAuthFailure } from '../api/client';
import { login as apiLogin, logout as apiLogout } from '../api/auth';
import { removePushToken } from '../api/portal';
import { getCurrentPushToken } from '../lib/push';
import { isTokenExpired } from '../lib/jwt';

export const useAuthStore = create((set, get) => ({
  status: 'loading',
  investor: null,

  // App açılışında: saxlanmış sessiyanı bərpa et.
  hydrate: async () => {
    const { accessToken, refreshToken, investor } = await tokenStore.hydrate();
    const hasValidSession =
      (accessToken && !isTokenExpired(accessToken)) ||
      (refreshToken && !isTokenExpired(refreshToken, 0));

    if (hasValidSession) {
      set({ status: 'authenticated', investor: investor ?? null });
    } else {
      await tokenStore.clear();
      set({ status: 'unauthenticated', investor: null });
    }
  },

  // Email + şifrə ilə giriş. Uğursuzluqda exception atılır (ekran tutur).
  login: async (email, password) => {
    const data = await apiLogin(email, password);
    await tokenStore.setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    await tokenStore.setInvestor(data.investor);
    set({ status: 'authenticated', investor: data.investor ?? null });
    return data.investor;
  },

  logout: async () => {
    // Push token-i backend-dən sil (best-effort, sessiya hələ keçərli ikən)
    const pushToken = getCurrentPushToken();
    if (pushToken) {
      try {
        await removePushToken(pushToken);
      } catch {
        // best-effort
      }
    }
    const refreshToken = tokenStore.getRefreshToken();
    await apiLogout(refreshToken);
    await tokenStore.clear();
    set({ status: 'unauthenticated', investor: null });
  },

  // Interceptor refresh-i tam uğursuz olduqda (məcburi çıxış).
  forceLogout: () => {
    set({ status: 'unauthenticated', investor: null });
  },
}));

// client.js → authStore dövri import-dan qaçmaq üçün callback qeydiyyatı.
setOnAuthFailure(() => {
  useAuthStore.getState().forceLogout();
});

export default useAuthStore;
