<script setup lang="ts">
import Upload from "~/components/Upload.vue";
import {storeToRefs} from 'pinia'
import {useOnboardingStore} from '~/stores/onboarding'
import * as z from "zod";
import type {FormSubmitEvent} from '@nuxt/ui'
import EntrepriseIcon from '~/assets/img/entreprise.svg'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const MIN_DIMENSIONS = {width: 200, height: 200}
const MAX_DIMENSIONS = {width: 4096, height: 4096}
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

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
  avatar: z
      .instanceof(File, {
        message: 'Please select an image file.'
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: 'Please upload a valid image file (JPEG, PNG, or WebP).'
      })
      .refine(
          (file) =>
              new Promise((resolve) => {
                const reader = new FileReader()
                reader.onload = (e) => {
                  const img = new Image()
                  img.onload = () => {
                    const meetsDimensions =
                        img.width >= MIN_DIMENSIONS.width &&
                        img.height >= MIN_DIMENSIONS.height &&
                        img.width <= MAX_DIMENSIONS.width &&
                        img.height <= MAX_DIMENSIONS.height
                    resolve(meetsDimensions)
                  }
                  img.src = e.target?.result as string
                }
                reader.readAsDataURL(file)
              }),
          {
            message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`
          }
      )
})

type schema = z.output<typeof schema>

const onboardingStore = useOnboardingStore()
const {companyDetails} = storeToRefs(onboardingStore)
const state = reactive<Partial<schema>>({
  avatar: undefined
})


async function onSubmit(event: FormSubmitEvent<schema>) {
  console.log(event.data)
}
</script>

<template>
  <UPageCard
      title="Créez votre espace de travail"
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
    <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
      <UFormField label="Logo de l'entreprise" class="font-poppins">
        <Upload
            v-model="companyDetails.logo"
            :useSvg="EntrepriseIcon"
            rounded-class="rounded-2xl"
            description="au format *.png, *.jpeg"
        />
      </UFormField>
      <UFormField label="Nom de l’entreprise *">
        <UInput v-model="companyDetails.companyName" placeholder="Renseignez le nom de votre entreprise"/>
      </UFormField>
      <UFormField label="Description de l’entreprise">
        <UTextarea
            v-model="companyDetails.description"
            class="w-full"
            :rows="5"
            placeholder="Décrivez votre entreprise brièvement :

 - Histoire et chiffres clés
 - Produits ou services commercialisés
 - Culture et valeurs
"/>
      </UFormField>
      <UFormField label="Site internet">
        <UFieldGroup class="w-full">
          <UInput
              v-model="companyDetails.webSite"
              placeholder="votre-entreprise.com"
              :ui="{
                base: 'pl-18.5',
                leading: 'pointer-events-none pe-1 text-sm bg-gray-200 border-r-1 border-gray-300 font-poppins'
              }"
          >
            <template #leading>
                https://
            </template>
          </UInput>
        </UFieldGroup>
      </UFormField>
      <UFormField label="Adresse du siège social">
        <UInput v-model="companyDetails.address" placeholder="Renseignez l'adresse de votre entreprise"/>
      </UFormField>
      <UFormField label="Secteur d'activité">
        <UInput v-model="companyDetails.activity" placeholder="Renseignez le secteur d'activité de votre entreprise"/>
      </UFormField>
      <div class="flex flex-row gap-4">
        <UButton
            to="/welcome/personal-details"
            size="lg"
            variant="link"
            color="neutral"
            icon="i-lucide-arrow-left"
        >
          Retour
        </UButton>
      <UButton to="/welcome/get-to-known" size="lg" class="w-full">
        Continuer
      </UButton>
      </div>
    </UForm>
  </UPageCard>
</template>