import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function BecomeVendorCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        className="rounded-[2rem] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-8 text-white shadow-xl sm:p-12"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Grow Your Event Business with EventHub
          </h2>
          <p className="mt-4 text-white/90">
            Reach more customers, showcase your services, and manage bookings from one premium platform.
          </p>
          <div className="mt-8">
            <Link
              to="/register?role=vendor"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}