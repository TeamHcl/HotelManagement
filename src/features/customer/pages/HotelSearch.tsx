import { useState } from 'react'
import { Search, MapPin, Calendar as CalendarIcon, Users, ArrowRight, Zap } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { Calendar } from '../../../components/ui/calendar'
import { HotelCard } from '../components/HotelCard'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

// Reliable image sources
const MOCK_HOTELS = [
  {
    id: '1',
    name: 'The Grand Sapphire',
    location: 'Maldives, South Atoll',
    price: 350,
    rating: 4.9,
    reviews: 128,
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    amenities: ['Ocean View', 'Private Pool', 'Spa'],
  },
  {
    id: '2',
    name: 'Alpine Haven Resort',
    location: 'Swiss Alps, Switzerland',
    price: 280,
    rating: 4.7,
    reviews: 89,
    image:
      'https://images.unsplash.com/photo-1501117716987-c8c394bb29df?auto=format&fit=crop&q=80&w=800',
    amenities: ['Ski Access', 'Fireplace', 'Sauna'],
  },
  {
    id: '3',
    name: 'Metropolitan Oasis',
    location: 'Tokyo City Center, Japan',
    price: 210,
    rating: 4.8,
    reviews: 432,
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    amenities: ['City View', 'Gym', 'Restaurant'],
  },
]

export function HotelSearch() {
  const navigate = useNavigate()
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  return (
    <div className="flex flex-col gap-16 pb-24 relative">
      <div className="relative pt-40 pb-32 flex items-center justify-center min-h-[75vh] overflow-hidden rounded-b-[40px] shadow-2xl mx-2 md:mx-4 mt-2">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0 bg-background/90" style={{ backgroundColor: 'black' }}>
          <img
            src="https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=2000&q=80"
            alt="Hero Luxury Hotel"
            className="w-full h-full object-cover opacity-50 select-none mix-blend-screen"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-background/10" />
        </div>

        <div className="container relative z-10 px-4 md:px-0">
          <div className="max-w-4xl space-y-8 mx-auto text-center">
            <Badge
              variant="outline"
              className="border-primary/50 text-cyan-300 bg-primary/20 backdrop-blur-md px-5 py-2 rounded-full uppercase tracking-widest font-bold shadow-2xl hover:bg-primary/30 transition-colors cursor-pointer"
            >
              Elevate Your Escape
            </Badge>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl leading-tight">
              Discover the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 hover:from-purple-500 hover:to-cyan-400 transition-all duration-700">
                Extraordinary
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto font-medium drop-shadow-xl mt-6">
              Seamlessly browse, select, and book premium stays across the globe with our secure
              centralized portal.
            </p>

            {/* Premium Glassmorphic Search Bar */}
            <Card className="glass-card border-white/20 p-2 md:p-3 mt-14 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-3xl mx-auto max-w-5xl bg-black/40">
              <CardContent className="p-0 flex flex-col md:flex-row gap-3 md:items-center">
                <div className="flex-1 flex items-center gap-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl px-5 py-4 min-h-[70px] transition-all group cursor-text">
                  <MapPin className="text-primary w-6 h-6 group-hover:text-cyan-300 transition-colors" />
                  <div className="flex flex-col items-start justify-center flex-1">
                    <span className="text-[11px] uppercase font-extrabold text-muted-foreground tracking-widest mb-1.5 focus-within:text-white transition-colors">
                      Destination
                    </span>
                    <Input
                      placeholder="Where are you going?"
                      className="border-0 bg-transparent p-0 h-auto text-lg text-white font-semibold focus-visible:ring-0 focus-visible:outline-none shadow-none placeholder:text-muted-foreground/50 transition-all"
                    />
                  </div>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex-2 flex items-center gap-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl px-5 py-4 min-h-[70px] transition-all group cursor-pointer w-full md:w-[280px]">
                      <CalendarIcon className="text-primary w-6 h-6 group-hover:text-cyan-300 transition-colors shrink-0" />
                      <div className="flex flex-col items-start justify-center flex-1 w-full truncate">
                        <span className="text-[11px] uppercase font-extrabold text-muted-foreground tracking-widest mb-1.5 transition-colors group-hover:text-white">
                          Dates
                        </span>
                        <div
                          className={`text-lg font-semibold w-full truncate transition-colors ${dateRange ? 'text-white' : 'text-white/60 group-hover:text-white'}`}
                        >
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, 'MMM dd')} -{' '}
                                {format(dateRange.to, 'MMM dd')}
                              </>
                            ) : (
                              format(dateRange.from, 'MMM dd, yyyy')
                            )
                          ) : (
                            <span>Check In & Out</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-3 border-white/20 glass rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] bg-black/80 backdrop-blur-2xl"
                    align="center"
                  >
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>

                <div className="w-full md:w-[200px] flex items-center gap-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl px-5 py-4 min-h-[70px] transition-all group cursor-pointer">
                  <Users className="text-primary w-6 h-6 group-hover:text-cyan-300 transition-colors" />
                  <div className="flex flex-col items-start justify-center flex-1 w-full text-left">
                    <span className="text-[11px] uppercase font-extrabold text-muted-foreground tracking-widest mb-1.5 transition-colors group-hover:text-white">
                      Travelers
                    </span>
                    <Select defaultValue="2">
                      <SelectTrigger className="border-0 bg-transparent p-0 h-auto text-lg text-white/80 group-hover:text-white font-semibold focus:ring-0 shadow-none transition-colors justify-start gap-2">
                        <SelectValue placeholder="Guests" />
                      </SelectTrigger>
                      <SelectContent className="glass border-white/10 dark">
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3">3 People</SelectItem>
                        <SelectItem value="4">4+ People</SelectItem>
                        <SelectItem value="group">Large Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/search')}
                  className="h-[70px] w-full md:w-[160px] rounded-2xl font-black bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90 text-white shadow-[0_0_30px_rgba(var(--primary),0.4)] text-lg transition-transform active:scale-95 group shrink-0"
                >
                  <Search className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                  Explore
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-6">
          <div className="flex-1">
            <Badge
              variant="outline"
              className="mb-4 text-cyan-400 border-cyan-400/30 bg-cyan-400/10 uppercase tracking-widest text-[11px] font-bold px-4 py-1.5 rounded-full"
            >
              Curated For You
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
              Trending Stays
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl leading-relaxed">
              Explore our hand-picked selection of top-rated destinations offering exclusive
              amenities and unparalled comfort.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="hidden sm:flex items-center gap-2 group hover:bg-white/10 border-white/20 glass text-foreground h-12 px-6 rounded-xl font-bold shadow-lg shrink-0"
          >
            <Link to="/">
              <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              View All Deals
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-primary" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_HOTELS.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        <Button
          asChild
          variant="outline"
          className="w-full sm:hidden mt-10 h-14 rounded-xl border-white/20 glass font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
        >
          <Link to="/">
            <Zap className="w-5 h-5 text-amber-400" />
            View All Deals
          </Link>
        </Button>
      </div>
    </div>
  )
}
