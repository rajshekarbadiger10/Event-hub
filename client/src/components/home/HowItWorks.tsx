import { motion } from 'framer-motion'

const steps = [
  { title: 'Search Vendors', description: 'Browse by event type, budget, and location.' },
  { title: 'Compare Packages', description: 'Review pricing, ratings, and services side by side.' },
  { title: 'Book Online', description: 'Reserve your preferred vendor in a few clicks.' },
  { title: 'Enjoy Your Event', description: 'Relax while trusted professionals handle the details.' },
]

export function HowItWorks() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">How It Works</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          A simple booking flow built for busy planners
        </h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-lg font-semibold text-blue-700">
              {index + 1}
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-950">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}