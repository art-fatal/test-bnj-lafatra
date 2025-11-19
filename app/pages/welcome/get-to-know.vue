<script setup lang="ts">
import * as z from "zod"
import { useOnboardingAutoFill } from '~/composables/useOnboardingAutoFill'
definePageMeta({
  layout: 'welcome'
})

const { t } = useI18n()
const { getToKnowDetails, reset } = useOnboardingAutoFill()
const toast = useToast()

const companySizeOptions = [
  { value: 'freelance', label: t('welcome.getToKnow.sizes.freelance') },
  { value: 'small', label: t('welcome.getToKnow.sizes.small') },
  { value: 'medium', label: t('welcome.getToKnow.sizes.medium') },
  { value: 'large', label: t('welcome.getToKnow.sizes.large') },
  { value: 'enterprise', label: t('welcome.getToKnow.sizes.enterprise') }
]

const roleOptions = [
  { value: 'founder', label: t('welcome.getToKnow.roles.founder') },
  { value: 'manager', label: t('welcome.getToKnow.roles.manager') },
  { value: 'hr', label: t('welcome.getToKnow.roles.hr') },
  { value: 'employee', label: t('welcome.getToKnow.roles.employee') },
]

const recruitmentPlanOptions = [
  { value: 'none', label: t('welcome.getToKnow.recruitmentPlans.none') },
  { value: 'few', label: t('welcome.getToKnow.recruitmentPlans.few') },
  { value: 'moderate', label: t('welcome.getToKnow.recruitmentPlans.moderate') },
  { value: 'many', label: t('welcome.getToKnow.recruitmentPlans.many') },
  { value: 'massive', label: t('welcome.getToKnow.recruitmentPlans.massive') }
]

const experienceOptions = [
  { value: 'beginner', label: t('welcome.getToKnow.experiences.beginner') },
  { value: 'intermediate', label: t('welcome.getToKnow.experiences.intermediate') },
  { value: 'advanced', label: t('welcome.getToKnow.experiences.advanced') },
  { value: 'expert', label: t('welcome.getToKnow.experiences.expert') }
]

const goalsOptions = [
  { value: 'teamManagement', label: t('welcome.getToKnow.goalsList.teamManagement') },
  { value: 'projectTracking', label: t('welcome.getToKnow.goalsList.projectTracking') },
  { value: 'hrManagement', label: t('welcome.getToKnow.goalsList.hrManagement') },
  { value: 'internalCommunication', label: t('welcome.getToKnow.goalsList.internalCommunication') },
  { value: 'collaboration', label: t('welcome.getToKnow.goalsList.collaboration') },
]

const discoveryOptions = [
  { value: 'googleSearch', label: t('welcome.getToKnow.discoveries.googleSearch') },
  { value: 'socialMedia', label: t('welcome.getToKnow.discoveries.socialMedia') },
  { value: 'recommendation', label: t('welcome.getToKnow.discoveries.recommendation') },
  { value: 'advertising', label: t('welcome.getToKnow.discoveries.advertising') },
]

const toolsOptions = ref([
  t('welcome.getToKnow.tools.linkedinRecruiter'),
  t('welcome.getToKnow.tools.indeed'),
  t('welcome.getToKnow.tools.welcomeToTheJungle'),
  t('welcome.getToKnow.tools.jobTeaser'),
  t('welcome.getToKnow.tools.poleEmploi'),
  t('welcome.getToKnow.tools.ats'),
  t('welcome.getToKnow.tools.socialNetworks'),
  t('welcome.getToKnow.tools.none'),
])

function onCreateOption(
    newValue: string,
    optionsList: ({ value: string; label: string })[],
    targetObject: any,
    propertyName: string
) {
    const exists = optionsList.some(option => option.value === newValue || option.label === newValue)
    if (!exists) {
        optionsList.push({value: newValue, label: newValue })
    }
    targetObject[propertyName] = newValue
}

const schema = z.object({
  companySize: z.string().min(1, t('validation.getToKnow.companySizeRequired')),
  role: z.string().min(1, t('validation.getToKnow.roleRequired')),
  linkedinUrl: z.string()
    .optional()
    .refine(
      (val) => !val || /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/.test(val),
      { message: t('validation.getToKnow.invalidLinkedin') }
    ),
  recruitmentPlan: z.string().optional(),
  recruitmentExperience: z.string().min(1, t('validation.getToKnow.recruitmentExperienceRequired')),
  goals: z.array(z.string()).optional(),
  discovery: z.string().optional(),
  currentTools: z.array(z.string()).optional()
})

