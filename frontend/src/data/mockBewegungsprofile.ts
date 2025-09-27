import type { Bewegungsprofil, Tagesablauf } from '@/interfaces/BewegungsprofilInterface';

// Zentrale Orte in Münster
const ORTE_MUENSTER = {
  uni: { lat: 51.963667, lng: 7.613056, name: 'Universität Münster' },
  hbf: { lat: 51.956565, lng: 7.635773, name: 'Hauptbahnhof' },
  prinzipalmarkt: { lat: 51.962066, lng: 7.628026, name: 'Prinzipalmarkt' },
  aasee: { lat: 51.949167, lng: 7.617500, name: 'Aasee' },
  ludgerikreisel: { lat: 51.957500, lng: 7.626111, name: 'Ludgerikreisel' },
  schloss: { lat: 51.963611, lng: 7.616944, name: 'Schloss' },
  hafen: { lat: 51.949722, lng: 7.640278, name: 'Stadthafen' },
  coerde: { lat: 51.982500, lng: 7.641667, name: 'Coerde' },
  gievenbeck: { lat: 51.945833, lng: 7.583889, name: 'Gievenbeck' },
  hiltrup: { lat: 51.905833, lng: 7.650000, name: 'Hiltrup' }
};

// Studenten Tagesabläufe
const studentenTagesablaeufe: Tagesablauf[] = [
  {
    id: 'student-normal',
    name: 'Normaler Studententag',
    typ: 'normal',
    kategorie: 'studenten',
    routen: [
      {
        id: 'route-1',
        name: 'Morgens zur Uni',
        wegpunkte: [
          { lat: 51.949722, lng: 7.640278, zeit: '08:00', aktivitaet: 'Start von WG am Hafen', ort: 'WG-Wohnung' },
          { lat: 51.952500, lng: 7.635000, zeit: '08:10', aktivitaet: 'Umsteigen', ort: 'Bushaltestelle' },
          { lat: 51.957500, lng: 7.626111, zeit: '08:20', aktivitaet: 'Ludgerikreisel' },
          { lat: 51.963667, lng: 7.613056, zeit: '08:30', aktivitaet: 'Ankunft Uni', ort: 'Hörsaalzentrum' }
        ],
        distanz: 3.2,
        dauer: 30,
        verkehrsmittel: 'bus'
      },
      {
        id: 'route-2',
        name: 'Mittagspause',
        wegpunkte: [
          { lat: 51.963667, lng: 7.613056, zeit: '12:00', aktivitaet: 'Verlassen Hörsaal' },
          { lat: 51.962066, lng: 7.628026, zeit: '12:15', aktivitaet: 'Mittagessen', ort: 'Mensa', dauer: 45 }
        ],
        distanz: 1.5,
        dauer: 15,
        verkehrsmittel: 'fuss'
      },
      {
        id: 'route-3',
        name: 'Nachmittag Bibliothek',
        wegpunkte: [
          { lat: 51.962066, lng: 7.628026, zeit: '13:00', aktivitaet: 'Verlassen Mensa' },
          { lat: 51.961500, lng: 7.620500, zeit: '13:10', aktivitaet: 'Ankunft Bibliothek', dauer: 180 }
        ],
        distanz: 0.8,
        dauer: 10,
        verkehrsmittel: 'fuss'
      },
      {
        id: 'route-4',
        name: 'Abends zum Sport',
        wegpunkte: [
          { lat: 51.961500, lng: 7.620500, zeit: '16:10', aktivitaet: 'Verlassen Bibliothek' },
          { lat: 51.949167, lng: 7.617500, zeit: '16:25', aktivitaet: 'Hochschulsport Aasee', dauer: 90 }
        ],
        distanz: 1.4,
        dauer: 15,
        verkehrsmittel: 'fahrrad'
      },
      {
        id: 'route-5',
        name: 'Heimweg',
        wegpunkte: [
          { lat: 51.949167, lng: 7.617500, zeit: '18:00', aktivitaet: 'Nach dem Sport' },
          { lat: 51.949722, lng: 7.640278, zeit: '18:15', aktivitaet: 'Ankunft WG' }
        ],
        distanz: 2.0,
        dauer: 15,
        verkehrsmittel: 'fahrrad'
      }
    ],
    gesamtdistanz: 8.9,
    gesamtdauer: 85,
    startzeit: '08:00',
    endzeit: '18:15',
    hauptaktivitaeten: ['Vorlesung', 'Mensa', 'Bibliothek', 'Sport']
  },
  {
    id: 'student-baustelle',
    name: 'Studententag mit Baustelle',
    typ: 'mit_baustelle',
    kategorie: 'studenten',
    routen: [
      {
        id: 'route-1b',
        name: 'Morgens zur Uni (Umleitung)',
        wegpunkte: [
          { lat: 51.949722, lng: 7.640278, zeit: '07:45', aktivitaet: 'Früher Start wegen Umleitung', ort: 'WG-Wohnung' },
          { lat: 51.945833, lng: 7.635000, zeit: '08:00', aktivitaet: 'Umweg Südring' },
          { lat: 51.950000, lng: 7.625000, zeit: '08:15', aktivitaet: 'Alternative Route' },
          { lat: 51.955000, lng: 7.615000, zeit: '08:30', aktivitaet: 'Weiterer Umweg' },
          { lat: 51.963667, lng: 7.613056, zeit: '08:45', aktivitaet: 'Verspätete Ankunft Uni', ort: 'Hörsaalzentrum' }
        ],
        distanz: 5.1,
        dauer: 60,
        verkehrsmittel: 'bus',
        beeintraechtigung: {
          typ: 'umleitung',
          beschreibung: 'Ludgerikreisel gesperrt, Bus-Umleitung über Südring',
          zusatzzeit: 30,
          zusatzdistanz: 1.9
        }
      },
      {
        id: 'route-2b',
        name: 'Mittagspause',
        wegpunkte: [
          { lat: 51.963667, lng: 7.613056, zeit: '12:00', aktivitaet: 'Verlassen Hörsaal' },
          { lat: 51.962066, lng: 7.628026, zeit: '12:15', aktivitaet: 'Mittagessen', ort: 'Mensa', dauer: 30 }
        ],
        distanz: 1.5,
        dauer: 15,
        verkehrsmittel: 'fuss',
        beeintraechtigung: {
          typ: 'laerm',
          beschreibung: 'Baulärm stört beim Essen im Freien'
        }
      },
      {
        id: 'route-3b',
        name: 'Nachmittag Bibliothek',
        wegpunkte: [
          { lat: 51.962066, lng: 7.628026, zeit: '12:45', aktivitaet: 'Verlassen Mensa' },
          { lat: 51.960000, lng: 7.625000, zeit: '12:55', aktivitaet: 'Umweg um Baustelle' },
          { lat: 51.961500, lng: 7.620500, zeit: '13:05', aktivitaet: 'Ankunft Bibliothek', dauer: 150 }
        ],
        distanz: 1.2,
        dauer: 20,
        verkehrsmittel: 'fuss',
        beeintraechtigung: {
          typ: 'umleitung',
          beschreibung: 'Direkter Weg gesperrt',
          zusatzzeit: 10,
          zusatzdistanz: 0.4
        }
      },
      {
        id: 'route-4b',
        name: 'Sport fällt aus',
        wegpunkte: [
          { lat: 51.961500, lng: 7.620500, zeit: '15:35', aktivitaet: 'Verlassen Bibliothek' },
          { lat: 51.949722, lng: 7.640278, zeit: '16:00', aktivitaet: 'Direkt nach Hause' }
        ],
        distanz: 2.8,
        dauer: 25,
        verkehrsmittel: 'bus',
        beeintraechtigung: {
          typ: 'sperrung',
          beschreibung: 'Sportplatz wegen Bauarbeiten gesperrt, Sport entfällt'
        }
      }
    ],
    gesamtdistanz: 10.6,
    gesamtdauer: 120,
    startzeit: '07:45',
    endzeit: '16:00',
    hauptaktivitaeten: ['Vorlesung (verspätet)', 'Mensa (verkürzt)', 'Bibliothek', 'Kein Sport'],
    beschreibung: 'Tagesablauf stark beeinträchtigt durch Baustellenumleitung'
  }
];

