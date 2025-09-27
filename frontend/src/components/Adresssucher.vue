<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selected = ref(props.modelValue)
const addressResults = ref<any[]>([])
const loading = ref(false)
const error = ref(false)

let debounceTimer: number | null = null

watch(() => props.modelValue, val => {
  selected.value = val
})

watch(selected, val => {
  emit('update:modelValue', val)
})

function onSearch(query: string) {
  if (!query || query.length < 3) {
    addressResults.value = []
    return
  }

  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = window.setTimeout(async () => {
    loading.value = true
    error.value = false

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)

      // Prüfen auf Rate-Limit
      if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`)
      }

      const data = await response.json()
      addressResults.value = data
    } catch (err) {
      console.error('Fehler bei der Adresssuche:', err)
      addressResults.value = []
      error.value = true
    } finally {
      loading.value = false
    }
  }, 400)
}
</script>

<template>
  <v-autocomplete
    v-model="selected"
    :items="addressResults"
    :loading="loading"
    label="Adresse eingeben"
    hide-no-data
    hide-selected
    @update:search="onSearch"
    item-title="display_name"
    variant="outlined"
    :error="error"
    :error-messages="error ? ['Adresssuche fehlgeschlagen'] : []"
  />
</template>
