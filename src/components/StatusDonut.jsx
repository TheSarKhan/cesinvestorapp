import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { EQ_STATUS, resolveStatus } from '../theme/status';
import { colors } from '../theme/colors';

// Texnika statusu donut + leqenda — dashboard üçün.
// byStatus: { ENUM_NAME: count }, total: ümumi say.
export function StatusDonut({ byStatus, total }) {
  const entries = Object.entries(byStatus ?? {}).filter(([, c]) => c > 0);

  if (!entries.length) {
    return <Text className="text-[13px] text-muted">Texnika yoxdur.</Text>;
  }

  const pieData = entries.map(([key, count]) => ({
    value: count,
    color: resolveStatus(EQ_STATUS, key).color,
  }));

  return (
    <View className="flex-row items-center gap-4">
      <PieChart
        data={pieData}
        donut
        radius={56}
        innerRadius={38}
        innerCircleColor={colors.card}
        centerLabelComponent={() => (
          <View className="items-center">
            <Text className="font-bold text-2xl text-ink">{total}</Text>
            <Text className="font-semibold text-[11px] text-muted">texnika</Text>
          </View>
        )}
      />
      <View className="flex-1 gap-2.5">
        {entries.map(([key, count]) => {
          const m = resolveStatus(EQ_STATUS, key);
          return (
            <View key={key} className="flex-row items-center gap-2">
              <View style={{ backgroundColor: m.color }} className="h-2.5 w-2.5 rounded-[3px]" />
              <Text className="flex-1 text-[12.5px] text-ink-70">{m.label}</Text>
              <Text className="font-bold text-[13px] text-ink">{count}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default StatusDonut;
