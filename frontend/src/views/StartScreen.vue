<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="6" md="4" class="text-center">
        <div class="logo-container">
          <v-icon 
            icon="mdi-eye-circle" 
            size="64" 
            color="primary"
            class="logo-icon"
          ></v-icon>
          <h1 class="logo-text">
            <span class="blind">Blind</span><span class="spotter">spotter</span>
          </h1>
          <p class="tagline">Perspektiven sichtbar machen</p>
        </div>
        
        <v-select
          v-model="selectedBauvorhaben"
          :items="bauvorhabenItems"
          label="Bauvorhaben auswählen"
          variant="outlined"
          placeholder="Wählen Sie ein Bauvorhaben..."
          class="mb-4"
        ></v-select>
        
        <v-btn
          v-if="selectedBauvorhaben"
          color="primary"
          size="large"
          @click="showDetails"
          prepend-icon="mdi-eye"
        >
          Anzeigen
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedBauvorhaben = ref(null);

const bauvorhabenItems = [
  'Bauvorhaben A',
  'Bauvorhaben B'
];

const showDetails = () => {
  if (selectedBauvorhaben.value) {
    // Für Demo-Zwecke leiten wir zu einer festen ID weiter
    const id = selectedBauvorhaben.value === 'Bauvorhaben A' ? '1' : '2';
    console.log('Navigating to:', `/bauvorhaben/${id}`, 'Selected:', selectedBauvorhaben.value);
    router.push(`/bauvorhaben/${id}`);
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.logo-container {
  margin-bottom: 1rem;
}

.logo-icon {
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

.logo-text {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.blind {
  color: #1976d2;
}

.spotter {
  color: #424242;
  font-weight: 300;
}

.tagline {
  font-size: 1.1rem;
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 600px) {
  .logo-text {
    font-size: 2.5rem;
  }
}
</style>
