import type { CollectionConfig } from 'payload'
import crypto from 'crypto'

export const ApiKeys: CollectionConfig = {
  slug: 'api-keys',

  admin: {
    useAsTitle: 'name',
  },

  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data
        
        if (!data.apiKey) {
          const random = crypto.randomBytes(16).toString('hex')
          data.apiKey = `dvla_test_${random}`
        }
        return data
      },
    ],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Key Name',
    },
    {
      name: 'apiKey',
      type: 'text',
      required: true,
      unique: true,
      label: 'API Key',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'ownerName',
      type: 'text',
      label: 'Owner Name',
    },
    {
      name: 'ownerEmail',
      type: 'email',
      label: 'Owner Email',
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: 'Expiry Date',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Admin Notes',
    },
    {
      name: 'lastUsed',
      type: 'date',
      label: 'Last Used',
      admin: {
        readOnly: true,
      },
    },
  ],
}