import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Card from './Pages/Card';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Component/Footer/Footer';
import mens_banner from './Component/Assets/all_products/mens_banner.png'
import womens_banner from './Component/Assets/all_products/womens_banner.png'
import kids_banner from './Component/Assets/all_products/kids_banner.png'

import ScrollToTop from './Component/ScrollToTop/ScrollToTop';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import Profile from './Component/Profile/Profile';

function App() {
  return (
    <>
      <Router > 
        <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/womens' element={<ShopCategory banner={womens_banner} category="womens" />} />
        <Route path='/mens' element={<ShopCategory banner={mens_banner} category="mens" />} />
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kids" />} />
       
        <Route path='/product/:id' element={<Product />} />
        <Route path='/card' element={<Card />} />
      
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/Login' element={ <Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
         <Footer />
      </Router>
    </>
  );
}

export default App;
