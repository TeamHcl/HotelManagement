import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Menu, Search, LogIn, LogOut, Diamond, LayoutDashboard, User } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { getStoredAuthUser, getPostAuthRoute } from '../features/auth/api/authSession'

export function MainLayout() {
  const user = getStoredAuthUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('auth.token')
    localStorage.removeItem('auth.user')
    navigate('/')
  }
  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-hidden bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40">
        <div className="container flex h-20 max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo - Left */}
          <div className="flex-1">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <Diamond
                className="h-7 w-7 text-cyan-400 group-hover:scale-105 transition-transform"
                strokeWidth={1.5}
              />
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Luxe
                <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                  Stay
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav - Center */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <Link
              to="/"
              className="text-white hover:text-cyan-400 transition-colors drop-shadow-md"
            >
              Find Stays
            </Link>
            <Link to="/browse" className="hover:text-cyan-400 transition-colors">
              Browse Hotels
            </Link>
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              Destinations
            </Link>
            <Link to="/facilities" className="hover:text-cyan-400 transition-colors">
              Facilities
            </Link>
            <Link to="/promotions" className="hover:text-cyan-400 transition-colors">
              Promotions
            </Link>
          </nav>

          {/* Actions - Right */}
          <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-4 mr-4 border-r border-white/20 pr-6">
                     <User className="h-5 w-5 text-cyan-400" />
                     <span className="text-sm font-bold text-white uppercase tracking-wider">{user.role}</span>
                  </div>
                  {(user.role === 'ADMIN' || user.role === 'MANAGER' || user.role === 'CUSTOMER') && (
                    <Button variant="ghost" className="text-white hover:text-cyan-400 font-semibold" asChild>
                      <Link to={getPostAuthRoute(user.role)}>
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                  )}
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="rounded-full px-6 font-bold border-white/10 text-white hover:bg-white/10 transition-all"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-white font-semibold transition-colors"
                    asChild
                  >
                    <Link to="/login">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="rounded-full px-7 font-bold bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-shadow"
                  >
                    <Link to="/register">Create Account</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Nav */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card border-l-0 sm:max-w-xs">
                <nav className="flex flex-col gap-6 text-lg font-medium mt-16">
                  <Link
                    to="/"
                    className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors pb-4 border-b border-white/10"
                  >
                    <Search className="h-5 w-5" /> Find Stays
                  </Link>
                  <Link
                    to="/browse"
                    className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors pb-4 border-b border-white/10"
                  >
                    <Search className="h-5 w-5" /> Browse Hotels
                  </Link>
                  <Link
                    to="/promotions"
                    className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors pb-4 border-b border-white/10"
                  >
                    <Search className="h-5 w-5" /> Promotions
                  </Link>
                  <div className="mt-8 flex flex-col gap-4">
                    {user ? (
                      <>
                        <div className="flex items-center gap-3 pb-4 border-b border-white/10 text-cyan-400">
                          <User className="h-5 w-5" />
                          <span className="text-sm font-bold uppercase tracking-wider">{user.email}</span>
                        </div>
                        {(user.role === 'ADMIN' || user.role === 'MANAGER' || user.role === 'CUSTOMER') && (
                          <Button variant="outline" className="w-full justify-start h-12 glass border-white/20" asChild>
                            <Link to={getPostAuthRoute(user.role)}>
                               <LayoutDashboard className="w-5 h-5 mr-3 text-cyan-400" />
                               Dashboard
                            </Link>
                          </Button>
                        )}
                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full justify-start h-12 border-red-500/20 text-red-400 hover:bg-red-500/10"
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-12 glass border-white/20"
                          asChild
                        >
                          <Link to="/login">
                            <LogIn className="w-5 h-5 mr-3 text-muted-foreground" />
                            Sign In
                          </Link>
                        </Button>
                        <Button
                          className="w-full h-12 rounded-xl text-base shadow-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                          asChild
                        >
                          <Link to="/register">Create Account</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full bg-gradient-to-b from-background via-background to-black">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 bg-black/40 py-12 backdrop-blur-md z-10 relative mt-auto">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Diamond className="h-6 w-6 text-cyan-400/80" strokeWidth={1.5} />
            <span className="text-lg font-bold tracking-tight text-white/50">
              Luxe<span className="text-cyan-400/70">Stay</span>
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground/60 text-center md:text-left">
            Developed with Spring Boot & Modern React Aesthetics. &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* Background ambient lighting fixed to viewport */}
      <div className="pointer-events-none fixed inset-0 -z-10 flex justify-center overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-20%] h-[700px] w-[700px] rounded-full bg-indigo-500/10 blur-[150px]" />
      </div>
    </div>
  )
}
