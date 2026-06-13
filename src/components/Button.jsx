import { Pressable, Text, ActivityIndicator, View } from 'react-native';

// ui.jsx Button portu. variant: primary | secondary | ghost | success | danger | dangerSolid
const VARIANTS = {
  primary: { box: 'bg-brand border-brand', text: 'text-white', spinner: '#fff' },
  secondary: { box: 'bg-card border-line', text: 'text-ink', spinner: '#15181D' },
  ghost: { box: 'bg-bg-sunk border-transparent', text: 'text-ink-70', spinner: '#3D434C' },
  success: { box: 'bg-green border-green', text: 'text-white', spinner: '#fff' },
  danger: { box: 'bg-card border-red-tint', text: 'text-red', spinner: '#DC2626' },
  dangerSolid: { box: 'bg-red border-red', text: 'text-white', spinner: '#fff' },
};

export function Button({
  children,
  onPress,
  variant = 'primary',
  full = false,
  sm = false,
  icon,
  iconRight = false,
  loading = false,
  disabled = false,
  className = '',
}) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const isDisabled = disabled || loading;
  const pad = sm ? 'h-[40px] px-3.5' : 'h-[52px] px-[18px]';
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`flex-row items-center justify-center gap-2 rounded-[13px] border ${pad} ${v.box} ${
        full ? 'w-full' : 'self-start'
      } ${isDisabled ? 'opacity-50' : 'active:opacity-90'} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={v.spinner} size="small" />
      ) : (
        <>
          {icon && !iconRight && <View>{icon}</View>}
          <Text className={`font-semibold ${sm ? 'text-[13px]' : 'text-[14.5px]'} ${v.text}`}>
            {children}
          </Text>
          {icon && iconRight && <View>{icon}</View>}
        </>
      )}
    </Pressable>
  );
}

export default Button;
