import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    {
      name: 'contacts',
      type: 'group',
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'telegramUrl', type: 'text' },
        { name: 'whatsappUrl', type: 'text' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'defaultTitle', type: 'text', required: true },
        { name: 'defaultDescription', type: 'textarea', required: true },
        { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
