// ── App shell: frame, routing stack, tab bar, login flow, tweaks ──

const ACCENTS = {
  emerald:{ brand: '#0E9F6E', brandDk: '#0B7D57', brandTint: '#E6F6F0', brandLine: '#C4EADD' },
  amber:  { brand: '#D97706', brandDk: '#B45309', brandTint: '#FEF4E6', brandLine: '#F6DDB8' },
  ocean:  { brand: '#2563EB', brandDk: '#1D4ED8', brandTint: '#E7EEFE', brandLine: '#C7D9FB' },
  graph:  { brand: '#7C3AED', brandDk: '#6D28D9', brandTint: '#F0E9FE', brandLine: '#DCCBFB' },
};

const TWK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "emerald",
  "startScreen": "app"
}/*EDITMODE-END*/;

function applyAccent(key) {
  const a = ACCENTS[key] || ACCENTS.emerald;
  C.brand = a.brand; C.brandDk = a.brandDk; C.brandTint = a.brandTint; C.brandLine = a.brandLine;
  // Status palette stays fixed (per the documented system) — accent only drives brand/primary.
}

const TABS = [
  { id: 'dashboard', label: 'Əsas',     icon: Icon.home },
  { id: 'equipment', label: 'Texnika',  icon: Icon.truck },
  { id: 'finance',   label: 'Maliyyə',  icon: Icon.wallet },
  { id: 'documents', label: 'Sənədlər', icon: Icon.docs },
  { id: 'profile',   label: 'Profil',   icon: Icon.user },
];

function App() {
  const [t, setTweak] = useTweaks(TWK_DEFAULTS);
  applyAccent(t.accent);

  const [authed, setAuthed] = React.useState(t.startScreen === 'app');
  const [forgot, setForgot] = React.useState(false);
  const [tab, setTab] = React.useState('dashboard');
  const [financeSub, setFinanceSub] = React.useState(null);
  const [stack, setStack] = React.useState([]);
  const [notifs, setNotifs] = React.useState(notifications);
  const unread = notifs.filter(n => n.unread).length;

  const nav = React.useMemo(() => ({
    push: (s) => setStack(st => [...st, s]),
    pop: () => setStack(st => st.slice(0, -1)),
    go: (tabId, opts = {}) => { setStack([]); if (opts.sub) setFinanceSub(opts.sub); setTab(tabId); },
    logout: () => { setStack([]); setAuthed(false); },
  }), []);

  const markRead = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, unread: false } : n));

  // ── Auth gate ──
  if (!authed) {
    return (
      <Phone statusLight={!forgot}>
        {forgot
          ? <ForgotScreen onBack={() => setForgot(false)} onDone={() => { setForgot(false); setAuthed(true); }}/>
          : <LoginScreen onLogin={() => setAuthed(true)} onForgot={() => setForgot(true)}/>}
        <TweaksUI t={t} setTweak={setTweak}/>
      </Phone>
    );
  }

  // ── Overlay (stack) screens ──
  const top = stack[stack.length - 1];
  const fullHeightScreens = ['offerDetail', 'upload'];
  const isFull = top && fullHeightScreens.includes(top.screen);

  let overlay = null;
  if (top) {
    if (top.screen === 'equipmentDetail') overlay = <EquipmentDetail id={top.id} nav={nav}/>;
    else if (top.screen === 'invoiceDetail') overlay = <InvoiceDetail id={top.id} nav={nav}/>;
    else if (top.screen === 'offers') overlay = <OffersScreen nav={nav}/>;
    else if (top.screen === 'offerDetail') overlay = <OfferDetail id={top.id} nav={nav}/>;
    else if (top.screen === 'notifications') overlay = <NotificationsScreen nav={nav} items={notifs} onRead={markRead}/>;
    else if (top.screen === 'upload') overlay = <UploadScreen nav={nav} presetEq={top.eq}/>;
  }

  // ── Base tab screens ──
  let base;
  if (tab === 'dashboard') base = <DashboardScreen nav={nav} unread={unread}/>;
  else if (tab === 'equipment') base = <EquipmentScreen nav={nav}/>;
  else if (tab === 'finance') base = <FinanceScreen nav={nav} initialSub={financeSub} key={financeSub}/>;
  else if (tab === 'documents') base = <DocumentsScreen nav={nav}/>;
  else base = <ProfileScreen nav={nav}/>;

  return (
    <Phone>
      {/* Scroll region */}
      {isFull ? (
        <div style={{ position: 'absolute', inset: 0, background: C.bg }}>{overlay}</div>
      ) : (
        <div className="scrollwrap" style={{
          position: 'absolute', inset: 0, overflowY: 'auto',
          background: C.bg, paddingTop: 8,
          paddingBottom: top ? 24 : 104,
        }}>
          {overlay || base}
        </div>
      )}

      {/* Bottom tab bar (only on base) */}
      {!top && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
          paddingBottom: 8,
          background: `linear-gradient(0deg, ${C.bg} 60%, transparent)`,
        }}>
          <div style={{
            margin: '0 12px', borderRadius: 22,
            background: 'rgba(255,255,255,0.86)',
            backdropFilter: 'blur(18px) saturate(180%)',
            WebkitBackdropFilter: 'blur(18px) saturate(180%)',
            border: `1px solid ${C.line}`,
            boxShadow: '0 8px 28px rgba(20,24,33,0.10)',
            display: 'flex', padding: '8px 6px',
          }}>
            {TABS.map(tb => {
              const active = tab === tb.id;
              const TabIcon = tb.icon;
              const badge = tb.id === 'dashboard' ? unread : 0;
              return (
                <button key={tb.id} onClick={() => { setStack([]); setTab(tb.id); }} style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0',
                  color: active ? C.brand : C.faint, fontFamily: 'inherit',
                  position: 'relative',
                }}>
                  <span style={{ position: 'relative' }}>
                    <TabIcon size={22} sw={active ? 2 : 1.7}/>
                    {badge > 0 && <span style={{ position: 'absolute', top: -3, right: -5, width: 7, height: 7, borderRadius: 999, background: C.red, border: '1.5px solid #fff' }}/>}
                  </span>
                  <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 600, letterSpacing: '-0.01em' }}>{tb.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <TweaksUI t={t} setTweak={setTweak} nav={nav}/>
    </Phone>
  );
}

