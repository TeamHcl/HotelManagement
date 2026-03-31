import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '../../../components/ui/sheet'
import { Calendar } from '../../../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, MapPin, Star, Users, Briefcase, CheckCircle2 } from 'lucide-react'

interface Room {
  id: string
  name: string
  price: number
  capacity: string
  image: string
}

export function HotelDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Slide out checkout state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  // Basic mock date handling for the checkout
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Derived Mock Hotel (Real app would fetch by ID)
  const hotel = {
    id: id || 'h1',
    name: 'The Grand Ocean Resort',
    location: 'Maldives',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description:
      'Experience unparalleled luxury at The Grand Ocean Resort. Nestled on pristine white sands with crystal clearer waters stretching to the horizon, our award-winning property redefines the art of relaxation. Enjoy world-class dining, immersive spa treatments, and seamless service.',
    rating: 4.9,
    reviews: 1240,
    rooms: [
      {
        id: 'r1',
        name: 'Deluxe Ocean View',
        price: 450,
        capacity: '2 Guests',
        image:
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'r2',
        name: 'Presidential Water Villa',
        price: 1250,
        capacity: '4 Guests',
        image:
          'https://images.unsplash.com/photo-1588421500080-1a73cb7ad468?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
    ],
  }

  const handleBookInitiation = (room: Room) => {
    setSelectedRoom(room)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="relative min-h-screen pb-20">
      <div className="fixed top-0 left-0 w-full h-[600px] bg-cyan-900/10 blur-[150px] -z-10 pointer-events-none" />

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[60vh] w-full"
      >
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/10" />

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="flex-1">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-none mb-4 backdrop-blur-md px-4 py-1 tracking-widest uppercase">
                Verified Luxury
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">
                {hotel.name}
              </h1>
              <p className="text-xl text-cyan-50 font-medium flex items-center gap-2">
                <MapPin className="text-cyan-400" /> {hotel.location}
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4">
              <div className="flex flex-col items-center justify-center bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                <Star className="w-8 h-8 fill-amber-400 text-amber-400 mb-1" />
                <span className="text-2xl font-black text-white leading-none whitespace-nowrap">
                  {hotel.rating} / 5
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold leading-tight">Exceptional</span>
                <span className="text-cyan-100/60 text-sm">{hotel.reviews} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Body */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold border-b border-white/10 pb-4 mb-6 text-white flex items-center gap-3">
                <Briefcase className="text-cyan-400" /> About the Property
              </h2>
              <p className="text-lg text-cyan-50/70 leading-relaxed font-medium">
                {hotel.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {['Free Fast WiFi', 'Infinity Pools', 'Private Beach', '24/7 Room Service'].map(
                  (amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white/5 border border-white/5 p-4 rounded-xl"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-bold text-white tracking-wide">{amenity}</span>
                    </div>
                  ),
                )}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold border-b border-white/10 pb-4 mb-6 text-white">
                Select Your Room
              </h2>
              <div className="space-y-6">
                {hotel.rooms.map((room) => (
                  <Card
                    key={room.id}
                    className="glass-card border-white/5 overflow-hidden flex flex-col sm:flex-row group hover:border-cyan-500/30 transition-all"
                  >
                    <div className="sm:w-1/3 h-48 relative">
                      <img
                        src={room.image}
                        className="w-full h-full object-cover"
                        alt={room.name}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{room.name}</h3>
                          <p className="text-sm text-cyan-100/60 flex items-center gap-2">
                            <Users className="w-4 h-4" /> Up to {room.capacity}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-black text-white">${room.price}</span>
                          <p className="text-xs text-cyan-100/40 uppercase tracking-widest mt-1">
                            Per Night
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button
                          onClick={() => handleBookInitiation(room)}
                          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8"
                        >
                          Book this Room
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="lg:col-span-1">
            <Card className="glass-card border-white/10 sticky top-24 bg-black/40 shadow-2xl shadow-cyan-900/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-4">
                  Property Summary
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-100/50 uppercase tracking-widest font-bold">
                      Check-in
                    </span>
                    <span className="font-bold text-white">3:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-100/50 uppercase tracking-widest font-bold">
                      Check-out
                    </span>
                    <span className="font-bold text-white">11:00 AM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-100/50 uppercase tracking-widest font-bold">
                      Cancellation
                    </span>
                    <span className="font-bold text-emerald-400">Free before 48h</span>
                  </div>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
                  <p className="text-sm font-medium text-cyan-100/80 mb-2">Need help deciding?</p>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black"
                  >
                    Contact Property Concierge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modern Slide-out Checkout Panel */}
      <Sheet open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <SheetContent className="bg-background border-l-white/10 sm:max-w-md w-full glass-card p-0 flex flex-col overflow-y-auto">
          <div className="relative h-48 w-full shrink-0">
            {selectedRoom && (
              <img src={selectedRoom.image} className="w-full h-full object-cover" alt="Room" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <SheetHeader className="text-left mb-6">
              <SheetTitle className="text-3xl font-black text-white leading-none mb-2">
                Complete Booking
              </SheetTitle>
              <SheetDescription className="text-cyan-100/60 font-medium">
                {hotel.name} &bull; {selectedRoom?.name}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 flex-1">
              {/* Dynamic Mock Checkout Form */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                  Select Check-in Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white/5 border-white/10 h-14 rounded-xl"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-cyan-500" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 glass-card border-white/10" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                  Primary Guest Name
                </label>
                <Input
                  placeholder="John Doe"
                  className="bg-white/5 border-white/10 h-14 rounded-xl text-white focus-visible:ring-cyan-500"
                />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 mt-8">
                <div className="flex justify-between text-sm font-medium text-cyan-100/70">
                  <span>Room Rate (1 Night)</span>
                  <span>${selectedRoom?.price}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-cyan-100/70">
                  <span>Taxes & Fees</span>
                  <span>${selectedRoom ? Math.round(selectedRoom.price * 0.15) : 0}</span>
                </div>
                <div className="h-px w-full bg-white/10 my-2" />
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-3xl font-black text-cyan-400">
                    ${selectedRoom ? selectedRoom.price + Math.round(selectedRoom.price * 0.15) : 0}
                  </span>
                </div>
              </div>
            </div>

            <SheetFooter className="mt-8 shrink-0">
              <Button
                onClick={() => {
                  setIsCheckoutOpen(false)
                  navigate('/login') // Mocking an auth redirect or success redirect
                }}
                className="w-full h-14 text-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
              >
                Confirm & Pay
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
