---
title: "Macdio İstasyonlarını Wi-Fi'da Tarayıcıdan Düzenle"
description: "Bilgisayarda Düzenle, iPhone, iPad ya da Apple TV'deki kendi istasyonlarını aynı Wi-Fi'daki bir tarayıcıda açar. Ekle, düzenle, JSON, CSV ya da M3U al ve ver."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Bilgisayarda Düzenle hangi cihazlarda var?"
    a: "iPhone, iPad ve Apple TV'de. Mac'in zaten klavyesi var ve istasyonları uygulamanın içinde düzenler. Apple Watch ve CarPlay'de yok."
  - q: "Bilgisayarım adresi neden açamıyor?"
    a: "İki cihaz da aynı Wi-Fi'da olmalı, düzenleyici ekranı açık kalmalı ve iPhone ile iPad'de Macdio'nun yerel ağ izni olmalı. Adres her başlatmada değişebilir."
  - q: "Düzenleyici dizindeki istasyonları değiştirir mi?"
    a: "Hayır. Tarayıcıda yalnızca kendi eklediğin istasyonlar görünür ve dizindeki istasyonlar asla değişmez."
  - q: "İstasyonlardan oluşan bir M3U çalma listesini içe aktarabilir miyim?"
    a: "Evet. Çalma listesinin metnini Import'a yapıştır, Add to list'e, sonra Save'e tıkla. Import JSON ve CSV de alır."
  - q: "Düzenleyici paylaşılan bir Wi-Fi'da güvenli mi?"
    a: "Her başlatmada yenilenen 6 haneli bir kod ister, 5 yanlış koddan sonra kapanır ve yalnızca düzenleyici ekranı açıkken çalışır. Bağlantı ağının içinde düz http'dir."
  - q: "Tarayıcıda kaldırdığım bir istasyona ne olur?"
    a: "Save'e tıkladığın anda her cihazdan silinir. Save özel istasyon listeni sayfadaki tabloyla değiştirir, bu yüzden başka bir yerde istasyon değiştirdiysen önce sayfayı yenile."
---

Bilgisayarda Düzenle, kendi eklediğin istasyonları aynı Wi-Fi'daki herhangi bir bilgisayarın tarayıcısından, gerçek bir klavyeyle yönetmeni sağlar. iPhone, iPad ya da Apple TV'de Macdio'nun Ayarlar'ından başlatırsın, gösterdiği adresi açarsın, 6 haneli kodu yazarsın ve istasyonlarını ekleyip düzenleyebildiğin, sıralayabildiğin, içe ve dışa aktarabildiğin bir tablo gelir. Hiçbir şey bir sunucudan geçmez. Tarayıcı yalnızca senin cihazınla konuşur.

Mac'te bu özellik yok. Orada istasyonları "İstasyon Ekle…" ile ekler, sağ tıklayarak düzenlersin; bkz. [özel istasyon ekle](/guides/add-a-custom-station.html).

## Hızlı adımlar

1. iPhone ya da iPad'de Ayarlar, "Özel İstasyonlar", "Bilgisayarda Düzenle"yi aç. Apple TV'de Ayarlar'ı aç, "Bilgisayarda Düzenle" kartına git ve "Aç"ı seç.
2. Düzenleyiciyi başlat: iPhone ve iPad'de "Düzenleyiciyi başlat", Apple TV'de "Düzenleyiciyi Başlat".
3. Cihazda gösterilen adresi bilgisayarındaki bir tarayıcıya yaz.
4. 6 haneli kodu gir.
5. Değişikliklerini yap ve "Save"e tıkla.

## iPhone ya da iPad'de düzenleyici nasıl başlatılır

Ayarlar, "Özel İstasyonlar", "Bilgisayarda Düzenle"ye git (iPhone'da Ayarlar, sen onu sekme çubuğuna taşımadıysan Diğer'in altında durur) ve "Düzenleyiciyi başlat"a dokun. İlk seferde iOS, Macdio'nun yerel ağındaki cihazları bulup bulamayacağını sorar. İzin ver, yoksa tarayıcı iPhone'a ya da iPad'e ulaşamaz.

