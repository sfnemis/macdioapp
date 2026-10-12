import { SITE } from './paths.mjs';
import { price, countries } from './format.mjs';

export function person() {
  return { '@type': 'Person', name: 'Sait Firat NEMIS', url: `${SITE}/` };
}

export function softwareApplication(lang, counts, pricing) {
  const p = price(pricing, 'US', 'en');
  return {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Macdio',
    applicationCategory: 'MultimediaApplication', operatingSystem: 'iOS, iPadOS, macOS, tvOS, watchOS',
    offers: { '@type': 'Offer', price: p.amount, priceCurrency: p.currency, url: 'https://apps.apple.com/app/macdio/id6761737888', availability: 'https://schema.org/InStock' },
    author: person(), inLanguage: lang,
    description: `Internet radio and podcasts for Apple devices. ${counts.stations} stations and ${counts.podcasts} podcasts as of ${counts.checkedOn}; one purchase for ${countries(pricing)} countries.`,
  };
}

export function faqPage(items) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })) };
}

export function webSite(lang) {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Macdio', url: `${SITE}/`, inLanguage: lang, author: person() };
}
