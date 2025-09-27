<script setup lang="ts">
import { ref } from 'vue';
import Adresssucher from '@/components/Adresssucher.vue';

interface Bewegungsprofil {
  startzeit: string;
  ort: string;
  name: string;
}

const start = ref<Bewegungsprofil>({
  startzeit: '',
  ort: '',
  name: ''
});
const ende = ref<Bewegungsprofil>({
  startzeit: '',
  ort: start.value.ort,
  name: start.value.name
});
const tagesablauf = ref<Bewegungsprofil[]>([]);

function ortHinzufuegen() {
 tagesablauf.value.push({
   startzeit: '',
   ort: '',
   name: ''
 })
}

function ortLoeschen(index: number) {
  tagesablauf.value.splice(index, 1);
}
</script>

<template>
  <div class="page-center">
    <div class="ablauf-container">
      <h1 class="title">Tagesablauf erstellen</h1>
      <div class="start">
        <h3>Start</h3>
        <v-text-field v-model="start.startzeit" label="Startzeit (HH:mm)" class="startzeit" hide-details variant="outlined"></v-text-field>
        <v-text-field v-model="start.name" label="Name" class="name" hide-details variant="outlined"></v-text-field>
        <Adresssucher v-model="start.ort" label="Adresse" class="ort" hide-details variant="outlined"></Adresssucher>
        <v-btn variant="tonal" rounded="md" class="delete invisible"><v-icon>mdi-close-thick</v-icon></v-btn>
      </div>
      <div v-for="(ablauf, index) in tagesablauf" :key="index" class="ablauf-item">
        <h3>{{ index + 1 }}</h3>
        <v-text-field v-model="ablauf.startzeit" label="Startzeit (HH:mm)" class="startzeit" hide-details variant="outlined"></v-text-field>
        <v-text-field v-model="ablauf.name" label="Name" class="name" hide-details variant="outlined"></v-text-field>
        <Adresssucher v-model="ablauf.ort" label="Adresse" class="ort" hide-details variant="outlined"></Adresssucher>
        <v-btn variant="outlined" color="primary" rounded="md" class="delete" @click="ortLoeschen(index)"><v-icon>mdi-close-thick</v-icon></v-btn>
      </div>
      <div class="add">
        <v-btn icon="$plus" color="primary" variant="tonal" @click="ortHinzufuegen"></v-btn>
      </div>
      <div class="ende">
        <h3>Ende</h3>
        <v-text-field v-model="ende.startzeit" label="Startzeit (HH:mm)" class="startzeit" hide-details variant="outlined"></v-text-field>
        <v-text-field readonly v-model="start.name" label="Name" class="name" hide-details variant="outlined"></v-text-field>
        <Adresssucher readonly v-model="start.ort" label="Adresse" class="ort" hide-details variant="outlined"></Adresssucher>
        <v-btn variant="tonal" rounded="md" class="delete invisible"><v-icon>mdi-close-thick</v-icon></v-btn>
      </div>
      <div class="add">
        <v-btn color="primary" size="large">Profil abschicken</v-btn>
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

  .ablauf-container {
    display: flex;
    flex-direction: column;
    padding: 24px;
    width: 100%;
    max-width: 1000px;
    border-radius: 8px;
    max-height: 80vh;
    overflow-y: auto;

    .title {
      margin-bottom: 20px;
      text-align: center;
    }

    .add {
      margin: 15px 0;
      align-self: center;
    }

    .start, .ende, .ablauf-item {
      display: flex;
      flex-direction: row;
      align-items: center;

      h3 {
        margin-right: 15px;
        width: 50px;
        text-align: right;
      }

      .v-input {
        margin: 10px 5px;
      }

      .delete {
        height: 56px;
        width: 56px;
      }

      .invisible {
        visibility: hidden;
      }

      .startzeit {
        width: 20%
      }
      .name {
        width: 30%;
      }
      .ort {
        width: 50%;
      }
    }
  }
}
</style>
