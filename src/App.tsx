import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from './components/ui/sonner'
import { MainLayout } from './layouts/MainLayout'
import { HotelSearch } from './features/customer/pages/HotelSearch'
import { BrowseHotels } from './features/customer/pages/BrowseHotels'
import { SearchResults } from './features/customer/pages/SearchResults'
import { HotelDetails } from './features/customer/pages/HotelDetails'
import { Login } from './features/auth/pages/Login'
import { Register } from './features/auth/pages/Register'
import { ManagerDashboard } from './features/manager/pages/ManagerDashboard'
import { AdminDashboard } from './features/admin/pages/AdminDashboard'
import { CustomerDashboard } from './features/customer/pages/CustomerDashboard'
import { FacilitiesCatalog } from './features/customer/pages/FacilitiesCatalog'
import { Promotions } from './features/customer/pages/Promotions'
import { CustomerBookings } from './features/customer/pages/CustomerBookings'
import { Profile } from './features/user/pages/Profile'
import { Loyalty } from './features/user/pages/Loyalty'
import { HotelEditor } from './features/manager/pages/HotelEditor'
import { RoomTypeEditor } from './features/manager/pages/RoomTypeEditor'
import { InventoryUpdate } from './features/manager/pages/InventoryUpdate'
import { HotelFacilities } from './features/manager/pages/HotelFacilities'
import { RoomTypeList } from './features/manager/pages/RoomTypeList'
import { AdminPromotions } from './features/admin/pages/AdminPromotions'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HotelSearch />
                </motion.div>
              }
            />

            <Route
              path="/search"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SearchResults />
                </motion.div>
              }
            />

            <Route
              path="/browse"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <BrowseHotels />
                </motion.div>
              }
            />

            <Route
              path="/hotel/:id"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HotelDetails />
                </motion.div>
              }
            />

            <Route
              path="/facilities"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FacilitiesCatalog />
                </motion.div>
              }
            />

            <Route
              path="/promotions"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Promotions />
                </motion.div>
              }
            />

            <Route
              path="/login"
              element={
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Login />
                </motion.div>
              }
            />

            <Route
              path="/register"
              element={
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Register />
                </motion.div>
              }
            />

            <Route element={<ProtectedRoute allowedRoles={['MANAGER']} />}>
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
              <Route path="/manager/hotels/:id/edit" element={<HotelEditor />} />
              <Route path="/manager/hotels/:id/facilities" element={<HotelFacilities />} />
              <Route path="/manager/hotels/:hotelId/room-types" element={<RoomTypeList />} />
              <Route path="/manager/room-types/:id" element={<RoomTypeEditor />} />
              <Route path="/manager/inventory/update" element={<InventoryUpdate />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/promotions" element={<AdminPromotions />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['CUSTOMER']} />}>
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/customer/bookings" element={<CustomerBookings />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/account/profile" element={<Profile />} />
              <Route path="/account/loyalty" element={<Loyalty />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  )
}

export default App
