---
title: "Jak nagrywać radio internetowe na Macu (krok po kroku)"
description: "Trzy sposoby nagrywania radia internetowego na Macu i co działa na iPhone'ie: odtwarzacz z nagrywaniem, narzędzie do dźwięku systemu albo Audacity."
datePublished: 2026-08-09
lastUpdated: 2026-10-12
faq:
  - q: "Jakiej jakości są nagrania?"
    a: "Identycznej ze strumieniem. Przychodzący dźwięk jest zapisywany tak, jak dociera, bez ponownego kodowania, więc stacja 128 kbps daje plik 128 kbps, a stacja 320 kbps daje plik 320 kbps."
  - q: "Czy mogę wyeksportować nagranie do Findera albo aplikacji Pliki?"
    a: "Nie. Nagrania zostają w aplikacji na twoim urządzeniu, gdzie możesz je odtwarzać lub usuwać. Nie ma dla nich udostępniania, eksportu ani synchronizacji plików przez iCloud."
  - q: "Czy mogę nagrywać, używając innych aplikacji?"
    a: "Tak. Nagrywanie przechwytuje strumień, a nie głośniki, więc trwa w tle na Macu i iPhone'ie, gdy robisz coś innego, i przy wygaszonym ekranie."
  - q: "Czy mogę nagrywać na Apple Watch albo Apple TV?"
    a: "Nie. Nagrywanie to funkcja Maca, iPhone'a i iPada. Aplikacje na zegarek i telewizor odtwarzają stacje i sterują odtwarzaniem."
  - q: "Jak nagrać audycję radiową, która leci w nocy?"
    a: "Uruchom nagrywanie przed pójściem spać i pozwól, by trzygodzinny limit je zakończył, albo podnieś ten limit w ustawieniach, jeśli audycja jest dłuższa. Nie ma harmonogramu, który sam uruchamia nagrywanie."
---

Trzy sposoby, co każdy z nich cię kosztuje i gdzie lądują pliki.

**Najłatwiejszy sposób nagrywania radia internetowego na Macu to odtwarzacz radiowy z wbudowanym nagrywaniem, bo zapisuje sam strumień i nie potrzebuje żadnego kierowania dźwięku. Nagrywanie całego systemu narzędziem do przechwytywania też działa i jest jedyną opcją, gdy dźwięk pochodzi ze strony internetowej albo aplikacji, która nie potrafi nagrywać. Na iPhone'ie istnieje tylko droga wbudowana.**

## Po co w ogóle nagrywać radio internetowe

Większość próśb sprowadza się do jednej z trzech rzeczy: audycji, która leci, gdy śpisz albo jesteś w pracy, setu DJ-a, który chcesz zachować, bo nigdy nie zostanie nigdzie opublikowany, albo pojedynczego utworu, który usłyszałeś raz i chcesz znaleźć ponownie. Strumienie są na żywo i nic nie jest dla ciebie przechowywane, więc jeśli chcesz coś mieć później, musisz to złapać, gdy przelatuje.

## Metoda 1: nagrywaj odtwarzaczem, który ma to wbudowane

