import formBuilder from '@payloadcms/plugin-form-builder'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import search from '@payloadcms/plugin-search'
import seo from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload/config'
import { LexicalPlugin } from 'payload-plugin-lexical'

import { CaseStudies } from './collections/CaseStudies'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Products } from './collections/Products'
import { ReusableContent } from './collections/ReusableContent'
import { Users } from './collections/Users'
import SpaceRemaining from './components/SpaceRemaining'
import richText from './fields/richText'
import { Footer } from './globals/Footer'
import { MainMenu } from './globals/MainMenu'
import { Icon } from './graphics/Icon'
import { Logo } from './graphics/Logo'

// const GOOGLE_PROPERTY_ID = process.env.GOOGLE_PROPERTY_ID
// const GOOGLE_CREDENTIALS_FILE = process.env.GOOGLE_CREDENTIALS_FILE

// const googleProvider: GoogleProvider = {
//   source: 'google',
//   credentials: GOOGLE_CREDENTIALS_FILE,
//   propertyId: GOOGLE_PROPERTY_ID,
// }

export default buildConfig({
  collections: [CaseStudies, Media, Pages, Posts, Products, ReusableContent, Users],
  upload: {
    limits: {
      fileSize: 900000000, // 500MB, written in bytes
    },
  },
  globals: [Footer, MainMenu],
  graphQL: {
    disablePlaygroundInProduction: false,
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  plugins: [
    formBuilder({
      formOverrides: {
        fields: [
          richText({
            name: 'leader',
            label: 'Leader Text',
            admin: {
              elements: [],
            },
          }),
        ],
      },
    }),
    seo({
      collections: ['case-studies', 'pages', 'posts', 'products'],
      uploadsCollection: 'media',
      //add this
      // generateTitle: ({ doc }) => ` ${doc?.title?.value} - ${process.env.PAYLOAD_WEBSITE_NAME}`,
      // generateDescription: ({ doc }) => doc.excerpt,
    }),
    nestedDocs({
      collections: ['pages', 'products'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: docs => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    redirects({
      collections: ['case-studies', 'pages', 'posts', 'products'],
    }),
    LexicalPlugin({
      // Only set this if you want to use the the AISuggest Feature
      ai: {
        openai_key: process.env.OPENAI_KEY,
      },
    }),
    search({
      collections: ['pages', 'posts', 'products', 'case-studies'],
      defaultPriorities: {
        pages: 10,
        posts: 20,
      },
    }),
  ],
  cors: [process.env.PAYLOAD_PUBLIC_APP_URL, 'https://techinverted.com'].filter(Boolean),
  // csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL, process.env.PAYLOAD_PUBLIC_SITE_URL],
  admin: {
    meta: {
      titleSuffix: '- TechInverted CMS',
      favicon: '/assets/favicon.svg',
      ogImage: '/assets/logo.svg',
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },

      beforeDashboard: [SpaceRemaining],
    },
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          react: path.resolve(__dirname, '../node_modules/react'),
          'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
          'react-router-dom': path.resolve(__dirname, '../node_modules/react-router-dom'),
        },
      },
    }),
  },
})
