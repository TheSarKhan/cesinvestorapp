// ── Chart primitives ──

// Donut chart for status breakdown
function Donut({ segments, size = 116, stroke = 16, centerLabel, centerSub }) {
  const total = segments.reduce((s, x) => s + x.count, 0) || 1;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.lineSoft} strokeWidth={stroke}/>
        {segments.map((s, i) => {
          const len = (s.count / total) * circ;
          const el = (
            <circle key={i} cx={size/2} cy={size/2} r={r} fill="none"
              stroke={s.color} strokeWidth={stroke}
              strokeDasharray={`${len} ${circ - len}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"/>
          );
          offset += len;
          return el;
        })}
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em', fontFeatureSettings: '"tnum"' }}>{centerLabel}</div>
        {centerSub && <div style={{ fontSize: 11, color: C.muted, marginTop: -1 }}>{centerSub}</div>}
      </div>
    </div>
  );
}

// Smooth-ish line/area chart for earnings trend
function LineChart({ data, labels, color = C.brand, width = 320, height = 120, showDots = true, currency = true }) {
  const pad = { l: 8, r: 8, t: 14, b: 22 };
  const w = width - pad.l - pad.r, h = height - pad.t - pad.b;
  const max = Math.max(...data) * 1.08, min = Math.min(...data) * 0.85;
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    pad.l + (i / (data.length - 1)) * w,
    pad.t + h - ((v - min) / range) * h,
  ]);
  const line = pts.map((p, i) => (i ? `L${p[0]},${p[1]}` : `M${p[0]},${p[1]}`)).join(' ');
  const area = `${line} L${pts[pts.length-1][0]},${pad.t + h} L${pts[0][0]},${pad.t + h} Z`;
  const gid = 'lc' + color.replace('#','');
  const last = pts[pts.length - 1];
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map(g => (
        <line key={g} x1={pad.l} x2={width-pad.r} y1={pad.t + h*g} y2={pad.t + h*g}
          stroke={C.lineSoft} strokeWidth="1"/>
      ))}
      <path d={area} fill={`url(#${gid})`}/>
      <path d={line} fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"/>
      {showDots && (
        <>
          <circle cx={last[0]} cy={last[1]} r="5.5" fill={C.white} stroke={color} strokeWidth="2.4"/>
        </>
      )}
      {labels && labels.map((l, i) => (
        <text key={i} x={pad.l + (i/(labels.length-1))*w} y={height-5}
          fontSize="9.5" fill={C.faint} textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', sans-serif">{l}</text>
      ))}
    </svg>
  );
}

// Bar chart
function BarChart({ data, labels, color = C.brand, height = 110 }) {
  const max = Math.max(...data) || 1;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height }}>
      {data.map((v, i) => {
        const active = i === data.length - 1;
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, height: '100%' }}>
            <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
              <div style={{
                width: '100%', height: `${(v/max)*100}%`,
                background: active ? color : C.bgSunk,
                borderRadius: 5,
                transition: 'height 0.4s ease',
              }}/>
            </div>
            <div style={{ fontSize: 9.5, color: active ? C.ink : C.faint, fontWeight: active ? 600 : 500 }}>{labels[i]}</div>
          </div>
        );
      })}
    </div>
  );
}

// Tiny sparkline
function Spark({ data, color = C.brand, width = 60, height = 26 }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => [(i/(data.length-1))*width, height - 2 - ((v-min)/range)*(height-4)]);
  const line = pts.map((p, i) => (i ? `L${p[0]},${p[1]}` : `M${p[0]},${p[1]}`)).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

// Progress bar (utilization)
function Progress({ value, color = C.brand, height = 8, bg = C.bgSunk, showLabel }) {
  return (
    <div>
      <div style={{ height, background: bg, borderRadius: 999, overflow: 'hidden' }}>
        <div style={{
          width: `${Math.min(100, value)}%`, height: '100%',
          background: color, borderRadius: 999, transition: 'width 0.5s ease',
        }}/>
      </div>
    </div>
  );
}

Object.assign(window, { Donut, LineChart, BarChart, Spark, Progress });
