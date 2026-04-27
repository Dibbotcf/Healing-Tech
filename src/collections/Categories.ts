import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sortOrder', 'isActive'],
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
    {
      name: 'sortOrder',
      type: 'number',
      admin: {
        description: 'Controls the display order on the website. 1 = first, 2 = second, etc. Each number must be unique — duplicates are not allowed.',
      },
      validate: async (value: number | null | undefined, { req, id }: any) => {
        // Skip validation if no value set
        if (value == null || value === undefined) return true;

        try {
          const payload = req.payload;
          const existing = await payload.find({
            collection: 'categories',
            where: {
              sortOrder: { equals: value },
            },
            limit: 5,
            depth: 0,
          });

          // Filter out the current document being edited (allow saving same value on same doc)
          const conflicts = existing.docs.filter((doc: any) => String(doc.id) !== String(id));

          if (conflicts.length > 0) {
            const conflictName = conflicts[0].title || 'another category';
            return `Sort Order ${value} is already used by "${conflictName}". Each category must have a unique sort number.`;
          }

          return true;
        } catch {
          return true; // fail open — don't block save on DB error
        }
      },
    },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}

