# Keywords and SERPs for the macdio.app redesign

Date: 2026-10-12. Scope: English search landscape for 24 seed terms, page map, guide hub outline, GEO rules, localisation notes. Prepared for the website redesign; nothing here has been implemented.

## 0. Method and limits

- Tools: WebSearch (US index, standard then extended mode) and WebFetch on ranking pages. No browser session, so Google's own result page was never rendered.
- AI Overview: NOT observable with these tools. The search tool returns its own summary, not Google's. Each term says "n/o" (not observable) plus whether the query is question-shaped, which is the only hint available. Verify in a real browser before relying on it.
- "People also ask": not exposed by the tool. The questions listed are the FAQ headings of the pages that rank on page one, which is the closest verifiable proxy.
- Search volumes: none of the sources stated a volume, so every term is "volume: unknown". Google Search Console for macdio.app could not be read: the configured service account has no permission on the property (both `sc-domain:macdio.app` and `https://macdio.app/` refused on 2026-10-12). Fixing that access is the cheapest way to replace "unknown" with real impressions.
- Live site checked: https://macdio.app/sitemap.xml (32 URLs) and https://macdio.app/guides/ (lists 9 guides, not 10; the sitemap also has 9 guide URLs).

## 1. SERP map per seed term

Fields per term: page types on page one; who ranks (URL); intent; AIO (n/o = not observable); questions seen as FAQ headings on ranking pages; volume.

### 1.1 Radio terms

**best radio app**
- Page types: listicles (UK and Android heavy), one App Store review page, one forum.
- Ranks: https://mobile.asda.com/scoop/best-radio-apps-for-ios-and-android, https://ubuntupit.com/best-radio-apps-for-iphone/, https://www.androidauthority.com/best-radio-apps-for-android-393884/, https://appfigures.com/reviews/281807303559LUkYVYRF55804h-DTvepPYQ (Triode review), https://forums.crackberry.com/blackberry-os-apps-f35/best-radio-app-577211-print/
- Intent: compare. AIO: n/o; not question-shaped.
- Questions seen: none visible.
- Volume: unknown.

**best radio app iphone**
- Page types: 2026-dated listicles, MacRumors forum thread, one vendor blog ranking itself first, one App Store page.
- Ranks: https://setapp.com/app-reviews/best-radio-apps (updated 30 Sep 2026, author Olha Novitska, Eter first), https://macmyths.com/best-radio-apps-for-iphone-and-ipad-live-stations-sports-and-more-2026/ (10 Aug 2026, 15 apps, Receiver at $3.99 up front), https://tttradionetwork.com/best-radio-apps-in-2026/ (403 to fetchers), https://www.igeeksblog.com/best-radio-apps-for-iphone-and-ipad/, https://spy.macrumors.com/threads/best-radio-app-for-the-iphone.977335, https://opentune.net/blog/best-radio-apps-iphone-2026
- Intent: compare, buy. AIO: n/o; not question-shaped.
- Questions seen: "Does the MacBook have an FM radio?", "How to listen to radio on iPhone and iPad?", "Is there an app that allows me to listen to FM radio on all my Apple devices?" (setapp); "Can I listen to a local AM or FM station on an iPhone without internet?", "Which radio app has the fewest ads?", "Why can I hear a game on local radio but not in the app?", "What should I do if my station is missing from TuneIn?" (macmyths).
- Volume: unknown.

**best radio app mac**
- Page types: one 2026 listicle, German news, App Store pages, two forums, AppleVis, one vendor blog.
- Ranks: https://setapp.com/app-reviews/best-radio-apps, https://www.ifun.de/radio-app-die-beste-online-radio-app-fuer-den-mac-200840/, https://apps.apple.com/us/app/netradio-uk/id878034996?mt=12, https://talk.macpowerusers.com/t/radio-in-itunes-still-the-best/11665, https://forums.appleinsider.com/discussion/5730, https://soundlyfm.com/blog/best-radio-apps-for-mac/
- Intent: compare. AIO: n/o.
- Questions seen: "How to listen to the radio on Mac?", "What's the best internet radio app for Mac?", "What are the best FM radio apps for MacBook?", "What are the best Mac audio apps for genre-based radio streams?" (setapp).
- Volume: unknown.

