import type { CollectionConfig } from 'payload'

export const LegalPages: CollectionConfig = {
  slug: 'legalPages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'pageType', 'slug'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'pageType',
      type: 'select',
      options: [
        { label: 'Privacy Policy', value: 'privacy-policy' },
        { label: 'Terms and Conditions', value: 'terms-and-conditions' },
        { label: 'Disclaimer', value: 'disclaimer' },
        { label: 'Warranty & Refund Policy', value: 'warranty-refund-policy' },
      ],
      required: true,
    },
    { name: 'content', type: 'richText', required: true },
  ],
}
