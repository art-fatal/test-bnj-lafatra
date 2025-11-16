import {defineStore} from 'pinia'

interface PersonalDetails {
    photo: null | File | File[]
    firstName: string
    lastName: string
    email: string
}

interface CompanyDetails {
    companyName: string
    description: string
    webSite: string
    address: string
    logo: null | File | File[]
    activity: string
}

interface OnboardingState {
    personalDetails: PersonalDetails
    companyDetails: CompanyDetails
}

export const useOnboardingStore = defineStore('onboarding', {
    state: (): OnboardingState => ({
        personalDetails: {
            photo: null,
            firstName: '',
            lastName: '',
            email: ''
        },
        companyDetails: {
            companyName: '',
            description: '',
            webSite: '',
            address: '',
            logo: null,
            activity: '',
        }
    }),

    actions: {
        updatePersonalDetails(data: Partial<PersonalDetails>) {
            this.personalDetails = {...this.personalDetails, ...data}
        },

        updateCompanyDetails(data: Partial<CompanyDetails>) {
            this.companyDetails = {...this.companyDetails, ...data}
        },

        resetOnboarding() {
            this.personalDetails = {
                photo: null,
                firstName: '',
                lastName: '',
                email: ''
            }
            this.companyDetails = {
                companyName: '',
                description: '',
                webSite: '',
                address: '',
                logo: null,
                activity: '',
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
                    this.companyDetails.description &&
                    this.companyDetails.webSite &&
                    this.companyDetails.address &&
                    this.companyDetails.logo &&
                    this.companyDetails.activity
            )
        },

        isOnboardingComplete(): boolean {
            return this.isPersonalDetailsComplete && this.isCompanyDetailsComplete
        }
    }
})