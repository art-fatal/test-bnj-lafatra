import { defineStore } from 'pinia'

interface PersonalDetails {
  photo: string
  firstName: string
  lastName: string
  email: string
}

interface CompanyDetails {
  companyName: string
  industry: string
  size: string
}

interface OnboardingState {
  personalDetails: PersonalDetails
  companyDetails: CompanyDetails
}

export const useOnboardingStore = defineStore('onboarding', {
  state: (): OnboardingState => ({
    personalDetails: {
      photo: '',
      firstName: '',
      lastName: '',
      email: ''
    },
    companyDetails: {
      companyName: '',
      industry: '',
      size: ''
    }
  }),

  actions: {
    updatePersonalDetails(data: Partial<PersonalDetails>) {
      this.personalDetails = { ...this.personalDetails, ...data }
    },

    updateCompanyDetails(data: Partial<CompanyDetails>) {
      this.companyDetails = { ...this.companyDetails, ...data }
    },

    resetOnboarding() {
      this.personalDetails = {
        photo: '',
        firstName: '',
        lastName: '',
        email: ''
      }
      this.companyDetails = {
        companyName: '',
        industry: '',
        size: ''
      }
    }
  },

  getters: {
    isPersonalDetailsComplete(): boolean {
      return !!(
        this.personalDetails.firstName &&
        this.personalDetails.lastName &&
        this.personalDetails.email
      )
    },

    isCompanyDetailsComplete(): boolean {
      return !!(
        this.companyDetails.companyName &&
        this.companyDetails.industry &&
        this.companyDetails.size
      )
    },

    isOnboardingComplete(): boolean {
      return this.isPersonalDetailsComplete && this.isCompanyDetailsComplete
    }
  }
})