// ── Kit · React Native developer notes ──

const themeCode = `// theme.ts — Invorent design tokens
export const colors = {
  brand:   { 500: '#0E9F6E', 600: '#0B7D57', tint: '#E6F6F0', line: '#C4EADD' },
  bg: '#F4F5F7', bgSunk: '#EEF0F3', surface: '#FFFFFF',
  border: '#E7E9ED', borderSoft: '#EFF1F4',
  text: '#15181D', textSecondary: '#6B727D', textTertiary: '#9AA1AC',
  status: {
    available: '#15A34A', rented: '#D97706', transit: '#2563EB',
    service: '#7C3AED', repair: '#DC2626', retired: '#737B86',
  },
};

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40 };
export const radius = { sm: 8, md: 12, input: 13, lg: 14, xl: 18, xxl: 22, pill: 999 };

export const text = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: '800' },
  h1:      { fontSize: 26, lineHeight: 32, fontWeight: '700' },
  title:   { fontSize: 16, lineHeight: 22, fontWeight: '700' },
  body:    { fontSize: 14, lineHeight: 20, fontWeight: '500' },
  label:   { fontSize: 13, lineHeight: 18, fontWeight: '600' },
};`;

const shadowCode = `// elevation.ts — cross-platform shadow tokens
import { Platform } from 'react-native';

export const elevation = (level: 1 | 2 | 3) => Platform.select({
  ios: {
    1: { shadowColor: '#141821', shadowOpacity: 0.06, shadowRadius: 8,  shadowOffset: { width: 0, height: 2 } },
    2: { shadowColor: '#141821', shadowOpacity: 0.10, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } },
    3: { shadowColor: '#141821', shadowOpacity: 0.18, shadowRadius: 30, shadowOffset: { width: 0, height: 24 } },
  }[level],
  android: { elevation: { 1: 2, 2: 8, 3: 16 }[level] },
});`;

const buttonCode = `// Button.tsx
import { Pressable, Text } from 'react-native';
import { colors, radius, space } from './theme';

export function Button({ title, variant = 'primary', onPress }) {
  const v = {
    primary:   { bg: colors.brand[500], fg: '#fff' },
    secondary: { bg: colors.surface,    fg: colors.text, border: colors.border },
    success:   { bg: colors.status.available, fg: '#fff' },
    danger:    { bg: colors.surface, fg: colors.status.repair, border: '#FCEAEA' },
  }[variant];
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({
      backgroundColor: v.bg, opacity: pressed ? 0.9 : 1,
      borderRadius: radius.input, paddingVertical: 13, paddingHorizontal: space[5],
      borderWidth: v.border ? 1 : 0, borderColor: v.border, alignItems: 'center',
    })}>
      <Text style={{ color: v.fg, fontSize: 14.5, fontWeight: '600' }}>{title}</Text>
    </Pressable>
  );
}`;

