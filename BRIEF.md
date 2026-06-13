# Invorent · İnvestor Mobil App — İnteqrasiya Brifi

> CES ERP-in investor portalının React Native (Expo) mobil tətbiqinə çevrilməsi və backend ilə inteqrasiyası.
> Status: **Planlaşdırma** · Tarix: 2026-06-13

---

## 1. Məqsəd
İnvestorların öz texnikalarını, qazanclarını, qaimələrini, ödənişlərini və sənədlərini
**telefondan canlı (real-time) izləməsi** üçün native mobil tətbiq. Hazırkı `cesinvestorapp`
brauzer-prototipi (mock data, telefon UI) dizayn mənbəyidir — onu işləyən, backend-ə bağlı
native app-a çeviririk.

## 2. Əhatə (Scope)
**Daxildir:**
- React Native (Expo) app — mövcud 5 ekranlı UI-ın köçürülməsi
- `/api/investor-auth` (JWT) + `/api/portal/*` ilə real inteqrasiya
- iOS + Android (EAS Build → App Store / Play Store)

**Daxil deyil (bu mərhələdə):**
- Backend dəyişiklikləri — **backend toxunulmur** (yalnız mövcud API istehlak olunur)
- `offers` (təkliflər) — backend endpoint-i yoxdur → mock qalır
- Web versiya (ERP onsuz web-dir)

## 3. Tech Stack
| Konsept | Texnologiya | ERP qarşılığı |
|---|---|---|
| Framework | Expo SDK 54 + React Native | React + Vite |
| Routing | Expo Router (fayl-əsaslı) | React Router v7 |
| Styling | NativeWind v4 (Tailwind) | Tailwind v4 |
| State | Zustand | Zustand |
| HTTP + JWT | Axios + refresh interceptor | Axios |
| Server cache | TanStack Query | — |
| Token saxlama | expo-secure-store | localStorage |
| İkonlar | lucide-react-native | lucide-react |
| Şriftlər | Plus Jakarta Sans + Geist Mono | (eyni, CDN) |
| Qrafiklər | react-native-gifted-charts | custom SVG |
| Siyahılar | FlashList | — |
| Push | expo-notifications | — |
| Build | EAS Build | Netlify |

## 4. Dizayn Sistemi (prototip `core.jsx`-dən)
NativeWind theme-ə köçürülür:
```
bg #F4F5F7 · card #FFFFFF · line #E7E9ED
ink #15181D · muted #6B727D · faint #9AA1AC
brand(yaşıl) #15A34A · brandDk #0F8A3E · brandTint #E6F6EC
amber #D97706 (yalnız status: İcarədə/Gözləyir)
green #15A34A · blue #2563EB · purple #7C3AED · red #DC2626
```
Şriftlər: başlıq/mətn = Plus Jakarta Sans, rəqəm/mono = Geist Mono.
Telefon-first layout (390pt baza), bottom tab bar, overlay stack ekranları.

## 5. Naviqasiya (prototip `shell.jsx`-dən)
**5 əsas tab:** Əsas (dashboard) · Texnika (equipment) · Maliyyə (finance) · Sənədlər (documents) · Profil (profile)
**Stack/overlay ekranlar:** equipmentDetail · invoiceDetail · offers · offerDetail · notifications · upload

## 6. Backend API Xəritəsi (`/api/portal`, investor JWT — HAZIR ✅)
| Ekran | Endpoint | DTO |
|---|---|---|
| login | `POST /api/investor-auth/login` `/refresh` `/logout` | InvestorLoginResponse {accessToken, refreshToken, investor} |
| dashboard | `GET /api/portal/dashboard` | PortalDashboardResponse |
| equipment | `GET /api/portal/equipment` | EquipmentResponse[] |
| equipment-detail | `GET /api/portal/equipment/{id}` + `/history` | EquipmentResponse + ProjectHistoryResponse[] |
| finance | `GET /api/portal/invoices` + `GET /api/portal/payments` | InvoiceResponse[] + PayableResponse[] |
| documents | `GET /api/portal/documents` | DocumentResponse[] |
| profile | `GET /api/portal/me` + `POST /api/portal/change-password` | InvestorResponse |
| documents | `GET /api/portal/documents` + `GET /api/portal/documents/{id}/download` ✅ **YENİ** | DocumentResponse[] + fayl axını (VÖEN-scoped) |
| equipment-detail (qazanc) | `GET /api/portal/equipment/{id}/earnings` ✅ **YENİ** | PortalEquipmentEarnings {totalEarn, monthEarn, dailyRate, utilizationPct, trend[12]} |

