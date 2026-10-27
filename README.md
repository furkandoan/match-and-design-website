# Match & Design kurumsal web sitesi

Bu proje Match & Design Bilişim A.Ş.'nin kurumsal web sitesidir. Eduscope ürün sitesi ayrı tutulur ve `https://scheduler.com.tr` adresine yönlendirilir.

Proje konumu: `/Users/furkan/Desktop/Business/match-and-design-website`

## Siteyi açmak

Finder'da **Siteyi Aç.command** dosyasına çift tıklayın. Terminal açılır ve yerel sunucuyu başlatır. Tarayıcınızda `http://localhost:4322` adresini açın. İlk açılışta macOS çift tıklamayı engellerse aşağıdaki Terminal yolunu kullanın. Port başka bir uygulama tarafından kullanılıyorsa Terminal'de gösterilen Local adresini esas alın.

Terminal ile:

```bash
cd /Users/furkan/Desktop/Business/match-and-design-website
npm run dev
```

Astro'nun bu sürümü sunucuyu arka planda çalıştırır. Durdurmak için proje klasöründe `npx astro dev stop` komutunu kullanın. Sunucu yalnızca kendi bilgisayarınızda dinler. İnternet yayını yapılmaz.

Bağımlılıklar bu kurulumda yüklenmiştir. Başka bir bilgisayara taşınırsa Node.js 22.23.4 veya üstü bir desteklenen çift ana sürüm ve `npm ci` gerekir. Bu bilgisayardaki doğrulanmış sürüm QA raporundadır.

## Kontrol ve üretim çıktısı

```bash
npm run verify
npm run preview
```

`verify` kaynak kontrolünü, animasyondaki eşleşme doğruluğunu, statik derlemeyi ve yerel bağlantı/içerik denetimini çalıştırır. `preview`, `dist/` içindeki üretilmiş siteyi yerel olarak açar; yayınlama işlemi değildir.

## Sayfalar

- `/` — Home
- `/approach/` — Approach ve etkileşimli tahsis örneği
- `/work/` — Applications; gerçek ürün ailesi ve potansiyel problem sınıfları ayrı anlatılır
- `/market-design/` — The Science of Allocation; matching/market design, Nobel, kaynaklı uygulamalar ve temsili takas örneği
- `/about/` — Company
- `/contact/` — Contact ve e-posta taslağı hazırlama
- `/404.html` — Bulunamayan sayfa

## Hangi dosya ne işe yarıyor

| Konum | İşlev |
| --- | --- |
| `src/data/site.ts` | Şirket adı, iletişim adresi, menü ve **Eduscope URL** |
| `src/data/en.ts` | Ana İngilizce içerik; yeni dil için ayrı içerik dosyası eklenebilir |
| `src/styles/global.css` | Tasarım değişkenleri, tipografi, yerleşim ve responsive kurallar |
| `src/layouts/Base.astro` | Ortak HTML, metadata, font, header ve footer |
| `src/pages/` | Altı ana sayfa, 404 ve robots.txt |
| `src/data/science.ts` | Market Design sayfası metinleri ve altı birincil kaynak |
| `src/styles/science.css` | Yalnız bilim sayfasına ait yerleşim ve etkileşim stilleri |
| `src/components/` | Yeniden kullanılan öğeler; her birinin açıklaması aşağıda |
| `public/logos/` | Business kaynaklarından kopyalanan özgün logolar |
| `public/images/` | Paylaşım görseli; gerçek ürün ekranı değildir |
| `scripts/audit-site.mjs` | Üretilen sitenin bağlantı ve temel yapı denetimi |
| `docs/KARAR_NOTLARI.md` | Kullanıcının dönüşünde cevaplanacak kararlar |
| `docs/SOURCES.md` | Olguların kaynakları ve kullanılmayan iddialar |
| `qa/` | Gerçekte tamamlanan kontrollerin sonuçları |

