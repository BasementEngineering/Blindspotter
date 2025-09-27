<template>
  <v-dialog v-model="isOpen" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <!-- Header -->
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <v-icon :icon="categoryIcon" class="me-2"></v-icon>
          {{ categoryTitle }} - Bewegungsprofil Vergleich
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- Content -->
      <v-container fluid class="pa-0" style="position: relative; height: calc(100vh - 64px);">
        <v-row no-gutters class="fill-height">
          <!-- Linke Seite: Normaler Tagesablauf -->
          <v-col cols="12" md="6" class="border-e">
            <div class="profile-side">
              <div class="profile-header pa-3 bg-green-lighten-5">
                <h3 class="text-h6">
                  <v-icon icon="mdi-check-circle" color="green" class="me-2"></v-icon>
                  Normaler Tagesablauf
                </h3>
                <p class="text-body-2 text-grey-darken-1 mt-1">Ohne Baustellenbeeinträchtigung</p>
              </div>

              <!-- Karte und Statistiken (fixed) -->
              <div class="fixed-header">
                <div ref="mapNormal" class="route-map"></div>

                <!-- Statistiken -->
                <v-card flat class="ma-3">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="6">
                      <div class="stat-item">
                        <v-icon icon="mdi-map-marker-distance" size="small" color="primary"></v-icon>
                        <span class="text-caption ms-1">Distanz</span>
                        <div class="text-h6">{{ normalStats.distanz }} km</div>
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <div class="stat-item">
                        <v-icon icon="mdi-clock-outline" size="small" color="primary"></v-icon>
                        <span class="text-caption ms-1">Dauer</span>
                        <div class="text-h6">{{ normalStats.dauer }} Min</div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
                </v-card>
              </div>

              <!-- Timeline (scrollable) -->
              <div class="timeline-container pa-3 mb-10">
                <v-timeline density="compact" side="end">
                  <v-timeline-item
                    v-for="route in normalTagesablauf?.routen"
                    :key="route.id"
                    :dot-color="getVerkehrsmittelColor(route.verkehrsmittel)"
                    size="small"
                  >
                    <template #opposite>
                      <span class="text-caption">{{ route.wegpunkte?.[0]?.zeit }}</span>
                    </template>
                    <div>
                      <div class="text-subtitle-2 font-weight-bold">{{ route.name }}</div>
                      <div class="text-caption text-grey">
                        <v-icon :icon="getVerkehrsmittelIcon(route.verkehrsmittel)" size="x-small"></v-icon>
                        {{ route.distanz }} km · {{ route.dauer }} Min
                      </div>
                      <div v-for="punkt in route.wegpunkte" :key="punkt.zeit" class="text-caption">
                        {{ punkt.zeit }} - {{ punkt.aktivitaet }}
                      </div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </div>
            </div>
          </v-col>

          <!-- Rechte Seite: Tagesablauf mit Baustelle -->
          <v-col cols="12" md="6">
            <div class="profile-side">
              <div class="profile-header pa-3 bg-red-lighten-5">
                <h3 class="text-h6">
                  <v-icon icon="mdi-alert-circle" color="red" class="me-2"></v-icon>
                  Mit Baustellenbeeinträchtigung
                </h3>
                <p class="text-body-2 text-grey-darken-1 mt-1">{{ baustelleTagesablauf?.beschreibung }}</p>
              </div>

              <!-- Karte und Statistiken (fixed) -->
              <div class="fixed-header">
                <div ref="mapBaustelle" class="route-map"></div>

                <!-- Statistiken mit Vergleich -->
                <v-card flat class="ma-3">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="6">
                      <div class="stat-item">
                        <v-icon icon="mdi-map-marker-distance" size="small" color="primary"></v-icon>
                        <span class="text-caption ms-1">Distanz</span>
                        <div class="text-h6">
                          {{ baustelleStats.distanz }} km
                          <v-chip size="x-small" color="red" class="ms-1">
                            +{{ (baustelleStats.distanz - normalStats.distanz).toFixed(1) }} km
                          </v-chip>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <div class="stat-item">
                        <v-icon icon="mdi-clock-outline" size="small" color="primary"></v-icon>
                        <span class="text-caption ms-1">Dauer</span>
                        <div class="text-h6">
                          {{ baustelleStats.dauer }} Min
                          <v-chip size="x-small" color="red" class="ms-1">
                            +{{ baustelleStats.dauer - normalStats.dauer }} Min
                          </v-chip>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
                </v-card>
              </div>

              <!-- Timeline mit Beeinträchtigungen (scrollable) -->
              <div class="timeline-container pa-3 mb-10">
                <v-timeline density="compact" side="end">
                  <v-timeline-item
                    v-for="route in baustelleTagesablauf?.routen"
                    :key="route.id"
                    :dot-color="route.beeintraechtigung ? 'red' : getVerkehrsmittelColor(route.verkehrsmittel)"
                    size="small"
                  >
                    <template #opposite>
                      <span class="text-caption">{{ route.wegpunkte?.[0]?.zeit }}</span>
                    </template>
                    <div>
                      <div class="text-subtitle-2 font-weight-bold">{{ route.name }}</div>
                      <div class="text-caption text-grey">
                        <v-icon :icon="getVerkehrsmittelIcon(route.verkehrsmittel)" size="x-small"></v-icon>
                        {{ route.distanz }} km · {{ route.dauer }} Min
                      </div>

                      <!-- Beeinträchtigung -->
                      <v-alert
                        v-if="route.beeintraechtigung"
                        density="compact"
                        type="warning"
                        class="my-2"
                      >
                        <div class="text-caption">
                          <strong>{{ getBeeintraechtigungText(route.beeintraechtigung.typ) }}:</strong>
                          {{ route.beeintraechtigung.beschreibung }}
                          <div v-if="route.beeintraechtigung.zusatzzeit" class="mt-1">
                            <v-icon icon="mdi-clock-alert" size="x-small"></v-icon>
                            +{{ route.beeintraechtigung.zusatzzeit }} Min Verzögerung
                          </div>
                          <div v-if="route.beeintraechtigung.zusatzdistanz" class="mt-1">
                            <v-icon icon="mdi-map-marker-distance" size="x-small"></v-icon>
                            +{{ route.beeintraechtigung.zusatzdistanz }} km Umweg
                          </div>
                        </div>
                      </v-alert>

                      <div v-for="punkt in route.wegpunkte" :key="punkt.zeit" class="text-caption">
                        {{ punkt.zeit }} - {{ punkt.aktivitaet }}
                      </div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </div>
            </div>
          </v-col>
        </v-row>

      </v-container>

      <!-- Zusammenfassung unten (außerhalb des Containers) -->
      <v-card flat class="summary-card">
        <v-card-text>
          <v-row align="center">
            <v-col cols="12" md="4">
              <div class="text-center">
                <v-icon
                  :icon="getSchwereGradIcon(vergleichsDaten?.auswirkungen.schweregrad)"
                  :color="getSchwereGradColor(vergleichsDaten?.auswirkungen.schweregrad)"
                  size="x-large"
                ></v-icon>
                <div class="text-h6 mt-2">
                  Beeinträchtigung: {{ getSchwereGradText(vergleichsDaten?.auswirkungen.schweregrad) }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <div class="text-subtitle-1 mb-2">Hauptauswirkungen:</div>
              <v-chip-group>
                <v-chip
                  v-for="aktivitaet in vergleichsDaten?.auswirkungen.betroffeneAktivitaeten"
                  :key="aktivitaet"
                  color="red"
                  variant="outlined"
                  size="small"
                >
                  {{ aktivitaet }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import L from 'leaflet';
import { vergleicheTagesablaeufe } from '@/data/mockBewegungsprofile';

// Props
interface Props {
  modelValue: boolean;
  kategorie: 'studenten' | 'familien' | 'singles' | 'senioren';
  categoryIcon: string;
  categoryTitle: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

// Refs
const mapNormal = ref<HTMLElement>();
const mapBaustelle = ref<HTMLElement>();
let mapNormalInstance: L.Map | null = null;
let mapBaustelleInstance: L.Map | null = null;

// Computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const vergleichsDaten = computed(() => {
  return vergleicheTagesablaeufe(props.kategorie);
});

const normalTagesablauf = computed(() => {
  return vergleichsDaten.value?.normalerTagesablauf;
});

const baustelleTagesablauf = computed(() => {
  return vergleichsDaten.value?.beeintraechtigterTagesablauf;
});

const normalStats = computed(() => ({
  distanz: normalTagesablauf.value?.gesamtdistanz || 0,
  dauer: normalTagesablauf.value?.gesamtdauer || 0
}));

const baustelleStats = computed(() => ({
  distanz: baustelleTagesablauf.value?.gesamtdistanz || 0,
  dauer: baustelleTagesablauf.value?.gesamtdauer || 0
}));

// Methods
const close = () => {
  isOpen.value = false;
};

const getVerkehrsmittelIcon = (mittel: string) => {
  const icons: Record<string, string> = {
    fuss: 'mdi-walk',
    fahrrad: 'mdi-bike',
    bus: 'mdi-bus',
    auto: 'mdi-car',
    strassenbahn: 'mdi-tram'
  };
  return icons[mittel] || 'mdi-help';
};

const getVerkehrsmittelColor = (mittel: string) => {
  const colors: Record<string, string> = {
    fuss: 'green',
    fahrrad: 'blue',
    bus: 'orange',
    auto: 'grey',
    strassenbahn: 'purple'
  };
  return colors[mittel] || 'grey';
};

const getBeeintraechtigungText = (typ: string) => {
  const texts: Record<string, string> = {
    umleitung: 'Umleitung',
    sperrung: 'Sperrung',
    verzoegerung: 'Verzögerung',
    laerm: 'Lärmbelästigung'
  };
  return texts[typ] || typ;
};

const getSchwereGradIcon = (grad?: string) => {
  const icons: Record<string, string> = {
    niedrig: 'mdi-alert-circle-outline',
    mittel: 'mdi-alert',
    hoch: 'mdi-alert-octagon'
  };
  return icons[grad || 'niedrig'] || 'mdi-help';
};

const getSchwereGradColor = (grad?: string) => {
  const colors: Record<string, string> = {
    niedrig: 'green',
    mittel: 'orange',
    hoch: 'red'
  };
  return colors[grad || 'niedrig'] || 'grey';
};

const getSchwereGradText = (grad?: string) => {
  const texts: Record<string, string> = {
    niedrig: 'Gering',
    mittel: 'Mittel',
    hoch: 'Hoch'
  };
  return texts[grad || 'niedrig'] || 'Unbekannt';
};

// Karten initialisieren
const initializeMaps = async () => {
  await nextTick();

  if (!mapNormal.value || !mapBaustelle.value) return;

  // Normale Route Karte
  mapNormalInstance = L.map(mapNormal.value).setView([51.960, 7.626], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(mapNormalInstance);

  // Mit Baustelle Karte
  mapBaustelleInstance = L.map(mapBaustelle.value).setView([51.960, 7.626], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(mapBaustelleInstance);

  // Routen zeichnen
  drawRoutes();
};

// Funktion zur Bestimmung der Routenfarbe basierend auf Zeitvergleich
const getTimeComparisonColor = (normalDauer: number, baustelleDauer: number) => {
  if (baustelleDauer > normalDauer) {
    return '#ff4444'; // Rot: langsamer
  } else if (baustelleDauer === normalDauer) {
    return '#2196f3'; // Blau: gleich schnell
  } else {
    return '#4caf50'; // Grün: schneller
  }
};

// Findet die entsprechende Normal-Route für eine Baustellen-Route
const findMatchingNormalRoute = (baustelleRouteId: string) => {
  // Versuche über ähnliche ID zu matchen (z.B. route-1 -> route-1b)
  const baseId = baustelleRouteId.replace(/b$/, '');
  return normalTagesablauf.value?.routen.find(r => r.id === baseId || r.id === baustelleRouteId.replace('b', ''));
};

const drawRoutes = () => {
  if (!mapNormalInstance || !mapBaustelleInstance) return;

  // Normale Routen (linke Karte - neutrale Farben)
  normalTagesablauf.value?.routen.forEach(route => {
    const points = route.wegpunkte.map(wp => [wp.lat, wp.lng] as [number, number]);
    L.polyline(points, {
      color: getPolylineColor(route.verkehrsmittel),
      weight: 3,
      opacity: 0.7
    }).addTo(mapNormalInstance!);

    // Wegpunkt-Marker
    route.wegpunkte.forEach(wp => {
      if (wp.ort) {
        L.marker([wp.lat, wp.lng])
          .bindPopup(`<b>${wp.ort}</b><br>${wp.zeit} - ${wp.aktivitaet}`)
          .addTo(mapNormalInstance!);
      }
    });
  });

  // Baustellen-Routen (rechte Karte - mit Zeitvergleichs-Farben)
  baustelleTagesablauf.value?.routen.forEach((route, index) => {
    const points = route.wegpunkte.map(wp => [wp.lat, wp.lng] as [number, number]);

    // Finde die entsprechende Normal-Route zum Vergleich
    const normalRoute = findMatchingNormalRoute(route.id) || normalTagesablauf.value?.routen[index];

    // Bestimme Farbe basierend auf Zeitvergleich
    let routeColor = getPolylineColor(route.verkehrsmittel); // Fallback
    if (normalRoute && route.dauer && normalRoute.dauer) {
      routeColor = getTimeComparisonColor(normalRoute.dauer, route.dauer);
    } else if (route.beeintraechtigung?.zusatzzeit) {
      // Falls keine direkte Entsprechung, aber Zusatzzeit vorhanden
      routeColor = '#ff4444'; // Rot für Verzögerungen
    }

    L.polyline(points, {
      color: routeColor,
      weight: route.beeintraechtigung ? 4 : 3,
      opacity: 0.8,
      dashArray: route.beeintraechtigung ? '10, 5' : undefined
    }).addTo(mapBaustelleInstance!);

    // Wegpunkt-Marker
    route.wegpunkte.forEach(wp => {
      if (wp.ort) {
        const markerColor = route.beeintraechtigung ? routeColor : undefined;
        const icon = markerColor
          ? L.divIcon({
              html: `<div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
              iconSize: [12, 12],
              className: ''
            })
          : undefined;

        L.marker([wp.lat, wp.lng], { icon })
          .bindPopup(`<b>${wp.ort}</b><br>${wp.zeit} - ${wp.aktivitaet}`)
          .addTo(mapBaustelleInstance!);
      }
    });
  });

  // Baustellen-Bereich markieren
  L.circle([51.957500, 7.626111], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius: 500
  }).addTo(mapBaustelleInstance!);

  // Legende für Zeitvergleich auf der rechten Karte hinzufügen
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    div.style.backgroundColor = 'white';
    div.style.padding = '6px 8px';
    div.style.borderRadius = '4px';
    div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
    div.innerHTML = `
      <div style="font-size: 11px; font-weight: bold; margin-bottom: 4px;">Zeitvergleich:</div>
      <div style="font-size: 10px;">
        <div style="margin: 2px 0;"><span style="display: inline-block; width: 20px; height: 3px; background: #ff4444; margin-right: 5px;"></span>Länger</div>
        <div style="margin: 2px 0;"><span style="display: inline-block; width: 20px; height: 3px; background: #2196f3; margin-right: 5px;"></span>Gleich</div>
        <div style="margin: 2px 0;"><span style="display: inline-block; width: 20px; height: 3px; background: #4caf50; margin-right: 5px;"></span>Schneller</div>
      </div>
    `;
    return div;
  };
  legend.addTo(mapBaustelleInstance!);
};

const getPolylineColor = (verkehrsmittel: string) => {
  const colors: Record<string, string> = {
    fuss: '#4caf50',
    fahrrad: '#2196f3',
    bus: '#ff9800',
    auto: '#9e9e9e',
    strassenbahn: '#9c27b0'
  };
  return colors[verkehrsmittel] || '#000000';
};

// Watchers
watch(isOpen, (val) => {
  if (val) {
    setTimeout(initializeMaps, 100);
  } else {
    // Clean up maps
    if (mapNormalInstance) {
      mapNormalInstance.remove();
      mapNormalInstance = null;
    }
    if (mapBaustelleInstance) {
      mapBaustelleInstance.remove();
      mapBaustelleInstance = null;
    }
  }
});
</script>

<style scoped>
.profile-side {
  height: calc(100vh - 64px - 80px); /* Toolbar + Bottom-Bar */
  display: flex;
  flex-direction: column;
  position: relative;
}

.profile-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.fixed-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}

.route-map {
  height: 300px;
  width: 100%;
}

.stat-item {
  text-align: center;
  padding: 8px;
}

.timeline-container {
  flex: 1;
  padding: 16px;
  padding-bottom: 12rem; /* Zusätzlicher Scrollbereich am Ende */
  overflow-y: auto;
  min-height: 0; /* Wichtig für flexbox overflow */
}

.summary-card {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 80px;
  z-index: 1000;
  border-top: 2px solid rgba(0, 0, 0, 0.12);
  background: white;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
}

@media (max-width: 960px) {
  .profile-side {
    height: auto;
  }

  .route-map {
    height: 250px;
  }
}
</style>
