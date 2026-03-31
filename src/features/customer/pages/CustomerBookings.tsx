import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { bookingApi, type BookingResponse } from '../api/bookingApi'
import { toast } from 'sonner'

export function CustomerBookings() {
  const [bookings, setBookings] = useState<BookingResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [rebookTarget, setRebookTarget] = useState<BookingResponse | null>(null)
  const [rebookForm, setRebookForm] = useState({
    checkIn: '',
    checkOut: '',
    totalPrice: '',
    discountAmount: '',
    promotionId: '',
  })
  const [isRebooking, setIsRebooking] = useState(false)

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

  const handleCancel = async (bookingId: number) => {
    try {
      const updated = await bookingApi.cancelBooking(bookingId)
      setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
      toast.success('Booking cancelled.')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to cancel booking.'
      toast.error(message)
    }
  }

  const openRebook = (booking: BookingResponse) => {
    setRebookTarget(booking)
    setRebookForm({
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      totalPrice: booking.totalPrice.toString(),
      discountAmount: booking.discountAmount?.toString() || '',
      promotionId: booking.promotionId ? booking.promotionId.toString() : '',
    })
  }

  const handleRebook = async () => {
    if (!rebookTarget) return
    try {
      setIsRebooking(true)
      const updated = await bookingApi.rebook(rebookTarget.id, {
        checkIn: rebookForm.checkIn,
        checkOut: rebookForm.checkOut,
        totalPrice: rebookForm.totalPrice ? Number(rebookForm.totalPrice) : undefined,
        discountAmount: rebookForm.discountAmount ? Number(rebookForm.discountAmount) : undefined,
        promotionId: rebookForm.promotionId ? Number(rebookForm.promotionId) : undefined,
      })
      setBookings((prev) => [updated, ...prev])
      toast.success('Rebooked successfully.')
      setRebookTarget(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to rebook.'
      toast.error(message)
    } finally {
      setIsRebooking(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container max-w-6xl mx-auto">
        <Card className="border-0 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white">My Bookings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-black/20">
                <TableRow className="border-0 hover:bg-transparent">
                  <TableHead className="py-5 px-6 font-bold text-cyan-100/70">Reservation</TableHead>
                  <TableHead className="py-5 font-bold text-cyan-100/70">Dates</TableHead>
                  <TableHead className="py-5 font-bold text-cyan-100/70">Total</TableHead>
                  <TableHead className="py-5 font-bold text-cyan-100/70">Status</TableHead>
                  <TableHead className="py-5 pr-6 text-right font-bold text-cyan-100/70">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow className="border-0">
                    <TableCell colSpan={5} className="h-24 text-center text-cyan-100/60">
                      Loading bookings...
                    </TableCell>
                  </TableRow>
                ) : bookings.length === 0 ? (
                  <TableRow className="border-0">
                    <TableCell colSpan={5} className="h-24 text-center text-cyan-100/60">
                      No bookings found.
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((booking) => (
                    <TableRow
                      key={booking.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <TableCell className="py-4 px-6 text-white font-medium">
                        {booking.reservationNumber}
                      </TableCell>
                      <TableCell className="py-4 text-cyan-100/70">
                        {booking.checkIn} → {booking.checkOut}
                      </TableCell>
                      <TableCell className="py-4 text-cyan-100/70">
                        ${booking.finalPrice}
                      </TableCell>
                      <TableCell className="py-4 text-cyan-100/70">{booking.status}</TableCell>
                      <TableCell className="py-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            disabled={
                              booking.status === 'CANCELLED' || booking.status === 'COMPLETED'
                            }
                            onClick={() => handleCancel(booking.id)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="outline"
                            className="border-white/10 text-white hover:bg-white/10"
                            onClick={() => openRebook(booking)}
                          >
                            Rebook
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!rebookTarget} onOpenChange={() => setRebookTarget(null)}>
        <DialogContent className="glass-card border-white/10">
          <DialogHeader>
            <DialogTitle>Rebook Stay</DialogTitle>
            <DialogDescription>
              Pick new dates and optional pricing details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Check-in</Label>
              <Input
                type="date"
                value={rebookForm.checkIn}
                onChange={(event) => setRebookForm({ ...rebookForm, checkIn: event.target.value })}
                className="bg-black/40 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Check-out</Label>
              <Input
                type="date"
                value={rebookForm.checkOut}
                onChange={(event) => setRebookForm({ ...rebookForm, checkOut: event.target.value })}
                className="bg-black/40 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Total Price</Label>
              <Input
                type="number"
                value={rebookForm.totalPrice}
                onChange={(event) =>
                  setRebookForm({ ...rebookForm, totalPrice: event.target.value })
                }
                className="bg-black/40 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Discount Amount</Label>
              <Input
                type="number"
                value={rebookForm.discountAmount}
                onChange={(event) =>
                  setRebookForm({ ...rebookForm, discountAmount: event.target.value })
                }
                className="bg-black/40 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Promotion ID</Label>
              <Input
                type="number"
                value={rebookForm.promotionId}
                onChange={(event) =>
                  setRebookForm({ ...rebookForm, promotionId: event.target.value })
                }
                className="bg-black/40 border-white/10 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
              onClick={handleRebook}
              disabled={isRebooking}
            >
              {isRebooking ? 'Rebooking...' : 'Confirm Rebook'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
