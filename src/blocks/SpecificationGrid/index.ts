import type { Block } from 'payload/types'

import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'

export const SpecificationGrid: Block = {
  slug: 'specificationGrid',
  fields: [
    blockFields({
      name: 'specificationGridFields',
      fields: [
        richText({
          name: 'leadingHeader',
          label: 'Leading Header',
          required: false,
        }),
        {
          name: 'specifications',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'textarea',
            },
          ],
        },
      ],
    }),
  ],
}
