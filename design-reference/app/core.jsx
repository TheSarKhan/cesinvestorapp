// ── Invorent Investor App · Design tokens & helpers ──

const C = {
  // Surfaces
  bg:        '#F4F5F7',   // app background
  bgSunk:    '#EEF0F3',
  card:      '#FFFFFF',
  cardAlt:   '#FAFBFC',
  line:      '#E7E9ED',   // hairline borders
  lineSoft:  '#EFF1F4',

  // Text
  ink:       '#15181D',   // primary
  ink70:     '#3D434C',
  muted:     '#6B727D',   // secondary
  faint:     '#9AA1AC',   // tertiary / labels

  // Brand — amber/gold (ERP continuity)
  brand:     '#D97706',
  brandDk:   '#B45309',
  brandTint: '#FEF4E6',
  brandLine: '#F6DDB8',

  // Status colors
  green:     '#15A34A',  greenTint:  '#E6F6EC',
  blue:      '#2563EB',  blueTint:   '#E7EEFE',
  purple:    '#7C3AED',  purpleTint: '#F0E9FE',
  red:       '#DC2626',  redTint:    '#FCEAEA',
  gray:      '#737B86',  grayTint:   '#EEF0F3',
  amber:     '#D97706',  amberTint:  '#FEF4E6',

  white:     '#FFFFFF',
};

// Equipment status → {label, color, tint}
const EQ_STATUS = {
  available: { label: 'Mövcuddur',     color: C.green,  tint: C.greenTint  },
  rented:    { label: 'İcarədə',       color: C.amber,  tint: C.amberTint  },
  transit:   { label: 'Yoldadır',      color: C.blue,   tint: C.blueTint   },
  service:   { label: 'Baxışda',       color: C.purple, tint: C.purpleTint },
  repair:    { label: 'Təmirdə',       color: C.red,    tint: C.redTint    },
  retired:   { label: 'İstismardan çıxıb', color: C.gray, tint: C.grayTint },
};

// Offer status
const OFFER_STATUS = {
  pending:  { label: 'Gözləyir',     color: C.amber, tint: C.amberTint },
  accepted: { label: 'Qəbul edildi', color: C.green, tint: C.greenTint },
  declined: { label: 'Rədd edildi',  color: C.red,   tint: C.redTint   },
};

// Invoice / payment status
const PAY_STATUS = {
  paid:     { label: 'Ödənilib',  color: C.green, tint: C.greenTint },
  pending:  { label: 'Gözləyir',  color: C.amber, tint: C.amberTint },
  scheduled:{ label: 'Planlaşıb', color: C.blue,  tint: C.blueTint  },
  overdue:  { label: 'Gecikmiş',  color: C.red,   tint: C.redTint   },
};

// ── Formatters (AZN, minlik ayraç "." + onluq ",") ──
function fmtNum(n, dec = 0) {
  const fixed = Math.abs(n).toFixed(dec);
  let [int, frac] = fixed.split('.');
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (n < 0 ? '−' : '') + int + (frac ? ',' + frac : '');
}
// Currency: "12.480,00 ₼"
function azn(n, dec = 2) {
  return fmtNum(n, dec) + ' ₼';
}
// Compact currency for big headline: "284.650 ₼"
function aznWhole(n) {
  return fmtNum(Math.round(n), 0) + ' ₼';
}
// Date gün.ay.il
function azDate(d) {
  // accepts Date or "YYYY-MM-DD"
  const dt = typeof d === 'string' ? new Date(d) : d;
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${dt.getFullYear()}`;
}
const AZ_MONTHS = ['Yan','Fev','Mar','Apr','May','İyn','İyl','Avq','Sen','Okt','Noy','Dek'];

Object.assign(window, { C, EQ_STATUS, OFFER_STATUS, PAY_STATUS, fmtNum, azn, aznWhole, azDate, AZ_MONTHS });
