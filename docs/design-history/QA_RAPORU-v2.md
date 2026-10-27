# Yerel site kontrol raporu

Tarih: 27 Ekim 2026. Sürüm: kullanıcının ilk önizleme geri bildiriminden sonra yenilenen graph theory tasarımı.

## Sonuç

Beş ana sayfa, özel 404 sayfası ve robots.txt yerel olarak üretildi. Kaynak kontrolü 0 hata, 0 uyarı ve 0 ipucuyla tamamlandı. Son stil düzeltmesinden sonra statik derleme ve bağlantı denetimi yeniden geçti. Yayın yapılmadı.

## Ortam

- Proje: `/Users/furkan/Desktop/Business/match-and-design-website`
- Node.js: 24.21.0
- Astro: 7.4.2
- TypeScript: 6.0.3
- Astro check: 0.9.12
- Ana yerel önizleme: `http://127.0.0.1:4322/`
- Statik üretim çıktısı ayrıca `http://127.0.0.1:4323/` üzerinde kontrol edildi. Bu ek kontrol sunucusu inceleme sonrasında kapatılır.
- Port 4321 başka bir yerel sürece aittir; bu sürece müdahale edilmedi.

## Kaynak ve derleme

`npm run verify` son kaynak değişikliğinde geçti. Bu işlem `astro check`, `astro build` ve `audit:site` içerir. Yalnız CSS ile ilgili son skip-link düzeltmesinden sonra `build` ve `audit:site` tekrar geçti.

- Üretilen HTML sayfası: 6.
- Kontrol edilen yerel bağlantı, dosya ve anchor: 108.
- Bulunan sorun: 0.
- Başlık sırası, tek h1, benzersiz title/description, eksik alt metin, görsel boyutları, alan etiketleri ve bozuk yerel referanslar denetlendi.
- Sayfalarda harici çalışma zamanı medya/font adresi bulunmadı.
- HTTP kontrolü: beş ana sayfa 200, var olmayan sayfa 404, robots.txt 200. `qa/http-checks.json`.

## Matematiksel görsel

Hero'daki veri `src/data/allocation-graph.json` içinde. 18 düğüm, 35 uygun kenar ve 9 seçilmiş kenar var. Seçilen bütün kenarlar uygun kümede bulunuyor; her kenar katılımcı-kaynak kümelerini bağlıyor; 18 düğümün her biri tam bir kez kullanılıyor. Temsili bir matching örneğidir. Adalet veya optimalite sonucu olarak sunulmadı.

## Responsive ve görsel inceleme

- `/`, `/approach/`, `/work/`, `/about/`, `/contact/` sayfaları 320, 390, 640, 768, 1024 ve 1440 pikselde incelendi.
- Gerçek tarayıcı viewport genişliği her ölçümde istenen değerle karşılaştırıldı.
- 30 sayfa/genişlik kombinasyonunda yatay taşma veya incelenen metin/form/görsel öğelerinde sınır dışına çıkma bulunmadı.
- Ana sayfanın tamamı ve diğer dört sayfanın masaüstü görünümü görsel olarak incelendi. Mobil ana sayfa ve Approach örneği ayrıca görsel olarak incelendi.
- Kaydedilen görüntüler: `home-desktop.png`, `home-mobile.png`, `home-full.png`.

## Klavye ve etkileşim

- Mobil menü Enter ile açılıyor; Escape ile kapanıyor ve odak menü düğmesine dönüyor.
- Menüden Approach bağlantısına geçiş ve yeni sayfada kapalı menü durumu doğrulandı.
- İlk Tab odağı Skip to content bağlantısı; Enter sonrasında odak main öğesine geçiyor.
- A → B → C sırası: A-X, B-Z, C-Y.
- C → B → A sırası: C-Y, B-X, A-Z.
- İkinci sonuç hem geliştirme sunucusunda hem üretilmiş statik sürümde doğrulandı. Sonuç alanında `aria-live=polite` var.
- Form boş ve yalnız boşluk içeren metni reddediyor, odağı gerekli alana götürüyor. Bu kontrollerde e-posta uygulaması açılmadı ve mesaj gönderilmedi.
- Başlatma dosyası `Siteyi Aç.command` için kabuk sözdizimi ve çalıştırılabilir dosya izni denetlendi.

## Kontrast ve erişilebilirlik sınırı

Tarayıcıdan alınan 235 metin/arka plan örneği WCAG AA metin eşikleriyle hesaplandı; başarısız örnek: 0. Ölçülen en düşük metin kontrastı 5.14:1. Anlamlı uygun-kenar çizgisi yaklaşık 3.58:1, form alanı sınırı 3.52:1.

Semantik başlıklar, alternatif metinler, etiketler, görünür klavye odağı ve `prefers-reduced-motion` stil kuralı var. Reduced-motion sistem tercihi tarayıcıda ayrıca emüle edilmedi. Ekran okuyucu ile kapsamlı görev testi yapılmadı. Bu kontrol kapsamı tam bir WCAG uygunluk sertifikası değildir.

## Performans

Harici istemci framework'ü, animasyon kütüphanesi, analitik veya font hizmeti yok. Fontlar yerelden yükleniyor. Üretim çıktısında benzersiz istemci kodu toplam 3294 bayt; JSON-LD buna dahil değil. Sayfa bazında ham boyutlar:

- `404.html`: 1026 bayt istemci JavaScript
- `about/index.html`: 1026 bayt istemci JavaScript
- `approach/index.html`: 2357 bayt istemci JavaScript
- `contact/index.html`: 1963 bayt istemci JavaScript
- `index.html`: 1026 bayt istemci JavaScript
- `work/index.html`: 1026 bayt istemci JavaScript

Ortak derlenmiş varlıklar:

- `Base.WtKDVLxq.css`: 23645 bayt
- `ibm-plex-sans-latin-ext-wght-normal.CIII54If.woff2`: 30964 bayt
- `ibm-plex-sans-latin-wght-normal.IvpUvPa2.woff2`: 45712 bayt

Bunlar dosya boyutlarıdır. Lighthouse, saha Core Web Vitals, farklı bağlantı hızları ve gerçek cihaz performansı ölçülmedi; bunlara ilişkin puan/başarı iddiası yapılmadı.

## SEO ve yayın sınırı

Sayfa bazında title, meta description, dil, sosyal metadata, Organization verisi ve robots ayarı mevcut. Yerel sürüm noindex/nofollow ve Disallow: / ile kapalı. Domain doğrulanmadan canonical/og:url üretilmiyor. Nihai domain, sitemap ve indeksleme yayın aşamasında tamamlanmalı.

## Kaynak ve kullanıcı kararları

Business kaynakları değiştirilmedi. Sadece logolar proje içine kopyalandı. Müşteri/başarı metriği, gelir, ekip, ödül veya hazır olmayan ürün iddiası eklenmedi. Kamuya açık iletişim adresi, nihai dil, araştırma/ekip bilgileri ve domain için karar notları `docs/KARAR_NOTLARI.md` içinde.
