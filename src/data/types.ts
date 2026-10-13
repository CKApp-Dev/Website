export type FeatureGroup = 'daily' | 'campus' | 'personal'
export type PreviewKind = 'timeline' | 'timetable' | 'calendar' | 'menu' | 'news' | 'transport' | 'links' | 'picker' | 'widget' | 'setup'

export interface FeatureSection {
  id: string
  title: string
  body: string
  points: { title: string; description: string }[]
}

export interface FeaturePage {
  slug: string
  title: string
  kicker: string
  tagline: string
  description: string
  group: FeatureGroup
  icon: string
  entry: string
  highlights: string[]
  preview: {
    kind: PreviewKind
    title: string
    label: string
    rows: { label: string; value: string; detail?: string }[]
  }
  sections: FeatureSection[]
  steps: { title: string; description: string }[]
  tips: string[]
  faqs: { question: string; answer: string }[]
  related: string[]
  external?: { label: string; href: string }[]
}
