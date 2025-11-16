<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOnboardingStore } from '~/stores/onboarding'
import Upload from "~/components/Upload.vue";

definePageMeta({
  layout: 'welcome'
})

const onboardingStore = useOnboardingStore()
const { companyDetails } = storeToRefs(onboardingStore)
</script>

<template>
  <UPageCard
      title="Faisons connaissance"
      variant="naked"
      :ui="{
        container: 'gap-6',
        title: 'text-2xl font-bold text-gray-900',
      }"
  >
    <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
      <UFormField label="Photo de profil" class="font-poppins">
        <Upload v-model="personalDetails.photo"
                :full-name="`${personalDetails.firstName} ${personalDetails.lastName}`"/>
      </UFormField>
      <UFormField label="Prénom">
        <UInput v-model="personalDetails.firstName" placeholder="Prénom"/>
      </UFormField>
      <UFormField label="Nom">
        <UInput v-model="personalDetails.lastName" placeholder="Nom"/>
      </UFormField>
      <UFormField label="Adresse email">
        <UInput
            v-model="personalDetails.email"
            type="email"
            placeholder="john@doe.com"
            icon="i-lucide-mail"
        />
      </UFormField>
      <UButton to="/welcome/company-details" size="lg" class="w-full">
        Continuer
      </UButton>
    </UForm>
  </UPageCard>
</template>