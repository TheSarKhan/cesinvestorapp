# Məxfilik Siyasəti — Invorent İnvestor

> Bu sənəd Google Play və App Store tələbi üçün public URL-də yayımlanmalıdır.
> Doldurulacaq: **[ŞİRKƏTİN HÜQUQİ ADI]**, **[ƏLAQƏ E-POÇTU]**, **[YAYIMLANMA TARİXİ]**.

**Son yenilənmə:** [YAYIMLANMA TARİXİ]

Invorent İnvestor tətbiqi (“Tətbiq”) [ŞİRKƏTİN HÜQUQİ ADI] (“biz”) tərəfindən təqdim
olunur. Bu siyasət Tətbiqin hansı məlumatları topladığını, necə istifadə etdiyini və
qoruduğunu izah edir.

## 1. Topladığımız məlumatlar
- **Hesab məlumatı:** giriş zamanı daxil etdiyiniz e-poçt ünvanı və şifrə. Şifrə yalnız
  autentifikasiya üçündür və serverdə şifrələnmiş (hash) saxlanılır — Tətbiq şifrəni açıq
  şəkildə saxlamır.
- **Hesabınıza bağlı iş məlumatı:** yalnız SİZƏ aid texnika, qazanc, qaimə, ödəniş və sənəd
  məlumatları. Bu məlumat CES/Invorent serverindən oxunur və yalnız sizə göstərilir.
- **Texniki:** sessiyanı saxlamaq üçün autentifikasiya tokenləri (JWT).

Tətbiq **yer məlumatı, kamera, kontaktlar və ya reklam identifikatorları toplamır.**
Analitika, reklam və ya üçüncü tərəf izləmə (tracking) **istifadə olunmur.**

## 2. Məlumatın saxlanması
- Autentifikasiya tokenləri cihazınızda **şifrələnmiş təhlükəsiz anbarda**
  (iOS Keychain / Android Keystore — `expo-secure-store`) saxlanılır.
- İş məlumatınız cihazda daimi saxlanılmır; hər dəfə serverdən real-time yüklənir.

## 3. Məlumatın ötürülməsi
Məlumat cihaz ilə CES/Invorent serveri arasında şəbəkə üzərindən ötürülür. İstehsal
mühitində bağlantı **HTTPS (şifrəli)** ilə qorunur.

## 4. Məlumatın paylaşılması
Məlumatınızı üçüncü tərəflərə **satmırıq və ya paylaşmırıq.** Məlumat yalnız sizin və
müqavilə üzrə əlaqəli olduğunuz şirkət (CES/Invorent) arasında istifadə olunur.

## 5. Məlumatın silinməsi
- Tətbiqdən **çıxış** etdikdə cihazdakı tokenlər silinir.
- Hesabınızın və ona bağlı məlumatın silinməsini tələb etmək üçün [ƏLAQƏ E-POÇTU]
  ünvanına yazın.

## 6. Uşaqlar
Tətbiq 18 yaşdan aşağı şəxslər üçün nəzərdə tutulmayıb.

## 7. Dəyişikliklər
Bu siyasətdə dəyişiklik edə bilərik; yenilənmiş versiya bu səhifədə yayımlanacaq.

## 8. Əlaqə
Suallar üçün: **[ƏLAQƏ E-POÇTU]** · [ŞİRKƏTİN HÜQUQİ ADI]
