// ── UI Kit ──

// Status badge (equipment / offer / payment)
function Badge({ map, status, sm }) {
  const m = map[status] || { label: status, color: C.gray, tint: C.grayTint };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: sm ? '2px 8px' : '4px 10px',
      borderRadius: 999, background: m.tint,
      fontSize: sm ? 11 : 12, fontWeight: 600, color: m.color,
      whiteSpace: 'nowrap', letterSpacing: '-0.01em',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: m.color }}/>
      {m.label}
    </span>
  );
}
const EqBadge   = (p) => <Badge map={EQ_STATUS} {...p}/>;
const OfferBadge= (p) => <Badge map={OFFER_STATUS} {...p}/>;
const PayBadge  = (p) => <Badge map={PAY_STATUS} {...p}/>;

// Card surface
function Card({ children, style, onClick, pad = 16, flat }) {
  return (
    <div onClick={onClick} style={{
      background: C.card,
      border: `1px solid ${C.line}`,
      borderRadius: 18,
      boxShadow: flat ? 'none' : '0 1px 2px rgba(20,24,33,0.04), 0 4px 16px rgba(20,24,33,0.03)',
      padding: pad,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

// Primary / secondary buttons
function Button({ children, onClick, variant = 'primary', full, icon, sm, style, color }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    width: full ? '100%' : 'auto',
    padding: sm ? '9px 14px' : '13px 18px',
    borderRadius: 13, fontFamily: 'inherit',
    fontSize: sm ? 13 : 14.5, fontWeight: 600, letterSpacing: '-0.01em',
    cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.15s', whiteSpace: 'nowrap',
  };
  const variants = {
    primary:   { background: color || C.brand, color: '#fff', borderColor: color || C.brand, boxShadow: '0 2px 8px rgba(217,119,6,0.22)' },
    secondary: { background: C.card, color: C.ink, borderColor: C.line },
    ghost:     { background: C.bgSunk, color: C.ink70, borderColor: 'transparent' },
    success:   { background: C.green, color: '#fff', borderColor: C.green, boxShadow: '0 2px 8px rgba(21,163,74,0.22)' },
    danger:    { background: C.card, color: C.red, borderColor: C.redTint },
    dangerSolid:{ background: C.red, color: '#fff', borderColor: C.red },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {icon}{children}
    </button>
  );
}

// Section header with optional action
function SectionHead({ title, action, onAction, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px 12px', ...style }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}>{title}</h2>
      {action && (
        <button onClick={onAction} style={{
          display: 'inline-flex', alignItems: 'center', gap: 2,
          background: 'none', border: 'none', cursor: 'pointer',
          color: C.brand, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', padding: 0,
        }}>{action}<Icon.chevR size={15}/></button>
      )}
    </div>
  );
}

// Screen header (title + optional back + bell)
function ScreenHeader({ title, subtitle, onBack, bell, unread, onBell, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '6px 18px 14px',
    }}>
      {onBack && (
        <button onClick={onBack} style={iconBtn}>
          <Icon.chevL size={20}/>
        </button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {subtitle && <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginBottom: 2 }}>{subtitle}</div>}
        <h1 style={{ margin: 0, fontSize: onBack ? 19 : 26, fontWeight: 700, color: C.ink, letterSpacing: '-0.03em', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</h1>
      </div>
      {right}
      {bell && (
        <button onClick={onBell} style={{ ...iconBtn, position: 'relative' }}>
          <Icon.bell size={21}/>
          {unread > 0 && (
            <span style={{
              position: 'absolute', top: 6, right: 6, minWidth: 16, height: 16, padding: '0 4px',
              borderRadius: 999, background: C.red, color: '#fff',
              fontSize: 10, fontWeight: 700, display: 'grid', placeItems: 'center',
              border: `2px solid ${C.bg}`,
            }}>{unread}</span>
          )}
        </button>
      )}
    </div>
  );
}

const iconBtn = {
  width: 42, height: 42, borderRadius: 13, flexShrink: 0,
  background: C.card, border: `1px solid ${C.line}`,
  color: C.ink, cursor: 'pointer',
  display: 'grid', placeItems: 'center',
};

// Equipment illustration thumbnail (abstract, monochrome over tint)
function EqThumb({ kind = 'excavator', accent = C.brand, size = 56, radius = 14 }) {
  const shapes = {
    excavator: (
      <g>
        <rect x="8" y="40" width="40" height="6" rx="1.5" fill={accent} opacity="0.32"/>
        {[12,18,24,30,36,42].map(x => <circle key={x} cx={x} cy={43} r="3" fill={accent} opacity="0.55"/>)}
        <rect x="20" y="24" width="18" height="14" rx="2.5" fill={accent}/>
        <rect x="24" y="27" width="9" height="6" rx="1" fill="#fff" opacity="0.55"/>
        <path d="M38 30 L52 16 L56 20 L43 33 Z" fill={accent} opacity="0.75"/>
        <path d="M52 16 L58 12 L62 19 L56 20 Z" fill={accent}/>
      </g>
    ),
    crane: (
      <g>
        <rect x="14" y="42" width="32" height="6" rx="1.5" fill={accent} opacity="0.32"/>
        {[18,24,30,36,42].map(x => <circle key={x} cx={x} cy={45} r="2.6" fill={accent} opacity="0.55"/>)}
        <rect x="22" y="32" width="18" height="11" rx="2" fill={accent}/>
        <rect x="25" y="35" width="7" height="5" rx="1" fill="#fff" opacity="0.55"/>
        <path d="M31 32 L31 12" stroke={accent} strokeWidth="3" strokeLinecap="round"/>
        <path d="M31 14 L56 8" stroke={accent} strokeWidth="3" strokeLinecap="round"/>
        <path d="M53 9 L53 20" stroke={accent} strokeWidth="1.6" opacity="0.7"/>
      </g>
    ),
    backhoe: (
      <g>
        <rect x="12" y="40" width="34" height="6" rx="1.5" fill={accent} opacity="0.32"/>
        <circle cx="19" cy="45" r="5" fill={accent} opacity="0.55"/>
        <circle cx="42" cy="45" r="4" fill={accent} opacity="0.55"/>
        <rect x="24" y="24" width="16" height="13" rx="2.5" fill={accent}/>
        <rect x="27" y="27" width="9" height="5" rx="1" fill="#fff" opacity="0.55"/>
        <path d="M40 30 L54 24 L57 30 L54 36 L40 35 Z" fill={accent} opacity="0.75"/>
        <path d="M12 30 L6 38 L10 40 L16 34 Z" fill={accent} opacity="0.7"/>
      </g>
    ),
    loader: (
      <g>
        <rect x="16" y="40" width="30" height="6" rx="1.5" fill={accent} opacity="0.32"/>
        <circle cx="22" cy="45" r="5" fill={accent} opacity="0.55"/>
        <circle cx="40" cy="45" r="5" fill={accent} opacity="0.55"/>
        <rect x="26" y="26" width="16" height="12" rx="2.5" fill={accent}/>
        <rect x="29" y="29" width="9" height="5" rx="1" fill="#fff" opacity="0.55"/>
        <path d="M26 36 L12 32 L10 40 L24 40 Z" fill={accent} opacity="0.75"/>
      </g>
    ),
    generator: (
      <g>
        <rect x="12" y="22" width="40" height="22" rx="3" fill={accent} opacity="0.32"/>
        <rect x="16" y="26" width="14" height="14" rx="2" fill={accent}/>
        <circle cx="40" cy="33" r="5" fill="none" stroke={accent} strokeWidth="2.4"/>
        <circle cx="40" cy="33" r="1.5" fill={accent}/>
        <rect x="17" y="44" width="6" height="4" rx="1" fill={accent} opacity="0.6"/>
        <rect x="41" y="44" width="6" height="4" rx="1" fill={accent} opacity="0.6"/>
        <path d="M18 18v4M26 18v4M38 18v4M46 18v4" stroke={accent} strokeWidth="2" opacity="0.5"/>
      </g>
    ),
  };
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, flexShrink: 0,
      background: `linear-gradient(150deg, ${accent}1f, ${accent}0a)`,
      border: `1px solid ${accent}26`,
      position: 'relative', overflow: 'hidden',
    }}>
      <svg viewBox="0 0 64 56" width="100%" height="100%" style={{ display: 'block' }}>
        {shapes[kind] || shapes.excavator}
      </svg>
    </div>
  );
}

