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
  domain: string
): Promise<EnrichedCompanyInfo | null> {
  try {
    const response = await $fetch('/api/company/enrich', {
      method: 'POST',
      body: {
        domain
      }
    })

    return response as EnrichedCompanyInfo | null
  } catch (error) {
    console.error('Error fetching company info from server:', error)
    return null
  }
}