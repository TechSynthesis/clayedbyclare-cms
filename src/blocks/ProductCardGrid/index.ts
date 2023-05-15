import type { Block } from 'payload/types'

import { blockFields } from '../../fields/blockFields'
import link from '../../fields/link'
import linkGroup from '../../fields/linkGroup'
import richText from '../../fields/richText'

export const ProductCardGrid: Block = {
  slug: 'productCardGrid',
  fields: [
    blockFields({
      name: 'productCardGridFields',
      fields: [
        richText(),
        linkGroup({
          appearances: false,
          overrides: {
            admin: {
              description: 'These links will be placed above the card grid as calls-to-action.',
            },
          },
        }),
        {
          name: 'cards',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'price',
              type: 'text',
              required: true,
            },
            {
              name: 'soldOut',
              type: 'checkbox',
            },
            {
              type: 'array',
              name: 'productImageSlides',
              required: true,
              fields: [
                {
                  type: 'upload',
                  name: 'image',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },

            {
              name: 'enableLink',
              type: 'checkbox',
            },
            link({
              disableLabel: true,
              appearances: false,
              overrides: {
                admin: {
                  condition: (_, { enableLink }) => enableLink,
                },
              },
            }),
          ],
        },
      ],
    }),
  ],
}
