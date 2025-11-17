<script setup lang="ts">
definePageMeta({
  layout: 'welcome'
})
</script>

<template>
  <UPageCard
      title="Pour mieux vous connaitre"
      variant="naked"
  >
    <template #header>
      <UButton
          to="/welcome/personal-details"
          size="lg"
          variant="link"
          color="neutral"
          icon="i-lucide-chevron-left"
          class="p-0"
      >
        Retour
      </UButton>
    </template>
    <USkeleton class="h-12 w-12 rounded-full" />

    <div class="grid gap-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-20 w-[200px]" />
      <USkeleton class="h-4 w-[280px]" />
      <USkeleton class="h-4 w-[150px]" />
      <USkeleton class="h-4 w-[250px]" />
    </div>
    <div class="flex flex-row gap-4">
      <UButton
          to="/welcome/company-details"
          size="lg"
          variant="link"
          color="neutral"
          icon="i-lucide-arrow-left"
      >
        Retour
      </UButton>
      <UButton size="lg" class="w-full cursor-pointer" disabled>
        Terminer
      </UButton>
    </div>
  </UPageCard>
</template>