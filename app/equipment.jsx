// ── Texnika list ──

function EquipmentScreen({ nav }) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  const filters = [
    { id: 'all', label: 'Hamısı' },
    { id: 'rented', label: 'İcarədə' },
    { id: 'available', label: 'Mövcuddur' },
    { id: 'transit', label: 'Yoldadır' },
    { id: 'service', label: 'Baxışda' },
  ];

  const list = equipment.filter(e => {
    if (filter !== 'all' && e.status !== filter) return false;
    if (q) {
      const s = q.toLowerCase();
      return e.name.toLowerCase().includes(s) || e.code.toLowerCase().includes(s) || e.type.toLowerCase().includes(s);
    }
    return true;
  });

  return (
    <div style={{ paddingBottom: 24 }}>
      <ScreenHeader title="Texnika" subtitle={`${equipment.length} aktiv texnika`}/>
      <div style={{ padding: '0 18px' }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 14, background: C.card, border: `1px solid ${C.line}`, marginBottom: 12 }}>
          <Icon.search size={18} style={{ color: C.faint }}/>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Texnika adı, kod, növ…"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'none', fontFamily: 'inherit', fontSize: 14, color: C.ink }}/>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', margin: '0 -18px', padding: '2px 18px 4px', scrollbarWidth: 'none' }} className="noscroll">
          {filters.map(f => {
            const active = filter === f.id;
            return (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0,
                background: active ? C.ink : C.card,
                border: `1px solid ${active ? C.ink : C.line}`,
                color: active ? '#fff' : C.ink70,
                fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>{f.label}</button>
            );
          })}
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          {list.map(e => <EqCard key={e.id} e={e} onClick={() => nav.push({ screen: 'equipmentDetail', id: e.id })}/>)}
          {list.length === 0 && <Empty title="Texnika tapılmadı" sub="Axtarış və ya filtri dəyişib yenidən cəhd edin."/>}
        </div>
      </div>
    </div>
  );
}

function EqCard({ e, onClick }) {
  const serviceSoon = e.nextServiceDays <= 14;
  return (
    <Card pad={13} onClick={onClick}>
      <div style={{ display: 'flex', gap: 13 }}>
        <EqThumb kind={e.img} accent={e.accent} size={62} radius={15}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.ink, letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</span>
            <EqBadge status={e.status} sm/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, fontSize: 12, color: C.muted }}>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 600, color: C.ink70 }}>{e.code}</span>
            <span style={{ width: 3, height: 3, borderRadius: 999, background: C.faint }}/>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.type} · {e.brand}</span>
          </div>
          {(e.status === 'rented' || e.status === 'transit') ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 9, fontSize: 12, color: C.ink70 }}>
              <Icon.pin size={13} style={{ color: C.faint }}/>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{e.region}</span>
              {serviceSoon && <Icon.warn size={14} style={{ color: C.purple }}/>}
            </div>
          ) : e.status === 'service' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 9, fontSize: 12, color: C.purple, fontWeight: 600 }}>
              <Icon.wrench size={13}/> {e.serviceReason}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 9, fontSize: 12, color: C.muted }}>
              <Icon.pin size={13} style={{ color: C.faint }}/> Anbarda · boşda
            </div>
          )}
        </div>
      </div>
      {(e.status === 'rented' || e.status === 'transit') && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 11, borderTop: `1px solid ${C.lineSoft}` }}>
          <Mini label="Aylıq gəlir" value={azn(e.monthEarn, 0)}/>
          <Mini label="Qaytarılma" value={e.returnDays + ' gün'} right/>
        </div>
      )}
    </Card>
  );
}

function Mini({ label, value, right }) {
  return (
    <div style={{ textAlign: right ? 'right' : 'left' }}>
      <div style={{ fontSize: 10.5, color: C.faint, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</div>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, marginTop: 2, fontFeatureSettings: '"tnum"' }}>{value}</div>
    </div>
  );
}

Object.assign(window, { EquipmentScreen, EqCard });
