import type { Block } from 'payload/types'

import { blockFields } from '../../fields/blockFields'
import linkGroup from '../../fields/linkGroup'
import richText from '../../fields/richText'

export const LocationsGrid: Block = {
  slug: 'locationsGrid',
  fields: [
    blockFields({
      name: 'locationsGridFields',
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
          name: 'tabs',
          type: 'array',
          fields: [
            {
              name: 'tabTitle',
              type: 'text',
              required: true,
            },
            {
              name: 'defaultLocationGoogleUrl',
              type: 'text',
              required: true,
            },
            {
              name: 'locations',
              type: 'array',
              fields: [
                {
                  name: 'locationName',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'address',
                  type: 'textarea',
                },
                {
                  name: 'googleUrl',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
}
