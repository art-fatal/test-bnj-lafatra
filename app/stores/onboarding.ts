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

interface GetToKnowDetails {
    companySize: string
    role: string
    linkedinUrl: string
    recruitmentPlan: string
    recruitmentExperience: string
    whyWink: string
    goals: string[]
    discovery: string
    currentTools: string[]
}

interface OnboardingState {
    personalDetails: PersonalDetails
    companyDetails: CompanyDetails
    getToKnowDetails: GetToKnowDetails
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
        },
        getToKnowDetails: {
            companySize: '',
            role: '',
            linkedinUrl: '',
            recruitmentPlan: '',
            recruitmentExperience: '',
            whyWink: '',
            goals: [],
            discovery: '',
            currentTools: []
        }
    }),

    actions: {
        updatePersonalDetails(data: Partial<PersonalDetails>) {
            this.personalDetails = {...this.personalDetails, ...data}
        },

        updateCompanyDetails(data: Partial<CompanyDetails>) {
            this.companyDetails = {...this.companyDetails, ...data}
        },

        updateGetToKnowDetails(data: Partial<GetToKnowDetails>) {
            this.getToKnowDetails = {...this.getToKnowDetails, ...data}
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
            this.getToKnowDetails = {
                companySize: '',
                role: '',
                linkedinUrl: '',
                recruitmentPlan: '',
                recruitmentExperience: '',
                whyWink: '',
                goals: [],
                discovery: '',
                currentTools: []
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

        isGetToKnowComplete(): boolean {
            return !!(
                this.getToKnowDetails.companySize &&
                this.getToKnowDetails.role &&
                this.getToKnowDetails.recruitmentExperience &&
                this.getToKnowDetails.whyWink
            )
        },

        isOnboardingComplete(): boolean {
            return this.isPersonalDetailsComplete && this.isCompanyDetailsComplete && this.isGetToKnowComplete
        }
    }
})