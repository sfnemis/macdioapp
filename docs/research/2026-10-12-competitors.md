# Competitor websites and App Store listings, fetched 2026-10-12

Scope: 14 apps a visitor might weigh against Macdio. Sources are each company's own site and its US App Store listing (`apps.apple.com` via WebFetch, `itunes.apple.com/lookup` for descriptions, release notes and device signals). Everything in quotes is verbatim. NOT STATED means the page did not say it; it is not a claim that the feature is missing. In-App Purchase lists on the App Store show SKU names and prices but not billing periods, so periods come only from the description or the site.

Method notes that affect confidence:

- tunein.com, radio.garden, mytuner-radio.com, streema.com and iheart.com reset every direct connection (curl and WebFetch both). Their HTML was read through the r.jina.ai rendering proxy, so what is reported for them is the post-JavaScript DOM.
- `apps.apple.com` serves only a script shell to curl. Compatibility and IAP lists were read with WebFetch, descriptions with the Lookup API.
- Mac entries that read "Requires macOS X and a Mac with Apple M1 chip or later" are the iPad binary running on Apple silicon, not a native Mac app. This is noted per app.
- Dashes inside quoted titles are reproduced as hyphens.
- Macdio (for reference, not from a competitor page): iPhone, iPad, Mac, Apple TV, Apple Watch, CarPlay; one-time purchase; 60,000+ stations; 4.7 million podcasts; on-device transcripts; Highlights export; song identification from the stream; split-track recording; synced lyrics; iCloud sync.

## 1. TuneIn

- Site: https://tunein.com/ (the site is itself a web player, "Listen Now"). Listing: https://apps.apple.com/us/app/tunein-radio-music-sports/id418987775 (seller "TuneIn", "English and 13 more").
- Platforms (listing Compatibility): iPhone "Requires iOS 16.0 or later.", iPad, Apple Vision, Apple Watch "Requires watchOS 9.0 or later." Mac and Apple TV not listed. CarPlay YES: "in your car with CarPlay and compatible vehicles like Tesla, Mercedes, and Volvo." Android YES (Google Play link on tunein.com). Watch standalone: NOT STATED.
- Pricing: listing "Free · In-App Purchases"; IAP list includes "TuneIn Premium $9.99", "TuneIn Premium $99.99", "TuneIn Premium $69.99", "Monthly Premium Subscription $14.99". Site tunein.com/premium/: "Premium $9.99/month after a 7 day trial or $79.99/year after a 7 day trial"; free tier "Free $0.00/month".
- Catalogue claim: "Access over 100,000 live AM/FM radio stations from around the world"; site: "100,000 Global Radio Stations & Podcasts".
- Features: song identification NOT STATED; recording NOT STATED; lyrics NOT STATED; podcast transcripts NOT STATED; highlights or notes export NOT STATED; sleep timer NOT STATED; alarms NOT STATED; account sync NOT STATED (only "all across your devices"); downloads NOT STATED. Premium sells content: "Live Sports: Commercial-free coverage of NHL games, college sports, racing, and more".
- Languages: one (html lang en-US); no hreflang on the homepage; the premium page carries a single `hreflang="en"`.
- Content: help centre at help.tunein.com ("Home | Support : TuneIn User Support", H1 "Hi, how can we help you?", sections "Knowledge base", "Topics", "Submit a ticket"). Press page tunein.com/press/. No blog linked from the homepage. No guides.
- Titles: home "TuneIn | Free Internet Radio | Live News, Sports, Music, Audiobooks, and Podcasts"; inner "Premium | TuneIn". H1: "TuneIn brings together live sports, music, news, audiobooks, and podcasts, hear what matters most to you!"
- Comparison pages: none on the site; the listing compares in prose ("more variety and control than platforms like Pandora or iHeartRadio").
- Structured data: homepage `WebSite`; premium page `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`.
- Does well: a two-column Free vs Premium table with trial length and both prices on one page.
- Does badly: sells brands (CNN, NHL) not app capabilities; no feature list, no platform list, no guides, so a shopper cannot tell what the app does on a Watch or in a car.

## 2. Radio Garden

- Site: https://radio.garden/ (the product is the web app; the HTML shell says only "enable JavaScript"). Listing: https://apps.apple.com/us/app/radio-garden-live/id1339670993 (seller "Radio Garden B.V.", "English", version 3.0.2 dated 2023-10-21).
- Platforms: iPhone "Requires iOS 12.0 or later.", iPad, Mac "Requires macOS 11.0 or later and a Mac with Apple M1 chip or later." (iPad app on Mac), Apple Vision. Apple TV and Apple Watch not listed. CarPlay NOT STATED. Android NOT STATED on official pages fetched. Web YES.
- Pricing: listing "Free · In-App Purchases"; IAP "Premium $2.99" and "Premium $24.99" (periods not stated). Site: NOT STATED.
- Catalogue claim: "listen to thousands of live radio stations world wide by rotating the globe."
- Features: sleep timer YES, premium, from the 3.0 release notes: "Set a timer to gently pause your audio for a peaceful sleep."; iCloud sync YES from 2.0.x notes: "iCloud syncing for favorites"; song identification, recording, lyrics, transcripts, highlights, alarms, downloads all NOT STATED.
- Languages: 23 (English plus 22 `?hl=` values: ar, da, de, el, es-419, es, fr, he, hr, id, it, ja, ko, nl, no, pl, pt-BR, pt, ro, sv, zh-Hans, zh-Hant). Language is a query parameter, no hreflang.
- Content: no blog, no help, no FAQ, no about page (radio.garden/about returns "Radio Garden - Page not found"). Only `/update-browser/` is linked.
- Titles: home "Radio Garden - Explore live radio by rotating the globe"; no inner pages. H1: none.
- Comparison pages: none.
- Structured data: none.
- Does well: the site is the product; one sentence explains it and the globe is playable in seconds.
- Does badly: nothing to read before buying: no pricing, no feature or platform page, and the iOS listing has not been updated since 2023.

