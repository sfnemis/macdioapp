---
title: "Jak dodać własną stację radiową do Macdio po adresie URL"
description: "Dodaj strumień radia internetowego do Macdio po adresie na iPhone'ie, iPadzie lub Macu, przetestuj, nadaj logo, edytuj albo usuń. Apple TV używa przeglądarki."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Jakie adresy strumieni przyjmuje Macdio?"
    a: "Każdy strumień radiowy http albo https: MP3, AAC, HLS (.m3u8), odnośniki do playlist kończące się na .pls, .m3u, .asx albo .xspf i stare serwery SHOUTcast. Odcinek podcastu nie zostanie przyjęty jako stacja."
  - q: "Co, jeśli znam tylko stronę stacji?"
    a: "Wklej adres strony w pole adresu i użyj Skanuj. Macdio wymienia strumienie, które tam znajdzie, każdy z menu jakości, a ty wybierasz jeden."
  - q: "Dlaczego Macdio pisze \"Tap Add again to save it anyway\"?"
    a: "Macdio nie mogło połączyć się ze strumieniem, gdy sprawdzało adres. Drugie dotknięcie i tak zapisuje stację, co się przydaje, gdy stacja nie działa tylko przez chwilę."
  - q: "Czy moje własne stacje pojawiają się na innych urządzeniach?"
    a: "Tak. Synchronizują się przez iCloud z twoim Makiem, iPhone'em, iPadem i Apple TV, a Apple Watch dostaje je z iPhone'a."
  - q: "Czy mogę nadać własnej stacji jej własne logo?"
    a: "Tak. Wybierz Automatycznie, Odnośnik (adres obrazka), Mój obraz (zdjęcie ze Zdjęć albo Plików) lub Brak. Twój własny obrazek pokazuje się na wszystkich twoich urządzeniach."
---

Dowolną stację radia internetowego możesz dodać do Macdio po adresie strumienia na iPhone'ie, iPadzie i Macu. Dotknij „+” w Bibliotece, wybierz „Dodaj własną stację” (na Macu „Dodaj stację…”), wklej URL, nazwij stację i ją dodaj. Macdio przed zapisem sprawdza, czy adres naprawdę wysyła dźwięk, a potem stacja synchronizuje się przez iCloud z twoimi innymi urządzeniami, także z Apple TV.

Katalog ma ponad 60 000 stacji, a i tak niektórych brakuje, często małych lokalnych. Jeśli nie masz jeszcze adresu, poradnik [jak znaleźć adres URL strumienia stacji](/guides/find-radio-stream-url.html) pokazuje, gdzie szukać.

## Szybkie kroki

Na iPhone'ie albo iPadzie:

1. Otwórz Bibliotekę i dotknij „+”.
2. Wybierz „Dodaj własną stację”.
3. Wklej adres w pole „Adres strumienia lub strona stacji”.
4. Dotknij „Skanuj”, żeby potwierdzić strumień i wypełnić nazwę, albo sam wpisz „Nazwa stacji”.
5. Dotknij „Dodaj”.

## Gdzie jest przycisk dodawania na każdym urządzeniu?

| Urządzenie | Gdzie go znaleźć | Przycisk, który zapisuje |
|---|---|---|
| iPhone i iPad | Biblioteka, „+”, „Dodaj własną stację” albo Ustawienia, „Własne stacje”, „Dodaj własną stację” | „Dodaj” |
| Mac | Biblioteka, „+”, „Dodaj stację…” | „Dodaj stację” |
| Apple TV | Ustawienia, „Edytuj na komputerze”, potem przeglądarka w tej samej sieci Wi-Fi | „Save” w przeglądarce |
| Apple Watch i CarPlay | Brak formularza dodawania. Grają stacje z twojej biblioteki | |

Na iPhone'ie Ustawienia siedzą pod Więcej, chyba że przeniosłeś je na pasek kart.

## Jak dodać stację na iPhone'ie albo iPadzie

