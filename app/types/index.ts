// Live Event
export interface LiveEvent {
  date: string
  id: string
  place: string
  info: string[]
  soldOut: boolean
  titleMobile: string
  titleDesktop: string
  title: string
  time: string
  act: string
  fee: string
  hero: string
  wp: boolean
}

// News Item
export interface NewsItem {
  date: string
  id: string
  title: string
  titleMobile: string
  titleDesktop: string
  info: string[]
  hero: string
  wp: boolean
}

// Music Album
export interface MusicAlbum {
  date: string
  slug: string
  title: string
  titleSub: string
  text: string
  songs: string[]
  fee: string
  img: string
  soldOut?: boolean
  special?: string
}

// Profile Section
export interface ProfileSection {
  titleEn: string
  titleJa: string
  text: string
  artistImage?: string
}

// Special Page Item
export interface SpecialItem {
  titleEn: string
  titleJa: string
  image?: string
  texts: string[]
}

// Special Page
export interface SpecialPage {
  id: string
  name: string
  items: SpecialItem[]
}

// Follow/Listen Category
export interface SocialLink {
  name: string
  link: string
}

export interface SocialCategory {
  name: string
  items: SocialLink[]
}

// Listen Data (same structure as Follow)
export type ListenCategory = SocialCategory
export type FollowCategory = SocialCategory