## 3. myTuner Radio

- Site: https://mytuner-radio.com/ (web directory and player). Listing: https://apps.apple.com/us/app/mytuner-radio-live-stations/id520502858 (seller "Appgeneration, Software Technologies, Lda", "English and 33 more").
- Platforms: iPhone "Requires iOS 15.0 or later.", iPad, Mac "Requires macOS 12.0 or later and a Mac with Apple M1 chip or later." plus the badge "Designed for iPad. Not verified for macOS" (iPad app on Mac), Apple Vision, Apple TV "Requires tvOS 9.0 or later.", Apple Watch "Requires watchOS 8.0 or later."; description "Support for Apple Watch, Apple TV and Apple CarPlay". FAQ: "myTuner Radio works on the web, iPhone, iPad, Android phones and tablets, Windows and Mac, Apple Watch and Wear OS, Apple TV, Android TV, Samsung and LG TVs, Amazon Fire TV, Roku and Chromecast". Android YES. Watch standalone NOT STATED.
- Pricing: listing "Free · In-App Purchases"; IAP "Subscription Annual+ Trial: $19.99", "Radio Pro: Stop Ads + Music EQ: $79.99", "myTuner Radio (1 week): $0.99", "myTuner Radio (1 month): $9.99", "Annual Subscription: $34.99", "myTuner Radio (6 months): $9.99", "myTuner Radio (3 months): $14.99", "Yearly Subscription: $34.99". FAQ: "The free version includes all stations, podcasts and charts, supported by visual ads. Removing ads (in-app purchase) or using myTuner Radio Pro gives you an ad-free interface plus the equaliser, Car Mode and play-at-startup." No price on the site.
- Catalogue claim: "myTuner brings you over 50,000 radio stations and more than 1 million podcasts for free."
- Features (from the FAQ page): alarms YES "How do I set a radio alarm on myTuner? ... On iOS, first enable push notifications, then go to Settings > Clock Settings > Alarm"; sleep timer YES "On iOS, go to Settings > Clock Settings > Sleep Timer"; account sync YES "An account is only needed to save favourites, sync them across devices and keep your listening history."; song identification NOT STATED (listing has "Recently played songs on the radio"); recording, lyrics, transcripts, highlights, downloads NOT STATED.
- Languages: 18 by subdirectory (root English plus /da/ /de/ /es/ /fi/ /fr/ /id/ /it/ /ms/ /nl/ /no/ /pl/ /pt/ /ru/ /sv/ /th/ /tr/ /uk/). No hreflang tags in the rendered HTML.
- Content: FAQ page /mytuner-faq/ ("Frequently Asked Questions", 7 numbered sections incl. "4. Features: alarm, sleep timer, equaliser, car mode", "6. Free version, Pro and purchases"); footer "About us", "Broadcasters", "Widgets", "Devices and Gear". No blog.
- Titles: home "Free Internet Radio & Podcasts - Listen Online | myTuner Radio"; inner "Frequently Asked Questions" (no brand suffix). H1: "Listen to internet radio stations and podcasts, for free, on myTuner".
- Comparison pages: none. Structured data: none.
- Does well: one long FAQ that actually answers feature questions (alarm, sleep timer, sync, platforms) in plain steps, in 18 languages of directory pages.
- Does badly: the homepage is a station directory; app price appears nowhere on the site and the IAP list has nine SKUs with four different annual prices.

## 4. Broadcasts (Steven Troughton-Smith)

