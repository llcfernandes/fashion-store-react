/*
 * App — Roteamento principal + CartProvider
 * Atualizado por Lucas Fernandes — Desenvolvedor Web
 */

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header      from './components/layout/Header'
import Footer      from './components/layout/Footer'
import CartDrawer  from './components/cart/CartDrawer'

import HomePage        from './pages/HomePage'
import CategoryPage    from './pages/CategoryPage'
import WishlistPage    from './pages/WishlistPage'
import ExperienciasPage from './pages/ExperienciasPage'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <CartDrawer />

        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/favoritos"     element={<WishlistPage />} />
          <Route path="/experiencias"  element={<ExperienciasPage />} />
          <Route path="/:slug"         element={<CategoryPage />} />
        </Routes>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}
