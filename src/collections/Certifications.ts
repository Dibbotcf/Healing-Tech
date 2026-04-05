import type { CollectionConfig } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuerOrStandardBody'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'issuerOrStandardBody', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'appliesToBrands', type: 'relationship', relationTo: 'brands', hasMany: true },
    { name: 'appliesToProducts', type: 'relationship', relationTo: 'products', hasMany: true },
    { name: 'badgeImage', type: 'upload', relationTo: 'media' },
  ],
}
