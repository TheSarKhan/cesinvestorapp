import { View, Text, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '../theme/colors';

// ui.jsx SectionHead portu — başlıq + opsional əməliyyat linki.
export function SectionHeader({ title, action, onAction, className = '' }) {
  return (
    <View className={`flex-row items-center justify-between px-0.5 pb-3 ${className}`}>
      <Text className="font-bold text-base text-ink">{title}</Text>
      {!!action && (
        <Pressable onPress={onAction} className="flex-row items-center active:opacity-70">
          <Text className="font-semibold text-[13px] text-brand">{action}</Text>
          <ChevronRight size={15} color={colors.brand} />
        </Pressable>
      )}
    </View>
  );
}

export default SectionHeader;
