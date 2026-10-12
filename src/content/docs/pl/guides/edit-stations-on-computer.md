---
title: "Edytuj stacje Macdio w przeglądarce komputera przez Wi-Fi"
description: "Edytuj na komputerze otwiera twoje stacje Macdio w przeglądarce w tej samej sieci Wi-Fi, z iPhone'a, iPada lub Apple TV. Import i eksport JSON, CSV, M3U."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Które urządzenia mają Edytuj na komputerze?"
    a: "iPhone, iPad i Apple TV. Mac ma już klawiaturę i edytuje stacje w aplikacji. Apple Watch i CarPlay tego nie mają."
  - q: "Dlaczego mój komputer nie może otworzyć adresu?"
    a: "Oba urządzenia muszą być w tej samej sieci Wi-Fi, ekran edytora musi zostać otwarty, a na iPhone'ie i iPadzie Macdio potrzebuje zgody na dostęp do sieci lokalnej. Adres może się zmieniać przy każdym uruchomieniu."
  - q: "Czy edytor zmienia stacje z katalogu?"
    a: "Nie. W przeglądarce pojawiają się tylko stacje, które dodałeś sam, a stacje z katalogu nigdy nie są zmieniane."
  - q: "Czy mogę zaimportować playlistę stacji M3U?"
    a: "Tak. Wklej tekst playlisty w Import, kliknij Add to list, potem Save. Import przyjmuje też JSON i CSV."
  - q: "Czy edytor jest bezpieczny we wspólnej sieci Wi-Fi?"
    a: "Wymaga 6-cyfrowego kodu, który jest nowy przy każdym uruchomieniu, zamyka się po 5 błędnych kodach i działa tylko wtedy, gdy ekran edytora jest otwarty. Połączenie to zwykłe http wewnątrz twojej sieci."
  - q: "Co się dzieje ze stacją, którą usunę w przeglądarce?"
    a: "Gdy klikniesz Save, znika z każdego urządzenia. Save zastępuje twoją listę własnych stacji tabelą ze strony, więc jeśli zmieniałeś stacje gdzie indziej, najpierw przeładuj stronę."
---

Edytuj na komputerze pozwala zarządzać stacjami, które dodałeś sam, z przeglądarki na dowolnym komputerze w tej samej sieci Wi-Fi, z prawdziwą klawiaturą. Uruchamiasz to w Ustawieniach Macdio na iPhone'ie, iPadzie albo Apple TV, otwierasz pokazany adres, wpisujesz 6-cyfrowy kod i dostajesz tabelę, w której możesz dodawać, edytować, przestawiać, importować i eksportować swoje stacje. Nic nie przechodzi przez serwer. Przeglądarka rozmawia tylko z twoim urządzeniem. Sama strona w przeglądarce jest po angielsku, dlatego jej przyciski podaję poniżej w oryginale.

Mac tego nie ma. Tam dodajesz stacje przez „Dodaj stację…” i edytujesz je prawym przyciskiem, zobacz [dodaj własną stację](/guides/add-a-custom-station.html).

## Szybkie kroki

1. Na iPhone'ie albo iPadzie otwórz Ustawienia, „Własne stacje”, „Edytuj na komputerze”. Na Apple TV otwórz Ustawienia, przejdź do karty „Edytuj na komputerze” i wybierz „Otwórz”.
2. Uruchom edytor przyciskiem „Uruchom edytor”, który na iPhone'ie, iPadzie i Apple TV nazywa się tak samo.
3. Wpisz adres pokazany na urządzeniu w przeglądarce na komputerze.
4. Wpisz 6-cyfrowy kod.
5. Wprowadź zmiany i kliknij „Save”.

## Jak uruchomić edytor na iPhone'ie albo iPadzie

