import { useState } from 'react';
import { ScrollView, View, Text, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import { FileText, Download } from 'lucide-react-native';
import { ScreenHeader, Card, EmptyState, ErrorState, Skeleton } from '../../src/components';
import { useDocuments } from '../../src/hooks/usePortal';
import { downloadDocumentToCache } from '../../src/api/portal';
import { extractErrorMessage } from '../../src/api/client';
import { azDate } from '../../src/utils/format';
import { colors } from '../../src/theme/colors';

// Kateqoriya sırası (sənəd mərkəzi ilə eyni)
const CATEGORY_ORDER = [
  'Əl ilə yüklənən',
  'Müqavilələr',
  'Təhvil-təslim aktları',
  'Texnika sənədləri',
  'Qaimələr / Fakturalar',
  'Qaimə aktları',
];

const docKey = (d) => `${d.sourceType}:${d.sourceId}`;

export default function Documents() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useDocuments();
  const [downloadingKey, setDownloadingKey] = useState(null);
  const list = data ?? [];

  const openDocument = async (doc) => {
    if (downloadingKey) return;
    setDownloadingKey(docKey(doc));
    try {
      const { uri, mimeType } = await downloadDocumentToCache(
        doc.sourceType,
        doc.sourceId,
        doc.name,
        doc.fileType,
      );
      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        Alert.alert('Sənəd', 'Bu cihazda fayl açmaq mümkün deyil.');
        return;
      }
      await Sharing.shareAsync(uri, { mimeType, dialogTitle: doc.name ?? 'Sənəd' });
    } catch (e) {
      Alert.alert('Xəta', extractErrorMessage(e, 'Sənəd açılmadı.'));
    } finally {
      setDownloadingKey(null);
    }
  };

  // Kateqoriyalara qrupla
  const groups = {};
  for (const d of list) {
    const cat = d.category || 'Digər';
    (groups[cat] ||= []).push(d);
  }
  const orderedCats = [
    ...CATEGORY_ORDER.filter((c) => groups[c]),
    ...Object.keys(groups).filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.brand} />
        }
      >
        <ScreenHeader title="Sənədlər" subtitle={data ? `${list.length} sənəd` : undefined} />
        <View className="px-[18px] pb-6">
          {isLoading ? (
            <View className="gap-2.5">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} height={68} radius={18} />
              ))}
            </View>
          ) : isError ? (
            <ErrorState message={error?.message} onRetry={refetch} />
          ) : list.length === 0 ? (
            <EmptyState
              icon={<FileText size={24} color={colors.faint} />}
              title="Sənəd yoxdur"
              sub="Sizə aid sənəd tapılmadı."
            />
          ) : (
            <View className="gap-4">
              {orderedCats.map((cat) => (
                <View key={cat} className="gap-2.5">
                  <Text className="text-xs font-bold uppercase text-muted">
                    {cat} ({groups[cat].length})
                  </Text>
                  {groups[cat].map((d) => {
                    const busy = downloadingKey === docKey(d);
                    return (
                      <Card
                        key={docKey(d)}
                        className="flex-row items-center gap-3 p-3.5"
                        onPress={() => openDocument(d)}
                      >
                        <View
                          style={{ backgroundColor: colors.brandTint }}
                          className="h-[42px] w-[42px] items-center justify-center rounded-xl"
                        >
                          <FileText size={20} color={colors.brand} />
                        </View>
                        <View className="min-w-0 flex-1">
                          <Text numberOfLines={1} className="font-semibold text-[14px] text-ink">
                            {d.name ?? 'Sənəd'}
                          </Text>
                          <Text numberOfLines={1} className="mt-0.5 text-xs text-muted">
                            {[d.fileType, d.context, azDate(d.date)].filter(Boolean).join(' · ')}
                          </Text>
                        </View>
                        {busy ? (
                          <ActivityIndicator size="small" color={colors.brand} />
                        ) : (
                          <Download size={18} color={colors.faint} />
                        )}
                      </Card>
                    );
                  })}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