- Site: https://www.highcaffeinecontent.com/ (developer portfolio; the app has a card "Broadcasts Universal Streaming radio on the go Listen to streaming internet radio in an ultra-simple, single-purpose app." linking to the App Store; /broadcasts returns 404). Listing: https://apps.apple.com/us/app/broadcasts/id1469995354 (version 4.0.2 dated 2026-10-07, "English and 28 more").
- Platforms: iPhone "Requires iOS 18.0 or later.", iPad, Mac "Requires macOS 15.0 or later." (native), Apple Vision, Apple TV "Requires tvOS 15.0 or later.", Apple Watch "Requires watchOS 10.6 or later."; "Listen with just your Apple Watch (Cellular) while on a run, or on Apple TV at home." (standalone Watch); CarPlay YES "Enjoy your library on the road using CarPlay and your iPhone."; "Universal Purchase". Android: not offered. Web: none.
- Pricing: "Free · In-App Purchases"; IAP "Unlock All Features (Legacy): $9.99", "Broadcasts (One Year): $11.99", "Broadcasts (One Month): $1.99"; description "Use completely free with a handful of stations, or subscribe to unlock the full power of an unlimited library".
- Catalogue claim: "thousands available on the Station Browser".
- Features: song identification YES "Use Shazam to look up the current song, and add it to your music library." (microphone NOT STATED); transcripts for radio YES "Live Transcription uses an advanced on-device model to provide a realtime transcript so you can follow along without audio" (not podcasts); sleep timer YES "Sleep Timer."; iCloud sync YES "Sync your library across iPhone, iPad, Mac, Apple Watch, Apple Vision Pro, and Apple TV with iCloud"; downloads: 4.0 notes mention "offline caching"; recording, lyrics, highlights export, alarms NOT STATED. Privacy: "no accounts, no logins, and absolutely no tracking or analytics".
- Languages: site one (no lang attribute, no hreflang); listing 29.
- Content: personal blog at /blog/ (title "High Caffeine Content", no per-post title pattern); support is a mailto link. No help centre, no FAQ, no guides.
- Titles: "High Caffeine Content" everywhere. H1: none on the homepage.
- Comparison pages: none. Structured data: none.
- Does well: the App Store description is the clearest capability list in this set (platforms, privacy, transcription, Shazam, menu bar, StandBy clock).
- Does badly: there is no product website; a visitor who is not already in the App Store has nothing to read, search or share.

## 5. Eter (Apparent Software)

- Site: https://eter.apparentsoft.com/ (WordPress; nav "Apps About Articles Forums Support"). Listing: https://apps.apple.com/us/app/eter-stream-internet-radio/id1523221566 (seller "Apparent Software Inc.", "English and 7 more", version 3.4.1 dated 2026-09-15).
- Platforms: iPhone "Requires iOS 16.0 or later.", iPad, Mac "Requires macOS 13.5 or later." (native, "Use Eter from the Mac menu bar and hide its Dock icon (Mac only)."), Apple Vision, Apple TV "Requires tvOS 15.6 or later.", Apple Watch "Requires watchOS 8.7 or later."; "Eter on tvOS and watchOS works as a companion app." (not standalone); CarPlay YES "including CarPlay, for free."; Android YES, separate: "Eter for Android is a separate purchase from Eter". Web: none.
- Pricing: one-time. Site: "FREE $0.00" and "PREMIUM $8.99 (US)", H2 "No Subscriptions, No Ads"; press kit: "A Premium upgrade is available as a one-time in-app purchase of $8.99 USD"; listing IAP "Eter Radio Full Access: $8.99"; description "To be able to save favorite stations, you must unlock the program with a one-time In-App Purchase."
- Catalogue claim: "Stream over 40,000 global radio stations" (meta description); source "the publicly available radio-browser.info database".
- Features: song identification YES "You can optionally use Shazam automatic song recognition to know what's playing. (Available for all users.)" (microphone NOT STATED); sleep timer YES, premium, "Set a sleep timer to drift off to calming tunes"; iCloud sync YES (3.3 notes) "watch them sync automatically across your Apple devices with iCloud."; recording, lyrics, transcripts, highlights, alarms, downloads NOT STATED.
- Languages: site one (en), no hreflang; listing 8.
- Content: "Articles" blog with `BlogPosting` schema (e.g. "Eter Radio Player for Android"), Forums, Support page, Press Kit. No FAQ, no structured guides.
- Titles: home "Eter - Ad-Free Internet Radio App for Mac, iPhone, CarPlay & Android"; inner "Press - Eter", article title equals its H1. H1: "Eter - Stream Internet Radio on a Mac, iPhone, Android, Car, TV or Watch".
- Comparison pages: none. Structured data: `SoftwareApplication` on the homepage; `BlogPosting`, `Organization`, `Person` on articles.
- Does well: the only site here with a Free vs Premium price table on the homepage and a one-time price stated three times consistently.
- Does badly: keyword-stuffed title and H1, companion-only Watch and TV apps are not explained on the homepage, no guides.

## 6. Triode (The Iconfactory)

