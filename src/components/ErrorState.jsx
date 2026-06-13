import { View, Text, Pressable } from 'react-native';
import { CloudOff, RotateCw } from 'lucide-react-native';
import { colors } from '../theme/colors';

// Sorğu xətası vəziyyəti — təkrar cəhd düyməsi ilə.
export function ErrorState({ message, onRetry }) {
  return (
    <View className="items-center px-6 py-12">
      <View className="mb-3.5 h-14 w-14 items-center justify-center rounded-2xl bg-red-tint">
        <CloudOff size={24} color={colors.red} />
      </View>
      <Text className="font-bold text-[15px] text-ink">Xəta baş verdi</Text>
      <Text className="mt-1 max-w-[260px] text-center text-[13px] leading-5 text-muted">
        {message ?? 'Məlumat yüklənmədi. Şəbəkəni yoxlayıb yenidən cəhd edin.'}
      </Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          className="mt-4 flex-row items-center gap-2 rounded-[13px] border border-line bg-card px-4 py-2.5 active:opacity-80"
        >
          <RotateCw size={16} color={colors.ink} />
          <Text className="font-semibold text-[13px] text-ink">Yenidən cəhd et</Text>
        </Pressable>
      )}
    </View>
  );
}

export default ErrorState;
