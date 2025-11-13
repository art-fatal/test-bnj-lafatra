<script setup lang="ts">
definePageMeta({
  layout: 'welcome'
})
</script>

<template>
  <div>
    <h1>Créez votre espace de travail</h1>

    <NuxtLink to="/welcome/get-to-know" class="btn-continue">
      Continuer
    </NuxtLink>
  </div>
</template>

<style scoped>
.btn-continue {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  background: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-continue:hover {
  background: #2563EB;
}
</style>