- Site: https://triode.app/ (one page). Listings: iOS https://apps.apple.com/us/app/triode-internet-radio/id1446513724; a separate Mac App Store app id1450027401 (kind `mac-software`, macOS 13.0) and a separate tvOS app id1385134220 (5 Apple TV screenshots). Seller "The Iconfactory", "English".
- Platforms: iOS listing iPhone "Requires iOS 17.5 or later.", iPad; Mac via its own app ("Download for macOS"); Apple TV via its own app ("Download for tvOS", "Listen with our Apple TV app and use AirPlay 2"); Apple Watch not listed; CarPlay YES "CarPlay and Siri Shortcuts means no fumbling with controls."; Android: not offered; web: none.
- Pricing: "Free · In-App Purchases"; IAP "Monthly Subscription $0.99", "Yearly Subscription $9.99", "Forever Purchase $29.99"; description "Triode is completely free to use. We don't put any ads in the interface or add them to the audio. An inexpensive subscription improves your experience with these options: Add Favorites ... High Quality Artwork"; site H2 "Free with no ads". No price on the site.
- Catalogue claim: "search thousands of broadcast stations by genre, name, city, or call letters".
- Features: song identification YES per version history "support for Shazam while using CarPlay" (microphone NOT STATED); iCloud sync YES "iCloud syncs your favorite stations seamlessly across every device."; "Listen Privately - No signup."; recording, lyrics, transcripts, highlights, sleep timer, alarms, downloads NOT STATED.
- Languages: one; no hreflang.
- Content: knowledge base on HappyFox at iconfactory.happyfox.com/kb/section/15/ (articles such as "Add Station to Siri", "Bandwidth and Data Usage", "Customizing Station Artwork", "Getting Purchases on All Your Devices", "Setting Up AirPlay 2"); Press Kit; "Version History" on the page itself; no blog.
- Titles: home "Triode • Listen Everywhere"; KB "Triode - The Iconfactory, Inc - powered by HappyFox". H1: "Triode".
- Comparison pages: none. Structured data: none.
- Does well: three download buttons (iOS, macOS, tvOS) above the fold and press quotes with sources.
- Does badly: a brochure with no price, help lives on a third-party domain, and the subscription-plus-forever model is only discoverable in the App Store.

## 7. Overcast

- Site: https://overcast.fm/. Listing: https://apps.apple.com/us/app/overcast-podcast-app/id888422857 (seller "Overcast Radio, LLC", "English", version 2026.10).
- Platforms: iPhone "Requires iOS 18.0 or later.", iPad, Mac "Requires macOS 15.0 or later and a Mac with Apple M1 chip or later." (iPad app on Mac; site meta: "Podcast player app for iPhone, iPad, and Apple Watch."), Apple Watch "Requires watchOS 10.0 or later." with "Apple Watch app with standalone playback and cellular streaming."; CarPlay YES "CarPlay support."; Apple TV not listed; Android: not offered; web: NOT STATED on fetched pages.
- Pricing: "Free"; "Overcast is funded by ads that promote other podcasts."; IAP "Overcast Premium $19.99", "Overcast Premium $29.99" (x2); site: "Most features are free, supported by small visual ads to promote podcasts. An annual subscription offers bonus features and can optionally hide the ads." No figure on the site.
- Features: downloads YES "Download podcasts for playing anytime, even offline."; sleep timer YES "Sleep timer automatically stops playback after any time interval you set."; transcripts: description does not mention them, release notes do; sync NOT STATED in the description; highlights export, alarms NOT STATED; song identification, recording, lyrics not applicable and NOT STATED.
- Languages: one (en); no hreflang.
- Content: no blog, no help centre (overcast.fm/help is 404), one inner page "Info for Podcasters". H2s: "Smart Speed®", "Voice Boost®", "A Normal Business", "Free", "Info for Podcasters".
- Titles: "Overcast" on the home page and on the inner page. H1: "Overcast®".
- Comparison pages: none. Structured data: none.
- Does well: "A Normal Business" states who makes it and how it is funded in two sentences, and the description quotes nine named reviews.
- Does badly: no price, no help, identical `<title>` on every page, and the Mac entry is an iPad app.

## 8. Pocket Casts (Automattic)

- Site: https://pocketcasts.com/. Listing: https://apps.apple.com/us/app/pocket-casts-podcast-player/id414834813 (seller "Automattic, Inc.", "English and 12 more", version 8.22 dated 2026-10-10).
- Platforms: iPhone "Requires iOS 17.0 or later.", iPad, Apple Vision, Apple TV "Requires tvOS 26.0 or later." (blog: "Pocket Casts on the big screen"), Apple Watch "Requires watchOS 10.0 or later." ("Control playback, volume and effects from our Apple Watch app"); Mac not on the iOS listing but the site has "Pocket Casts for Mac" (/downloads) and "Listen on Mobile"; CarPlay YES "Everywhere: CarPlay, AirPlay, Chromecast and Sonos."; Android YES (Google Play link); web player YES (support centre section "Web Player").
- Pricing: "Free · In-App Purchases", age rating "Contains Advertising"; IAP "Plus Monthly $3.99", "Plus Yearly $39.99", "Patron Monthly $9.99", "Patron Yearly $99.99". Site /plans ("Plans - Pocket Casts") renders prices client-side; the HTML carries only "Folders", "Patron", "Everything in Plus".
- Features: transcripts YES (blog "Read along as you listen: Highlighted Transcripts are here!"; "AI Generated Chapters Are Here"); bookmarks ("Smart Bookmarks: save the words, not the timestamp"), export NOT STATED; sleep timer YES "Sleep timer: We'll pause your episode so you can rest your weary head."; account sync YES "Subscriptions, Up Next, listening history, playback and filters are all securely stored in the cloud."; downloads YES "Auto download: Automatically download episodes for offline playback."; alarms NOT STATED; song identification, recording, lyrics NOT STATED.
- Languages: site served in one language with a footer `<select>` "Language" offering Català, Dansk, Deutsch, English, Español, Français, Italiano, Nederlands, Norsk, Polski, Portugues (Brazil), Pусский, Svenska, 日本語, 简体中文 and more; no per-language URLs, no hreflang.
- Content: blog at blog.pocketcasts.com ("Pocket Casts Blog", WordPress list of release posts and listener interviews); help centre at support.pocketcasts.com ("Pocket Casts Support - Support Center", H1 "Help Center", sections "Android", "iOS", "Web Player", "General", categories "Playing episodes", "Managing podcasts", "Sync account basics", "Files & Subscriptions", "Tools & customization", "Troubleshooting", plus a "Chat assistant"); /plans, /downloads, press page.
- Titles: home "Listen to podcasts with the best free podcasting app - built by listeners, for listeners. - Pocket Casts" (101 characters); inner "Plans - Pocket Casts", "Pocket Casts for Mac - Pocket Casts". H1: none on the homepage (the hero is an image).
- Comparison pages: none found on their domains. Structured data: none on home, plans or support.
- Does well: the fullest content stack in the field: per-platform help centre, active blog, plans page, downloads page.
- Does badly: no H1, an over-long title, no structured data, and the one page a buyer wants (plans) has no prices in its HTML.

