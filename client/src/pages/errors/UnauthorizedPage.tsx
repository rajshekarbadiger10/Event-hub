import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function UnauthorizedPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-slate-900">403</h1>
      <p className="mt-2 text-lg text-slate-600">You do not have access to this page.</p>
      <Link to="/dashboard" className="mt-6">
        <Button>Go to dashboard</Button>
      </Link>
    </div>
  )
}
