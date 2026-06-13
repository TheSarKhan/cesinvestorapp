// Portal data hook-ları — TanStack Query.
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as portal from '../api/portal';

export const qk = {
  dashboard: ['portal', 'dashboard'],
  equipment: ['portal', 'equipment'],
  equipmentDetail: (id) => ['portal', 'equipment', String(id)],
  equipmentHistory: (id) => ['portal', 'equipment', String(id), 'history'],
  equipmentEarnings: (id) => ['portal', 'equipment', String(id), 'earnings'],
  invoices: ['portal', 'invoices'],
  payments: ['portal', 'payments'],
  documents: ['portal', 'documents'],
  profile: ['portal', 'me'],
  notifications: ['portal', 'notifications'],
  unreadCount: ['portal', 'notifications', 'unread-count'],
};

export const useDashboard = () =>
  useQuery({ queryKey: qk.dashboard, queryFn: portal.getDashboard });

export const useEquipmentList = () =>
  useQuery({ queryKey: qk.equipment, queryFn: portal.getEquipmentList });

export const useEquipmentDetail = (id) =>
  useQuery({
    queryKey: qk.equipmentDetail(id),
    queryFn: () => portal.getEquipmentDetail(id),
    enabled: id != null,
  });

export const useEquipmentHistory = (id) =>
  useQuery({
    queryKey: qk.equipmentHistory(id),
    queryFn: () => portal.getEquipmentHistory(id),
    enabled: id != null,
  });

export const useEquipmentEarnings = (id) =>
  useQuery({
    queryKey: qk.equipmentEarnings(id),
    queryFn: () => portal.getEquipmentEarnings(id),
    enabled: id != null,
  });

export const useInvoices = () =>
  useQuery({ queryKey: qk.invoices, queryFn: portal.getInvoices });

export const usePayments = () =>
  useQuery({ queryKey: qk.payments, queryFn: portal.getPayments });

export const useDocuments = () =>
  useQuery({ queryKey: qk.documents, queryFn: portal.getDocuments });

export const useProfile = () =>
  useQuery({ queryKey: qk.profile, queryFn: portal.getProfile });

export const useChangePassword = () =>
  useMutation({
    mutationFn: ({ oldPassword, newPassword }) =>
      portal.changePassword(oldPassword, newPassword),
  });

// ─── Bildirişlər ──────────────────────────────────────────────────────────────

export const useNotifications = () =>
  useQuery({ queryKey: qk.notifications, queryFn: portal.getNotifications });

export const useUnreadCount = () =>
  useQuery({
    queryKey: qk.unreadCount,
    queryFn: portal.getUnreadCount,
    refetchInterval: 60_000, // dövri yoxla (push gəlməsə də yenilənsin)
  });

export const useMarkNotificationRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => portal.markNotificationRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.notifications });
      qc.invalidateQueries({ queryKey: qk.unreadCount });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => portal.markAllNotificationsRead(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.notifications });
      qc.invalidateQueries({ queryKey: qk.unreadCount });
    },
  });
};