// Pull-to-refresh hint pill (decorative, top of scroll views)
function RefreshHint() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2px 0 10px' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 11, color: C.faint, fontWeight: 600,
      }}>
        <Icon.refresh size={13}/> Yeniləmək üçün dartın
      </div>
    </div>
  );
}

// Stat tile (label + big number)
function StatTile({ label, value, sub, icon, accent = C.brand, delta }) {
  return (
    <Card pad={13} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{label}</span>
        {icon && (
          <span style={{ width: 26, height: 26, borderRadius: 8, background: `${accent}16`, color: accent, display: 'grid', placeItems: 'center' }}>{icon}</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: C.ink, letterSpacing: '-0.025em', fontFeatureSettings: '"tnum"' }}>{value}</span>
        {sub && <span style={{ fontSize: 12.5, color: C.muted, fontWeight: 600 }}>{sub}</span>}
      </div>
      {delta && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: delta.up ? C.green : C.red, fontSize: 12, fontWeight: 700 }}>
          {delta.up ? <Icon.trendUp size={13}/> : <Icon.trendDown size={13}/>}{delta.text}
        </div>
      )}
    </Card>
  );
}

// Empty state
function Empty({ icon, title, sub }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ width: 56, height: 56, margin: '0 auto 14px', borderRadius: 16, background: C.bgSunk, color: C.faint, display: 'grid', placeItems: 'center' }}>{icon || <Icon.search size={24}/>}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 4 }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: C.muted, maxWidth: 240, margin: '0 auto', lineHeight: 1.5 }}>{sub}</div>}
    </div>
  );
}

