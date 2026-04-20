import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'parent'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'parent', type: 'relationship', relationTo: 'categories' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'shortDescription', type: 'textarea' },
    { name: 'heroTitle', type: 'text' },
    { name: 'heroDescription', type: 'richText' },
    { name: 'sortOrder', type: 'number' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}
