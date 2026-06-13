// ── Kit foundations ──

function ColorFoundations() {
  const brandScale = Object.keys(GREEN).map(k => ({ k, hex: GREEN[k] }));
  const surfaces = [
    { name: 'bg', hex: C.bg }, { name: 'bg.sunk', hex: C.bgSunk },
    { name: 'surface', hex: C.card, border: true }, { name: 'border', hex: C.line },
    { name: 'border.soft', hex: C.lineSoft },
  ];
  const text = [
    { name: 'text', hex: C.ink }, { name: 'text.secondary', hex: C.muted }, { name: 'text.tertiary', hex: C.faint },
  ];
  const status = [
    { name: 'Mövcuddur', token: 'available', hex: C.green },
    { name: 'İcarədə', token: 'rented', hex: C.amber },
    { name: 'Yoldadır', token: 'transit', hex: C.blue },
    { name: 'Baxışda', token: 'service', hex: C.purple },
    { name: 'Təmirdə', token: 'repair', hex: C.red },
    { name: 'İstismardan çıxıb', token: 'retired', hex: C.gray },
  ];

  return (
    <KSection id="color" kicker="Foundations" title="Rəng paleti"
      desc="Vurğu rəngi — emerald (yaşıl). 50–900 şkalası UI vəziyyətləri (hover, basılı, tint fonlar) üçündür. Status rəngləri texnika və ödəniş vəziyyətlərini kodlaşdırır; brend yaşılından ayrı saxlanır.">

      {/* Brand scale */}
      <SubHead>Brend · emerald</SubHead>
      <KCard style={{ marginBottom: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 0, borderRadius: 12, overflow: 'hidden' }}>
          {brandScale.map(s => (
            <div key={s.k}>
              <div style={{ height: 64, background: s.hex }}/>
              <div style={{ padding: '8px 6px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.ink }}>{s.k}</div>
                <div style={{ fontSize: 9.5, color: C.faint, fontFamily: "'Geist Mono', monospace", marginTop: 1 }}>{s.hex}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag tone="brand">primary = 500</Tag>
          <Tag>basılı / dark = 600</Tag>
          <Tag>tint fon = 50</Tag>
          <Tag>kənar = 100</Tag>
        </div>
      </KCard>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div>
          <SubHead>Səthlər və mətn</SubHead>
          <KCard pad={16}>
            {[...surfaces, ...text].map(s => <SwatchRow key={s.name} name={s.name} hex={s.hex} border={s.border}/>)}
          </KCard>
        </div>
        <div>
          <SubHead>Status rəngləri</SubHead>
          <KCard pad={16}>
            {status.map(s => (
              <div key={s.token} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: `1px solid ${C.lineSoft}` }}>
                <span style={{ width: 18, height: 18, borderRadius: 6, background: s.hex }}/>
                <span style={{ fontSize: 13.5, color: C.ink, fontWeight: 600, flex: 1 }}>{s.name}</span>
                <span style={{ fontSize: 11, color: C.faint, fontFamily: "'Geist Mono', monospace" }}>status.{s.token}</span>
                <span style={{ fontSize: 11, color: C.muted, fontFamily: "'Geist Mono', monospace" }}>{s.hex}</span>
              </div>
            ))}
          </KCard>
        </div>
      </div>
    </KSection>
  );
}

function SwatchRow({ name, hex, border }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: `1px solid ${C.lineSoft}` }}>
      <span style={{ width: 28, height: 28, borderRadius: 8, background: hex, border: border ? `1px solid ${C.line}` : 'none' }}/>
      <span style={{ fontSize: 13.5, color: C.ink, fontWeight: 600, flex: 1, fontFamily: "'Geist Mono', monospace" }}>{name}</span>
      <span style={{ fontSize: 11.5, color: C.muted, fontFamily: "'Geist Mono', monospace" }}>{hex}</span>
    </div>
  );
}

function TypeFoundations() {
  return (
    <KSection id="type" kicker="Foundations" title="Tipografiya"
      desc="UI üçün Plus Jakarta Sans; kod, VÖEN, qaimə nömrəsi və ID-lər üçün Geist Mono. Maliyyə rəqəmləri tabular (tnum) və qabarıq çəkidə verilir.">
      <KCard pad={0}>
        <div style={{ display: 'flex', gap: 12, padding: '16px 22px', borderBottom: `1px solid ${C.line}`, flexWrap: 'wrap' }}>
          <FontChip family="Plus Jakarta Sans" use="UI · başlıq · mətn" weights="400 · 500 · 600 · 700 · 800"/>
          <FontChip family="Geist Mono" use="kod · ID · rəqəm" weights="400 · 500 · 600" mono/>
        </div>
        {TYPE.map((t, i) => (
          <div key={t.name} style={{ display: 'flex', alignItems: 'baseline', gap: 20, padding: '16px 22px', borderBottom: i === TYPE.length-1 ? 'none' : `1px solid ${C.lineSoft}` }}>
            <div style={{ flex: 1, minWidth: 0, fontSize: t.size, lineHeight: t.lh + 'px', fontWeight: t.weight, color: C.ink, fontFamily: t.mono ? "'Geist Mono', monospace" : 'inherit', letterSpacing: t.size > 22 ? '-0.02em' : '-0.005em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.sample}</div>
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, fontFamily: "'Geist Mono', monospace" }}>{t.token}</div>
              <div style={{ fontSize: 11, color: C.faint, fontFamily: "'Geist Mono', monospace", marginTop: 2 }}>{t.size}/{t.lh} · {t.weight}</div>
            </div>
          </div>
        ))}
      </KCard>
    </KSection>
  );
}

