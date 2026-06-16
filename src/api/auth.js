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

// ───── Şifrəmi unutdum (OTP axını) — public, bare axios ─────────────────────

// 1) Email-ə 6 rəqəmli OTP göndər
export async function forgotPassword(email) {
  const { data } = await axios.post(`${BASE_URL}/investor-auth/forgot-password`, { email });
  return data;
}

// 2) OTP-ni doğrula → { verificationToken, message }
export async function verifyOtp(email, otp) {
  const { data } = await axios.post(`${BASE_URL}/investor-auth/verify-otp`, { email, otp });
  return data.data;
}

// 3) Verification token ilə yeni şifrə təyin et
export async function resetPassword(verificationToken, newPassword) {
  const { data } = await axios.post(`${BASE_URL}/investor-auth/reset-password`, {
    verificationToken,
    newPassword,
  });
  return data;
}
