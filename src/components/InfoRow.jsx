import { View, Text, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '../theme/colors';

// ui.jsx InfoRow portu — etiket/dəyər sətri (opsional mono, ikon, klik).
export function InfoRow({ label, value, mono = false, icon, last = false, onPress }) {
  const content = (
    <>
      {icon && <View className="mr-0.5">{icon}</View>}
      <Text className="flex-1 text-[13.5px] text-muted">{label}</Text>
      <Text
        className={`text-right font-semibold text-[13.5px] text-ink ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </Text>
      {onPress && <ChevronRight size={15} color={colors.faint} />}
    </>
  );

  const rowClass = `flex-row items-center gap-3 py-3 ${
    last ? '' : 'border-b border-line-soft'
  }`;

  if (onPress) {
    return (
      <Pressable onPress={onPress} className={`${rowClass} active:opacity-70`}>
        {content}
      </Pressable>
    );
  }
  return <View className={rowClass}>{content}</View>;
}

export default InfoRow;
