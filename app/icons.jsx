// ── Icon set · stroke = currentColor ──
const mk = (paths, vb = 24, sw = 1.7) => (p = {}) => (
  <svg viewBox={`0 0 ${vb} ${vb}`} width={p.size || 22} height={p.size || 22}
    fill="none" stroke="currentColor" strokeWidth={p.sw || sw}
    strokeLinecap="round" strokeLinejoin="round" style={p.style}>
    {paths}
  </svg>
);

const Icon = {
  home: mk(<><path d="M3 11.4 12 4l9 7.4"/><path d="M5.5 9.8V19a1 1 0 0 0 1 1H9.5v-5.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V20h3a1 1 0 0 0 1-1V9.8"/></>),
  truck: mk(<><path d="M2 7.5A1.5 1.5 0 0 1 3.5 6h9A1.5 1.5 0 0 1 14 7.5V16H2z"/><path d="M14 9.5h3.6a1.5 1.5 0 0 1 1.3.8L21 14v2h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></>),
  wallet: mk(<><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H18a1 1 0 0 1 1 1v1.5"/><path d="M3 7.5V17a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2.5"/><circle cx="16.5" cy="13.5" r="1.1" fill="currentColor" stroke="none"/></>),
  docs: mk(<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></>),
  user: mk(<><circle cx="12" cy="8" r="3.6"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></>),
  bell: mk(<><path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5H3.5S6 15 6 9"/><path d="M10 20a2 2 0 0 0 4 0"/></>),
  search: mk(<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/></>),
  filter: mk(<><path d="M4 6h16M7 12h10M10 18h4"/></>),
  chevR: mk(<path d="M9 5l7 7-7 7"/>, 24, 1.9),
  chevL: mk(<path d="M15 5l-7 7 7 7"/>, 24, 1.9),
  chevD: mk(<path d="M5 9l7 7 7-7"/>, 24, 1.9),
  arrowR: mk(<><path d="M4 12h15"/><path d="M13 6l7 6-7 6"/></>),
  plus: mk(<path d="M12 5v14M5 12h14"/>, 24, 1.9),
  check: mk(<path d="M4 12.5 9.5 18 20 6.5"/>, 24, 2),
  x: mk(<path d="M6 6l12 12M18 6 6 18"/>, 24, 1.9),
  pin: mk(<><path d="M12 21s7-6.7 7-12a7 7 0 0 0-14 0c0 5.3 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></>),
  calendar: mk(<><rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></>),
  clock: mk(<><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></>),
  trendUp: mk(<><path d="M3 16 9 10l4 4 8-8"/><path d="M15 6h6v6"/></>, 24, 1.9),
  trendDown: mk(<><path d="M3 8 9 14l4-4 8 8"/><path d="M15 18h6v-6"/></>, 24, 1.9),
  dots: (p={}) => (<svg viewBox="0 0 24 24" width={p.size||22} height={p.size||22} fill="currentColor"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>),
  download: mk(<><path d="M12 3v11"/><path d="M8 11l4 4 4-4"/><path d="M5 19h14"/></>),
  upload: mk(<><path d="M12 16V5"/><path d="M8 9l4-4 4 4"/><path d="M5 19h14"/></>),
  eye: mk(<><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></>),
  shield: mk(<><path d="M12 3 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6z"/><path d="M9.2 12l2 2 3.6-3.8"/></>),
  lock: mk(<><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>),
  mail: mk(<><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></>),
  building: mk(<><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-2.5h4V21"/></>),
  globe: mk(<><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17"/></>),
  gauge: mk(<><path d="M4 14a8 8 0 0 1 16 0"/><path d="M12 14l3.5-3"/><circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none"/></>),
  wrench: mk(<><path d="M15 7a3.5 3.5 0 0 0-4.6 4.3l-6 6a1.5 1.5 0 0 0 2.1 2.1l6-6A3.5 3.5 0 0 0 17 8.9"/><path d="M14.5 7.5 17 5"/></>),
  history: mk(<><path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5"/><path d="M4 4v4.5h4.5"/><path d="M12 8v4.2l3 1.8"/></>),
  receipt: mk(<><path d="M6 3h12v18l-2.2-1.4L13.6 21l-2.2-1.4L9.2 21 7 19.6 5 21V5a2 2 0 0 1 1-2z"/><path d="M9 8h6M9 12h6"/></>),
  card: mk(<><rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M3 10h18"/></>),
  logout: mk(<><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><path d="M9 16l-5-4 5-4"/><path d="M4 12h11"/></>),
  warn: mk(<><path d="M12 4 2.5 20h19z"/><path d="M12 10v4M12 17h.01"/></>),
  sliders: mk(<><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></>),
  camera: mk(<><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.2"/></>),
  image: mk(<><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="10" r="1.6"/><path d="m4 17 4.5-4 3 2.5L15 12l5 5"/></>),
  file: mk(<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></>),
  refresh: mk(<><path d="M4 11a8 8 0 0 1 14-4l2 2"/><path d="M20 4v5h-5"/><path d="M20 13a8 8 0 0 1-14 4l-2-2"/><path d="M4 20v-5h5"/></>),
  hourglass: mk(<><path d="M7 4h10M7 20h10"/><path d="M7 4c0 4 5 4 5 8s-5 4-5 8M17 4c0 4-5 4-5 8s5 4 5 8"/></>),
  fuel: mk(<><rect x="5" y="4" width="9" height="16" rx="1.5"/><path d="M5 12h9"/><path d="M14 8l3 2v6a1.5 1.5 0 0 0 3 0V9l-3-3"/></>),
  weight: mk(<><circle cx="12" cy="7" r="2.5"/><path d="M9.5 9 6 19h12L14.5 9z"/></>),
  chart: mk(<><path d="M4 4v16h16"/><path d="M8 14v3M12 10v7M16 6v11"/></>),
  link: mk(<><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 13 4.5a3.5 3.5 0 0 1 5 5l-2 2"/><path d="M13 17.5 11 19.5a3.5 3.5 0 0 1-5-5l2-2"/></>),
};

Object.assign(window, { Icon });
