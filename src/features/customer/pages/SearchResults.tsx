import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Users } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { customerApi, type SearchResultItem } from '../api/customerApi'
import { toast } from 'sonner'

export function SearchResults() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''

  useEffect(() => {
    const hotelId = Number(searchParams.get('hotelId'))
    const checkIn = searchParams.get('checkIn') || ''
    const checkOut = searchParams.get('checkOut') || ''
    const guests = Number(searchParams.get('guests') || '0') || undefined

    if (!hotelId || !checkIn || !checkOut) {
      setIsLoading(false)
      setResults([])
      return
    }

    setIsLoading(true)
    customerApi
      .searchRoomTypes(hotelId, checkIn, checkOut, guests)
      .then(setResults)
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Search failed.'
        toast.error(message)
        setResults([])
      })
      .finally(() => setIsLoading(false))
  }, [searchParams])

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
              Available Room Types
            </h1>
            <p className="text-muted-foreground mt-1">
              {isLoading
                ? 'Searching availability...'
                : `Found ${results.length} options matching your criteria.`}
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
          {results.map((room, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              key={room.roomTypeId}
            >
              <Card
                className="glass-card border-white/5 overflow-hidden flex flex-col md:flex-row hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all group cursor-pointer"
                onClick={() =>
                  navigate(
                    `/hotel/${room.hotelId}?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`,
                  )
                }
              >
                <div className="h-64 md:h-auto md:w-80 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt={room.roomTypeName}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 backdrop-blur-md mb-2 block w-max">
                      Room Type
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-cyan-400 transition-colors">
                        {room.roomTypeName}
                      </h3>
                      <p className="text-sm font-medium text-cyan-100/60 flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                        <Users className="w-4 h-4 text-cyan-500" /> Capacity {room.capacity}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs bg-white/5 border-white/10 text-cyan-50">
                          Hotel {room.hotelId}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-white/5 border-white/10 text-cyan-50">
                          Room Type {room.roomTypeId}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col items-end text-right">
                      <div className="flex flex-col items-end mt-auto">
                        <div className="text-3xl font-black text-white flex items-baseline gap-1">
                          ${room.totalPrice}{' '}
                          <span className="text-sm font-medium text-cyan-100/60 font-sans">
                            total
                          </span>
                        </div>
                        <span className="text-xs text-emerald-400 font-bold tracking-widest uppercase mt-1">
                          For selected dates
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(
                          `/hotel/${room.hotelId}?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`,
                        )
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
          {!isLoading && results.length === 0 && (
            <Card className="border-0 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-10 text-center text-cyan-100/60">
                No room types matched your search.
              </CardContent>
            </Card>
          )}
        </div>
      </motion.div>
    </div>
  )
}
