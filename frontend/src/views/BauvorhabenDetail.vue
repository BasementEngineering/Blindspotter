<template>
  <v-container fluid class="pa-4">
    <!-- Überschrift -->
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-4">
          Bauvorhaben: {{ bauvorhaben?.name || 'Unbekannt' }}
        </h1>
      </v-col>
    </v-row>

    <!-- Karte oben links -->
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-h6">
            <v-icon icon="mdi-map" class="me-2"></v-icon>
            Standort
          </v-card-title>
          <v-card-text class="pa-2">
            <div ref="mapContainer" class="map-widget"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import L from 'leaflet';
import { mockBauvorhaben } from '@/data/mockBauvorhaben';
import type { Bauvorhaben } from '@/interfaces/BauvorhabenInterface';

const route = useRoute();
const router = useRouter();
const mapContainer = ref<HTMLElement>();
let map: L.Map | null = null;

const bauvorhaben = computed((): Bauvorhaben | undefined => {
  const id = route.params.id as string;
  console.log('Looking for bauvorhaben with ID:', id);
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
    15
  );

  // OpenStreetMap Tiles hinzufügen
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Marker für das Bauvorhaben hinzufügen
  const marker = L.marker([
    bauvorhaben.value.koordinaten.lat,
    bauvorhaben.value.koordinaten.lng
  ]).addTo(map);

  // Popup für den Marker
  marker.bindPopup(`
    <div>
      <h3>${bauvorhaben.value.name}</h3>
      <p><strong>Status:</strong> ${getStatusText(bauvorhaben.value.status)}</p>
      <p><strong>Adresse:</strong> ${bauvorhaben.value.adresse}</p>
    </div>
  `).openPopup();
};

const goBack = () => {
  router.push('/');
};

onMounted(() => {
  if (bauvorhaben.value) {
    // Kurze Verzögerung für DOM-Rendering
    setTimeout(initializeMap, 100);
  }
});
</script>

<style scoped>
.map-widget {
  width: 100%;
  height: 300px;
  border-radius: 4px;
}

@media (max-width: 960px) {
  .map-widget {
    height: 250px;
  }
}
</style>