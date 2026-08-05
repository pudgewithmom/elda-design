import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { CollectionConfig } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  access: { read: () => true },
  upload: {
    staticDir: path.resolve(dirname, '../../../media'),
    imageSizes: [
      { name: 'card', width: 1200, height: 800, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Осмысленное описание изображения для доступности и SEO.' },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