// Familien Tagesabläufe
const familienTagesablaeufe: Tagesablauf[] = [
  {
    id: 'familie-normal',
    name: 'Normaler Familientag',
    typ: 'normal',
    kategorie: 'familien',
    routen: [
      {
        id: 'fam-route-1',
        name: 'Schulweg Kinder',
        wegpunkte: [
          { lat: 51.945833, lng: 7.583889, zeit: '07:30', aktivitaet: 'Start Eigenheim Gievenbeck' },
          { lat: 51.947500, lng: 7.585000, zeit: '07:35', aktivitaet: 'Nachbarskinder abholen' },
          { lat: 51.950000, lng: 7.588000, zeit: '07:45', aktivitaet: 'Ankunft Grundschule', dauer: 5 }
        ],
        distanz: 0.8,
        dauer: 20,
        verkehrsmittel: 'fuss'
      },
      {
        id: 'fam-route-2',
        name: 'Elternteil zur Arbeit',
        wegpunkte: [
          { lat: 51.950000, lng: 7.588000, zeit: '07:50', aktivitaet: 'Nach Schulabgabe' },
          { lat: 51.956565, lng: 7.635773, zeit: '08:15', aktivitaet: 'Ankunft Büro Innenstadt' }
        ],
        distanz: 5.2,
        dauer: 25,
        verkehrsmittel: 'auto'
      },
      {
        id: 'fam-route-3',
        name: 'Kinder abholen',
        wegpunkte: [
          { lat: 51.956565, lng: 7.635773, zeit: '15:30', aktivitaet: 'Verlassen Büro' },
          { lat: 51.950000, lng: 7.588000, zeit: '15:50', aktivitaet: 'Ankunft Schule' },
          { lat: 51.948000, lng: 7.590000, zeit: '16:00', aktivitaet: 'Spielplatz', dauer: 45 }
        ],
        distanz: 5.5,
        dauer: 30,
        verkehrsmittel: 'auto'
      },
      {
        id: 'fam-route-4',
        name: 'Nachmittagsaktivitäten',
        wegpunkte: [
          { lat: 51.948000, lng: 7.590000, zeit: '16:45', aktivitaet: 'Verlassen Spielplatz' },
          { lat: 51.945833, lng: 7.583889, zeit: '17:00', aktivitaet: 'Zuhause', dauer: 60 },
          { lat: 51.943000, lng: 7.580000, zeit: '18:00', aktivitaet: 'Fußballtraining Kind' }
        ],
        distanz: 1.2,
        dauer: 15,
        verkehrsmittel: 'fahrrad'
      },
      {
        id: 'fam-route-5',
        name: 'Abendessen Einkauf',
        wegpunkte: [
          { lat: 51.943000, lng: 7.580000, zeit: '19:00', aktivitaet: 'Nach Training' },
          { lat: 51.944500, lng: 7.582000, zeit: '19:05', aktivitaet: 'Supermarkt', dauer: 20 },
          { lat: 51.945833, lng: 7.583889, zeit: '19:30', aktivitaet: 'Zurück zuhause' }
        ],
        distanz: 0.6,
        dauer: 30,
        verkehrsmittel: 'fuss'
      }
    ],
    gesamtdistanz: 13.3,
    gesamtdauer: 120,
    startzeit: '07:30',
    endzeit: '19:30',
    hauptaktivitaeten: ['Schulweg', 'Arbeit', 'Spielplatz', 'Sport', 'Einkaufen']
  },
  {
    id: 'familie-baustelle',
    name: 'Familientag mit Baustelle',
    typ: 'mit_baustelle',
    kategorie: 'familien',
    routen: [
      {
        id: 'fam-route-1b',
        name: 'Schulweg Umleitung',
        wegpunkte: [
          { lat: 51.945833, lng: 7.583889, zeit: '07:15', aktivitaet: 'Früher Start wegen Umweg' },
          { lat: 51.944000, lng: 7.582000, zeit: '07:20', aktivitaet: 'Umweg Südroute' },
          { lat: 51.946000, lng: 7.586000, zeit: '07:30', aktivitaet: 'Längerer Weg' },
          { lat: 51.949000, lng: 7.589000, zeit: '07:40', aktivitaet: 'Weitere Umleitung' },
          { lat: 51.950000, lng: 7.588000, zeit: '07:50', aktivitaet: 'Verspätete Ankunft Schule', dauer: 5 }
        ],
        distanz: 1.5,
        dauer: 40,
        verkehrsmittel: 'fuss',
        beeintraechtigung: {
          typ: 'umleitung',
          beschreibung: 'Direkter Schulweg durch Baustelle blockiert',
          zusatzzeit: 20,
          zusatzdistanz: 0.7
        }
      },
      {
        id: 'fam-route-2b',
        name: 'Arbeit mit Stau',
        wegpunkte: [
          { lat: 51.950000, lng: 7.588000, zeit: '07:55', aktivitaet: 'Nach Schulabgabe' },
          { lat: 51.952000, lng: 7.600000, zeit: '08:10', aktivitaet: 'Stau wegen Baustelle' },
          { lat: 51.954000, lng: 7.620000, zeit: '08:30', aktivitaet: 'Langsamer Verkehr' },
          { lat: 51.956565, lng: 7.635773, zeit: '08:45', aktivitaet: 'Verspätete Ankunft Büro' }
        ],
        distanz: 6.8,
        dauer: 50,
        verkehrsmittel: 'auto',
        beeintraechtigung: {
          typ: 'verzoegerung',
          beschreibung: 'Verkehrsstau durch Baustelle, verspätete Ankunft',
          zusatzzeit: 25,
          zusatzdistanz: 1.6
        }
      },
      {
        id: 'fam-route-3b',
        name: 'Spielplatz gesperrt',
        wegpunkte: [
          { lat: 51.956565, lng: 7.635773, zeit: '15:30', aktivitaet: 'Verlassen Büro' },
          { lat: 51.950000, lng: 7.588000, zeit: '16:00', aktivitaet: 'Ankunft Schule' },
          { lat: 51.952000, lng: 7.595000, zeit: '16:15', aktivitaet: 'Alternativer Park', dauer: 30 }
        ],
        distanz: 6.2,
        dauer: 45,
        verkehrsmittel: 'auto',
        beeintraechtigung: {
          typ: 'sperrung',
          beschreibung: 'Gewohnter Spielplatz gesperrt, Ausweichen auf entfernteren Park',
          zusatzzeit: 15,
          zusatzdistanz: 0.7
        }
      }
    ],
    gesamtdistanz: 14.5,
    gesamtdauer: 135,
    startzeit: '07:15',
    endzeit: '17:00',
    hauptaktivitaeten: ['Schulweg (Umweg)', 'Arbeit (verspätet)', 'Alternativer Park'],
    beschreibung: 'Familienalltag erheblich gestört durch Baustellenumleitung'
  }
];

