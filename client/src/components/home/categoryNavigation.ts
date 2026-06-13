import { createSearchParams } from 'react-router-dom'

export type CategoryFilter = {
  label: string
  slug: string
  description: string
  vendors: string
  image: string
}

export const categoryFilters: CategoryFilter[] = [
  {
    label: 'Wedding Planning',
    slug: 'wedding',
    description: 'Full-service planning for elegant ceremonies and receptions.',
    vendors: '120+ vendors',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Birthday Parties',
    slug: 'birthday',
    description: 'Kids, milestone, and luxury birthday celebrations.',
    vendors: '80+ vendors',
    image:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Corporate Events',
    slug: 'corporate',
    description: 'Conferences, product launches, and team celebrations.',
    vendors: '95+ vendors',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Photography',
    slug: 'photography',
    description: 'Capture every moment with premium event photographers.',
    vendors: '60+ vendors',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Decoration Services',
    slug: 'decoration',
    description: 'Stage decor, floral designs, and themed setups.',
    vendors: '110+ vendors',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'DJ & Entertainment',
    slug: 'dj-night',
    description: 'Live music, DJs, and unforgettable performance acts.',
    vendors: '70+ vendors',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
  },
]

export const buildVendorCategoryHref = (slug: string) => ({
  pathname: '/vendors',
  search: `?${createSearchParams({ category: slug })}`,
})

export const getCategoryLabelFromSlug = (slug?: string | null) =>
  categoryFilters.find((category) => category.slug === slug)?.label ?? null