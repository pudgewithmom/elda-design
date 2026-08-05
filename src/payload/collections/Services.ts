import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'order', type: 'number', required: true, defaultValue: 0, index: true },
    { name: 'isActive', type: 'checkbox', defaultValue: true, index: true },
  ],
}
