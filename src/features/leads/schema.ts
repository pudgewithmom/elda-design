import { z } from 'zod'

const optionalText = z.string().trim().max(500).optional().or(z.literal(''))

export const leadSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    phone: optionalText,
    email: z.email().optional().or(z.literal('')),
    telegramUsername: optionalText,
    message: z.string().trim().min(5).max(3000),
    consent: z.literal(true),
    turnstileToken: z.string().trim().optional(),
    pageUrl: z.url().optional(),
    utmSource: optionalText,
    utmMedium: optionalText,
    utmCampaign: optionalText,
  })
  .refine((value) => Boolean(value.phone || value.email || value.telegramUsername), {
    message: 'Укажите телефон, email или Telegram.',
    path: ['phone'],
  })

export type LeadInput = z.infer<typeof leadSchema>
