// ── Təkliflər (v2) + Bildirişlər (v2) ──

function OffersScreen({ nav }) {
  const [filter, setFilter] = React.useState('pending');
  const tabs = [
    { value: 'pending', label: 'Gözləyən' },
    { value: 'all', label: 'Hamısı' },
  ];
  const list = offers.filter(o => filter === 'all' || o.status === 'pending');

  return (
    <div style={{ paddingBottom: 24 }}>
      <ScreenHeader title="Təkliflər" subtitle="İcarə təklifləri" onBack={nav.pop}/>
      <div style={{ padding: '0 18px' }}>
        <Segmented tabs={tabs} value={filter} onChange={setFilter} style={{ marginBottom: 16 }}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map(o => <OfferCard key={o.id} o={o} onClick={() => nav.push({ screen: 'offerDetail', id: o.id })}/>)}
          {list.length === 0 && <Empty icon={<Icon.receipt size={22}/>} title="Təklif yoxdur" sub="Hazırda baxışınızı gözləyən təklif yoxdur."/>}
        </div>
      </div>
    </div>
  );
}

function OfferCard({ o, onClick }) {
  return (
    <Card pad={14} onClick={onClick} style={o.status === 'pending' ? { border: `1.5px solid ${C.brandLine}` } : {}}>
      <div style={{ display: 'flex', gap: 13 }}>
        <EqThumb kind={o.img} accent={C.brand} size={54}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontSize: 14.5, fontWeight: 700, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.eq}</span>
            <OfferBadge status={o.status} sm/>
          </div>
          <div style={{ fontSize: 12.5, color: C.muted, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.project}</div>
          <div style={{ fontSize: 11.5, color: C.faint, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}><Icon.pin size={12}/>{o.region}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 11, borderTop: `1px solid ${C.lineSoft}` }}>
        <div>
          <span style={{ fontSize: 17, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em', fontFeatureSettings: '"tnum"' }}>{azn(o.price, 0)}</span>
          <span style={{ fontSize: 12.5, color: C.muted, fontWeight: 600 }}>{o.unit}</span>
        </div>
        <span style={{ fontSize: 12, color: C.ink70, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}><Icon.clock size={13} style={{ color: C.faint }}/>{o.duration}</span>
      </div>
    </Card>
  );
}

// Offer detail + accept/decline action
function OfferDetail({ id, nav }) {
  const o = offers.find(x => x.id === id) || offers[0];
  const [result, setResult] = React.useState(o.status !== 'pending' ? o.status : null);
  const [note, setNote] = React.useState('');
  const eq = equipment.find(e => e.code === o.eqCode);

  if (result === 'accepted' || result === 'declined') {
    const ok = result === 'accepted';
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <ScreenHeader title="Təklif" subtitle={o.id} onBack={nav.pop}/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
          <div style={{ width: 76, height: 76, borderRadius: '50%', background: ok ? C.greenTint : C.redTint, color: ok ? C.green : C.red, display: 'grid', placeItems: 'center', marginBottom: 20 }}>
            {ok ? <Icon.check size={40}/> : <Icon.x size={40}/>}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}>{ok ? 'Təklif qəbul edildi' : 'Təklif rədd edildi'}</div>
          <div style={{ fontSize: 13.5, color: C.muted, marginTop: 8, maxWidth: 280, lineHeight: 1.5 }}>
            {ok ? `${o.eq} ${o.project} layihəsinə təyin edildi. Koordinator məlumatlandırıldı.` : `Təklif rədd edildi. Səbəb koordinatora göndərildi.`}
          </div>
          <Button full onClick={nav.pop} style={{ marginTop: 32 }}>Təkliflərə qayıt</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScreenHeader title="Təklif təfərrüatı" subtitle={o.id} onBack={nav.pop}/>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 18px' }} className="noscroll">
        {/* Equipment */}
        <Card>
          <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
            <EqThumb kind={o.img} accent={C.brand} size={58}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>{o.eq}</div>
              <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>{o.eqCode} · {eq ? eq.type : ''}</div>
            </div>
            <OfferBadge status={o.status}/>
          </div>
        </Card>

        {/* Offer terms */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
          <Card pad={14}>
            <div style={{ fontSize: 11.5, color: C.muted, fontWeight: 600 }}>Təklif olunan qiymət</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.brand, letterSpacing: '-0.02em', marginTop: 3, fontFeatureSettings: '"tnum"' }}>{azn(o.price, 0)}</div>
            <div style={{ fontSize: 12, color: C.faint, fontWeight: 600 }}>{o.unit === '/ay' ? 'aylıq' : 'günlük'}</div>
          </Card>
          <Card pad={14}>
            <div style={{ fontSize: 11.5, color: C.muted, fontWeight: 600 }}>Müddət</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em', marginTop: 3 }}>{o.duration}</div>
            <div style={{ fontSize: 12, color: C.faint, fontWeight: 600 }}>başlama {azDate(o.start).slice(0,5)}</div>
          </Card>
        </div>

        <Card style={{ marginTop: 12 }}>
          <InfoRow label="Layihə" value={o.project} icon={<Icon.building size={16}/>}/>
          <InfoRow label="Region" value={o.region} icon={<Icon.pin size={16}/>}/>
          <InfoRow label="Başlama tarixi" value={azDate(o.start)} icon={<Icon.calendar size={16}/>} last/>
        </Card>

        {/* Coordinator note */}
        <Card style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon.user size={16} style={{ color: C.faint }}/>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink70 }}>{o.coordinator}</span>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: C.ink70, lineHeight: 1.55 }}>{o.note}</p>
        </Card>

        {o.status === 'pending' && (
          <>
            <div style={{ marginTop: 16 }}>
              <FieldLabel>Qeyd / səbəb (opsional)</FieldLabel>
              <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Cavabınıza qeyd əlavə edin…" style={{
                width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 13,
                background: C.card, border: `1.5px solid ${C.line}`, fontFamily: 'inherit', fontSize: 14, color: C.ink, outline: 'none', resize: 'none',
              }}/>
            </div>
          </>
        )}
      </div>

      {/* Action bar */}
      {o.status === 'pending' && (
        <div style={{ display: 'flex', gap: 10, padding: '14px 18px', borderTop: `1px solid ${C.line}`, background: C.card }}>
          <Button variant="danger" onClick={() => setResult('declined')} icon={<Icon.x size={18}/>} style={{ flex: 1 }}>Rədd et</Button>
          <Button variant="success" onClick={() => setResult('accepted')} icon={<Icon.check size={18}/>} style={{ flex: 1.4 }}>Qəbul et</Button>
        </div>
      )}
    </div>
  );
}

