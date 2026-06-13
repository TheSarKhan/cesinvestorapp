import { View, Text, Pressable } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Truck, Wallet, FileText, User } from 'lucide-react-native';
import { useAuthStore } from '../../src/store/authStore';
import { usePushNotifications } from '../../src/hooks/usePushNotifications';
import { colors } from '../../src/theme/colors';

const TAB_META = {
  dashboard: { label: 'Əsas', Icon: Home },
  equipment: { label: 'Texnika', Icon: Truck },
  finance: { label: 'Maliyyə', Icon: Wallet },
  documents: { label: 'Sənədlər', Icon: FileText },
  profile: { label: 'Profil', Icon: User },
};

// Üzən cam pill tab bar — shell.jsx tab bar portu.
function FloatingTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingBottom: Math.max(insets.bottom, 10), paddingTop: 8 }}
      className="bg-bg"
    >
      <View
        className="mx-3 flex-row rounded-[22px] border border-line bg-card px-1.5 py-2"
        style={{
          shadowColor: '#141821',
          shadowOpacity: 0.1,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
        }}
      >
        {state.routes.map((route, index) => {
          const meta = TAB_META[route.name];
          if (!meta) return null;
          const focused = state.index === index;
          const { Icon } = meta;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="flex-1 items-center gap-1 py-1.5 active:opacity-70"
            >
              <Icon
                size={22}
                color={focused ? colors.brand : colors.faint}
                strokeWidth={focused ? 2 : 1.7}
              />
              <Text
                className="text-[10.5px]"
                style={{
                  color: focused ? colors.brand : colors.faint,
                  fontFamily: focused ? 'Jakarta_700Bold' : 'Jakarta_600SemiBold',
                }}
              >
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const status = useAuthStore((s) => s.status);
  usePushNotifications(status === 'authenticated');
  if (status !== 'authenticated') return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="equipment" />
      <Tabs.Screen name="finance" />
      <Tabs.Screen name="documents" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
