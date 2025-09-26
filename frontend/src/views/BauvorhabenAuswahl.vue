<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-4">
          <v-card-title class="text-h4 text-center pa-6">
            <v-icon icon="mdi-city" class="me-3" color="primary"></v-icon>
            Bauvorhaben auswählen
          </v-card-title>
          
          <v-card-text class="pa-6">
            <v-select
              v-model="selectedBauvorhaben"
              :items="bauvorhabenItems"
              item-title="label"
              item-value="value"
              label="Wählen Sie ein Bauvorhaben aus"
              prepend-icon="mdi-map-marker"
              variant="outlined"
              placeholder="Bauvorhaben auswählen..."
              :loading="loading"
            >
              <template #item="{ props, item }">
                <v-list-item v-bind="props">
                  <template #prepend>
                    <v-chip
                      :color="getStatusColor(item.raw.status)"
                      size="small"
                      class="me-2"
                    >
                      {{ getStatusText(item.raw.status) }}
                    </v-chip>
                  </template>
                  <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.raw.adresse }}</v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-select>

            <v-btn
              v-if="selectedBauvorhaben"
              color="primary"
              size="large"
              block
              class="mt-4"
              @click="navigateToDetail"
              prepend-icon="mdi-eye"
            >
              Details anzeigen
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { mockBauvorhaben } from '@/data/mockBauvorhaben';
import type { Bauvorhaben } from '@/interfaces/BauvorhabenInterface';

const router = useRouter();
const loading = ref(false);
const selectedBauvorhaben = ref<string | null>(null);

const bauvorhabenItems = computed(() => {
  return mockBauvorhaben.map((bauvorhaben: Bauvorhaben) => ({
    label: bauvorhaben.name,
    value: bauvorhaben.id,
    name: bauvorhaben.name,
    adresse: bauvorhaben.adresse,
    status: bauvorhaben.status
  }));
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

const navigateToDetail = () => {
  if (selectedBauvorhaben.value) {
    router.push(`/bauvorhaben/${selectedBauvorhaben.value}`);
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>