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
        name: "Dove si trova Hotel Dream e quanto dista dal mare?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hotel Dream è in Viale Tirrenia 10 a Miramare di Rimini, a circa 150 metri dalla spiaggia. Da qui si raggiungono comodamente il lungomare, la Metro Mare e la stazione di Miramare.",
        },
      },
      {
        "@type": "Question",
        name: "Come posso prenotare una camera?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le prenotazioni si effettuano dal motore di prenotazione online TeamSystem Hospitality collegato al sito ufficiale, dove verificare disponibilità, tariffe e confermare il soggiorno.",
        },
      },
      {
        "@type": "Question",
        name: "La colazione è inclusa? A che ora viene servita?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, la colazione è inclusa nel soggiorno ed è servita dalle 7:00 alle 11:00 in sala colazione, con buffet dolce e salato e bevande.",
        },
      },
      {
        "@type": "Question",
        name: "Il parcheggio è disponibile e quanto costa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "È disponibile un parcheggio privato interno, soggetto a disponibilità, a circa 10 euro al giorno; si consiglia di prenotare il posto soprattutto in alta stagione.",
        },
      },
      {
        "@type": "Question",
        name: "Hotel Dream è adatto per chi va a Rimini Fiera?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì. Da Miramare Rimini Fiera è raggiungibile in circa 20 minuti in auto; sono possibili anche collegamenti in treno dalla stazione di Miramare. L'hotel offre Wi-Fi, colazione e parcheggio per chi viaggia per lavoro.",
        },
      },
      {
        "@type": "Question",
        name: "Quali sono gli orari di check-in e check-out?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Check-in dalle 14:00 alle 22:00; check-out entro le 10:00. Arrivi dopo le 22:00 vanno concordati con la struttura. Al check-in è richiesto un documento d'identità valido per tutti gli ospiti.",
        },
      },
      {
        "@type": "Question",
        name: "Il Wi-Fi è gratuito?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, la connessione Wi-Fi è gratuita in tutta la struttura: camere, aree comuni, bar e spazi esterni ove disponibile.",
        },
      },
      {
        "@type": "Question",
        name: "Come arrivo in treno o dall'aeroporto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'hotel è vicino alla stazione di Miramare e alla fermata Metro Mare. Dall'autostrada A14 si esce a Rimini Sud; dall'aeroporto Federico Fellini sono circa 10 km in auto o taxi.",
        },
      },
      {
        "@type": "Question",
        name: "Quali sono le condizioni di cancellazione?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In linea generale: cancellazione gratuita fino a 7 giorni prima dell'arrivo; tra 7 e 3 giorni prima può essere addebitata la prima notte; entro 48 ore o in caso di no-show può essere addebitato l'intero soggiorno. Le condizioni possono variare in alta stagione o durante fiere: verificare al momento della prenotazione.",
        },
      },
      {
        "@type": "Question",
        name: "L'hotel è adatto alle famiglie con bambini?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì. Hotel Dream offre camere familiari e triple, area dedicata ai bambini e servizi pensati per chi viaggia in famiglia sulla Riviera di Rimini.",
        },
      },
      {
        "@type": "Question",
        name: "Avete convenzioni con ristoranti e stabilimenti balneari?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, sono attive convenzioni con ristoranti partner a Rimini e Miramare e con stabilimenti balneari nelle vicinanze, con condizioni riservate agli ospiti.",
        },
      },
      {
        "@type": "Question",
        name: "Quanto dista il centro di Rimini e Riccione?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Da Miramare si raggiungono in auto il centro storico di Rimini, la zona fiera e Viale Ceccarini a Riccione in pochi minuti; la Metro Mare collega rapidamente la costa tra Rimini e Riccione.",
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
