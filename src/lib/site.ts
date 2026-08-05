export const siteConfig = {
  name: "EL'DA Design",
  shortName: "EL'DA",
  description: 'Дизайн-студия: UX/UI, веб-дизайн, графический дизайн, продвижение и motion.',
  locale: 'ru_RU',
  language: 'ru',
  email: 'hello_elda@yandex.ru',
} as const

export function getSiteUrl(): URL {
  const value = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return new URL(value)
}
