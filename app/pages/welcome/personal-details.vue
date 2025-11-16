<script setup lang="ts">
import Upload from "~/components/Upload.vue";
import {storeToRefs} from 'pinia'
import {useOnboardingStore} from '~/stores/onboarding'
import * as z from "zod";
import type { FormSubmitEvent } from '@nuxt/ui'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

definePageMeta({
  layout: 'welcome'
})

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const schema = z.object({
  email: z.email('Veuillez entrer une adresse email valide'),
  photo: z.union([
    z.instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: 'Please upload a valid image file (JPEG, PNG).'
      }),
    z.array(z.instanceof(File)),
    z.null()
  ]).optional()
})

type Schema = z.output<typeof schema>

const onboardingStore = useOnboardingStore()
const {personalDetails} = storeToRefs(onboardingStore)

async function onSubmit() {
  navigateTo('/welcome/company-details')
}
</script>

<template>
  <UPageCard
      title="Faisons connaissance"
      variant="naked"
  >
    <UForm :schema="schema" :state="personalDetails" class="space-y-6" @submit="onSubmit">
      <UFormField label="Photo de profil" class="font-poppins" name="photo">
        <Upload
            v-model="personalDetails.photo"
            :full-name="`${personalDetails.firstName} ${personalDetails.lastName}`"
            description="au format *.png, *.jpeg, max 5mo"
        />
      </UFormField>
      <UFormField label="Prénom" name="firstName">
        <UInput v-model="personalDetails.firstName" placeholder="Prénom"/>
      </UFormField>
      <UFormField label="Nom" name="lastName">
        <UInput v-model="personalDetails.lastName" placeholder="Nom"/>
      </UFormField>
      <UFormField label="Adresse email" name="email">
        <UInput
            v-model="personalDetails.email"
            type="email"
            placeholder="john@doe.com"
            icon="i-lucide-mail"
        />
      </UFormField>
      <UButton type="submit" size="lg" class="w-full cursor-pointer">
        Continuer
      </UButton>
    </UForm>
  </UPageCard>
</template>