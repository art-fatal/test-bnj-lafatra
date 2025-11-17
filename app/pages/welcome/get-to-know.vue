<script setup lang="ts">
definePageMeta({
  layout: 'welcome'
})

const { t } = useI18n()
</script>

<template>
  <UPageCard
      :title="t('welcome.getToKnow.title')"
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
        {{ t('common.back') }}
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
        {{ t('common.back') }}
      </UButton>
      <UButton size="lg" class="w-full cursor-pointer" disabled>
        {{ t('common.finish') }}
      </UButton>
    </div>
  </UPageCard>
</template>