**radio app apple tv**
- Page types: Apple Support page, Dutch and German guides, App Store pages, small blogs, AlternativeTo platform filter.
- Ranks: https://support.apple.com/guide/tv/atvbb0d46f79/tvos, https://www.iculture.nl/gids/radio-apps-apple-tv/, https://www.macwelt.de/article/969554/radio-de-mytuner-mit-dem-apple-tv-radio-hoeren.html, https://radio.streamitter.com/blog/ten-best-radio-apps-for-apple-tv-and-roku (Apr 2026), https://alternativeto.net/software/tunein-radio/?platform=tvos. The iGeeksBlog "Best Radio Apps for Apple TV" result (https://igeeksblog.com/?p=600249) now resolves to the homepage.
- Intent: find app, how-to. AIO: n/o.
- Questions seen: none visible.
- Volume: unknown.

**radio app apple watch**
- Page types: Apple Support watch guide (many locale copies), one App Store page, one old blog, German news for the "standalone" variant.
- Ranks: https://support.apple.com/en-kg/guide/watch/apdb8051ca2c/6.0/watchos, https://apps.apple.com/app/streamlets/id1507575984 (Streamlets, $0.99), https://routenote.com/blog/introducing-new-radio-app-playing-beats-1-apple-watches/, https://www.iphone-ticker.de/radioplayer-fuer-apple-watch-standalone-app-spielt-ueber-lte-155337/
- Intent: how-to, find app. AIO: n/o.
- Questions seen: none visible; "without iPhone" is the recurring sub-topic in the extended results.
- Volume: unknown.

**carplay radio app**
- Page types: one dated publisher listicle, CarPlay niche blogs, press releases, 2026 vendor blogs.
- Ranks: https://www.slashgear.com/1400130/best-apple-car-play-radio-apps/ (25 Sep 2023, Brittany Roston, 5 apps, no FAQ), https://www.carplaylife.com/?p=1527, https://www.iculture.nl/gids/carplay-radio-podcast-apps/, https://www.igeeksblog.com/best-apple-carplay-apps/, https://www.prismatic.fm/blog/best-radio-app-carplay-android-auto (vendor), https://www.carplaygo.com/en/blogs/facilities/les-meilleures-applications-de-radio-sur-carplay-guide-2026 (vendor), https://cocoonvehicles.co.uk/the-best-radio-apps-for-apple-carplay/
- Intent: compare, find app. AIO: n/o.
- Questions seen: none visible.
- Volume: unknown.

**internet radio app**
- Page types: agency blog, government education page, Linux lists, F-Droid, old news.
- Ranks: https://qulix.com/about/blog/internet-radio-apps, https://beconnected.esafety.gov.au/topic-library/useful-apps/catch-up-tv-youtube-and-streaming-apps/internet-radio-and-podcast-apps, https://www.linuxlinks.com/best-free-open-source-terminal-based-internet-radio-apps/, https://f-droid.org/packages/com.armanmaurya.internetradio/
- Intent: informational, mixed. AIO: n/o.
- Questions seen: none visible.
- Volume: unknown.

### 1.2 Podcast terms

**best podcast app**
- Page types: 2026 listicles (several self-published by podcast tool vendors), one data page, Wikipedia, dated publisher roundup.
- Ranks: https://softpicker.com/best-podcast-apps/ (17 Feb 2026, 9 apps, table App/Price/Platforms/Best For), https://podcastadblock.app/best-podcast-apps-2026/ (updated 24 Jul 2026, Ben Bowler), https://trimpod.com/blog/podcast-app-comparison-7-apps-tested-side-by-side-in-2026, https://transistor.fm/global-stats/, https://www.tomsguide.com/round-up/best-podcast-apps (2021), https://riverside.com/blog/best-podcast-app
- Intent: compare. AIO: n/o.
- Questions seen: "What's the best free podcast app?", "Which podcast app has the best playback controls?", "Do any of these apps block podcast ads?", "Can I move my subscriptions between apps?" (podcastadblock); "Are all podcasts available on all apps?", "Can I transfer my subscriptions between apps?", "Do podcast apps use a lot of data?", "Is it worth paying for a podcast app?" (softpicker).
- Volume: unknown.

**best podcast app iphone**
- Page types: one publisher article recycled in dated copies, MacRumors forum, weak blogs, vendor blog.
- Ranks: https://9to5mac.com/2022/03/26/best-podcast-app-iphone/ (Apple Podcasts and Overcast), https://forums.macrumors.com/threads/best-podcast-app-for-iphone.1547670/, https://ioshacker.com/apps/best-podcast-apps-for-iphone, https://podtastic.app/blog/posts/best-podcast-app-for-iphone
- Intent: compare. AIO: n/o.
- Questions seen: none visible.
- Volume: unknown.

