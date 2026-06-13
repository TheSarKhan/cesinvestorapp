import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '../../src/store/authStore';

// Qonaq qrupu — daxil olmuş istifadəçini dashboard-a yönləndir.
export default function AuthLayout() {
  const status = useAuthStore((s) => s.status);
  if (status === 'authenticated') return <Redirect href="/(tabs)/dashboard" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
