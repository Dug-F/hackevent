import type { CollectionConfig } from 'payload'
import { fullLexical } from '@/fields/fullLexical'

export const HomePage: CollectionConfig = {
  slug: 'homepage',

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
      name: 'eventDate',
      type: 'text',
    },

    {
      name: 'purpose',
      type: 'richText',
      editor: fullLexical,
    },

    {
      name: 'environmentNotes',
      type: 'richText',
      editor: fullLexical,
    },
    {
      name: 'environmentCommands',
      type: 'textarea',
      label: 'Environment Commands',
    },
  ],
}
