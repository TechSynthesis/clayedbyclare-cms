import { Field } from 'payload/types'
import {
  AISuggestFeature,
  AutoCompleteFeature,
  ClearEditorFeature,
  CollapsibleFeature,
  EmojiPickerFeature,
  EmojisFeature,
  EquationsFeature,
  FigmaFeature,
  HorizontalRuleFeature,
  KeywordsFeature,
  lexicalRichTextField,
  LinkFeature,
  MentionsFeature,
  PasteLogFeature,
  SpeechToTextFeature,
  TableOfContentsFeature,
  TestRecorderFeature,
  TreeViewFeature,
  TwitterFeature,
  TypingPerfFeature,
  YouTubeFeature,
} from 'payload-plugin-lexical'

function lexicalRichText(props?: { name?: string; label?: string; debug?: boolean }): Field {
  return lexicalRichTextField({
    name: props?.name ? props?.name : 'lexical_richtext',
    label: props?.label ? props?.label : 'Rich Text',
    localized: true,
    editorConfigModifier: defaultEditorConfig => {
      defaultEditorConfig.debug = props?.debug ? props?.debug : false
      defaultEditorConfig.toggles.textColor.enabled = true
      defaultEditorConfig.toggles.textBackground.enabled = true
      defaultEditorConfig.toggles.fontSize.enabled = true
      defaultEditorConfig.toggles.font.enabled = false
      defaultEditorConfig.toggles.align.enabled = true
      defaultEditorConfig.toggles.tables.enabled = true
      defaultEditorConfig.toggles.tables.display = true

      defaultEditorConfig.features = [
        EquationsFeature({}),
        EmojisFeature({}),
        EmojiPickerFeature({}),
        HorizontalRuleFeature({}),
        FigmaFeature({}),
        YouTubeFeature({}),
        TwitterFeature({}),
        SpeechToTextFeature({}),
        ClearEditorFeature({}),
        //MentionsFeature({}),
        TreeViewFeature({ enabled: defaultEditorConfig.debug }),
        KeywordsFeature({}),
        AutoCompleteFeature({}),
        CollapsibleFeature({}),
        TypingPerfFeature({ enabled: defaultEditorConfig.debug }),
        PasteLogFeature({ enabled: defaultEditorConfig.debug }),
        TestRecorderFeature({ enabled: defaultEditorConfig.debug }),
        LinkFeature({}),
        TableOfContentsFeature({ enabled: false }),
        AISuggestFeature({}),
      ]

      return defaultEditorConfig
    },
  })
}

export default lexicalRichText
