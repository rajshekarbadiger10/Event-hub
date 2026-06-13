import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export interface VendorCardProps {
  id: string
  image: string
  name: string
  rating: number
  location: string
  price: string
  verified?: boolean
}

export function VendorCard({ id, image, name, rating, location, price, verified = true }: VendorCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        {verified && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-700 shadow">
            Verified
          </span>
        )}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">{name}</h3>
            <p className="text-sm text-slate-500">{location}</p>
          </div>
          <div className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
            {rating.toFixed(1)}★
          </div>
        </div>
        <p className="text-sm text-slate-600">Starting at {price}</p>
        <Link
          to={`/vendors/${id}`}
          className="flex h-10 w-full items-center justify-center rounded-lg bg-blue-600 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  )
}