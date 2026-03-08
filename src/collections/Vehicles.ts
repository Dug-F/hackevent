import type { CollectionConfig } from 'payload'

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',

  admin: {
    useAsTitle: 'registrationNumber',
  },

  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.registrationNumber) {
          data.registrationNumber = data.registrationNumber
            .toUpperCase()
            .replace(/\s+/g, '')
        }
        return data
      },
    ],
  },

  fields: [
    {
      name: 'registrationNumber',
      type: 'text',
      required: true,
      unique: true,
      label: 'Registration Number',
    },

    {
      name: 'taxStatus',
      type: 'select',
      options: [
        'Not Taxed for on Road Use',
        'SORN',
        'Taxed',
        'Untaxed',
      ],
    },

    {
      name: 'taxDueDate',
      type: 'date',
    },

    {
      name: 'artEndDate',
      type: 'date',
      label: 'Additional Rate of Tax End Date',
    },

    {
      name: 'motStatus',
      type: 'select',
      options: [
        'No details held by DVLA',
        'No results returned',
        'Not valid',
        'Valid',
      ],
    },

    {
      name: 'motExpiryDate',
      type: 'date',
    },

    {
      name: 'make',
      type: 'text',
    },

    {
      name: 'monthOfFirstDvlaRegistration',
      type: 'date',
      label: 'Month Of First DVLA Registration',
    },

    {
      name: 'monthOfFirstRegistration',
      type: 'date',
      label: 'Month Of First Registration',
    },

    {
      name: 'yearOfManufacture',
      type: 'number',
    },

    {
      name: 'engineCapacity',
      type: 'number',
      label: 'Engine Capacity (cc)',
    },

    {
      name: 'co2Emissions',
      type: 'number',
      label: 'CO2 Emissions',
    },

    {
      name: 'fuelType',
      type: 'text',
    },

    {
      name: 'markedForExport',
      type: 'checkbox',
    },

    {
      name: 'colour',
      type: 'text',
    },

    {
      name: 'typeApproval',
      type: 'text',
    },

    {
      name: 'wheelplan',
      type: 'text',
    },

    {
      name: 'revenueWeight',
      type: 'number',
    },

    {
      name: 'realDrivingEmissions',
      type: 'text',
    },

    {
      name: 'dateOfLastV5CIssued',
      type: 'date',
      label: 'Date Of Last V5C Issued',
    },

    {
      name: 'euroStatus',
      type: 'text',
    },

    {
      name: 'automatedVehicle',
      type: 'checkbox',
    },
  ],
}