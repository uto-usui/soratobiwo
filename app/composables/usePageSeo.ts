// SEO Meta composable - replaces HeadMixin
interface SeoMetaOptions {
  title?: string
  description?: string
  ogImage?: string
  ogType?: string
  keywords?: string
}

const defaultMeta = {
  title: '大阪のロックバンド「soratobiwo | ソラトビヲ」のオフィシャルサイト。',
  description:
    '大阪のロックバンド「soratobiwo | ソラトビヲ」のオフィシャルサイト。プロフィール・ライブスケジュール・音源情報・ニュース・ブログなどsoratobiwoの情報が満載です。',
  ogImage: 'https://soratobiwo.com/ogp.png',
  ogType: 'website',
  keywords: '大阪,バンド,ロックバンド,soratobiwo,ソラトビヲ',
}

export function usePageSeo(options: SeoMetaOptions = {}) {
  const title = options.title || defaultMeta.title
  const description = options.description || defaultMeta.description
  const ogImage = options.ogImage || defaultMeta.ogImage
  const ogType = options.ogType || defaultMeta.ogType
  const keywords = options.keywords || defaultMeta.keywords

  useHead({
    title,
    meta: [
      { name: 'keywords', content: keywords },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:locale', content: 'ja_JP' },
      { property: 'og:type', content: ogType },
      { property: 'og:image', content: ogImage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@soratobiwo' },
    ],
  })
}
