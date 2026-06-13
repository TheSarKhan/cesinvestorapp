import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { registerForPushNotificationsAsync, setCurrentPushToken } from '../lib/push';
import { registerPushToken } from '../api/portal';
import { qk } from './usePortal';

// Daxil olmuş istifadəçi üçün: push token al → backend-ə qeyd et,
// bildiriş gəldikdə sayğacı yenilə, toxunulduqda aid ekrana yönləndir.
export function usePushNotifications(enabled = true) {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return undefined;
    let mounted = true;

    (async () => {
      const token = await registerForPushNotificationsAsync();
      if (token && mounted) {
        setCurrentPushToken(token);
        try {
          await registerPushToken(token, Platform.OS);
        } catch {
          // best-effort
        }
      }
    })();

    // Push gəldikdə (foreground) — siyahını/sayğacı yenilə
    const recvSub = Notifications.addNotificationReceivedListener(() => {
      queryClient.invalidateQueries({ queryKey: qk.notifications });
      queryClient.invalidateQueries({ queryKey: qk.unreadCount });
    });

    // Bildirişə toxunulduqda — aid ekrana yönləndir
    const respSub = Notifications.addNotificationResponseReceivedListener((resp) => {
      const data = resp?.notification?.request?.content?.data ?? {};
      if (data.type === 'EQUIPMENT_RENTED' && data.id) {
        router.push(`/equipment/${data.id}`);
      } else if (data.type === 'PAYMENT_RECEIVED') {
        router.push('/finance');
      } else {
        router.push('/notifications');
      }
    });

    return () => {
      mounted = false;
      recvSub.remove();
      respSub.remove();
    };
  }, [enabled, router, queryClient]);
}
