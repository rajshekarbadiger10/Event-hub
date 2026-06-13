import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Aarav Mehta',
    rating: 5,
    review:
      'EventHub made our wedding planning simple. We compared vendors, read reviews, and booked everything in one place.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Priya Sharma',
    rating: 5,
    review:
      'We used EventHub for a corporate annual meet and the experience was smooth from search to booking.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Karan Singh',
    rating: 4,
    review:
      'The vendor profiles were detailed and trustworthy. It saved us hours of back-and-forth for our engagement party.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  },
]

export function Testimonials() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Testimonials</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Loved by people planning real events
        </h2>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.article
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-slate-950">{testimonial.name}</h3>
                <p className="text-sm text-amber-600">{'★'.repeat(testimonial.rating)}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">{testimonial.review}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}