W arkuszu „Własna stacja” przycisk „Skanuj” (albo Return) sprawdza to, co wpisałeś w „Adres strumienia lub strona stacji”. Strumień zostaje potwierdzony, a puste pole nazwy wypełnione. Przy stronie internetowej dostajesz listę znalezionych na niej strumieni, każdy z menu jakości i przyciskiem „Użyj”. „Logo”, „Kraj” i „Tagi” oddzielone przecinkami są opcjonalne. „Testuj URL strumienia” odpowiada „Strumień jest osiągalny!”, gdy wszystko gra. „Dodaj” jest szare, dopóki nazwa albo adres są puste albo trwa test lub skanowanie.

## Jak dodać stację na Macu

W Bibliotece kliknij „+” i wybierz „Dodaj stację…”. Arkusz „Dodaj własną stację” ma „Nazwa stacji”, „URL strumienia” z przyciskiem „Skanuj”, „Logo stacji”, „Kraj (opcjonalnie)” i „Tagi (oddzielone przecinkami, opcjonalne)”. Gdy wpiszesz adres, pojawia się „Testuj strumień”, a dobry strumień zgłasza „Stream is reachable” (aplikacja pokazuje to po angielsku) z kodekiem i bitrate. Kliknij „Dodaj stację” albo naciśnij Return.

## Jakie adresy URL strumieni działają w Macdio?

- Adresy zaczynające się od http albo https. Jeśli pominiesz początek, Macdio najpierw próbuje „https://”, a potem zwykłego „http://”.
- Bezpośrednie strumienie MP3 i AAC.
- Strumienie HLS: adres kończący się na .m3u8 albo serwer, który odpowiada playlistą HLS.
- Odnośniki do playlist kończące się na .pls, .m3u, .asx albo .xspf. Macdio otwiera playlistę i używa jej pierwszego strumienia.
- Serwery SHOUTcast, także stare, które odpowiadają „ICY 200 OK”.

Plik o stałej długości, taki jak odcinek podcastu albo dżingiel, nie zostanie przyjęty jako stacja.

## Co Macdio sprawdza, gdy dotkniesz Dodaj

Coś, co nie może być adresem, daje komunikat „Invalid URL format. Please check the URL.”, czyli nieprawidłowy format adresu. Druga stacja o tej samej nazwie i tym samym adresie daje „A station with this name and URL already exists.”. Te komunikaty aplikacja pokazuje na razie po angielsku.

Potem Macdio pyta serwer i czeka do 6 sekund. Jeśli adres to strona internetowa, nic nie zostaje zapisane, a skanowanie rusza, żebyś mógł wybrać jeden z jej strumieni. Jeśli z serwerem nie da się połączyć, widzisz przyczynę i „Tap Add again to save it anyway.” (na Macu „Click Add again to save it anyway.”), czyli że kolejne dotknięcie Dodaj i tak zapisze stację. Drugie dotknięcie ją zapisuje.

Nowa stacja pojawia się w „Moje stacje”. Ulubioną staje się dopiero wtedy, gdy oznaczysz ją gwiazdką (zobacz [ulubione, listy i synchronizacja](/guides/favorites-lists-and-sync.html)).

## Jak nadać własnej stacji logo

Ustawienie „Logo” (na Macu „Logo stacji”) ma cztery opcje:

- „Automatycznie” szuka stacji w Logo.dev po jej nazwie i adresie.
- „Odnośnik” przyjmuje bezpośredni link do pliku obrazka, taki, jaki dostajesz z polecenia kopiowania adresu obrazka, kończący się na .png albo .jpg. Jeśli wkleisz stronę, na której jest logo, Macdio podstawia obrazek, o ile go znajdzie.
- „Mój obraz” używa twojego własnego obrazka: „Zdjęcia” albo „Pliki” na iPhone'ie i iPadzie (iCloud Drive działa), „Wybierz obraz…” na Macu. Jest przechowywany razem ze stacją, więc pokazuje się na wszystkich twoich urządzeniach.
- „Brak” rysuje własną grafikę Macdio.

Żeby zmienić je później, przytrzymaj stację na iPhone'ie albo iPadzie lub kliknij ją prawym przyciskiem na Macu i wybierz „Logo stacji…”. To działa też przy stacjach z katalogu, z opcjami Automatycznie, Mój obraz i Brak. Odnośnik jest tylko dla stacji, które dodałeś sam.

