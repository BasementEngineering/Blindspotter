<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue';

const jsonLd = JSON.stringify(
  {
    '@schema': 'https://json.schemastore.org/jsonld.json',
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: 'Vite Vue3 Vuetify3 TypeScript Startar',
    url: 'https://github.com/logue/vite-vuetify-ts-starter',
    description: 'Vite Vue3 Vuetify3 TypeScript Demo'
  },
  null,
  2
);
</script>

<template>


</template>
