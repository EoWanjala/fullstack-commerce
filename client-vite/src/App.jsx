import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from "./components"
import { Home, CategoryDetail, ProductDetail, CartPage } from "./pages"

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
      </Routes>
    </Router>
      
    </>
  )
}

export default App