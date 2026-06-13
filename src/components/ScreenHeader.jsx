import { View, Text, Pressable } from 'react-native';
import { ChevronLeft, Bell } from 'lucide-react-native';
import { colors } from '../theme/colors';

// ui.jsx ScreenHeader portu — başlıq (+ alt başlıq), opsional geri düyməsi və zəng.
export function ScreenHeader({
  title,
  subtitle,
  onBack,
  bell = false,
  unread = 0,
  onBell,
  right,
}) {
  return (
    <View className="flex-row items-center gap-3 px-[18px] pb-3.5 pt-1.5">
      {onBack && (
        <Pressable onPress={onBack} className={iconBtnClass}>
          <ChevronLeft size={20} color={colors.ink} />
        </Pressable>
      )}
      <View className="min-w-0 flex-1">
        {!!subtitle && (
          <Text className="mb-0.5 font-semibold text-xs text-muted">{subtitle}</Text>
        )}
        <Text
          numberOfLines={1}
          className={`font-bold text-ink ${onBack ? 'text-[19px]' : 'text-[26px]'}`}
        >
          {title}
        </Text>
      </View>
      {right}
      {bell && (
        <Pressable onPress={onBell} className={`relative ${iconBtnClass}`}>
          <Bell size={21} color={colors.ink} />
          {unread > 0 && (
            <View
              className="absolute right-1.5 top-1.5 h-4 min-w-4 items-center justify-center rounded-full px-1"
              style={{ backgroundColor: colors.red, borderWidth: 2, borderColor: colors.bg }}
            >
              <Text className="font-bold text-[10px] text-white">{unread}</Text>
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
}

export const iconBtnClass =
  'h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[13px] border border-line bg-card';

export default ScreenHeader;
