import { ScrollView, View, Text, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  Receipt,
  CheckCircle2,
  Wallet,
  Clock,
} from 'lucide-react-native';
import {
  ScreenHeader,
  StatTile,
  Card,
  SectionHeader,
  ErrorState,
  Skeleton,
  StatusDonut,
} from '../../src/components';
import { useDashboard, useUnreadCount } from '../../src/hooks/usePortal';
import { useAuthStore } from '../../src/store/authStore';
import { aznWhole } from '../../src/utils/format';
import { colors } from '../../src/theme/colors';

export default function Dashboard() {
  const router = useRouter();
  const investor = useAuthStore((s) => s.investor);
  const { data, isLoading, isError, error, refetch, isRefetching } = useDashboard();
  const { data: unreadCount } = useUnreadCount();

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.brand} />
        }
      >
        <ScreenHeader
          subtitle={investor?.companyName ?? 'İnvestor'}
          title="Əsas"
          bell
          unread={unreadCount ?? 0}
          onBell={() => router.push('/notifications')}
        />

        <View className="px-[18px] pb-6">
          {isLoading ? (
            <DashboardSkeleton />
          ) : isError ? (
            <ErrorState message={error?.message} onRetry={refetch} />
          ) : (
            <DashboardContent data={data} onGoFinance={() => router.push('/finance')} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DashboardContent({ data, onGoFinance }) {
  return (
    <>
      {/* Hero — qalıq borc */}
      <LinearGradient
        colors={[colors.brand, colors.brandDk]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={{ borderRadius: 22, padding: 20 }}
      >
        <Text className="font-semibold text-[13px] text-white/85">
          Şirkətin sizə qalıq borcu
        </Text>
        <Text className="mt-2 font-bold text-[36px] text-white">
          {aznWhole(data.outstanding)}
        </Text>
        <Text className="mt-1 text-[12.5px] text-white/80">
          {data.openPayablesCount} açıq ödəniş · ümumi kəsilmiş {aznWhole(data.totalInvoiced)}
        </Text>
        <Pressable
          onPress={onGoFinance}
          className="mt-4 h-[46px] flex-row items-center justify-center gap-2 rounded-[13px] active:opacity-90"
          style={{ backgroundColor: 'rgba(255,255,255,0.18)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' }}
        >
          <Text className="font-semibold text-sm text-white">Ödənişlərə bax</Text>
          <ChevronRight size={16} color="#fff" />
        </Pressable>
      </LinearGradient>

      {/* Stat grid */}
      <View className="mt-4 flex-row gap-2.5">
        <View className="flex-1">
          <StatTile
            label="Ümumi kəsilmiş"
            value={aznWhole(data.totalInvoiced)}
            icon={<Receipt size={15} color={colors.brand} />}
          />
        </View>
        <View className="flex-1">
          <StatTile
            label="Ödənilmiş"
            value={aznWhole(data.totalPaid)}
            accent={colors.green}
            icon={<CheckCircle2 size={15} color={colors.green} />}
          />
        </View>
      </View>
      <View className="mt-2.5 flex-row gap-2.5">
        <View className="flex-1">
          <StatTile
            label="Qalıq borc"
            value={aznWhole(data.outstanding)}
            accent={colors.amber}
            icon={<Wallet size={15} color={colors.amber} />}
          />
        </View>
        <View className="flex-1">
          <StatTile
            label="Açıq ödənişlər"
            value={String(data.openPayablesCount ?? 0)}
            sub="ədəd"
            accent={colors.blue}
            icon={<Clock size={15} color={colors.blue} />}
          />
        </View>
      </View>

      {/* Texnika statusu */}
      <SectionHeader title="Texnika" className="mt-6" />
      <Card>
        <StatusDonut byStatus={data.equipmentByStatus} total={data.equipmentCount} />
      </Card>
    </>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <Skeleton height={150} radius={22} />
      <View className="mt-4 flex-row gap-2.5">
        <Skeleton className="flex-1" height={84} radius={18} />
        <Skeleton className="flex-1" height={84} radius={18} />
      </View>
      <View className="mt-2.5 flex-row gap-2.5">
        <Skeleton className="flex-1" height={84} radius={18} />
        <Skeleton className="flex-1" height={84} radius={18} />
      </View>
      <Skeleton className="mt-6" height={160} radius={18} />
    </>
  );
}
