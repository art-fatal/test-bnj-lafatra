import * as z from 'zod'

export const FILE_UPLOAD_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedImageTypes: ['image/jpeg', 'image/jpg', 'image/png'],
  minDimensions: { width: 200, height: 200 },
  maxDimensions: { width: 4096, height: 4096 }
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
  validateDimensions?: boolean
}) {
  const maxSize = options?.maxSize ?? FILE_UPLOAD_CONFIG.maxSize
  const acceptedTypes = options?.acceptedTypes ?? FILE_UPLOAD_CONFIG.acceptedImageTypes
  const validateDimensions = options?.validateDimensions ?? false

  let schema = z.instanceof(File)
    .refine((file) => file.size <= maxSize, {
      message: `L'image est trop volumineuse. Veuillez choisir une image plus petite que ${formatBytes(maxSize)}.`
    })
    .refine((file) => acceptedTypes.includes(file.type), {
      message: 'Veuillez télécharger un fichier image valide (JPEG, PNG).'
    })

  if (validateDimensions) {
    schema = schema.refine(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const img = new Image()
            img.onload = () => {
              const meetsDimensions =
                img.width >= FILE_UPLOAD_CONFIG.minDimensions.width &&
                img.height >= FILE_UPLOAD_CONFIG.minDimensions.height &&
                img.width <= FILE_UPLOAD_CONFIG.maxDimensions.width &&
                img.height <= FILE_UPLOAD_CONFIG.maxDimensions.height
              resolve(meetsDimensions)
            }
            img.src = e.target?.result as string
          }
          reader.readAsDataURL(file)
        }),
      {
        message: `Les dimensions de l'image sont invalides. Veuillez télécharger une image entre ${FILE_UPLOAD_CONFIG.minDimensions.width}x${FILE_UPLOAD_CONFIG.minDimensions.height} et ${FILE_UPLOAD_CONFIG.maxDimensions.width}x${FILE_UPLOAD_CONFIG.maxDimensions.height} pixels.`
      }
    )
  }

  return schema
}

export function createOptionalFileSchema(options?: {
  maxSize?: number
  acceptedTypes?: string[]
  validateDimensions?: boolean
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