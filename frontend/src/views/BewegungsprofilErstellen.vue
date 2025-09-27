<script setup lang="ts">
import { ref } from 'vue';
import TagesablaufErstellen from './TagesablaufErstellen.vue';

interface Bewegungsprofil {
  startzeit: string;
  ort: string;
  name: string;
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

function onTagesablaufUpdate(daten: {
  start: Bewegungsprofil;
  ende: Bewegungsprofil;
  tagesablauf: Bewegungsprofil[];
}) {
  tagesablaufDaten.value = daten;
}

function profilAbschicken() {

}

function getDto() {
  return JSON.stringify({
    tagesablauf: {
      start: tagesablaufDaten.value.start,
      ende: tagesablaufDaten.value.ende,
      ablauf: tagesablaufDaten.value.tagesablauf
    }
  })
}
</script>

<template>
  <div class="page-center">
    <div class="container">
      <h1>Bewegungsprofil erstellen</h1>
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
    max-height: 80vh;
    overflow-y: auto;

    text-align: center;

    .add {
      margin: 15px 0;
      align-self: center;
    }
  }
}
</style>