// ── Phone frame ──
function Phone({ children, statusLight }) {
  return (
    <div className="stage">
      <div className="brand-tag">
        <span className="dot"/>Invorent · İnvestor Portalı
      </div>
      <div className="device">
        <div className="notch"/>
        <StatusBar light={statusLight}/>
        <div style={{ position: 'absolute', inset: '46px 0 0 0' }}>
          {children}
        </div>
        <div className="home-ind"/>
      </div>
      <div className="caption">iPhone · 390 × 844 · Azərbaycan dili · işıqlı tema</div>
    </div>
  );
}

function StatusBar({ light }) {
  const col = light ? '#fff' : C.ink;
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 46, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', color: col }}>
      <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em' }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="18" height="11" viewBox="0 0 19 12"><rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={col}/><rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={col}/><rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={col}/><rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={col}/></svg>
        <svg width="15" height="11" viewBox="0 0 17 12"><path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={col}/><circle cx="8.5" cy="10.5" r="1.3" fill={col}/></svg>
        <svg width="25" height="12" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={col} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="17" height="9" rx="2" fill={col}/><rect x="23.5" y="4" width="1.8" height="5" rx="0.9" fill={col} fillOpacity="0.4"/></svg>
      </div>
    </div>
  );
}

function TweaksUI({ t, setTweak, nav }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brend">
        <TweakColor label="Vurğu rəngi" value={ACCENTS[t.accent].brand}
          options={[ACCENTS.emerald.brand, ACCENTS.amber.brand, ACCENTS.ocean.brand, ACCENTS.graph.brand]}
          onChange={(hex) => {
            const key = Object.keys(ACCENTS).find(k => ACCENTS[k].brand === hex) || 'amber';
            setTweak('accent', key);
          }}/>
      </TweakSection>
      <TweakSection label="Naviqasiya">
        <TweakButton label="Çıxış / Login ekranı" onClick={() => nav ? nav.logout() : setTweak('startScreen', 'login')}/>
      </TweakSection>
    </TweaksPanel>
  );
}

Object.assign(window, { App });
