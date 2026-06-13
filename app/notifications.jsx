import { ScrollView, View, Text, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bell, Truck, Wallet, CheckCheck } from 'lucide-react-native';
import { ScreenHeader, Card, EmptyState, ErrorState, Skeleton } from '../src/components';
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from '../src/hooks/usePortal';
import { azDate } from '../src/utils/format';
import { colors } from '../src/theme/colors';

const TYPE_META = {
  EQUIPMENT_RENTED: { Icon: Truck, color: colors.amber, tint: colors.amberTint },
  PAYMENT_RECEIVED: { Icon: Wallet, color: colors.green, tint: colors.greenTint },
};
const fallbackMeta = { Icon: Bell, color: colors.blue, tint: colors.blueTint };

export default function Notifications() {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch, isRefetching } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();
  const list = data ?? [];
  const hasUnread = list.some((n) => !n.read);

  const onPressItem = (n) => {
    if (!n.read) markRead.mutate(n.id);
    if (n.type === 'EQUIPMENT_RENTED' && n.relatedId) router.push(`/equipment/${n.relatedId}`);
    else if (n.type === 'PAYMENT_RECEIVED') router.push('/finance');
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.brand} />
        }
      >
        <ScreenHeader
          title="Bildirişlər"
          onBack={() => router.back()}
          right={
            hasUnread ? (
              <Pressable
                onPress={() => markAll.mutate()}
                className="flex-row items-center gap-1 active:opacity-70"
              >
                <CheckCheck size={16} color={colors.brand} />
                <Text className="font-semibold text-[13px] text-brand">Hamısını oxu</Text>
              </Pressable>
            ) : null
          }
        />

        <View className="px-[18px] pb-6">
          {isLoading ? (
            <View className="gap-2.5">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} height={72} radius={18} />
              ))}
            </View>
          ) : isError ? (
            <ErrorState message={error?.message} onRetry={refetch} />
          ) : list.length === 0 ? (
            <EmptyState
              icon={<Bell size={24} color={colors.faint} />}
              title="Bildiriş yoxdur"
              sub="Texnika icarəyə veriləndə və ya ödəniş gələndə burada görünəcək."
            />
          ) : (
            <View className="gap-2.5">
              {list.map((n) => {
                const meta = TYPE_META[n.type] ?? fallbackMeta;
                const { Icon } = meta;
                return (
                  <Card
                    key={n.id}
                    className={`flex-row items-center gap-3 p-3.5 ${n.read ? '' : 'border-brand-line'}`}
                    onPress={() => onPressItem(n)}
                  >
                    <View
                      style={{ backgroundColor: meta.tint }}
                      className="h-[42px] w-[42px] items-center justify-center rounded-xl"
                    >
                      <Icon size={20} color={meta.color} />
                    </View>
                    <View className="min-w-0 flex-1">
                      <View className="flex-row items-center gap-2">
                        <Text numberOfLines={1} className="flex-1 font-semibold text-[14px] text-ink">
                          {n.title}
                        </Text>
                        {!n.read && (
                          <View style={{ backgroundColor: colors.brand }} className="h-2 w-2 rounded-full" />
                        )}
                      </View>
                      {!!n.body && (
                        <Text numberOfLines={2} className="mt-0.5 text-xs text-muted">
                          {n.body}
                        </Text>
                      )}
                      <Text className="mt-1 text-[11px] text-faint">{azDate(n.createdAt)}</Text>
                    </View>
                  </Card>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
