import type { CollectionConfig } from 'payload'

export const Cases: CollectionConfig = {
  slug: 'cases',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user) || { _status: { equals: 'published' } },
  },
  versions: { drafts: { autosave: true } },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'cover', type: 'upload', relationTo: 'media', required: true },
    { name: 'content', type: 'richText', required: true },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', maxLength: 60 },
        { name: 'description', type: 'textarea', maxLength: 160 },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'noIndex', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
