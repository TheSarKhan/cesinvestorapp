// ── Sənədlər + Sənəd yükləmə (v2) ──

function DocumentsScreen({ nav }) {
  const [filter, setFilter] = React.useState('all');
  const types = [
    { id: 'all', label: 'Hamısı' },
    { id: 'Müqavilə', label: 'Müqavilələr' },
    { id: 'Texnika sənədi', label: 'Texnika' },
    { id: 'Sığorta', label: 'Sığorta' },
  ];
  const list = documents.filter(d => filter === 'all' || d.type === filter);

  return (
    <div style={{ paddingBottom: 24 }}>
      <ScreenHeader title="Sənədlər" subtitle={`${documents.length} sənəd`}
        right={<button onClick={() => nav.push({ screen: 'upload' })} style={{ ...iconBtn, background: C.brand, borderColor: C.brand, color: '#fff' }}><Icon.plus size={20}/></button>}/>
      <div style={{ padding: '0 18px' }}>
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', margin: '0 -18px', padding: '2px 18px 4px', scrollbarWidth: 'none' }} className="noscroll">
          {types.map(t => {
            const active = filter === t.id;
            return (
              <button key={t.id} onClick={() => setFilter(t.id)} style={{
                padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0,
                background: active ? C.ink : C.card, border: `1px solid ${active ? C.ink : C.line}`,
                color: active ? '#fff' : C.ink70, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>{t.label}</button>
            );
          })}
        </div>
        <Card pad={4} style={{ marginTop: 14 }}>
          {list.map((d, i) => <DocRow key={i} d={d} last={i === list.length-1}/>)}
          {list.length === 0 && <div style={{ padding: 16 }}><Empty icon={<Icon.docs size={22}/>} title="Sənəd yoxdur"/></div>}
        </Card>
      </div>
    </div>
  );
}

// Upload flow (v2)
function UploadScreen({ nav, presetEq }) {
  const [type, setType] = React.useState('Müqavilə');
  const [eq, setEq] = React.useState(presetEq || '');
  const [file, setFile] = React.useState(null);
  const [stage, setStage] = React.useState('form'); // form | uploading | done
  const [progress, setProgress] = React.useState(0);

  const startUpload = () => {
    setStage('uploading');
    setProgress(0);
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setStage('done'); return 100; }
        return p + 8;
      });
    }, 90);
  };

  if (stage === 'done') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <ScreenHeader title="Sənəd yükləndi" onBack={nav.pop}/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
          <div style={{ width: 76, height: 76, borderRadius: '50%', background: C.greenTint, color: C.green, display: 'grid', placeItems: 'center', marginBottom: 20 }}><Icon.check size={40}/></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}>Uğurla yükləndi</div>
          <div style={{ fontSize: 13.5, color: C.muted, marginTop: 8, maxWidth: 280, lineHeight: 1.5 }}>Sənədiniz admin yoxlamasına göndərildi. Təsdiqlənənə qədər “Gözləyir” damğası ilə görünəcək.</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 12, fontWeight: 700, color: C.amber, background: C.amberTint, borderRadius: 9, padding: '7px 12px' }}>
            <Icon.hourglass size={15}/> Gözləyir — admin yoxlaması
          </div>
          <Button full onClick={nav.pop} style={{ marginTop: 32 }}>Sənədlərə qayıt</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScreenHeader title="Sənəd yüklə" onBack={nav.pop}/>
      <div style={{ flex: 1, padding: '4px 18px 18px', display: 'flex', flexDirection: 'column' }}>
        {/* Type */}
        <FieldLabel>Sənəd növü</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
          {['Müqavilə', 'Texnika sənədi', 'Sığorta', 'Digər'].map(t => (
            <button key={t} onClick={() => setType(t)} style={{
              padding: '12px', borderRadius: 12, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
              background: type === t ? C.brandTint : C.card,
              border: `1.5px solid ${type === t ? C.brand : C.line}`,
              color: type === t ? C.brandDk : C.ink70, fontSize: 13, fontWeight: 600,
            }}>{t}</button>
          ))}
        </div>

        {/* Equipment */}
        <FieldLabel>Əlaqəli texnika</FieldLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 14px', borderRadius: 13, background: C.card, border: `1.5px solid ${C.line}`, marginBottom: 18 }}>
          <Icon.truck size={18} style={{ color: C.faint }}/>
          <select value={eq} onChange={e => setEq(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', background: 'none', fontFamily: 'inherit', fontSize: 14, color: eq ? C.ink : C.faint, appearance: 'none', cursor: 'pointer' }}>
            <option value="">Texnika seçin (opsional)</option>
            {equipment.map(e => <option key={e.id} value={e.code}>{e.code} · {e.name}</option>)}
          </select>
          <Icon.chevD size={16} style={{ color: C.faint }}/>
        </div>

        {/* File picker */}
        <FieldLabel>Fayl</FieldLabel>
        {!file ? (
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {[{ ic: <Icon.camera size={20}/>, l: 'Kamera' }, { ic: <Icon.image size={20}/>, l: 'Qalereya' }, { ic: <Icon.file size={20}/>, l: 'Fayl' }].map(o => (
              <button key={o.l} onClick={() => setFile({ name: 'sənəd_2026.pdf', size: '1,4 MB' })} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '18px 8px', borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit',
                background: C.card, border: `1.5px dashed ${C.line}`, color: C.ink70, fontSize: 12, fontWeight: 600,
              }}>
                <span style={{ color: C.brand }}>{o.ic}</span>{o.l}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 13, borderRadius: 13, background: C.card, border: `1px solid ${C.line}`, marginBottom: 18 }}>
            <span style={{ width: 40, height: 40, borderRadius: 10, background: C.redTint, color: C.red, display: 'grid', placeItems: 'center' }}><Icon.file size={18}/></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{file.name}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{file.size}</div>
            </div>
            <button onClick={() => setFile(null)} style={{ width: 30, height: 30, borderRadius: 8, background: C.bgSunk, border: 'none', color: C.muted, display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon.x size={16}/></button>
          </div>
        )}

        {/* Note */}
        <FieldLabel>Qeyd (opsional)</FieldLabel>
        <textarea placeholder="Sənəd haqqında qısa qeyd…" rows={3} style={{
          padding: '12px 14px', borderRadius: 13, background: C.card, border: `1.5px solid ${C.line}`,
          fontFamily: 'inherit', fontSize: 14, color: C.ink, outline: 'none', resize: 'none', marginBottom: 18,
        }}/>

        {stage === 'uploading' && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 12.5, color: C.muted, fontWeight: 600 }}>Yüklənir…</span>
              <span style={{ fontSize: 12.5, color: C.ink, fontWeight: 700 }}>{progress}%</span>
            </div>
            <Progress value={progress}/>
          </div>
        )}

        <div style={{ flex: 1 }}/>
        <Button full onClick={startUpload} icon={<Icon.upload size={18}/>} disabled={!file}
          style={!file ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
          {stage === 'uploading' ? 'Yüklənir…' : 'Yüklə'}
        </Button>
      </div>
    </div>
  );
}

function FieldLabel({ children }) {
  return <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink70, marginBottom: 9 }}>{children}</div>;
}

Object.assign(window, { DocumentsScreen, UploadScreen });
