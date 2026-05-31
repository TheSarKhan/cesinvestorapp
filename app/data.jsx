// ── Mock data ──

const investor = {
  name: 'Rəşad Məmmədov',
  company: 'Məmmədov İnvestisiya MMC',
  voen: '1700425831',
  email: 'r.mammadov@invorent.az',
  phone: '+994 50 245 18 30',
  member: '14.02.2024',
  initials: 'RM',
};

// status: available | rented | transit | service | repair | retired
const equipment = [
  {
    id: 'EQ-012', name: 'Caterpillar 320D', code: 'EQ-012',
    type: 'Ekskavator', brand: 'Caterpillar', model: '320D', year: 2021,
    status: 'rented', img: 'excavator',
    project: 'Yeni Yasamal Yaşayış Kompleksi', region: 'Bakı, Yasamal',
    rentStart: '2026-04-24', rentEnd: '2026-07-24', returnDays: 55,
    totalEarn: 142600, monthEarn: 11400, dailyRate: 480,
    utilization: 86, buyPrice: 168000, marketValue: 132000,
    serial: 'CAT320D04891', plate: '90-AB-481', hours: '6.248 saat', weight: '22,1 ton',
    nextService: '2026-06-22', nextServiceDays: 23, lastService: '2026-03-18',
    readiness: 'Yararlı', safety: 'Tam',
    trend: [8.2, 9.1, 8.8, 10.4, 9.9, 11.2, 10.8, 11.6, 11.1, 11.9, 11.4, 12.1],
    accent: '#D97706',
  },
  {
    id: 'EQ-007', name: 'Liebherr LTM 1090', code: 'EQ-007',
    type: 'Mobil kran', brand: 'Liebherr', model: 'LTM 1090-4.2', year: 2019,
    status: 'rented', img: 'crane',
    project: 'Liman Genişləndirmə Layihəsi', region: 'Sumqayıt, Liman',
    rentStart: '2026-03-10', rentEnd: '2026-09-10', returnDays: 103,
    totalEarn: 318400, monthEarn: 28800, dailyRate: 1240,
    utilization: 92, buyPrice: 420000, marketValue: 356000,
    serial: 'LBH109021704', plate: '99-CD-217', hours: '4.892 saat', weight: '48 ton',
    nextService: '2026-07-02', nextServiceDays: 33, lastService: '2026-02-28',
    readiness: 'Yararlı', safety: 'Tam',
    trend: [22, 24.5, 26, 25.2, 27.8, 28.1, 28.6, 28.8, 28.4, 28.9, 28.8, 28.8],
    accent: '#2563EB',
  },
  {
    id: 'EQ-021', name: 'Hyundai R225', code: 'EQ-021',
    type: 'Ekskavator', brand: 'Hyundai', model: 'R225LC-9S', year: 2020,
    status: 'service', img: 'excavator',
    project: '—', region: 'Gəncə, Servis Mərkəzi',
    serviceReason: 'Hidravlik sistem baxışı', serviceEnd: '2026-06-04',
    totalEarn: 86400, monthEarn: 2100, dailyRate: 360,
    utilization: 64, buyPrice: 152000, marketValue: 118000,
    serial: 'HYDR22508812', plate: '20-EF-088', hours: '5.560 saat', weight: '22,5 ton',
    nextService: '2026-06-04', nextServiceDays: 5, lastService: '2026-05-18',
    readiness: 'Baxışda', safety: 'Yoxlanılır',
    trend: [7, 6.5, 7.2, 6.8, 6, 5.5, 4.8, 3, 2.4, 1.8, 2.1, 2.1],
    accent: '#7C3AED',
  },
  {
    id: 'EQ-015', name: 'JCB 3CX', code: 'EQ-015',
    type: 'Ekskavator-yükləyici', brand: 'JCB', model: '3CX Eco', year: 2022,
    status: 'transit', img: 'backhoe',
    project: 'Sahil Plaza İnşaatı', region: 'Bakı → Xəzər',
    rentStart: '2026-06-01', rentEnd: '2026-08-30', returnDays: 92,
    totalEarn: 96400, monthEarn: 8280, dailyRate: 360,
    utilization: 78, buyPrice: 124000, marketValue: 108000,
    serial: 'JCB3CX77329', plate: '10-GH-773', hours: '3.492 saat', weight: '8,6 ton',
    nextService: '2026-08-12', nextServiceDays: 74, lastService: '2026-04-02',
    readiness: 'Yararlı', safety: 'Tam',
    trend: [4.2, 4.8, 5, 5.5, 6, 6.4, 7, 7.2, 7.6, 7.8, 8.2, 8.3],
    accent: '#2563EB',
  },
  {
    id: 'EQ-009', name: 'Bobcat S650', code: 'EQ-009',
    type: 'Mini yükləyici', brand: 'Bobcat', model: 'S650', year: 2021,
    status: 'available', img: 'loader',
    project: '—', region: 'Bakı, Mərkəzi Anbar',
    idleSince: '2026-05-09',
    totalEarn: 28400, monthEarn: 0, dailyRate: 240,
    utilization: 41, buyPrice: 78000, marketValue: 64000,
    serial: 'BCS65044012', plate: '77-IJ-440', hours: '1.820 saat', weight: '3,8 ton',
    nextService: '2026-09-01', nextServiceDays: 94, lastService: '2026-01-20',
    readiness: 'Yararlı', safety: 'Tam',
    trend: [3, 2.8, 2.4, 2, 1.8, 1.4, 1, 0.8, 0.6, 0.4, 0.4, 0],
    accent: '#15A34A',
  },
  {
    id: 'EQ-018', name: 'Wacker Neuson G70', code: 'EQ-018',
    type: 'Generator', brand: 'Wacker Neuson', model: 'G70', year: 2023,
    status: 'rented', img: 'generator',
    project: 'Sahil Plaza İnşaatı', region: 'Bakı, Xəzər',
    rentStart: '2026-02-15', rentEnd: '2026-12-15', returnDays: 199,
    totalEarn: 41200, monthEarn: 3680, dailyRate: 160,
    utilization: 88, buyPrice: 52000, marketValue: 47000,
    serial: 'WNG7011203', plate: '—', hours: '3.104 saat', weight: '1,2 ton',
    nextService: '2026-06-30', nextServiceDays: 31, lastService: '2026-03-30',
    readiness: 'Yararlı', safety: 'Tam',
    trend: [2.8, 3, 2.9, 3.2, 3.4, 3.5, 3.5, 3.6, 3.6, 3.7, 3.7, 3.68],
    accent: '#D97706',
  },
];

