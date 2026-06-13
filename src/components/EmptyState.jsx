import { View, Text } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '../theme/colors';

// ui.jsx Empty portu — boş ekran vəziyyəti.
export function EmptyState({ icon, title, sub }) {
  return (
    <View className="items-center px-6 py-12">
      <View className="mb-3.5 h-14 w-14 items-center justify-center rounded-2xl bg-bg-sunk">
        {icon ?? <Search size={24} color={colors.faint} />}
      </View>
      <Text className="font-bold text-[15px] text-ink">{title}</Text>
      {!!sub && (
        <Text className="mt-1 max-w-[240px] text-center text-[13px] leading-5 text-muted">
          {sub}
        </Text>
      )}
    </View>
  );
}

export default EmptyState;
