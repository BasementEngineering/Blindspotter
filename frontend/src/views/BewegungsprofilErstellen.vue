<script setup lang="ts">
import { ref } from 'vue';

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

}
</script>

<template>
  <div class="page-center">
    <div class="ablauf-container">
      <h1 class="title">Bewegungsprofil erstellen</h1>
      <div class="start">
        <h3>Start</h3>
        <v-text-field v-model="start.startzeit" label="Startzeit (HH:mm)" class="startzeit" hide-details variant="outlined"></v-text-field>
        <v-text-field v-model="start.name" label="Name" class="name" hide-details variant="outlined"></v-text-field>
        <v-text-field v-model="start.ort" label="Adresse" class="ort" hide-details variant="outlined"></v-text-field>
      </div>
      <div v-for="(ablauf, index) in tagesablauf" :key="index" class="ablauf-item">
        <v-text-field v-model="ablauf.startzeit" label="Startzeit (HH:mm)" class="startzeit" hide-details variant="outlined"></v-text-field>
        <v-text-field v-model="ablauf.name" label="Name" class="name" hide-details variant="outlined"></v-text-field>
        <v-text-field v-model="ablauf.ort" label="Adresse" class="ort" hide-details variant="outlined"></v-text-field>
      </div>
      <div class="add">
        <v-btn icon="$plus" color="primary" @click="ortHinzufuegen"></v-btn>
      </div>
      <div class="ende">
        <h3>Ende</h3>
        <v-text-field v-model="ende.startzeit" label="Startzeit (HH:mm)" class="startzeit" hide-details variant="outlined"></v-text-field>
        <v-text-field readonly v-model="start.name" label="Name" class="name" hide-details variant="outlined"></v-text-field>
        <v-text-field readonly v-model="start.ort" label="Adresse" class="ort" hide-details variant="outlined"></v-text-field>
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
    max-width: 900px;
    border-radius: 8px;

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
      }

      .v-input {
        margin: 0 5px;
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
