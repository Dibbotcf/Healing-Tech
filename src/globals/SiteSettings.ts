import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  access: {
    read: () => true,
  },
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
}