## 9. Castro (Maple Media)

- Site: https://castro.fm/. Listing: https://apps.apple.com/us/app/castro-podcast-app-player/id1080840241 (seller "Maple Media Apps, LLC", "English, French, German", version 2026.7.2).
- Platforms: iPhone "Requires iOS 16.0 or later.", iPad ("Designed for iPad"), Mac "Requires macOS 13.0 or later and a Mac with Apple M1 chip or later." (iPad app on Mac), Apple Vision, Apple Watch "Requires watchOS 8.1 or later." ("Apple Watch app to control playback and select another episode from your queue.", companion); CarPlay YES "CarPlay support makes it easy to pick up where you left off while driving."; Apple TV not listed; Android: NOT STATED (site: "Castro is the iPhone podcast player for podcast fanatics."); web: none.
- Pricing: "Free · In-App Purchases"; site homepage shows "$24.99/year Castro Plus Advanced playback features, Sideloading, Night Mode, Custom App Icons" next to "Free Castro"; description "Castro Plus is an optional paid subscription available for $24.99/year (includes a one-week trial)."; IAP "Castro Plus Annual: $24.99", "Castro Plus Monthly: $3.99", "Castro Plus Quarterly: $9.99", "Castro Plus Family Plan: $39.99".
- Features: downloads YES "Queued episodes are downloaded automatically."; sleep timer YES "thoughtfully designed sleep timer"; sync mentioned only in release notes ("Fix for folders syncing across devices") and support ("Why aren't my Devices Syncing?"); transcripts: only a user review mentions them, so NOT STATED; highlights export, alarms NOT STATED; "Sideloading: Import audio files directly, just by dropping them in iCloud Drive".
- Languages: one (en-US); no hreflang.
- Content: blog /blog ("Blog - Castro Podcasts"); support /support is a single FAQ page ("How To ...": "Open Podcast Settings", "Adding Podcasts that Require Authentication", "Export Subscriptions", "Import Subscriptions", "Sleep Timer Tips"; troubleshooting: "Episodes are Delayed or Missing", "Why aren't my Devices Syncing?"); press kit; merchandise.
- Titles: home "Castro Podcasts"; inner "Support - Castro Podcasts", "Blog - Castro Podcasts". H1: "The podcast app for podcast lovers" (a second H1 "Sign up to stay up to date" repeats on every page).
- Comparison pages: none. Structured data: none.
- Does well: the yearly price sits on the homepage beside the free tier, and the feature H2s read as benefits ("Save listening time", "Make every podcast sound great").
- Does badly: one-page support, duplicate newsletter H1 on every page, no structured data, no guides.

## 10. Apple Podcasts (web presence only)