**best podcast app mac**
- Page types: publisher listicles (TechRadar, iMore 2024, iGeeksBlog updated 1 Jan 2026), Setapp how-to, MacRumors forum, AppleVis.
- Ranks: https://www.techradar.com/news/the-best-podcast-apps-for-mac-users, https://imore.com/best-podcast-apps-mac, https://www.igeeksblog.com/best-podcast-apps-for-mac/ (Apple Podcasts, Spotify, Castbox, Downcast $4.99, Pocket Casts, Overcast; no FAQ), https://setapp.com/how-to/listen-to-podcasts-on-mac, https://spy.macrumors.com/threads/best-podcast-app.2188901
- Intent: compare. AIO: n/o.
- Questions seen: none visible.
- Volume: unknown.

**podcast app with transcripts**
- Page types: how-to news about Apple Podcasts (iOS 17.4), Apple's podcaster support page, one app review, Thurrott news, one personal blog.
- Ranks: https://www.tomsguide.com/phones/iphones/how-to-read-episode-transcripts-in-apple-podcasts, https://podcasters.apple.com/support/5316-transcripts-on-apple-podcasts, https://www.thepodcasthost.com/listening/castle-podcast-player-transcripts/ (updated 15 Dec 2022, Lindsay Harris Friel), https://www.thurrott.com/?p=320349 (Pocket Casts Plus generated transcripts), https://macsparky.com/?p=15673
- Intent: how-to, find app. AIO: n/o; partly question-shaped.
- Questions seen: none as FAQ; article H2s: "Is Castle's Transcription Feature Any Good?", "How Accurate Is Castle's Transcription?", "Who Needs Transcripts?".
- Volume: unknown.

**podcast transcript app**
- Page types: vendor tool pages, App Store page, creator-side generator listicle, Pocket Casts help article.
- Ranks: https://www.swellai.com/tools/podcast-transcript-app, https://apps.apple.com/pg/app/podcript-podcast-transcripts/id6749177761, https://nealschaffer.com/podcast-transcript-generator/, https://metacast.app/features/podcast-transcripts, https://support.pocketcasts.com/knowledge-base/episode-transcripts/
- Intent: mixed, listener vs creator transcription tools. AIO: n/o.
- Questions seen: none visible.
- Volume: unknown.

**podcast highlights app**
- Page types: AI tool directories, trade news, GitHub repo, AlternativeTo.
- Ranks: https://www.snipd.com/ (exports to Notion, Readwise, Obsidian, Bear, Logseq, Markdown), https://callin.io/ai-tools/snipd, https://www.alternativeto.net/software/snipd-podcasts/about/, https://podcastingtoday.co.uk/podcast-magic-tool-to-capture-and-share-podcast-highlights, https://alternativeto.net/software/podverse/about, https://mwm.ai/de/apps/podessence/6766071552
- Intent: find tool. AIO: n/o.
- Questions seen: none visible.
- Volume: unknown.

**one time purchase podcast app**
- Page types: forum threads, 2019 news, one 2026 roundup, App Store pages.
- Ranks: https://tildes.net/~tech/1jr3/seeking_an_android_podcast_app_without_subscription_impossible, https://www.engadget.com/2019-09-17-pocket-casts-podcast-app-free-version.html, https://www.podcastvideos.com/best-podcast-player-apps-for-creators-and-listeners-in-2026/ (Downcast named best one-time purchase for Apple), https://apps.apple.com/us/app/podcast-saver/id1498364459
- Intent: buy with a constraint. AIO: n/o.
- Questions seen: none as FAQ; the forum title is the question ("seeking a podcast app without subscription, impossible?").
- Volume: unknown.

**podcast app no subscription**
- Page types: deal sites, forums, Lemmy threads, education page.
- Ranks: https://www.cheapies.nz/node/51362, https://ozbargain.com.au/node/897364, https://tildes.net/~tech/1jr3/seeking_an_android_podcast_app_without_subscription_impossible, https://lemmy.imagisphe.re/post/210995/748114, https://beconnected.esafety.gov.au/topic-library/useful-apps/catch-up-tv-youtube-and-streaming-apps/internet-radio-and-podcast-apps
- Intent: buy with a constraint. AIO: n/o.
- Questions seen: none visible; Pocket Casts Plus pricing complaints recur in the threads.
- Volume: unknown.

### 1.3 Alternative terms

**tunein alternative**
- Page types: aggregators (AlternativeTo, StackReaction, alternative.me), German and French software sites, one MakeUseOf listicle; no developer page.
- Ranks: https://alternativeto.net/software/tunein-radio/, https://alternativeto.net/software/tunein-radio/?platform=mac, https://stackreaction.com/tunein-radio, https://alternative.me/tunein-radio, https://www.netzwelt.de/alternative-zu/23878-tunein-radio.html, https://www.clubic.com/telecharger-fiche442398-tunein.html, https://www.makeuseof.com/tag/best-iphone-radio-apps/
- Intent: compare, switch. AIO: n/o.
- Questions seen: none visible.
- Volume: unknown.

