import {
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  HeadingFeature,
  UnorderedListFeature,
  OrderedListFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const fullLexical = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    HeadingFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    LinkFeature(),
  ],
})
