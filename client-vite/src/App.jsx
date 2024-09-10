import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar, NotFound, Footer } from "./components"
import { Home, CategoryDetail, ProductDetail, CartPage, Login, Register, Checkout, PaymentVerification, AllProduct, SearchResult, Contact } from "./pages"

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
        <Route path="/all-products" element={<AllProduct />} exact />
        <Route path ="/checkout" element= { <Checkout/>} exact />
        <Route path ="/contact" element= { <Contact/>} exact />
        <Route path ="/verify-payment/:ref" element= { <PaymentVerification />} exact />
        <Route path="/search/:query" element={<SearchResult />} exact />
        <Route path="*" element={<NotFound />} exact />
      </Routes>
      <Footer />
    </Router>
      
    </>
  )
}

export default App