Çalışmaya başlayınca "Hazır" bölümünde adresle birlikte "Bilgisayarında şunu aç" ve "Göster"e dokunana kadar noktalarla gizlenen kodla birlikte "Sonra bu kodu gir" görünür. "Düzenleyiciyi durdur" onu kapatır.

## Apple TV'de düzenleyici nasıl başlatılır

Ayarlar'ı aç, "Bilgisayarda Düzenle" kartına ("İstasyonlarım Düzenleyicisi") git ve "Aç"ı seç. "Bilgisayarda Düzenle" ekranında "Düzenleyiciyi Başlat"a bas.

TV, adresi büyük harflerle "Bu adresi aç" altında ve 6 haneyi "Sonra bu kodu gir" altında, hep görünür biçimde gösterir. "Düzenleyiciyi Durdur", "Bitti" ya da Menu düğmesi onu kapatır. Başlayamazsa "Tekrar Dene" sunulur.

## Tarayıcıda neler yapabilirsin?

Adres, cihazın Wi-Fi adresi ve bir port numarasından oluşan düz bir http adresi. Port her başlatmada yeniden seçilir, yani adres geçen seferkinden farklı olabilir; kod da her başlatmada yenilenir.

Tarayıcı sayfası İngilizce. Sayfa önce kodu ister. Yanlış bir kod "That code did not work. Check the code on your device." (kod çalışmadı, cihazındaki kodu kontrol et) mesajını verir.

Sonra bir sayıyla birlikte "My Stations" başlığını, yanında da "Reload" (yeniden yükle) ve "Save" (kaydet) düğmelerini görürsün. Araç çubuğunda bir filtre alanı (ada, adrese ya da etikete göre), "Add station", "Scan a website", "Import", "Export" ve tabloyu ada göre sıralayan bir düğme var. Sütunlar bir yıldız, Name, Stream URL, Logo URL, Country ve Tags.

Her satırda bir sürükleme tutamacı, istasyonu favori yapan bir yıldız, logo bulmak için "Logo", yayının çalıp çalmadığını cihazına sormak için "Test" ve satırı kaldırmak için "✕" var. Küçük bir ekranda sürüklemenin yerini yukarı ve aşağı oklar alır. İki satır aynı adresi kullandığında sayfa onları "Another row uses this same address" ile işaretler.

"Scan a website" uygulamadaki bulucunun aynısını kullanır: bir istasyonun sitesindeki her kanalı bir kalite seçiciyle listeler, "Add selected" da seçtiklerini tabloya koyar.

Satırların sırası uygulamadaki İstasyonlarım'ın sırası olur. "Save"e tıklayana kadar hiçbir şey cihazına ulaşmaz; tıklayınca durum satırında "Saved to device" yazar. Değişiklikler oradan iCloud ile diğer cihazlarına eşitlenir.

## JSON, CSV ya da M3U'dan istasyon nasıl içe aktarılır

"Import" yapıştırdığın metni alır:

- JSON: her biri "name" ve "streamURL", isteğe bağlı olarak da "logoURL", "country" ve "tags" içeren bir istasyon listesi.
- CSV: `name,stream,logo,country,tags,favorite` başlık satırı, sonra her satırda bir istasyon.
- M3U: istasyon adını içeren bir `#EXTINF:-1,` satırı, ardından yayın adresi.

"Fill with a JSON example", "Fill with a CSV example" ve "Fill with an M3U example" düğmeleri kutuya çalışan bir örnek koyar. M3U örneği şu:

```
#EXTM3U
#EXTINF:-1,Radio Paradise
https://stream.radioparadise.com/aac-320
```

"Add to list" satırları tabloya ekler. "Save"e tıkladığında cihaza ulaşırlar.

## İstasyonların nasıl dışa aktarılır

"Export" istasyonlarını tek ekranda JSON, CSV ve M3U olarak gösterir ve "JSON file", "CSV file" ve "M3U file" seçeneklerini sunar. İndirilen dosyaların adı macdio-stations.json, macdio-stations.csv ve macdio-stations.m3u.

