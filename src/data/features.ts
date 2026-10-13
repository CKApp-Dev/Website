import { coreFeatures } from './core-features'
import { campusFeatures } from './campus-features'
import type { FeaturePage } from './types'

const order = ['today', 'timetable', 'calendar', 'cafeteria', 'nearby-food', 'school-news', 'announcements', 'transport', 'partner-shops', 'souvenirs', 'dance-tickets', 'decision-helper', 'widgets', 'getting-started']

export const features: FeaturePage[] = [...coreFeatures, ...campusFeatures].sort(
  (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug),
)

export const featureGroups = [
  { id: 'daily', label: '每天都會用到', description: '從第一堂課到午餐，把課程、待辦與美食安排好' },
  { id: 'campus', label: '校園生活', description: '消息、交通、特約與活動，校園內外的常用資訊' },
  { id: 'personal', label: '照你的習慣', description: '從第一次開啟，到個人設定與 iOS 小工具' },
] as const

export const homeHref = import.meta.env.BASE_URL
export const featuresHref = `${homeHref}features/`
export const featureHref = (slug: string): string => `${featuresHref}${slug}/`