// Service records per equipment id
const serviceRecords = {
  'EQ-012': [
    { type: 'Texniki baxış', date: '2026-03-18', desc: 'Yağ və filtr dəyişimi, hidravlik yoxlama', payer: 'Şirkət' },
    { type: 'Təmir', date: '2025-11-04', desc: 'Tırtıl zəncirinin bərpası', payer: 'İnvestor' },
    { type: 'Texniki baxış', date: '2025-08-22', desc: 'Planlı 500 saat servisi', payer: 'Şirkət' },
  ],
  'EQ-007': [
    { type: 'Texniki baxış', date: '2026-02-28', desc: 'Kran trosunun yoxlanışı və yağlama', payer: 'Şirkət' },
    { type: 'Təmir', date: '2025-12-10', desc: 'Dayaq ayaqlarının hidravlik təmiri', payer: 'Şirkət' },
  ],
  'EQ-021': [
    { type: 'Təmir', date: '2026-05-18', desc: 'Hidravlik nasosun dəyişdirilməsi', payer: 'İnvestor' },
    { type: 'Texniki baxış', date: '2026-02-11', desc: 'Planlı baxış', payer: 'Şirkət' },
  ],
};

// Project history (timeline) per equipment
const projectHistory = {
  'EQ-012': [
    { project: 'Yeni Yasamal Yaşayış Kompleksi', region: 'Bakı, Yasamal', from: '2026-04-24', to: 'Davam edir', earn: 11400 },
    { project: 'Sahil Plaza İnşaatı', region: 'Bakı, Xəzər', from: '2025-09-06', to: '2026-04-02', earn: 78600 },
    { project: 'Magistral Yol Təmiri', region: 'Abşeron', from: '2025-03-12', to: '2025-08-28', earn: 52600 },
  ],
  'EQ-007': [
    { project: 'Liman Genişləndirmə Layihəsi', region: 'Sumqayıt', from: '2026-03-10', to: 'Davam edir', earn: 28800 },
    { project: 'Limak Tikinti Bazası', region: 'Bakı', from: '2025-06-01', to: '2026-02-20', earn: 198400 },
  ],
};

// Equipment documents
const eqDocs = {
  'EQ-012': [
    { type: 'Müqavilə', name: 'İcarə müqaviləsi EQ-012', date: '2026-04-20', size: '2,4 MB' },
    { type: 'Sertifikat', name: 'Texniki pasport', date: '2021-05-12', size: '1,1 MB' },
    { type: 'Sığorta', name: 'KASKO sığorta polisi', date: '2026-01-15', size: '840 KB' },
  ],
};

