// ── Kit · live component gallery ──

function ComponentGallery() {
  const [seg, setSeg] = React.useState('invoices');
  const [tog, setTog] = React.useState(true);
  const [tab, setTab] = React.useState('equipment');

  return (
    <KSection id="components" kicker="Library" title="Komponentlər"
      desc="Bütün komponentlər canlı render olunur — bu, tətbiqdə işlənən eyni koddur. v2 nişanı interaktiv mərhələ komponentlərini göstərir.">

      {/* Buttons */}
      <SubHead>Düymələr</SubHead>
      <KCard style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <Button>Əsas (primary)</Button>
          <Button variant="secondary">İkincili</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="success" icon={<Icon.check size={18}/>}>Qəbul et</Button>
          <Button variant="danger" icon={<Icon.x size={18}/>}>Rədd et</Button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <Button sm>Kiçik</Button>
          <Button sm variant="secondary" icon={<Icon.download size={16}/>}>Endir</Button>
          <Button icon={<Icon.plus size={18}/>}>İkonlu</Button>
          <Button style={{ opacity: 0.45, pointerEvents: 'none' }}>Deaktiv</Button>
          <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
            <Tag>variant</Tag><Tag>sm</Tag><Tag>icon</Tag><Tag>full</Tag>
          </div>
        </div>
      </KCard>

      {/* Badges */}
      <SubHead>Status nişanları</SubHead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
        <KCard pad={18}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 12 }}>Texnika · EqBadge</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['available','rented','transit','service','repair','retired'].map(s => <EqBadge key={s} status={s}/>)}
          </div>
        </KCard>
        <KCard pad={18}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><span style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>Təklif · OfferBadge</span><Tag tone="v2">v2</Tag></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['pending','accepted','declined'].map(s => <OfferBadge key={s} status={s}/>)}
          </div>
        </KCard>
        <KCard pad={18}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 12 }}>Ödəniş · PayBadge</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['paid','pending','scheduled','overdue'].map(s => <PayBadge key={s} status={s}/>)}
          </div>
        </KCard>
      </div>

      {/* Inputs / forms */}
      <SubHead>Forma elementləri</SubHead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <KCard>
          <Field label="E-poçt" icon={<Icon.mail size={18}/>}><input defaultValue="r.mammadov@invorent.az" style={inputStyle}/></Field>
          <div style={{ height: 14 }}/>
          <Field label="Şifrə (xəta halı)" icon={<Icon.lock size={18}/>} error><input type="password" defaultValue="••••••" style={inputStyle}/></Field>
        </KCard>
        <KCard>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C.ink70, marginBottom: 7 }}>Axtarış</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 13, background: C.bg, border: `1px solid ${C.line}`, marginBottom: 16 }}>
            <Icon.search size={18} style={{ color: C.faint }}/>
            <input placeholder="Texnika adı, kod, növ…" style={{ ...inputStyle, background: 'none' }}/>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C.ink70, marginBottom: 7 }}>OTP <Tag tone="v2">v2</Tag></div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['4','2','8','','',''].map((d,i) => (
              <div key={i} style={{ width: 42, height: 50, display: 'grid', placeItems: 'center', borderRadius: 12, border: `1.5px solid ${d ? C.brand : C.line}`, background: C.bg, fontSize: 20, fontWeight: 700, color: C.ink }}>{d}</div>
            ))}
          </div>
        </KCard>
      </div>
      {/* Toggle + segmented */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
        <KCard>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C.ink70, marginBottom: 14 }}>Segmented control</div>
          <Segmented tabs={[{ value: 'invoices', label: 'Qaimələr' }, { value: 'payments', label: 'Ödənişlər' }]} value={seg} onChange={setSeg}/>
        </KCard>
        <KCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>Toggle / switch</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Bildiriş tənzimləmələri</div>
            </div>
            <button onClick={() => setTog(t => !t)} style={{ width: 46, height: 28, borderRadius: 999, background: tog ? C.brand : C.line, border: 'none', cursor: 'pointer', padding: 3, transition: 'background 0.2s' }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, background: '#fff', transform: `translateX(${tog ? 18 : 0}px)`, transition: 'transform 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.25)' }}/>
            </button>
          </div>
        </KCard>
      </div>

      {/* Cards */}
      <SubHead>Kartlar</SubHead>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <Demo label="Stat tile" bg={C.bg}>
          <div style={{ width: '100%' }}>
            <StatTile label="Bu ayın qazancı" value="54.060 ₼" icon={<Icon.trendUp size={15}/>} delta={{ up: true, text: '+5,4%' }}/>
          </div>
        </Demo>
        <Demo label="Texnika thumbnail" bg={C.bg}>
          {['excavator','crane','backhoe','loader','generator'].map(k => <EqThumb key={k} kind={k} accent={C.brand} size={48}/>)}
        </Demo>
      </div>

      {/* Equipment card (composed) */}
      <Demo label="Texnika kartı (kompozit)" bg={C.bg} pad={16}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <KitEqCard/>
        </div>
      </Demo>

      <div style={{ height: 24 }}/>

      {/* List rows */}
      <SubHead>Siyahı sətirləri</SubHead>
      <KCard style={{ marginBottom: 24 }} pad={20}>
        <InfoRow label="Seriya nömrəsi" value="CAT320D04891" mono icon={<Icon.file size={16}/>}/>
        <InfoRow label="Növbəti texniki baxış" value="22.06.2026" icon={<Icon.calendar size={16}/>}/>
        <InfoRow label="İstifadə dərəcəsi" value="86%" icon={<Icon.gauge size={16}/>} last/>
      </KCard>

      {/* Charts */}
      <SubHead>Qrafiklər</SubHead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
        <KCard>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8 }}>Line / area · trend</div>
          <LineChart data={[38.4,41.2,44.8,47.1,49.6,51.2,52.8,54.06]} labels={['','','','','','','','']} color={C.brand} width={300} height={110}/>
        </KCard>
        <KCard>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8 }}>Donut · status</div>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <Donut segments={[{count:3,color:C.amber},{count:1,color:C.green},{count:1,color:C.blue},{count:1,color:C.purple}]} centerLabel={6} centerSub="texnika" size={110}/>
          </div>
        </KCard>
        <KCard>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 12 }}>Progress · sparkline</div>
          <Progress value={86} color={C.brand}/>
          <div style={{ height: 16 }}/>
          <Spark data={[3,4,3.5,5,4.6,6,5.8,7]} color={C.brand} width={120} height={30}/>
        </KCard>
      </div>

      {/* Navigation + empty */}
      <SubHead>Naviqasiya və hallar</SubHead>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 14 }}>
        <Demo label="Bottom tab bar" bg={C.bg} pad={16}>
          <div style={{ width: '100%', borderRadius: 22, background: 'rgba(255,255,255,0.9)', border: `1px solid ${C.line}`, boxShadow: '0 8px 28px rgba(20,24,33,0.10)', display: 'flex', padding: '8px 6px' }}>
            {[['home','Əsas','dashboard'],['truck','Texnika','equipment'],['wallet','Maliyyə','finance'],['docs','Sənədlər','documents'],['user','Profil','profile']].map(([ic,label,id]) => {
              const I = Icon[ic]; const active = tab === id;
              return (
                <button key={id} onClick={() => setTab(id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0', color: active ? C.brand : C.faint }}>
                  <I size={22} sw={active ? 2 : 1.7}/>
                  <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 600 }}>{label}</span>
                </button>
              );
            })}
          </div>
        </Demo>
        <Demo label="Empty state" bg={C.bg} pad={6} align="center">
          <Empty icon={<Icon.docs size={22}/>} title="Sənəd yoxdur" sub="Bu texnikaya aid sənəd əlavə edin."/>
        </Demo>
      </div>
    </KSection>
  );
}