- Site: https://www.apple.com/apple-podcasts/. Listing: https://apps.apple.com/us/app/apple-podcasts/id525463029 (seller "Apple Inc.", "English and 32 more"). User guide: https://support.apple.com/guide/podcasts/welcome/mac ("Apple Podcasts User Guide for Mac - Apple Support").
- Platforms (iOS listing): iPhone "Requires iOS 10.0 or later.", iPad, Apple Vision, Apple Watch "Requires watchOS 5.1 or later."; Mac and Apple TV are not on the iOS listing (built-in apps; a Mac user guide exists); CarPlay YES "Listen on-the-go with CarPlay and Apple Watch."; Android NOT STATED; web NOT STATED on the pages fetched.
- Pricing: "Free", no IAP listed; site H2 "Subscribe for even more of what you love." (channel subscriptions).
- Features: podcast transcripts YES "Read along with a transcript as your episode plays." and site H2 "Transcripts put it all in writing."; sharing from the transcript YES "Share a specific moment in an episode from the transcript." (export to notes NOT STATED); sleep timer YES "set sleep timers"; sync YES "Seamlessly sync your shows across Apple devices."; downloads YES "download and play offline"; song identification, recording, lyrics, alarms NOT STATED.
- Languages: country subdirectories (/de/apple-podcasts/ and /tr/apple-podcasts/ both verified live); no hreflang on the US page's HTML.
- Content: on-page FAQ section ("Questions? Answers.") with `FAQPage` schema; full user guide with a sidebar table of contents (topics include "Read along with episode transcripts", "Sync podcasts across devices", "Save, download, or remove episodes"); no blog.
- Titles: home "Apple Podcasts - Apple"; localized "Apple Podcasts - Apple (DE)". H1: "Apple Podcasts". H2s are feature-led: "Hello, video.", "Precise audio control. You heard that right.", "More places to listen."
- Comparison pages: none. Structured data: `Organization`, `SoftwareApplication`, `FAQPage` (with `Question`/`Answer`), `ContactPoint`.
- Does well: feature-led sections plus an FAQ with schema and a real user guide; the only competitor pairing marketing page and documentation.
- Does badly: no platform table and no mention of a price (because there is none); the iOS listing omits Mac and Apple TV, so the whole-platform story is split across places.

## 11. Snipd

- Site: https://www.snipd.com/. Listing: https://apps.apple.com/us/app/snipd-ai-podcast-player/id1557206126 (seller "Snipd AG", "English", version 4.3.14 dated 2026-10-08).
- Platforms: iPhone "Requires iOS 15 or later.", Apple Vision, Apple Watch "Requires watchOS 10.4 or later." (release notes "Fix Apple Watch performance issues"); iPad, Mac, Apple TV not listed (iPhone-only binary; the Lookup API has no `iosUniversal` flag); CarPlay YES per release notes "Fix CarPlay performance and crashing issues"; Android NOT STATED on the pages fetched (no Google Play link on the homepage HTML); web: none.
- Pricing: "Free" with IAP; site /pricing: "Free Plan ... $0 /month ... Unlimited listening to all podcasts", "Premium Plan Everything in Free + AI superpowers Monthly Annual $ 6.99 /month Includes 1 week free trial", "Prices may vary by country. For exact pricing, please check the App Store in your region."; IAP "Snipd Premium: $83.90", "$95.90", "$71.90", "$11.90", "$11.99", "Snipd Premium (Special Offer): $42.00", "$59.90".
- Features: podcast transcripts YES "Enjoy engaging, real-time animated podcast transcripts."; highlights and notes export YES "Sync with tools like Notion and Readwise for personal knowledge management." and on the pricing page "Notion, Readwise, Obsidian, Glasp, Bear, Logseq, or export as Markdown"; blog "Sync Your Podcast Highlights to Obsidian"; Apple Notes NOT STATED; sync YES (notes) "player progress sync across multiple devices"; downloads YES (blog "Smart Auto Downloads"); sleep timer NOT STATED; alarms, song identification, recording, lyrics NOT STATED.
- Languages: one (en); no hreflang.
- Content: blog /blog ("The Snipd Blog") mixing release posts with how-to guides ("How to Take Notes from Podcasts: A Complete Guide", "How to Integrate Podcasts Into Your PKM System", "How to Take Notes from Podcasts While Running (Without Your Phone)"); help centre support.snipd.com/en/ (Intercom, "Home | Snipd Help Center", H1 "How can we help you?"); pricing page with an FAQ block.
- Titles: home "Snipd - The Podcast App for Knowledge Seekers"; inner "Snipd Pricing - Try Premium for Free"; blog post title equals its H1. H1: "The Podcast App for Knowledge Seekers" (also used as the H1 of the pricing page).
- Comparison pages: none on their domain (third-party alternative pages exist). Structured data: none on home or pricing; help centre `WebSite`.
- Does well: guides written around a use case (PKM, Obsidian, running) and a pricing page that names every export destination.
- Does badly: never says it is iPhone-only, no structured data, same H1 on home and pricing, and the App Store IAP prices (up to $95.90) do not match the "$6.99 /month" on the site without the billing period.

## 12. Simple Radio (Streema)