// Singles Tagesabläufe
const singlesTagesablaeufe: Tagesablauf[] = [
  {
    id: 'single-normal',
    name: 'Normaler Single-Tag',
    typ: 'normal',
    kategorie: 'singles',
    routen: [
      {
        id: 'single-route-1',
        name: 'Morgen-Jogging',
        wegpunkte: [
          { lat: 51.962066, lng: 7.628026, zeit: '06:30', aktivitaet: 'Start Apartment Altstadt' },
          { lat: 51.949167, lng: 7.617500, zeit: '06:45', aktivitaet: 'Aasee Runde', dauer: 30 },
          { lat: 51.962066, lng: 7.628026, zeit: '07:15', aktivitaet: 'Zurück zuhause' }
        ],
        distanz: 6.0,
        dauer: 45,
        verkehrsmittel: 'fuss'
      },
      {
        id: 'single-route-2',
        name: 'Zur Arbeit',
        wegpunkte: [
          { lat: 51.962066, lng: 7.628026, zeit: '08:15', aktivitaet: 'Verlassen Wohnung' },
          { lat: 51.956565, lng: 7.635773, zeit: '08:25', aktivitaet: 'Ankunft Büro' }
        ],
        distanz: 1.2,
        dauer: 10,
        verkehrsmittel: 'fahrrad'
      },
      {
        id: 'single-route-3',
        name: 'Mittagspause',
        wegpunkte: [
          { lat: 51.956565, lng: 7.635773, zeit: '12:30', aktivitaet: 'Verlassen Büro' },
          { lat: 51.958000, lng: 7.632000, zeit: '12:35', aktivitaet: 'Restaurant', dauer: 45 }
        ],
        distanz: 0.4,
        dauer: 5,
        verkehrsmittel: 'fuss'
      },
      {
        id: 'single-route-4',
        name: 'After-Work',
        wegpunkte: [
          { lat: 51.956565, lng: 7.635773, zeit: '18:00', aktivitaet: 'Feierabend' },
          { lat: 51.960000, lng: 7.630000, zeit: '18:10', aktivitaet: 'Fitnessstudio', dauer: 75 },
          { lat: 51.962066, lng: 7.628026, zeit: '19:30', aktivitaet: 'Nach Hause' }
        ],
        distanz: 1.8,
        dauer: 90,
        verkehrsmittel: 'fuss'
      }
    ],
    gesamtdistanz: 9.4,
    gesamtdauer: 150,
    startzeit: '06:30',
    endzeit: '19:30',
    hauptaktivitaeten: ['Jogging', 'Arbeit', 'Fitness', 'Restaurant']
  },
  {
    id: 'single-baustelle',
    name: 'Single-Tag mit Baustelle',
    typ: 'mit_baustelle',
    kategorie: 'singles',
    routen: [
      {
        id: 'single-route-1b',
        name: 'Jogging-Umweg',
        wegpunkte: [
          { lat: 51.962066, lng: 7.628026, zeit: '06:30', aktivitaet: 'Start Apartment' },
          { lat: 51.958000, lng: 7.625000, zeit: '06:40', aktivitaet: 'Umweg um Baustelle' },
          { lat: 51.953000, lng: 7.620000, zeit: '06:50', aktivitaet: 'Alternative Route', dauer: 25 },
          { lat: 51.962066, lng: 7.628026, zeit: '07:20', aktivitaet: 'Zurück zuhause' }
        ],
        distanz: 7.2,
        dauer: 50,
        verkehrsmittel: 'fuss',
        beeintraechtigung: {
          typ: 'umleitung',
          beschreibung: 'Gewohnte Jogging-Strecke teilweise gesperrt',
          zusatzzeit: 5,
          zusatzdistanz: 1.2
        }
      },
      {
        id: 'single-route-2b',
        name: 'Arbeitsweg Umleitung',
        wegpunkte: [
          { lat: 51.962066, lng: 7.628026, zeit: '08:20', aktivitaet: 'Später Start' },
          { lat: 51.959000, lng: 7.630000, zeit: '08:25', aktivitaet: 'Umweg' },
          { lat: 51.956565, lng: 7.635773, zeit: '08:35', aktivitaet: 'Ankunft Büro' }
        ],
        distanz: 1.8,
        dauer: 15,
        verkehrsmittel: 'fahrrad',
        beeintraechtigung: {
          typ: 'umleitung',
          beschreibung: 'Radweg blockiert',
          zusatzzeit: 5,
          zusatzdistanz: 0.6
        }
      }
    ],
    gesamtdistanz: 9.0,
    gesamtdauer: 65,
    startzeit: '06:30',
    endzeit: '08:35',
    hauptaktivitaeten: ['Jogging (Umweg)', 'Arbeit'],
    beschreibung: 'Leichte Beeinträchtigungen, aber flexibel anpassbar'
  }
];

