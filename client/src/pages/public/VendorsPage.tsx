import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { VendorCard } from '@/components/cards/VendorCard'
import {
  buildVendorCategoryHref,
  categoryFilters,
  getCategoryLabelFromSlug,
} from '@/components/home/categoryNavigation'
import { getVendorsByCategory } from '@/components/home/vendorCatalog'

type VendorRangeKey = 'all' | 'under-1000' | '1000-2000' | '2000-plus'

const priceRangeOptions: Array<{ label: string; value: VendorRangeKey }> = [
  { label: 'All prices', value: 'all' },
  { label: 'Under $1,000', value: 'under-1000' },
  { label: '$1,000 - $2,000', value: '1000-2000' },
  { label: '$2,000+', value: '2000-plus' },
]

const locationOptions = ['All locations', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata']

const isWithinPriceRange = (priceValue: number, range: VendorRangeKey) => {
  if (range === 'under-1000') return priceValue < 1000
  if (range === '1000-2000') return priceValue >= 1000 && priceValue <= 2000
  if (range === '2000-plus') return priceValue > 2000
  return true
}

const formatPriceRangeLabel = (range: VendorRangeKey) =>
  priceRangeOptions.find((option) => option.value === range)?.label ?? 'All prices'

const isLocationMatch = (vendorLocation: string, locationFilter: string) => {
  if (!locationFilter || locationFilter === 'all') return true
  return vendorLocation.toLowerCase().includes(locationFilter.toLowerCase())
}

export function VendorsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? ''
  const search = searchParams.get('search') ?? ''
  const location = searchParams.get('location') ?? 'all'
  const priceRange = (searchParams.get('price') ?? 'all') as VendorRangeKey
  const categoryLabel = getCategoryLabelFromSlug(category)

  const filteredVendors = getVendorsByCategory(category).filter((vendor) => {
    const matchesCategory = category ? vendor.category === category : true
    const matchesSearch = search
      ? vendor.name.toLowerCase().includes(search.toLowerCase())
      : true
    const matchesLocation = isLocationMatch(vendor.location, location)
    const matchesPrice = isWithinPriceRange(vendor.priceValue, priceRange)

    return matchesCategory && matchesSearch && matchesLocation && matchesPrice
  })

  const updateQuery = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams)
    if (!value || value === 'all') {
      nextParams.delete(key)
    } else {
      nextParams.set(key, value)
    }
    setSearchParams(nextParams)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Vendors</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          {categoryLabel ? `${categoryLabel} Vendors` : 'Browse Trusted Vendors'}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          {categoryLabel
            ? `Showing curated vendors for ${categoryLabel.toLowerCase()} events.`
            : 'Discover premium event professionals and filter by category, budget, or location.'}
        </p>
      </motion.div>

      <section className="mb-10 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Search by vendor name
            <input
              type="search"
              value={search}
              onChange={(event) => updateQuery('search', event.target.value)}
              placeholder="Search vendors"
              className="h-12 rounded-2xl border border-slate-200 px-4 outline-none transition placeholder:text-slate-400 focus:border-blue-500"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Filter by category
            <select
              value={category}
              onChange={(event) => updateQuery('category', event.target.value)}
              className="h-12 rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-500"
            >
              <option value="">All categories</option>
              {categoryFilters.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Filter by location
            <select
              value={location}
              onChange={(event) => updateQuery('location', event.target.value)}
              className="h-12 rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-500"
            >
              {locationOptions.map((option) => (
                <option key={option} value={option === 'All locations' ? 'all' : option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Filter by price range
            <select
              value={priceRange}
              onChange={(event) => updateQuery('price', event.target.value)}
              className="h-12 rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-500"
            >
              {priceRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {(search || category || location !== 'all' || priceRange !== 'all') && (
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
            {search && <span className="rounded-full bg-slate-100 px-3 py-1">Search: {search}</span>}
            {categoryLabel && <span className="rounded-full bg-slate-100 px-3 py-1">Category: {categoryLabel}</span>}
            {location !== 'all' && <span className="rounded-full bg-slate-100 px-3 py-1">Location: {location}</span>}
            {priceRange !== 'all' && <span className="rounded-full bg-slate-100 px-3 py-1">Price: {formatPriceRangeLabel(priceRange)}</span>}
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="rounded-full bg-slate-950 px-3 py-1 text-white transition hover:bg-slate-800"
            >
              Clear all
            </button>
          </div>
        )}
      </section>

      <div className="mb-8 flex flex-wrap gap-3">
        {categoryFilters.map((item) => (
          <Link
            key={item.slug}
            to={buildVendorCategoryHref(item.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              category === item.slug
                ? 'bg-slate-950 text-white'
                : 'bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-950">{filteredVendors.length}</span> vendors
        </p>
        {categoryLabel && (
          <Link to="/vendors" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all vendors
          </Link>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredVendors.map((vendor, index) => (
          <motion.div
            key={vendor.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.03 }}
          >
            <VendorCard {...vendor} />
          </motion.div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="mt-12 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-950">No vendors found</h2>
          <p className="mt-2 text-slate-600">Try a different search term or clear the active filters.</p>
        </div>
      )}
    </div>
  )
}