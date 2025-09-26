<script setup lang="ts">
import {ref} from "vue";

const actions: string[] = ["Busstelle streichen", "Parkplatz streichen"]
const selectedAction = ref<string>()

const selectedAddress = ref(null);
const addressResults = ref([]);
const loading = ref(false);

let debounceTimer: number;

function onSearch(query: string) {
  if (!query) return;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    loading.value = true;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    addressResults.value = await res.json();
    loading.value = false;
  }, 300);
}
</script>

<template>
  <div class="page-center">
    <div class="construction-project">
      <h1 class="title">Maßnahme hinzufügen</h1>
      <v-select label="Maßnahme auswählen" variant="outlined" :items="actions" :model-value="selectedAction"></v-select>
      <v-autocomplete
        v-model="selectedAddress"
        :items="addressResults"
        :loading="loading"
        label="Adresse eingeben"
        hide-no-data
        hide-selected
        @update:search="onSearch"
        item-title="display_name"
        variant="outlined"
      />
      <v-footer class="buttons">
        <v-btn size="large" color="primary">Hinzufügen</v-btn>
        <v-btn size="large" variant="tonal" to="/" color="primary">Zurück</v-btn>
      </v-footer>
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

  .construction-project {
    display: flex;
    flex-direction: column;
    padding: 24px;
    width: 100%;
    max-width: 600px;
    border-radius: 8px;

    .title {
      margin-bottom: 20px;
      text-align: center;
    }

    .buttons {
      display: flex;
      justify-content: center;
      margin-top: 24px;
    }

    .buttons > *:not(:last-child) {
      margin-right: 16px;
    }
  }
}
</style>