async function onSubmit() {
  reset()
  toast.add({
    title: 'Record saved successfully',
    color: 'success'
  })
  navigateTo('/')
}
</script>

<template>
  <UPageCard
      :title="t('welcome.getToKnow.title')"
      variant="naked"
  >
    <template #header>
      <UButton
          to="/welcome/company-details"
          size="lg"
          variant="link"
          color="neutral"
          icon="i-lucide-chevron-left"
          class="p-0"
      >
        {{ t('common.back') }}
      </UButton>
    </template>
    <UForm :schema="schema" :state="getToKnowDetails" class="space-y-6" @submit="onSubmit">
      <UFormField :label="t('welcome.getToKnow.companySize')" name="companySize" required>
        <USelect
            v-model="getToKnowDetails.companySize"
            :items="companySizeOptions"
            :placeholder="t('welcome.getToKnow.companySizePlaceholder')"
        />
      </UFormField>

      <UFormField :label="t('welcome.getToKnow.role')" name="role" required>
        <USelectMenu
            v-model="getToKnowDetails.role"
            :items="roleOptions"
            value-key="value"
            createItem
            @create="(newValue) => onCreateOption(newValue, roleOptions, getToKnowDetails, 'role')"
            :placeholder="t('welcome.getToKnow.rolePlaceholder')"
        />
      </UFormField>

      <UFormField :label="t('welcome.getToKnow.recruitmentExperience')" name="recruitmentExperience" required>
        <USelect
            v-model="getToKnowDetails.recruitmentExperience"
            :items="experienceOptions"
            :placeholder="t('welcome.getToKnow.recruitmentExperiencePlaceholder')"
        />
      </UFormField>

      <UFormField :label="t('welcome.getToKnow.recruitmentPlan')" name="recruitmentPlan">
        <USelect
            v-model="getToKnowDetails.recruitmentPlan"
            :items="recruitmentPlanOptions"
            :placeholder="t('welcome.getToKnow.recruitmentPlanPlaceholder')"
        />
      </UFormField>

      <UFormField :label="t('welcome.getToKnow.goals')" name="goals">
        <USelectMenu
            v-model="getToKnowDetails.goals"
            :items="goalsOptions"
            multiple
            value-key="value"
            createItem
            @create="(newValue) => onCreateOption(newValue, goalsOptions, getToKnowDetails, 'goals')"
            :placeholder="t('welcome.getToKnow.goalsPlaceholder')"
        />
      </UFormField>

      <UFormField :label="t('welcome.getToKnow.currentTools')" name="currentTools">
        <USelectMenu
            :ui="{ base: 'max-w-[375px]'}"
            v-model="getToKnowDetails.currentTools"
            :items="toolsOptions"
            multiple
            :placeholder="t('welcome.getToKnow.currentToolsPlaceholder')"
        />
      </UFormField>

      <UFormField :label="t('welcome.getToKnow.discovery')" name="discovery">
        <USelect
            v-model="getToKnowDetails.discovery"
            :items="discoveryOptions"
            :placeholder="t('welcome.getToKnow.discoveryPlaceholder')"
        />
      </UFormField>

      <UFormField :label="t('welcome.getToKnow.linkedinUrl')" name="linkedinUrl">
        <UInput
            v-model="getToKnowDetails.linkedinUrl"
            :placeholder="t('welcome.getToKnow.linkedinUrlPlaceholder')"
            icon="i-lucide-linkedin"
        />
      </UFormField>

      <UFormField :label="t('welcome.getToKnow.whyWink')" name="whyWink">
        <UTextarea
            v-model="getToKnowDetails.whyWink"
            class="w-full"
            :rows="5"
            :placeholder="t('welcome.getToKnow.whyWinkPlaceholder')"
        />
      </UFormField>

      <div class="flex flex-row gap-4">
        <UButton
            to="/welcome/company-details"
            size="lg"
            variant="link"
            color="neutral"
            icon="i-lucide-arrow-left"
        >
          {{ t('common.back') }}
        </UButton>
        <UButton type="submit" size="lg" class="w-full cursor-pointer">
          {{ t('common.finish') }}
        </UButton>
      </div>
    </UForm>
  </UPageCard>
</template>