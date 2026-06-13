// Formatlayıcılar — core.jsx portu. AZN: minlik "." + onluq ","; tarix gün.ay.il.

export function fmtNum(n, dec = 0) {
  if (n == null || isNaN(n)) n = 0;
  const fixed = Math.abs(n).toFixed(dec);
  let [int, frac] = fixed.split('.');
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (n < 0 ? '−' : '') + int + (frac ? ',' + frac : '');
}

// "12.480,00 ₼"
export function azn(n, dec = 2) {
  return fmtNum(n, dec) + ' ₼';
}

// Böyük başlıq üçün tam: "284.650 ₼"
export function aznWhole(n) {
  return fmtNum(Math.round(n ?? 0), 0) + ' ₼';
}

// "gün.ay.il" — Date və ya "YYYY-MM-DD" qəbul edir
export function azDate(d) {
  if (!d) return '—';
  const dt = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(dt.getTime())) return '—';
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${dt.getFullYear()}`;
}

export const AZ_MONTHS = [
  'Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn',
  'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek',
];