`Header`, `Footer` ve `Base` ortak sayfa çerçevesini tek yerde tutar. `Arrow` ortak bağlantı işaretini; `MethodRows` aynı yöntem anlatısını; `ContactCta` ortak iletişim çağrısını; `EduscopeFeature` ana sayfadaki ürün ailesi bölümünü oluşturur. `AllocationFilm` açılıştaki perspektifli eşleşme sahnesidir. `BlockingPair`, Approach sayfasındaki dört figürlü karşılıklı tercih örneğini yönetir. Önceki `AllocationDemo` dosyası kullanılmayan kaynak olarak korunur. React, Tailwind, animasyon kütüphanesi, CMS ve veritabanı kullanılmaz.

## Açılış animasyonu

Düğümler bir çizge yüzeyine yerleşir, uygun ilişkiler görünür ve seçilen eşleşmeler yeşille belirir. Görünür kontrol düğmeleri kullanıcının isteğiyle kaldırıldı. Hareket yaklaşık 4.8 saniyede durur; sayfa açıldığında ve açılış alanı tamamen ekran dışına çıkıp en az %15 görünür olacak şekilde geri geldiğinde yeniden oynar. Ekranda kaldığı sürece döngüye girmez. Video siteye gömülmemiştir.

`src/lib/allocation-field.ts` geometriyi ve eşleşmeleri, `src/scripts/allocation-film.ts` hareketi ve kontrolleri yönetir. `scripts/check-motion-graph.mjs` masaüstü ve mobil için geçişleri denetler. Animasyon en fazla 30 kare/saniye ve 1.5 piksel yoğunluğunda çizilir; ekran dışında veya gizli sekmede işlem durur. Hareketi azaltma tercihi açıkken durağan sonuçla başlar. Canvas/JavaScript kullanılamazsa SVG sonucu gösterilir.

27 Ekim'deki takip isteğiyle seyrek dallar, hafif düzensiz düğüm konumları ve eğrisel kenarlar eklendi. Canvas ile SVG aynı eğri kontrol noktasını kullanır. `ExchangeDiagram` bilim sayfasındaki üç temsili çiftin ayrı ele alınması ile havuzda çapraz eşleştirilmesini gösterir; hasta verisi işlemez. Araştırma/benchmark notları `docs/ARASTIRMA_NOTLARI.md` içindedir. Eduscope'un `Q.E.D.` ve `Quod. Erat. Demonstrandum.` sloganı `src/data/en.ts` içinde tutulur.

Marka renkleri `--purple: #292459` ve `--green: #00f59b`; yazı tipi yerelden yüklenen Inter'dir. Eski statik ağ `docs/design-history/` içindedir ve sitede kullanılmaz.

## İletişim davranışı

İletişim adresi kullanıcının 27 Ekim 2026'daki açık yönlendirmesiyle **furkan@matchanddesign.com** olarak güncellendi. Bağlantı ve form alıcısı `src/data/site.ts` içindeki aynı değeri kullanır. Form **gönderim yapmaz**; kullanıcının e-posta uygulamasında inceleyip göndereceği taslağı hazırlar. Bir e-posta uygulaması tanımlı değilse doğrudan adres kullanılabilir. Bilgiler localStorage'a, bir sunucuya veya analitik hizmetine kaydedilmez.

## İkinci dil

İlk sürüm İngilizcedir. Türkçe için `src/data/tr.ts` eklenebilir ve `/tr/` sayfaları aynı bileşenleri kullanabilir. `Base.astro` içindeki dil ve sosyal metadata da sayfa dilini alacak şekilde genişletilmelidir. Çeviri hazır olmadan işlevsiz dil seçici gösterilmez. Bu sürüm iki dilli olarak sunulmamaktadır.

## Yayın öncesi

Şimdilik `.env` gerekmez. `.env.example` dosyasındaki alanlar, nihai domain ve yayın kararı kesinleştiğinde kullanılır. Domain tanımlı olmadığında canonical/og:url üretilmez; bütün sayfalarda noindex bulunur ve robots.txt taramayı kapatır. Nihai domain, sitemap ve indeksleme son yayın aşamasında birlikte tamamlanmalıdır. Herhangi bir domain, hosting veya analitik hesabında işlem yapılmamıştır.

Kaynak Word/PDF/sunum dosyaları ve Business içindeki diğer klasörler değiştirilmemiştir.
