import { ScrollView, View, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Receipt } from 'lucide-react-native';
import {
  ScreenHeader,
  Card,
  InvoiceBadge,
  EmptyState,
  ErrorState,
  Skeleton,
} from '../../src/components';
import { useInvoices } from '../../src/hooks/usePortal';
import { azn, aznWhole, azDate } from '../../src/utils/format';
import { colors } from '../../src/theme/colors';

const sum = (arr, key) => (arr ?? []).reduce((s, x) => s + (Number(x[key]) || 0), 0);

export default function Finance() {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch, isRefetching } = useInvoices();
  const list = data ?? [];

  const total = sum(list, 'amount');
  const paid = sum(list, 'paidAmount');
  const remaining = sum(list, 'remainingAmount');
  const pct = total > 0 ? Math.round((paid / total) * 100) : 0;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScreenHeader title="Maliyyə" subtitle="Qaimələr" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.brand} />
        }
      >
        <View className="px-[18px] pb-6">
          {isLoading ? (
            <ListSkeleton />
          ) : isError ? (
            <ErrorState message={error?.message} onRetry={refetch} />
          ) : list.length === 0 ? (
            <EmptyState
              icon={<Receipt size={24} color={colors.faint} />}
              title="Qaimə yoxdur"
              sub="Sizə aid qaimə tapılmadı."
            />
          ) : (
            <>
              {/* Ümumi xülasə */}
              <Card className="mb-4">
                <View className="flex-row justify-between">
                  <Summary label="Ümumi borc" value={aznWhole(total)} color={colors.ink} />
                  <Summary label="Ödənilib" value={aznWhole(paid)} color={colors.green} align="center" />
                  <Summary label="Qalıq" value={aznWhole(remaining)} color={colors.brand} align="right" />
                </View>
                <View className="mt-3.5 h-2 overflow-hidden rounded-full bg-bg-sunk">
                  <View style={{ width: `${pct}%`, backgroundColor: colors.green }} className="h-full" />
                </View>
                <Text className="mt-1.5 text-center text-[11.5px] text-faint">{pct}% ödənilib</Text>
              </Card>

              <View className="gap-2.5">
                {list.map((inv) => {
                  const rem = inv.remainingAmount != null
                    ? inv.remainingAmount
                    : (Number(inv.amount) || 0) - (Number(inv.paidAmount) || 0);
                  return (
                    <Card key={inv.id} className="p-3.5" onPress={() => router.push(`/invoice/${inv.id}`)}>
                      <View className="flex-row items-center gap-3">
                        <View className="h-[42px] w-[42px] items-center justify-center rounded-xl bg-bg-sunk">
                          <Receipt size={20} color={colors.ink70} />
                        </View>
                        <View className="min-w-0 flex-1">
                          <View className="flex-row items-center justify-between gap-2">
                            <Text className="font-mono text-[13px] font-bold text-ink">
                              {inv.accountingId ?? inv.invoiceNumber ?? `#${inv.id}`}
                            </Text>
                            <InvoiceBadge status={inv.status} sm />
                          </View>
                          <Text numberOfLines={1} className="mt-1 text-xs text-muted">
                            {[inv.equipmentName, azDate(inv.invoiceDate)].filter(Boolean).join(' · ')}
                          </Text>
                        </View>
                      </View>

                      {/* Məbləğ / Ödənilib / Qalıq */}
                      <View className="mt-3 flex-row justify-between border-t border-line-soft pt-3">
                        <MoneyCol label="Məbləğ" value={azn(inv.amount, 0)} color={colors.ink} />
                        <MoneyCol label="Ödənilib" value={azn(inv.paidAmount, 0)} color={colors.green} align="center" />
                        <MoneyCol label="Qalıq" value={azn(rem, 0)} color={rem > 0 ? colors.brand : colors.green} align="right" />
                      </View>
                    </Card>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Summary({ label, value, color, align = 'left' }) {
  const items = align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start';
  return (
    <View className={`flex-1 ${items}`}>
      <Text className="font-semibold text-[11.5px] text-muted">{label}</Text>
      <Text style={{ color }} className="mt-1 font-bold text-[15px]">
        {value}
      </Text>
    </View>
  );
}

function MoneyCol({ label, value, color, align = 'left' }) {
  const items = align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start';
  return (
    <View className={`flex-1 ${items}`}>
      <Text className="text-[10.5px] font-semibold uppercase text-faint">{label}</Text>
      <Text style={{ color }} className="mt-0.5 font-mono text-[13.5px] font-bold">
        {value}
      </Text>
    </View>
  );
}

function ListSkeleton() {
  return (
    <View className="gap-2.5">
      <Skeleton height={96} radius={18} />
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} height={104} radius={18} />
      ))}
    </View>
  );
}
