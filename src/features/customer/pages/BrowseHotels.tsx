import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { customerApi, type HotelPublicResponse } from '../api/customerApi'
import { toast } from 'sonner'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'

export function BrowseHotels() {
  const navigate = useNavigate()
  const [hotels, setHotels] = useState<HotelPublicResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    customerApi
      .listActiveHotels()
      .then(setHotels)
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load hotels.'
        toast.error(message)
        setHotels([])
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight">Browse Hotels</h1>
          <p className="text-cyan-100/60 max-w-3xl">
            Explore every approved property and jump straight into room availability when you are
            ready to book.
          </p>
        </div>

        {isLoading ? (
          <Card className="border-0 bg-white/5 backdrop-blur-xl">
            <CardContent className="p-10 text-center text-cyan-100/60">
              Loading hotels...
            </CardContent>
          </Card>
        ) : hotels.length === 0 ? (
          <Card className="border-0 bg-white/5 backdrop-blur-xl">
            <CardContent className="p-10 text-center text-cyan-100/60">
              No approved hotels are available yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
              >
                <Card className="glass-card border-white/10 overflow-hidden group hover:border-cyan-500/30 transition-all">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={FALLBACK_IMAGE}
                      alt={hotel.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_IMAGE
                      }}
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-white">{hotel.name}</h3>
                        <div className="flex items-center gap-2 text-cyan-100/70 text-sm mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{hotel.location}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                        <Star className="h-3 w-3 mr-1" />
                        {hotel.averageRating.toFixed(1)}
                      </Badge>
                    </div>

                    <p className="text-sm text-cyan-100/60 line-clamp-3 min-h-[60px]">
                      {hotel.description || 'Luxury accommodation curated for your next stay.'}
                    </p>

                    <Button
                      className="w-full rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400"
                      onClick={() => navigate(`/hotel/${hotel.id}`)}
                    >
                      View Hotel
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
