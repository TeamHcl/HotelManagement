import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from './components/ui/sonner'
import { MainLayout } from './layouts/MainLayout'
import { HotelSearch } from './features/customer/pages/HotelSearch'
import { SearchResults } from './features/customer/pages/SearchResults'
import { HotelDetails } from './features/customer/pages/HotelDetails'
import { Login } from './features/auth/pages/Login'
import { Register } from './features/auth/pages/Register'
import { ManagerDashboard } from './features/manager/pages/ManagerDashboard'
import { AdminDashboard } from './features/admin/pages/AdminDashboard'

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

            <Route path="/manager/dashboard" element={<ManagerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  )
}

export default App
