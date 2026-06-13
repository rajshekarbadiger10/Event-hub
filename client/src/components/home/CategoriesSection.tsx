import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { buildVendorCategoryHref, categoryFilters } from './categoryNavigation'

export function CategoriesSection() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Categories</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Find the right service for any celebration
        </h2>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryFilters.map((category, index) => (
          <motion.article
            key={category.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
          >
            <Link to={buildVendorCategoryHref(category.slug)} className="block focus:outline-none">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <p className="text-sm text-white/80">{category.vendors}</p>
                  <h3 className="mt-1 text-2xl font-semibold">{category.label}</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/85">{category.description}</p>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}