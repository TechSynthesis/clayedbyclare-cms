import type { Field } from 'payload/types'

import linkGroup from './linkGroup'

export const productOrCategory: Field = {
  name: 'productOrCategory',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Type',
      required: true,
      defaultValue: 'category',
      options: [
        {
          label: 'Category',
          value: 'category',
        },
        {
          label: 'Product',
          value: 'product',
        },
      ],
    },
    {
      name: 'productSeries',
      type: 'text',
      required: true,
      admin: {
        condition: (_, { type }) => type === 'product',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'longDescription',
      type: 'textarea',
      required: false,
      admin: {
        condition: (_, { type }) => type === 'product',
      },
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: 'actions',
        label: 'Sidebar Actions',
        maxRows: 3,
      },
    }),
    {
      type: 'array',
      name: 'thumbnailSlides',
      required: false,
      fields: [{ type: 'upload', name: 'image', relationTo: 'media', required: true }],
    },
  ],
}
