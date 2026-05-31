// ── Dashboard (Əsas) ──

function DashboardScreen({ nav, unread }) {
  const pendingOffers = offers.filter(o => o.status === 'pending');

  return (
    <div style={{ paddingBottom: 24 }}>
      <ScreenHeader
        title="Salam, Rəşad"
        subtitle="Xoş gəlmisiniz"
        bell unread={unread} onBell={() => nav.push({ screen: 'notifications' })}
      />
      <div style={{ padding: '0 18px' }}>
        <RefreshHint/>

        {/* Balance hero */}
        <div style={{
          borderRadius: 22, padding: '20px 20px 18px',
          background: `linear-gradient(155deg, ${C.brand}, ${C.brandDk})`,
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(217,119,6,0.25)',
        }}>
          <div style={{ position: 'absolute', top: -50, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Gözlənilən ödəniş</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: 'rgba(255,255,255,0.18)', borderRadius: 999, padding: '4px 9px',
                fontSize: 11.5, color: '#fff', fontWeight: 600,
              }}><Icon.calendar size={13}/> {azDate(dash.balanceDate)}</span>
            </div>
            <div style={{ fontSize: 38, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginTop: 8, fontFeatureSettings: '"tnum"' }}>
              {aznWhole(dash.balanceDue)}
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.82)', marginTop: 4 }}>Şirkətin sizə borcu · növbəti ödəmə</div>
            <button onClick={() => nav.go('finance', { sub: 'payments' })} style={{
              marginTop: 16, width: '100%', padding: '12px', borderRadius: 13,
              background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            }}>Ödəniş cədvəlinə bax <Icon.chevR size={16}/></button>
          </div>
        </div>

        {/* Pending offers card (v2) */}
        {pendingOffers.length > 0 && (
          <div onClick={() => nav.push({ screen: 'offers' })} style={{
            marginTop: 12, padding: 14, borderRadius: 18, cursor: 'pointer',
            background: C.card, border: `1px solid ${C.brandLine}`,
            display: 'flex', alignItems: 'center', gap: 13,
            boxShadow: '0 1px 2px rgba(20,24,33,0.04)',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: C.brandTint, color: C.brand, display: 'grid', placeItems: 'center', flexShrink: 0, position: 'relative' }}>
              <Icon.receipt size={22}/>
              <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 999, background: C.brand, color: '#fff', fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center', border: `2px solid ${C.card}` }}>{pendingOffers.length}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: C.ink, letterSpacing: '-0.01em' }}>Onay gözləyən təkliflər</div>
              <div style={{ fontSize: 12.5, color: C.muted, marginTop: 1 }}>{pendingOffers.length} təklif baxışınızı gözləyir</div>
            </div>
            <Icon.chevR size={20} style={{ color: C.faint }}/>
          </div>
        )}

        {/* Stat grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 18 }}>
          <StatTile label="Bu ayın qazancı" value={aznWhole(dash.thisMonth)} icon={<Icon.trendUp size={15}/>} delta={{ up: true, text: '+5,4%' }}/>
          <StatTile label="Ümumi qazanc" value={fmtNum(dash.totalEarn/1000,0) + 'K'} sub="₼" icon={<Icon.wallet size={15}/>}/>
        </div>

        {/* Status donut + utilization */}
        <Card style={{ marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Donut
              segments={dash.statusBreakdown}
              centerLabel={dash.eqCount} centerSub="texnika"
            />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {dash.statusBreakdown.map(s => (
                <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 3, background: s.color }}/>
                  <span style={{ fontSize: 12.5, color: C.ink70, flex: 1 }}>{s.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, fontFeatureSettings: '"tnum"' }}>{s.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.lineSoft}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
              <span style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>İstifadə dərəcəsi (utilization)</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFeatureSettings: '"tnum"' }}>{dash.utilization}%</span>
            </div>
            <Progress value={dash.utilization}/>
          </div>
        </Card>

        {/* Earnings trend */}
        <SectionHead title="Qazanc trendi" style={{ marginTop: 24 }}/>
        <Card>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12.5, color: C.muted, fontWeight: 600 }}>Son 8 ay · aylıq icarə gəliri</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: C.green, fontSize: 12.5, fontWeight: 700 }}><Icon.trendUp size={13}/> +40,8%</span>
          </div>
          <LineChart data={dash.trend} labels={dash.trendLabels} width={320} height={130}/>
        </Card>

        {/* Recent activity */}
        <SectionHead title="Son hərəkətlər" style={{ marginTop: 24 }}/>
        <Card pad={4}>
          {activity.map((a, i) => (
            <ActivityRow key={i} a={a} last={i === activity.length - 1}/>
          ))}
        </Card>
      </div>
    </div>
  );
}

function ActivityRow({ a, last }) {
  const map = {
    transit: { icon: <Icon.truck size={16}/>, c: C.blue, t: C.blueTint },
    return:  { icon: <Icon.download size={16}/>, c: C.green, t: C.greenTint },
    invoice: { icon: <Icon.receipt size={16}/>, c: C.amber, t: C.amberTint },
    payment: { icon: <Icon.wallet size={16}/>, c: C.green, t: C.greenTint },
  };
  const m = map[a.kind] || map.invoice;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderBottom: last ? 'none' : `1px solid ${C.lineSoft}` }}>
      <span style={{ width: 34, height: 34, borderRadius: 10, background: m.t, color: m.c, display: 'grid', placeItems: 'center', flexShrink: 0 }}>{m.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{a.title}</div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.meta}</div>
      </div>
      <span style={{ fontSize: 11.5, color: C.faint, fontWeight: 600, whiteSpace: 'nowrap' }}>{azDate(a.date).slice(0,5)}</span>
    </div>
  );
}

Object.assign(window, { DashboardScreen });