## Save istasyon listene ne yapar

Save, özel istasyon listeni sayfadaki tabloyla değiştirir. Cihazın gördüğün satırları tutar ve tabloda olmayan her istasyonunu siler; iCloud da bu silmeyi her cihaza taşır. Pratikte:

- "✕" ile kaldırdığın bir satır kaydettiğinde her cihazdan silinir ve sayfa önce sormaz.
- Bu sayfa yüklendikten sonra başka bir cihazda istasyon eklediysen ya da değiştirdiysen düzenlemeden önce "Reload"a tıkla. Eski bir sayfadan yapılan kayıt eski tabloyu geri koyar.
- Her satırın adresini http:// ya da https:// ile başlayacak şekilde koru. Adresi boş olan ya da bu başlangıcı taşımayan bir satır Save'de atılır ve ait olduğu istasyon silinir. Tarayıcı, uygulamanın yaptığı gibi senin yerine "https://" eklemez.

## Düzenleyici ne zaman durur?

Yalnızca sen açık tuttuğun sürece çalışır. Durdur'a bastığında, düzenleyici ekranından çıktığında, Macdio arka plana geçtiğinde ya da tarayıcı sekmesini kapattığında durur. Tarayıcı 2 dakika sessiz kaldığında, 5 dakika içinde hiçbir tarayıcı bağlanmadığında ve 5 yanlış koddan sonra da durur. Çalıştığı sürece telefonun ya da TV'nin ekranı açık kalır.

## Bilmeye değer sınırlar

- İki cihaz da aynı ağda olmalı.
- Tablo en fazla 500 istasyon tutar ve aynı anda tek bir web sitesi taraması çalışır.
- Dizindeki istasyonlar ve listelerin düzenleyicinin dışında kalır. Onları uygulamada değiştir; bkz. [favoriler, listeler ve eşitleme](/guides/favorites-lists-and-sync.html).
- Bu sayfanın JSON'u ile Mac'teki "İstasyonları Dışa Aktar…"ın JSON'u farklı biçimlerde. Her birini kendi içe aktarmasıyla geri oku.

## Sık sorulan sorular

### Bilgisayarda Düzenle hangi cihazlarda var?

iPhone, iPad ve Apple TV'de. Mac'in zaten klavyesi var ve istasyonları uygulamanın içinde düzenler. Apple Watch ve CarPlay'de yok.

### Bilgisayarım adresi neden açamıyor?

İki cihaz da aynı Wi-Fi'da olmalı, düzenleyici ekranı açık kalmalı ve iPhone ile iPad'de Macdio'nun yerel ağ izni olmalı. Adres her başlatmada değişebilir.

### Düzenleyici dizindeki istasyonları değiştirir mi?

Hayır. Tarayıcıda yalnızca kendi eklediğin istasyonlar görünür ve dizindeki istasyonlar asla değişmez.

### İstasyonlardan oluşan bir M3U çalma listesini içe aktarabilir miyim?

Evet. Çalma listesinin metnini Import'a yapıştır, Add to list'e, sonra Save'e tıkla. Import JSON ve CSV de alır.

### Düzenleyici paylaşılan bir Wi-Fi'da güvenli mi?

Her başlatmada yenilenen 6 haneli bir kod ister, 5 yanlış koddan sonra kapanır ve yalnızca düzenleyici ekranı açıkken çalışır. Bağlantı ağının içinde düz http'dir.

### Tarayıcıda kaldırdığım bir istasyona ne olur?

Save'e tıkladığın anda her cihazdan silinir. Save özel istasyon listeni sayfadaki tabloyla değiştirir, bu yüzden başka bir yerde istasyon değiştirdiysen önce sayfayı yenile.

## Dene

Macdio'yu [App Store](https://apps.apple.com/app/macdio/id6761737888)'dan al, birkaç istasyon ekle, sonra iPhone, iPad ya da Apple TV'nde Bilgisayarda Düzenle'yi aç. Tek satın alma, her Apple cihazı, abonelik yok.
