import { motion } from 'framer-motion'

const eventTypes = ['Wedding', 'Birthday', 'Corporate', 'Engagement', 'Photography', 'DJ Night']
const budgetOptions = ['Under $500', '$500 - $1,500', '$1,500 - $5,000', '$5,000+']

export function SearchSection() {
  return (
    <section id="search" className="relative -mt-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl sm:p-6"
      >
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1.1fr_0.9fr_auto]">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Event Type
            <select className="h-14 rounded-2xl border border-slate-200 bg-white/90 px-4 text-slate-900 outline-none transition focus:border-blue-500">
              {eventTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Location
            <input
              type="text"
              placeholder="City, venue, or area"
              className="h-14 rounded-2xl border border-slate-200 bg-white/90 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Budget
            <select className="h-14 rounded-2xl border border-slate-200 bg-white/90 px-4 text-slate-900 outline-none transition focus:border-blue-500">
              {budgetOptions.map((budget) => (
                <option key={budget}>{budget}</option>
              ))}
            </select>
          </label>
          <button className="mt-auto h-14 rounded-2xl bg-slate-950 px-8 text-sm font-semibold text-white transition hover:bg-slate-800">
            Search
          </button>
        </div>
      </motion.div>
    </section>
  )
}