import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Foreground-da bildiriş göstərilsin (SDK 54 sahələri).
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

let currentToken = null;
export const setCurrentPushToken = (t) => { currentToken = t; };
export const getCurrentPushToken = () => currentToken;

// Push token al — best-effort. Expo Go (SDK 53+), emulator, və ya projectId yoxdursa null.
export async function registerForPushNotificationsAsync() {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Bildirişlər',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
    if (!Device.isDevice) return null; // emulator → uzaq push işləmir

    const { status: existing } = await Notifications.getPermissionsAsync();
    let status = existing;
    if (existing !== 'granted') {
      status = (await Notifications.requestPermissionsAsync()).status;
    }
    if (status !== 'granted') return null;

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    const tokenData = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined
    );
    return tokenData?.data ?? null;
  } catch {
    return null; // build/credential yoxdursa app sınmasın
  }
}
