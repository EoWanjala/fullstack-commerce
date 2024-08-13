import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from "./components"
import { Home } from "./pages"

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
