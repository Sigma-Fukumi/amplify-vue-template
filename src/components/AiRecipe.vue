<script setup lang="ts">
import { ref } from 'vue'
import { client } from '../../src/client'

const description = ref('')
const result = ref<any>(null)
const loading = ref(false)

const generate = async () => {
  loading.value = true
  result.value = null

  const res = await client.generations.generateRecipe({
    description: description.value,
  })

  result.value = res
  loading.value = false
}
</script>

<template>
  <div style="padding: 24px">
    <h2>Recipe Generator</h2>

    <input
      v-model="description"
      placeholder="例: chicken and garlic"
      style="width: 300px"
    />

    <button @click="generate" :disabled="loading">
      Generate
    </button>

    <pre v-if="result">{{ result }}</pre>
  </div>
</template>
