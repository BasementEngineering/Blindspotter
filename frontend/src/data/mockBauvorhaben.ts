import type { Bauvorhaben } from '@/interfaces/BauvorhabenInterface';

export const mockBauvorhaben: Bauvorhaben[] = [
  {
    id: '1',
    name: 'Neubau Wohnquartier Stadtmitte',
    beschreibung: 'Modernes Wohnquartier mit 150 Wohneinheiten, Tiefgarage und Grünflächen im Zentrum der Stadt.',
    adresse: 'Hauptstraße 45-55, 10115 Berlin',
    koordinaten: {
      lat: 52.5200,
      lng: 13.4050
    },
    status: 'in_bau',
    bauzeit: {
      beginn: '2024-03-01',
      ende: '2026-08-31'
    },
    bauherr: 'Stadtentwicklung Berlin GmbH',
    projekttyp: 'wohnbau',
    groesse: '12.500 m²',
    kosten: '45 Mio. €'
  },
  {
    id: '2',
    name: 'Sanierung Rathaus',
    beschreibung: 'Umfassende Sanierung des historischen Rathauses mit energetischer Modernisierung und Barrierefreiheit.',
    adresse: 'Marktplatz 1, 10115 Berlin',
    koordinaten: {
      lat: 52.5180,
      lng: 13.4020
    },
    status: 'geplant',
    bauzeit: {
      beginn: '2025-01-15',
      ende: '2025-12-20'
    },
    bauherr: 'Stadt Berlin',
    projekttyp: 'oeffentlich',
    groesse: '3.200 m²',
    kosten: '8,5 Mio. €'
  },
  {
    id: '3',
    name: 'Gewerbepark Ost',
    beschreibung: 'Neuer Gewerbepark für lokale Unternehmen mit modernen Büro- und Produktionsgebäuden.',
    adresse: 'Industriestraße 100-120, 10115 Berlin',
    koordinaten: {
      lat: 52.5150,
      lng: 13.4150
    },
    status: 'abgeschlossen',
    bauzeit: {
      beginn: '2022-09-01',
      ende: '2024-02-29'
    },
    bauherr: 'Gewerbe Entwicklung Nord AG',
    projekttyp: 'gewerbe',
    groesse: '25.000 m²',
    kosten: '32 Mio. €'
  },
  {
    id: '4',
    name: 'Neue Stadtbrücke',
    beschreibung: 'Bau einer modernen Fußgänger- und Radfahrerbrücke über den Fluss zur besseren Stadtanbindung.',
    adresse: 'Flussstraße / Parkweg, 10115 Berlin',
    koordinaten: {
      lat: 52.5170,
      lng: 13.4080
    },
    status: 'pausiert',
    bauzeit: {
      beginn: '2024-06-01',
      ende: '2025-04-30'
    },
    bauherr: 'Stadtwerke Berlin',
    projekttyp: 'infrastruktur',
    groesse: '120 m Länge',
    kosten: '2,8 Mio. €'
  },
  {
    id: '5',
    name: 'Schulzentrum Süd',
    beschreibung: 'Neubau eines modernen Schulkomplexes mit Grundschule, Gymnasium und Sporthalle.',
    adresse: 'Schulweg 15, 10115 Berlin',
    koordinaten: {
      lat: 52.5120,
      lng: 13.4000
    },
    status: 'geplant',
    bauzeit: {
      beginn: '2025-08-01',
      ende: '2027-07-31'
    },
    bauherr: 'Bildungsministerium Berlin',
    projekttyp: 'oeffentlich',
    groesse: '8.500 m²',
    kosten: '28 Mio. €'
  }
];