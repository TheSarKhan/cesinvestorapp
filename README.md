# Invorent · İnvestor Portalı

iPhone formatında (390 × 844) Azərbaycan dilli investor portalı prototipi. React 18 + in-browser **Babel standalone** ilə qurulub — **build mərhələsi yoxdur**, sadəcə statik fayllardır.

## Struktur

| Yol | Təyinat |
|-----|---------|
| `index.html` | Əsas tətbiq (investor portalı) |
| `ui-kit.html` | Dizayn sistemi / UI kit səhifəsi |
| `tweaks-panel.jsx` | Runtime tweaks hook + (gizli) dev panel |
| `app/` | Tətbiq ekranları və komponentləri (`.jsx`) |
| `kit/` | UI kit səhifəsinin komponentləri |
| `shots/` | Ekran görüntüləri |
| `uploads/` | Brif sənədi və arxiv |

## Lokal işə salmaq

Faylları istənilən statik server ilə açın (Babel `fetch` istifadə etdiyi üçün `file://` işləməz):

```bash
npx serve .
# və ya
python -m http.server 8000
```

Sonra brauzerdə `http://localhost:8000` ünvanını açın.

## Netlify-də deploy

Repo Netlify-yə qoşulduqda `netlify.toml` avtomatik oxunur:

- **Publish directory:** `.` (kök qovluq)
- **Build command:** yoxdur

Manual deploy üçün: Netlify → *Add new site* → *Import from Git* → bu repo → deyişiklik etmədən *Deploy*.

## Tweaks paneli

İstehsalda gizlidir. Brauzer konsolunda aktivləşdirin:

```js
window.__TWEAKS__ = true; location.reload();
```
