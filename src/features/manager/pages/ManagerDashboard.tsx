import { useState } from 'react'
import { Plus, Hotel, LayoutList, Users, TrendingUp } from 'lucide-react'
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

// Expanded Mock Data
const MOCK_HOTELS = [
  {
    id: '1',
    name: 'The Grand Sapphire',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    location: 'Maldives',
    status: 'ACTIVE',
    rooms: 45,
    guests: 112,
  },
  {
    id: '2',
    name: 'Metropolitan Oasis',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    location: 'Tokyo',
    status: 'PENDING',
    rooms: 0,
    guests: 0,
  },
]

const MOCK_ROOMS = [
  {
    id: '101',
    type: 'OceanView Suite',
    hotel: 'The Grand Sapphire',
    price: 550,
    capacity: 2,
    available: 5,
  },
  {
    id: '102',
    type: 'Deluxe King',
    hotel: 'The Grand Sapphire',
    price: 350,
    capacity: 2,
    available: 12,
  },
]

const RECENT_GUESTS = [
  { id: 'g1', name: 'Alice Waverly', room: 'Suite 101', checkIn: 'Today', status: 'Checked In' },
  { id: 'g2', name: 'Marcus Chen', room: 'Deluxe 204', checkIn: 'Tomorrow', status: 'Confirmed' },
]

export function ManagerDashboard() {
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false)

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
              <h3 className="text-4xl font-black text-white">2</h3>
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
              {MOCK_HOTELS.map((hotel) => (
                <Card
                  key={hotel.id}
                  className="border-0 bg-white/5 backdrop-blur-xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src={hotel.image}
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
                      <span className="text-lg font-medium text-white">{hotel.rooms} Rooms</span>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10"></div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-cyan-100/50 uppercase tracking-widest mb-1">
                        Occupancy
                      </span>
                      <span className="text-lg font-bold text-cyan-400">{hotel.guests} Guests</span>
                    </div>
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
                    {RECENT_GUESTS.map((guest) => (
                      <TableRow
                        key={guest.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <TableCell className="py-4 px-6 font-medium text-white text-base">
                          {guest.name}
                        </TableCell>
                        <TableCell className="py-4 text-cyan-100/80">{guest.room}</TableCell>
                        <TableCell className="py-4 text-cyan-100/80">{guest.checkIn}</TableCell>
                        <TableCell className="py-4 pr-6 text-right">
                          <Badge
                            variant="outline"
                            className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-3 py-1"
                          >
                            {guest.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms" className="outline-none">
            <Card className="border-0 bg-white/5 backdrop-blur-xl">
              <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="text-2xl text-white">Room Inventory & Rates</CardTitle>
                <CardDescription className="text-cyan-100/60 text-sm mt-1">
                  Manage daily pricing, capacity, and availability.
                </CardDescription>
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
                        Availability
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_ROOMS.map((room) => (
                      <TableRow
                        key={room.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <TableCell className="py-4 px-6 font-bold text-white text-base">
                          {room.type}
                        </TableCell>
                        <TableCell className="py-4 text-cyan-100/80">{room.hotel}</TableCell>
                        <TableCell className="py-4 font-black text-cyan-400 text-lg">
                          ${room.price}
                          <span className="text-xs font-normal text-cyan-100/50"> /nt</span>
                        </TableCell>
                        <TableCell className="py-4 pr-6 text-right">
                          <span className="inline-flex items-center justify-center bg-white/10 text-white rounded-lg px-3 py-1 font-bold tracking-widest uppercase text-xs">
                            {room.available} left
                          </span>
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
                placeholder="e.g. The Grand Sapphire"
                className="bg-white/5 border-white/10 h-12 rounded-xl text-white focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-cyan-100/50">
                Location
              </label>
              <Input
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
              onClick={() => setIsAddPropertyOpen(false)}
              className="w-full text-base bg-cyan-500 hover:bg-cyan-400 text-black font-bold h-12 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              Submit Property
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
