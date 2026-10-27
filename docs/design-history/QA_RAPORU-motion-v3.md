# Animasyonlu tasarım kontrol raporu

27 Ekim 2026. Güncel sürüm, kullanıcının `eduscope intro.mov` ve marka renkleri yönlendirmesiyle yenilendi. Önceki rapor `docs/design-history/QA_RAPORU-v2.md` içinde korunur.

## Sonuç

Beş ana sayfa ve özel 404 sayfası derlendi. Son `npm run verify` 0 kaynak hatası, 0 uyarı ve 0 ipucuyla geçti; bu işlem kaynak kontrolü, animasyon eşleşmeleri, statik derleme ve yerel referans denetimini içerir. Site yayınlanmadı.

- Astro: 7.4.2; Node.js: 24.21.0.
- Yazı tipi: yerelden yüklenen Inter, 5.3.0.
- Marka renkleri: logolardan okunan Match & Design moru `#292459` ve Scheduler yeşili `#00F59B`.
- Ana yerel inceleme adresi: `http://127.0.0.1:4322/`.
- Statik sürüm ayrıca 4323 üzerinde incelendi; bu ek QA sunucusu kontrol sonunda kapatıldı. Port 4321'e müdahale edilmedi.

## Görsel ve hareket

Referans video doğrudan okundu ve 12 kareyle incelendi. Video siteye kopyalanmadı. Özgün Canvas 2D sahnesi düğümleri perspektifli bir çizge alanına yerleştirir ve seçilen eşleşmeleri gösterir. Giriş yaklaşık 8.2 saniyede durulur; sürekli animasyon döngüsü yoktur. Durdurma, devam ettirme ve yeniden oynatma kontrolü vardır.

Tarayıcıda oynatma/durdurma/devam ettirme durumları ve üretim çıktısındaki aynı davranış doğrulandı. İki durdurulmuş görüntünün karşılaştırılan orta alanı piksel olarak aynı kaldı; devam ettirildikten sonra aynı alanın pikselleri değişti. Kanıt: `motion-proof.json`, `motion-production.json`.

Sahne en fazla 30 kare/saniye ve 1.5 piksel yoğunluğuna sınırlandırılmıştır. Sekme gizli veya sahne ekran dışında olduğunda çizim durdurulur. Hareketi azaltma tercihi açıkken durağan sonuçla başlatan kod ve Canvas/JavaScript yoksa görünen SVG alternatif vardır. Bu iki tarayıcı ortamı ayrıca emüle edilmedi.

Son mobil kamera düzeni 390 pikselde ayrıca görsel olarak kontrol edildi. Güncel ekran görüntüleri: `home-motion-desktop.png`, `home-motion-mobile.png`, `home-motion-full.png`.

## Matematiksel doğruluk

Masaüstü 14×8, mobil 10×6 çizge kullanır. Her iki boyutta 50 ms aralıklarla toplam 330 durum denetlendi. Görünür seçilmiş kenarlar uygun kenar kümesindedir; aynı düğüm iki seçilmiş kenarda kullanılmaz. Kısmi eşleşmeden kısmi eşleşmeye geçilir; durağan sonuç bütün düğümleri örter. Masaüstü sonuçta 112 düğüm, 230 uygun kenar ve 56 eşleşme kenarı vardır.

Bu görsel temsili bir tahsistir; gerçek müşteri, ürün performansı, adalet veya optimalite sonucu değildir.

## Responsive ve erişim

Beş sayfa 320, 390, 640, 768, 1024 ve 1440 piksel genişlikte incelendi. 30 kombinasyonda gerçek viewport istenen genişlikle eşleşti ve yatay taşma bulunmadı. Son kontrol yazısı değişikliğinden sonra 320/390 için hareket kontrolü ayrıca ölçüldü; metinle düğme örtüşmüyor ve kontrol yüksekliği 44 piksel.

Mobil menü Enter ile açılıp Escape ile kapanıyor. Kaynak kontrolü semantik başlıklar, tek h1, benzersiz title/description, etiketler, alt metinler ve sabit görsel boyutlarını denetledi. Önceki sürümün değişmeyen tahsis örneği ve form doğrulama kayıtları ayrıca `interaction-checks.json` ve `form-validation.json` içindedir; bunlar bu sürümde yeniden yapılmış testler olarak sunulmaz.

Yeni tasarımın 232 metin örneği AA metin kontrast eşikleriyle karşılaştırıldı; başarısız örnek 0; en düşük oran 5.37:1. Gradient alanlarda en açık durak alınarak, yarı saydam katmanlar birleştirilerek hesaplandı. Animasyon dekoratif bir temsil olup metinsel alternatifle açıklanır. Bu kontroller kapsamlı ekran okuyucu incelemesi veya WCAG uygunluk sertifikası değildir.

## Derleme ve bağlantı

- HTML sayfası: 6.
- Yerel dosya/bağlantı/anchor denetimi: 109.
- Sorun: 0.
- Statik HTTP kontrolü: beş sayfa 200, bulunamayan adres 404, robots.txt 200.
- Üretim tarayıcı kontrolü: font loaded, sahne enhanced, pause/resume çalışıyor, noindex/nofollow korunuyor.

## Performans sınırı

Benzersiz istemci kodu toplam 7446 bayttır; JSON-LD dahil değildir. Üçüncü taraf animasyon/3D kütüphanesi, React, Tailwind, harici font veya analitik hizmeti yoktur. Paketlerde kullanılmayan eski font kaldırılmıştır.

Derlenmiş ortak varlıklar:

- `AllocationFilm.astro_astro_type_script_index_0_lang.NJuGBq3O.js`: 4152 bayt
- `Base.IkjrZS2J.css`: 24661 bayt
- `inter-latin-ext-wght-normal.DO1Apj_S.woff2`: 85068 bayt
- `inter-latin-wght-normal.Dx4kXJAl.woff2`: 48256 bayt

Bunlar dosya boyutlarıdır. Lighthouse, saha Core Web Vitals ve gerçek cihaz pil tüketimi ölçülmedi; bunlara ilişkin sonuç iddiası yapılmaz.

## İçerik ve yayın sınırı

Business referans dosyaları, kaynak logolar ve kullanıcının videosu değiştirilmedi. Müşteri sayısı, gelir, ekip, ödül, ROI veya tamamlanmamış ürün iddiası eklenmedi. Eduscope bağlantısı `https://scheduler.com.tr` olarak korunur. Domain, iletişim adresinin güncelliği ve nihai dil gibi açık noktalar `docs/KARAR_NOTLARI.md` içindedir. Sitemap ve indeksleme yayın aşamasına bırakılmıştır.
