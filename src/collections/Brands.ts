import type { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'countryOfOrigin', 'isFeatured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'countryOfOrigin', type: 'text' },
    { name: 'summary', type: 'textarea' },
    { name: 'certificationsText', type: 'richText' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'website', type: 'text' },
    { name: 'isFeatured', type: 'checkbox', defaultValue: true },
  ],
}