// Invoices
const invoices = [
  { id: 'QAI-2026-0148', date: '2026-05-24', amount: 28800, type: 'İcarə haqqı', status: 'paid',    eq: 'Liebherr LTM 1090', project: 'Liman Genişləndirmə' },
  { id: 'QAI-2026-0147', date: '2026-05-24', amount: 11400, type: 'İcarə haqqı', status: 'paid',    eq: 'Caterpillar 320D',  project: 'Yeni Yasamal' },
  { id: 'QAI-2026-0146', date: '2026-05-20', amount: 8280,  type: 'İcarə haqqı', status: 'pending', eq: 'JCB 3CX',           project: 'Sahil Plaza' },
  { id: 'QAI-2026-0145', date: '2026-05-18', amount: 3680,  type: 'İcarə haqqı', status: 'paid',    eq: 'Wacker Neuson G70', project: 'Sahil Plaza' },
  { id: 'QAI-2026-0144', date: '2026-05-15', amount: 2100,  type: 'Servis payı',  status: 'overdue', eq: 'Hyundai R225',     project: '—' },
  { id: 'QAI-2026-0139', date: '2026-04-24', amount: 28800, type: 'İcarə haqqı', status: 'paid',    eq: 'Liebherr LTM 1090', project: 'Liman Genişləndirmə' },
];

// Invoice line items (for detail)
const invoiceLines = {
  'QAI-2026-0148': [
    { desc: 'İcarə haqqı — May 2026 (31 gün)', qty: '31 gün', rate: 1240, amount: 28800 },
  ],
  'QAI-2026-0146': [
    { desc: 'İcarə haqqı — May 2026 (23 gün)', qty: '23 gün', rate: 360, amount: 8280 },
  ],
};

// Payments
const payments = {
  totalDue: 54260,
  paid: 42060,
  remaining: 12200,
  schedule: [
    { date: '2026-06-05', amount: 12200, eq: 'JCB 3CX · Hyundai R225', status: 'scheduled', next: true },
    { date: '2026-07-05', amount: 43880, eq: 'Aylıq icarə yığımı', status: 'scheduled' },
  ],
  history: [
    { date: '2026-05-24', amount: 40200, method: 'Bank köçürməsi', status: 'paid' },
    { date: '2026-04-24', amount: 38400, method: 'Bank köçürməsi', status: 'paid' },
    { date: '2026-03-24', amount: 36100, method: 'Bank köçürməsi', status: 'paid' },
    { date: '2026-02-24', amount: 34800, method: 'Bank köçürməsi', status: 'paid' },
  ],
};

// General documents
const documents = [
  { type: 'Müqavilə', name: 'Çərçivə İnvestisiya Müqaviləsi', date: '2024-02-14', size: '3,2 MB', status: 'verified' },
  { type: 'Müqavilə', name: 'İcarə müqaviləsi — EQ-007', date: '2026-03-08', size: '2,1 MB', status: 'verified' },
  { type: 'Texnika sənədi', name: 'Texniki pasport — EQ-012', date: '2021-05-12', size: '1,1 MB', status: 'verified' },
  { type: 'Sığorta', name: 'KASKO polisi — Park 2026', date: '2026-01-15', size: '1,8 MB', status: 'verified' },
  { type: 'Texnika sənədi', name: 'Servis aktı — EQ-021', date: '2026-05-18', size: '640 KB', status: 'pending' },
];

