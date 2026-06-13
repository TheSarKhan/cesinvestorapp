# Invorent İnvestor App — Texniki İcra Planı

> Brief: [BRIEF.md](BRIEF.md) · Stack: Expo + NativeWind + Zustand + Axios/JWT + TanStack Query
> Tarix: 2026-06-13

---

## Hədəf Qovluq Strukturu
> Diqqət: prototip `app/` istifadə edir, Expo Router da `app/` istəyir → **toqquşma**.
> Həll: prototip `design-reference/`-ə köçürülür, `app/` Expo Router-a verilir.

```
investor-app/
├── app/                          # Expo Router routes
│   ├── _layout.jsx               # root: QueryProvider, fonts, auth gate
│   ├── index.jsx                 # redirect → (auth)/login | (tabs)/dashboard
│   ├── (auth)/
│   │   ├── _layout.jsx
│   │   └── login.jsx
│   ├── (tabs)/
│   │   ├── _layout.jsx           # bottom tab bar (5 tab)
│   │   ├── dashboard.jsx
│   │   ├── equipment.jsx
│   │   ├── finance.jsx
│   │   ├── documents.jsx
│   │   └── profile.jsx
│   ├── equipment/[id].jsx        # detal (stack)
│   ├── invoice/[id].jsx
│   └── notifications.jsx
├── src/
│   ├── api/
│   │   ├── client.js             # axios instance + JWT refresh interceptor (ERP axios.js portu)
│   │   ├── auth.js               # /api/investor-auth
│   │   └── portal.js             # /api/portal/*
│   ├── store/
│   │   └── authStore.js          # Zustand + expo-secure-store
│   ├── hooks/                    # useDashboard, useEquipment... (TanStack Query)
│   ├── components/               # Card, Button, StatusBadge, Stat, Chart, Field...
│   ├── theme/
│   │   └── tokens.js             # core.jsx C → NativeWind theme
│   └── utils/                    # format (AZN, tarix), enumLabel
├── assets/                       # fonts, icon, splash
├── design-reference/             # köhnə prototip (app/, kit/, *.jsx) — yalnız referans
├── app.json · eas.json · tailwind.config.js · babel.config.js · metro.config.js
├── .env · .env.example
└── package.json
```

---

