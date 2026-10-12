---
title: "Mac'te İnternet Radyosu Nasıl Kaydedilir (Adım Adım)"
description: "Mac'te internet radyosu kaydetmenin üç yolu ve iPhone'da ne çalışıyor: kaydı yerleşik bir oynatıcı, bir sistem sesi aracı ya da Audacity."
datePublished: 2026-08-09
lastUpdated: 2026-10-12
faq:
  - q: "Kayıtların kalitesi ne?"
    a: "Yayınla aynı. Gelen ses geldiği gibi, yeniden kodlanmadan yazılır; yani 128 kbps'lik bir istasyon 128 kbps'lik, 320 kbps'lik bir istasyon 320 kbps'lik dosya verir."
  - q: "Bir kaydı Finder'a ya da Dosyalar uygulamasına aktarabilir miyim?"
    a: "Hayır. Kayıtlar cihazındaki uygulamanın içinde kalır; orada çalabilir ya da silebilirsin. Onlar için paylaşma, dışa aktarma ya da iCloud dosya eşitlemesi yok."
  - q: "Başka uygulamaları kullanırken kayıt yapabilir miyim?"
    a: "Evet. Kayıt hoparlörleri değil yayını yakalar, bu yüzden istasyon çaldığı sürece Mac ve iPhone'da sen başka bir şey yaparken ve ekran kapalıyken arka planda devam eder."
  - q: "Apple Watch'ta ya da Apple TV'de kayıt yapabilir miyim?"
    a: "Hayır. Kayıt bir Mac, iPhone ve iPad özelliği. Saat ve TV uygulamaları istasyon çalar ve çalmayı kontrol eder."
  - q: "Gece yayınlanan bir radyo programını nasıl kaydederim?"
    a: "Yatmadan önce kaydı başlat ve üç saat sınırının bitirmesine izin ver, ya da program daha uzunsa ayarlardan o sınırı yükselt. Kaydı kendi başına başlatan bir zamanlayıcı yok."
---

Yapmanın üç yolu, her birinin sana ne kadara geldiği ve dosyaların nereye gittiği.

**Mac'te internet radyosu kaydetmenin en kolay yolu, kaydı yerleşik bir radyo oynatıcısı; çünkü yayının kendisini saklar ve ses yönlendirmesi istemez. Bir yakalama aracıyla bütün sistemi kaydetmek de çalışır ve ses bir web sitesinden ya da kaydedemeyen bir uygulamadan geliyorsa tek seçenek budur. iPhone'da yalnızca yerleşik yol var.**

## İnternet radyosu neden kaydedilir ki

Çoğu istek üç şeyden birine indirgeniyor: sen uyurken ya da işteyken yayınlanan bir program, hiçbir yere konmayacağı için saklamak istediğin bir DJ seti ya da bir kez duyduğun ve yeniden bulmak istediğin tek bir parça. Yayınlar canlı ve senin için hiçbir şey saklanmıyor, yani sonra istiyorsan geçerken yakalamak zorundasın.

## Yöntem 1: kaydı yerleşik bir oynatıcıyla kaydet

Kaydeden bir oynatıcı gelen yayını diske yazar. Hiçbir şey yeniden kodlanmaz, sistem sesleri sızmaz ve kayıt sırasında gelen bir bildirim dosyaya girmez. [Macdio](/mac.html) bunu Mac'te ve [iPhone](/iphone.html)'da aynı düğmeyle yapar.

Bir istasyon çal, sonra kaydet'e bas. Oturum başına tek dosya için Kesintisiz'i ya da oturumun her şarkı değişiminde kesilmesi için Parçaya Göre Böl'ü seç. Çalışır bırak, başka uygulamalar kullan ve işin bitince durdur'a bas. Oturum hemen Kayıtlar sekmesinde görünür.

Bilmeye değer kısım Parçaya Göre Böl. Yayının içinde gelen şarkı bilgisini izler ve her değişimde keser, böylece iki saatlik bir program içinde gezmen gereken tek uzun dosya yerine kapaklı, adlandırılmış parçalar listesine dönüşür. Bir istasyon işe yarar hiçbir şey göndermediğinde, ki birçoğu göndermez, Macdio şarkıyı elindeki sesten çözer; adlandırma ekran kapalıyken ve mikrofon izni hiç istenmeden devam eder. O kısmın nasıl çalıştığını [şarkı tanıma rehberi](/guides/identify-song-on-radio.html) anlatıyor.

