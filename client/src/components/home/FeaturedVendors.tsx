import { motion } from 'framer-motion'
import { VendorCard } from '@/components/cards/VendorCard'
import { vendorCatalog } from '@/components/home/vendorCatalog'

export function FeaturedVendors() {
  const vendors = vendorCatalog.slice(0, 6)

  return (
    <section id="vendors" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Featured Vendors</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Trusted professionals for every event
          </h2>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {vendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
          >
            <VendorCard {...vendor} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}