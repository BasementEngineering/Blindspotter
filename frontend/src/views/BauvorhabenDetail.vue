<template>
  <div class="detail-page">
    <!-- Überschrift -->
    <div class="page-header">
      <h1 class="text-h4 mb-0">
        Bauvorhaben: {{ route.query.name || 'Unbekannt' }}
      </h1>
    </div>

    <!-- Content Grid -->
    <div class="content-grid">
      <!-- Linke Spalte: Karte + Details -->
      <div class="left-column">
        <!-- Karte -->
        <v-card class="map-card">
          <v-card-title class="text-subtitle-1 pa-2">
            <v-icon icon="mdi-map" class="me-2" size="small"></v-icon>
            Standort
          </v-card-title>
          <v-card-text class="pa-1">
            <div ref="mapContainer" class="map-widget-fixed"></div>
          </v-card-text>
        </v-card>

        <!-- Bauvorhaben-Details als Chips -->
        <div class="details-section" v-if="bauvorhaben">
          <h3 class="text-subtitle-1 mb-2">
            <v-icon icon="mdi-information-outline" class="me-1" size="small"></v-icon>
            Details
          </h3>
          <div class="details-chips">
            <v-chip size="small" class="ma-1">{{ getProjekttypText(bauvorhaben.projekttyp) }}</v-chip>
            <v-chip size="small" :color="getStatusColor(bauvorhaben.status)" class="ma-1">{{ getStatusText(bauvorhaben.status) }}</v-chip>
            <v-chip size="small" class="ma-1">{{ formatDate(bauvorhaben.bauzeit.beginn) }} - {{ formatDate(bauvorhaben.bauzeit.ende) }}</v-chip>
            <v-chip size="small" class="ma-1">{{ bauvorhaben.groesse }}</v-chip>
            <v-chip size="small" class="ma-1">{{ bauvorhaben.kosten }}</v-chip>
            <v-chip size="small" class="ma-1">{{ bauvorhaben.bauherr }}</v-chip>
          </div>
        </div>
      </div>

      <!-- Rechte Spalte: Dashboard -->
      <div class="right-column">
        <v-card class="dashboard-card">
          <v-card-title class="text-h6">
            <v-icon icon="mdi-account-group" class="me-2"></v-icon>
            Betroffene Menschen (1km Umkreis)
          </v-card-title>
          <v-card-text>
            <!-- Studenten -->
            <div class="people-category-item pa-4 mb-3 cursor-pointer" @click="openBewegungsprofil('studenten')">
              <div class="d-flex align-center mb-3">
                <v-icon icon="mdi-school" size="x-large" color="blue" class="me-4"></v-icon>
                <div class="flex-grow-1">
                  <div class="d-flex align-center justify-space-between">
                    <div>
                      <div class="text-h4 font-weight-bold">1,240</div>
                      <div class="text-h6">Studenten</div>
                    </div>
                    <v-chip color="blue" size="small">32%</v-chip>
                  </div>
                </div>
              </div>

              <div class="d-flex align-center justify-space-between">
                <span class="text-subtitle-2 text-grey">Beeinträchtigung durch Baustelle</span>
                <div class="d-flex align-center">
                  <span class="text-caption me-2 font-weight-bold">Hoch</span>
                  <v-icon icon="mdi-circle" color="red" size="small"></v-icon>
                </div>
              </div>
            </div>

            <!-- Familien -->
            <div class="people-category-item pa-4 mb-3 cursor-pointer" @click="openBewegungsprofil('familien')">
              <div class="d-flex align-center mb-3">
                <v-icon icon="mdi-home-heart" size="x-large" color="green" class="me-4"></v-icon>
                <div class="flex-grow-1">
                  <div class="d-flex align-center justify-space-between">
                    <div>
                      <div class="text-h4 font-weight-bold">950</div>
                      <div class="text-h6">Familien</div>
                    </div>
                    <v-chip color="green" size="small">25%</v-chip>
                  </div>
                </div>
              </div>

              <div class="d-flex align-center justify-space-between">
                <span class="text-subtitle-2 text-grey">Beeinträchtigung durch Baustelle</span>
                <div class="d-flex align-center">
                  <span class="text-caption me-2 font-weight-bold">Mittel</span>
                  <v-icon icon="mdi-circle" color="orange" size="small"></v-icon>
                </div>
              </div>
            </div>

            <!-- Singles -->
            <div class="people-category-item pa-4 mb-3 cursor-pointer" @click="openBewegungsprofil('singles')">
              <div class="d-flex align-center mb-3">
                <v-icon icon="mdi-account" size="x-large" color="orange" class="me-4"></v-icon>
                <div class="flex-grow-1">
                  <div class="d-flex align-center justify-space-between">
                    <div>
                      <div class="text-h4 font-weight-bold">1,080</div>
                      <div class="text-h6">Singles</div>
                    </div>
                    <v-chip color="orange" size="small">28%</v-chip>
                  </div>
                </div>
              </div>

              <div class="d-flex align-center justify-space-between">
                <span class="text-subtitle-2 text-grey">Beeinträchtigung durch Baustelle</span>
                <div class="d-flex align-center">
                  <span class="text-caption me-2 font-weight-bold">Niedrig</span>
                  <v-icon icon="mdi-circle" color="green" size="small"></v-icon>
                </div>
              </div>
            </div>

            <!-- Senioren -->
            <div class="people-category-item pa-4 mb-3 cursor-pointer" @click="openBewegungsprofil('senioren')">
              <div class="d-flex align-center mb-3">
                <v-icon icon="mdi-account-clock" size="x-large" color="purple" class="me-4"></v-icon>
                <div class="flex-grow-1">
                  <div class="d-flex align-center justify-space-between">
                    <div>
                      <div class="text-h4 font-weight-bold">580</div>
                      <div class="text-h6">Senioren</div>
                    </div>
                    <v-chip color="purple" size="small">15%</v-chip>
                  </div>
                </div>
              </div>

              <div class="d-flex align-center justify-space-between">
                <span class="text-subtitle-2 text-grey">Beeinträchtigung durch Baustelle</span>
                <div class="d-flex align-center">
                  <span class="text-caption me-2 font-weight-bold">Hoch</span>
                  <v-icon icon="mdi-circle" color="red" size="small"></v-icon>
                </div>
              </div>
            </div>

            <v-divider class="my-4"></v-divider>

            <div class="text-center mb-4">
              <div class="text-h5 font-weight-bold mb-1">3,850</div>
              <div class="text-subtitle-2 text-grey">Gesamt betroffene Personen</div>
            </div>

          </v-card-text>
        </v-card>
      </div>
    </div>

    <!-- Modal für Kategorie-Details -->
    <v-dialog v-model="modalOpen" max-width="600">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon :icon="modalData.icon" :color="modalData.color" size="large" class="me-3"></v-icon>
            <span class="text-h4">{{ modalData.title }}</span>
          </div>
          <v-btn icon="mdi-close" variant="text" @click="closeModal"></v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <div class="mb-6">
            <h3 class="text-h5 mb-3">Wer gehört dazu?</h3>
            <p class="text-body-1">{{ modalData.description }}</p>
          </div>

          <div>
            <h3 class="text-h5 mb-3">Ein typischer Tag - Auswirkungen der Baustelle</h3>
            <v-timeline density="compact" side="end">
              <v-timeline-item
                v-for="(item, index) in modalData.timeline"
                :key="index"
                :dot-color="item.impactLevel === 'high' ? 'red' : item.impactLevel === 'medium' ? 'orange' : modalData.color"
                size="small"
              >
                <template #opposite>
                  <span class="text-caption font-weight-bold">{{ item.time }}</span>
                </template>
                <div>
                  <div class="text-subtitle-2 font-weight-bold">{{ item.title }}</div>
                  <div class="text-body-2 text-grey mb-2">{{ item.description }}</div>

                  <!-- Baustellen-Auswirkung -->
                  <v-card v-if="item.baustelle" variant="outlined" class="pa-2 mb-2" :class="getImpactClass(item.impactLevel)">
                    <div class="d-flex align-center mb-1">
                      <v-icon :icon="getImpactIcon(item.impactLevel)" :color="getImpactColor(item.impactLevel)" size="small" class="me-1"></v-icon>
                      <span class="text-caption font-weight-bold">{{ getImpactText(item.impactLevel) }} beeinträchtigt</span>
                    </div>
                    <div class="text-caption">{{ item.baustelle.impact }}</div>
                    <div v-if="item.baustelle.timeDelay" class="text-caption text-red mt-1">
                      <v-icon icon="mdi-clock-outline" size="x-small" class="me-1"></v-icon>
                      +{{ item.baustelle.timeDelay }} länger
                    </div>
                    <div v-if="item.baustelle.alternative" class="text-caption text-blue mt-1">
                      <v-icon icon="mdi-lightbulb-outline" size="x-small" class="me-1"></v-icon>
                      {{ item.baustelle.alternative }}
                    </div>
                  </v-card>
                </div>
              </v-timeline-item>
            </v-timeline>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Fallback wenn kein Bauvorhaben gefunden -->
    <v-row v-if="!bauvorhaben">
      <v-col cols="12">
        <v-alert
          type="warning"
          text="Bauvorhaben nicht gefunden"
          class="mb-4"
        ></v-alert>
        <v-btn color="primary" @click="goBack">
          Zurück zur Auswahl
        </v-btn>
      </v-col>
    </v-row>

    <!-- Bewegungsprofil Vergleich Modal -->
    <BewegungsprofilVergleich
      v-model="bewegungsprofilModalOpen"
      :kategorie="selectedKategorie"
      :category-icon="selectedKategorieIcon"
      :category-title="selectedKategorieTitle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import L from 'leaflet';
