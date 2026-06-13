import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';

// Giriş nöqtəsi — auth statusuna görə yönləndir.
export default function Index() {
  const status = useAuthStore((s) => s.status);
  if (status === 'authenticated') return <Redirect href="/(tabs)/dashboard" />;
  return <Redirect href="/(auth)/login" />;
}