function FontChip({ family, use, weights, mono }) {
  return (
    <div style={{ flex: 1, minWidth: 220, padding: 14, borderRadius: 12, background: C.bg, border: `1px solid ${C.line}` }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.ink, fontFamily: mono ? "'Geist Mono', monospace" : "'Plus Jakarta Sans'" }}>{family}</div>
      <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{use}</div>
      <div style={{ fontSize: 11.5, color: C.faint, marginTop: 8, fontFamily: "'Geist Mono', monospace" }}>{weights}</div>
    </div>
  );
}

function ScaleFoundations() {
  return (
    <KSection id="scale" kicker="Foundations" title="Spacing · radius · elevation"
      desc="4pt grid bütün boşluqları idarə edir. Radius komponent tipinə bağlıdır. Kölgələr iOS-da shadow*, Android-də elevation kimi verilir.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
        <div>
          <SubHead>Spacing · 4pt</SubHead>
          <KCard pad={16}>
            {SPACING.map(s => (
              <div key={s.token} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '6px 0' }}>
                <span style={{ width: 110, fontSize: 12, fontWeight: 600, color: C.ink, fontFamily: "'Geist Mono', monospace" }}>{s.token}</span>
                <span style={{ height: 14, width: s.px, background: C.brand, borderRadius: 3, opacity: 0.85 }}/>
                <span style={{ fontSize: 11.5, color: C.faint, fontFamily: "'Geist Mono', monospace" }}>{s.px}</span>
              </div>
            ))}
          </KCard>
        </div>
        <div>
          <SubHead>Radius</SubHead>
          <KCard pad={16} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {RADII.map(r => (
                <div key={r.token} style={{ textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, background: C.brandTint, border: `1.5px solid ${C.brandLine}`, borderRadius: Math.min(r.px, 26), borderBottomRightRadius: 0 }}/>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: C.ink, marginTop: 6, fontFamily: "'Geist Mono', monospace" }}>{r.token.replace('radius.','')}</div>
                  <div style={{ fontSize: 10, color: C.faint, fontFamily: "'Geist Mono', monospace" }}>{r.px === 999 ? '∞' : r.px}</div>
                </div>
              ))}
            </div>
          </KCard>
        </div>
      </div>
      <SubHead>Elevation</SubHead>
      <KGrid min={220}>
        {ELEVATION.map(e => (
          <KCard key={e.token} style={{ boxShadow: e.css === 'none' ? 'none' : e.css }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{e.label}</div>
            <div style={{ fontSize: 11.5, color: C.faint, fontFamily: "'Geist Mono', monospace", marginTop: 3 }}>{e.token}</div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.lineSoft}`, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: C.muted }}>Android</span>
              <span style={{ fontSize: 11, color: C.ink, fontWeight: 600, fontFamily: "'Geist Mono', monospace" }}>elevation: {e.elevation}</span>
            </div>
          </KCard>
        ))}
      </KGrid>
    </KSection>
  );
}

function IconFoundations() {
  const names = ['home','truck','wallet','docs','user','bell','search','filter','plus','check','x','pin','calendar','clock','trendUp','download','upload','eye','shield','lock','mail','building','globe','gauge','wrench','history','receipt','card','logout','warn','camera','image','refresh'];
  return (
    <KSection id="icons" kicker="Foundations" title="İkonoqrafiya"
      desc="24×24 grid, 1.7px ştrix, yuvarlaq uclar, currentColor. React Native-də react-native-svg ilə verilir — eyni path-lər, ölçü prop ilə idarə olunur.">
      <KCard>
        <KGrid min={92} gap={10}>
          {names.map(n => {
            const I = Icon[n];
            return I ? (
              <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '14px 6px', borderRadius: 12, background: C.bg, border: `1px solid ${C.line}` }}>
                <span style={{ color: C.ink }}><I size={22}/></span>
                <span style={{ fontSize: 10.5, color: C.muted, fontFamily: "'Geist Mono', monospace" }}>{n}</span>
              </div>
            ) : null;
          })}
        </KGrid>
      </KCard>
    </KSection>
  );
}

Object.assign(window, { ColorFoundations, TypeFoundations, ScaleFoundations, IconFoundations });