import { mockBauvorhaben } from '@/data/mockBauvorhaben';
import type { Bauvorhaben } from '@/interfaces/BauvorhabenInterface';
import BewegungsprofilVergleich from '@/components/BewegungsprofilVergleich.vue';

const route = useRoute();
const router = useRouter();
const mapContainer = ref<HTMLElement>();
let map: L.Map | null = null;

// Modal State für Bewegungsprofil Vergleich
const bewegungsprofilModalOpen = ref(false);
const selectedKategorie = ref<'studenten' | 'familien' | 'singles' | 'senioren'>('studenten');
const selectedKategorieTitle = ref('');
const selectedKategorieIcon = ref('');

// Modal State für Timeline (alte Implementierung)
const modalOpen = ref(false);
const modalData = ref({
  title: '',
  icon: '',
  color: '',
  description: '',
  timeline: [] as Array<{
    time: string;
    title: string;
    description: string;
    impactLevel?: 'low' | 'medium' | 'high';
    baustelle?: {
      impact: string;
      timeDelay?: string;
      alternative?: string;
    }
  }>
});

const bauvorhaben = computed((): Bauvorhaben | undefined => {
  const id = route.params.id as string;
  console.log('Looking for bauvorhaben with ID:', id);
  console.log('Query params:', route.query);
  console.log('Name from query:', route.query.name);
  const found = mockBauvorhaben.find(b => b.id === id);
  console.log('Found bauvorhaben:', found);
  return found;
});

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'geplant':
      return 'blue';
    case 'in_bau':
      return 'orange';
    case 'abgeschlossen':
      return 'green';
    case 'pausiert':
      return 'red';
    default:
      return 'grey';
  }
};

