import type { CollectionConfig } from 'payload/types'

import { isAdmin } from '../access/isAdmin'
import { publishedOnly } from '../access/publishedOnly'
import { Accordion } from '../blocks/Accordion'
// import { Banner } from '../blocks/Banner'
import { CallToAction } from '../blocks/CallToAction'
import { CardGrid } from '../blocks/CardGrid'
import { CaseStudiesHighlight } from '../blocks/CaseStudiesHighlight'
import { CaseStudyCards } from '../blocks/CaseStudyCards'
import { CodeFeature } from '../blocks/CodeFeature'
import { Content } from '../blocks/Content'
import { ContentGrid } from '../blocks/ContentGrid'
import { FeatureGrid } from '../blocks/FeatureGrid'
import { Form } from '../blocks/Form'
import { HoverHighlights } from '../blocks/HoverHighlights'
import { LinkGrid } from '../blocks/LinkGrid'
import { MediaBlock } from '../blocks/Media'
import { MediaContent } from '../blocks/MediaContent'
import { ProductFeatures } from '../blocks/ProductFeatures'
import { ReusableContent } from '../blocks/ReusableContent'
import { Slider } from '../blocks/Slider'
import { SpecificationGrid } from '../blocks/SpecificationGrid'
import { Steps } from '../blocks/Steps'
// import StickyContent from '../blocks/StickyContent'
import { StickyHighlights } from '../blocks/StickyHighlights'
import { productOrCategory } from '../fields/productOrCategory'
import { slugField } from '../fields/slug'
import { formatPreviewURL } from '../utilities/formatPreviewURL'
import { regeneratePage } from '../utilities/regeneratePage'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    preview: doc => formatPreviewURL('products', doc),
    defaultColumns: ['fullTitle', 'slug', 'createdAt', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    create: isAdmin,
    read: publishedOnly,
    readVersions: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      ({ req: { payload }, doc }) => {
        regeneratePage({
          payload,
          collection: 'products',
          doc,
        })
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Product or Category',
          fields: [productOrCategory],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                CardGrid,
                CaseStudiesHighlight,
                CaseStudyCards,
                CodeFeature,
                Content,
                ContentGrid,
                Form,
                HoverHighlights,
                LinkGrid,
                MediaBlock,
                MediaContent,
                ReusableContent,
                Slider,
                Steps,
                StickyHighlights,
                Accordion,
                SpecificationGrid,
                ProductFeatures,
                FeatureGrid,
              ],
            },
          ],
        },
      ],
    },
    slugField(),
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
