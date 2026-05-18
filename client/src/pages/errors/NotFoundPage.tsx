import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-slate-300">404</h1>
      <p className="mt-2 text-lg text-slate-600">Page not found</p>
      <Link to="/" className="mt-6">
        <Button>Go home</Button>
      </Link>
    </div>
  )
}
