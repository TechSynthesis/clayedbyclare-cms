import type { Block } from 'payload/types'

import { blockFields } from '../../fields/blockFields'
import link from '../../fields/link'
import linkGroup from '../../fields/linkGroup'
import richText from '../../fields/richText'

export const ProductFeatures: Block = {
  slug: 'productFeatures',
  fields: [
    blockFields({
      name: 'productFeaturesFields',
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
          name: 'withBackground',
          type: 'checkbox',
          admin: {
            description: 'Check this box to render this block with a background container.',
          },
        },
        {
          name: 'alignment',
          type: 'select',
          defaultValue: 'verticalMediaTextCard',
          options: [
            {
              label: 'Vertical Media then Text Card',
              value: 'verticalMediaTextCard',
            },
            {
              label: 'Horizontal Media then Text Card ->',
              value: 'horizontalMediaTextCard',
            },
          ],
          admin: {
            description: 'Choose how to align the content for this block.',
            width: '50%',
          },
        },
        {
          name: 'cards',
          type: 'array',
          minRows: 3,
          required: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
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
            {
              name: 'cardIcon',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    }),
  ],
}
