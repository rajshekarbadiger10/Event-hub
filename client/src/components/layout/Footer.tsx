import { Link } from 'react-router-dom'

const companyLinks = [
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
  { label: 'Careers', to: '/#careers' },
]

const serviceLinks = [
  { label: 'Wedding Planning', to: '/#categories' },
  { label: 'Birthday Events', to: '/#categories' },
  { label: 'Corporate Events', to: '/#categories' },
]

const supportLinks = [
  { label: 'Help Center', to: '/#support' },
  { label: 'Privacy Policy', to: '/#privacy' },
  { label: 'Terms', to: '/#terms' },
]

const socialLinks = ['Facebook', 'Instagram', 'LinkedIn']

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-lg font-semibold">EventHub</h3>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Premium event marketplace for weddings, celebrations, and corporate experiences.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Company</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            {companyLinks.map((link) => (
              <Link key={link.label} to={link.to} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Services</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            {serviceLinks.map((link) => (
              <Link key={link.label} to={link.to} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Support</h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            {supportLinks.map((link) => (
              <Link key={link.label} to={link.to} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex gap-4 text-sm text-slate-400">
            {socialLinks.map((label) => (
              <span key={label} className="transition hover:text-white">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} EventHub. All rights reserved.
      </div>
    </footer>
  )
}