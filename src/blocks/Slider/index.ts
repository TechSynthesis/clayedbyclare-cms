import type { Block } from 'payload/types'

import { blockFields } from '../../fields/blockFields'
import link from '../../fields/link'
import richText from '../../fields/richText'

export const Slider: Block = {
  slug: 'slider',
  fields: [
    blockFields({
      name: 'sliderFields',
      fields: [
        {
          name: 'useLeadingHeader',
          label: 'Use Leading Header',
          type: 'checkbox',
        },
        richText({
          name: 'leadingHeader',
          label: 'Leading Header',
          admin: {
            condition: (_, siblingData) => siblingData.useLeadingHeader,
          },
        }),
        {
          type: 'select',
          name: 'sliderType',
          required: true,
          options: [
            {
              label: 'Quote Slider',
              value: 'quoteSlider',
            },
            {
              label: 'Image Slider',
              value: 'imageSlider',
            },
            {
              label: 'Image Compare Slider',
              value: 'imageCompareSlider',
            },
            {
              label: 'Image & Text Link Slider',
              value: 'imageTextSlider',
            },
          ],
        },
        {
          type: 'array',
          name: 'imageSlides',
          required: true,
          minRows: 3,
          admin: {
            condition: (_, siblingData) => siblingData.sliderType === 'imageSlider',
          },
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
          type: 'array',
          name: 'imageTextSlides',
          required: true,
          minRows: 3,
          admin: {
            condition: (_, siblingData) => siblingData.sliderType === 'imageTextSlider',
          },
          fields: [
            richText({
              name: 'richText',
              required: true,
              admin: {
                elements: [],
                leaves: ['underline'],
              },
            }),
            {
              name: 'description',
              type: 'textarea',
            },
            {
              type: 'upload',
              name: 'image',
              relationTo: 'media',
              required: true,
            },
            link({
              disableLabel: true,
              appearances: false,
            }),
          ],
        },
        {
          type: 'array',
          name: 'imageCompareSlides',
          required: true,
          minRows: 1,
          admin: {
            condition: (_, siblingData) => siblingData.sliderType === 'imageCompareSlider',
          },
          fields: [
            {
              type: 'select',
              name: 'sliderOrientation',
              required: true,
              defaultValue: 'landscape',
              options: [
                {
                  label: 'Landscape',
                  value: 'landscape',
                },
                {
                  label: 'Portrait',
                  value: 'portrait',
                },
              ],
            },
            {
              type: 'upload',
              name: 'beforeImage',
              relationTo: 'media',
              required: true,
            },
            {
              type: 'upload',
              name: 'afterImage',
              relationTo: 'media',
            },
          ],
        },
        {
          type: 'array',
          name: 'quoteSlides',
          required: true,
          minRows: 3,
          admin: {
            condition: (_, siblingData) => siblingData.sliderType === 'quoteSlider',
          },
          fields: [
            richText({
              name: 'richText',
              required: true,
              admin: {
                elements: [],
                leaves: ['underline'],
              },
            }),
            {
              type: 'select',
              name: 'quoteType',
              required: true,
              options: [
                {
                  label: 'Date',
                  value: 'quoteDate',
                },
                {
                  label: 'Full Name',
                  value: 'fullName',
                },
              ],
            },
            {
              type: 'date',
              name: 'quoteDate',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData.quoteType === 'quoteDate',
              },
            },
            {
              type: 'text',
              name: 'fullName',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData.quoteType === 'fullName',
              },
            },
          ],
        },
      ],
    }),
  ],
}
