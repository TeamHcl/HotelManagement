import { useState, useEffect, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import { Label } from '../../../components/ui/label'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { differenceInCalendarDays, format } from 'date-fns'
import { CalendarIcon, MapPin, Star, Users, Briefcase } from 'lucide-react'
import { customerApi } from '../api/customerApi'
import { bookingApi } from '../api/bookingApi'
import { promotionApi, type PromotionResponse } from '../api/promotionApi'
import { reviewApi, type ReviewResponse } from '../api/reviewApi'
import { getStoredAuthUser } from '../../auth/api/authSession'
import { toast } from 'sonner'

export function HotelDetails() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const user = getStoredAuthUser()

  // Slide out checkout state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [isBooking, setIsBooking] = useState(false)

  const [promotions, setPromotions] = useState<PromotionResponse[]>([])
  const [selectedPromotionId, setSelectedPromotionId] = useState('none')

  // Basic mock date handling for the checkout
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Availability state
  const [availability, setAvailability] = useState<any>(null)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
  const [availabilityError, setAvailabilityError] = useState('')

  useEffect(() => {
    async function check() {
      if (!selectedRoom || !date) return
      setIsCheckingAvailability(true)
      setAvailabilityError('')
      
      const checkInStr = format(date, 'yyyy-MM-dd')
      const nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + 1)
      const checkOutStr = format(nextDay, 'yyyy-MM-dd')

      try {
        const res = await customerApi.checkAvailability(selectedRoom.id, checkInStr, checkOutStr)
        setAvailability(res)
      } catch (err: any) {
        setAvailabilityError(err.message || 'Not available')
        setAvailability(null)
      } finally {
        setIsCheckingAvailability(false)
      }
    }
    check()
  }, [selectedRoom, date])

  const [hotel, setHotel] = useState<any | null>(null)
  const [rooms, setRooms] = useState<any[]>([])
  const [isAvailabilityView, setIsAvailabilityView] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const checkInParam = searchParams.get('checkIn') || ''
  const checkOutParam = searchParams.get('checkOut') || ''
  const hasSearchDates = Boolean(checkInParam && checkOutParam)

  const [reviews, setReviews] = useState<ReviewResponse[]>([])
  const [reviewForm, setReviewForm] = useState({ rating: '5', comment: '' })
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  const baseTotal = availability?.totalPrice || selectedRoom?.price || 0
  const selectedPromotion =
    selectedPromotionId !== 'none'
      ? promotions.find((promo) => promo.id === Number(selectedPromotionId))
      : undefined

  const discountAmount = selectedPromotion
    ? (() => {
        if (baseTotal < selectedPromotion.minBookingAmount) {
          return 0
        }
        const rawDiscount =
          selectedPromotion.type === 'PERCENTAGE'
            ? (baseTotal * selectedPromotion.value) / 100
            : selectedPromotion.value
        return Math.min(rawDiscount, selectedPromotion.maxDiscount)
      })()
    : 0

  const taxableAmount = Math.max(baseTotal - discountAmount, 0)
  const taxes = Math.round(taxableAmount * 0.15)
  const totalWithTaxes = taxableAmount + taxes

  useEffect(() => {
    async function loadHotel() {
      if (!id || isNaN(Number(id))) return
      setIsLoading(true)
      setLoadError('')
      try {
        const h = await customerApi.getHotelById(id)
        setHotel({
          id: h.id,
          name: h.name,
          location: h.location,
          description: h.description || '',
          rating: h.averageRating,
          image:
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        })
        if (hasSearchDates) {
          setIsAvailabilityView(true)
          const r = await customerApi.searchRoomTypes(h.id, checkInParam, checkOutParam)
          if (r.length > 0) {
            const nights = Math.max(
              differenceInCalendarDays(new Date(checkOutParam), new Date(checkInParam)),
              1,
            )
            setRooms(
              r.map((rt) => ({
                id: rt.roomTypeId.toString(),
                name: rt.roomTypeName,
                price: rt.totalPrice,
                priceLabel: nights > 1 ? `Total (${nights} nights)` : 'Total',
                capacity: `${rt.capacity} Guests`,
                image:
                  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              })),
            )
          } else {
            setRooms([])
          }
        } else {
          setIsAvailabilityView(false)
          const types = await customerApi.listRoomTypesByHotel(h.id)
          setRooms(
            types.map((rt) => ({
              id: rt.id.toString(),
              name: rt.name,
              price: rt.basePrice,
              priceLabel: 'Per Night',
              capacity: `${rt.capacity} Guests`,
              image:
                'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            })),
          )
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load hotel.'
        setLoadError(message)
        setHotel(null)
        setRooms([])
      } finally {
        setIsLoading(false)
      }
    }
    loadHotel()
  }, [id, checkInParam, checkOutParam, hasSearchDates])

  useEffect(() => {
    if (!id || isNaN(Number(id))) return
    reviewApi
      .listByHotel(Number(id))
      .then(setReviews)
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load reviews.'
        toast.error(message)
      })
  }, [id])

  useEffect(() => {
    if (!isCheckoutOpen) return
    promotionApi
      .listActive()
      .then(setPromotions)
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load promotions.'
        toast.error(message)
      })
  }, [isCheckoutOpen])

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-12 text-cyan-100/70">
        <div className="container max-w-4xl mx-auto">Loading hotel details...</div>
      </div>
    )
  }

  if (loadError || !hotel) {
    return (
      <div className="min-h-screen px-4 py-12 text-cyan-100/70">
        <div className="container max-w-4xl mx-auto">{loadError || 'Hotel not found.'}</div>
      </div>
    )
  }

  const handleBookInitiation = (room: any) => {
    setSelectedRoom(room)
    setIsCheckoutOpen(true)
  }

  const handleConfirmBooking = async () => {
    if (!selectedRoom || !date) return
    if (!user) {
      navigate('/login')
      return
    }

    const checkInStr = format(date, 'yyyy-MM-dd')
    const nextDay = new Date(date)
    nextDay.setDate(nextDay.getDate() + 1)
    const checkOutStr = format(nextDay, 'yyyy-MM-dd')

    try {
      setIsBooking(true)
      const totalPrice = baseTotal
      await bookingApi.createBooking({
        roomTypeId: Number(selectedRoom.id),
        checkIn: checkInStr,
        checkOut: checkOutStr,
        totalPrice,
        discountAmount: discountAmount || undefined,
        promotionId: selectedPromotionId !== 'none' ? Number(selectedPromotionId) : undefined,
      })
      toast.success('Booking confirmed.')
      setIsCheckoutOpen(false)
      navigate('/customer/bookings')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create booking.'
      toast.error(message)
    } finally {
      setIsBooking(false)
    }
  }

  const handleSubmitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!id || isNaN(Number(id))) return
    if (!user || user.role !== 'CUSTOMER') {
      toast.error('Only customers can submit reviews.')
      return
    }

    try {
      setIsSubmittingReview(true)
      const created = await reviewApi.create({
        hotelId: Number(id),
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment.trim() || undefined,
      })
      setReviews((prev) => [created, ...prev])
      setReviewForm({ rating: '5', comment: '' })
      toast.success('Review submitted.')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit review.'
      toast.error(message)
    } finally {
      setIsSubmittingReview(false)
    }
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
                  {hotel.rating ?? 'N/A'} / 5
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold leading-tight">Exceptional</span>
                <span className="text-cyan-100/60 text-sm">Live ratings</span>
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
                {rooms.length === 0 && (
                  <Card className="glass-card border-white/5">
                    <CardContent className="p-6 text-cyan-100/60">
                      {isAvailabilityView
                        ? 'No rooms available for selected dates.'
                        : 'No room types configured for this hotel.'}
                    </CardContent>
                  </Card>
                )}
                {rooms.map((room) => (
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
                            {room.priceLabel}
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

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h2 className="text-3xl font-bold border-b border-white/10 pb-4 mb-6 text-white">
                Reviews
              </h2>
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <Card className="glass-card border-white/5">
                    <CardContent className="p-6 text-cyan-100/60">
                      No reviews yet.
                    </CardContent>
                  </Card>
                ) : (
                  reviews.map((review) => (
                    <Card key={review.id} className="glass-card border-white/5">
                      <CardContent className="p-6">
                        <p className="text-sm text-cyan-100/60">Rating {review.rating}/5</p>
                        {review.comment && (
                          <p className="text-white mt-2">{review.comment}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}

                {user?.role === 'CUSTOMER' && (
                  <Card className="glass-card border-white/5">
                    <CardContent className="p-6">
                      <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-white">Rating</Label>
                          <Select
                            value={reviewForm.rating}
                            onValueChange={(value) => setReviewForm({ ...reviewForm, rating: value })}
                          >
                            <SelectTrigger className="bg-black/40 border-white/10 text-white">
                              <SelectValue placeholder="Rating" />
                            </SelectTrigger>
                            <SelectContent className="glass border-white/10 dark">
                              {[1, 2, 3, 4, 5].map((value) => (
                                <SelectItem key={value} value={value.toString()}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Comment</Label>
                          <Input
                            value={reviewForm.comment}
                            onChange={(event) =>
                              setReviewForm({ ...reviewForm, comment: event.target.value })
                            }
                            className="bg-black/40 border-white/10 text-white"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                          disabled={isSubmittingReview}
                        >
                          {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
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

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                  Promotion
                </label>
                <Select value={selectedPromotionId} onValueChange={setSelectedPromotionId}>
                  <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl text-white">
                    <SelectValue placeholder="Select promotion" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/10 dark">
                    <SelectItem value="none">No promotion</SelectItem>
                    {promotions.map((promo) => (
                      <SelectItem key={promo.id} value={promo.id.toString()}>
                        {promo.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 mt-8">
                {isCheckingAvailability ? (
                  <div className="text-cyan-400 text-sm font-bold text-center animate-pulse py-4">
                    Checking live availability...
                  </div>
                ) : availabilityError ? (
                  <div className="text-red-400 text-sm font-bold text-center py-4 bg-red-500/10 rounded px-2">
                    {availabilityError}
                  </div>
                ) : availability && !availability.available ? (
                  <div className="text-amber-400 text-sm font-bold text-center py-4 bg-amber-500/10 rounded px-2">
                    Room is not available for these dates.
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm font-medium text-cyan-100/70">
                      <span>Room Rate (1 Night)</span>
                      <span>${baseTotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm font-medium text-emerald-300">
                        <span>Promotion Discount</span>
                        <span>-${Math.round(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-medium text-cyan-100/70">
                      <span>Taxes & Fees</span>
                      <span>${taxes}</span>
                    </div>
                    <div className="h-px w-full bg-white/10 my-2" />
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold text-white">Total</span>
                      <span className="text-3xl font-black text-cyan-400">
                        ${totalWithTaxes}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <SheetFooter className="mt-8 shrink-0">
              <Button
                disabled={
                  isBooking ||
                  isCheckingAvailability ||
                  availabilityError !== '' ||
                  (availability && !availability.available)
                }
                onClick={handleConfirmBooking}
                className="w-full h-14 text-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isBooking ? 'Processing...' : 'Confirm & Pay'}
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
