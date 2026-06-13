import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Receipt } from 'lucide-react-native';
import {
  ScreenHeader,
  Card,
  InfoRow,
  InvoiceBadge,
  EmptyState,
  ErrorState,
  Skeleton,
} from '../../src/components';
import { useInvoices } from '../../src/hooks/usePortal';
import { azn, azDate } from '../../src/utils/format';
import { colors } from '../../src/theme/colors';

// Ayrı GET /invoices/{id} yoxdur → siyahıdan tapırıq (cache-dən).
export default function InvoiceDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, error, refetch } = useInvoices();

  const inv = (data ?? []).find((i) => String(i.id) === String(id));

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          subtitle="Qaimə"
          title={inv?.accountingId ?? `#${id}`}
          onBack={() => router.back()}
        />
        <View className="px-[18px] pb-8">
          {isLoading ? (
            <Skeleton height={280} radius={18} />
          ) : isError ? (
            <ErrorState message={error?.message} onRetry={refetch} />
          ) : !inv ? (
            <EmptyState
              icon={<Receipt size={24} color={colors.faint} />}
              title="Qaimə tapılmadı"
              sub="Bu qaimə artıq mövcud deyil."
            />
          ) : (
            <>
              <Card>
                <View className="flex-row items-start justify-between">
                  <View className="min-w-0 flex-1">
                    <Text className="font-semibold text-xs text-muted">Qaimə nömrəsi</Text>
                    <Text className="mt-1 font-mono text-base font-bold text-ink">
                      {inv.accountingId ?? inv.invoiceNumber ?? `#${inv.id}`}
                    </Text>
                  </View>
                  <InvoiceBadge status={inv.status} />
                </View>

                <View className="mt-3.5 border-t border-line-soft pt-1">
                  <InfoRow label="Tarix" value={azDate(inv.invoiceDate)} mono />
                  <InfoRow label="Növ" value={inv.typeLabel ?? '—'} />
                  {!!inv.invoiceNumber && (
                    <InfoRow label="Əsl nömrə" value={inv.invoiceNumber} mono />
                  )}
                  {!!inv.equipmentName && <InfoRow label="Texnika" value={inv.equipmentName} />}
                  {!!inv.projectName && <InfoRow label="Layihə" value={inv.projectName} />}
                  {inv.paidAmount != null && (
                    <InfoRow label="Ödənilib" value={azn(inv.paidAmount, 0)} mono />
                  )}
                  {inv.remainingAmount != null && (
                    <InfoRow label="Qalıq" value={azn(inv.remainingAmount, 0)} mono />
                  )}
                </View>

                <View className="mt-3.5 flex-row items-baseline justify-between border-t border-line pt-3.5">
                  <Text className="font-bold text-sm text-ink">Cəmi</Text>
                  <Text className="font-bold text-[22px] text-brand">{azn(inv.amount)}</Text>
                </View>
              </Card>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
