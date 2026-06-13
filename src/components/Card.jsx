import { View, Pressable } from 'react-native';

// Kart səthi — ui.jsx Card portu. Default padding p-4 (16); className ilə dəyişdir.
const cardShadow = {
  shadowColor: '#141821',
  shadowOpacity: 0.05,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
};

export function Card({ children, className = '', onPress, flat = false, style }) {
  const base = 'rounded-[18px] border border-line bg-card p-4';
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={`${base} active:opacity-90 ${className}`}
        style={[flat ? null : cardShadow, style]}
      >
        {children}
      </Pressable>
    );
  }
  return (
    <View className={`${base} ${className}`} style={[flat ? null : cardShadow, style]}>
      {children}
    </View>
  );
}

export default Card;
