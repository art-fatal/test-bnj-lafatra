import * as z from 'zod'

export const FILE_UPLOAD_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedImageTypes: ['image/jpeg', 'image/jpg', 'image/png'],
} as const

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function createImageUploadSchema(options?: {
  maxSize?: number
  acceptedTypes?: string[]
}) {
  const { t } = useI18n()
  const maxSize = options?.maxSize ?? FILE_UPLOAD_CONFIG.maxSize
  const acceptedTypes = options?.acceptedTypes ?? FILE_UPLOAD_CONFIG.acceptedImageTypes

  return z.instanceof(File)
      .refine((file) => file.size <= maxSize, {
        message: t('validation.file.tooLarge', {maxSize: formatBytes(maxSize)})
      })
      .refine((file) => acceptedTypes.includes(file.type), {
        message: t('validation.file.invalidType')
      })
}

export function createOptionalFileSchema(options?: {
  maxSize?: number
  acceptedTypes?: string[]
}) {
  return z.union([
    createImageUploadSchema(options),
    z.array(z.instanceof(File)),
    z.null()
  ]).optional()
}

export function useFileValidation() {
  return {
    config: FILE_UPLOAD_CONFIG,
    createOptionalFileSchema
  }
}