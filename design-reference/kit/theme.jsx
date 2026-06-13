// ── UI Kit · green (emerald) theme + documentation primitives ──

// Emerald brand scale (documented + applied)
const GREEN = {
  50:  '#E6F6F0', 100: '#C4EADD', 200: '#97DBC4', 300: '#5EC8A4', 400: '#25B083',
  500: '#0E9F6E', 600: '#0B7D57', 700: '#0A6245', 800: '#084E37', 900: '#063A29',
};

// Apply emerald as the brand accent (status palette stays per the system)
C.brand     = GREEN[500];
C.brandDk   = GREEN[600];
C.brandTint = GREEN[50];
C.brandLine = GREEN[100];

// Tokens we publish in the kit (RN-ready)
const TOKENS = {
  color: {
    'brand.500':   GREEN[500], 'brand.600': GREEN[600], 'brand.tint': GREEN[50], 'brand.line': GREEN[100],
    'bg':          C.bg, 'bg.sunk': C.bgSunk, 'surface': C.card, 'surface.alt': C.cardAlt,
    'border':      C.line, 'border.soft': C.lineSoft,
    'text':        C.ink, 'text.secondary': C.muted, 'text.tertiary': C.faint,
  },
  status: {
    available: C.green, rented: C.amber, transit: C.blue, service: C.purple, repair: C.red, retired: C.gray,
  },
};

// Type scale — Plus Jakarta Sans (UI) + Geist Mono (numeric/codes)
const TYPE = [
  { name: 'display',  token: 'text.display',  size: 34, lh: 40, weight: 800, sample: 'İnvestor' },
  { name: 'h1',       token: 'text.h1',       size: 26, lh: 32, weight: 700, sample: 'Texnika portfeli' },
  { name: 'h2',       token: 'text.h2',       size: 20, lh: 26, weight: 700, sample: 'Gəlir və performans' },
  { name: 'title',    token: 'text.title',    size: 16, lh: 22, weight: 700, sample: 'Cari vəziyyət' },
  { name: 'bodyLg',   token: 'text.bodyLg',   size: 15, lh: 22, weight: 500, sample: 'Aktivləriniz bir baxışda' },
  { name: 'body',     token: 'text.body',     size: 14, lh: 20, weight: 500, sample: 'İcarə müddəti və status' },
  { name: 'label',    token: 'text.label',    size: 13, lh: 18, weight: 600, sample: 'Növbəti ödəniş' },
  { name: 'caption',  token: 'text.caption',  size: 12, lh: 16, weight: 600, sample: 'Şirkətin borcu' },
  { name: 'micro',    token: 'text.micro',    size: 11, lh: 14, weight: 600, sample: 'AYLIQ GƏLİR' },
  { name: 'mono',     token: 'text.mono',     size: 13, lh: 18, weight: 600, sample: 'EQ-012 · 1700425831', mono: true },
];

// Spacing — 4pt grid
const SPACING = [
  { token: 'space.0_5', px: 2 }, { token: 'space.1', px: 4 }, { token: 'space.2', px: 8 },
  { token: 'space.3', px: 12 }, { token: 'space.4', px: 16 }, { token: 'space.5', px: 20 },
  { token: 'space.6', px: 24 }, { token: 'space.8', px: 32 }, { token: 'space.10', px: 40 }, { token: 'space.12', px: 48 },
];

// Radius
const RADII = [
  { token: 'radius.sm', px: 8 }, { token: 'radius.md', px: 12 }, { token: 'radius.input', px: 13 },
  { token: 'radius.lg', px: 14 }, { token: 'radius.xl', px: 18 }, { token: 'radius.2xl', px: 22 }, { token: 'radius.pill', px: 999 },
];

// Elevation (iOS shadow + Android elevation)
const ELEVATION = [
  { token: 'elevation.0', label: 'Flat', elevation: 0, shadow: 'none', css: 'none' },
  { token: 'elevation.1', label: 'Kart', elevation: 2, shadow: 'opacity .06 · y2 · blur8', css: '0 1px 2px rgba(20,24,33,.05), 0 4px 16px rgba(20,24,33,.03)' },
  { token: 'elevation.2', label: 'Üzən (tab/FAB)', elevation: 8, shadow: 'opacity .10 · y8 · blur28', css: '0 8px 28px rgba(20,24,33,.10)' },
  { token: 'elevation.3', label: 'Modal', elevation: 16, shadow: 'opacity .18 · y24 · blur60', css: '0 24px 60px rgba(20,24,33,.18)' },
];

