import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { vendorApi } from '@/services/vendor/vendor.api'
import type { IVendor } from '@eventhub/shared'
import { CATEGORY_ICONS, VENDOR_CATEGORIES } from './customer.utils'
import { Input } from '@/components/ui/input'

export function CustomerVendorsPage() {
  const [vendors, setVendors] = useState<IVendor[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const result = await vendorApi.getVendors({
          search: search || undefined,
          category: category || undefined,
          city: city || undefined,
          page,
          limit: 12,
        })
        setVendors(result.vendors)
        setTotalPages(result.pagination.pages)
      } catch {
        setVendors([])
      } finally {
        setLoading(false)
      }
    }
    const timer = setTimeout(load, search ? 300 : 0)
    return () => clearTimeout(timer)
  }, [search, category, city, page])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Browse Vendors</h1>
        <p className="mt-1 text-sm text-slate-500">Find the perfect vendor for your next event</p>
      </div>

      {/* Search & Filters */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Search"
            placeholder="Search by business name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Category</label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1) }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">All Categories</option>
              {VENDOR_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <Input
            label="City"
            placeholder="Filter by city..."
            value={city}
            onChange={(e) => { setCity(e.target.value); setPage(1) }}
          />
        </div>
      </div>

      {/* Category quick filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setCategory(''); setPage(1) }}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            !category ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
          }`}
        >
          All
        </button>
        {VENDOR_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => { setCategory(c); setPage(1) }}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              category === c ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
            }`}
          >
            {CATEGORY_ICONS[c]} {c}
          </button>
        ))}
      </div>

      {/* Vendor grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : vendors.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((v) => (
              <Link
                key={v._id}
                to={`/customer/vendors/${v._id}`}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-2xl">
                    {CATEGORY_ICONS[v.profile.category] || '✨'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                      {v.profile.businessName}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">{v.profile.category}</p>
                  </div>
                </div>
                {v.profile.description && (
                  <p className="mt-3 line-clamp-2 text-xs text-slate-600 leading-relaxed">{v.profile.description}</p>
                )}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{v.profile.city ? `📍 ${v.profile.city}` : '—'}</span>
                  <span className="flex items-center gap-1">
                    ⭐ {(v as IVendor & { rating?: number }).rating?.toFixed(1) ?? v.profile.rating?.toFixed(1) ?? '0.0'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-slate-600">Page {page} of {totalPages}</span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl">🔍</div>
          <p className="mt-4 text-sm font-medium text-slate-700">No vendors found</p>
          <p className="mt-1 text-xs text-slate-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
