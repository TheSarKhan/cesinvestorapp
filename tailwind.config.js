/** @type {import('tailwindcss').Config} */
// Dizayn tokenləri: design-reference/app/core.jsx (C obyekti) → NativeWind theme
module.exports = {
  content: ['./app/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Səthlər
        bg: '#F4F5F7',
        'bg-sunk': '#EEF0F3',
        card: '#FFFFFF',
        'card-alt': '#FAFBFC',
        line: '#E7E9ED',
        'line-soft': '#EFF1F4',
        // Mətn
        ink: '#15181D',
        'ink-70': '#3D434C',
        muted: '#6B727D',
        faint: '#9AA1AC',
        // Brend — yaşıl (investor app əsas rəngi)
        brand: '#15A34A',
        'brand-dk': '#0F8A3E',
        'brand-tint': '#E6F6EC',
        'brand-line': '#BBE6C9',
        // Status rəngləri
        green: '#15A34A',
        'green-tint': '#E6F6EC',
        // Amber — yalnız status üçün (İcarədə / Gözləyir)
        amber: '#D97706',
        'amber-tint': '#FEF4E6',
        blue: '#2563EB',
        'blue-tint': '#E7EEFE',
        purple: '#7C3AED',
        'purple-tint': '#F0E9FE',
        red: '#DC2626',
        'red-tint': '#FCEAEA',
        gray: '#737B86',
        'gray-tint': '#EEF0F3',
      },
      fontFamily: {
        // başlıq/mətn = Plus Jakarta Sans, rəqəm/mono = Geist Mono
        sans: ['Jakarta_400Regular'],
        medium: ['Jakarta_500Medium'],
        semibold: ['Jakarta_600SemiBold'],
        bold: ['Jakarta_700Bold'],
        mono: ['GeistMono_400Regular'],
        'mono-medium': ['GeistMono_500Medium'],
      },
    },
  },
  plugins: [],
};
