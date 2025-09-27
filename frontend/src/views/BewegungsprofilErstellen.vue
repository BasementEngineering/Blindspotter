<script setup lang="ts">
import { ref } from 'vue';
import TagesablaufErstellen from '../components/TagesablaufErstellen.vue';
import ProfilErstellen from '../components/ProfilErstellen.vue';

interface Bewegungsprofil {
  startzeit: string;
  ort: string;
  name: string;
}

interface ProfilDaten {
  name: string;
  description: string;
  age: number | undefined;
  stadtteil: string | undefined;
  main_mode: string | undefined;
  transportation_modes: string[];
  max_walking_distance_km: number | undefined;
}

const tagesablaufDaten = ref<{
  start: Bewegungsprofil;
  ende: Bewegungsprofil;
  tagesablauf: Bewegungsprofil[];
}>({
  start: { startzeit: '', ort: '', name: '' },
  ende: { startzeit: '', ort: '', name: '' },
  tagesablauf: []
});

const profilDaten = ref<ProfilDaten>({
  name: '',
  description: '',
  age: undefined,
  stadtteil: undefined,
  main_mode: undefined,
  transportation_modes: ["Ohne (zu Fuß)"],
  max_walking_distance_km: undefined
});

function onTagesablaufUpdate(daten: {
  start: Bewegungsprofil;
  ende: Bewegungsprofil;
  tagesablauf: Bewegungsprofil[];
}) {
  tagesablaufDaten.value = daten;
}

function onProfilUpdate(daten: ProfilDaten) {
  profilDaten.value = daten;
}

async function profilAbschicken() {
  try {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: getDto()
    });

    if (response.ok) {
      console.log('Profil erfolgreich abgeschickt');
    } else {
      console.error('Fehler beim Abschicken des Profils:', response.statusText);
    }
  } catch (error) {
    console.error('Netzwerkfehler:', error);
  }
}

function getDto() {
  return JSON.stringify({
    name: profilDaten.value.name,
    description: profilDaten.value.description,
    personaTags: {
      age: profilDaten.value.age,
      stadtteil: profilDaten.value.stadtteil,
      main_mode: profilDaten.value.main_mode
    },
    preferences: {
      transportationModes: profilDaten.value.transportation_modes,
      maxWalkingDistanceInKm: profilDaten.value.max_walking_distance_km
    },
    daily_routines: {
      start: tagesablaufDaten.value.start,
      ende: tagesablaufDaten.value.ende,
      tagesablauf: tagesablaufDaten.value.tagesablauf
    }
  })
}
</script>

<template>
  <div class="page-center">
    <div class="container">
      <h1>Bewegungsprofil erstellen</h1>
      <div class="d-flex align-center my-4">
        <v-divider class="flex-grow-1" />
      </div>
      <div class="profile-container">
        <ProfilErstellen @update="onProfilUpdate" />
      </div>
      <div class="d-flex align-center my-4">
        <v-divider class="flex-grow-1" />
      </div>
      <TagesablaufErstellen @update="onTagesablaufUpdate" />
      <div class="add">
        <v-btn color="primary" size="large" @click="profilAbschicken">Profil abschicken</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  .container {
    display: flex;
    flex-direction: column;
    padding: 24px;
    width: 100%;
    max-width: 1000px;
    border-radius: 8px;
    max-height: 95vh;
    overflow-y: auto;

    text-align: center;

    .add {
      margin: 15px 0;
      align-self: center;
    }

    .profile-container {
      max-width: 600px;
      width: 100%;
      align-self: center;
    }
  }
}
</style>
