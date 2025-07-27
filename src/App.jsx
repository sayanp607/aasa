import React from 'react';
import LandingPage from './pages/LandingPage';
import { Route,Routes } from 'react-router-dom';
import RegisterModal from './components/RegisterModal';
import UserCloth from './components/cloths/UserCloth';
import AdminCloth from './components/cloths/AdminCloth';
import AdminGift from './components/gifts/AdminGift';
import UserProfile from './pages/userprofile/Profile';
import AdminOrders from './pages/admin/Dashboard';
import UserGift from './components/gifts/UserGift';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import DriverRegister from './pages/DriverRegister';
import DriverLogin from './pages/DriverLogin';
import BookRide from './pages/BookRide';
import DriverDashboard from './pages/DriverDashboard';
import UserProfilePickup from './pages/UserProfile';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DeliveryUserProfile';
import AdminPanel from './pages/AdminProfile';
import MyOrders from './pages/MyOrders';
import CartPage from './pages/CartPage';
import ContactUs from './pages/ContactUs';
import ProtectedRoute from './components/ProtectedRoute';
import Delivery from './pages/Delivery';

function App() {
  return(
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/profile' element={<UserProfile/>} />
      <Route path='/admin-profile' element={<AdminOrders/>} />
      <Route path='/register' element={<RegisterModal/>} />
          <Route path="/user-cloths" element={<UserCloth />} />
          <Route path="/user-gifts" element={<UserGift />} />
        <Route path="/admin-cloths" element={<AdminCloth />} />
        <Route path="/admin-gifts" element={<AdminGift />} />
          <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/profile" element={<UserProfilePickup />} />
        <Route path="/driver/register" element={<DriverRegister />} />
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/book" element={
  <ProtectedRoute allowedRoles={['user']}>
    <BookRide/>
  </ProtectedRoute>
} />
        <Route path="/dashboard" element={
  <ProtectedRoute allowedRoles={['user']}>
    <Dashboard/>
  </ProtectedRoute>
} />

<Route path="/driver/dashboard" element={
  <ProtectedRoute allowedRoles={['admin', 'driver']}>
    <DriverDashboard />
  </ProtectedRoute>
} />
<Route path="/admin" element={
  <ProtectedRoute allowedRoles={['admin', 'driver']}>
    <AdminPanel/>
  </ProtectedRoute>
} />
        {/* <Route path="/book" element={<BookRide />} /> */}
        {/* <Route path="/driver/dashboard" element={<DriverDashboard />} /> */}
        <Route path="/pickup" element={<Home />} />
        <Route path="/delivery" element={<Delivery />} />
      <Route path="/delivery-register" element={<Register />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/admin" element={<AdminPanel />} /> */}
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  ) 
}

export default App;