// ── Documentation layout primitives ──
function KSection({ id, kicker, title, desc, children }) {
  return (
    <section id={id} style={{ marginBottom: 56, scrollMarginTop: 24 }}>
      <div style={{ marginBottom: 22 }}>
        {kicker && <div style={{ fontSize: 12, fontWeight: 700, color: C.brand, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{kicker}</div>}
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: C.ink, letterSpacing: '-0.03em' }}>{title}</h2>
        {desc && <p style={{ margin: '8px 0 0', fontSize: 14.5, color: C.muted, lineHeight: 1.55, maxWidth: 620 }}>{desc}</p>}
      </div>
      {children}
    </section>
  );
}

function KCard({ children, style, pad = 22 }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 20, padding: pad, boxShadow: '0 1px 2px rgba(20,24,33,0.04)', ...style }}>{children}</div>
  );
}

function KGrid({ children, min = 240, gap = 14, style }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap, ...style }}>{children}</div>;
}

function SubHead({ children, style }) {
  return <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink70, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 14px', ...style }}>{children}</div>;
}

// Tag chip used to label component variants
function Tag({ children, tone = 'neutral' }) {
  const tones = {
    neutral: { bg: C.bgSunk, c: C.muted },
    brand:   { bg: C.brandTint, c: C.brandDk },
    v2:      { bg: C.purpleTint, c: C.purple },
  };
  const t = tones[tone] || tones.neutral;
  return <span style={{ display: 'inline-block', fontSize: 10.5, fontWeight: 700, color: t.c, background: t.bg, borderRadius: 6, padding: '3px 7px', letterSpacing: '0.02em', verticalAlign: 'middle' }}>{children}</span>;
}

// Specimen frame — holds a live component on a subtle checker bg
function Demo({ children, label, tone, col, bg, pad = 20, align = 'flex-start' }) {
  return (
    <div style={{ gridColumn: col }}>
      {label && <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: C.muted }}>{label}</span>
        {tone && <Tag tone={tone === 'v2' ? 'v2' : 'brand'}>{tone === 'v2' ? 'v2' : tone}</Tag>}
      </div>}
      <div style={{ background: bg || C.bg, border: `1px solid ${C.line}`, borderRadius: 16, padding: pad, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: align }}>
        {children}
      </div>
    </div>
  );
}

// Code block (RN-flavoured) with light token coloring
function Code({ title, code, lang = 'ts' }) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Single pass: each token matched once, replacement is never re-scanned → no nesting.
  const re = /(\/\/[^\n]*)|('(?:[^'\\]|\\.)*'|`[^`]*`)|\b(const|import|from|export|function|return|default|interface|type|Platform)\b|\b(\d+(?:\.\d+)?)\b/g;
  const html = esc(code).replace(re, (m, comment, str, kw, num) => {
    if (comment) return `<span style="color:#8A93A0">${comment}</span>`;
    if (str)     return `<span style="color:#5EC8A4">${str}</span>`;
    if (kw)      return `<span style="color:#A78BFA;font-weight:600">${kw}</span>`;
    if (num)     return `<span style="color:#7FB4FF">${num}</span>`;
    return m;
  });
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #232A33', background: '#12161B' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', borderBottom: '1px solid #232A33' }}>
        <span style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: 999, background: c }}/>)}
        </span>
        <span style={{ fontSize: 12, color: '#8A93A0', fontFamily: "'Geist Mono', monospace", marginLeft: 6 }}>{title}</span>
        <span style={{ marginLeft: 'auto', fontSize: 10.5, color: '#5B636E', fontFamily: "'Geist Mono', monospace", textTransform: 'uppercase' }}>{lang}</span>
      </div>
      <pre style={{ margin: 0, padding: '16px 18px', overflowX: 'auto', fontFamily: "'Geist Mono', monospace", fontSize: 12.5, lineHeight: 1.7, color: '#D8DEE6' }}
        dangerouslySetInnerHTML={{ __html: html }}/>
    </div>
  );
}

Object.assign(window, { GREEN, TOKENS, TYPE, SPACING, RADII, ELEVATION, KSection, KCard, KGrid, SubHead, Tag, Demo, Code });