Przejdź do Ustawień, „Własne stacje”, „Edytuj na komputerze” (na iPhone'ie Ustawienia siedzą pod Więcej, chyba że przeniosłeś je na pasek kart) i dotknij „Uruchom edytor”. Za pierwszym razem iOS pyta, czy Macdio może wyszukiwać urządzenia w twojej sieci lokalnej. Zezwól, bo inaczej przeglądarka nie dotrze do iPhone'a ani iPada.

Gdy edytor działa, sekcja „Gotowe” pokazuje „Na komputerze otwórz” z adresem oraz „Następnie wpisz ten kod” z kodem ukrytym pod kropkami, dopóki nie dotkniesz „Pokaż”. „Zatrzymaj edytor” go kończy.

## Jak uruchomić edytor na Apple TV

Otwórz Ustawienia, przejdź do karty „Edytuj na komputerze” („Edytor moich stacji”) i wybierz „Otwórz”. Na ekranie „Edytuj na komputerze” naciśnij „Uruchom edytor”.

Telewizor pokazuje „Otwórz ten adres” z adresem dużymi literami oraz „Następnie wpisz ten kod” z 6 cyframi, zawsze widocznymi. „Zatrzymaj edytor”, „Gotowe” albo przycisk Menu go zamyka. Jeśli nie da się go uruchomić, pojawia się „Spróbuj ponownie”.

## Co możesz zrobić w przeglądarce?

Adres to zwykły adres http złożony z adresu urządzenia w sieci Wi-Fi i numeru portu. Port jest wybierany od nowa przy każdym uruchomieniu, więc adres może się różnić od poprzedniego, a kod też jest za każdym razem nowy.

Strona najpierw prosi o kod. Błędny daje komunikat „That code did not work. Check the code on your device.”, czyli że kod nie zadziałał i trzeba go sprawdzić na urządzeniu.

Potem widzisz „My Stations” z liczbą stacji oraz „Reload” i „Save”. Pasek narzędzi ma pole filtra (po nazwie, adresie albo tagu), „Add station”, „Scan a website”, „Import”, „Export” i przycisk, który sortuje tabelę po nazwie. Kolumny to gwiazdka, Name, Stream URL, Logo URL, Country i Tags.

Każdy wiersz ma uchwyt do przeciągania, gwiazdkę, która robi ze stacji ulubioną, „Logo” do znalezienia logo, „Test”, który pyta twoje urządzenie, czy strumień gra, i „✕” do usunięcia wiersza. Na małym ekranie zamiast przeciągania są strzałki w górę i w dół. Gdy dwa wiersze mają ten sam adres, strona oznacza je dymkiem „Another row uses this same address”, czyli że inny wiersz używa tego samego adresu.

„Scan a website” używa tej samej wyszukiwarki co aplikacja: wymienia każdy kanał na stronie stacji z wyborem jakości, a „Add selected” wstawia je do tabeli.

Kolejność wierszy staje się kolejnością Moich stacji w aplikacji. Nic nie trafia na twoje urządzenie, dopóki nie klikniesz „Save”, a wtedy status brzmi „Saved to device”. Stamtąd zmiany synchronizują się przez iCloud z twoimi innymi urządzeniami.

## Jak importować stacje z JSON, CSV albo M3U

„Import” przyjmuje tekst, który wklejasz:

- JSON: lista stacji, każda z polami "name" i "streamURL", a opcjonalnie "logoURL", "country" i "tags".
- CSV: wiersz nagłówka `name,stream,logo,country,tags,favorite`, a potem po jednej stacji w wierszu.
- M3U: wiersz `#EXTINF:-1,` z nazwą stacji, a po nim adres strumienia.

Przyciski „Fill with a JSON example”, „Fill with a CSV example” i „Fill with an M3U example” wstawiają do pola działający przykład. Tak wygląda ten dla M3U:

```
#EXTM3U
#EXTINF:-1,Radio Paradise
https://stream.radioparadise.com/aac-320
```

„Add to list” dodaje wiersze do tabeli. Na urządzenie trafiają, gdy klikniesz „Save”.

## Jak eksportować swoje stacje

„Export” pokazuje twoje stacje jako JSON, CSV i M3U na jednym ekranie i oferuje „JSON file”, „CSV file” i „M3U file”. Pobrane pliki nazywają się macdio-stations.json, macdio-stations.csv i macdio-stations.m3u.

## Co Save robi z twoją listą stacji

Save zastępuje twoją listę własnych stacji tabelą ze strony. Twoje urządzenie zostawia wiersze, które widzisz, i usuwa każdą twoją stację, której nie ma w tabeli, a iCloud przenosi to usunięcie na każde urządzenie. W praktyce:

- Wiersz, który usuniesz przez „✕”, przy zapisie znika z każdego urządzenia, a strona wcześniej nie pyta.
- Jeśli po załadowaniu tej strony dodałeś albo zmieniłeś stacje na innym urządzeniu, kliknij „Reload”, zanim zaczniesz edytować. Zapis ze starej strony przywraca starą tabelę.
- Zostaw adres w każdym wierszu, zaczynający się od http:// albo https://. Wiersz z pustym adresem albo bez takiego początku przy zapisie wypada, a stacja, do której należał, zostaje usunięta. Przeglądarka nie dopisuje za ciebie „https://”, tak jak robi to aplikacja.

## Kiedy edytor się zatrzymuje?

Działa tylko wtedy, gdy go trzymasz otwartego. Zatrzymuje się, gdy naciśniesz stop, gdy wyjdziesz z ekranu edytora, gdy Macdio przejdzie w tło albo gdy zamkniesz kartę przeglądarki. Zatrzymuje się też, gdy przeglądarka milczy przez 2 minuty, gdy żadna przeglądarka nie połączy się w ciągu 5 minut, i po 5 błędnych kodach. Ekran telefonu albo telewizora nie gaśnie, dopóki edytor działa.

## Ograniczenia, które warto znać

- Oba urządzenia muszą być w tej samej sieci.
- Tabela mieści do 500 stacji, a naraz działa jedno skanowanie strony.
- Stacje z katalogu i twoje listy nie trafiają do edytora. Zmieniasz je w aplikacji, zobacz [ulubione, listy i synchronizacja](/guides/favorites-lists-and-sync.html).
- JSON z tej strony i JSON z „Eksportuj stacje…” na Macu to różne formaty. Każdy wczytujesz z powrotem jego własnym importem.

## Najczęstsze pytania

### Które urządzenia mają Edytuj na komputerze?

iPhone, iPad i Apple TV. Mac ma już klawiaturę i edytuje stacje w aplikacji. Apple Watch i CarPlay tego nie mają.

### Dlaczego mój komputer nie może otworzyć adresu?

Oba urządzenia muszą być w tej samej sieci Wi-Fi, ekran edytora musi zostać otwarty, a na iPhone'ie i iPadzie Macdio potrzebuje zgody na dostęp do sieci lokalnej. Adres może się zmieniać przy każdym uruchomieniu.

### Czy edytor zmienia stacje z katalogu?

Nie. W przeglądarce pojawiają się tylko stacje, które dodałeś sam, a stacje z katalogu nigdy nie są zmieniane.

### Czy mogę zaimportować playlistę stacji M3U?

Tak. Wklej tekst playlisty w Import, kliknij Add to list, potem Save. Import przyjmuje też JSON i CSV.

### Czy edytor jest bezpieczny we wspólnej sieci Wi-Fi?

Wymaga 6-cyfrowego kodu, który jest nowy przy każdym uruchomieniu, zamyka się po 5 błędnych kodach i działa tylko wtedy, gdy ekran edytora jest otwarty. Połączenie to zwykłe http wewnątrz twojej sieci.

### Co się dzieje ze stacją, którą usunę w przeglądarce?

Gdy klikniesz Save, znika z każdego urządzenia. Save zastępuje twoją listę własnych stacji tabelą ze strony, więc jeśli zmieniałeś stacje gdzie indziej, najpierw przeładuj stronę.

## Wypróbuj

Pobierz Macdio z [App Store](https://apps.apple.com/app/macdio/id6761737888), dodaj kilka stacji, a potem otwórz Edytuj na komputerze na iPhone'ie, iPadzie albo Apple TV. Jeden zakup, każde urządzenie Apple, bez subskrypcji.