// ── Bildirişlər (v2) ──
function NotificationsScreen({ nav, items, onRead }) {
  const kindMap = {
    offer:   { icon: <Icon.receipt size={18}/>, c: C.brand, t: C.brandTint },
    payment: { icon: <Icon.wallet size={18}/>, c: C.green, t: C.greenTint },
    invoice: { icon: <Icon.receipt size={18}/>, c: C.amber, t: C.amberTint },
    service: { icon: <Icon.wrench size={18}/>, c: C.purple, t: C.purpleTint },
    transit: { icon: <Icon.truck size={18}/>, c: C.blue, t: C.blueTint },
    return:  { icon: <Icon.download size={18}/>, c: C.green, t: C.greenTint },
  };
  const go = (n) => {
    onRead(n.id);
    const r = n.ref;
    if (r.type === 'offer') nav.push({ screen: 'offerDetail', id: r.id });
    else if (r.type === 'equipment') nav.push({ screen: 'equipmentDetail', id: r.id });
    else if (r.type === 'finance') nav.go('finance');
  };
  return (
    <div style={{ paddingBottom: 24 }}>
      <ScreenHeader title="Bildirişlər" onBack={nav.pop}
        right={<button onClick={() => items.forEach(n => onRead(n.id))} style={{ ...iconBtn, width: 'auto', padding: '0 12px', fontSize: 12.5, fontWeight: 600, color: C.brand }}>Oxu</button>}/>
      <div style={{ padding: '0 18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map(n => {
            const m = kindMap[n.kind] || kindMap.invoice;
            return (
              <div key={n.id} onClick={() => go(n)} style={{
                display: 'flex', gap: 12, padding: 14, borderRadius: 16, cursor: 'pointer',
                background: n.unread ? C.card : 'transparent',
                border: `1px solid ${n.unread ? C.line : 'transparent'}`,
                boxShadow: n.unread ? '0 1px 2px rgba(20,24,33,0.04)' : 'none',
              }}>
                <span style={{ width: 42, height: 42, borderRadius: 12, background: m.t, color: m.c, display: 'grid', placeItems: 'center', flexShrink: 0 }}>{m.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{n.title}</span>
                    {n.unread && <span style={{ width: 7, height: 7, borderRadius: 999, background: C.brand }}/>}
                    <span style={{ marginLeft: 'auto', fontSize: 11.5, color: C.faint, fontWeight: 600, flexShrink: 0 }}>{n.time}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: C.muted, marginTop: 3, lineHeight: 1.45 }}>{n.body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OffersScreen, OfferDetail, NotificationsScreen });
