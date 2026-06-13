// Mərkəzi konfiqurasiya. API base URL `.env`-dən (EXPO_PUBLIC_ prefiksi ilə
// Expo onu avtomatik process.env-ə yükləyir).
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://192.168.1.11:8083';

export const config = {
  apiBaseUrl: API_BASE_URL,
  apiPrefix: '/api',
};

export default config;
