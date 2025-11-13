<script setup lang="ts">
definePageMeta({
  layout: 'welcome'
})
</script>

<template>
  <div>
    <h1>Pour mieux vous connaître</h1>

    <button class="btn-finish">
      Terminer
    </button>
  </div>
</template>

<style scoped>
.btn-finish {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  background: #10B981;
  color: white;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-finish:hover {
  background: #059669;
}
</style>
