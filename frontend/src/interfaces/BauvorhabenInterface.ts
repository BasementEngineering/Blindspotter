export interface Bauvorhaben {
  id: string;
  name: string;
  beschreibung: string;
  adresse: string;
  koordinaten: {
    lat: number;
    lng: number;
  };
  status: 'geplant' | 'in_bau' | 'abgeschlossen' | 'pausiert';
  bauzeit: {
    beginn: string;
    ende: string;
  };
  bauherr: string;
  projekttyp: 'wohnbau' | 'gewerbe' | 'infrastruktur' | 'oeffentlich';
  groesse: string;
  kosten: string;
}