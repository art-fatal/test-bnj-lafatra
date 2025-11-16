
export function getInitials(fullName?: string, fallback: string = 'UK'): string {
  const trimmedName = fullName?.trim()

  if (!trimmedName || trimmedName === '') {
    return fallback
  }

  const names = trimmedName.split(' ')

  if (names.length === 1) {
    return names[0]?.substring(0, 2).toUpperCase() || fallback
  }

  return ((names[0]?.[0] || '') + (names[names.length - 1]?.[0] || '')).toUpperCase()
}