// ── Maliyyə (Qaimələr | Ödənişlər) ──

function FinanceScreen({ nav, initialSub }) {
  const [sub, setSub] = React.useState(initialSub || 'invoices');
  return (
    <div style={{ paddingBottom: 24 }}>
      <ScreenHeader title="Maliyyə" subtitle="Qaimələr və ödənişlər"/>
      <div style={{ padding: '0 18px' }}>
        <Segmented
          tabs={[{ value: 'invoices', label: 'Qaimələr' }, { value: 'payments', label: 'Ödənişlər' }]}
          value={sub} onChange={setSub} style={{ marginBottom: 16 }}/>
        {sub === 'invoices' ? <InvoicesTab nav={nav}/> : <PaymentsTab/>}
      </div>
    </div>
  );
}

function InvoicesTab({ nav }) {
  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <StatTile label="Ümumi qaimə" value={aznWhole(total)} icon={<Icon.receipt size={15}/>}/>
        <StatTile label="Ödənilib" value={aznWhole(paid)} icon={<Icon.check size={15}/>} accent={C.green}/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {invoices.map(inv => (
          <Card key={inv.id} pad={14} onClick={() => nav.push({ screen: 'invoiceDetail', id: inv.id })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, background: C.bgSunk, color: C.ink70, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon.receipt size={20}/></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, fontFamily: "'Geist Mono', monospace" }}>{inv.id}</span>
                  <PayBadge status={inv.status} sm/>
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inv.type} · {inv.eq}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 11, borderTop: `1px solid ${C.lineSoft}` }}>
              <span style={{ fontSize: 12, color: C.faint, fontWeight: 600 }}>{azDate(inv.date)}</span>
              <span style={{ fontSize: 17, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em', fontFeatureSettings: '"tnum"', whiteSpace: 'nowrap' }}>{azn(inv.amount, 0)}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PaymentsTab() {
  const p = payments;
  const pct = Math.round((p.paid / p.totalDue) * 100);
  return (
    <div>
      {/* Summary */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <SummaryItem label="Ümumi borc" value={aznWhole(p.totalDue)} color={C.ink}/>
          <SummaryItem label="Ödənilmiş" value={aznWhole(p.paid)} color={C.green} center/>
          <SummaryItem label="Qalıq" value={aznWhole(p.remaining)} color={C.brand} right/>
        </div>
        <div style={{ marginTop: 14 }}>
          <Progress value={pct} color={C.green}/>
          <div style={{ fontSize: 11.5, color: C.faint, marginTop: 6, textAlign: 'center' }}>{pct}% ödənilib</div>
        </div>
      </Card>

      {/* Schedule */}
      <SectionHead title="Ödəniş cədvəli"/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {p.schedule.map((s, i) => (
          <Card key={i} pad={14} style={s.next ? { border: `1.5px solid ${C.brandLine}`, background: C.brandTint } : {}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, background: s.next ? C.brand : C.bgSunk, color: s.next ? '#fff' : C.ink70, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon.calendar size={20}/>
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{azDate(s.date)}</span>
                  {s.next && <span style={{ fontSize: 10.5, fontWeight: 700, color: C.brand, background: '#fff', borderRadius: 6, padding: '2px 7px' }}>Sıradakı</span>}
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.eq}</div>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.ink, fontFeatureSettings: '"tnum"' }}>{azn(s.amount, 0)}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* History */}
      <SectionHead title="Ödəniş tarixçəsi"/>
      <Card pad={4}>
        {p.history.map((h, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderBottom: i === p.history.length-1 ? 'none' : `1px solid ${C.lineSoft}` }}>
            <span style={{ width: 36, height: 36, borderRadius: 10, background: C.greenTint, color: C.green, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon.check size={17}/></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{azn(h.amount, 0)}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>{h.method} · {azDate(h.date)}</div>
            </div>
            <PayBadge status={h.status} sm/>
          </div>
        ))}
      </Card>
    </div>
  );
}

function SummaryItem({ label, value, color, center, right }) {
  return (
    <div style={{ textAlign: center ? 'center' : right ? 'right' : 'left', flex: 1 }}>
      <div style={{ fontSize: 11.5, color: C.muted, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color, marginTop: 4, letterSpacing: '-0.02em', fontFeatureSettings: '"tnum"' }}>{value}</div>
    </div>
  );
}

// Invoice detail
function InvoiceDetail({ id, nav }) {
  const inv = invoices.find(i => i.id === id) || invoices[0];
  const lines = invoiceLines[inv.id] || [{ desc: inv.type, qty: '1', rate: inv.amount, amount: inv.amount }];
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  return (
    <div style={{ paddingBottom: 24 }}>
      <ScreenHeader title="Qaimə" subtitle={inv.id} onBack={nav.pop}
        right={<button style={iconBtn}><Icon.download size={19}/></button>}/>
      <div style={{ padding: '0 18px' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>Qaimə nömrəsi</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, fontFamily: "'Geist Mono', monospace", marginTop: 2 }}>{inv.id}</div>
            </div>
            <PayBadge status={inv.status}/>
          </div>
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.lineSoft}` }}>
            <InfoRow label="Tarix" value={azDate(inv.date)}/>
            <InfoRow label="Növ" value={inv.type}/>
            <InfoRow label="Texnika" value={inv.eq}/>
            <InfoRow label="Layihə" value={inv.project} last/>
          </div>
        </Card>

        <SectionHead title="Sətirlər" style={{ marginTop: 22 }}/>
        <Card>
          {lines.map((l, i) => (
            <div key={i} style={{ padding: '4px 0 12px', borderBottom: i === lines.length-1 ? 'none' : `1px solid ${C.lineSoft}`, marginBottom: i === lines.length-1 ? 0 : 12 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{l.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                <span style={{ fontSize: 12.5, color: C.muted }}>{l.qty} × {azn(l.rate, 0)}</span>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, fontFeatureSettings: '"tnum"' }}>{azn(l.amount, 0)}</span>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14, paddingTop: 14, borderTop: `1.5px solid ${C.line}` }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Cəmi</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: C.brand, letterSpacing: '-0.02em', fontFeatureSettings: '"tnum"' }}>{azn(subtotal)}</span>
          </div>
        </Card>

        <Button full variant="secondary" icon={<Icon.download size={18}/>} style={{ marginTop: 18 }}>Qaiməni endir (PDF)</Button>
      </div>
    </div>
  );
}

Object.assign(window, { FinanceScreen, InvoiceDetail });
