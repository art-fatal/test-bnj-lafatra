<script setup lang="ts">
interface Props {
  modelValue?: string | null
  fullName?: string
  maxSize?: number // en MB
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  fullName: undefined,
  maxSize: 5
})

function createObjectUrl(file: File): string {
  return URL.createObjectURL(file)
}

const avatar = ref<File | undefined>(undefined)

const initials = computed(() => {
  const fullName = props.fullName?.trim()
  if (!fullName || fullName === '') return 'UK'

  const names = props.fullName.trim().split(' ')
  console.log(names)
  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase()
  }
  return (names[0][0] + names[names.length - 1][0]).toUpperCase()
})

</script>

<template>
  <UFileUpload v-slot="{ open, removeFile }" v-model="avatar" accept="image/*">
    <div class="flex flex-wrap items-center gap-8">
      <UAvatar
          size="3xl"
          :src="avatar ? createObjectUrl(avatar) : undefined"
          :text="initials"
          :ui="{
                root: 'border-3 border-white shadow w-[72px] h-[72px]',
                fallback: 'text-[1.875rem] font-bold',
              }"
      />
      <div class="flex flex-col items-start justify-start
       gap-2">
        <div class="flex flex-row items-center justify-between gap-2">
          <UButton
              :label="avatar ? 'Modifier la photo' : 'Ajouter une photo'"
              icon="i-lucide-upload"
              color="neutral"
              variant="outline"
              size="lg"
              class="cursor-pointer"
              @click="open()"
          />
          <UButton
              label="Supprimer"
              color="neutral"
              variant="outline"
              size="lg"
              class="cursor-pointer"
              :disabled="!avatar"
              @click="removeFile()"
          />
        </div>
        <span>au format *.png, *.jpeg, max 5mo</span>
      </div>
    </div>
  </UFileUpload>
</template>