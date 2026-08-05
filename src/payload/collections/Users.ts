import type { CollectionConfig } from 'payload'

const authenticated = ({ req }: { req: { user: unknown } }) => Boolean(req.user)

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Администратор', value: 'admin' },
        { label: 'Редактор', value: 'editor' },
      ],
    },
  ],
}