**radio garden alternative**
- Page types: AlternativeTo, Ahrefs and Semrush competitor pages, Spanish and Vietnamese blogs.
- Ranks: https://alternativeto.net/software/radio-garden, https://ahrefs.com/websites/radio.garden/competitors, https://es.semrush.com/website/radio.garden/competitors, https://wwwhatsnew.com/2020/04/05/como-sintonizar-la-radio-fm-desde-nuestro-ordenador/
- Intent: find similar. AIO: n/o.
- Questions seen: none visible.
- Volume: unknown.

**mytuner alternative**
- Page types: AlternativeTo, Semrush, Netzwelt, Compsmag, Mac compatibility sites.
- Ranks: https://alternativeto.net/software/mytuner, https://de.semrush.com/website/mytuner-radio.com/competitors/, https://www.compsmag.com/best/mytuner-radio-alternatives/, https://rosettacheck.com/apps/com.appgeneration.iTunerOSx, https://pcmacstore.com/en/app/808285143/mytuner-radio-pro/similar
- Intent: find similar. AIO: n/o.
- Questions seen: none visible.
- Volume: unknown.

**broadcasts app alternative**
- Page types: SERP is ambiguous (YouNow, LadioCast, Mobdro results); one German review of Broadcasts 3.0.
- Ranks: https://www.iphone-ticker.de/broadcasts-3-0-tolle-online-radio-app-in-neuer-version-203188/, https://alternativeto.net/software/younow/?p=4, https://alternativeto.net/software/ladiocast
- Intent: unclear. AIO: n/o.
- Questions seen: none.
- Volume: unknown.

**overcast alternative**
- Page types: AlternativeTo, Capterra and GetApp pages for a different "Overcast" business product, one 2014 review.
- Ranks: https://alternativeto.net/software/overcast/, https://www.capterra.fr/alternatives/164925/overcast, https://www.iphoneincanada.ca/app-store/overcast-podcast-app-review/, https://alternative.me/overcast
- Intent: switch. AIO: n/o.
- Questions seen: none visible.
- Volume: unknown.

**pocket casts alternative**
- Page types: AlternativeTo, Beebom (2020), Android Central, French and German news, one 2026 niche list.
- Ranks: https://alternativeto.net/software/pocket-casts/, https://beebom.com/best-pocket-casts-alternatives/amp/, https://www.justgeek.fr/google-podcasts-alternatives-113045/, https://www.iphone-ticker.de/podcast-apps-pocket-casts-vor-erneutem-besitzerwechsel-168789, https://agentdeals.dev/alternative-to/pocket-casts
- Intent: switch. AIO: n/o.
- Questions seen: none visible; switch triggers named in results: subscription pricing, ownership changes.
- Volume: unknown.

### 1.4 Feature and how-to terms

**record internet radio**
- Page types: broadcaster blog, Windows how-tos, old utility reviews, AlternativeTo feature page. Mac variant: Apple Community threads, Audacity forum, screen-recorder vendor blogs.
- Ranks: https://www.radiocult.fm/blog/how-to-record-internet-radio, https://www.computerhope.com/issues/ch000641.htm, https://alternativeto.net/feature/radio-recording, https://discussions.apple.com/thread/7514908, https://forum.audacityteam.org/t/how-do-i-record-from-live-internet-radio/32956, https://recorder.easeus.com/screen-recording-tips/record-internet-radio.html, https://www.leawo.org/entips/how-to-record-internet-radio-on-mac-1114.html
- Intent: how-to. AIO: n/o; "how to" shaped.
- Questions seen: none as FAQ; recurring sub-questions in threads: free method, QuickTime plus BlackHole, Audacity, Audio Hijack.
- Volume: unknown.

**identify song on radio**
- Page types: old Mac news (Tunatic), Siri tip, station-side blog, forums. "Without microphone" variant: HowToGeek, browser-extension pages.
- Ranks: https://iphonelife.com/blog/5/tip-day-how-use-siri-identify-songs-playing-radio, https://www.radioking.com/blog/find-radio-songs/amp, https://www.macworld.com/article/178212/tunatic.html, https://www.howtogeek.com/107689/how-to-easily-identify-the-song-youre-listening-to/, https://itigic.com/best-apps-to-know-what-song-is-playing/
- Intent: how-to. AIO: n/o; question-shaped variants ("what song is playing on the radio").
- Questions seen: none visible.
- Volume: unknown.

