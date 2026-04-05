import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand', 'category', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'sku', type: 'text' },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'brand', type: 'relationship', relationTo: 'brands', required: true },
    { name: 'brochurePageRef', type: 'text' },
    { name: 'listingTitle', type: 'text' },
    { name: 'listingSummary', type: 'textarea' },
    { name: 'shortSummary', type: 'textarea' },
    { name: 'overview', type: 'richText' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text' },
      ],
    },
    {
      name: 'keyHighlights',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'applications',
      type: 'array',
      fields: [{ name: 'department', type: 'text', required: true }],
    },
    { name: 'originCountry', type: 'text' },
    { name: 'certificationSummary', type: 'textarea' },
    {
      name: 'specGroups',
      type: 'array',
      fields: [
        { name: 'groupTitle', type: 'text', required: true },
        {
          name: 'rows',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'downloadItems',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Brochure', value: 'brochure' },
            { label: 'Datasheet', value: 'datasheet' },
            { label: 'Manual', value: 'manual' },
            { label: 'Certificate', value: 'certificate' },
            { label: 'Warranty Note', value: 'warranty-note' },
          ],
          required: true,
        },
        { name: 'file', type: 'upload', relationTo: 'media' },
        { name: 'externalUrl', type: 'text' },
      ],
    },
    {
      name: 'supportBlocks',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'faqItems',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    { name: 'relatedProducts', type: 'relationship', relationTo: 'products', hasMany: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
