# Invorent İnvestor App — Buraxılış (EAS Build)

> Mərhələ 6. Layihə build-ə hazırdır: brend ikon/splash, `eas.json` profilləri,
> `app.json` (bundle ID, scheme, cleartext HTTP, runtimeVersion) tamamlandı.
> EAS Build **Expo hesabı tələb edir** və buludda işləyir (kotanı istifadə edir).

## 0. Bir dəfəlik hazırlıq
```bash
npm install -g eas-cli          # və ya npx eas-cli ... işlət
eas login                       # Expo hesabı (yoxdursa expo.dev-də pulsuz yarat)
cd investor-app
eas init                        # projectId yaradır → app.json-a owner + extra.eas.projectId əlavə edir
```

## 1. Android — preview (paylaşıla bilən standalone APK)
```bash
eas build -p android --profile preview
```
- Bitəndə EAS bir **URL + QR** verir → APK-nı endir → telefona quraşdır.
- Bu, Expo Go-suz işləyən əsl app-dır (Metro lazım deyil).

## 2. Android — development (cihazda Metro ilə canlı debug)
```bash
eas build -p android --profile development   # bir dəfə dev-client APK
npx expo start --dev-client                  # sonra hər dəfə kod dəyişikliyi
```

## 3. iOS
- iOS cihaz/store üçün **Apple Developer hesabı ($99/il)** lazımdır.
- `eas build -p ios --profile preview` → buludda qurulur; paylaşım TestFlight və ya
  ad-hoc provisioning ilə (Apple hesabı zəruri). Mac lazım deyil — EAS buludda qurur.

## 4. Store-a göndərmə (sonra)
```bash
eas build -p android --profile production    # AAB
eas submit -p android --latest               # Play Store
```

---

## ⚠️ VACİB — Backend əlçatanlığı
Standalone build (`preview`/`development`) `eas.json`-dakı `EXPO_PUBLIC_API_BASE_URL`
ünvanına qoşulur:

| Profil | API URL | Şərt |
|---|---|---|
| development / preview | `http://192.168.1.11:8083` | Telefon **PC ilə eyni Wi-Fi**-də + backend işləyir. Cleartext HTTP icazəlidir (`expo-build-properties`). |
| production | `https://api.invorent.az` | **Placeholder** — real public HTTPS backend lazımdır. |

- **LAN IP dəyişərsə** (yeni şəbəkə): `eas.json`-da `preview`/`development` env-i + `.env`-i yenilə, yenidən qur.
- **Store/real istifadə üçün:** backend public HTTPS ünvanda yayımlanmalı, sonra `production` env-i həqiqi URL ilə əvəzlənməli. HTTPS olduqda cleartext icazəsini (`usesCleartextTraffic`) silmək olar.

## Versiya artımı
- `eas.json` → `cli.appVersionSource: "remote"` (EAS versionCode/buildNumber-i idarə edir).
- `production` profilində `autoIncrement: true`.
- App versiyası: `app.json` → `version` (`runtimeVersion.policy: appVersion`).
