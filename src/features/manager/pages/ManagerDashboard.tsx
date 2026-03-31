import { Plus, Hotel, LayoutList, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { motion } from 'framer-motion';

// Expanded Mock Data
const MOCK_HOTELS = [
  { id: '1', name: 'The Grand Sapphire', image: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8379?q=80&w=600', location: 'Maldives', status: 'ACTIVE', rooms: 45, guests: 112 },
  { id: '2', name: 'Metropolitan Oasis', image: 'https://images.unsplash.com/photo-1551882547-ff40c0d129df?q=80&w=600', location: 'Tokyo', status: 'PENDING', rooms: 0, guests: 0 },
];

const MOCK_ROOMS = [
  { id: '101', type: 'OceanView Suite', hotel: 'The Grand Sapphire', price: 550, capacity: 2, available: 5 },
  { id: '102', type: 'Deluxe King', hotel: 'The Grand Sapphire', price: 350, capacity: 2, available: 12 },
];

const RECENT_GUESTS = [
  { id: 'g1', name: 'Alice Waverly', room: 'Suite 101', checkIn: 'Today', status: 'Checked In' },
  { id: 'g2', name: 'Marcus Chen', room: 'Deluxe 204', checkIn: 'Tomorrow', status: 'Confirmed' },
];

export function ManagerDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      className="container max-w-7xl mx-auto px-4 py-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Property Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage your hotels, active guests, and inventory centrally.</p>
        </div>
        <Button className="rounded-xl shadow-lg shadow-primary/20 transition-transform active:scale-95">
          <Plus className="w-4 h-4 mr-2" /> Add New Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card border-white/5">
          <CardContent className="p-6 flex flex-col gap-2">
            <Hotel className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">2</h3>
            <p className="text-xs text-muted-foreground font-semibold uppercase">Total Properties</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/5">
          <CardContent className="p-6 flex flex-col gap-2">
            <Users className="w-6 h-6 text-indigo-400" />
            <h3 className="text-2xl font-bold">112</h3>
            <p className="text-xs text-muted-foreground font-semibold uppercase">Active Guests</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-white/5">
          <CardContent className="p-6 flex flex-col gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-bold">84%</h3>
            <p className="text-xs text-muted-foreground font-semibold uppercase">Occupancy Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="glass border-white/10 mb-6 p-1 h-auto w-full sm:w-auto overflow-x-auto flex sm:inline-flex justify-start">
          <TabsTrigger value="hotels" className="rounded-lg px-4 py-2 flex items-center gap-2">
            <Hotel className="w-4 h-4" /> My Hotels
          </TabsTrigger>
          <TabsTrigger value="guests" className="rounded-lg px-4 py-2 flex items-center gap-2">
            <Users className="w-4 h-4" /> Guest List
          </TabsTrigger>
          <TabsTrigger value="rooms" className="rounded-lg px-4 py-2 flex items-center gap-2">
            <LayoutList className="w-4 h-4" /> Room Config
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hotels" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_HOTELS.map((hotel) => (
              <Card key={hotel.id} className="glass-card border-white/5 overflow-hidden flex flex-col hover:border-white/20 transition-all">
                <div className="h-48 relative">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <Badge variant={hotel.status === 'ACTIVE' ? 'default' : 'outline'} className={`absolute top-4 right-4 backdrop-blur-md ${hotel.status === 'ACTIVE' ? 'bg-emerald-500/80 text-white' : 'bg-background/80 text-amber-500'}`}>
                    {hotel.status}
                  </Badge>
                </div>
                <CardContent className="p-6 flex-1">
                  <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{hotel.location}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{hotel.rooms} Rooms</span>
                    <span className="font-medium text-indigo-400">{hotel.guests} Guests</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guests" className="space-y-6">
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle>Visiting Guests</CardTitle>
              <CardDescription>Real-time view of arriving and active guests.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RECENT_GUESTS.map((guest) => (
                    <TableRow key={guest.id}>
                      <TableCell className="font-medium">{guest.name}</TableCell>
                      <TableCell>{guest.room}</TableCell>
                      <TableCell>{guest.checkIn}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-primary border-primary/20">{guest.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms">
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle>Room Inventory & Prices</CardTitle>
              <CardDescription>Manage daily pricing and availability for your selected property.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Base Price</TableHead>
                    <TableHead>Available</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_ROOMS.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.type}</TableCell>
                      <TableCell>{room.hotel}</TableCell>
                      <TableCell className="font-bold">${room.price}</TableCell>
                      <TableCell>{room.available}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </motion.div>
  );
}
