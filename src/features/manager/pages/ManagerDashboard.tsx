import { useState, useEffect } from 'react'
import { Plus, Hotel, LayoutList, Users, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Input } from '../../../components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '../../../components/ui/sheet'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { Badge } from '../../../components/ui/badge'
import { motion } from 'framer-motion'
import { managerApi } from '../api/managerApi'
import type { Hotel as HotelData, RoomType } from '../api/managerApi'

export function ManagerDashboard() {
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false)
  const [hotels, setHotels] = useState<HotelData[]>([])
  const [rooms, setRooms] = useState<RoomType[]>([])
  const [newHotelForm, setNewHotelForm] = useState({ name: '', location: '', description: 'Luxury hotel powered by API' })

  // New room and inventory states
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false)
  const [newRoomForm, setNewRoomForm] = useState({ hotelId: '', name: '', capacity: '2', basePrice: '150' })
  
  const [isInventoryOpen, setIsInventoryOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null)
  const [inventoryForm, setInventoryForm] = useState({ startDate: '', endDate: '', totalRooms: '10' })

  useEffect(() => {
    managerApi.getMyHotels()
      .then(async (fetchedHotels) => {
        setHotels(fetchedHotels)
        if (fetchedHotels.length > 0) {
          setNewRoomForm((prev) => ({
            ...prev,
            hotelId: prev.hotelId || String(fetchedHotels[0].id),
          }))
        }
        const allRoomsPromises = fetchedHotels.map(h => managerApi.getHotelRoomTypes(h.id))
        const allRoomsArrays = await Promise.all(allRoomsPromises)
        setRooms(allRoomsArrays.flat())
      })
      .catch((err) => console.error('Failed to load manager dashboard data', err))
  }, [])

  const handleAddProperty = async () => {
    try {
      const created = await managerApi.createHotel(newHotelForm)
      setHotels(prev => [...prev, created])
      setIsAddPropertyOpen(false)
      setNewHotelForm({ name: '', location: '', description: 'Luxury hotel powered by API' })
    } catch (err) {
      console.error('Failed to create hotel', err)
    }
  }

  const handleAddRoom = async () => {
    try {
      const created = await managerApi.createRoomType({
        hotelId: Number(newRoomForm.hotelId),
        name: newRoomForm.name,
        capacity: Number(newRoomForm.capacity),
        basePrice: Number(newRoomForm.basePrice),
      })
      setRooms((prev) => [...prev, created])
      setIsAddRoomOpen(false)
      setNewRoomForm({ hotelId: '', name: '', capacity: '2', basePrice: '150' })
    } catch (err) {
      console.error('Failed to create room type', err)
    }
  }

  const handleManageInventory = async () => {
    if (!selectedRoom) return
    try {
      await managerApi.bulkUpdateInventory({
        roomTypeId: selectedRoom.id,
        startDate: inventoryForm.startDate,
        endDate: inventoryForm.endDate,
        totalRooms: Number(inventoryForm.totalRooms),
      })
      setIsInventoryOpen(false)
      setInventoryForm({ startDate: '', endDate: '', totalRooms: '10' })
    } catch (err) {
      console.error('Failed to bulk update inventory', err)
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Ambient Background Lighting */}
      <div className="fixed top-0 left-0 w-full h-[600px] bg-cyan-900/15 blur-[150px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="container max-w-7xl mx-auto px-4 py-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 relative z-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent mb-2">
              Property Portfolio
            </h1>
            <p className="text-cyan-100/60 font-medium">
              Manage your elite properties, VIP guests, and inventory.
            </p>
          </div>
          <Button
            onClick={() => setIsAddPropertyOpen(true)}
            className="rounded-full shadow-lg shadow-cyan-500/20 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Property
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 flex flex-col gap-2 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-2">
                <Hotel className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-4xl font-black text-white">{hotels.length}</h3>
              <p className="text-sm text-cyan-100/60 font-bold uppercase tracking-widest">
                Total Properties
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 flex flex-col gap-2 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-4xl font-black text-white">112</h3>
              <p className="text-sm text-cyan-100/60 font-bold uppercase tracking-widest">
                Active Guests
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 flex flex-col gap-2 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-4xl font-black text-white">84%</h3>
              <p className="text-sm text-cyan-100/60 font-bold uppercase tracking-widest">
                Occupancy Rate
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="hotels" className="w-full">
          <TabsList className="bg-black/40 backdrop-blur-md border border-white/10 mb-8 p-1.5 rounded-2xl h-auto w-full sm:w-auto inline-flex justify-start">
            <TabsTrigger
              value="hotels"
              className="rounded-xl px-6 py-3 font-semibold data-[state=active]:bg-cyan-500 data-[state=active]:text-black transition-all"
            >
              <Hotel className="w-4 h-4 mr-2" /> My Hotels
            </TabsTrigger>
            <TabsTrigger
              value="guests"
              className="rounded-xl px-6 py-3 font-semibold data-[state=active]:bg-cyan-500 data-[state=active]:text-black transition-all"
            >
              <Users className="w-4 h-4 mr-2" /> Guest List
            </TabsTrigger>
            <TabsTrigger
              value="rooms"
              className="rounded-xl px-6 py-3 font-semibold data-[state=active]:bg-cyan-500 data-[state=active]:text-black transition-all"
            >
              <LayoutList className="w-4 h-4 mr-2" /> Room Config
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hotels" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hotels.map((hotel) => (
                <Card
                  key={hotel.id}
                  className="border-0 bg-white/5 backdrop-blur-xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                      alt={hotel.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <Badge
                      variant="outline"
                      className={`absolute top-4 right-4 backdrop-blur-md border-0 px-3 py-1 font-bold ${
                        hotel.status === 'ACTIVE'
                          ? 'bg-emerald-500 text-black'
                          : 'bg-amber-500 text-black'
                      }`}
                    >
                      {hotel.status}
                    </Badge>
                    <div className="absolute bottom-4 left-6">
                      <h3 className="text-2xl font-bold text-white mb-1">{hotel.name}</h3>
                      <p className="text-sm font-medium text-cyan-300 flex items-center gap-1">
                        <Hotel className="w-3 h-3" /> {hotel.location}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6 flex items-center justify-between border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-cyan-100/50 uppercase tracking-widest mb-1">
                        Inventory
                      </span>
                      <span className="text-lg font-medium text-white">{rooms.filter(r => r.hotelId === hotel.id).length} Room Types</span>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10"></div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-cyan-100/50 uppercase tracking-widest mb-1">
                        Occupancy
                      </span>
                      <span className="text-lg font-bold text-cyan-400">--- Guests</span>
                    </div>
                  </CardContent>
                  <CardContent className="pt-0 pb-6 flex flex-wrap gap-2">
                    <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/10">
                      <Link to={`/manager/hotels/${hotel.id}/edit`}>Edit Hotel</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/10">
                      <Link to={`/manager/hotels/${hotel.id}/facilities`}>Facilities</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/10">
                      <Link to={`/manager/hotels/${hotel.id}/room-types`}>Room Types</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guests" className="outline-none">
            <Card className="border-0 bg-white/5 backdrop-blur-xl">
              <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="text-2xl text-white">Visiting Guests</CardTitle>
                <CardDescription className="text-cyan-100/60 text-sm mt-1">
                  Real-time view of arriving and active VIP guests.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-black/20">
                    <TableRow className="border-0 hover:bg-transparent">
                      <TableHead className="py-5 px-6 font-bold text-cyan-100/70">
                        Guest Name
                      </TableHead>
                      <TableHead className="py-5 font-bold text-cyan-100/70">Room</TableHead>
                      <TableHead className="py-5 font-bold text-cyan-100/70">Arrival</TableHead>
                      <TableHead className="py-5 pr-6 text-right font-bold text-cyan-100/70">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-b border-white/5">
                      <TableCell colSpan={4} className="py-6 text-center text-cyan-100/60">
                        No guest data available.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms" className="outline-none">
            <Card className="border-0 bg-white/5 backdrop-blur-xl">
              <CardHeader className="border-b border-white/5 pb-6 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">Room Inventory & Rates</CardTitle>
                  <CardDescription className="text-cyan-100/60 text-sm mt-1">
                    Manage daily pricing, capacity, and availability.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10 h-10 rounded-xl"
                  >
                    <Link to="/manager/inventory/update">Single Date</Link>
                  </Button>
                  <Button
                    onClick={() => setIsAddRoomOpen(true)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold h-10 px-4 rounded-xl flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Room
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-black/20">
                    <TableRow className="border-0 hover:bg-transparent">
                      <TableHead className="py-5 px-6 font-bold text-cyan-100/70">
                        Room Category
                      </TableHead>
                      <TableHead className="py-5 font-bold text-cyan-100/70">Property</TableHead>
                      <TableHead className="py-5 font-bold text-cyan-100/70">Base Rate</TableHead>
                      <TableHead className="py-5 pr-6 text-right font-bold text-cyan-100/70">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow
                        key={room.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <TableCell className="py-4 px-6 font-bold text-white text-base">
                          {room.name}
                        </TableCell>
                        <TableCell className="py-4 text-cyan-100/80">
                          {hotels.find((h) => h.id === room.hotelId)?.name || `Hotel #${room.hotelId}`}
                        </TableCell>
                        <TableCell className="py-4 font-black text-cyan-400 text-lg">
                          ${room.basePrice}
                          <span className="text-xs font-normal text-cyan-100/50"> /nt</span>
                        </TableCell>
                        <TableCell className="py-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setSelectedRoom(room)
                                setIsInventoryOpen(true)
                              }}
                              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1 font-bold tracking-widest uppercase text-xs transition-colors h-8"
                            >
                              Bulk Inventory
                            </Button>
                            <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/10 h-8 px-3">
                              <Link to={`/manager/room-types/${room.id}`}>Edit</Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Add Property Slide-out Panel */}
      <Sheet open={isAddPropertyOpen} onOpenChange={setIsAddPropertyOpen}>
        <SheetContent className="bg-background border-l-white/10 sm:max-w-md w-full glass-card overflow-y-auto">
          <SheetHeader className="mb-8">
            <SheetTitle className="text-2xl font-black text-white">Add New Property</SheetTitle>
            <SheetDescription className="text-cyan-100/60 font-medium">
              Enter the details of your new hotel to begin onboarding.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                Property Name
              </label>
              <Input
                value={newHotelForm.name}
                onChange={(e) => setNewHotelForm({ ...newHotelForm, name: e.target.value })}
                placeholder="e.g. The Grand Sapphire"
                className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                Location
              </label>
              <Input
                value={newHotelForm.location}
                onChange={(e) => setNewHotelForm({ ...newHotelForm, location: e.target.value })}
                placeholder="e.g. Maldives"
                className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                Total Rooms
              </label>
              <Input
                type="number"
                placeholder="45"
                className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus-visible:ring-cyan-500"
              />
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 mt-8">
              <p className="text-xs font-bold text-cyan-400 mb-1 tracking-widest uppercase">Note</p>
              <p className="text-sm font-medium text-cyan-100/80">
                Properties require approval by Global Admins before becoming ACTIVE.
              </p>
            </div>
          </div>

          <SheetFooter className="mt-8">
            <Button
              onClick={handleAddProperty}
              className="w-full text-base bg-cyan-500 hover:bg-cyan-400 text-black font-bold h-12 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              Submit Property
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Add Room Type Slide-out Panel */}
      <Sheet open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
        <SheetContent className="bg-background border-l-white/10 sm:max-w-md w-full glass-card overflow-y-auto">
          <SheetHeader className="mb-8">
            <SheetTitle className="text-2xl font-black text-white">Add Room Type</SheetTitle>
            <SheetDescription className="text-cyan-100/60 font-medium">
              Create a new room configuration mapped to an existing hotel.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                Property ID
              </label>
              <select
                value={newRoomForm.hotelId}
                onChange={(e) => setNewRoomForm({ ...newRoomForm, hotelId: e.target.value })}
                className="bg-white/5 border border-white/10 h-12 rounded-xl text-white focus-visible:ring-cyan-500 px-3 w-full"
              >
                {hotels.length === 0 ? (
                  <option value="" disabled>
                    No properties found
                  </option>
                ) : (
                  hotels.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                      {hotel.name} (#{hotel.id})
                    </option>
                  ))
                )}
              </select>
              <p className="text-xs text-cyan-100/50">
                Defaults to your first property. Update in the dropdown if needed.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                Room Name
              </label>
              <Input
                value={newRoomForm.name}
                onChange={(e) => setNewRoomForm({ ...newRoomForm, name: e.target.value })}
                placeholder="e.g. Ocean View Suite"
                className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                Capacity (Guests)
              </label>
              <Input
                type="number"
                value={newRoomForm.capacity}
                onChange={(e) => setNewRoomForm({ ...newRoomForm, capacity: e.target.value })}
                className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                Base Price / Night
              </label>
              <Input
                type="number"
                value={newRoomForm.basePrice}
                onChange={(e) => setNewRoomForm({ ...newRoomForm, basePrice: e.target.value })}
                className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus-visible:ring-cyan-500"
              />
            </div>
          </div>

          <SheetFooter className="mt-8">
            <Button
              onClick={handleAddRoom}
              className="w-full text-base bg-cyan-500 hover:bg-cyan-400 text-black font-bold h-12 rounded-xl"
              disabled={!newRoomForm.hotelId}
            >
              Add Room
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Manage Inventory Slide-out Panel */}
      <Sheet open={isInventoryOpen} onOpenChange={setIsInventoryOpen}>
        <SheetContent className="bg-background border-l-white/10 sm:max-w-md w-full glass-card overflow-y-auto">
          <SheetHeader className="mb-8">
            <SheetTitle className="text-2xl font-black text-white">Bulk Update Inventory</SheetTitle>
            <SheetDescription className="text-cyan-100/60 font-medium">
              Update available rooms for <strong className="text-cyan-400">{selectedRoom?.name}</strong>.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                Start Date
              </label>
              <Input
                type="date"
                value={inventoryForm.startDate}
                onChange={(e) => setInventoryForm({ ...inventoryForm, startDate: e.target.value })}
                className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                End Date (Exclusive)
              </label>
              <Input
                type="date"
                value={inventoryForm.endDate}
                onChange={(e) => setInventoryForm({ ...inventoryForm, endDate: e.target.value })}
                className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                Total Rooms Available
              </label>
              <Input
                type="number"
                value={inventoryForm.totalRooms}
                onChange={(e) => setInventoryForm({ ...inventoryForm, totalRooms: e.target.value })}
                className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus-visible:ring-cyan-500"
              />
            </div>
          </div>

          <SheetFooter className="mt-8">
            <Button
              onClick={handleManageInventory}
              className="w-full text-base bg-cyan-500 hover:bg-cyan-400 text-black font-bold h-12 rounded-xl"
            >
              Update Inventory
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
