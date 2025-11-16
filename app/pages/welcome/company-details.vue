<script setup lang="ts">
import Upload from "~/components/Upload.vue";
import * as z from "zod"
import EntrepriseIcon from '~/assets/img/entreprise.svg'
import { useFileValidation } from '~/composables/useFileValidation'
import { useOnboardingAutoFill } from '~/composables/useOnboardingAutoFill'

definePageMeta({
  layout: 'welcome'
})

const { createOptionalFileSchema } = useFileValidation()
const { companyDetails, autoFillCompanyDetails } = useOnboardingAutoFill()

const schema = z.object({
  companyName: z.string().min(1, 'Le nom de l\'entreprise est requis'),
  logo: createOptionalFileSchema(),
  description: z.string().optional(),
  webSite: z.string().optional(),
  address: z.string().optional(),
  activity: z.string().optional()
})

onMounted(async () => {
  await autoFillCompanyDetails()
})

async function onSubmit() {
  navigateTo('/welcome/get-to-know')
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
    <UForm :schema="schema" :state="companyDetails" class="space-y-6" @submit="onSubmit">
      <UFormField label="Logo de l'entreprise" class="font-poppins" name="logo">
        <Upload
            v-model="companyDetails.logo"
            :useSvg="EntrepriseIcon"
            rounded-class="rounded-2xl"
            description="au format *.png, *.jpeg"
        />
      </UFormField>
      <UFormField label="Nom de l'entreprise *" name="companyName">
        <UInput v-model="companyDetails.companyName" placeholder="Renseignez le nom de votre entreprise"/>
      </UFormField>
      <UFormField label="Description de l'entreprise" name="description">
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
      <UFormField label="Site internet" name="webSite">
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
      <UFormField label="Adresse du siège social" name="address">
        <UInput v-model="companyDetails.address" placeholder="Renseignez l'adresse de votre entreprise"/>
      </UFormField>
      <UFormField label="Secteur d'activité" name="activity">
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
        <UButton type="submit" size="lg" class="w-full">
          Continuer
        </UButton>
      </div>
    </UForm>
  </UPageCard>
</template>