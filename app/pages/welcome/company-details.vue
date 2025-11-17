<script setup lang="ts">
import Upload from "~/components/Upload.vue";
import * as z from "zod"
import EntrepriseIcon from '~/assets/img/entreprise.svg'
import { useFileValidation } from '~/composables/useFileValidation'
import { useOnboardingAutoFill } from '~/composables/useOnboardingAutoFill'

definePageMeta({
  layout: 'welcome'
})

const { t } = useI18n()
const { createOptionalFileSchema } = useFileValidation()
const { companyDetails, autoFillCompanyDetails } = useOnboardingAutoFill()

const schema = z.object({
  companyName: z.string().min(1, t('validation.company.nameRequired')),
  logo: createOptionalFileSchema(),
  description: z.string().optional(),
  webSite: z.string()
    .optional()
    .refine(
      (val) => !val || /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(val),
      { message: t('validation.company.invalidWebsite') }
    ),
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
      :title="t('welcome.companyDetails.title')"
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
    <UForm :schema="schema" :state="companyDetails" class="space-y-6" @submit="onSubmit">
      <UFormField :label="t('welcome.companyDetails.logo')" class="font-poppins" name="logo">
        <Upload
            v-model="companyDetails.logo"
            :useSvg="EntrepriseIcon"
            rounded-class="rounded-2xl"
            :description="t('welcome.companyDetails.logoFormat')"
        />
      </UFormField>
      <UFormField :label="t('welcome.companyDetails.companyName')" name="companyName">
        <UInput v-model="companyDetails.companyName" :placeholder="t('welcome.companyDetails.companyNamePlaceholder')"/>
      </UFormField>
      <UFormField :label="t('welcome.companyDetails.description')" name="description">
        <UTextarea
            v-model="companyDetails.description"
            class="w-full"
            :rows="5"
            :placeholder="t('welcome.companyDetails.descriptionPlaceholder')"
        />
      </UFormField>
      <UFormField :label="t('welcome.companyDetails.webSite')" name="webSite">
        <UFieldGroup class="w-full">
          <UInput
              v-model="companyDetails.webSite"
              :placeholder="t('welcome.companyDetails.webSitePlaceholder')"
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
      <UFormField :label="t('welcome.companyDetails.address')" name="address">
        <UInput v-model="companyDetails.address" :placeholder="t('welcome.companyDetails.addressPlaceholder')"/>
      </UFormField>
      <UFormField :label="t('welcome.companyDetails.activity')" name="activity">
        <UInput v-model="companyDetails.activity" :placeholder="t('welcome.companyDetails.activityPlaceholder')"/>
      </UFormField>
      <div class="flex flex-row gap-4">
        <UButton
            to="/welcome/personal-details"
            size="lg"
            variant="link"
            color="neutral"
            icon="i-lucide-arrow-left"
        >
          {{ t('common.back') }}
        </UButton>
        <UButton type="submit" size="lg" class="w-full">
          {{ t('common.continue') }}
        </UButton>
      </div>
    </UForm>
  </UPageCard>
</template>