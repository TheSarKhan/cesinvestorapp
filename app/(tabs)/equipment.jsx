import { useState, useMemo } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Truck, CalendarClock } from 'lucide-react-native';
import { ScreenHeader, Card, EqBadge, EmptyState, ErrorState, Skeleton } from '../../src/components';
import { useEquipmentList } from '../../src/hooks/usePortal';
import { azDate } from '../../src/utils/format';
import { colors } from '../../src/theme/colors';

const FILTERS = [
  { id: 'all', label: 'Hamısı' },
  { id: 'RENTED', label: 'İcarədə' },
  { id: 'AVAILABLE', label: 'Mövcuddur' },
  { id: 'IN_TRANSIT', label: 'Yoldadır' },
  { id: 'UNDER_CHECK', label: 'Baxışda' },
];

export default function Equipment() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const { data, isLoading, isError, error, refetch, isRefetching } = useEquipmentList();

  const list = useMemo(() => {
    const items = data ?? [];
    return items.filter((e) => {
      if (filter !== 'all' && e.status !== filter) return false;
      if (q) {
        const s = q.toLowerCase();
        return (
          e.name?.toLowerCase().includes(s) ||
          e.equipmentCode?.toLowerCase().includes(s) ||
          e.type?.toLowerCase().includes(s) ||
          e.brand?.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [data, filter, q]);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.brand} />
        }
      >
        <ScreenHeader
          title="Texnika"
          subtitle={data ? `${data.length} texnika` : undefined}
        />

        <View className="px-[18px] pb-6">
          {/* Axtarış */}
          <View className="mb-3 flex-row items-center gap-2.5 rounded-[14px] border border-line bg-card px-3.5 py-3">
            <Search size={18} color={colors.faint} />
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Texnika adı, kod, növ…"
              placeholderTextColor={colors.faint}
              className="flex-1 font-medium text-sm text-ink"
            />
          </View>

          {/* Filter çipləri */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 7, paddingVertical: 2 }}
          >
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <Pressable
                  key={f.id}
                  onPress={() => setFilter(f.id)}
                  className={`rounded-full border px-3.5 py-2 ${
                    active ? 'border-ink bg-ink' : 'border-line bg-card'
                  }`}
                >
                  <Text
                    className={`font-semibold text-[13px] ${active ? 'text-white' : 'text-ink-70'}`}
                  >
                    {f.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Siyahı */}
          <View className="mt-3.5 gap-2.5">
            {isLoading ? (
              [0, 1, 2, 3].map((i) => <Skeleton key={i} height={86} radius={18} />)
            ) : isError ? (
              <ErrorState message={error?.message} onRetry={refetch} />
            ) : list.length === 0 ? (
              <EmptyState
                icon={<Truck size={24} color={colors.faint} />}
                title="Texnika tapılmadı"
                sub="Axtarış və ya filtri dəyişib yenidən cəhd edin."
              />
            ) : (
              list.map((e) => (
                <EqCard key={e.id} e={e} onPress={() => router.push(`/equipment/${e.id}`)} />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function EqCard({ e, onPress }) {
  return (
    <Card className="p-[13px]" onPress={onPress}>
      <View className="flex-row gap-3">
        <View
          style={{ backgroundColor: colors.brandTint }}
          className="h-[56px] w-[56px] items-center justify-center rounded-[15px]"
        >
          <Truck size={26} color={colors.brand} />
        </View>
        <View className="min-w-0 flex-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text numberOfLines={1} className="flex-1 font-bold text-[15px] text-ink">
              {e.name}
            </Text>
            <EqBadge status={e.status} sm />
          </View>
          <View className="mt-1 flex-row items-center gap-1.5">
            <Text className="font-mono text-xs text-ink-70">{e.equipmentCode}</Text>
            {!!e.type && <View className="h-[3px] w-[3px] rounded-full bg-faint" />}
            <Text numberOfLines={1} className="flex-1 text-xs text-muted">
              {[e.type, e.brand].filter(Boolean).join(' · ')}
            </Text>
          </View>
          {!!e.nextInspectionDate && (
            <View className="mt-2 flex-row items-center gap-1.5">
              <CalendarClock size={13} color={colors.faint} />
              <Text className="text-xs text-muted">
                Növbəti baxış: {azDate(e.nextInspectionDate)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
}
