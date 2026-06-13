import { useState } from 'react';
import { ScrollView, View, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Receipt, Hash, Wallet, Truck, FolderOpen } from 'lucide-react-native';
import {
  ScreenHeader,
  Segmented,
  StatTile,
  Card,
  InvoiceBadge,
  PayableBadge,
  EmptyState,
  ErrorState,
  Skeleton,
} from '../../src/components';
import { useInvoices, usePayments } from '../../src/hooks/usePortal';
import { azn, aznWhole, azDate } from '../../src/utils/format';
import { colors } from '../../src/theme/colors';

const sum = (arr, key) =>
  (arr ?? []).reduce((s, x) => s + (Number(x[key]) || 0), 0);

export default function Finance() {
  const [sub, setSub] = useState('invoices');

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScreenHeader title="Maliyyə" subtitle="Qaimələr və ödənişlər" />
      {sub === 'invoices' ? (
        <InvoicesTab segmented={<SegmentBar sub={sub} setSub={setSub} />} />
      ) : (
        <PaymentsTab segmented={<SegmentBar sub={sub} setSub={setSub} />} />
      )}
    </SafeAreaView>
  );
}

function SegmentBar({ sub, setSub }) {
  return (
    <View className="mb-4">
      <Segmented
        value={sub}
        onChange={setSub}
        tabs={[
          { value: 'invoices', label: 'Qaimələr' },
          { value: 'payments', label: 'Ödənişlər' },
        ]}
      />
    </View>
  );
}

function InvoicesTab({ segmented }) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch, isRefetching } = useInvoices();
  const list = data ?? [];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.brand} />
      }
    >
      <View className="px-[18px] pb-6">
        {segmented}
        {isLoading ? (
          <ListSkeleton />
        ) : isError ? (
          <ErrorState message={error?.message} onRetry={refetch} />
        ) : (
          <>
            <View className="mb-4 flex-row gap-2.5">
              <View className="flex-1">
                <StatTile
                  label="Ümumi məbləğ"
                  value={aznWhole(sum(list, 'amount'))}
                  icon={<Receipt size={15} color={colors.brand} />}
                />
              </View>
              <View className="flex-1">
                <StatTile
                  label="Qaimə sayı"
                  value={String(list.length)}
                  sub="ədəd"
                  accent={colors.blue}
                  icon={<Hash size={15} color={colors.blue} />}
                />
              </View>
            </View>

            {list.length === 0 ? (
              <EmptyState
                icon={<Receipt size={24} color={colors.faint} />}
                title="Qaimə yoxdur"
                sub="Sizə aid qaimə tapılmadı."
              />
            ) : (
              <View className="gap-2.5">
                {list.map((inv) => (
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
                          {[inv.typeLabel, inv.equipmentName].filter(Boolean).join(' · ')}
                        </Text>
                      </View>
                    </View>
                    <View className="mt-3 flex-row items-center justify-between border-t border-line-soft pt-3">
                      <Text className="font-semibold text-xs text-faint">
                        {azDate(inv.invoiceDate)}
                      </Text>
                      <Text className="font-bold text-[17px] text-ink">{azn(inv.amount, 0)}</Text>
                    </View>
                  </Card>
                ))}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

function PaymentsTab({ segmented }) {
  const { data, isLoading, isError, error, refetch, isRefetching } = usePayments();
  const list = data ?? [];
  const total = sum(list, 'totalAmount');
  const paid = sum(list, 'paidAmount');
  const remaining = total - paid;
  const pct = total > 0 ? Math.round((paid / total) * 100) : 0;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.brand} />
      }
    >
      <View className="px-[18px] pb-6">
        {segmented}
        {isLoading ? (
          <ListSkeleton />
        ) : isError ? (
          <ErrorState message={error?.message} onRetry={refetch} />
        ) : list.length === 0 ? (
          <EmptyState
            icon={<Wallet size={24} color={colors.faint} />}
            title="Ödəniş yoxdur"
            sub="Sizə aid ödəniş qeydi tapılmadı."
          />
        ) : (
          <>
            {/* Xülasə */}
            <Card className="mb-4">
              <View className="flex-row justify-between">
                <Summary label="Ümumi borc" value={aznWhole(total)} color={colors.ink} />
                <Summary label="Ödənilmiş" value={aznWhole(paid)} color={colors.green} align="center" />
                <Summary label="Qalıq" value={aznWhole(remaining)} color={colors.brand} align="right" />
              </View>
              <View className="mt-3.5 h-2 overflow-hidden rounded-full bg-bg-sunk">
                <View style={{ width: `${pct}%`, backgroundColor: colors.green }} className="h-full" />
              </View>
              <Text className="mt-1.5 text-center text-[11.5px] text-faint">{pct}% ödənilib</Text>
            </Card>

            <View className="gap-2.5">
              {list.map((p) => (
                <Card key={p.id} className="p-3.5">
                  <View className="flex-row items-center justify-between gap-2">
                    <Text numberOfLines={1} className="flex-1 font-bold text-[14.5px] text-ink">
                      {p.payeeName ?? '—'}
                    </Text>
                    <PayableBadge status={p.status} sm />
                  </View>
                  {!!(p.equipmentName || p.projectName) && (
                    <View className="mt-1.5 gap-1">
                      {!!p.equipmentName && (
                        <View className="flex-row items-center gap-1.5">
                          <Truck size={13} color={colors.faint} />
                          <Text numberOfLines={1} className="flex-1 text-xs text-muted">
                            {p.equipmentName}
                          </Text>
                        </View>
                      )}
                      {!!p.projectName && (
                        <View className="flex-row items-center gap-1.5">
                          <FolderOpen size={13} color={colors.faint} />
                          <Text numberOfLines={1} className="flex-1 text-xs text-muted">
                            {p.projectName}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                  <View className="mt-3 flex-row items-end justify-between border-t border-line-soft pt-3">
                    <View>
                      <Text className="text-[11px] font-semibold uppercase text-faint">Ödənilib</Text>
                      <Text className="mt-0.5 font-mono text-[13.5px] font-semibold text-ink">
                        {azn(p.paidAmount, 0)} / {azn(p.totalAmount, 0)}
                      </Text>
                    </View>
                    {!!p.dueDate && (
                      <Text className="text-xs font-semibold text-faint">
                        {azDate(p.dueDate)}
                      </Text>
                    )}
                  </View>
                </Card>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
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

function ListSkeleton() {
  return (
    <View className="gap-2.5">
      <View className="flex-row gap-2.5">
        <Skeleton className="flex-1" height={84} radius={18} />
        <Skeleton className="flex-1" height={84} radius={18} />
      </View>
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} height={96} radius={18} />
      ))}
    </View>
  );
}
