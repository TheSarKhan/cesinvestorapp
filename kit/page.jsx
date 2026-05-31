// ── UI Kit page shell ──

const NAV = [
  { id: 'color', label: 'Rəng' },
  { id: 'type', label: 'Tipografiya' },
  { id: 'scale', label: 'Spacing · Radius' },
  { id: 'icons', label: 'İkonlar' },
  { id: 'components', label: 'Komponentlər' },
  { id: 'rn', label: 'React Native' },
];

function KitPage() {
  const [active, setActive] = React.useState('color');

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActive(id);
  };

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let cur = NAV[0].id;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.offsetTop <= y) cur = n.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {/* Top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(244,245,247,0.82)', backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: `1px solid ${C.line}`,
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(150deg, ${C.brand}, ${C.brandDk})`, display: 'grid', placeItems: 'center', color: '#fff' }}><Icon.truck size={19}/></div>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: C.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>Invorent UI Kit</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>React Native · Design System</div>
            </div>
          </div>
          <nav style={{ marginLeft: 'auto', display: 'flex', gap: 2 }} className="kit-nav">
            {NAV.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} style={{
                padding: '7px 12px', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 13, fontWeight: 600,
                background: active === n.id ? C.brandTint : 'transparent',
                color: active === n.id ? C.brandDk : C.muted,
              }}>{n.label}</button>
            ))}
          </nav>
          <a href="index.html" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none',
            padding: '8px 14px', borderRadius: 10, background: C.brand, color: '#fff', fontSize: 13, fontWeight: 600,
            boxShadow: '0 2px 8px rgba(14,159,110,0.22)',
          }}>Tətbiq <Icon.arrowR size={16}/></a>
        </div>
      </header>

      {/* Hero */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 32px 8px' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.brand, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>İnvestor Portalı · v2.4</div>
        <h1 style={{ margin: 0, fontSize: 44, fontWeight: 800, color: C.ink, letterSpacing: '-0.04em', lineHeight: 1.05, maxWidth: 760 }}>
          Komponent kitabxanası və<br/>dizayn tokenləri
        </h1>
        <p style={{ margin: '16px 0 0', fontSize: 16, color: C.muted, lineHeight: 1.55, maxWidth: 600 }}>
          İşıqlı fintech tema, emerald vurğu rəngi və tam Azərbaycan dili. Bütün foundation-lar və komponentlər React Native development üçün hazırlanıb — eyni kod həm bu sənədi, həm tətbiqi qidalandırır.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
          {[['Emerald', C.brand],['İşıqlı tema', C.ink],['5 tab + v2', C.purple],['AZ · ₼', C.amber]].map(([l,c]) => (
            <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 999, background: C.card, border: `1px solid ${C.line}`, fontSize: 13, fontWeight: 600, color: C.ink70, whiteSpace: 'nowrap' }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: c }}/>{l}
            </span>
          ))}
        </div>
      </div>

      {/* Sections */}
      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 32px 80px' }}>
        <ColorFoundations/>
        <TypeFoundations/>
        <ScaleFoundations/>
        <IconFoundations/>
        <ComponentGallery/>
        <DevNotes/>
      </main>

      <footer style={{ borderTop: `1px solid ${C.line}`, background: C.card }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12.5, color: C.faint, fontFamily: "'Geist Mono', monospace" }}>INVORENT · UI KIT · v2.4.1</span>
          <a href="index.html" style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 600, color: C.brand, textDecoration: 'none' }}>Tətbiqə keç →</a>
        </div>
      </footer>

      <style>{`
        @media (max-width: 920px) { .kit-nav { display: none !important; } }
      `}</style>
    </div>
  );
}

Object.assign(window, { KitPage });
