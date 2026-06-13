import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 10000, suffix: '+', label: 'Events Managed' },
  { value: 500, suffix: '+', label: 'Verified Vendors' },
  { value: 50, suffix: '+', label: 'Cities' },
  { value: 48, suffix: '★', label: 'Average Rating' },
]

function AnimatedStat({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.2,
      onUpdate(latest) {
        setDisplayValue(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
      {displayValue / 10 === 4.8 && suffix === '★' ? '4.8' : displayValue}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-blue-900 to-slate-950 p-8 text-white shadow-xl sm:p-12"
      >
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <AnimatedStat value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-white/75">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}