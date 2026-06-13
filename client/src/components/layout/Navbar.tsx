import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { env } from '@/config/env'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/auth/useAuth'
import { useAuthStore } from '@/store/slices/authStore'

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 17a2 2 0 0 0 4 0" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  )
}

function UserCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 9.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 17l1.5 1.5a2 2 0 0 0 2.8 0L19 14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 12H4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l-4 4 4 4" />
    </svg>
  )
}

type NavItem = {
  label: string
  to: string
}

const guestNavItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Vendors', to: '/vendors' },
  { label: 'About', to: '/#about' },
]

const authenticatedNavItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Vendors', to: '/vendors' },
  { label: 'Dashboard', to: '/dashboard' },
]

export function Navbar() {
  const { isAuthenticated, user } = useAuthStore()
  const { logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileToggleRef = useRef<HTMLButtonElement>(null)
  const profileToggleRef = useRef<HTMLButtonElement>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      const clickedMobileToggle = mobileToggleRef.current?.contains(target) ?? false
      const clickedProfileToggle = profileToggleRef.current?.contains(target) ?? false

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        !clickedMobileToggle
      ) {
        setMobileMenuOpen(false)
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(target) &&
        !clickedProfileToggle
      ) {
        setProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const navItems = isAuthenticated ? authenticatedNavItems : guestNavItems

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-white">
          {env.appName}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 transition hover:bg-white/10 hover:text-white"
                aria-label="Notifications"
                title="Notifications"
              >
                <BellIcon />
              </button>

              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  ref={profileToggleRef}
                  onClick={() => setProfileMenuOpen((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                  aria-expanded={profileMenuOpen}
                  aria-haspopup="menu"
                >
                  <UserCircleIcon />
                  <span className="max-w-24 truncate">{user?.name ?? 'Profile'}</span>
                  <ChevronDownIcon />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-2xl">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <UserCircleIcon />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false)
                        logout()
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                    >
                      <LogoutIcon />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </nav>

        <button
          type="button"
          ref={mobileToggleRef}
          className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-white transition hover:bg-white/10 lg:hidden"
          onClick={() => setMobileMenuOpen((current) => !current)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <MenuIcon />
        </button>
      </div>

      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="border-t border-white/10 bg-slate-950 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Notifications"
                >
                  <BellIcon />
                  Notifications
                </button>
                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen((current) => !current)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-white"
                  >
                    <span className="flex items-center gap-2">
                      <UserCircleIcon />
                      Profile
                    </span>
                    <ChevronDownIcon />
                  </button>
                  {profileMenuOpen && (
                    <div className="mt-1 flex flex-col gap-1 px-2 pb-2">
                      <Link
                        to="/profile"
                        className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setProfileMenuOpen(false)
                          logout()
                        }}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                      >
                        <LogoutIcon />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}