// Senioren Tagesabläufe
const seniorenTagesablaeufe: Tagesablauf[] = [
  {
    id: 'senior-normal',
    name: 'Normaler Seniorentag',
    typ: 'normal',
    kategorie: 'senioren',
    routen: [
      {
        id: 'senior-route-1',
        name: 'Morgen-Einkauf',
        wegpunkte: [
          { lat: 51.957500, lng: 7.626111, zeit: '09:00', aktivitaet: 'Verlassen Seniorenwohnung' },
          { lat: 51.956000, lng: 7.627000, zeit: '09:05', aktivitaet: 'Bäcker', dauer: 15 },
          { lat: 51.955000, lng: 7.628500, zeit: '09:25', aktivitaet: 'Apotheke', dauer: 10 },
          { lat: 51.957500, lng: 7.626111, zeit: '09:40', aktivitaet: 'Zurück zuhause' }
        ],
        distanz: 0.8,
        dauer: 40,
        verkehrsmittel: 'fuss'
      },
      {
        id: 'senior-route-2',
        name: 'Arztbesuch',
        wegpunkte: [
          { lat: 51.957500, lng: 7.626111, zeit: '11:00', aktivitaet: 'Zur Bushaltestelle' },
          { lat: 51.960000, lng: 7.620000, zeit: '11:15', aktivitaet: 'Arztpraxis', dauer: 45 }
        ],
        distanz: 1.2,
        dauer: 60,
        verkehrsmittel: 'bus'
      },
      {
        id: 'senior-route-3',
        name: 'Nachmittag-Spaziergang',
        wegpunkte: [
          { lat: 51.957500, lng: 7.626111, zeit: '15:00', aktivitaet: 'Start Spaziergang' },
          { lat: 51.958500, lng: 7.624000, zeit: '15:15', aktivitaet: 'Park', dauer: 30 },
          { lat: 51.957500, lng: 7.626111, zeit: '15:45', aktivitaet: 'Zurück' }
        ],
        distanz: 1.0,
        dauer: 45,
        verkehrsmittel: 'fuss'
      }
    ],
    gesamtdistanz: 3.0,
    gesamtdauer: 145,
    startzeit: '09:00',
    endzeit: '15:45',
    hauptaktivitaeten: ['Einkaufen', 'Arzt', 'Spaziergang']
  },
  {
    id: 'senior-baustelle',
    name: 'Seniorentag mit Baustelle',
    typ: 'mit_baustelle',
    kategorie: 'senioren',
    routen: [
      {
        id: 'senior-route-1b',
        name: 'Einkauf erschwert',
        wegpunkte: [
          { lat: 51.957500, lng: 7.626111, zeit: '09:00', aktivitaet: 'Verlassen Wohnung' },
          { lat: 51.956500, lng: 7.625000, zeit: '09:10', aktivitaet: 'Umweg steile Straße' },
          { lat: 51.954500, lng: 7.630000, zeit: '09:25', aktivitaet: 'Alternativer Supermarkt', dauer: 30 },
          { lat: 51.957500, lng: 7.626111, zeit: '10:00', aktivitaet: 'Erschöpft zurück' }
        ],
        distanz: 1.8,
        dauer: 60,
        verkehrsmittel: 'fuss',
        beeintraechtigung: {
          typ: 'umleitung',
          beschreibung: 'Gewohnter Bäcker nicht erreichbar, längerer steiler Weg',
          zusatzzeit: 20,
          zusatzdistanz: 1.0
        }
      },
      {
        id: 'senior-route-2b',
        name: 'Kein Spaziergang',
        wegpunkte: [
          { lat: 51.957500, lng: 7.626111, zeit: '15:00', aktivitaet: 'Zuhause bleiben' }
        ],
        distanz: 0,
        dauer: 0,
        verkehrsmittel: 'fuss',
        beeintraechtigung: {
          typ: 'sperrung',
          beschreibung: 'Park gesperrt, kein Spaziergang möglich'
        }
      }
    ],
    gesamtdistanz: 1.8,
    gesamtdauer: 60,
    startzeit: '09:00',
    endzeit: '10:00',
    hauptaktivitaeten: ['Erschwertes Einkaufen', 'Kein Spaziergang'],
    beschreibung: 'Stark eingeschränkter Tagesablauf durch Baustelle'
  }
];

