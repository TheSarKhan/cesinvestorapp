// ── Tweaks runtime ──
// Provides the hook + UI primitives that app/shell.jsx depends on.
// In production the visual "Tweaks" dev panel is hidden (renders null),
// while useTweaks still drives the accent / start-screen defaults so the
// app behaves exactly as designed. Set window.__TWEAKS__ = true in the
// console to reveal the panel for design tinkering.

function useTweaks(defaults) {
  const [t, setT] = React.useState(defaults);
  const setTweak = React.useCallback((key, value) => {
    setT(prev => ({ ...prev, [key]: value }));
  }, []);
  return [t, setTweak];
}

const TWEAKS_VISIBLE = typeof window !== 'undefined' && window.__TWEAKS__ === true;

function TweaksPanel({ title, children }) {
  if (!TWEAKS_VISIBLE) return null;
  return (
    <div style={{
      position: 'fixed', top: 16, right: 16, zIndex: 9999,
      width: 240, padding: 14, borderRadius: 14,
      background: 'rgba(20,24,33,0.92)', color: '#fff',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
      fontFamily: 'inherit', fontSize: 13,
    }}>
      <div style={{ fontWeight: 700, marginBottom: 10, opacity: 0.85 }}>{title}</div>
      {children}
    </div>
  );
}

function TweakSection({ label, children }) {
  if (!TWEAKS_VISIBLE) return null;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.55, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
      {children}
    </div>
  );
}

function TweakColor({ label, value, options = [], onChange }) {
  if (!TWEAKS_VISIBLE) return null;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map(hex => (
          <button key={hex} onClick={() => onChange && onChange(hex)} style={{
            width: 24, height: 24, borderRadius: 8, cursor: 'pointer',
            background: hex, border: value === hex ? '2px solid #fff' : '2px solid transparent',
          }}/>
        ))}
      </div>
    </div>
  );
}

function TweakButton({ label, onClick }) {
  if (!TWEAKS_VISIBLE) return null;
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '8px 10px', borderRadius: 9, cursor: 'pointer',
      background: 'rgba(255,255,255,0.10)', color: '#fff',
      border: '1px solid rgba(255,255,255,0.16)', fontFamily: 'inherit', fontSize: 12.5,
      textAlign: 'left',
    }}>{label}</button>
  );
}

Object.assign(window, { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakButton });
