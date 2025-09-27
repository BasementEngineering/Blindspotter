export interface Wegpunkt {
  lat: number;
  lng: number;
  zeit: string; // Format: "HH:MM"
  aktivitaet: string;
  ort?: string;
  dauer?: number; // in Minuten
}

export interface Route {
  id: string;
  name: string;
  wegpunkte: Wegpunkt[];
  distanz: number; // in km
  dauer: number; // in Minuten
  verkehrsmittel: 'fuss' | 'fahrrad' | 'bus' | 'auto' | 'strassenbahn';
  beeintraechtigung?: {
    typ: 'umleitung' | 'sperrung' | 'verzoegerung' | 'laerm';
    beschreibung: string;
    zusatzzeit?: number; // in Minuten
    zusatzdistanz?: number; // in km
  };
}

export interface Tagesablauf {
  id: string;
  name: string;
  typ: 'normal' | 'mit_baustelle';
  kategorie: 'studenten' | 'familien' | 'singles' | 'senioren';
  routen: Route[];
  gesamtdistanz: number; // in km
  gesamtdauer: number; // in Minuten
  startzeit: string; // Format: "HH:MM"
  endzeit: string; // Format: "HH:MM"
  beschreibung?: string;
  hauptaktivitaeten: string[];
}

export interface Bewegungsprofil {
  kategorie: 'studenten' | 'familien' | 'singles' | 'senioren';
  beschreibung: string;
  tagesablaeufe: Tagesablauf[];
  typischeOrte: {
    wohnung: { lat: number; lng: number; adresse: string };
    hauptziele: Array<{
      name: string;
      lat: number;
      lng: number;
      haeufigkeit: 'taeglich' | 'woechentlich' | 'gelegentlich';
    }>;
  };
  mobilitaet: {
    bevorzugteVerkehrsmittel: Array<'fuss' | 'fahrrad' | 'bus' | 'auto' | 'strassenbahn'>;
    maxGehstrecke: number; // in km
    mobilitaetseinschraenkungen?: string[];
  };
}

export interface VergleichsDaten {
  kategorie: string;
  normalerTagesablauf: Tagesablauf;
  beeintraechtigterTagesablauf: Tagesablauf;
  auswirkungen: {
    zusatzzeit: number; // in Minuten
    zusatzdistanz: number; // in km
    betroffeneAktivitaeten: string[];
    schweregrad: 'niedrig' | 'mittel' | 'hoch';
  };
  alternativen: string[];
}

export interface RoutenAnimation {
  aktuellerWegpunkt: number;
  geschwindigkeit: number; // 1 = normal, 2 = doppelt, etc.
  spielend: boolean;
  zeitpunkt: string; // aktuelle Zeit in der Animation
}