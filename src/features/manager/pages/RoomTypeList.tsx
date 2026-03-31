import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import { toast } from 'sonner'
import { managerApi, type RoomType } from '../api/managerApi'

export function RoomTypeList() {
  const { hotelId } = useParams()
  const [rooms, setRooms] = useState<RoomType[]>([])

  useEffect(() => {
    if (!hotelId || isNaN(Number(hotelId))) return

    managerApi
      .getHotelRoomTypes(Number(hotelId))
      .then(setRooms)
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load room types.'
        toast.error(message)
      })
  }, [hotelId])

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container max-w-4xl mx-auto">
        <Card className="border-0 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Room Types</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-black/20">
                <TableRow className="border-0 hover:bg-transparent">
                  <TableHead className="py-5 px-6 font-bold text-cyan-100/70">Name</TableHead>
                  <TableHead className="py-5 font-bold text-cyan-100/70">Capacity</TableHead>
                  <TableHead className="py-5 font-bold text-cyan-100/70">Base Price</TableHead>
                  <TableHead className="py-5 pr-6 text-right font-bold text-cyan-100/70">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.length === 0 ? (
                  <TableRow className="border-0">
                    <TableCell colSpan={4} className="h-24 text-center text-cyan-100/60">
                      No room types found.
                    </TableCell>
                  </TableRow>
                ) : (
                  rooms.map((room) => (
                    <TableRow
                      key={room.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <TableCell className="py-4 px-6 text-white font-medium">
                        {room.name}
                      </TableCell>
                      <TableCell className="py-4 text-cyan-100/70">{room.capacity}</TableCell>
                      <TableCell className="py-4 text-cyan-100/70">${room.basePrice}</TableCell>
                      <TableCell className="py-4 pr-6 text-right">
                        <Button
                          asChild
                          variant="outline"
                          className="border-white/10 text-white hover:bg-white/10"
                        >
                          <Link to={`/manager/room-types/${room.id}`}>Edit</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