- Site: https://streema.com/mobile/ (app page) and https://streema.com/ (web directory and player, "Welcome to the World of Online Radio"). Listing: https://apps.apple.com/us/app/simple-radio-fm-am-stations/id891132290 (seller "Streema, Inc.", "English and 16 more").
- Platforms: iPhone "Requires iOS 15.0 or later.", iPad, Mac "Requires macOS 12.0 or later and a Mac with Apple M1 chip or later." (iPad app on Mac), Apple Vision, Apple Watch "Requires watchOS 8.0 or later." with "Works great as a companion app or in standalone mode (no iPhone nearby required)"; Apple TV not listed; CarPlay NOT STATED; Android YES ("Download from the Google Play Store"); web YES (streema.com).
- Pricing: "Free · In-App Purchases"; IAP "Simple Radio Unlimited $39.99" (repeated), "$24.99", "$5.99", "$3.99" (periods not stated); description "You'll never see a display ad within our app again!" and "Remember that in-app purchases cannot be shared with family members." No price on the site.
- Catalogue claims conflict: listing "Play 90,000+ worldwide radio stations", site meta "more than 45,000 radio stations", site body "Listen to 45,000+ stations".
- Features: sleep timer YES, premium: "You'll be able to set the Sleep Timer to fall asleep to your favorite station"; song identification, recording, lyrics, transcripts, highlights, alarms, sync, downloads NOT STATED.
- Languages: one; no hreflang; streema.com has no `lang` attribute.
- Content: help centre help.streema.com ("Help / FAQs", Salesforce-style /s/article/faq, "Contact Us (web form)"); blog blog.streema.com; the app page lists "Features" and testimonials.
- Titles: app page "Simple Radio by Streema - The Best App to Listen to Live Radio Stations"; directory "Streema - Listen to Live Internet Radio - Global AM and FM Online Radio Stations". H1 (app page): "The simplest way to listen to your favorite AM/FM radio stations." plus three more H1s ("Features", "Join millions listening to our radio tuner!").
- Comparison pages: none. Structured data: none.
- Does well: a dedicated app landing page separate from the directory, with a Watch section and reliability as the pitch.
- Does badly: station counts disagree by a factor of two, no price anywhere on the site, four H1s on one page.

## 13. radio.net (radio.de GmbH)

- Site: https://www.radio.net/ (web player; national editions such as radio.de). Listing: https://apps.apple.com/us/app/radio-net-am-fm-radio-tuner/id402206359 (seller "radio.de GmbH", "English and 9 more", version 5.11.15 dated 2026-09-28).
- Platforms: iPhone "Requires iOS 17.0 or later.", iPad, Mac "Requires macOS 14.0 or later and a Mac with Apple M1 chip or later." (iPad app on Mac), Apple TV "Requires tvOS 15.6 or later."; Apple Watch not listed; CarPlay YES "The perfect daily companion for every ride - now with Apple CarPlay."; Android YES (site "Supports Carplay & Android Auto", footer "Apps iPhone iPad Android"); web YES.
- Pricing: "Free · In-App Purchases"; IAP "radio.net PRIME - Monthly $2.99", "radio.net PRIME - Yearly $25.99"; description "With a Prime subscription, you can listen to radio.net without any distractions. You can enjoy an ad-free listening experience, no video or banner ads and completely free of ad tracking."
- Catalogue claim: "More than 60,000 radio stations", "Subscribe and listen to over 2.2 million podcasts".
- Features: sleep timer YES "Sleep timer lets you gently fall asleep listening to your favorite channel or podcast"; downloads YES "Download episodes and listen to them whenever and wherever you want, even when you're offline."; account sync YES "If you create a free user account ... your favorites are automatically synchronized"; recording NOT STATED ("Missed a broadcast? Then simply catch up!" is catch-up content); song identification, lyrics, transcripts, highlights, alarms NOT STATED.
- Languages: 10 languages across 20 hosts, declared with 23 hreflang alternates: country code TLDs (radio.de, radio.at, radio.fr, radio.it, radio.es, radio.pl, radio.pt, radio.se, radio.dk) plus country subdomains (uk., au., ca., ie., nz., za., co., mx., br., nl.radio.net) and `x-default` pointing to /country-selector.
- Content: FAQ block on the homepage ("What you should know about radio stations", `FAQPage` schema) and on /app ("Free radio app for Android and iPhone | radio.net", `FAQPage`); help via Zendesk ("Help / FAQ", radio.zendesk.com); press at corporate.radio.net; no blog (/blog is 404). Every station has its own page.
- Titles: home "Free internet radio and music streaming online" (no brand); station page "KEXP Radio: Live Seattle Washington Independent Rock Jams"; app page as above. H1: "Radio Your Way" (radio.de: "Einfach Radio hören").
- Comparison pages: none. Structured data: home `FAQPage`, `Organization`, `WebSite`, `BreadcrumbList`; station page `RadioStation`, `AggregateRating`, `BreadcrumbList`, `WebPage`, `SpeakableSpecification`, `PostalAddress`.
- Does well: the strongest SEO build in the set: 20 localized hosts with hreflang, a page per station with `RadioStation` schema, FAQ schema on home and app pages.
- Does badly: the brand is missing from the homepage title, the app's features and PRIME price live only in the App Store, and the /app page is a generic store-badge page.

## 14. iHeartRadio