// Offers (v2)
const offers = [
  {
    id: 'TKL-0042', eq: 'Bobcat S650', eqCode: 'EQ-009', img: 'loader',
    project: 'Abşeron Logistika Mərkəzi', region: 'Abşeron, Hövsan',
    price: 5400, unit: '/ay', duration: '4 ay', start: '2026-06-15',
    status: 'pending', coordinator: 'Layihə koordinatoru: E. Quliyev',
    note: 'Texnika yük boşaltma sahəsində istifadə olunacaq. Operator şirkət tərəfindən təmin edilir.',
    created: '2026-05-28',
  },
  {
    id: 'TKL-0041', eq: 'Caterpillar 320D', eqCode: 'EQ-012', img: 'excavator',
    project: 'Bakı Ring Yolu — 3-cü mərhələ', region: 'Abşeron',
    price: 14800, unit: '/ay', duration: '6 ay', start: '2026-08-01',
    status: 'pending', coordinator: 'Layihə koordinatoru: N. Həsənli',
    note: 'Cari icarə bitdikdən sonra başlayır. Uzunmüddətli sabit layihə.',
    created: '2026-05-27',
  },
  {
    id: 'TKL-0038', eq: 'JCB 3CX', eqCode: 'EQ-015', img: 'backhoe',
    project: 'Sahil Plaza İnşaatı', region: 'Bakı, Xəzər',
    price: 8280, unit: '/ay', duration: '3 ay', start: '2026-06-01',
    status: 'accepted', coordinator: 'Layihə koordinatoru: N. Həsənli',
    note: 'Təklif qəbul edildi, texnika yola salındı.',
    created: '2026-05-12',
  },
  {
    id: 'TKL-0035', eq: 'Hyundai R225', eqCode: 'EQ-021', img: 'excavator',
    project: 'Qəbələ Turizm Kompleksi', region: 'Qəbələ',
    price: 9600, unit: '/ay', duration: '5 ay', start: '2026-05-01',
    status: 'declined', coordinator: 'Layihə koordinatoru: E. Quliyev',
    note: 'Texnika servis qrafikinə görə rədd edildi.',
    created: '2026-04-20',
  },
];

// Notifications (v2)
const notifications = [
  { id: 1, kind: 'offer',    title: 'Yeni təklif', body: 'Bobcat S650 üçün Abşeron Logistika layihəsindən təklif gəldi.', time: '14 dəq', unread: true, ref: { type: 'offer', id: 'TKL-0042' } },
  { id: 2, kind: 'payment',  title: 'Ödəniş daxil oldu', body: '40.200,00 ₼ bank köçürməsi hesabınıza köçürüldü.', time: '2 saat', unread: true, ref: { type: 'finance' } },
  { id: 3, kind: 'invoice',  title: 'Yeni qaimə', body: 'QAI-2026-0146 — JCB 3CX üçün 8.280,00 ₼ qaimə yaradıldı.', time: '5 saat', unread: true, ref: { type: 'finance' } },
  { id: 4, kind: 'service',  title: 'Texniki baxış yaxınlaşır', body: 'Hyundai R225 üçün baxışa 5 gün qalıb.', time: 'Dünən', unread: false, ref: { type: 'equipment', id: 'EQ-021' } },
  { id: 5, kind: 'transit',  title: 'Texnika yola salındı', body: 'JCB 3CX Sahil Plaza layihəsinə göndərildi.', time: '2 gün', unread: false, ref: { type: 'equipment', id: 'EQ-015' } },
  { id: 6, kind: 'return',   title: 'Texnika qaytarıldı', body: 'Bobcat S650 anbara qaytarıldı və mövcuddur.', time: '3 gün', unread: false, ref: { type: 'equipment', id: 'EQ-009' } },
];

// Dashboard recent activity
const activity = [
  { kind: 'transit', title: 'İcarəyə getdi', meta: 'JCB 3CX → Sahil Plaza', date: '2026-05-28' },
  { kind: 'invoice', title: 'Yeni qaimə', meta: 'QAI-2026-0146 · 8.280,00 ₼', date: '2026-05-20' },
  { kind: 'payment', title: 'Ödəniş alındı', meta: '40.200,00 ₼ · Bank köçürməsi', date: '2026-05-24' },
  { kind: 'return',  title: 'Qaytarıldı', meta: 'Bobcat S650 → Anbar', date: '2026-05-09' },
];

// Dashboard aggregates
const dash = {
  balanceDue: 12200,       // company owes investor (next payment)
  balanceDate: '2026-06-05',
  eqCount: 6,
  thisMonth: 54060,
  totalEarn: 713400,
  utilization: 75,
  statusBreakdown: [
    { key: 'rented',    label: 'İcarədə',   count: 3, color: C.amber  },
    { key: 'available', label: 'Mövcuddur', count: 1, color: C.green  },
    { key: 'transit',   label: 'Yoldadır',  count: 1, color: C.blue   },
    { key: 'service',   label: 'Baxışda',   count: 1, color: C.purple },
  ],
  // monthly earnings trend (last 8 months, in ₼ thousand)
  trend: [38.4, 41.2, 44.8, 47.1, 49.6, 51.2, 52.8, 54.06],
  trendLabels: ['Okt','Noy','Dek','Yan','Fev','Mar','Apr','May'],
};

Object.assign(window, {
  investor, equipment, serviceRecords, projectHistory, eqDocs,
  invoices, invoiceLines, payments, documents, offers, notifications, activity, dash,
});
