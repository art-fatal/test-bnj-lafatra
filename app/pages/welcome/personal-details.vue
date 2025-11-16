<script setup lang="ts">
import Upload from "~/components/Upload.vue";
import * as z from "zod";
import { useFileValidation } from '~/composables/useFileValidation'
import { useOnboardingAutoFill } from '~/composables/useOnboardingAutoFill'

definePageMeta({
  layout: 'welcome'
})

const { createOptionalFileSchema } = useFileValidation()
const { personalDetails } = useOnboardingAutoFill()

const schema = z.object({
  email: z.email('Veuillez entrer une adresse email valide'),
  photo: createOptionalFileSchema()
})

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