Odtwarzacz, który nagrywa, zapisuje przychodzący strumień na dysk. Nic nie jest ponownie kodowane, żadne dźwięki systemowe nie przeciekają, a powiadomienie w trakcie nagrywania nie trafia do pliku. [Macdio](/mac.html) robi to na Macu i na [iPhone'ie](/iphone.html) tym samym przyciskiem.

Włącz stację, potem naciśnij nagrywanie. Wybierz Ciągłe, żeby mieć jeden plik na sesję, albo Podziel według utworu, żeby sesja była cięta przy każdej zmianie utworu. Zostaw to włączone, używaj innych aplikacji i naciśnij stop, gdy skończysz. Sesja od razu pojawia się w zakładce Nagrania.

Podziel według utworu to część, którą warto znać. Obserwuje informacje o utworze przychodzące wewnątrz strumienia i tnie przy każdej zmianie, więc dwugodzinna audycja staje się listą nazwanych utworów z okładkami zamiast jednego długiego pliku, przez który trzeba się przewijać. Gdy stacja nie wysyła nic przydatnego, a sporo z nich tak robi, Macdio rozpoznaje utwór z dźwięku, który już ma w ręku, więc nazywanie trwa dalej przy wygaszonym ekranie i bez proszenia o zgodę na mikrofon. [Poradnik o rozpoznawaniu utworów](/guides/identify-song-on-radio.html) opisuje, jak działa ta część.

Kompromis jest taki, że wbudowany rejestrator nagrywa tylko to, co odtwarzacz może grać. Przechwytuje radio internetowe i nic więcej, więc rozmowa wideo albo karta przeglądarki są poza zakresem.

## Metoda 2: przechwyć cały system z Audio Hijack

Audio Hijack od Rogue Amoeba nagrywa dźwięk z dowolnej aplikacji na Macu albo cały dźwięk systemowy naraz, więc obejmuje strumienie, które mieszkają w karcie przeglądarki albo w odtwarzaczu bez rejestratora. Wersja 4.6.0 działa od macOS 14.4 do macOS 27 i można ją pobrać za darmo, z ograniczeniami do czasu zakupu licencji, według strony produktu Rogue Amoeba (sprawdzono 14 września 2026).

Wybierasz aplikację źródłową, dodajesz blok rejestratora i naciskasz przycisk uruchomienia. To więcej konfiguracji niż przycisk nagrywania, i jest haczyk, który warto zaplanować: cokolwiek gra Mac, ląduje w pliku. Powiadomienie ze Slacka w czterdziestej minucie jest w nagraniu na zawsze. Daje też jeden długi plik bez pojęcia, gdzie utwór się zaczyna i kończy, więc praca nad tracklistą należy potem do ciebie.

## Metoda 3: Audacity plus wirtualne urządzenie audio

Audacity jest darmowe i otwartoźródłowe, co czyni je zwykłą odpowiedzią na forach, ale macOS nie pozwala aplikacji samej nagrywać dźwięku systemowego. Trzeba najpierw zainstalować wirtualne urządzenie audio, na przykład darmowe i otwartoźródłowe BlackHole, skierować przez nie wyjście Maca, a potem ustawić Audacity, by nagrywało z tego urządzenia. Chcesz też słyszeć, co nagrywasz, co oznacza urządzenie z wieloma wyjściami w Konfiguratorze MIDI Audio, żeby dźwięk trafiał zarówno do głośników, jak i do rejestratora.

Działa, nic nie kosztuje i jest najbardziej upierdliwe z trzech. Plus jest taki, że Audacity to edytor, więc przycinanie, wyciszanie i eksport w konkretnym formacie są pod ręką, gdy przechwytywanie jest gotowe.

## Którą metodę wybrać

Jeśli stacja jest w aplikacji radiowej, użyj własnego rejestratora aplikacji. To jedyna droga, która daje czysty dźwięk i podział na utwory bez dodatkowego oprogramowania. Jeśli dźwięk jest gdzie indziej albo nagrywasz wywiad do podcastu i podkład muzyczny jednocześnie, Audio Hijack to narzędzie zbudowane do tego zadania. Audacity to wybór, gdy budżet wynosi zero, a popołudnie konfiguracji jest do przyjęcia.

## Jak nagrywać radio na iPhone'ie

Tutaj istnieje tylko pierwsza metoda. iOS nie daje żadnej aplikacji dostępu do przechwytywania dźwięku systemowego, więc nie ma odpowiednika Audio Hijack na iPhone'a, a nagrywanie ekranu też nie zapisze czystego strumienia. Odtwarzacz z wbudowanym nagrywaniem to cała lista.

W Macdio to ten sam przycisk co na Macu. Dotknij nagrywania, gdy gra stacja, a nagrywanie trwa, gdy używasz innych aplikacji, bo zapisywany jest strumień, a nie słucha mikrofon. Nagrania pojawiają się w zakładce Nagrania, jak tylko zatrzymasz.

## Czy można zaplanować nagranie?

Nie w Macdio. Nie ma timera, który uruchamia stację w czwartek o 21:00, i jest to na liście życzeń, a nie w aplikacji. Na Macu Audio Hijack to najbliższa dostępna dziś rzecz, albo automatyzacja w Skrótach może otworzyć stację o ustalonej godzinie, a ty sam naciskasz nagrywanie.

To, co Macdio ma, to zabezpieczenie w drugą stronę: sesja zatrzymuje się sama po trzech godzinach, więc nagranie, o którym zapomniałeś, nie zjada dysku przez noc. Limit można zmienić w ustawieniach, gdy nagrywasz długą audycję, a pozostały czas jest pokazany w trakcie nagrywania.

## Co kończy nagranie wcześniej

Dwie rzeczy kończą sesję przed tobą i obie zapisują plik, zamiast go tracić. Pierwsza to trzygodzinny limit powyżej. Druga to dysk. Macdio nie zacznie nagrania, gdy wolnego miejsca jest mniej niż 500 MB, obserwuje wolne miejsce podczas zapisu, ostrzega co pięć minut, gdy dysk spadnie poniżej 500 MB, i zatrzymuje nagrywanie z powiadomieniem, jeśli miejsca jest krytycznie mało, więc najgorszy przypadek to krótszy plik, a nie pełny dysk i uszkodzony plik. Długa nocna sesja na prawie pełnym laptopie to przypadek do pilnowania, bo stacja 320 kbps zapisuje około 144 MB na godzinę.

## Jak duże robią się pliki

Nagranie jest tak ciężkie jak strumień, bo nic nie jest dodawane ani dodatkowo kompresowane. Przy 128 kbps, najczęstszym bitrate, to mniej więcej 58 MB na godzinę, więc pełny wieczór radia to około 350 MB. Stacja 320 kbps to około 2,4 MB na minutę, a stacja mówiona z niskim bitrate może być ćwiercią tego. Podziel według utworu czyni tę arytmetykę w praktyce przyjaźniejszą, bo zachowujesz trzy utwory, których chciałeś, a resztę usuwasz.

## W jakim formacie są pliki

Nagranie zachowuje to, co wysyła stacja. Stacja MP3 daje ci .mp3, a stacja AAC daje ci .aac, bez ponownego kodowania po drodze na dysk, więc plik brzmi dokładnie jak strumień. Gdy Song ID nazwie utwór w nagraniu AAC, jego tytuł, wykonawca i okładka trafiają do pliku, który staje się wtedy plikiem .m4a. Nie ma tu ustawienia jakości, które można zepsuć, bo dźwięk nigdy nie jest kodowany drugi raz.

## Gdzie mieszkają nagrania

W aplikacji, na twoim własnym urządzeniu, w zakładce Nagrania, gdzie każdą sesję i każdy wycięty utwór można odtworzyć lub usunąć. Nie są kopiowane do biblioteki muzyki, nie pojawiają się w aplikacji Pliki ani w Finderze i nie ma przycisku udostępniania ani eksportu. To celowe ograniczenie funkcji nagrywania na własny użytek, a nie coś, co czeka na dokończenie, i utrzymuje nagranie prywatnym. Nic nie jest nigdzie wysyłane.

## Czy nagrywanie radia internetowego jest legalne?

Nagrywanie audycji do własnego prywatnego słuchania to od dawna praktykowany zwyczaj w większości krajów, ta sama tradycja co nagrywanie FM na kasetę. Co zostaje prywatne, zostaje proste: nie rozpowszechniaj ani nie publikuj ponownie nagrań i sprawdź zasady w swoim kraju, jeśli nie masz pewności. To informacja ogólna, a nie porada prawna.

## Najczęstsze pytania

### Jakiej jakości są nagrania?

Identycznej ze strumieniem. Przychodzący dźwięk jest zapisywany tak, jak dociera, bez ponownego kodowania, więc stacja 128 kbps daje plik 128 kbps, a stacja 320 kbps daje plik 320 kbps.

### Czy mogę wyeksportować nagranie do Findera albo aplikacji Pliki?

Nie. Nagrania zostają w aplikacji na twoim urządzeniu, gdzie możesz je odtwarzać lub usuwać. Nie ma dla nich udostępniania, eksportu ani synchronizacji plików przez iCloud.

### Czy mogę nagrywać, używając innych aplikacji?

Tak. Nagrywanie przechwytuje strumień, a nie głośniki, więc trwa w tle na Macu i iPhone'ie, gdy robisz coś innego, i przy wygaszonym ekranie.

### Czy mogę nagrywać na Apple Watch albo Apple TV?

Nie. Nagrywanie to funkcja Maca, iPhone'a i iPada. Aplikacje na zegarek i telewizor odtwarzają stacje i sterują odtwarzaniem.

### Jak nagrać audycję radiową, która leci w nocy?

Uruchom nagrywanie przed pójściem spać i pozwól, by trzygodzinny limit je zakończył, albo podnieś ten limit w ustawieniach, jeśli audycja jest dłuższa. Nie ma harmonogramu, który sam uruchamia nagrywanie.

## Gotowy spróbować?

Pobierz Macdio z [App Store](https://apps.apple.com/app/macdio/id6761737888). Jeden zakup, każde urządzenie Apple, bez subskrypcji.