// Zusammenstellung der Bewegungsprofile
export const mockBewegungsprofile: Bewegungsprofil[] = [
  {
    kategorie: 'studenten',
    beschreibung: 'Junge Erwachsene zwischen 18-28 Jahren, flexibel und mobil',
    tagesablaeufe: studentenTagesablaeufe,
    typischeOrte: {
      wohnung: { lat: 51.949722, lng: 7.640278, adresse: 'Hafenviertel, Münster' },
      hauptziele: [
        { name: 'Universität', lat: 51.963667, lng: 7.613056, haeufigkeit: 'taeglich' },
        { name: 'Mensa', lat: 51.962066, lng: 7.628026, haeufigkeit: 'taeglich' },
        { name: 'Bibliothek', lat: 51.961500, lng: 7.620500, haeufigkeit: 'taeglich' },
        { name: 'Hochschulsport', lat: 51.949167, lng: 7.617500, haeufigkeit: 'woechentlich' }
      ]
    },
    mobilitaet: {
      bevorzugteVerkehrsmittel: ['fahrrad', 'bus', 'fuss'],
      maxGehstrecke: 3.0
    }
  },
  {
    kategorie: 'familien',
    beschreibung: 'Haushalte mit Kindern, strukturierter Tagesablauf',
    tagesablaeufe: familienTagesablaeufe,
    typischeOrte: {
      wohnung: { lat: 51.945833, lng: 7.583889, adresse: 'Gievenbeck, Münster' },
      hauptziele: [
        { name: 'Grundschule', lat: 51.950000, lng: 7.588000, haeufigkeit: 'taeglich' },
        { name: 'Spielplatz', lat: 51.948000, lng: 7.590000, haeufigkeit: 'taeglich' },
        { name: 'Supermarkt', lat: 51.944500, lng: 7.582000, haeufigkeit: 'woechentlich' },
        { name: 'Sportverein', lat: 51.943000, lng: 7.580000, haeufigkeit: 'woechentlich' }
      ]
    },
    mobilitaet: {
      bevorzugteVerkehrsmittel: ['auto', 'fahrrad', 'fuss'],
      maxGehstrecke: 1.5
    }
  },
  {
    kategorie: 'singles',
    beschreibung: 'Berufstätige Alleinstehende mit flexiblem Lebensstil',
    tagesablaeufe: singlesTagesablaeufe,
    typischeOrte: {
      wohnung: { lat: 51.962066, lng: 7.628026, adresse: 'Altstadt, Münster' },
      hauptziele: [
        { name: 'Büro', lat: 51.956565, lng: 7.635773, haeufigkeit: 'taeglich' },
        { name: 'Fitnessstudio', lat: 51.960000, lng: 7.630000, haeufigkeit: 'woechentlich' },
        { name: 'Aasee', lat: 51.949167, lng: 7.617500, haeufigkeit: 'woechentlich' },
        { name: 'Restaurants', lat: 51.958000, lng: 7.632000, haeufigkeit: 'woechentlich' }
      ]
    },
    mobilitaet: {
      bevorzugteVerkehrsmittel: ['fahrrad', 'fuss', 'auto'],
      maxGehstrecke: 2.5
    }
  },
  {
    kategorie: 'senioren',
    beschreibung: 'Menschen über 65 Jahre mit eingeschränkter Mobilität',
    tagesablaeufe: seniorenTagesablaeufe,
    typischeOrte: {
      wohnung: { lat: 51.957500, lng: 7.626111, adresse: 'Ludgerikreisel, Münster' },
      hauptziele: [
        { name: 'Bäcker', lat: 51.956000, lng: 7.627000, haeufigkeit: 'taeglich' },
        { name: 'Apotheke', lat: 51.955000, lng: 7.628500, haeufigkeit: 'woechentlich' },
        { name: 'Arztpraxis', lat: 51.960000, lng: 7.620000, haeufigkeit: 'woechentlich' },
        { name: 'Park', lat: 51.958500, lng: 7.624000, haeufigkeit: 'taeglich' }
      ]
    },
    mobilitaet: {
      bevorzugteVerkehrsmittel: ['fuss', 'bus'],
      maxGehstrecke: 1.0,
      mobilitaetseinschraenkungen: ['Rollator', 'Keine steilen Wege', 'Häufige Pausen nötig']
    }
  }
];