Takas şu: yerleşik bir kaydedici yalnızca oynatıcının çalabildiğini kaydeder. İnternet radyosunu yakalar, başka hiçbir şeyi değil; yani bir görüntülü arama ya da bir tarayıcı sekmesi kapsam dışı.

## Yöntem 2: Audio Hijack ile bütün sistemi yakala

Rogue Amoeba'nın Audio Hijack'i Mac'teki herhangi bir uygulamanın sesini ya da tüm sistem sesini bir arada kaydeder, yani bir tarayıcı sekmesinde ya da kaydedicisi olmayan bir oynatıcıda yaşayan yayınları kapsar. Rogue Amoeba'nın ürün sayfasına göre (14 Eylül 2026'da kontrol edildi) 4.6.0 sürümü macOS 14.4'ten macOS 27'ye kadar çalışıyor ve ücretsiz indirilebiliyor, lisans alınana kadar kısıtlamalarla.

Kaynak uygulamayı seçiyorsun, bir kaydedici bloğu ekliyorsun ve çalıştır düğmesine basıyorsun. Bir kayıt düğmesinden daha fazla kurulum ve etrafında plan yapmaya değer bir tuzak var: Mac ne çalarsa dosyaya girer. Kırkıncı dakikadaki bir Slack bildirimi kayıtta sonsuza dek kalır. Ayrıca sana bir şarkının nerede başlayıp bittiğini bilmeyen tek uzun bir dosya verir, yani parça listesi işi sonradan sana kalır.

## Yöntem 3: Audacity artı sanal bir ses aygıtı

Audacity ücretsiz ve açık kaynak, bu yüzden forumlardaki olağan cevap; ama macOS bir uygulamanın sistem sesini kendi başına kaydetmesine izin vermiyor. Önce ücretsiz ve açık kaynak BlackHole gibi bir sanal ses aygıtı kurman, Mac'in çıkışını onun üzerinden yönlendirmen, sonra Audacity'yi o aygıttan kaydetmeye ayarlaman gerekiyor. Kaydettiğini duymak da isteyeceksin, bu da sesin hem hoparlörlerine hem kaydediciye ulaşması için Audio MIDI Ayarları'nda çok çıkışlı bir aygıt demek.

Çalışır, hiçbir şeye mal olmaz ve üçünün en uğraştırıcısı. Artısı Audacity'nin bir düzenleyici olması; yakalama bitince kırpma, kısma ve belirli bir biçimde dışa aktarma hemen orada.

## Hangi yöntem kullanılır

İstasyon bir radyo uygulamasındaysa uygulamanın kendi kaydedicisini kullan. Ek yazılım olmadan temiz ses ve parça parça bölme veren tek yol bu. Ses başka bir yerdeyse ya da bir podcast röportajıyla bir müzik altlığını aynı anda kaydediyorsan Audio Hijack o iş için yapılmış araç. Audacity bütçe sıfırken ve bir öğleden sonralık kurulum kabul edilebilirken seçilecek olan.

## iPhone'da radyo nasıl kaydedilir

Burada yalnızca ilk yöntem var. iOS hiçbir uygulamaya sistem sesi yakalama erişimi vermiyor, yani Audio Hijack'in iPhone karşılığı yok ve ekran kaydı da temiz bir yayın saklamaz. Kaydı yerleşik bir oynatıcı listenin tamamı.

Macdio'da Mac'tekiyle aynı düğme. Bir istasyon çalarken kaydet'e dokun, kayıt sen başka uygulamalar kullanırken devam eder, çünkü dinleyen bir mikrofon değil, yazılan yayın. Kayıtlar durdurduğun anda Kayıtlar sekmesinde görünür.

## Kayıt zamanlanabilir mi?

Macdio'da hayır. Perşembe 21:00'de bir istasyonu başlatan bir zamanlayıcı yok; uygulamada değil istek listesinde. Mac'te bugün mevcut en yakın şey Audio Hijack, ya da bir Kestirmeler otomasyonu belirli bir saatte bir istasyonu açabilir, kaydet'e sen basarsın.

Macdio'da olan şey tersi koruma: bir oturum üç saat sonra kendi başına durur, böylece unuttuğun bir kayıt gece boyunca diski yemez. Uzun bir program kaydederken sınır ayarlardan değiştirilebilir ve kayıt sürerken kalan süre gösterilir.

## Bir kaydı erken durduran şeyler

İki şey oturumu senden önce bitirir ve ikisi de dosyayı kaybetmez, kaydeder. Birincisi yukarıdaki üç saat sınırı. İkincisi disk. Macdio 500 MB'tan az boş alan varken kayda başlamaz, yazarken boş alanı izler, sürücü 500 MB'ın altına düşünce her beş dakikada uyarır ve alan kritikleşirse bildirimle kaydı durdurur; yani en kötü durum dolu bir disk ve bozuk bir dosya değil, daha kısa bir dosya. Neredeyse dolu bir dizüstünde uzun bir gece oturumu dikkat edilecek durum, çünkü 320 kbps'lik bir istasyon saatte yaklaşık 144 MB yazar.

## Dosyalar ne kadar büyür?

Bir kayıt yayın kadar ağırdır, çünkü hiçbir şey eklenmez ya da daha fazla sıkıştırılmaz. En yaygın bit hızı olan 128 kbps'de bu saatte kabaca 58 MB, yani dolu bir akşam radyosu yaklaşık 350 MB. 320 kbps'lik bir istasyon dakikada 2,4 MB civarı, düşük bit hızlı bir konuşma istasyonu bunun dörtte biri olabilir. Parçaya Göre Böl pratikte hesabı dostça yapar, çünkü istediğin üç şarkıyı tutar, gerisini silersin.

## Dosyalar hangi biçimde

Bir kayıt istasyonun ne gönderdiyse onu tutar. MP3 istasyonu .mp3, AAC istasyonu .aac verir, diske giderken hiçbir şey yeniden kodlanmaz, yani dosya tam yayının sesi gibi çıkar. Şarkıyı Tanı bir AAC kaydındaki bir şarkıyı adlandırdığında başlığı, sanatçısı, kapağı ve sözleri dosyaya yazılır ve dosya bir .m4a olur. Burada yanlış yapılacak kalite ayarı yok, çünkü ses hiçbir zaman ikinci kez kodlanmaz.

## Kayıtlar nerede yaşıyor

Uygulamanın içinde, kendi cihazında, her oturumun ve her bölünmüş parçanın çalınıp silinebildiği Kayıtlar sekmesinde. Müzik kütüphanene kopyalanmazlar, uygulama onları Dosyalar uygulamasında ya da Finder klasörlerinde göstermez ve paylaş ya da dışa aktar düğmesi yok. Bu kişisel bir kayıt özelliği için bilinçli bir sınır, tamamlanmayı bekleyen bir şey değil ve kişisel bir kaydı kişisel tutuyor. Hiçbir şey hiçbir yere yüklenmez.

## İnternet radyosu kaydetmek yasal mı?

Bir yayını kendi özel dinlemen için kaydetmek çoğu ülkede köklü bir uygulama; FM'i kasete çekmekle aynı gelenek. Kişisel kalan basit kalır: kayıtları yeniden dağıtma ya da yeniden yayımlama ve emin değilsen kendi ülkenin kurallarına bak. Bu hukuki tavsiye değil, genel bilgi.

## Sık sorulan sorular

### Kayıtların kalitesi ne?

Yayınla aynı. Gelen ses geldiği gibi, yeniden kodlanmadan yazılır; yani 128 kbps'lik bir istasyon 128 kbps'lik, 320 kbps'lik bir istasyon 320 kbps'lik dosya verir.

### Bir kaydı Finder'a ya da Dosyalar uygulamasına aktarabilir miyim?

Hayır. Kayıtlar cihazındaki uygulamanın içinde kalır; orada çalabilir ya da silebilirsin. Onlar için paylaşma, dışa aktarma ya da iCloud dosya eşitlemesi yok.

### Başka uygulamaları kullanırken kayıt yapabilir miyim?

Evet. Kayıt hoparlörleri değil yayını yakalar, bu yüzden istasyon çaldığı sürece Mac ve iPhone'da sen başka bir şey yaparken ve ekran kapalıyken arka planda devam eder.

### Apple Watch'ta ya da Apple TV'de kayıt yapabilir miyim?

Hayır. Kayıt bir Mac, iPhone ve iPad özelliği. Saat ve TV uygulamaları istasyon çalar ve çalmayı kontrol eder.

### Gece yayınlanan bir radyo programını nasıl kaydederim?

Yatmadan önce kaydı başlat ve üç saat sınırının bitirmesine izin ver, ya da program daha uzunsa ayarlardan o sınırı yükselt. Kaydı kendi başına başlatan bir zamanlayıcı yok.

## Denemeye hazır mısın?

Macdio'yu [App Store](https://apps.apple.com/app/macdio/id6761737888)'dan al. Tek satın alma, her Apple cihazı, abonelik yok.
