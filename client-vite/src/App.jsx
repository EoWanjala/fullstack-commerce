import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from "./components"
import { Home, CategoryDetail, ProductDetail, CartPage, Login, Register, Checkout, PaymentVerification } from "./pages"

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/category/:slug/" element={<CategoryDetail />} exact />
        <Route path="/product/:category_slug/:slug/" element={<ProductDetail />} exact />
        <Route path="/cart" element={<CartPage />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path ="/checkout" element= { <Checkout/>} exact />
        <Route path ="/verify-payment/:ref" element= { <PaymentVerification />} exact />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
