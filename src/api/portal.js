// İnvestor portal API — /api/portal/* (hamısı investor JWT ilə scoped).
// Bütün cavablar ApiResponse<T> = {success, message, data}. data qaytarılır.
import * as FileSystem from 'expo-file-system/legacy';
import { apiClient, ensureAccessToken } from './client';
import { config } from '../config';

// MIME → uzantı (fayl adında uzantı yoxdursa)
const MIME_EXT = {
  'application/pdf': '.pdf',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
};

function safeFileName(name, id, fileType) {
  let base = (name || `sened-${id}`).replace(/[^\w.\-]+/g, '_');
  const hasExt = /\.[a-z0-9]{2,5}$/i.test(base);
  if (!hasExt && fileType && MIME_EXT[fileType]) base += MIME_EXT[fileType];
  return base;
}

export async function getDashboard() {
  const { data } = await apiClient.get('/portal/dashboard');
  return data.data;
}

export async function getEquipmentList() {
  const { data } = await apiClient.get('/portal/equipment');
  return data.data;
}

export async function getEquipmentDetail(id) {
  const { data } = await apiClient.get(`/portal/equipment/${id}`);
  return data.data;
}

export async function getEquipmentHistory(id) {
  const { data } = await apiClient.get(`/portal/equipment/${id}/history`);
  return data.data;
}

export async function getEquipmentEarnings(id) {
  const { data } = await apiClient.get(`/portal/equipment/${id}/earnings`);
  return data.data;
}

export async function getInvoices() {
  const { data } = await apiClient.get('/portal/invoices');
  return data.data;
}

export async function getPayments() {
  const { data } = await apiClient.get('/portal/payments');
  return data.data;
}

export async function getDocuments() {
  const { data } = await apiClient.get('/portal/documents');
  return data.data;
}

export async function getProfile() {
  const { data } = await apiClient.get('/portal/me');
  return data.data;
}

export async function changePassword(oldPassword, newPassword) {
  const { data } = await apiClient.post('/portal/change-password', {
    oldPassword,
    newPassword,
  });
  return data;
}

// ─── Push token + bildirişlər ──────────────────────────────────────────────

export async function registerPushToken(token, platform) {
  const { data } = await apiClient.post('/portal/push-token', { token, platform });
  return data;
}

export async function removePushToken(token) {
  const { data } = await apiClient.post('/portal/push-token/remove', { token });
  return data;
}

export async function getNotifications() {
  const { data } = await apiClient.get('/portal/notifications');
  return data.data;
}

export async function getUnreadCount() {
  const { data } = await apiClient.get('/portal/notifications/unread-count');
  return data.data;
}

export async function markNotificationRead(id) {
  const { data } = await apiClient.post(`/portal/notifications/${id}/read`);
  return data;
}

export async function markAllNotificationsRead() {
  const { data } = await apiClient.post('/portal/notifications/read-all');
  return data;
}

// Sənədi keşə endir (auth header ilə — downloadAsync interceptor-dan kənardır).
// Qaytarır: { uri, mimeType }. Sonra expo-sharing ilə açılır.
export async function downloadDocumentToCache(documentId, fileName, fileType) {
  const token = await ensureAccessToken();
  const url = `${config.apiBaseUrl}${config.apiPrefix}/portal/documents/${documentId}/download`;
  const target = FileSystem.cacheDirectory + safeFileName(fileName, documentId, fileType);
  const res = await FileSystem.downloadAsync(url, target, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 200) {
    throw new Error(`Fayl endirilə bilmədi (${res.status})`);
  }
  return { uri: res.uri, mimeType: fileType || res.mimeType };
}