const getStatusText = (status: string): string => {
  switch (status) {
    case 'geplant':
      return 'Geplant';
    case 'in_bau':
      return 'Im Bau';
    case 'abgeschlossen':
      return 'Abgeschlossen';
    case 'pausiert':
      return 'Pausiert';
    default:
      return 'Unbekannt';
  }
};

const getProjekttypText = (projekttyp: string): string => {
  switch (projekttyp) {
    case 'wohnbau':
      return 'Wohnbau';
    case 'gewerbe':
      return 'Gewerbe';
    case 'infrastruktur':
      return 'Infrastruktur';
    case 'oeffentlich':
      return 'Öffentlich';
    default:
      return 'Unbekannt';
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const initializeMap = () => {
  if (!mapContainer.value || !bauvorhaben.value) return;

  // Karte initialisieren
  map = L.map(mapContainer.value).setView(
    [bauvorhaben.value.koordinaten.lat, bauvorhaben.value.koordinaten.lng],
    14
  );

  // OpenStreetMap Tiles hinzufügen
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Marker für das Bauvorhaben hinzufügen
  L.marker([
    bauvorhaben.value.koordinaten.lat,
    bauvorhaben.value.koordinaten.lng
  ]).addTo(map);

  // Kreis mit 1km Radius um den Marker
  L.circle([
    bauvorhaben.value.koordinaten.lat,
    bauvorhaben.value.koordinaten.lng
  ], {
    color: '#1976d2',
    fillColor: '#1976d2',
    fillOpacity: 0.1,
    radius: 1000 // 1km in Metern
  }).addTo(map);

  // Kein Popup für sauberere Karte
};

const goBack = () => {
  router.push('/');
};

// Modal Functions für Bewegungsprofil
const openBewegungsprofil = (category: 'studenten' | 'familien' | 'singles' | 'senioren') => {
  selectedKategorie.value = category;

  const categoryInfo = {
    studenten: { title: 'Studenten', icon: 'mdi-school' },
    familien: { title: 'Familien', icon: 'mdi-home-heart' },
    singles: { title: 'Singles', icon: 'mdi-account' },
    senioren: { title: 'Senioren', icon: 'mdi-account-clock' }
  };

  selectedKategorieTitle.value = categoryInfo[category].title;
  selectedKategorieIcon.value = categoryInfo[category].icon;
  bewegungsprofilModalOpen.value = true;
};

// Modal Functions für Timeline (alte Implementierung - deaktiviert zugunsten Bewegungsprofil)
/*
const openModal = (category: string) => {
  const categoryData = {
    studenten: {
      title: 'Studenten',
      icon: 'mdi-school',
      color: 'blue',
      description: 'Junge Erwachsene zwischen 18-28 Jahren, die an der Universität Münster oder anderen Hochschulen studieren. Sie leben meist in WGs oder kleinen Apartments im Stadtzentrum.',
      timeline: [
        { time: '7:00', title: 'Aufstehen', description: 'Spätes Aufstehen, schnelles Frühstück', impactLevel: 'medium' as const, baustelle: { impact: 'Lärm durch frühe Bauarbeiten ab 7:00 Uhr', timeDelay: '30 Min früher aufstehen' } },
        { time: '9:00', title: 'Weg zur Uni', description: 'Mit dem Fahrrad oder Bus zur Universität', impactLevel: 'high' as const, baustelle: { impact: 'Bus-Umleitung, 3 Stationen zu Fuß gehen', timeDelay: '25 Min', alternative: 'Fahrrad (+10 Min) oder Taxi (+15€)' } },
        { time: '10:00', title: 'Vorlesungen', description: 'Teilnahme an Seminaren und Vorlesungen', impactLevel: 'low' as const, baustelle: { impact: 'Oft zu spät, verpasste Anwesenheit' } },
        { time: '14:00', title: 'Mittagspause', description: 'Essen in der Mensa mit Kommilitonen', impactLevel: 'low' as const },
        { time: '15:00', title: 'Lernen/Bibliothek', description: 'Arbeiten in der Bibliothek oder am Campus', impactLevel: 'medium' as const, baustelle: { impact: 'Ständiger Baulärm stört Konzentration', alternative: 'Ruhigere Bibliothek 20 Min entfernt' } },
        { time: '18:00', title: 'Freizeit', description: 'Sport, Studentenjob oder Treffen mit Freunden', impactLevel: 'medium' as const, baustelle: { impact: 'Sportplatz gesperrt, längere Wege zu Alternativen', timeDelay: '15 Min' } },
        { time: '22:00', title: 'Ausgehen', description: 'Kneipen, Clubs oder WG-Parties', impactLevel: 'high' as const, baustelle: { impact: 'Lieblingskneipe wegen Baustelle geschlossen', alternative: 'Ausweichlokal in anderem Stadtteil' } }
      ]
    },
    familien: {
      title: 'Familien',
      icon: 'mdi-home-heart',
      color: 'green',
      description: 'Haushalte mit Kindern, meist Paare zwischen 25-45 Jahren. Sie wohnen in Einfamilienhäusern oder größeren Wohnungen und sind stark in das lokale Gemeindeleben eingebunden.',
      timeline: [
        { time: '6:30', title: 'Familien-Morgen', description: 'Kinder wecken, Frühstück vorbereiten', impactLevel: 'low' },
        { time: '8:00', title: 'Zur Schule/Arbeit', description: 'Kinder zur Schule bringen, zur Arbeit fahren', impactLevel: 'medium', baustelle: { impact: 'Schulweg gesperrt, Umweg nötig', timeDelay: '15 Min', alternative: 'Kinder können bei Nachbarn mitfahren' } },
        { time: '9:00', title: 'Arbeitszeit', description: 'Berufstätigkeit, Homeoffice oder Hausarbeit', impactLevel: 'low' },
        { time: '12:00', title: 'Mittagessen', description: 'Gemeinsames Essen wenn möglich', impactLevel: 'low' },
        { time: '16:00', title: 'Nachmittag', description: 'Kinder von Schule abholen, Hausaufgaben', impactLevel: 'medium', baustelle: { impact: 'Spielplatz gesperrt, Kinder unzufrieden', alternative: 'Park 10 Min weiter entfernt' } },
        { time: '18:00', title: 'Familienzeit', description: 'Spielen, Sport oder gemeinsame Aktivitäten', impactLevel: 'low' },
        { time: '20:00', title: 'Abend', description: 'Abendessen und Gute-Nacht-Routine', impactLevel: 'medium', baustelle: { impact: 'Baulärm stört beim Einschlafen der Kinder' } }
      ]
    },
    singles: {
      title: 'Singles',
      icon: 'mdi-account',
      color: 'orange',
      description: 'Alleinstehende Berufstätige zwischen 25-50 Jahren. Sie schätzen Flexibilität, kurze Wege und ein lebendiges Umfeld mit Cafés, Restaurants und Kulturangeboten.',
      timeline: [
        { time: '7:00', title: 'Morgendliche Routine', description: 'Joggen oder Fitness vor der Arbeit', impactLevel: 'low', baustelle: { impact: 'Laufstrecke teilweise gesperrt', alternative: 'Andere Route durch den Park' } },
        { time: '8:30', title: 'Arbeitsweg', description: 'Kurzer Weg zur Arbeit zu Fuß oder mit dem Rad', impactLevel: 'low', baustelle: { impact: 'Kleine Umleitung über Nebenstraße', timeDelay: '5 Min' } },
        { time: '9:00', title: 'Arbeitszeit', description: 'Konzentriertes Arbeiten im Büro', impactLevel: 'low' },
        { time: '12:30', title: 'Mittagspause', description: 'Lunch mit Kollegen oder alleine', impactLevel: 'low' },
        { time: '17:30', title: 'Feierabend', description: 'Ende der Arbeitszeit', impactLevel: 'low' },
        { time: '18:00', title: 'After-Work', description: 'Einkaufen, Café oder Fitnessstudio', impactLevel: 'low', baustelle: { impact: 'Fitnessstudio gut erreichbar', alternative: 'Flexibilität bei Terminwahl' } },
        { time: '20:00', title: 'Abendgestaltung', description: 'Restaurant, Kino oder Freunde treffen', impactLevel: 'low' }
      ]
    },
    senioren: {
      title: 'Senioren',
      icon: 'mdi-account-clock',
      color: 'purple',
      description: 'Menschen über 65 Jahre, meist im Ruhestand. Sie legen Wert auf nahegelegene Einkaufsmöglichkeiten, gute Anbindung an Ärzte und einen ruhigen, sicheren Wohnbereich.',
      timeline: [
        { time: '6:00', title: 'Früh aufstehen', description: 'Gewohnheitsmäßig früh wach', impactLevel: 'high', baustelle: { impact: 'Bauarbeiten beginnen bereits um 7:00, laute Maschinen', timeDelay: 'Früher wach durch Lärm' } },
        { time: '8:00', title: 'Frühstück', description: 'Ausgiebiges Frühstück mit Zeitung', impactLevel: 'medium', baustelle: { impact: 'Zeitungslieferung verspätet durch gesperrte Straße' } },
        { time: '9:30', title: 'Einkaufen', description: 'Gang zum Bäcker oder Supermarkt', impactLevel: 'high', baustelle: { impact: 'Gewohnter Bäcker nicht erreichbar, längerer Weg', timeDelay: '20 Min', alternative: 'Supermarkt am anderen Ende des Ortes' } },
        { time: '11:00', title: 'Soziale Kontakte', description: 'Nachbarn treffen oder Seniorengruppe', impactLevel: 'medium', baustelle: { impact: 'Seniorenzentrum schwer erreichbar mit Rollator', alternative: 'Taxi oder Hilfe von Familie nötig' } },
        { time: '14:00', title: 'Mittagsruhe', description: 'Entspannung oder kleiner Mittagsschlaf', impactLevel: 'high', baustelle: { impact: 'Kein ruhiger Schlaf durch Baulärm bis 17:00' } },
        { time: '15:30', title: 'Spaziergang', description: 'Runde durch den Park oder die Nachbarschaft', impactLevel: 'medium', baustelle: { impact: 'Gewohnte Route gesperrt, Umweg über steile Straße', alternative: 'Begleitung durch Familie nötig' } },
        { time: '18:00', title: 'Abendessen', description: 'Früh zu Abend essen', impactLevel: 'low' },
        { time: '20:00', title: 'Entspannung', description: 'Fernsehen oder lesen', impactLevel: 'low' }
      ]
    }
  };

  modalData.value = categoryData[category as keyof typeof categoryData];
  modalOpen.value = true;
};
*/

const closeModal = () => {
  modalOpen.value = false;
};

// Impact Helper Functions
const getImpactClass = (level?: string) => {
  switch (level) {
    case 'high': return 'border-red-lighten-2 bg-red-lighten-5';
    case 'medium': return 'border-orange-lighten-2 bg-orange-lighten-5';
    case 'low': return 'border-green-lighten-2 bg-green-lighten-5';
    default: return '';
  }
};

const getImpactIcon = (level?: string) => {
  switch (level) {
    case 'high': return 'mdi-alert-circle';
    case 'medium': return 'mdi-alert';
    case 'low': return 'mdi-information';
    default: return 'mdi-information';
  }
};

const getImpactColor = (level?: string) => {
  switch (level) {
    case 'high': return 'red';
    case 'medium': return 'orange';
    case 'low': return 'green';
    default: return 'grey';
  }
};

const getImpactText = (level?: string) => {
  switch (level) {
    case 'high': return 'Stark';
    case 'medium': return 'Mäßig';
    case 'low': return 'Leicht';
    default: return '';
  }
};

onMounted(() => {
  if (bauvorhaben.value) {
    // Kurze Verzögerung für DOM-Rendering
    setTimeout(initializeMap, 100);
  }
});
</script>

<style scoped>
.detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.map-card {
  height: 400px;
}

.map-widget-fixed {
  width: 100%;
  height: 350px;
  border-radius: 4px;
}

.dashboard-card {
  flex: 1;
}


.details-section {
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.12);
}

.details-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.people-category-item {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;
}

.people-category-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.2);
}

.cursor-pointer {
  cursor: pointer;
}


@media (max-width: 960px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .map-widget-fixed {
    height: 300px;
  }
}
</style>