**synced lyrics radio**
- Page types: patents, PyPI and npm packages, Poweramp forum feature requests; no consumer page at all.
- Ranks: https://forum.powerampapp.com/topic/27795-possibility-to-show-synced-lyrics-for-streams/, https://pypi.org/project/croon/, https://spotdl.readthedocs.io/en/dev/reference/providers/lyrics/synced/
- Intent: feature, find. AIO: n/o.
- Questions seen: none.
- Volume: unknown.

## 2. Cross-cutting findings

1. Page one for "best radio app" terms is listicles with an author line and a dated "last updated" stamp (setapp 30 Sep 2026, macmyths 10 Aug 2026, igeeksblog 1 Jan 2026). None lists Macdio; Eter, Broadcasts, TuneIn, myTuner, iHeart, Audacy and Receiver are the recurring set (https://setapp.com/app-reviews/best-radio-apps, https://macmyths.com/best-radio-apps-for-iphone-and-ipad-live-stations-sports-and-more-2026/).
2. The only paid-up-front apps on these lists are Receiver ($3.99, macmyths) and Downcast on the podcast side ($4.99, igeeksblog). "One time purchase" and "no subscription" queries are answered by forums and deal sites, not by any developer page. That is an open slot for a pricing page stating the price, the Universal Purchase scope and the date it was checked.
3. The podcast transcript SERP is owned by Apple Podcasts how-tos (iOS 17.4) and Pocket Casts Plus (paywalled, server generated). No ranking page describes on-device transcription for any episode. The "podcast highlights app" SERP is Snipd plus directories; Snipd's export list (Notion, Readwise, Obsidian, Bear, Logseq, Markdown) is the feature set a Macdio highlights page must match in wording, with Apple Notes, Craft and the radio side as the difference.
4. Apple TV, Apple Watch and CarPlay radio queries are thin: Apple Support pages, Dutch and German guides, vendor blogs and App Store listings. A platform page with a direct answer paragraph can rank there faster than on the crowded iPhone term.
5. "Alternative" terms are held by aggregators (AlternativeTo, StackReaction, Semrush, Ahrefs competitor pages). macdio.app/tunein-alternative.html already has the right shape (comparison table, FAQ, dated check on 9 September 2026) but no author line. The same template can serve myTuner, Pocket Casts, Overcast and Snipd. "broadcasts app alternative" is too ambiguous to target as a page.
6. Mac-specific podcast and radio listicles are few and dated; "menu bar" is a recurring phrase in Mac radio results (ifun.de Radio.app, Receiver Mac, Radio FM Spain), so the Mac page should carry it.
7. "synced lyrics radio" has no consumer page ranking; a single feature page explaining how timing on a live stream works would be the only candidate answer.

## 3. Page map

Exists = present in https://macdio.app/sitemap.xml on 2026-10-12.

| Page | Target term(s) | Intent | Exists | Reason from SERP evidence |
| -- | -- | -- | -- | -- |
| / | Macdio, internet radio and podcast app for iPhone, Mac, Apple TV | brand | yes | hub; must link every page below in HTML, not JS |
| /iphone.html | radio app iphone, podcast app iphone | compare, buy | yes | crowded term; page supports the two guides that can rank (1.1) |
| /ipad.html | radio app ipad | buy | yes | igeeksblog and macmyths treat iPhone and iPad together |
| /mac.html | radio app mac, menu bar radio player mac, podcast app mac | compare, buy | yes | thin SERP, "menu bar" recurring (finding 6) |
| /apple-tv.html | radio app apple tv, podcast app apple tv | find app | yes | thin SERP, iGeeksBlog article gone (1.1) |
| /apple-watch.html | radio app apple watch without iphone | how-to, find | yes | Apple Support dominates; "without iPhone" is the angle |
| /carplay.html | carplay radio app, carplay podcast app | find app | NO | vendor blogs rank for the 2026 term; only a guide exists today |
| /podcasts.html | podcast app no subscription iphone mac, podcast app with transcripts | compare, buy | NO | no podcast marketing page at all; the podcast side is invisible to search |
| /pricing.html | one time purchase podcast app, podcast app no subscription, radio app no subscription | buy | NO | forums and deal sites hold the SERP (finding 2) |
| /features.html | Macdio features | overview | yes | keep as index linking to the feature pages below |
| /features/podcast-transcripts.html | podcast app with transcripts, podcast transcript app, on-device podcast transcription | find, how-to | NO | SERP owned by Apple Podcasts and Pocket Casts Plus (finding 3) |
| /features/highlights.html | podcast highlights app, podcast highlights to Obsidian, Readwise, Notion, Apple Notes | find | NO | Snipd plus directories only (finding 3) |
| /features/song-id.html | identify song on radio without microphone, what song is playing on the radio | how-to | NO | guide exists; a product page carries the "no microphone" claim with a table |
| /features/recording.html | record internet radio mac iphone, split tracks radio recording | how-to | NO | vendor screen-recorder blogs rank; guide exists, product page does not |
| /features/synced-lyrics.html | synced lyrics radio, lyrics for live radio | feature | NO | unowned SERP (finding 7) |
| /tunein-alternative.html | tunein alternative | switch | yes | add author line and dateModified; keep table and FAQ |
| /mytuner-alternative.html | mytuner alternative, mytuner radio pro mac | switch | NO | aggregator-only SERP; myTuner has a Mac version so Mac users search it |
| /pocket-casts-alternative.html | pocket casts alternative | switch | NO | switch triggers are Plus pricing and ownership news (1.3) |
| /overcast-alternative.html | overcast podcast app alternative | switch | NO | word "podcast" in the title to escape the business-software ambiguity |
| /snipd-alternative.html | snipd alternative | switch | NO | Snipd is the only named highlights player; its AI is English-only per an AlternativeTo review |
| /compare/apple-podcasts.html | Macdio vs Apple Podcasts transcripts | compare | NO | every transcript how-to is about Apple Podcasts; a direct comparison is the citable form |
| /radio-garden-alternative.html | radio garden alternative | find similar | NO, low priority | SERP is SEO-tool competitor pages; small win |
| /stations.html | internet radio stations directory | informational | yes | keep; supports the generic "internet radio app" term |
| /guides/ | radio and podcast guides | hub | yes | restructure per section 4 |
| /tr/, /de/ | local brand pages | brand | yes | fr, es, it, ja, pt-BR do not exist (section 6) |
| Do not build | broadcasts app alternative | n/a | n/a | ambiguous SERP; Broadcasts is already covered inside the best-apps guide |

Page map size: 26 rows, 15 new pages (one marked low priority), 10 existing, 1 explicit "do not build".

Build order suggested by the evidence (weakest competition first):
1. /pricing.html and /podcasts.html (no developer page ranks for the constraint queries; the podcast side has zero presence).
2. /features/podcast-transcripts.html and /features/highlights.html (two-player SERPs: Apple Podcasts and Snipd).
3. /carplay.html, then refresh /apple-tv.html and /apple-watch.html with direct answer paragraphs (thin SERPs).
4. /pocket-casts-alternative.html, /mytuner-alternative.html, /snipd-alternative.html on the tunein-alternative template.
5. /features/synced-lyrics.html, /features/song-id.html, /features/recording.html (feature pages backing existing guides).

## 4. Guide hub outline

Model: https://linnote.app/guide/ (sidebar with 3 groups, 12 guides, search box, "On this page" list, previous/next pager). Existing guides keep their URLs. Target 27 to 30 guides in 5 groups.

Group A, Getting started (new)
1. First station in two minutes (install, search, favourite); query: how to use Macdio. New.
2. Moving from TuneIn, myTuner or Broadcasts: rebuilding favourites; query: import tunein favorites. New; content must state only what the app really imports.
3. iCloud sync across iPhone, iPad, Mac, Apple TV and Watch; query: radio app icloud sync. New.

Group B, Radio on every device
4. How to listen to internet radio on a Mac; query: listen to radio on mac. EXISTS (/guides/how-to-listen-to-radio-on-mac.html).
5. The menu bar player on Mac; query: menu bar radio player mac. New (finding 6).
6. Radio on Apple Watch without an iPhone; query: apple watch radio without iphone. EXISTS (/guides/radio-on-apple-watch.html).
7. Radio and podcasts on Apple TV, including Top Shelf; query: radio app apple tv. New.
8. Internet radio on CarPlay; query: carplay radio app. EXISTS (/guides/carplay-radio.html).
9. Play radio with Siri; query: siri play radio station. EXISTS (/guides/siri-radio.html).
10. Widgets and Lock Screen controls on iPhone; query: radio widget iphone. New.
11. Clock Mode as a bedside radio (iOS only); query: iphone bedside radio alarm app. New.

Group C, Radio features
12. How to record internet radio (split tracks); query: record internet radio mac. EXISTS (/guides/record-internet-radio.html).
13. What song is playing on the radio? Three ways, one without a microphone; query: identify song on radio. EXISTS (/guides/identify-song-on-radio.html).
14. Synced lyrics on a live stream: how the timing works; query: synced lyrics radio. New (finding 7).
15. How to find a station's stream URL and add it manually; query: radio stream url. EXISTS (/guides/find-radio-stream-url.html).
16. Does the iPhone have FM radio?; query: iphone fm radio. EXISTS (/guides/iphone-fm-radio.html).
17. A station is missing or will not play: what to check; query: radio station not playing app. New (macmyths has four troubleshooting H2s on this).
18. How much data does streaming radio use?; query: how much data does internet radio use. New (macmyths H2 "How much cellular data does radio use?").

Group D, Podcasts (all new)
19. Podcast transcripts on device: how they are made, languages, privacy; query: podcast app with transcripts.
20. Search inside an episode and jump to the sentence; query: search podcast transcript.
21. Highlights: save a moment while listening; query: podcast highlights app.
22. Send highlights to Apple Notes; query: podcast notes apple notes.
23. Send highlights to Obsidian (Markdown); query: podcast highlights obsidian.
24. Send highlights to Readwise and Notion; query: podcast highlights readwise, notion.
25. Send highlights to Bear and Craft; query: podcast highlights bear craft.
26. Move subscriptions with OPML (from Apple Podcasts, Overcast, Pocket Casts); query: transfer podcast subscriptions. (FAQ seen twice on page one, section 1.2.)
27. Radio and podcasts in one app: following a radio show as a podcast; query: radio podcast app.

Group E, Buying and comparing
28. One purchase, every Apple device: how Universal Purchase works; query: one time purchase radio app. New.
29. Best internet radio apps compared; query: best internet radio app mac iphone. EXISTS (/guides/best-internet-radio-apps.html).
30. Podcast apps for Apple devices compared, with transcript source and price; query: best podcast app mac. New.

Count: 30 topics, 9 existing, 21 new. Trim to 27 by merging 22 to 25 into two guides if the writing budget is tight.

## 5. GEO notes

What the ranking pages have that macdio.app pages partly lack: a named author (setapp "Human-written by Olha Novitska", macmyths "MacMyths Team", podcastadblock "Ben Bowler"), a visible updated date, a comparison table with price and platform columns (softpicker: App, Price, Platforms, Best For), and an FAQ block of 4 to 7 questions. macdio.app's two comparison pages already have the table, the FAQ and a dated check ("checked on 9 September 2026", "read in the United States store on 14 September 2026") but no named author line.

Five rules for this site:
1. Direct answer first. Under every H1, one paragraph of 40 to 70 words that answers the page's query in plain sentences with the date: "As of 12 October 2026 Macdio costs ... once and runs on ...". AI answer engines quote the first self-contained paragraph; a hero slogan is not quotable.
2. Facts in tables, every row checkable. Price, platform list, transcript source (on device, server, feed), ads, account required, station count "as advertised in the US App Store on <date>". One source link per competitor row. Never a column that cannot be verified.
3. FAQ block in the exact question wording seen on page one (section 1), 4 to 6 questions, each answered in one or two sentences. Include one question the app answers badly ("Is there an Android or web version?") because stating limits is what gets a page trusted and cited.
4. Author line and dates on every page: "Written by Sait Firat NEMIS, developer of Macdio. Checked on <date>." with Person and Article (or TechArticle) JSON-LD carrying author, datePublished and dateModified. Disclose the conflict of interest in the same line on comparison pages.
5. Name the entities the query names. A page targeting "pocket casts alternative" must say "Pocket Casts", its price and what it does better, in the body text, not only in the title. Pages that avoid naming competitors do not get cited for comparison queries.

Also carry over from the existing best-apps guide: a "What none of these apps can do" section and an "Apps left out, and why" section. Both increase the chance of being quoted as the balanced source.

## 6. Localisation notes

Local phrasing verified from a search result is marked with the URL. Everything else is "to be checked by the translation step". The search tool is US-indexed, so even verified terms should be re-checked from local Google.

| Locale | Radio term | Podcast term | Transcript / recording terms | Notes |
| -- | -- | -- | -- | -- |
| de | "Internetradio App" (https://www.macwelt.de/article/966229/beste-kostenlose-internetradio-app-fuer-iphone-ipad-ios.html), "Online-Radio-App" (https://www.ifun.de/radio-app-die-beste-online-radio-app-fuer-den-mac-200840/) | "Podcast App" (https://transkriptor.com/de/beste-podcast-app/) | "Internetradio aufnehmen" (https://www.ifun.de/streamwriter-studio-fuer-den-mac-auto-aufnahme-von-internetradio-282173/), "Transkript" (https://www.sir-apfelot.de/apple-podcasts-app-transkripte-anleitung-58214/) | ifun.de, iphone-ticker.de, macwelt.de own the German Apple SERP; Receiver is the local favourite |
| tr | "radyo uygulaması", "radyo dinleme uygulamaları" (https://www.tamindir.com/blog/en-cok-kullanilan-mobil-radyo-dinleme-uygulamalari_14205/) | "podcast uygulaması" (https://www.webtekno.com/en-iyi-podcast-uygulamalari-h159627.html) | "internet radyosu kaydetme" (https://recorder.easeus.com/tr/screen-recording-tips/record-internet-radio.html); transcript term: to be checked ("transkript" vs "yazıya dökme") | Turkish results are station apps and download portals; little editorial competition |
| fr | "application radio" (https://iphonesoft.fr/2019/11/19/triode-radio-invite-ios-macos) | "application de podcast" (https://transkriptor.com/fr/meilleure-application-de-podcast/) | "transcription" (https://iphonesoft.fr/2024/01/26/apple-podcasts-genere-transcription-automatique-ios-17-4); recording: to be checked ("enregistrer la radio") | Triode and Receiver appear; station-brand apps (Radio France) rank |
| es | "app de radio", "apps para escuchar la radio" (https://www.applesfera.com/tutoriales/cinco-mejor-apps-para-escuchar-radio-gratuitamente-nuestro-iphone) | "aplicación de podcast" (https://transkriptor.com/es/la-mejor-aplicacion-de-podcast/) | "transcripciones" (https://support.apple.com/es-lamr/HT201859); recording: to be checked ("grabar radio por internet") | Applesfera and OCU comparison pages rank; Spain-made "Radio FM" Mac app at 4,99 EUR |
| it | "app radio", "app per ascoltare la radio" (https://www.aranzulla.it/come-ascoltare-la-radio-su-iphone-27309.html, https://www.iphoneitalia.com/?p=230991) | "app per podcast" (https://transkriptor.com/it/la-migliore-app-per-podcast/) | "trascrizioni" (https://www.macitynet.it/la-trascrizione-automatica-di-podcast-da-oggi-anche-in-italiano-funziona-cosi.md); recording: to be checked ("registrare la radio") | Italian radio SERP is dated (2010 to 2018); Aranzulla how-to style dominates |
| ja | "ラジオアプリ" (https://minto.tech/radio-iphone/, https://rank-king.jp/article/22284) | "ポッドキャストアプリ" (https://transkriptor.com/ja/最高のポッドキャストアプリ/) | "文字起こし" (https://www.lifehacker.jp/article/2403-apple-podcasts-launches-transcripts/); recording "録音": to be checked | radiko (geo-locked, 350 yen premium per result) defines "radio app" in Japan; position Macdio as world radio ("海外ラジオ"), to be checked |
| pt-BR | "aplicativo de rádio", "rádio FM" (https://apps.apple.com/BR/app/id520502858) | "aplicativo de podcast" (https://transkriptor.com/pt-br/melhor-aplicativo-de-podcast/) | "transcrição" (https://www.tecmundo.com.br/software/280626-apple-libera-funcao-transcricao-audio-app-podcasts.htm); recording: to be checked ("gravar rádio") | no independent Brazilian comparison found; App Store pages rank directly |

Cross-locale: the English word "podcast" is used unchanged in all seven locales in the results seen. "Transcript" translates everywhere; use the local word, not the English one. Apple's own transcript launch articles exist in de, fr, es, it, ja and pt-BR, so "Apple Podcasts transcripts vs on-device transcripts" is a comparison every locale can carry.

## 7. Flags noticed during the research

- Search Console MCP: the service account cannot read macdio.app (permission error on both property forms, 2026-10-12). Until fixed, no real query data for this site.
- https://macdio.app/guides/ lists 9 guides; the brief said 10. Sitemap also has 9. Either a guide is unpublished or the count in the brief is stale.
- https://igeeksblog.com/?p=600249 ("Best Radio Apps for Apple TV") redirects to the iGeeksBlog homepage; the article appears removed, which leaves the tvOS term even thinner.
- https://tttradionetwork.com/best-radio-apps-in-2026/ returns 403 to fetchers but ranks on three 2026 queries; it could not be inspected.
- macdio.app comparison pages (tunein-alternative.html, guides/best-internet-radio-apps.html) carry no named author line; every competitor page that ranks has one.
- The WebSearch tool is US-only; AI Overview presence and People-also-ask boxes were not observable and need a browser pass before the page map is finalised.