### Açar DTO sahələri
- **PortalDashboardResponse:** `equipmentCount`, `equipmentByStatus{status→say}`, `totalInvoiced`, `totalPaid`, `outstanding`, `openPayablesCount`
- **EquipmentResponse:** id, equipmentCode, name, type, brand, model, manufactureYear, serialNumber, plateNumber, motoHours, weightTon, purchasePrice, currentMarketValue, status, technicalReadinessStatus, lastInspectionDate, nextInspectionDate, ownerInvestorName/Voen/Phone, inspections[], documents[], images[]
- **InvoiceResponse:** accountingId, invoiceNumber, type/typeLabel, status, amount, paidAmount, remainingAmount, invoiceDate, equipmentName, projectName, ...
- **PayableResponse:** payeeName, ownershipType, totalAmount, paidAmount, dueDate, status, equipmentName, projectName, invoices[], payments[]
- **InvestorResponse:** companyName, voen, contactPerson, contactPhone, address, accountEmail, portalEnabled, lastLoginAt, rating, riskLevel

## 7. ⚠️ Data Boşluqları (UI ↔ Backend uyğunsuzluqları)
Köçürmədən əvvəl həll edilməli — UI mock-da olan, backend-də OLMAYAN sahələr:

| # | UI gözləntisi (mock) | Backend reallığı | Həll yolu |
|---|---|---|---|
| 1 | Texnika başına **qazanc** (`totalEarn`, `monthEarn`, `dailyRate`), **utilization %**, 12-aylıq **trend[]** | `EquipmentResponse`-də YOXDUR | ✅ **HƏLL OLUNDU (B-tam):** `Invoice`-a `equipment_id` FK (V16 migration + ID-əsaslı backfill); yeni `GET /api/portal/equipment/{id}/earnings` server-side hesablayır (qazanc=INVESTOR_EXPENSE qaimələri texnika ID ilə; utilization=layihə tarixçəsi tarixlərindən). Backend dəyişikliyi tələb etdi, istifadəçi təsdiqlədi. |
| 2 | **offers** (icarə təklifləri) ekranı | Endpoint yox | Mock saxla, gələcək backend işi kimi qeyd et |
| 3 | **notifications** (bildirişlər) | Endpoint yox idi | ✅ **HƏLL OLUNDU (M5):** `investor_notifications` + `investor_push_tokens` (V17), `/portal/notifications*` + `/portal/push-token*` endpoint-ləri, Expo push (ExpoPushService), avtomatik trigger-lər (texnika RENTED + ödəniş gəldi). İstifadəçi təsdiqlədi. |
| 4 | **upload** (sənəd yükləmə) | Yalnız `GET /documents` (POST təsdiqlənməyib) | Read-only qaldı (upload). ✅ **Sənəd AÇMA/ENDİRMƏ əlavə olundu:** `GET /portal/documents/{id}/download` (VÖEN-scoped) + frontend expo-file-system/sharing ilə açır. İstifadəçi təsdiqlədi. |
| 5 | **forgot-password OTP** (3 addım) | Yalnız autentifikasiyalı `change-password` | OTP axını backend-də yoxdur → MVP-də gizlət, yalnız `change-password` |

> Qeyd: bu boşluqlar backend dəyişikliyi tələb edir — Boşluq #1 istisna olmaqla (həll olundu) qalanı MVP-də mock/gizli qalır.

### ✅ Kəşf edilən əlavə boşluq — HƏLL OLUNDU
**İnvestor FK təyin olunmurdu:** avtomatik `INVESTOR_EXPENSE` qaimələrində `investor_id` set edilmirdi (yalnız `companyName`), amma portal `findAllByInvestorId` (`i.investor.id`) ilə süzür → investorun dashboard/invoices maliyyəsi boş qayıda bilərdi. **Düzəliş:** `autoCreateExpenseInvoice`-də texnikanın VÖEN-i ilə investoru tapıb `.investor(...)` set edilir; V16-da mövcud qaimələr üçün `investor_id` backfill (equipment_id → equipment.owner_investor_voen → investors.voen, VÖEN unikaldır). `findByVoenAndDeletedFalse` repozitoriyaya əlavə olundu. Kompilyasiya OK.

## 8. Dev Mühit Qeydləri
> ⚠️ Backend portu **:8083**-dür (`application.yml` təsdiqləndi) — əvvəlki :8080 səhv idi.
- API base URL `.env` + `expo-constants` ilə.
- Expo Go (fiziki telefon): `http://<LAN-IP>:8083` (məs. `192.168.x.x`).
- Android emulator: `http://10.0.2.2:8083`.
- iOS simulator: `http://localhost:8083`.

## 9. Uğur Meyarları (Definition of Done — MVP)
- [ ] İnvestor real hesabla daxil olur (JWT, refresh, secure saxlama)
- [ ] Dashboard real aggregate datanı göstərir
- [ ] Texnika siyahısı + detalı real backend-dən
- [ ] Maliyyə (invoice + payment) real
- [ ] Sənədlər siyahısı real
- [ ] Profil real + şifrə dəyişmə
- [ ] iOS + Android-da EAS dev build işləyir
