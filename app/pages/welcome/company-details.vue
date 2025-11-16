<script setup lang="ts">
import Upload from "~/components/Upload.vue";
import {storeToRefs} from 'pinia'
import {useOnboardingStore} from '~/stores/onboarding'
import * as z from "zod"
import EntrepriseIcon from '~/assets/img/entreprise.svg'
import {
  extractCompanyInfoFromEmail,
  isProfessionalEmail,
  enrichCompanyInfoFromHunter
} from '~/services/companyExtractor'

definePageMeta({
  layout: 'welcome'
})

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const schema = z.object({
  companyName: z.string().min(1, 'Le nom de l\'entreprise est requis'),
  logo: z.union([
    z.instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: `L'image est trop volumineuse. Veuillez choisir une image plus petite que ${formatBytes(MAX_FILE_SIZE)}.`
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message: 'Veuillez télécharger un fichier image valide (JPEG, PNG).'
        }),
    z.array(z.instanceof(File)),
    z.null()
  ]).optional(),
  description: z.string().optional(),
  webSite: z.string().optional(),
  address: z.string().optional(),
  activity: z.string().optional()
})

const onboardingStore = useOnboardingStore()
const {companyDetails, personalDetails} = storeToRefs(onboardingStore)

onMounted(async () => {
  const email = personalDetails.value.email

  if (email && isProfessionalEmail(email)) {
    const basicInfo = extractCompanyInfoFromEmail(email)

    if (!basicInfo) return
    if (basicInfo.webSite === companyDetails.value.webSite) {
      return
    }
    companyDetails.value.companyName = basicInfo.companyName
    companyDetails.value.webSite = basicInfo.webSite

    try {
      const enrichedInfo = await enrichCompanyInfoFromHunter(basicInfo.webSite)

      if (enrichedInfo) {
        if (enrichedInfo.companyName) {
          companyDetails.value.companyName = enrichedInfo.companyName
        }

        if (enrichedInfo.description) {
          companyDetails.value.description = enrichedInfo.description
        }

        if (enrichedInfo.activity) {
          companyDetails.value.activity = enrichedInfo.activity
        }

        if (enrichedInfo.address) {
          companyDetails.value.address = enrichedInfo.address
        }
      }
    } catch (error) {
      console.warn('Could not enrich company info from Hunter.io:', error)
    }
  }
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