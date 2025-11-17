export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { domain } = body

  if (!domain) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Domain is required'
    })
  }

  const config = useRuntimeConfig()
  const apiKey = config.hunterApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Hunter.io API key not configured'
    })
  }

  try {
    const response = await fetch(
      `https://api.hunter.io/v2/companies/find?domain=${domain}&api_key=${apiKey}`
    )

    if (!response.ok) {
      console.warn('Hunter.io API error:', response.status)
      throw createError({
        statusCode: response.status,
        statusMessage: 'Failed to fetch company info from Hunter.io'
      })
    }

    const data = await response.json()

    if (!data.data) {
      return null
    }

    const companyData = data.data

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
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})