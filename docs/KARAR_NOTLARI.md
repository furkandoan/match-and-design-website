# Kullanıcı dönüşünde değerlendirilecek kararlar

Tarih: 27 Ekim 2026. Bu dosya bekleyen tercihleri toplar. Geliştirmeyi sürdürmek için kullanılan seçimler nihai marka veya yayın onayı sayılmamıştır.

## 1 Konumlandırma ve dil

**Uygulanan öneri:** “We design allocation systems.” İlk sürüm İngilizce. Önceki yanıttaki öneri esas alındı; kullanıcı ayrıca başlık/dil seçimi yapmadı. Sorulacak: Bu başlık ve İngilizce ana dil uygun mu? Türkçe sürüm ilk yayın kapsamına girecek mi?

## 2 Kurumsal görünüm

**Kullanıcının son yönlendirmesi:** Statik ağ da beğenilmedi. `eduscope intro.mov` hareket referansı olarak verildi; farklı bir graph theory versiyonu, Match & Design moru ve Scheduler yeşili istendi. Önceki lacivert/mint yön bu bilgiyle değiştirildi.

**Uygulanan yeni yön:** Merkezli Inter tipografisi, logodan okunan `#292459`, `scheduler-logo 3.svg` içindeki `#00F59B` ve perspektifli bir çizge yüzeyine yerleşen düğümler. Son kullanıcı isteğiyle görünür Pause/Replay kontrolleri kaldırıldı. Giriş 4.8 saniyede durur; sayfa açılışında ve hero tamamen ekran dışına çıktıktan sonra geri dönüldüğünde yeniden oynar. Hareketi azaltma tercihi açıkken durağan başlar. Masaüstünde 14×8, mobilde 10×6 temsili düğüm kullanılır. Geçişte geçerli kısmi eşleşmeler, sonuçta bütün düğümleri örten bir eşleşme vardır. Kullanıcının videosu siteye gömülmedi; hareket özgün kodla üretildi.

Kaynak logolar değiştirilmedi. Eski çalışma `docs/design-history/` altında tutuldu. Kullanıcı 27 Ekim 2026'daki sonraki mesajında başlangıç kısmını beğendiğini belirtti. Açılış kompozisyonu korunarak biraz daha dallı/eğrisel ağ isteği uygulandı; bu beğeni bütün site için nihai yayın onayı sayılmaz.

## 3 İletişim adresi

**FACT — kullanıcı kararı:** 27 Ekim 2026'daki açık yönlendirmeyle iletişim adresi **furkan@matchanddesign.com** oldu. Bu bilgi eski imza belgesinden alınan adresin yerini alır. Görünür e-posta bağlantısı ve formun alıcısı güncellendi; adres tercihi için açık soru kalmadı. İsim/unvan, telefon ve fiziksel adres eklenmedi.

Form e-posta taslağı açar; bağımsız mesaj gönderim altyapısı kurulmadı. Sorulacak: İlk yayında bu davranış yeterli mi?

## 4 Eduscope

**FACT:** Kullanıcının bu konuşmadaki yeni bilgisiyle `https://scheduler.com.tr` kullanıldı. Menü etiketi Eduscope olarak kaldı. Adres `src/data/site.ts` içinde tek noktadan değişir.

27 Ekim 2026 sonraki talebi: Eduscope için Q.E.D. sloganı. Standart Latince yazımıyla `Quod. Erat. Demonstrandum.` kullanıldı; `src/data/en.ts` içinde tek noktadan yönetilir.

Son görsel düzeltmeyle Q.E.D. 28 piksele indirildi; Latince açılımı yanında küçük bir imza olarak yerleşir. Önceki 60/45 piksel düzeni kullanılmaz.

Mevcut ders planlama, sınav planlama ve gözetmen atama kapsamı kullanıldı. Rezervasyon, akreditasyon, kariyer ve OBS ürünleri hazır ürün olarak gösterilmedi. Sorulacak: Yayın için uygun, kişisel ve kurumsal veri içermeyen hangi gerçek ürün ekranını ekleyelim? Ekran görüntüsü olmaması yerel sürümün çalışmasını engellemez.

## 5 Şirket profili ve araştırma

**Son kullanıcı düzeltmesi:** Bu bir şirket sitesidir. Başka şirketler tanıtılmayacak; rakipler yalnız dahili tasarım/anlatım referansı olarak incelenebilir. Araştırmacılar için kişisel profil bölümleri açılmayacak. İsimler ve katkılar ilgili uygulamaların içinde, daha geniş araştırma geleneği korunarak anılacak. Sönmez–Ünver'in Malatya sisteminin matching tasarımındaki rolü klinik ekip iş birliğiyle birlikte belirtildi. Nobel kazananları ile alana katkı veren araştırmacılar ayrıştırıldı.

Kuruluş tarihi, ekip sayısı, müşteri listesi, kurucu biyografisi, ödül, ortaklık, patent, yayın sayısı ve performans ölçütü eklenmedi. Sektörler arası problem örnekleri tamamlanmış ticari projeler olarak anlatılmadı. Sorulacak: About sayfasına eklenmesi istenen güncel ve kamuya açık kurucu/ekip bilgileri var mı? Araştırma çalışmaları için hangi yayınlar veya projeler kamuya açık olarak ilişkilendirilebilir?

## 6 Son kurumsal domain ve yayın

Kaynak imzada `matchanddesign.com` bulunuyor; bu sitenin nihai domain'i olarak otomatik atanmadı. Local sürüm indekslemeye kapalı. Sorulacak: Kurumsal sitenin nihai domain'i hangisi? Yerel tasarım ve içerik onayından sonra hosting, sitemap, canonical, indeksleme ve gerekiyorsa analitik birlikte ele alınacak.

## 7 Navigasyon

Uygulanan menü: Approach, Applications, Market Design, About, Eduscope ↗, Contact. Yeni sayfa `/market-design/`, adı The Science of Allocation. Kaynaklı araştırma anlatısı kullanıcı tarafından istendi; kişiler ve kurumlar şirketle ilişkili gibi sunulmadı. Applications adresi `/work/`. Sorulacak: Applications etiketi uygun mu, yoksa Work mü tercih ediliyor?

Market Design sayfasının iç bağlantıları **The idea / In practice / Our approach** olarak sadeleştirildi. Malatya bir menü veya sekme değildir; şehir yalnız organ takası uygulamasının metninde geçer. Uzun kaynak bölümü varsayılan olarak kapalı **Sources & context** alanına taşındı.

## Yerel sürümün sınırı

Bu dosyadaki kararlar için kullanıcıya soru gönderilmedi. Site yayınlanmadı. E-posta gönderilmedi. Nihai marka, kurumsal bilgi ve yayın kararları kullanıcıya aittir.
