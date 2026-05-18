import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Book event services with confidence
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          EventHub connects customers with trusted vendors for weddings, corporate
          events, parties, and more.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/register">
            <Button size="lg">Create account</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        <Card title="Customers" description="Discover and book top-rated event vendors.">
          <p className="text-sm text-slate-600">Browse listings, manage bookings, leave reviews.</p>
        </Card>
        <Card title="Vendors" description="Grow your business on one platform.">
          <p className="text-sm text-slate-600">Manage services, bookings, and your vendor dashboard.</p>
        </Card>
        <Card title="Admins" description="Oversee platform health and users.">
          <p className="text-sm text-slate-600">User management, approvals, and analytics (coming soon).</p>
        </Card>
      </div>
    </section>
  )
}
