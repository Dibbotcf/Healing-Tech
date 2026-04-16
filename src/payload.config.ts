import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  sharp,
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:12000',
  cors: process.env.NEXT_PUBLIC_SITE_URL ? [process.env.NEXT_PUBLIC_SITE_URL] : undefined,
  csrf: process.env.NEXT_PUBLIC_SITE_URL ? [process.env.NEXT_PUBLIC_SITE_URL] : undefined,
  admin: {
    user: 'users',
    theme: 'dark',
    suppressHydrationWarning: true,
    livePreview: {
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:12000',
      collections: ['products', 'legalPages'],
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [],
    },
    // Partner Logos
    {
      slug: 'partner-logos',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'logo'],
      },
      access: { read: () => true },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media', required: true },
        { name: 'website', type: 'text' },
        { name: 'sortOrder', type: 'number', defaultValue: 0 },
      ],
    },
    // Brands
    {
      slug: 'brands',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'countryOfOrigin', 'isFeatured'],
      },
      access: { read: () => true },
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
    },
    // Categories
    {
      slug: 'categories',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'parent'],
      },
      access: { read: () => true },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'parent', type: 'relationship', relationTo: 'categories' },
        { name: 'shortDescription', type: 'textarea' },
        { name: 'heroTitle', type: 'text' },
        { name: 'heroDescription', type: 'richText' },
        { name: 'sortOrder', type: 'number' },
        { name: 'isActive', type: 'checkbox', defaultValue: true },
      ],
    },
    // Certifications
    {
      slug: 'certifications',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'issuerOrStandardBody'],
      },
      access: { read: () => true },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'issuerOrStandardBody', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'appliesToBrands', type: 'relationship', relationTo: 'brands', hasMany: true },
        { name: 'appliesToProducts', type: 'relationship', relationTo: 'products', hasMany: true },
        { name: 'badgeImage', type: 'upload', relationTo: 'media' },
      ],
    },
    // Products
    {
      slug: 'products',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'brand', 'category', 'status'],
      },
      access: { read: () => true },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'price', type: 'number', label: 'Price (৳)' },
        { name: 'discountPrice', type: 'number', label: 'Discount Price (৳)' },
        { name: 'markAsNew', type: 'checkbox', label: 'Mark as NEW (displays badge)', defaultValue: false },
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
    },
    // Legal Pages
    {
      slug: 'legalPages',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'pageType', 'slug'],
      },
      access: { read: () => true },
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
    },
    // Testimonials
    {
      slug: 'testimonials',
      admin: {
        useAsTitle: 'clientName',
        defaultColumns: ['clientName', 'designation', 'hospital', 'isActive'],
      },
      access: { read: () => true },
      fields: [
        { name: 'clientName', type: 'text', required: true, label: 'Client Name' },
        { name: 'designation', type: 'text', label: 'Designation / Role' },
        { name: 'hospital', type: 'text', label: 'Hospital / Institution' },
        { name: 'quote', type: 'textarea', required: true, label: 'Testimonial Quote' },
        { name: 'avatar', type: 'upload', relationTo: 'media', label: 'Client Photo (optional)' },
        { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5, label: 'Rating (1-5)' },
        { name: 'sortOrder', type: 'number', defaultValue: 0 },
        { name: 'isActive', type: 'checkbox', defaultValue: true, label: 'Show on Website' },
      ],
    },
    // FAQs
    {
      slug: 'faqs',
      admin: {
        useAsTitle: 'question',
        defaultColumns: ['question', 'category', 'sortOrder', 'isActive'],
      },
      access: { read: () => true },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
        { name: 'category', type: 'select', options: [
          { label: 'General', value: 'general' },
          { label: 'Products', value: 'products' },
          { label: 'Order & Delivery', value: 'order-delivery' },
          { label: 'Support & Warranty', value: 'support-warranty' },
          { label: 'Technical', value: 'technical' },
        ], defaultValue: 'general' },
        { name: 'sortOrder', type: 'number', defaultValue: 0 },
        { name: 'isActive', type: 'checkbox', defaultValue: true, label: 'Show on Website' },
      ],
    },
    // Form Inquiries
    {
      slug: 'inquiries',
      admin: {
        useAsTitle: 'fullName',
        defaultColumns: ['fullName', 'email', 'hospital', 'createdAt', 'status'],
      },
      access: { 
        read: ({ req: { user } }) => Boolean(user), // only admin can read
        create: () => true, // anyone can submit
      },
      fields: [
        { name: 'fullName', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'hospital', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: true },
        { name: 'requirements', type: 'textarea' },
        { 
          name: 'status', 
          type: 'select', 
          options: [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Resolved', value: 'resolved' }
          ], 
          defaultValue: 'new' 
        },
      ],
    },
    // Orders
    {
      slug: 'orders',
      admin: {
        useAsTitle: 'orderNumber',
        defaultColumns: ['orderNumber', 'customerName', 'totalAmount', 'paymentStatus', 'status', 'invoiceLink'],
      },
      access: { 
        read: ({ req: { user } }) => Boolean(user),
        create: () => true, // open to allow checkout creation
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
      },
      fields: [
        { name: 'orderNumber', type: 'text', required: true, unique: true },
        {
          name: 'customer',
          type: 'group',
          fields: [
            { name: 'firstName', type: 'text', required: true },
            { name: 'lastName', type: 'text', required: true },
            { name: 'email', type: 'email', required: true },
            { name: 'phone', type: 'text', required: true },
            { name: 'address', type: 'textarea', required: true },
            { name: 'city', type: 'text', required: true },
          ],
        },
        { 
          name: 'customerName', 
          type: 'text', 
          admin: { hidden: true }, 
          hooks: { 
            beforeChange: [({ siblingData }) => {
              if (siblingData?.customer) {
                return `${siblingData.customer.firstName || ''} ${siblingData.customer.lastName || ''}`.trim()
              }
              return ''
            }] 
          } 
        },
        {
          name: 'items',
          type: 'array',
          required: true,
          fields: [
            { name: 'product', type: 'relationship', relationTo: 'products', required: true },
            { name: 'quantity', type: 'number', required: true, min: 1 },
            { name: 'priceAtPurchase', type: 'number', required: true },
          ],
        },
        { name: 'totalAmount', type: 'number', required: true },
        { 
          name: 'paymentMethod', 
          type: 'select', 
          options: [
            { label: 'bKash', value: 'bkash' },
            { label: 'SSLCommerz', value: 'sslcommerz' },
            { label: 'Cash on Delivery', value: 'cod' }
          ], 
          required: true 
        },
        { 
          name: 'paymentStatus', 
          type: 'select', 
          options: [
            { label: 'Unpaid', value: 'unpaid' },
            { label: 'Paid', value: 'paid' },
            { label: 'Failed', value: 'failed' }
          ], 
          defaultValue: 'unpaid' 
        },
        { 
          name: 'status', 
          type: 'select', 
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Processing', value: 'processing' },
            { label: 'Shipped', value: 'shipped' },
            { label: 'Delivered', value: 'delivered' },
            { label: 'Cancelled', value: 'cancelled' }
          ], 
          defaultValue: 'pending' 
        },
        {
          name: 'invoiceLink',
          type: 'text',
          admin: {
            readOnly: true,
            description: 'Link to the printable digital invoice. Share this with the customer.',
            position: 'sidebar',
            components: {
              Cell: '@/components/InvoiceLinkCell#InvoiceLinkCell'
            }
          },
          hooks: {
            beforeChange: [
              ({ siblingData }) => {
                if (siblingData?.orderNumber) {
                  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:12000';
                  return `${base}/invoice/${siblingData.orderNumber}`;
                }
                return '';
              }
            ]
          }
        },
        {
          name: 'paymentEvidence',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Screenshot or document proving payment.',
            position: 'sidebar'
          }
        }
      ],
    },
    // Media
    {
      slug: 'media',
      access: { read: () => true },
      upload: {
        staticDir: path.resolve(dirname, '../public/media'),
        mimeTypes: ['image/*', 'video/*', 'application/pdf'],
      },
      fields: [
        { name: 'alt', type: 'text', required: false }
      ]
    }
  ],
  globals: [
    // Site Settings
    {
      slug: 'siteSettings',
      access: { read: () => true },
      fields: [
        { name: 'companyName', type: 'text', defaultValue: 'Healing Technology', required: true },
        { name: 'tagline', type: 'text' },
        { name: 'address', type: 'textarea' },
        { name: 'mainPhone', type: 'text' },
        { name: 'secondaryPhone', type: 'text' },
        { name: 'marketingPhone', type: 'text' },
        { name: 'servicePhone', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'aboutSummary', type: 'textarea' },
        { name: 'trustSummary', type: 'textarea' },
        { name: 'globalSupportText', type: 'textarea' },
      ],
    },
  ],
  editor: lexicalEditor(),
  plugins: [
    seoPlugin({
      collections: ['products', 'categories', 'legalPages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `Healing Technology — ${doc?.title || doc?.name || ''}`,
      generateDescription: ({ doc }: any) => doc?.shortSummary || doc?.listingSummary || '',
    })
  ],
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
})