// Helper-Funktion zum Abrufen von Bewegungsprofilen nach Kategorie
export function getBewegungsprofilByKategorie(kategorie: 'studenten' | 'familien' | 'singles' | 'senioren'): Bewegungsprofil | undefined {
  return mockBewegungsprofile.find(profil => profil.kategorie === kategorie);
}

// Helper-Funktion zum Vergleichen von Tagesabläufen
export function vergleicheTagesablaeufe(kategorie: 'studenten' | 'familien' | 'singles' | 'senioren') {
  const profil = getBewegungsprofilByKategorie(kategorie);
  if (!profil) return null;

  const normal = profil.tagesablaeufe.find(t => t.typ === 'normal');
  const mitBaustelle = profil.tagesablaeufe.find(t => t.typ === 'mit_baustelle');

  if (!normal || !mitBaustelle) return null;

  return {
    kategorie,
    normalerTagesablauf: normal,
    beeintraechtigterTagesablauf: mitBaustelle,
    auswirkungen: {
      zusatzzeit: mitBaustelle.gesamtdauer - normal.gesamtdauer,
      zusatzdistanz: mitBaustelle.gesamtdistanz - normal.gesamtdistanz,
      betroffeneAktivitaeten: mitBaustelle.hauptaktivitaeten.filter(a => a.includes('(') || a.includes('Kein')),
      schweregrad: kategorie === 'senioren' ? 'hoch' : kategorie === 'familien' ? 'mittel' : 'niedrig'
    },
    alternativen: []
  };
}