# Bilim sayfası ve dallanan ağ: kontrol raporu

27 Ekim 2026. Bu rapor kullanıcının başlangıcı beğenmesinden sonraki Market Design / Q.E.D. isteğine aittir. Önceki hareket sürümünün raporu `docs/design-history/QA_RAPORU-motion-v3.md` içinde korunur.

## Tamamlanan değişiklik

- `/market-design/`: **The Science of Allocation**. Matching theory, market design ve optimization ayrımı; 2012 Roth–Shapley Nobel'i; okul seçimi, doktor yerleştirme, organ takası, açık artırmalar; Malatya, Sönmez ve Ünver; dokuz birincil kaynak.
- Temsili üç çiftli takas: ayrı çiftler ile havuz içindeki çapraz eşleşmeleri gösteren iki düğme. Hasta verisi veya klinik hesap kullanılmaz.
- Menü ve ana sayfa araştırma bağlantısı yeni sayfaya gider.
- Kullanıcının beğendiği açılış düzeni korunur. Düğümler hafifçe düzensizleştirildi; dallanan uygun bağlantılar ve eğrisel kenarlar eklendi.
- Eduscope kimliği ve Applications alanı: **Q.E.D. / Quod. Erat. Demonstrandum.**

## Son derleme ve kaynak denetimi

`npm run verify` son kaynak değişikliğinden sonra başarıyla tamamlandı:

- 29 kaynak dosyası; 0 hata, 0 uyarı, 0 ipucu.
- 7 HTML sayfası; 147 yerel dosya/bağlantı/anchor referansı; 0 sorun.
- Benzersiz istemci JavaScript'i 8581 bayt. Üçüncü taraf animasyon kütüphanesi eklenmedi.
- İki ağ boyutunda 50 ms aralıklarla 330 durum kontrol edildi. Uygun bağlantıların iki düğüm kümesi arasında olması, yinelenen kenar/öz döngü bulunmaması, seçilen kenarların uygunluğu, düğümün iki seçilmiş kenarda kullanılmaması ve eğri/projeksiyonların sonlu olması doğrulandı.
- Durağan masaüstü ağı: 112 düğüm, 309 uygun kenar, 56 seçilmiş kenar. Mobil: 60 düğüm, 155 uygun kenar, 30 seçilmiş kenar.

## Tarayıcıda yapılan kontroller

Altı ana sayfa 320, 390, 640, 768, 1024 ve 1440 pikselde incelendi: 36 kombinasyonun hepsinde gerçek viewport istenen genişlikle eşleşti, yatay taşma yoktu, tek h1 vardı. Kayıt: `science-responsive.json`.

320 pikselde menü Enter ile açıldı; Market Design bağlantısı görünür; Escape ile kapandı. Kayıt: `science-menu.json`. Yeni takas örneği fareyle ve klavyeyle değiştirildi; durumu belirten metin ve seçili düğme değişti, havuz bağlantıları ayrı çiftler görünümünde gizlendi. Kayıt: `science-interactions.json`. Son mobil etiket boyutu ve işaret hizası 320/390 pikselde görsel olarak kontrol edildi.

Derlenmiş çıktı ayrıca geçici 4323 önizlemesinde incelendi:

- Bilim sayfası title, noindex/nofollow, dokuz kaynak ve hazır etkileşim kontrolleri doğrulandı.
- İki takas modu üretim çıktısında çalıştı.
- Açılış animasyonu pause → paused, resume → playing durumlarını verdi.
- Altı sayfa 200, bulunamayan adres 404, robots.txt 200 döndürdü.
- Kayıtlar: `science-production.json`, `science-http.json`.

Bu çalışmada önceki form gönderimi/doğrulama ve kontrast raporları yeniden üretilmedi. Eski JSON dosyaları geçmiş kontrol kayıtlarıdır; yeni sayfa için yapılmış kapsamlı WCAG, ekran okuyucu veya Lighthouse testi olarak yorumlanmamalıdır. Reduced-motion ve SVG yedek kodları korunur; bu turda bu ortamlar ayrıca emüle edilmedi.

## Önizlemeler

- `science-desktop.png`: yeni sayfanın açılışı.
- `science-desktop-full.png`: yeni sayfanın tamamı.
- `science-mobile.png`: mobil açılış.
- `science-exchange-320.png`: dar ekrandaki son takas şeması.
- `science-malatya-desktop.png`: derlenmiş sürümde Malatya bölümü.
- `science-home-desktop.png`: güncel dallanan açılış ağı.
- `science-eduscope.png`: Q.E.D. sloganlı ürün kimliği.

## Kaynak ve yayın sınırı

Avela, Auctionomics ve Power Auctions tarayıcıda görsel olarak incelendi. Dış metin, fotoğraf, logo ve performans metrikleri kopyalanmadı. Araştırma iddiaları ve okunan kaynakların sınırları `docs/ARASTIRMA_NOTLARI.md` içinde. İnönü Üniversitesi'nin metni ve 15 Haziran 2026 tarihi doğrudan tarayıcıda da okundu.

Business kaynakları değiştirilmedi. Yeni müşteri, ortaklık, danışmanlık veya şirket ödülü iddiası eklenmedi. Site yayınlanmadı; domain/analitik kurulmadı. Geçici 4323 kontrol sunucusu kapatıldı; kullanıcının ana 4322 yerel önizlemesi korunur. Port 4321'e müdahale edilmedi.