function DevNotes() {
  const mapRows = [
    { web: 'div + flex/grid', rn: 'View · flexbox (default)', note: 'RN-də yalnız flex var, grid yoxdur' },
    { web: 'button', rn: 'Pressable', note: 'pressed state üçün style callback' },
    { web: 'span / h1 / p', rn: 'Text', note: 'mətn yalnız <Text> daxilində' },
    { web: 'input', rn: 'TextInput', note: 'placeholderTextColor ayrıca prop' },
    { web: 'overflow: auto', rn: 'ScrollView / FlatList', note: 'uzun siyahılar üçün FlatList' },
    { web: 'svg icons', rn: 'react-native-svg', note: 'eyni path-lər, currentColor → fill/stroke prop' },
    { web: 'box-shadow', rn: 'shadow* + elevation', note: 'platforma üzrə ayrı (elevation.ts)' },
    { web: 'position: fixed', rn: 'absolute + SafeAreaView', note: 'tab bar / header üçün safe-area' },
    { web: 'backdrop-filter', rn: 'expo-blur (BlurView)', note: 'glass tab bar effekti' },
  ];
  const deps = [
    ['react-native-svg', 'İkonlar və qrafiklər (Donut, LineChart)'],
    ['expo-font', 'Plus Jakarta Sans + Geist Mono yüklənməsi'],
    ['@react-navigation/bottom-tabs', '5 tab-lı naviqasiya'],
    ['@react-navigation/native-stack', 'Detal / overlay keçidləri'],
    ['expo-blur', 'Şüşə (glass) tab bar'],
    ['expo-document-picker', 'Sənəd yükləmə (v2)'],
    ['react-native-reanimated', 'Keçidlər və pull-to-refresh'],
  ];

  return (
    <KSection id="rn" kicker="Development" title="React Native qeydləri"
      desc="Komponentlər web-də HTML/CSS ilə render olunur, lakin tokenlər və quruluş birbaşa React Native-ə uyğun planlanıb. Aşağıda hazır theme faylları və primitiv uyğunlukları.">

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <Code title="theme.ts" code={themeCode}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Code title="elevation.ts" code={shadowCode}/>
          <Code title="Button.tsx" code={buttonCode} lang="tsx"/>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        {/* Mapping table */}
        <KCard pad={0}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.line}`, fontSize: 13, fontWeight: 700, color: C.ink }}>Web → React Native uyğunluğu</div>
          <div style={{ display: 'flex', padding: '8px 20px', borderBottom: `1px solid ${C.lineSoft}`, fontSize: 10.5, fontWeight: 700, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <span style={{ flex: 1 }}>Web</span><span style={{ flex: 1 }}>RN primitiv</span><span style={{ flex: 1.3 }}>Qeyd</span>
          </div>
          {mapRows.map((r, i) => (
            <div key={i} style={{ display: 'flex', padding: '11px 20px', borderBottom: i === mapRows.length-1 ? 'none' : `1px solid ${C.lineSoft}`, alignItems: 'center' }}>
              <span style={{ flex: 1, fontSize: 12, color: C.muted, fontFamily: "'Geist Mono', monospace" }}>{r.web}</span>
              <span style={{ flex: 1, fontSize: 12, color: C.ink, fontWeight: 600, fontFamily: "'Geist Mono', monospace" }}>{r.rn}</span>
              <span style={{ flex: 1.3, fontSize: 12, color: C.muted }}>{r.note}</span>
            </div>
          ))}
        </KCard>

        {/* Dependencies */}
        <KCard pad={0}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.line}`, fontSize: 13, fontWeight: 700, color: C.ink }}>Tövsiyə olunan paketlər</div>
          {deps.map(([pkg, use], i) => (
            <div key={pkg} style={{ padding: '11px 20px', borderBottom: i === deps.length-1 ? 'none' : `1px solid ${C.lineSoft}` }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.brand, fontFamily: "'Geist Mono', monospace" }}>{pkg}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{use}</div>
            </div>
          ))}
        </KCard>
      </div>

      {/* Font setup note */}
      <KCard style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ width: 36, height: 36, borderRadius: 10, background: C.brandTint, color: C.brand, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon.warn size={18}/></span>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>Şrift və lokalizasiya</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4, lineHeight: 1.55 }}>
              Plus Jakarta Sans və Geist Mono <span style={{ fontFamily: "'Geist Mono', monospace", color: C.ink70 }}>expo-font</span> ilə bundle olunmalıdır (Azərbaycan diakritikləri — ə, ğ, ş, ç, ı — tam dəstəklənir). Valyuta <span style={{ fontFamily: "'Geist Mono', monospace", color: C.ink70 }}>Intl.NumberFormat('az-AZ')</span>, tarix <span style={{ fontFamily: "'Geist Mono', monospace", color: C.ink70 }}>gün.ay.il</span> formatında. Rəqəmlərdə <span style={{ fontFamily: "'Geist Mono', monospace", color: C.ink70 }}>fontVariant: ['tabular-nums']</span>.
            </div>
          </div>
        </div>
      </KCard>
    </KSection>
  );
}

Object.assign(window, { DevNotes });
