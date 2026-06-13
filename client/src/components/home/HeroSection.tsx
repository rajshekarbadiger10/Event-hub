import { Link } from 'react-router-dom'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import heroImage from '@/assets/hero2.jpeg'

type HeroCta = {
  label: string
  to: string
}

export interface HeroSectionProps {
  className?: string
  title?: string
  subtitle?: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const defaults = {
  title: 'Plan Your Perfect Event with Confidence',
  subtitle:
    'EventHub is the premium event services platform for discovering trusted vendors, coordinating details, and creating unforgettable weddings, celebrations, and corporate experiences.',
  primaryCta: {
    label: 'Explore Vendors',
    to: '/register',
  },
  secondaryCta: {
    label: 'Become a Vendor',
    to: '/register?role=vendor',
  },
}

export function HeroSection({
  className = '',
  title = defaults.title,
  subtitle = defaults.subtitle,
  primaryCta = defaults.primaryCta,
  secondaryCta = defaults.secondaryCta,
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion()

  const sectionMotion = reduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.35 },
        variants: containerVariants,
      }

  return (
    <section
      className={`relative isolate overflow-hidden bg-slate-950 text-white ${className}`}
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Elegant event celebration backdrop"
          className="h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/88 to-slate-900/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.32),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.22),_transparent_28%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-14 px-6 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:px-10 lg:py-28">
        <motion.div className="max-w-3xl" {...sectionMotion}>
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur"
          >
            Premium Event Planning Platform
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-7xl"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg"
          >
            {subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              to={primaryCta.to}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              {primaryCta.label}
            </Link>

            <Link
              to={secondaryCta.to}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              {secondaryCta.label}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div {...sectionMotion} className="relative">
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-[0_30px_120px_rgba(2,6,23,0.6)] backdrop-blur-xl"
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/50">
              <img
                src={heroImage}
                alt="Event styling inspiration"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-slate-950/75 p-5 backdrop-blur-md">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-sky-200">
                Trusted by planners and vendors
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                A polished workflow for premium weddings, milestone parties, and
                high-touch corporate events.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}