- Site: https://www.iheart.com/ (web player with "Presets"). Listing: https://apps.apple.com/us/app/iheart-radio-music-podcasts/id290638154 (seller "iHeartMedia Management Services, Inc.", "English, French, Spanish", version 10.67.0).
- Platforms: iPhone "Requires iOS 15.0 or later.", iPad, Apple Vision, Apple Watch "Requires watchOS 9.0 or later." ("Stream songs, podcasts & live sports on any device, including Apple Watch."); Mac and Apple TV not listed; CarPlay NOT STATED on the listing; Android YES (Google Play link on iheart.com); web YES.
- Pricing: "Free · In-App Purchases"; IAP "iHeartRadio Plus $6.99", "iHeartRadio All Access $12.99"; description "Listen ads-free and take control of your listening experience with iHeartRadio Plus™ and iHeartRadio All Access™."; upgrade page "iHeart Plus & All Access - Upgrade to a Free Trial | iHeart" renders prices client-side (not captured).
- Catalogue claim: "Stream 1000s of live radio stations & unlimited music playlists".
- Features: lyrics YES (release notes) "You can see the lyrics on the iHeartRadio app for songs on artist radio, playlists, and even live radio!"; downloads YES, paid: "Download music to your iPhone, iPad or Apple Watch to listen offline"; replay of radio songs YES, paid: "Save and replay any song with our music app from the radio"; song identification NOT STATED; recording NOT STATED; transcripts, highlights, sleep timer, alarms, sync NOT STATED.
- Languages: one (en-US); no hreflang.
- Content: blog blog.iheart.com; help help.iheart.com (Cloudflare challenge page, not readable); footer "Help", "Advertise", "Brand Guidelines", "Contest Guidelines".
- Titles: home "Listen to Your Favorite Music, Podcasts, and Radio Stations for Free!" (no brand); inner "iHeart Plus & All Access - Upgrade to a Free Trial | iHeart". H1: none.
- Comparison pages: none. Structured data: home none; upgrade page `WebSite`.
- Does well: a web player plus an upgrade page with a free-trial call to action and two clearly named tiers.
- Does badly: it is a media portal, not an app site: no H1, brandless title, help behind a bot wall, the app's features are nowhere on the site.

## Synthesis

1. Help or docs: 9 of 14 have some help surface (TuneIn, myTuner FAQ, Triode KB, Pocket Casts, Castro, Apple user guide, Snipd, Streema, radio.net Zendesk); only Pocket Casts and Apple organise it by topic with navigation; Castro and myTuner are a single FAQ page; Radio Garden, Broadcasts, Eter, Overcast and iHeart (unreadable) have none worth the name.
2. Blogs: 7 (Broadcasts via personal blog, Eter, Pocket Casts, Castro, Snipd, Streema, iHeart). Only Snipd publishes how-to guides tied to use cases; the rest are release notes and news.
3. Localisation: 4 localise the site (radio.net 10 languages on 20 hosts with hreflang; myTuner 18 by subdirectory without hreflang; Radio Garden 23 via `?hl=`; Apple by country subdirectory). The 10 others are English only. Nobody in the indie Apple group (Broadcasts, Eter, Triode, Overcast, Castro) localises.
4. Comparison or "alternative" pages: zero of 14. Every "X alternative" result on the web for these names belongs to alternativeto.net, saashub or toolradar, not to the vendors.
5. Structured data: 4 use it (radio.net richly, Apple, Eter `SoftwareApplication`, TuneIn `WebSite`); 10 have none, including every podcast app except Apple.
6. Pricing on the vendor site: only Eter, Castro, Snipd and TuneIn state a figure; Triode, Overcast, Pocket Casts, Broadcasts, myTuner, Simple Radio, radio.net and Radio Garden leave it to the App Store. One-time pricing exists only at Eter ($8.99) and as Triode's "Forever Purchase $29.99" beside a subscription.
7. Platform honesty: six "Mac" entries are iPad apps on Apple silicon; only Broadcasts, Eter and Triode (separate app) ship native Mac. No site shows a platform matrix with Watch standalone, Apple TV and CarPlay side by side.
8. Feature coverage gaps across the whole field: no competitor states song identification from the stream without a microphone (Broadcasts, Eter and Triode name Shazam without saying how); none states live radio recording; none states lyrics for radio except iHeart in release notes; podcast transcripts appear at Apple, Pocket Casts, Snipd (and Overcast in notes); highlights export only at Snipd; alarms only at myTuner.
9. Catalogue numbers are unverifiable and inconsistent (Simple Radio 45,000 vs 90,000+), so a sourced, dated station and podcast count is itself a differentiator.
10. Gap for Macdio: a platform matrix page (iPhone, iPad, Mac native, Apple TV, Watch standalone or not, CarPlay) with the one-time price on the same screen; nobody has it.
11. Gap: honest comparison pages ("Macdio vs TuneIn", "vs Pocket Casts", "vs Snipd") built from the quotes above; the field has none, and third-party alternative sites currently own those queries.
12. Gap: use-case guides in the Snipd style but for radio and podcasts together (record a show while you sleep, identify a song from a stream, export highlights to Apple Notes and Obsidian, listen on Apple TV without a phone), with `FAQPage` and `SoftwareApplication` schema, which only radio.net and Apple use at all.
13. Gap: localised guides with hreflang. Only radio.net does hreflang correctly; a 14-language Macdio site with proper alternates would be the second.
14. Gap: a help centre organised by platform (Pocket Casts is the only one), plus a stated "no account, no ads, one price" page in Overcast's "A Normal Business" register.
15. Risk to copy: Eter's keyword-stuffed H1 and TuneIn's brand-first page both hide the app; Macdio's homepage should state the device list and the price in the H1 area and keep the title under 60 characters with the brand in it.
