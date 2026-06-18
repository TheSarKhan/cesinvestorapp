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
  if (!hasExt && fileType) {
    if (MIME_EXT[fileType]) base += MIME_EXT[fileType];
    // Sənəd mərkəzi: fileType artıq uzantıdır (PDF, JPG, DOCX...)
    else if (/^[a-z0-9]{2,5}$/i.test(fileType)) base += '.' + fileType.toLowerCase();
  }
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

// Konkret qaimə üzrə edilmiş ödənişlər
export async function getInvoicePayments(id) {
  const { data } = await apiClient.get(`/portal/invoices/${id}/payments`);
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
// Sənəd mərkəzi: hər sənəd sourceType + sourceId ilə identifikasiya olunur.
// Qaytarır: { uri, mimeType }. Sonra expo-sharing ilə açılır.
export async function downloadDocumentToCache(sourceType, sourceId, fileName, fileType) {
  const token = await ensureAccessToken();
  const url = `${config.apiBaseUrl}${config.apiPrefix}/portal/documents/${sourceType}/${sourceId}/download`;
  const target = FileSystem.cacheDirectory + safeFileName(fileName, sourceId, fileType);
  const res = await FileSystem.downloadAsync(url, target, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 200) {
    throw new Error(`Fayl endirilə bilmədi (${res.status})`);
  }
  // fileType artıq uzantıdır (PDF...), MIME deyil — serverin content-type-ı üstünlük təşkil edir
  return { uri: res.uri, mimeType: res.headers?.['Content-Type'] || res.mimeType };
}
