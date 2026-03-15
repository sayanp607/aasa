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
// Removed legacy Dashboard import
// Removed legacy Dashboard import
// Removed redundant AdminPanel import
import MyOrders from './pages/MyOrders';
import CartPage from './pages/CartPage';
import ContactUs from './pages/ContactUs';
import ProtectedRoute from './components/ProtectedRoute';
import Delivery from './pages/Delivery';
import Adventure from './pages/Adventure';
import HomeAdv from './pages/adventures/Home';
import Admin from './pages/adventures/Admin';
import TripDetail from './pages/adventures/TripDetails';
import ConfirmationPage from './pages/adventures/ConfirmatioPage';
import CheckoutPage from './pages/adventures/CheckoutPage';
import TripCartPage from './pages/adventures/CartPage';
import MytripOrders from './pages/adventures/MyOrders';
import AdmintripOrders from './pages/adventures/AdminOrders';
import WaterfallRappelling from './pages/activities/WaterfallRappelling';
import BillingPage from './pages/adventures/BillingPage';
import UsertripProfile from './pages/adventures/Profile';
import Malenadu from './pages/activities/Malenadu';
import Netravati from './pages/activities/Netravati';
import Bandaje from './pages/activities/Bandaje';
import WildWaterfallRappelling from './pages/activities/WildWaterfall';
import Gokarna from './pages/activities/Gokarna';
import Valleys from './pages/activities/Valleys';
import Trek from './pages/activities/Trek';
import ActivityPage from './pages/adventures/Activity';
import BlogPage from './pages/adventures/Blog';
import Blog1 from './pages/adventures/Blogs/Blog1';
import Blog4 from './pages/adventures/Blogs/Blog4';
import Blog3 from './pages/adventures/Blogs/Blog3';
import Blog2 from './pages/adventures/Blogs/Blog2';
import Blog5 from './pages/adventures/Blogs/Blog5';
import Blog6 from './pages/adventures/Blogs/Blog6';
import Blog7 from './pages/adventures/Blogs/Blog7';
import Blog8 from './pages/adventures/Blogs/BLog8';
import Blog9 from './pages/adventures/Blogs/blog9';
import Blog10 from './pages/adventures/Blogs/Blog10';
import AboutPage from './pages/adventures/About';
import Gallery from './pages/adventures/Gallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        <Route path="/adventurehome" element={
  <ProtectedRoute allowedRoles={['user','admin']}>
    <HomeAdv/>
  </ProtectedRoute>
} />
        {/* <Route path="/adventurehome" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <Admin/>
  </ProtectedRoute>
} /> */}

<Route path="/driver/dashboard" element={
  <ProtectedRoute allowedRoles={['admin', 'driver']}>
    <DriverDashboard />
  </ProtectedRoute>
} />
<Route path="/admin" element={
  <ProtectedRoute allowedRoles={['admin', 'driver']}>
    <MyOrders/>
  </ProtectedRoute>
} />
<Route path="/admin/orders" element={
  <ProtectedRoute allowedRoles={['admin', 'driver']}>
    <AdmintripOrders/>
  </ProtectedRoute>
} />

        {/* <Route path="/book" element={<BookRide />} /> */}
        {/* <Route path="/driver/dashboard" element={<DriverDashboard />} /> */}
        <Route path="/pickup" element={<Home />} />
        <Route path="/adventures" element={<Adventure/>} />
        <Route path="/trip/:id" element={<TripDetail/>} />
        <Route path="/activity" element={<ActivityPage/>} />
        <Route path="/blog" element={<BlogPage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/gallery" element={<Gallery/>} />
          <Route path="/activity/waterfall-rappelling-expeditions" element={<WaterfallRappelling />} />
          <Route path="/activity/wild-waterfall-rappelling-expeditions" element={<WildWaterfallRappelling />} />
          <Route path="/activity/monsoons-in-malendu" element={<Malenadu />} />
          <Route path="/activity/Netravati-Trek" element={<Netravati/>} />
          <Route path="/activity/gokarna-beach-trek" element={<Gokarna/>} />
          <Route path="/activity/Bandaje-Falls-Trek" element={<Bandaje/>} />
          <Route path="/activity/valleys" element={<Valleys/>} />
          <Route path="/activity/trek" element={<Trek/>} />
        <Route path="/tripcart" element={<TripCartPage/>} />
        <Route path="/confirmation/:orderId" element={<ConfirmationPage/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/delivery" element={<Delivery />} />
      <Route path="/delivery-register" element={<Register />} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/billing" element={<BillingPage />} />
      <Route path="/tripprofile" element={<UsertripProfile />} />
      <Route path="/mytriporders" element={<MytripOrders />} />

      <Route path="/blog1" element={<Blog1/>} />
      <Route path="/blog2" element={<Blog2/>} />
      <Route path="/blog3" element={<Blog3/>} />
      <Route path="/blog4" element={<Blog4/>} />
      <Route path="/blog5" element={<Blog5/>} />
      <Route path="/blog6" element={<Blog6/>} />
      <Route path="/blog7" element={<Blog7/>} />
      <Route path="/blog8" element={<Blog8/>} />
      <Route path="/blog9" element={<Blog9/>} />
      <Route path="/blog10" element={<Blog10/>} />
    

    </Routes>
    </>
  ) 
}

export default App;
