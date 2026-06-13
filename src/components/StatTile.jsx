import { View, Text } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { Card } from './Card';
import { colors } from '../theme/colors';

// ui.jsx StatTile portu — etiket + böyük rəqəm + opsional ikon/delta.
// delta: { up: boolean, text: string }
export function StatTile({ label, value, sub, icon, accent = colors.brand, delta }) {
  return (
    <Card className="gap-2 p-[13px]">
      <View className="flex-row items-center justify-between">
        <Text className="font-semibold text-xs text-muted">{label}</Text>
        {icon && (
          <View
            style={{ backgroundColor: accent + '16' }}
            className="h-[26px] w-[26px] items-center justify-center rounded-lg"
          >
            {icon}
          </View>
        )}
      </View>
      <View className="flex-row items-baseline gap-1">
        <Text className="font-bold text-[22px] text-ink">{value}</Text>
        {!!sub && <Text className="font-semibold text-[12.5px] text-muted">{sub}</Text>}
      </View>
      {delta && (
        <View className="flex-row items-center gap-1">
          {delta.up ? (
            <TrendingUp size={13} color={colors.green} />
          ) : (
            <TrendingDown size={13} color={colors.red} />
          )}
          <Text
            className="font-bold text-xs"
            style={{ color: delta.up ? colors.green : colors.red }}
          >
            {delta.text}
          </Text>
        </View>
      )}
    </Card>
  );
}

export default StatTile;
