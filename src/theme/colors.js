// Rəng palitrası — design-reference/app/core.jsx (C) portu.
// className üçün tailwind.config istifadə olunur; bu obyekt ikon/SVG/inline
// rəng prop-ları üçündür (lucide `color`, gradient və s.).
// DİQQƏT: brand artıq YAŞIL (#15A34A); amber yalnız statusda qalır.

export const colors = {
  // Səthlər
  bg: '#F4F5F7',
  bgSunk: '#EEF0F3',
  card: '#FFFFFF',
  cardAlt: '#FAFBFC',
  line: '#E7E9ED',
  lineSoft: '#EFF1F4',

  // Mətn
  ink: '#15181D',
  ink70: '#3D434C',
  muted: '#6B727D',
  faint: '#9AA1AC',

  // Brend — yaşıl
  brand: '#15A34A',
  brandDk: '#0F8A3E',
  brandTint: '#E6F6EC',
  brandLine: '#BBE6C9',

  // Status rəngləri (sabit palitra)
  green: '#15A34A',
  greenTint: '#E6F6EC',
  blue: '#2563EB',
  blueTint: '#E7EEFE',
  purple: '#7C3AED',
  purpleTint: '#F0E9FE',
  red: '#DC2626',
  redTint: '#FCEAEA',
  amber: '#D97706',
  amberTint: '#FEF4E6',
  gray: '#737B86',
  grayTint: '#EEF0F3',

  white: '#FFFFFF',
};

export default colors;
