import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { AZ_MONTHS } from '../utils/format';
import { fmtNum } from '../utils/format';
import { colors } from '../theme/colors';

// 12 aylıq qazanc trendi — equipment earnings.trend üçün.
// trend: [{ year, month, amount }] köhnədən yeniyə.
export function TrendBarChart({ trend }) {
  const points = trend ?? [];
  const hasData = points.some((p) => Number(p.amount) > 0);

  if (!hasData) {
    return (
      <Text className="py-2 text-center text-[13px] text-muted">
        Bu texnika üçün hələ qazanc qeydi yoxdur.
      </Text>
    );
  }

  const data = points.map((p) => ({
    value: Number(p.amount) || 0,
    label: AZ_MONTHS[(p.month ?? 1) - 1],
  }));

  const maxVal = Math.max(...data.map((d) => d.value), 1);

  return (
    <View className="-ml-2">
      <BarChart
        data={data}
        barWidth={13}
        spacing={9}
        initialSpacing={10}
        roundedTop
        frontColor={colors.brand}
        barBorderRadius={3}
        hideRules
        xAxisThickness={1}
        xAxisColor={colors.line}
        yAxisThickness={0}
        noOfSections={3}
        maxValue={Math.ceil(maxVal * 1.15)}
        yAxisTextStyle={{ color: colors.faint, fontSize: 9 }}
        xAxisLabelTextStyle={{ color: colors.faint, fontSize: 8 }}
        formatYLabel={(v) => {
          const n = Number(v);
          return n >= 1000 ? fmtNum(n / 1000, 0) + 'K' : fmtNum(n, 0);
        }}
        height={130}
        isAnimated
      />
    </View>
  );
}

export default TrendBarChart;
