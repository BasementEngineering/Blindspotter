<script setup lang="ts">
import { ref } from 'vue';

const stadtteile = ["1 Teilbereich Altstadt", "11 Aegidii", "12 Überwasser", "13 Dom", "14 Buddenturm", "1-4 Münster-Mitte", "15 Martini", "2 Teilbereich Innenstadtring", "21 Pluggendorf", "22 Josef", "23 Bahnhof", "24 Hansaplatz", "25 Mauritz-West", "26 Schlachthof", "27 Kreuz", "28 Neutor", "29 Schloss", "3 Teilbereich Mitte-Süd", "31 Aaseestadt", "32 Geist", "33 Schützenhof", "34 Düesberg", "4 Teilbereich Mitte-Nordost", "43 Hafen", "44 Herz-Jesu", "45 Mauritz-Mitte", "46 Rumphorst", "47 Uppenberg", "5 Münster-West", "51 Gievenbeck", "52 Sentrup", "54 Mecklenbeck", "56 Albachten", "57 Roxel", "58 Nienberge", "6 Münster-Nord", "61 Coerde", "62 Kinderhaus-Ost", "63 Kinderhaus-West", "68 Sprakel", "7 Münster-Ost", "71 Mauritz-Ost", "76 Gelmer-Dyckburg", "77 Handorf", "8 Münster-Südost", "81 Gremmendorf-West", "82 Gremmendorf-Ost", "86 Angelmodde", "87 Wolbeck", "9 Münster-Hiltrup", "91 Berg Fidel", "95 Hiltrup-Ost", "96 Hiltrup-Mitte", "97 Hiltrup-West", "98 Amelsbüren"];
const verkehrsmittel = ["Fahrrad", "ÖPNV", "PKW / Mitfahrende", "Ohne (zu Fuß)"];

const name = ref<string>("")
const description = ref<string>("")
const age = ref<number>()
const stadtteil = ref<string>()
const main_mode = ref<string>()
const transportation_modes = ref<string[]>(["Ohne (zu Fuß)"])
const max_walking_distance_km = ref<number>()
</script>

<template>
  <h2 class="title">Profil erstellen</h2>
  <v-text-field label="Name" v-model="name" variant="outlined"></v-text-field>
  <v-text-field label="Beschreibung" v-model="description" variant="outlined"></v-text-field>
  <v-text-field label="Alter" v-model="age" type="number" min="1" variant="outlined"></v-text-field>
  <v-select :items="stadtteile" label="Stadtteil" v-model="stadtteil" variant="outlined"></v-select>
  <v-select :items="transportation_modes" label="Haupttransportmittel" v-model="main_mode" variant="outlined"></v-select>
  <div class="transportmittel-checkboxes">
    <h4>Verfügbare Transportmittel</h4>
    <v-checkbox
      v-for="mittel in verkehrsmittel"
      :key="mittel"
      v-model="transportation_modes"
      :label="mittel"
      :value="mittel"
      :disabled="mittel === 'Ohne (zu Fuß)'"
      hide-details
    ></v-checkbox>
  </div>
  <v-text-field label="Maximale Gehdistanz (in km)" v-model="max_walking_distance_km" type="number" min="0.1" step="0.1" variant="outlined"></v-text-field>
</template>

<style scoped>
.transportmittel-checkboxes {
  margin: 16px 0;
}

.transportmittel-checkboxes h4 {
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-weight: 400;
}
</style>