// composed equipment card sample
function KitEqCard() {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 18, padding: 13, boxShadow: '0 1px 2px rgba(20,24,33,0.04)' }}>
      <div style={{ display: 'flex', gap: 13 }}>
        <EqThumb kind="excavator" accent={C.brand} size={62} radius={15}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Caterpillar 320D</span>
            <EqBadge status="rented" sm/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, fontSize: 12, color: C.muted }}>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 600, color: C.ink70 }}>EQ-012</span>
            <span style={{ width: 3, height: 3, borderRadius: 999, background: C.faint }}/> Ekskavator · Caterpillar
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 9, fontSize: 12, color: C.ink70 }}>
            <Icon.pin size={13} style={{ color: C.faint }}/> Bakı, Yasamal
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 11, borderTop: `1px solid ${C.lineSoft}` }}>
        <div><div style={{ fontSize: 10.5, color: C.faint, fontWeight: 600, textTransform: 'uppercase' }}>Aylıq gəlir</div><div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, marginTop: 2 }}>11.400 ₼</div></div>
        <div style={{ textAlign: 'right' }}><div style={{ fontSize: 10.5, color: C.faint, fontWeight: 600, textTransform: 'uppercase' }}>Qaytarılma</div><div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, marginTop: 2 }}>55 gün</div></div>
      </div>
    </div>
  );
}

Object.assign(window, { ComponentGallery });
