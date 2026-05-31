// ── Texnika Detalı ──

function EquipmentDetail({ id, nav }) {
  const e = equipment.find(x => x.id === id) || equipment[0];
  const st = EQ_STATUS[e.status];
  const recs = serviceRecords[e.id] || [];
  const hist = projectHistory[e.id] || [];
  const docs = eqDocs[e.id] || documents.filter(d => d.name.includes(e.code));
  const [specsOpen, setSpecsOpen] = React.useState(false);
  const serviceSoon = e.nextServiceDays <= 30;

  return (
    <div style={{ paddingBottom: 24 }}>
      <ScreenHeader title={e.name} subtitle={`${e.code} · ${e.type}`} onBack={nav.pop}
        right={<button style={iconBtn}><Icon.dots size={20}/></button>}/>

      <div style={{ padding: '0 18px' }}>
        {/* A. Hero / image */}
        <div style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid ${C.line}`, background: C.card }}>
          <div style={{ position: 'relative', height: 168, background: `linear-gradient(150deg, ${e.accent}1f, ${e.accent}08)`, display: 'grid', placeItems: 'center' }}>
            <EqThumb kind={e.img} accent={e.accent} size={120} radius={0}/>
            <div style={{ position: 'absolute', top: 12, left: 12 }}><EqBadge status={e.status}/></div>
            <div style={{ position: 'absolute', bottom: 10, right: 12, display: 'flex', gap: 5 }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: 999, background: i === 0 ? e.accent : C.line }}/>)}
            </div>
            <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: C.muted, background: 'rgba(255,255,255,0.8)', borderRadius: 8, padding: '4px 8px' }}>
              <Icon.image size={13}/> 3
            </div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}>{e.name}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>{e.brand} · {e.model} · {e.year}</div>
          </div>
        </div>

        {/* B. Current status */}
        <Card style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Icon.pin size={17} style={{ color: e.accent }}/>
            <span style={{ fontSize: 14.5, fontWeight: 700, color: C.ink }}>Cari vəziyyət</span>
          </div>
          {e.status === 'service' ? (
            <div>
              <InfoRow label="Vəziyyət" value="Servisdə / baxışda"/>
              <InfoRow label="Səbəb" value={e.serviceReason}/>
              <InfoRow label="Gözlənilən bitmə" value={azDate(e.serviceEnd)} last/>
            </div>
          ) : e.status === 'available' ? (
            <div>
              <InfoRow label="Vəziyyət" value="Boşdadır"/>
              <InfoRow label="Yer" value={e.region}/>
              <InfoRow label="Boşdadır" value={azDate(e.idleSince) + '-dən' } last/>
            </div>
          ) : (
            <div>
              <InfoRow label="Layihə" value={e.project}/>
              <InfoRow label="Region" value={e.region}/>
              <InfoRow label="İcarə müddəti" value={`${azDate(e.rentStart)} – ${azDate(e.rentEnd)}`}/>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0 2px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, color: C.muted }}>Təxmini qaytarılma</div>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.blueTint, color: C.blue, borderRadius: 10, padding: '6px 11px', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  <Icon.clock size={14}/> {e.returnDays} gün qalıb
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* C. Income / performance */}
        <SectionHead title="Gəlir və performans" style={{ marginTop: 22 }}/>
        <Card>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, padding: '12px 14px', borderRadius: 14, background: C.brandTint }}>
              <div style={{ fontSize: 11.5, color: C.brandDk, fontWeight: 600 }}>Ümumi qazanc</div>
              <div style={{ fontSize: 21, fontWeight: 700, color: C.brandDk, letterSpacing: '-0.02em', marginTop: 3, fontFeatureSettings: '"tnum"' }}>{aznWhole(e.totalEarn)}</div>
            </div>
            <div style={{ flex: 1, padding: '12px 14px', borderRadius: 14, background: C.bgSunk }}>
              <div style={{ fontSize: 11.5, color: C.muted, fontWeight: 600 }}>Bu ay</div>
              <div style={{ fontSize: 21, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em', marginTop: 3, fontFeatureSettings: '"tnum"' }}>{aznWhole(e.monthEarn)}</div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
              <span style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>İstifadə dərəcəsi</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{e.utilization}%</span>
            </div>
            <Progress value={e.utilization} color={e.accent}/>
            <div style={{ fontSize: 11.5, color: C.faint, marginTop: 6 }}>İcarə günləri / ümumi günlər nisbəti</div>
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.lineSoft}`, display: 'flex', gap: 20 }}>
            <ROIItem label="Alış qiyməti" value={aznWhole(e.buyPrice)}/>
            <ROIItem label="Cari bazar dəyəri" value={aznWhole(e.marketValue)}/>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12.5, color: C.muted, fontWeight: 600, marginBottom: 4 }}>Aylıq qazanc trendi · son 12 ay</div>
            <LineChart data={e.trend} labels={['','','','','','','','','','','','']} color={e.accent} width={320} height={96} showDots/>
          </div>
        </Card>

        {/* E. Service / health */}
        <SectionHead title="Texniki baxış və sağlamlıq" style={{ marginTop: 22 }}/>
        <Card>
          {serviceSoon && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 12px', borderRadius: 12, background: C.purpleTint, marginBottom: 12 }}>
              <Icon.warn size={17} style={{ color: C.purple }}/>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: C.purple, flex: 1 }}>Növbəti texniki baxışa {e.nextServiceDays} gün qalıb</span>
            </div>
          )}
          <InfoRow label="Növbəti texniki baxış" value={azDate(e.nextService)} icon={<Icon.calendar size={16}/>}/>
          <InfoRow label="Son baxış" value={azDate(e.lastService)} icon={<Icon.history size={16}/>}/>
          <InfoRow label="Texniki hazırlıq" value={e.readiness} icon={<Icon.gauge size={16}/>}/>
          <InfoRow label="Təhlükəsizlik avadanlığı" value={e.safety} icon={<Icon.shield size={16}/>} last/>
        </Card>

        {/* G. Project history (timeline) */}
        {hist.length > 0 && (
          <>
            <SectionHead title="Layihə keçmişi" style={{ marginTop: 22 }}/>
            <Card>
              {hist.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: i === hist.length-1 ? 0 : 16 }}>
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ width: 11, height: 11, borderRadius: 999, background: i === 0 ? e.accent : C.white, border: `2.5px solid ${i === 0 ? e.accent : C.line}`, marginTop: 3, zIndex: 1 }}/>
                    {i < hist.length-1 && <span style={{ flex: 1, width: 2, background: C.lineSoft, marginTop: 2 }}/>}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 2 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, letterSpacing: '-0.01em' }}>{h.project}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{h.region} · {azDate(h.from).slice(0,5)} – {h.to === 'Davam edir' ? 'Davam edir' : azDate(h.to).slice(0,5)}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: e.accent, marginTop: 4 }}>{azn(h.earn, 0)} gəlir</div>
                  </div>
                </div>
              ))}
            </Card>
          </>
        )}

        {/* F. Service / repair history */}
        {recs.length > 0 && (
          <>
            <SectionHead title="Servis tarixçəsi" style={{ marginTop: 22 }}/>
            <Card pad={4}>
              {recs.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px', borderBottom: i === recs.length-1 ? 'none' : `1px solid ${C.lineSoft}` }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: r.type === 'Təmir' ? C.redTint : C.greenTint, color: r.type === 'Təmir' ? C.red : C.green, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Icon.wrench size={16}/>
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{r.type}</span>
                      <span style={{ fontSize: 11.5, color: C.faint, fontWeight: 600 }}>{azDate(r.date)}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>{r.desc}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 11, fontWeight: 600, color: r.payer === 'İnvestor' ? C.amber : C.ink70, background: r.payer === 'İnvestor' ? C.amberTint : C.bgSunk, borderRadius: 7, padding: '3px 8px' }}>
                      Xərc: {r.payer}
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </>
        )}

        {/* H. Documents */}
        <SectionHead title="Sənədlər" action="Yüklə" onAction={() => nav.push({ screen: 'upload', eq: e.code })} style={{ marginTop: 22 }}/>
        <Card pad={4}>
          {docs.length === 0 && <div style={{ padding: 16 }}><Empty icon={<Icon.docs size={22}/>} title="Sənəd yoxdur" sub="Bu texnikaya aid sənəd əlavə edin."/></div>}
          {docs.map((d, i) => <DocRow key={i} d={d} last={i === docs.length-1}/>)}
        </Card>

        {/* D. Specs (collapsible) */}
        <Card style={{ marginTop: 22, padding: 0 }}>
          <button onClick={() => setSpecsOpen(o => !o)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: 16,
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <Icon.sliders size={18} style={{ color: C.faint }}/>
            <span style={{ flex: 1, textAlign: 'left', fontSize: 14.5, fontWeight: 700, color: C.ink }}>Texniki məlumat</span>
            <span style={{ transform: specsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: C.faint }}><Icon.chevD size={18}/></span>
          </button>
          {specsOpen && (
            <div style={{ padding: '0 16px 8px' }}>
              <InfoRow label="Seriya nömrəsi" value={e.serial} mono icon={<Icon.file size={16}/>}/>
              <InfoRow label="Qeydiyyat nişanı" value={e.plate} mono icon={<Icon.card size={16}/>}/>
              <InfoRow label="İstehsal ili" value={e.year} icon={<Icon.calendar size={16}/>}/>
              <InfoRow label="Moto saatlar" value={e.hours} icon={<Icon.clock size={16}/>}/>
              <InfoRow label="Çəki" value={e.weight} icon={<Icon.weight size={16}/>} last/>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function ROIItem({ label, value }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11.5, color: C.faint, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginTop: 3, fontFeatureSettings: '"tnum"' }}>{value}</div>
    </div>
  );
}

