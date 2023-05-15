import type { Block } from 'payload/types'

import { blockFields } from '../../fields/blockFields'
import customizedLexicalRichText from '../../fields/customizedLexicalRichText'

export const LexicalRichText: Block = {
  slug: 'lexical',
  fields: [
    blockFields({
      name: 'lexicalFields',
      fields: [customizedLexicalRichText()],
    }),
  ],
}
