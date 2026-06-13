// ── Profil ──

function ProfileScreen({ nav }) {
  return (
    <div style={{ paddingBottom: 24 }}>
      <ScreenHeader title="Profil"/>
      <div style={{ padding: '0 18px' }}>
        {/* Identity card */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 60, height: 60, borderRadius: 18, background: `linear-gradient(150deg, ${C.brand}, ${C.brandDk})`, display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', flexShrink: 0 }}>{investor.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: C.ink, letterSpacing: '-0.01em' }}>{investor.name}</div>
              <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{investor.company}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 7, fontSize: 11, fontWeight: 700, color: C.green, background: C.greenTint, borderRadius: 8, padding: '3px 9px' }}>
                <Icon.shield size={12}/> Təsdiqlənmiş investor
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.lineSoft}` }}>
            <ProfStat label="Texnika" value="6"/>
            <ProfStat label="Aktiv" value="4" center/>
            <ProfStat label="Üzv" value="2024" right/>
          </div>
        </Card>

        {/* Investor info */}
        <SectionHead title="İnvestor məlumatı" style={{ marginTop: 22 }}/>
        <Card>
          <InfoRow label="Şirkət adı" value={investor.company} icon={<Icon.building size={16}/>}/>
          <InfoRow label="VÖEN" value={investor.voen} mono icon={<Icon.file size={16}/>}/>
          <InfoRow label="E-poçt" value={investor.email} icon={<Icon.mail size={16}/>}/>
          <InfoRow label="Telefon" value={investor.phone} icon={<Icon.card size={16}/>} last/>
        </Card>

        {/* Settings */}
        <SectionHead title="Parametrlər" style={{ marginTop: 22 }}/>
        <Card pad={4}>
          <SettingRow icon={<Icon.lock size={17}/>} color={C.blue} tint={C.blueTint} label="Şifrəni dəyiş"/>
          <SettingRow icon={<Icon.bell size={17}/>} color={C.amber} tint={C.amberTint} label="Bildiriş tənzimləmələri" detail="4 aktiv"/>
          <SettingRow icon={<Icon.globe size={17}/>} color={C.purple} tint={C.purpleTint} label="Dil" detail="Azərbaycan"/>
          <SettingRow icon={<Icon.shield size={17}/>} color={C.green} tint={C.greenTint} label="İki mərhələli giriş" detail="Aktiv" last/>
        </Card>

        {/* Logout */}
        <Button full variant="danger" onClick={() => nav.logout()} icon={<Icon.logout size={18}/>} style={{ marginTop: 22 }}>Çıxış</Button>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11.5, color: C.faint, fontWeight: 600, fontFamily: "'Geist Mono', monospace" }}>INVORENT · v2.4.1</div>
      </div>
    </div>
  );
}

function ProfStat({ label, value, center, right }) {
  return (
    <div style={{ flex: 1, textAlign: center ? 'center' : right ? 'right' : 'left' }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em', fontFeatureSettings: '"tnum"' }}>{value}</div>
      <div style={{ fontSize: 11.5, color: C.muted, fontWeight: 600, marginTop: 1 }}>{label}</div>
    </div>
  );
}

function SettingRow({ icon, color, tint, label, detail, last }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderBottom: last ? 'none' : `1px solid ${C.lineSoft}`, cursor: 'pointer' }}>
      <span style={{ width: 34, height: 34, borderRadius: 10, background: tint, color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: C.ink }}>{label}</span>
      {detail && <span style={{ fontSize: 12.5, color: C.muted, fontWeight: 600 }}>{detail}</span>}
      <Icon.chevR size={16} style={{ color: C.faint }}/>
    </div>
  );
}

Object.assign(window, { ProfileScreen });
