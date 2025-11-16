import { storeToRefs } from 'pinia'
import { useOnboardingStore } from '~/stores/onboarding'
import {
  extractCompanyInfoFromEmail,
  isProfessionalEmail,
  enrichCompanyInfoFromHunter
} from '~/services/companyExtractor'

export function useOnboardingAutoFill() {
  const onboardingStore = useOnboardingStore()
  const { personalDetails, companyDetails } = storeToRefs(onboardingStore)

  const fullName = computed(() => {
    return personalDetails.value.firstName && personalDetails.value.lastName
      ? `${personalDetails.value.firstName} ${personalDetails.value.lastName}`
      : 'John Doe'
  })

  const avatarUrl = computed(() => {
    const photo = personalDetails.value.photo
    if (!photo) return undefined

    const file = Array.isArray(photo) ? photo[0] : photo
    return file ? URL.createObjectURL(file) : undefined
  })

  const companyLogoUrl = computed(() => {
    const logo = companyDetails.value.logo
    if (!logo) return undefined

    const file = Array.isArray(logo) ? logo[0] : logo
    return file ? URL.createObjectURL(file) : undefined
  })

  const companyName = computed(() => companyDetails.value.companyName)

  async function autoFillCompanyDetails() {
    const email = personalDetails.value.email

    if (!email || !isProfessionalEmail(email)) {
      return
    }

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

  return {
    fullName,
    avatarUrl,
    companyLogoUrl,
    companyName,
    personalDetails,
    companyDetails,
    autoFillCompanyDetails
  }
}