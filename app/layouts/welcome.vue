<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";

const route = useRoute()

// Détermine l'étape actuelle basée sur la route
const currentStep = computed(() => {
  const path = route.path
  if (path.includes('personal-details')) return 1
  if (path.includes('company-details')) return 2
  if (path.includes('get-to-know')) return 3
  return 1
})
</script>

<template>
  <div class="h-screen">
    <AppHeader/>

    <Stepper :current-step="currentStep" />

    <main class="main-content px-10xl py-7xl">
      <slot />
    </main>
  </div>
</template>

<style scoped>

.main-content {
  width: 1280px;
  max-width: 1280px;
  height: 750px;
  margin: auto;
  gap: 48px;
  opacity: 1;
}
</style>
