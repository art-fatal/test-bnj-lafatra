<script setup lang="ts">
import { getInitials } from '~/utils/initials'

const { t } = useI18n()

interface Props {
  modelValue?: null | File | File[]
  fullName?: string
  maxSize?: number
  useIcon?: string
  useSvg?: string
  roundedClass?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  fullName: undefined,
  maxSize: 5,
  useIcon: undefined,
  useSvg: undefined,
  roundedClass: undefined,
  description: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: null | File | File[]]
}>()

function createObjectUrl(file: File): string {
  return URL.createObjectURL(file)
}

const avatar = computed({
  get: () => {
    if (props.modelValue === null) return undefined
    if (Array.isArray(props.modelValue)) return props.modelValue[0]
    return props.modelValue
  },
  set: (value: File | File[] | undefined) => {
    emit('update:modelValue', value || null)
  }
})

const initials = computed(() => getInitials(props.fullName))

</script>

<template>
  <UFileUpload v-slot="{ open, removeFile }" v-model="avatar" accept="image/*">
    <div class="flex flex-col sm:flex-row items-center gap-8">
      <UAvatar
          size="3xl"
          :src="avatar ? createObjectUrl(avatar) : undefined"
          :text="(useIcon || useSvg) ? undefined : initials"
          :ui="{
                root: 'border-3 border-white shadow w-[72px] h-[72px] ' + roundedClass,
                fallback: 'text-[1.875rem] font-bold',
              }"
          :icon="useIcon"
      >
        <template v-if="useSvg && !avatar" #default>
          <img :src="useSvg" alt="Icon" class="w-9 h-9" />
        </template>
      </UAvatar>
      <div class="flex flex-col items-start justify-start gap-2">
        <div class="flex flex-row items-center justify-between gap-2">
          <UButton
              :label="avatar ? t('upload.modifyPhoto') : t('upload.addPhoto')"
              icon="i-lucide-upload"
              color="neutral"
              variant="outline"
              size="lg"
              class="cursor-pointer"
              @click="open()"
          />
          <UButton
              :label="t('common.delete')"
              color="neutral"
              variant="outline"
              size="lg"
              class="cursor-pointer"
              :disabled="!avatar"
              @click="removeFile()"
          />
        </div>
        <span v-if="description">{{description}}</span>
      </div>
    </div>
  </UFileUpload>
</template>