# Q.E.D., iletişim ve animasyon düzenlemesi

27 Ekim 2026. Önceki kurumsal anlatım raporu `docs/design-history/QA_RAPORU-corporate-v2.md` içinde korunur.

## Tamamlanan değişiklikler

- Ana sayfa ve Applications üzerindeki Q.E.D. 28 piksel oldu; Latince açılım yanına küçük bir imza düzeninde yerleşti.
- Görünür iletişim bağlantısı ve form alıcısı kullanıcının belirttiği **furkan@matchanddesign.com** olarak değişti.
- Ana sayfanın Pause/Replay düğmeleri ve kontrol satırı kaldırıldı. Aynı geometri yaklaşık 4.8 saniyede oynayıp durur; sayfa açıldığında ve açılış tamamen ekran dışına çıkıp geri geldiğinde yeni döngü başlar. Ekranda kaldığı sürece tekrarlanmaz.
- Approach'taki eski sıra tablosu yerine dört küçük figürlü blocking pair örneği eklendi. Figürün en az %75'i görünürken kısa üç aşama başlar; kullanıcı aşama seçerse bu seçim korunur.

## Matematiksel ve kaynak kontrolü

Örnek tercihleri: A: Y > X, B: X > Y, X: A > B, Y: A > B. İlk eşleşme A–X/B–Y; yalnız A–Y karşılıklı daha çok tercih edilir. Son eşleşme A–Y/B–X bütün kişileri bir kez eşler ve bu örnekte blocking pair içermez. Kontrol ayrıca tek taraflı bir tercihin blocking pair oluşturmadığını doğrular. Bu, genel bir eşleştirme algoritması veya gerçek kurum verisi olarak sunulmaz.

`npm run verify` son kaynak değişikliğinden sonra geçti:

- 33 kaynak dosyası; 0 hata, 0 uyarı, 0 ipucu.
- Açılış ağı için 330 durum; görünür giriş süresinin beş saniyeden kısa olması kontrolü.
- Blocking pair örneğinin iki tam eşleşmesi, ilk blocking pair'i ve son kararlılığı doğrulandı.
- 7 HTML sayfası; 147 yerel referans; 0 sorun.
- Benzersiz istemci JavaScript toplamı 8968 bayt. Yeni bağımlılık eklenmedi.

## Tarayıcıda doğrulananlar

Home, Approach, Applications ve Contact sayfaları 320/390/640/768/1024/1440 pikselde kontrol edildi. 24 kombinasyonda gerçek viewport doğru, tek h1 var ve yatay taşma yok. Q.E.D. her iki alanda 28 piksel. Kayıt: `refinement-responsive.json`.

İletişim bağlantısının metni, mailto alıcısı ve formun `data-recipient` değeri yeni adresle eşleşir. E-posta uygulaması tetiklenmedi; mesaj gönderilmedi.

Açılışta görünür kontrol sayısı sıfır. İlk döngü tamamlandı; Eduscope alanına inip başa dönüldüğünde döngü numarası 2 oldu. Yenileme sonrası döngü 1 ve durum `playing` olarak gözlendi. Kayıt: `refinement-home-motion.json`.

Blocking pair örneğinin otomatik `current` → `resolved` geçişi gözlendi. Manuel `blocking` seçimi korundu. Derlenmiş çıktı üzerinde blocking/resolved seçimleri ve klavye Enter kullanımı, iletişim adresi ve düğmesiz home başlangıcı ayrıca kontrol edildi. Kayıt: `refinement-production.json`.

Yeni figür, metin ve küçük imza masaüstünde; blocking pair figürü ayrıca 390 pikselde görsel olarak incelendi. Güncel görüntüler `refinement-blocking-desktop.png`, `refinement-blocking-mobile.png`, `refinement-qed-desktop.png`.

Reduced-motion açıkken durağan sonuç gösteren kod, SVG/JavaScript yedekleri ve CSS hareket azaltma kuralları korunur. Bu ortamlar ayrıca emüle edilmedi. Önceki kontrast/form raporları bu turda yeniden üretilmedi; tam WCAG, Lighthouse veya gerçek cihaz pil ölçümü iddiası yapılmaz.

Business referans dosyaları değiştirilmedi. Yayın, domain ve analitik işlemi yapılmadı. Geçici 4323 üretim kontrol önizlemesi kapatıldı; kullanıcının ana 4322 yerel önizlemesi korunur. Port 4321'e müdahale edilmedi.
