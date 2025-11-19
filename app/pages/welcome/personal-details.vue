<script setup lang="ts">
import Upload from "~/components/Upload.vue";
import * as z from "zod";
import { useFileValidation } from '~/composables/useFileValidation'
import { useOnboardingAutoFill } from '~/composables/useOnboardingAutoFill'

definePageMeta({
  layout: 'welcome'
})

const { t } = useI18n()
const { createOptionalFileSchema } = useFileValidation()
const { personalDetails } = useOnboardingAutoFill()

const schema = z.object({
  email: z.email(t('validation.email.invalid')),
  photo: createOptionalFileSchema()
})

async function onSubmit() {
  navigateTo('/welcome/company-details')
}
</script>

<template>
  <UPageCard
      :title="t('welcome.personalDetails.title')"
      variant="naked"
  >
    <UForm :schema="schema" :state="personalDetails" class="space-y-6" @submit="onSubmit">
      <UFormField :label="t('welcome.personalDetails.profilePhoto')" class="font-poppins" name="photo">
        <Upload
            v-model="personalDetails.photo"
            :full-name="`${personalDetails.firstName} ${personalDetails.lastName}`"
            :description="t('welcome.personalDetails.photoFormat')"
        />
      </UFormField>
      <UFormField :label="t('welcome.personalDetails.firstName')" name="firstName">
        <UInput v-model="personalDetails.firstName" :placeholder="t('welcome.personalDetails.firstNamePlaceholder')"/>
      </UFormField>
      <UFormField :label="t('welcome.personalDetails.lastName')" name="lastName">
        <UInput v-model="personalDetails.lastName" :placeholder="t('welcome.personalDetails.lastNamePlaceholder')"/>
      </UFormField>
      <UFormField :label="t('welcome.personalDetails.email')" name="email" required>
        <UInput
            v-model="personalDetails.email"
            type="email"
            placeholder="john@doe.com"
            icon="i-lucide-mail"
        />
      </UFormField>
      <UButton type="submit" size="lg" class="w-full cursor-pointer">
        {{ t('common.continue') }}
      </UButton>
    </UForm>
  </UPageCard>
</template>