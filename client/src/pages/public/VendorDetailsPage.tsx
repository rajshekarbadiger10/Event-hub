import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { getVendorById } from '@/components/home/vendorCatalog'

function StarRating({ rating }: { rating: number }) {
  return <span className="text-amber-500">{rating.toFixed(1)}★</span>
}

export function VendorDetailsPage() {
  const { vendorId } = useParams()
  const vendor = getVendorById(vendorId)

  if (!vendor) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold text-slate-950">Vendor not found</h1>
        <p className="mt-3 text-slate-600">We could not find the vendor you were looking for.</p>
        <Link to="/vendors" className="mt-6">
          <Button>Back to vendors</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]"
      >
        <div className="space-y-10">
          <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={vendor.image} alt={vendor.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Featured Vendor</p>
                <h1 className="mt-2 text-3xl font-semibold sm:text-5xl">{vendor.name}</h1>
              </div>
            </div>

            <div className="space-y-4 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">Verified</span>
                <span className="font-medium text-slate-900"><StarRating rating={vendor.rating} /></span>
                <span>{vendor.location}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                  Starting at {vendor.price}
                </span>
              </div>
              <p className="max-w-3xl text-base leading-7 text-slate-600">{vendor.description}</p>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-slate-950">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {vendor.gallery.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={`${vendor.name} gallery`}
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm"
                />
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Services</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {vendor.services.map((service) => (
                  <li key={service} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Pricing Packages</h2>
              <div className="mt-4 space-y-4">
                {vendor.packages.map((pkg) => (
                  <div key={pkg.name} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-slate-950">{pkg.name}</h3>
                      <span className="font-semibold text-blue-600">{pkg.price}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{pkg.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-slate-950">Reviews</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {vendor.reviews.map((review) => (
                <div key={review.name} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-slate-950">{review.name}</h3>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{review.review}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">Book Now</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Plan this event with confidence</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Reserve your date, discuss package options, and get a tailored event plan from the vendor team.
            </p>
            <Button className="mt-6 w-full">Book Now</Button>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-950">Quick Facts</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p><span className="font-medium text-slate-900">Category:</span> {vendor.categoryLabel}</p>
              <p><span className="font-medium text-slate-900">Location:</span> {vendor.location}</p>
              <p><span className="font-medium text-slate-900">Rating:</span> {vendor.rating.toFixed(1)} / 5</p>
            </div>
          </div>
        </aside>
      </motion.div>
    </div>
  )
}