## Jak edytować albo usunąć własną stację

Na iPhone'ie i iPadzie przytrzymaj stację i wybierz „Edytuj stację” albo przesuń jej wiersz w prawo i dotknij „Edytuj”. Zmień, co trzeba, i dotknij „Zapisz”. Żeby ją usunąć, przesuń wiersz w lewo w „Moje stacje”, dotknij „Usuń” i potwierdź przyciskiem „Usuń”. Potwierdzenie mówi, że stacja zniknie z każdego urządzenia i z każdej listy, na której jest.

Na Macu kliknij stację prawym przyciskiem i wybierz „Edytuj stację” (a potem „Zapisz zmiany”) albo „Usuń stację”, które też najpierw pyta.

Zapis edycji nie testuje zmienionego adresu, więc najpierw użyj przycisku testu. Stacji z katalogu nie da się edytować, ale „Zmień nazwę…” (iPhone i iPad) i „Zmień nazwę stacji…” (Mac) nadają im twoją własną nazwę, a „Przywróć nazwę” przywraca oryginalną.

## Dodawanie stacji na Apple TV

Telewizor nie ma formularza dodawania. Uruchom „Edytuj na komputerze” w jego Ustawieniach, a przeglądarka na komputerze w tej samej sieci Wi-Fi dostanie tabelę twoich własnych stacji, łącznie z URL logo ([krok po kroku](/guides/edit-stations-on-computer.html)). Stacje dodane na iPhone'ie, iPadzie albo Macu i tak docierają do telewizora przez iCloud.

## Ograniczenia, które warto znać

- Dodanie stacji wymaga połączenia, bo sprawdzanie, skanowanie i szukanie logo odbywają się w sieci.
- Skanowanie strony może trwać do minuty, a niektóre strony chowają swój odtwarzacz tak dobrze, że żaden strumień się nie znajdzie.
- iPhone i iPad nie mają importu list stacji z pliku. Przy wielu stacjach naraz użyj importu w [edytorze w przeglądarce](/guides/edit-stations-on-computer.html).
- CarPlay i [Siri](/guides/siri-radio.html) znajdują własną stację, gdy jest ulubiona albo grałeś ją ostatnio. CarPlay pokazuje ją też wewnątrz twoich list.

## Najczęstsze pytania

### Jakie adresy strumieni przyjmuje Macdio?

Każdy strumień radiowy http albo https: MP3, AAC, HLS (.m3u8), odnośniki do playlist kończące się na .pls, .m3u, .asx albo .xspf i stare serwery SHOUTcast. Odcinek podcastu nie zostanie przyjęty jako stacja.

### Co, jeśli znam tylko stronę stacji?

Wklej adres strony w pole adresu i użyj Skanuj. Macdio wymienia strumienie, które tam znajdzie, każdy z menu jakości, a ty wybierasz jeden.

### Dlaczego Macdio pisze „Tap Add again to save it anyway”?

Macdio nie mogło połączyć się ze strumieniem, gdy sprawdzało adres. Drugie dotknięcie i tak zapisuje stację, co się przydaje, gdy stacja nie działa tylko przez chwilę.

### Czy moje własne stacje pojawiają się na innych urządzeniach?

Tak. Synchronizują się przez iCloud z twoim Makiem, iPhone'em, iPadem i Apple TV, a Apple Watch dostaje je z iPhone'a.

### Czy mogę nadać własnej stacji jej własne logo?

Tak. Wybierz Automatycznie, Odnośnik (adres obrazka), Mój obraz (zdjęcie ze Zdjęć albo Plików) lub Brak. Twój własny obrazek pokazuje się na wszystkich twoich urządzeniach.

## Wypróbuj

Pobierz Macdio z [App Store](https://apps.apple.com/app/macdio/id6761737888) i dodaj tę jedną stację, której nie ma w katalogu. Jeden zakup obejmuje iPhone'a, iPada, Maca, Apple TV i Apple Watch, bez subskrypcji.
