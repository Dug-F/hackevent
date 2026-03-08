import type { CollectionConfig } from 'payload'
import { fullLexical } from '@/fields/fullLexical'

export const Projects: CollectionConfig = {
  slug: 'projects',

  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'navTitle',
      type: 'text',
      label: 'Navbar Title',
      admin: {
        description: 'Short title shown in navigation',
      },
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },

    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show in Navigation',
    },

    {
      name: 'summary',
      type: 'textarea',
    },

    {
      name: 'body',
      type: 'richText',
      editor: fullLexical,
      required: true,
    },
  ],
}