// Inner tabs (segmented)
function Segmented({ tabs, value, onChange, style }) {
  return (
    <div style={{ display: 'flex', gap: 4, background: C.bgSunk, borderRadius: 12, padding: 4, ...style }}>
      {tabs.map(t => {
        const active = value === t.value;
        return (
          <button key={t.value} onClick={() => onChange(t.value)} style={{
            flex: 1, padding: '8px 0', borderRadius: 9, border: 'none',
            background: active ? C.card : 'transparent',
            color: active ? C.ink : C.muted,
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            boxShadow: active ? '0 1px 3px rgba(20,24,33,0.10)' : 'none',
            transition: 'all 0.15s',
          }}>{t.label}</button>
        );
      })}
    </div>
  );
}

// Labeled detail row
function InfoRow({ label, value, mono, icon, last, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
      borderBottom: last ? 'none' : `1px solid ${C.lineSoft}`,
      cursor: onClick ? 'pointer' : 'default',
    }}>
      {icon && <span style={{ color: C.faint }}>{icon}</span>}
      <span style={{ fontSize: 13.5, color: C.muted, flex: 1 }}>{label}</span>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink, fontFamily: mono ? "'Geist Mono', monospace" : 'inherit', textAlign: 'right' }}>{value}</span>
      {onClick && <Icon.chevR size={15} style={{ color: C.faint }}/>}
    </div>
  );
}

Object.assign(window, {
  Badge, EqBadge, OfferBadge, PayBadge, Card, Button, SectionHead, ScreenHeader,
  iconBtn, EqThumb, RefreshHint, StatTile, Empty, Segmented, InfoRow,
});