## Mərhələ 0 — Setup (təməl)
- [ ] Prototipi `design-reference/`-ə köçür (app/, kit/, *.jsx, *.html)
- [ ] `npx create-expo-app` (TypeScript-siz, JS — ERP ilə eyni) + Expo Router
- [ ] NativeWind v4 quraşdır + `tailwind.config.js`-ə dizayn tokenləri (brand yaşıl #15A34A, ink #15181D, ...)
- [ ] Şriftlər: `@expo-google-fonts/plus-jakarta-sans`, geist-mono → `expo-font`
- [ ] Asılılıqlar: axios, zustand, @tanstack/react-query, expo-secure-store, lucide-react-native, react-native-gifted-charts, @shopify/flash-list
- [ ] `.env` + `expo-constants` ilə API base URL
- **DoD:** boş app iOS/Android-da açılır, NativeWind + şrift işləyir

## Mərhələ 1 — Auth təməli
- [ ] `api/client.js` — axios instance, base URL, JWT Authorization header, 401→refresh növbə (ERP `axios.js` məntiqi)
- [ ] `api/auth.js` — login/refresh/logout (`/api/investor-auth`)
- [ ] `store/authStore.js` — Zustand: investor, tokenlər; `expo-secure-store`-da saxla; `login()`, `logout()`, `hydrate()`
- [ ] `app/_layout.jsx` — auth gate (token varsa tabs, yoxsa login)
- [ ] `(auth)/login.jsx` — prototip `login.jsx`-in NativeWind portu, real login
- **DoD:** real investor hesabı ilə daxil ol, token secure saxlanır, restart-da session qalır

## Mərhələ 2 — Naviqasiya skeleti + paylaşılan komponentlər
- [ ] `(tabs)/_layout.jsx` — 5 tablı bottom bar (Əsas/Texnika/Maliyyə/Sənədlər/Profil), lucide ikonlar
- [ ] Stack ekranları üçün marşrutlar (equipment/[id], invoice/[id], notifications)
- [ ] Paylaşılan komponentlər (`core.jsx`/`ui.jsx`-dən): Card, Button, StatusBadge, Stat, Field, SectionHeader, EmptyState, Skeleton
- **DoD:** tablar arası keçid, boş ekranlar düzgün render

## Mərhələ 3 — Ekran × API inteqrasiyası (bir-bir)
Hər ekran üçün: prototipdən UI portu → TanStack Query hook → real endpoint → loading/empty/error.

- [ ] **Dashboard** ← `GET /dashboard` (equipmentCount, equipmentByStatus, totalInvoiced/Paid/outstanding, openPayablesCount)
- [ ] **Equipment list** ← `GET /equipment`; status filter
- [ ] **Equipment detail** ← `GET /equipment/{id}` + `/history`; qazanc → invoice-lardan **hesabla** (Boşluq #1)
- [ ] **Finance** ← `GET /invoices` + `GET /payments`; tab/alt-bölmə
- [ ] **Documents** ← `GET /documents`; (upload backend-dən asılı — Boşluq #4)
- [ ] **Profile** ← `GET /me` + `POST /change-password`
- [ ] **Offers / Notifications** — mock saxla (Boşluq #2,#3)
- **DoD:** hər real ekran backend datası ilə işləyir, AZN/tarix formatı düzgün

## Mərhələ 4 — Qrafiklər + cila
- [ ] Dashboard/equipment trend qrafikləri → `react-native-gifted-charts`
- [ ] Loading skeleton, empty state, error retry hər ekranda
- [ ] Pull-to-refresh, TanStack Query cache/invalidation
- [ ] FlashList böyük siyahılarda
- **DoD:** axıcı UX, offline-tolerant cache

## Mərhələ 5 — Push ✅ (backend + frontend tam)
- [x] Backend: `investor_push_tokens` + `investor_notifications` (V17), `/portal/push-token*`, `/portal/notifications*`, ExpoPushService
- [x] Avtomatik trigger: texnika RENTED (EquipmentService.changeStatus) + ödəniş gəldi (PayableService.addPayment) — best-effort, REQUIRES_NEW izolə
- [x] Frontend: `expo-notifications` token qeydiyyatı, handler + naviqasiya, Bildirişlər ekranı (real), dashboard zəng sayğacı
- **DoD:** push çatması üçün EAS dev/preview build + FCM lazımdır (Expo Go-da işləməz)

## Mərhələ 6 — Buraxılış
- [x] App icon, splash (Invorent brendi — yaşıl yük maşını markası, `scripts/generate_assets.py`)
- [x] `eas.json` profilləri (development/preview/production) + cleartext HTTP (`expo-build-properties`)
- [ ] EAS dev/preview build → fiziki cihaz testi (istifadəçi: `eas login` + `eas build`, bax [RELEASE.md](RELEASE.md))
- [ ] (Sonra) store submission
- **DoD:** preview build paylaşıla bilir — konfiqurasiya hazır, build istifadəçi hesabı ilə

---

## Risklər / Açıq suallar
1. **Texnika qazanc/utilization datası** backend-də yoxdur → client-side hesablama kifayətdirmi, yoxsa backend-ə sahə əlavə olunmalı? (istifadəçi qərarı)
2. **offers/notifications/upload/OTP** endpoint-ləri yoxdur → MVP-də mock/gizli; backend roadmap-a düşürmü?
3. Dev-də fiziki cihazdan backend-ə çıxış (LAN IP / tunnel) qurulmalı.

## Növbəti addım
Mərhələ 0-dan başla: prototipi `design-reference/`-ə köçür + Expo skeletini qur.
