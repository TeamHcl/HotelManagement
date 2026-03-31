import { motion } from 'framer-motion'
import { Card, CardContent } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { MapPin, Star, Wifi, Coffee, Dumbbell, Waves, Wind } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MOCK_RESULTS = [
  {
    id: 'h1',
    name: 'The Grand Ocean Resort',
    location: 'Maldives',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: 1240,
    price: 450,
    tags: ['Beachfront', 'Luxury', 'Spa'],
    amenities: [
      <Wifi key="W" className="w-4 h-4" />,
      <Waves key="Wa" className="w-4 h-4" />,
      <Wind key="Wi" className="w-4 h-4" />,
    ],
  },
  {
    id: 'h2',
    name: 'Urban Metropolis Hotel',
    location: 'Tokyo',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: 890,
    price: 320,
    tags: ['City Center', 'Infinity Pool', 'Executive'],
    amenities: [
      <Wifi key="W" className="w-4 h-4" />,
      <Coffee key="C" className="w-4 h-4" />,
      <Dumbbell key="D" className="w-4 h-4" />,
    ],
  },
  {
    id: 'h3',
    name: 'Serenity Mountain Lodge',
    location: 'Swiss Alps',
    image:
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    rating: 4.95,
    reviews: 432,
    price: 600,
    tags: ['Ski-in/Ski-out', 'Romantic', 'Fireplace'],
    amenities: [<Coffee key="C" className="w-4 h-4" />, <Wind key="Wi" className="w-4 h-4" />],
  },
]

export function SearchResults() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen">
      {/* Ambient Lighting */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/10 blur-[150px] -z-10 pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="container max-w-7xl mx-auto px-4 py-8 mt-10"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Available Properties
            </h1>
            <p className="text-muted-foreground mt-1">
              Found {MOCK_RESULTS.length} luxury stays matching your criteria.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="glass bg-white/5 border-white/10 hover:bg-white/10"
            >
              Dates
            </Button>
            <Button
              variant="outline"
              className="glass bg-white/5 border-white/10 hover:bg-white/10"
            >
              Price Filter
            </Button>
            <Button
              variant="outline"
              className="glass bg-white/5 border-white/10 hover:bg-white/10"
            >
              Sort By: Recommended
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {MOCK_RESULTS.map((hotel, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              key={hotel.id}
            >
              <Card
                className="glass-card border-white/5 overflow-hidden flex flex-col md:flex-row hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all group cursor-pointer"
                onClick={() => navigate(`/hotel/${hotel.id}`)}
              >
                <div className="h-64 md:h-auto md:w-80 relative overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 backdrop-blur-md mb-2 block w-max">
                      Guest Favorite
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-cyan-400 transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="text-sm font-medium text-cyan-100/60 flex items-center gap-1.5 mb-4 border-b border-white/5 pb-4">
                        <MapPin className="w-4 h-4 text-cyan-500" /> {hotel.location}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {hotel.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs bg-white/5 border-white/10 text-cyan-50"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 text-cyan-100/50">
                        {hotel.amenities.map((icon, i) => (
                          <div
                            key={i}
                            className="bg-black/40 p-1.5 rounded-md border border-white/5"
                          >
                            {icon}
                          </div>
                        ))}
                        <span className="text-xs font-semibold ml-2 tracking-widest uppercase">
                          + 5 more
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end text-right">
                      <div className="flex items-center gap-1.5 mb-1 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-white tracking-widest">{hotel.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground mb-4">
                        {hotel.reviews} reviews
                      </span>

                      <div className="flex flex-col items-end mt-auto">
                        <span className="text-sm text-cyan-100/60 font-medium line-through decoration-cyan-500/50">
                          ${hotel.price + 150}
                        </span>
                        <div className="text-3xl font-black text-white flex items-baseline gap-1">
                          ${hotel.price}{' '}
                          <span className="text-sm font-medium text-cyan-100/60 font-sans">
                            /night
                          </span>
                        </div>
                        <span className="text-xs text-emerald-400 font-bold tracking-widest uppercase mt-1">
                          Taxes Included
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/hotel/${hotel.id}`)
                      }}
                      className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
