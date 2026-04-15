import { SITE_NAME, SITE_URL, type Locale } from "@/lib/site";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-v3.png`,
    email: "onlyyoumisahotel@gmail.com",
    telephone: "+39 333 929 9408",
    sameAs: [],
  };
}

export function getHotelSchema(locale: Locale) {
  const localePath = `${SITE_URL}/${locale}`;

  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${SITE_URL}/#hotel`,
    name: SITE_NAME,
    url: localePath,
    image: [`${SITE_URL}/images/hotel-esterno-notte.png`],
    description:
      "Hotel Dream a Miramare di Rimini, a 150 metri dal mare, con colazione 7:00-11:00, parcheggio privato, convenzioni ristoranti e collegamenti Metro Mare.",
    starRating: {
      "@type": "Rating",
      ratingValue: "4.0",
      bestRating: "5",
      ratingCount: "31",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Viale Tirrenia, 10",
      addressLocality: "Miramare di Rimini",
      postalCode: "47924",
      addressRegion: "Emilia-Romagna",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.0433,
      longitude: 12.4167,
    },
    telephone: "+39 333 929 9408",
    email: "onlyyoumisahotel@gmail.com",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Colazione 7:00-11:00", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parcheggio privato", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi gratuito", value: true },
      { "@type": "LocationFeatureSpecification", name: "Convenzioni ristoranti", value: true },
      { "@type": "LocationFeatureSpecification", name: "Vicino Metro Mare", value: true },
    ],
  };
}

export function getServicesFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Qual è l'orario della colazione?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La colazione è servita ogni giorno dalle 7:00 alle 11:00.",
        },
      },
      {
        "@type": "Question",
        name: "L'hotel ha convenzioni con ristoranti?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, Hotel Dream ha convenzioni con ristoranti partner a Rimini e Miramare.",
        },
      },
      {
        "@type": "Question",
        name: "Come raggiungo l'hotel senza auto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'hotel è vicino alla stazione di Miramare e alla fermata Metro Mare, con collegamenti rapidi tra Rimini e Riccione.",
        },
      },
    ],
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
