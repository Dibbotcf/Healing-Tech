import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProd = process.env.NODE_ENV === 'production'
const liveUrl = 'https://healingtechnology.com.bd'
const coolifyUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
// In production, use the custom domain as serverURL.
// Both the custom domain and the Coolify sslip.io domain are added to CORS/CSRF
// so requests from either origin are accepted without 500 errors.
const siteUrl = isProd ? liveUrl : 'http://localhost:12000'

const allowedOrigins = [
  siteUrl,
  'https://www.healingtechnology.com.bd',
  coolifyUrl,
  // Allow the Coolify internal sslip.io domain regardless of env var value
  ...(coolifyUrl && coolifyUrl !== liveUrl ? [coolifyUrl] : []),
].filter(Boolean) as string[]

export default buildConfig({
  sharp,
  serverURL: siteUrl,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  admin: {
    user: 'users',
    theme: 'dark',
    suppressHydrationWarning: true,
    components: {
      afterNavLinks: ['@/components/LogoutRedirect#LogoutRedirect'],
    },
    livePreview: {
      url: siteUrl,
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
    // Client Logos
    {
      slug: 'client-logos',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'logo', 'sortOrder'],
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
      },
      access: { read: () => true },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media', required: true },
        { name: 'website', type: 'text' },
        { name: 'sortOrder', type: 'number', defaultValue: 0 },
      ],
    },
    // Partner Logos
    {
      slug: 'partner-logos',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'logo'],
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
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
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
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
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
      },
      access: { read: () => true },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'parent', type: 'relationship', relationTo: 'categories' },
        { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero Image' },
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
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
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
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
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
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
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
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
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
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
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
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
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
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
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
      admin: {
        // filename must be first — it carries the row click handler for "Choose from existing"
        defaultColumns: ['filename', 'mimeType', 'filesize', 'updatedAt'],
        components: {
          beforeList: ['@/components/UploadBanner#UploadBanner'],
        },
      },
      access: { 
        read: () => true,
        create: ({ req }) => {
          if (req.user) return true;
          // Fallback for Next.js multipart/form-data cookie dropping bug
          const referer = req.headers?.get ? req.headers.get('referer') : req.headers?.referer;
          if (referer && typeof referer === 'string' && referer.includes('/admin')) return true;
          return false;
        },
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
      },
      upload: {
        staticDir: process.env.PAYLOAD_MEDIA_DIR || path.resolve(dirname, '../public/media'),
        mimeTypes: ['image/*', 'video/*', 'application/pdf'],
      },
      fields: [
        { name: 'alt', type: 'text', required: false },
        {
          name: 'preview',
          type: 'ui',
          admin: {
            // sidebar-only: shows video/image preview when editing a media document
            position: 'sidebar',
            components: {
              Field: '@/components/MediaPreview#MediaPreview',
              // NOTE: No Cell here — custom Cell was blocking row clicks in the media picker drawer
            }
          }
        }
      ]
    },
    // Gallery Posts (Images)
    {
      slug: 'gallery-posts',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'image', 'isFeatured', 'sortOrder'],
        description: 'Manage gallery images shown on the Gallery page.',
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
      },
      access: { read: () => true },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'caption', type: 'textarea', label: 'Caption / Short Description' },
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Image' },
        { name: 'isFeatured', type: 'checkbox', defaultValue: false, label: 'Featured (shown in highlights)' },
        { name: 'sortOrder', type: 'number', defaultValue: 0, label: 'Sort Order (lower = first)' },
      ],
    },
    // Gallery Videos
    {
      slug: 'gallery-videos',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'embedUrl', 'sortOrder'],
        description: 'Manage video embeds shown in the Gallery page video section.',
        components: {
          edit: { SaveButton: '@/components/SaveWithCancel#SaveWithCancel' },
        },
      },
      access: { read: () => true },
      hooks: {
        beforeChange: [
          ({ data }: { data: Record<string, unknown> }) => {
            // Auto-convert common YouTube share/watch URLs to embed format
            if (data.embedUrl && typeof data.embedUrl === 'string') {
              let url = (data.embedUrl as string).trim()
              // https://www.youtube.com/watch?v=VIDEO_ID
              url = url.replace(
                /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?:[^&]*&)*v=([a-zA-Z0-9_-]+)/,
                'https://www.youtube-nocookie.com/embed/$1'
              )
              // https://youtu.be/VIDEO_ID
              url = url.replace(
                /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/,
                'https://www.youtube-nocookie.com/embed/$1'
              )
              // Already an embed URL — normalise to youtube-nocookie domain
              url = url.replace(
                /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
                'https://www.youtube-nocookie.com/embed/$1'
              )
              data.embedUrl = url
            }
            return data
          },
        ],
      },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'description', type: 'textarea', label: 'Short Description' },
        {
          name: 'embedUrl',
          type: 'text',
          required: false,
          label: 'YouTube / Vimeo Embed URL',
          admin: { description: 'Paste any YouTube URL (watch or share link) — it will be converted automatically. Leave empty if uploading a video file below.' },
        },
        {
          name: 'videoFile',
          type: 'upload',
          relationTo: 'media',
          label: 'Upload Video File (optional)',
          admin: { description: 'Upload an MP4/WebM video directly. Used instead of the embed URL when present.' },
        },
        // Keep legacy thumbnail field hidden so the DB column (thumbnail_id) is preserved
        { name: 'thumbnail', type: 'upload', relationTo: 'media', label: 'Thumbnail (legacy)', admin: { hidden: true } },
        { name: 'sortOrder', type: 'number', defaultValue: 0, label: 'Sort Order (lower = first)' },
      ],
    },

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
    // Auto-sync schema on server start (creates new tables for new collections)
    push: true,
  }),
})
