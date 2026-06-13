import { ScrollView, View, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Truck, TrendingUp, Wallet, Activity, CalendarDays } from 'lucide-react-native';
import {
  ScreenHeader,
  Card,
  StatTile,
  InfoRow,
  EqBadge,
  SectionHeader,
  EmptyState,
  ErrorState,
  Skeleton,
  TrendBarChart,
} from '../../src/components';
import {
  useEquipmentDetail,
  useEquipmentEarnings,
  useEquipmentHistory,
} from '../../src/hooks/usePortal';
import { azn, aznWhole, azDate } from '../../src/utils/format';
import { colors } from '../../src/theme/colors';

export default function EquipmentDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const detail = useEquipmentDetail(id);
  const earnings = useEquipmentEarnings(id);
  const history = useEquipmentHistory(id);

  const e = detail.data;
  const refetchAll = () => {
    detail.refetch();
    earnings.refetch();
    history.refetch();
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={detail.isRefetching || earnings.isRefetching || history.isRefetching}
            onRefresh={refetchAll}
            tintColor={colors.brand}
          />
        }
      >
        <ScreenHeader
          subtitle="Texnika"
          title={e?.name ?? `#${id}`}
          onBack={() => router.back()}
        />

        <View className="px-[18px] pb-8">
          {detail.isLoading ? (
            <DetailSkeleton />
          ) : detail.isError ? (
            <ErrorState message={detail.error?.message} onRetry={refetchAll} />
          ) : (
            <>
              {/* Başlıq sətri */}
              <Card className="flex-row items-center gap-3">
                <View
                  style={{ backgroundColor: colors.brandTint }}
                  className="h-14 w-14 items-center justify-center rounded-2xl"
                >
                  <Truck size={28} color={colors.brand} />
                </View>
                <View className="min-w-0 flex-1">
                  <Text className="font-mono text-[13px] text-ink-70">{e.equipmentCode}</Text>
                  <Text numberOfLines={1} className="text-[13px] text-muted">
                    {[e.type, e.brand, e.model].filter(Boolean).join(' · ')}
                  </Text>
                </View>
                <EqBadge status={e.status} />
              </Card>

              {/* Qazanc */}
              <SectionHeader title="Qazanc" className="mt-6" />
              {earnings.isLoading ? (
                <View className="flex-row gap-2.5">
                  <Skeleton className="flex-1" height={84} radius={18} />
                  <Skeleton className="flex-1" height={84} radius={18} />
                </View>
              ) : earnings.isError ? (
                <Card flat>
                  <Text className="text-[13px] text-muted">Qazanc məlumatı yüklənmədi.</Text>
                </Card>
              ) : (
                <Earnings data={earnings.data} />
              )}

              {/* Texniki məlumat */}
              <SectionHeader title="Texniki məlumat" className="mt-6" />
              <Card className="py-1">
                <InfoRow label="Növ" value={e.type ?? '—'} />
                <InfoRow label="Brend" value={e.brand ?? '—'} />
                <InfoRow label="Model" value={e.model ?? '—'} />
                <InfoRow label="İstehsal ili" value={e.manufactureYear ?? '—'} />
                <InfoRow label="Seriya №" value={e.serialNumber ?? '—'} mono />
                <InfoRow label="Dövlət nömrəsi" value={e.plateNumber ?? '—'} mono />
                <InfoRow
                  label="Moto saat"
                  value={e.motoHours != null ? String(e.motoHours) : '—'}
                  mono
                />
                <InfoRow
                  label="Çəki (ton)"
                  value={e.weightTon != null ? String(e.weightTon) : '—'}
                  mono
                />
                <InfoRow
                  label="Alış qiyməti"
                  value={e.purchasePrice != null ? azn(e.purchasePrice, 0) : '—'}
                  mono
                />
                <InfoRow
                  label="Cari dəyər"
                  value={e.currentMarketValue != null ? azn(e.currentMarketValue, 0) : '—'}
                  mono
                />
                <InfoRow label="Son baxış" value={azDate(e.lastInspectionDate)} mono />
                <InfoRow label="Növbəti baxış" value={azDate(e.nextInspectionDate)} mono last />
              </Card>

              {/* Layihə tarixçəsi */}
              <SectionHeader title="Layihə tarixçəsi" className="mt-6" />
              {history.isLoading ? (
                <Skeleton height={120} radius={18} />
              ) : history.isError ? (
                <Card flat>
                  <Text className="text-[13px] text-muted">Tarixçə yüklənmədi.</Text>
                </Card>
              ) : (history.data ?? []).length === 0 ? (
                <Card flat>
                  <EmptyState
                    icon={<CalendarDays size={24} color={colors.faint} />}
                    title="Tarixçə yoxdur"
                    sub="Bu texnika hələ heç bir layihəyə qoşulmayıb."
                  />
                </Card>
              ) : (
                <Card className="py-1">
                  {history.data.map((h, i) => (
                    <View
                      key={h.id ?? i}
                      className={`py-3 ${i === history.data.length - 1 ? '' : 'border-b border-line-soft'}`}
                    >
                      <Text className="font-semibold text-[14px] text-ink">
                        {h.projectName ?? 'Layihə'}
                      </Text>
                      <Text className="mt-1 text-xs text-muted">
                        {azDate(h.startDate)} — {h.endDate ? azDate(h.endDate) : 'davam edir'}
                      </Text>
                    </View>
                  ))}
                </Card>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Earnings({ data }) {
  return (
    <>
      <View className="flex-row gap-2.5">
        <View className="flex-1">
          <StatTile
            label="Ümumi qazanc"
            value={aznWhole(data.totalEarn)}
            icon={<Wallet size={15} color={colors.brand} />}
          />
        </View>
        <View className="flex-1">
          <StatTile
            label="Bu ay"
            value={aznWhole(data.monthEarn)}
            accent={colors.green}
            icon={<TrendingUp size={15} color={colors.green} />}
          />
        </View>
      </View>
      <View className="mt-2.5 flex-row gap-2.5">
        <View className="flex-1">
          <StatTile
            label="Günlük dərəcə"
            value={data.dailyRate != null ? azn(data.dailyRate, 0) : '—'}
            accent={colors.blue}
            icon={<CalendarDays size={15} color={colors.blue} />}
          />
        </View>
        <View className="flex-1">
          <StatTile
            label="İşləklik"
            value={`${data.utilizationPct ?? 0}%`}
            sub="son 12 ay"
            accent={colors.purple}
            icon={<Activity size={15} color={colors.purple} />}
          />
        </View>
      </View>

      {/* 12 aylıq trend */}
      <Card className="mt-2.5">
        <Text className="mb-3 font-semibold text-[12.5px] text-muted">
          Son 12 ay · aylıq qazanc
        </Text>
        <TrendBarChart trend={data.trend} />
      </Card>
    </>
  );
}

function DetailSkeleton() {
  return (
    <>
      <Skeleton height={88} radius={18} />
      <View className="mt-6 flex-row gap-2.5">
        <Skeleton className="flex-1" height={84} radius={18} />
        <Skeleton className="flex-1" height={84} radius={18} />
      </View>
      <Skeleton className="mt-6" height={300} radius={18} />
    </>
  );
}
