// Token saxlama: yaddaşda (sync — interceptor üçün) + expo-secure-store (davamlı).
// localStorage-in (ERP) React Native qarşılığı. SecureStore async olduğu üçün
// tokenlər başlanğıcda hydrate edilib yaddaşda saxlanır.

import * as SecureStore from 'expo-secure-store';

const KEY_ACCESS = 'invorent_access_token';
const KEY_REFRESH = 'invorent_refresh_token';
const KEY_INVESTOR = 'invorent_investor';

let accessToken = null;
let refreshToken = null;

export const tokenStore = {
  getAccessToken: () => accessToken,
  getRefreshToken: () => refreshToken,

  // Login / refresh-dən sonra
  async setTokens({ accessToken: at, refreshToken: rt }) {
    accessToken = at ?? null;
    refreshToken = rt ?? null;
    const ops = [];
    if (at) ops.push(SecureStore.setItemAsync(KEY_ACCESS, at));
    if (rt) ops.push(SecureStore.setItemAsync(KEY_REFRESH, rt));
    await Promise.all(ops);
  },

  async setInvestor(investor) {
    if (investor) {
      await SecureStore.setItemAsync(KEY_INVESTOR, JSON.stringify(investor));
    }
  },

  async clear() {
    accessToken = null;
    refreshToken = null;
    await Promise.all([
      SecureStore.deleteItemAsync(KEY_ACCESS),
      SecureStore.deleteItemAsync(KEY_REFRESH),
      SecureStore.deleteItemAsync(KEY_INVESTOR),
    ]);
  },

  // App açılışında çağrılır — saxlanmış tokenləri yaddaşa yükləyir.
  async hydrate() {
    const [at, rt, inv] = await Promise.all([
      SecureStore.getItemAsync(KEY_ACCESS),
      SecureStore.getItemAsync(KEY_REFRESH),
      SecureStore.getItemAsync(KEY_INVESTOR),
    ]);
    accessToken = at ?? null;
    refreshToken = rt ?? null;
    let investor = null;
    if (inv) {
      try {
        investor = JSON.parse(inv);
      } catch {
        investor = null;
      }
    }
    return { accessToken, refreshToken, investor };
  },
};

export default tokenStore;
