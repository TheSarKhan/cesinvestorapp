# Invorent · İnvestor App — Vizyon və Məqsəd

> Bu sənəd: layihə **nə işə yarayır**, **kim üçündür**, **niyə var** və **hara gedir**.
> Texniki detallar: [BRIEF.md](BRIEF.md) · İcra: [PLAN.md](PLAN.md)
> Tarix: 2026-06-13

---

## 1. Bir cümlə ilə
**İnvestorun öz texnikasına və qazancına telefondan, şəffaf və real-time pəncərəsi.**

İnvestor texnika alıb şirkətə (CES / Invorent) verir, şirkət onu icarəyə/layihələrə qoşur,
investor isə bu app vasitəsilə texnikasının harada işlədiyini, nə qədər qazandırdığını,
hansı ödənişlərin gəldiyini və sənədlərini **istənilən vaxt, çağırış etmədən** görür.

## 2. Problem (niyə var)
Tikinti texnikasına investisiya qoyan tərəfdaşlar hazırda:
- Texnikalarının **statusunu bilmir** (icarədədir? boşdur? servisdə?).
- Qazancı **telefon/excel/mesajla** öyrənir — gecikmə, qeyri-şəffaflıq, etibar problemi.
- Qaimə və ödəniş məlumatını **operatordan soruşmalı** olur.
- Sənədlərə (müqavilə, akt) **mərkəzi çıxışı yoxdur**.

Nəticə: investor öz aktivinə "kor"dur, şirkətə isə əl ilə hesabat yükü düşür.

## 3. Həll (nə işə yarayır)
İnvestora **self-service** mobil portal — ERP-dəki real datanın investora aid kəsiyi:
- **Dashboard** — neçə texnika, hansı statusda, ümumi kəsilmiş/ödənilmiş/qalıq məbləğ.
- **Texnika** — hər texnikanın detalı: model, saat, dəyər, servis tarixi, layihə tarixçəsi, qazanc.
- **Maliyyə** — qaimələr (invoice) və ödənişlər (payable): nə vaxt, nə qədər, qalıq.
- **Sənədlər** — müqavilə/akt və s. mərkəzləşdirilmiş.
- **Profil** — hesab, əlaqə, şifrə dəyişmə.

## 4. Kimin üçün (hədəf istifadəçi)
**Əsas persona — İnvestor / Tərəfdaş** (məs. prototipdəki *Rəşad Məmmədov, Məmmədov İnvestisiya MMC*):
- Texnikaya kapital qoyan, amma əməliyyatı şirkətə həvalə edən sahibkar.
- Texniki deyil — sadə, şəffaf, mobil təcrübə istəyir.
- Əsas sualı: **"Texnikam mənə nə qədər qazandırır və pulum harada?"**

İkincili: şirkət (CES) — investorla münasibətdə şəffaflıq və azalmış manual hesabat yükü.

## 5. Dəyər təklifi
| Investor üçün | Şirkət (CES) üçün |
|---|---|
| 24/7 şəffaflıq, etibar | Azalmış manual hesabat/zənglər |
| Real-time qazanc görünüşü | Peşəkar, premium investor münasibəti |
| Mərkəzi sənəd və maliyyə | Rəqəmsal, audit-edilə bilən iz |
| "Cibimdə öz aktivim" hissi | İnvestor cəlbi üçün rəqabət üstünlüyü |

## 6. Ekosistemdəki yeri
CES ERP üç hissədən ibarətdir — investor app **istehlakçı (read-mostly) qatıdır**:

```
        ┌─────────────────────────────────────────────┐
        │   Backend (Spring Boot · cesbackvibecode)   │
        │   PostgreSQL · JWT · /api/*                  │
        └───────────────┬───────────────┬─────────────┘
                        │               │
         /api/* (admin) │               │ /api/portal (investor JWT)
                        │               │
        ┌───────────────▼──────┐   ┌────▼──────────────────┐
        │  ERP Web Panel       │   │  İnvestor Mobil App   │
        │  (cesfrontvibecode)  │   │  (cesinvestorapp)     │
        │  React+Vite · admin  │   │  React Native · Expo  │
        │  10 modul idarəetmə  │   │  read-mostly portal   │
        └──────────────────────┘   └───────────────────────┘
```
- **ERP Web** — şirkət əməkdaşları (admin, koordinator, mühasib...) bütün əməliyyatı idarə edir.
- **İnvestor App** — investor yalnız **öz** datasını görür (yazma minimaldır: şifrə dəyişmə, sənəd yükləmə).
- Eyni backend, fərqli brend rəngi (investor app yaşıl #15A34A), fərqli auth (investor JWT) və fərqli platforma (mobil).

## 7. Prinsiplər
1. **Şəffaflıq əvvəl** — investor gördüyünə inanmalıdır; data ERP ilə eyni mənbədən.
2. **Read-mostly** — app əsasən göstərir, idarə etmir; əməliyyat ERP-də qalır.
3. **Backend toxunulmur** — mövcud `/api/portal` istehlak olunur (MVP).
4. **Mobil-first, sadə** — qeyri-texniki istifadəçi üçün təmiz, premium UX.
5. **ERP davamlılığı** — eyni brend, eyni stack ailəsi (React/Zustand/Tailwind→NativeWind).

## 8. Vizyon (hara gedir)
- **İndi (MVP):** mövcud API ilə real, şəffaf izləmə portalı (dashboard, texnika, maliyyə, sənəd, profil).
- **Sonra:** push bildirişlər (texnika icarəyə verildi · ödəniş gəldi · servis yaxınlaşır),
  texnika başına dəqiq qazanc/utilization analitikası, icarə **təklifləri (offers)** axını,
  sənəd yükləmə/imzalama.
- **Uzaq:** investor üçün "öz parkını idarə et" — yeni investisiya təklifləri, ROI proqnozları,
  bütün portfelin maliyyə sağlamlığı bir baxışda.

> **Qısa:** Invorent İnvestor App investisiyanı "qaranlıq qutu"dan **cibdəki şəffaf idarə panelinə** çevirir.
