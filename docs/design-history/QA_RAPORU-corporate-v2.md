# Kurumsal anlatım düzeltmesi — kontrol raporu

27 Ekim 2026. Kullanıcının son düzeltmesine göre yalnız Market Design sayfasının içeriği ve ona ait stiller değişti. Önceki kapsamlı kontrol raporu `docs/design-history/QA_RAPORU-science-v1.md` içinde korunur.

## Uygulanan düzeltmeler

- Diğer şirketlerin isimleri, bağlantıları, kaynakları ve tanıtım bölümü yayın içeriğinden kaldırıldı.
- Malatya sayfa içi navigasyondan çıkarıldı. Şehir yalnız organ takası örneğinin gövde metninde geçer; bölüm adı **Research in practice / Organ exchange**.
- Araştırmacı profil bölümü kaldırıldı. İsimler ilgili katkıların içinde kısaca anılır; Sönmez–Ünver'in matching tasarımı ve klinik ekip iş birliği belirtilir.
- Nobel kazananları ile daha geniş araştırma topluluğunun katkıları ayrı cümlelerde ifade edilir. İş birliği bilgisi Roth'un Nobel biyografisinden doğrulandı.
- Kavramlar ve uygulamalar kısaltıldı. Kaynaklar varsayılan olarak kapalı **Sources & context** alanında; kapanış yeniden şirketin yaklaşımına ve Eduscope'a bağlanır.

## Doğrulanan kapsam

Son kaynak değişikliğinden sonra `npm run verify` geçti: 29 kaynak dosyası, 0 hata/uyarı/ipucu; 330 animasyon durumu; 7 HTML sayfası, 146 yerel referans ve 0 sorun. İstemci JavaScript toplamı 8581 bayt. Animasyon kodu ve Eduscope sloganı bu turda değiştirilmedi.

Kaynaklar ve derlenmiş çıktı rakip isimleri/bağlantıları için tarandı: eşleşme yok. Tarayıcıda Market Design sayfası 320, 390, 640, 768, 1024 ve 1440 pikselde kontrol edildi. Altı genişlikte de tek h1 var, yatay taşma yok, rakip adı/bağlantısı yok, profil bölümü yok. Sayfa içi bağlantılar **The idea / In practice / Our approach**. Kayıt: `corporate-responsive.json`.

320 pikselde kaynak alanı Enter ile açılıp kapandı; açıldığında altı kaynak erişilebilir ve yatay taşma yok. Kayıt: `corporate-interactions.json`. Masaüstünde yeni Nobel bağlamı ve organ takası anlatısı görsel olarak kontrol edildi.

Önceki form, kontrast ve geçici üretim sunucusu kontrolleri bu turda yeniden yapılmadı. Bu rapor tam WCAG veya Lighthouse incelemesi değildir. Mevcut geliştirme önizlemesi 4322 üzerinde korunur; yayın ve domain işlemi yapılmadı.

Güncel görüntüler: `corporate-full.png`, `corporate-nobel.png`, `corporate-organ-exchange.png`.