function DocRow({ d, last, onClick }) {
  const typeColor = { 'Müqavilə': C.blue, 'Sertifikat': C.green, 'Sığorta': C.purple, 'Texnika sənədi': C.amber }[d.type] || C.gray;
  const tint = { 'Müqavilə': C.blueTint, 'Sertifikat': C.greenTint, 'Sığorta': C.purpleTint, 'Texnika sənədi': C.amberTint }[d.type] || C.grayTint;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderBottom: last ? 'none' : `1px solid ${C.lineSoft}` }}>
      <span style={{ width: 38, height: 38, borderRadius: 10, background: tint, color: typeColor, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon.file size={17}/></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
        <div style={{ fontSize: 11.5, color: C.muted, marginTop: 1 }}>{d.type} · {d.size} · {azDate(d.date)}</div>
      </div>
      {d.status === 'pending' && <span style={{ fontSize: 10.5, fontWeight: 700, color: C.amber, background: C.amberTint, borderRadius: 7, padding: '3px 7px', whiteSpace: 'nowrap' }}>Gözləyir</span>}
      <button style={{ width: 32, height: 32, borderRadius: 9, background: C.bgSunk, border: 'none', color: C.ink70, display: 'grid', placeItems: 'center', cursor: 'pointer', flexShrink: 0 }}><Icon.download size={16}/></button>
    </div>
  );
}

Object.assign(window, { EquipmentDetail, DocRow });
