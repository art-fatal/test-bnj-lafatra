<script setup lang="ts">
import type {StepperItem} from '@nuxt/ui'

const route = useRoute()
const router = useRouter()

const items = ref<StepperItem[]>([
  {
    title: 'Faisons connaissance',
    path: '/welcome/personal-details',
  },
  {
    title: 'Creez votre espace de travail',
    path: '/welcome/company-details',
  },
  {
    title: 'Pour mieux vous connaître',
    path: '/welcome/get-to-know',
  }
])

const currentStep = computed(() => {
  const currentPath = route.path
  const index = items.value.findIndex(item => item.path === currentPath)
  return index >= 0 ? index : 0
})

const handleStepClick = (index: number) => {
  const item = items.value[index]
  if (item.path) {
    router.push(item.path)
  }
}
</script>

<template>
  <div class="h-screen flex flex-col relative">
    <AppHeader/>

    <div class="section">
      <UContainer class="!px-32 py-16">
        <div class="px-20 py-10 border-1 border-gray-200 flex flex-col rounded-2xl bg-white gap-4">
          <UStepper
              :model-value="currentStep"
              :items="items"
              :disabled="true"
              size="xs"
              :ui="{
                separator: 'start-[calc(50%+32px)] end-[calc(-50%+32px)]',
                title: 'font-sans',
              }"
              @update:model-value="handleStepClick"
          />

        <div class="flex flex-row gap-20 items-center">
          <div class="w-full">
            <slot/>
          </div>
          <div class="w-full h-[480px]">
            <Preview />
          </div>
        </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<style scoped>
.section {
  @apply w-full h-full;
  position: absolute;
  top: 48px;
}
</style>