// JWT payload decode + müddət yoxlaması (xarici kitabxana olmadan, Hermes-uyğun).
// ERP frontend/src/utils/jwt.js məntiqinin React Native portu.

const B64_ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// base64url → JSON string (atob Hermes-də həmişə olmaya bilər → manual decode)
function base64UrlDecode(input) {
  let str = input.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';

  let output = '';
  let buffer = 0;
  let bits = 0;

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === '=') break;
    const idx = B64_ALPHABET.indexOf(c);
    if (idx === -1) continue;
    buffer = (buffer << 6) | idx;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      output += String.fromCharCode((buffer >> bits) & 0xff);
    }
  }

  // UTF-8 decode (companyName və s. üçün — Azərbaycan hərfləri)
  try {
    return decodeURIComponent(
      output
        .split('')
        .map((ch) => '%' + ('00' + ch.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return output;
  }
}

export function decodeJwt(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(base64UrlDecode(parts[1]));
  } catch {
    return null;
  }
}

// Token müddəti bitibmi? skew = saat fərqi üçün ehtiyat (saniyə).
export function isTokenExpired(token, skewSeconds = 30) {
  const payload = decodeJwt(token);
  if (!payload || typeof payload.exp !== 'number') return true;
  const nowSec = Date.now() / 1000;
  return payload.exp <= nowSec + skewSeconds;
}
