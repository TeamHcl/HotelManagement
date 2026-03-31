import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Compass, Search, Star } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Link } from 'react-router-dom'
import { getStoredAuthUser } from '../../auth/api/authSession'
import { bookingApi, type BookingResponse } from '../api/bookingApi'
import { toast } from 'sonner'

export function CustomerDashboard() {
  const user = getStoredAuthUser()
  const [bookings, setBookings] = useState<BookingResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    bookingApi
      .listMyBookings()
      .then(setBookings)
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load bookings.'
        toast.error(message)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="relative min-h-screen pb-12">
      {/* Ambient Background Lighting */}
      <div className="fixed top-0 left-0 w-full h-[600px] bg-cyan-900/10 blur-[150px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="container max-w-7xl mx-auto px-4 py-12"
      >
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent mb-2">
              Welcome back, Traveller
            </h1>
            <p className="text-cyan-100/60 font-medium flex items-center gap-2">
              <User className="w-4 h-4" /> {user?.email || 'Customer'} &mdash; Ready for your next adventure?
            </p>
          </div>
          <Button
            asChild
            className="rounded-full shadow-lg shadow-cyan-500/20 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 transition-all active:scale-95"
          >
            <Link to="/">
              <Search className="w-4 h-4 mr-2" /> Book a Stay
            </Link>
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column - My Bookings */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-cyan-400" />
              My Reservations
            </h2>

            {isLoading ? (
              <Card className="border border-white/5 bg-white/5 backdrop-blur-xl p-8 text-center rounded-2xl">
                <p className="text-cyan-100/60">Loading bookings...</p>
              </Card>
            ) : bookings.length > 0 ? (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <Card
                    key={booking.id}
                    className="border-0 bg-white/5 backdrop-blur-xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
                  >
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <p className="text-sm text-cyan-100/60">Reservation</p>
                          <h3 className="text-xl font-bold text-white">{booking.reservationNumber}</h3>
                        </div>
                        <div className="text-cyan-100/70">
                          {booking.checkIn} → {booking.checkOut}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-cyan-100/60">Status: {booking.status}</span>
                        <span className="text-lg font-bold text-cyan-400">
                          ${booking.finalPrice}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  asChild
                  variant="outline"
                  className="glass border-white/20 text-white hover:bg-white/10"
                >
                  <Link to="/customer/bookings">Manage Bookings</Link>
                </Button>
              </div>
            ) : (
              <Card className="border border-white/5 hover:border-cyan-500/30 transition-colors bg-white/5 backdrop-blur-xl p-12 text-center rounded-2xl flex flex-col items-center justify-center">
                <Compass className="w-12 h-12 text-cyan-400 mb-4 opacity-80" />
                <h3 className="text-xl font-bold text-white mb-2">No Active Reservations</h3>
                <p className="text-cyan-100/60 max-w-md mx-auto mb-6 leading-relaxed">
                  You haven't booked any stays yet. Explore our portfolio of luxurious properties and find your perfect getaway.
                </p>
                <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/10" asChild>
                   <Link to="/">Browse Hotels</Link>
                </Button>
              </Card>
            )}
          </div>

          {/* Right Column - Profile / Loyalty */}
          <div className="space-y-8">
             <h2 className="text-2xl font-bold text-white opacity-0 select-none hidden lg:block">Profile Info</h2>
             <Card className="border-0 bg-white/5 backdrop-blur-xl group overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <CardContent className="p-8 relative z-10 flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">Membership Details</h3>
                  <p className="text-cyan-100/60 text-sm mb-6">Manage your account and preferences.</p>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                       <div className="flex flex-col">
                         <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Status</span>
                         <span className="text-sm text-white font-medium flex items-center gap-1">
                           <Star className="w-3 h-3 text-amber-400" fill="currentColor" /> Luxe Elite Member
                         </span>
                       </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                       <div className="flex flex-col">
                         <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Email</span>
                         <span className="text-sm text-white font-medium">{user?.email || 'customer@luxestay.com'}</span>
                       </div>
                    </div>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-6 glass border-white/20 text-white hover:bg-white/10 rounded-xl h-12"
                  >
                    <Link to="/account/profile">Edit Profile</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-3 glass border-white/20 text-white hover:bg-white/10 rounded-xl h-12"
                  >
                    <Link to="/account/loyalty">View Loyalty</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-3 glass border-white/20 text-white hover:bg-white/10 rounded-xl h-12"
                  >
                    <Link to="/promotions">Promotions</Link>
                  </Button>
               </CardContent>
             </Card>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
