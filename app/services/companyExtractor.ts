export interface CompanyInfo {
  companyName: string
  webSite: string
  domain: string
}

export interface EnrichedCompanyInfo extends CompanyInfo {
  description?: string
  activity?: string
  address?: string
}

interface HunterCompanyData {
  name: string
  domain: string
  description?: string
  location?: string
  category?: {
    sector?: string
    industryGroup?: string
    industry?: string
    subIndustry?: string
  }
  geo?: {
    streetAddress?: string
    city?: string
    postalCode?: string
    state?: string
    stateCode?: string
    country?: string
    countryCode?: string
  }
}

export function extractCompanyInfoFromEmail(email: string): CompanyInfo | null {
  if (!email || !email.includes('@')) {
    return null
  }

  const domain = email.split('@')[1]
  if (!domain) {
    return null
  }

  const domainParts = domain.split('.')
  const domainName = domainParts[0]

  if (!domainName) {
    return null
  }

  const companyName = domainName.charAt(0).toUpperCase() + domainName.slice(1)

  return {
    companyName,
    webSite: domain,
    domain: domainName
  }
}

export function isProfessionalEmail(email: string): boolean {
  const genericDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'icloud.com',
    'protonmail.com',
    'mail.com'
  ]

  if (!email || !email.includes('@')) {
    return false
  }

  const domain = email.split('@')[1]?.toLowerCase()

  return !genericDomains.includes(domain || '')
}

export async function enrichCompanyInfoFromHunter(
  domain: string,
  apiKey?: string
): Promise<EnrichedCompanyInfo | null> {
  try {
    const key = apiKey || useRuntimeConfig().public.hunterApiKey

    const response = await fetch(
      `https://api.hunter.io/v2/companies/find?domain=${domain}&api_key=${key}`
    )

    if (!response.ok) {
      console.warn('Hunter.io API error:', response.status)
      return null
    }

    const data = await response.json()

    if (!data.data) {
      return null
    }

    const companyData: HunterCompanyData = data.data

    let address = ''
    if (companyData.location) {
      address = companyData.location
    } else if (companyData.geo) {
      const parts = [
        companyData.geo.streetAddress,
        companyData.geo.postalCode,
        companyData.geo.city,
        companyData.geo.state,
        companyData.geo.country
      ].filter(Boolean)
      address = parts.join(', ')
    }

    const activity = companyData.category?.sector ||
                     companyData.category?.industry ||
                     companyData.category?.industryGroup

    return {
      companyName: companyData.name || domain.split('.')[0] || '',
      webSite: domain,
      domain: domain.split('.')[0] || '',
      description: companyData.description,
      activity: activity,
      address: address || undefined
    }
  } catch (error) {
    console.error('Error fetching company info from Hunter.io:', error)
    return null
  }
}