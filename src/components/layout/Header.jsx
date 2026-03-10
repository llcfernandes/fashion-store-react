/*
 * Header — Atualizado com carrinho, contador e navegação via react-router
 * Feature implementada por Lucas Fernandes
 * Desenvolvedor Web
 */

import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { RiMenuLine, RiCloseLine, RiShoppingBagLine, RiHeartLine } from 'react-icons/ri'
import { useCart } from '../../context/CartContext'

const NAV_LINKS = [
  { label: 'Início',       href: '#inicio' },
  { label: 'Categorias',   href: '#categorias' },
  { label: 'Galeria',      href: '#galeria' },
  { label: 'Experiências', href: '/experiencias', isRoute: true },
  { label: 'Contato',      href: '#contato' },
]

function scrollTo(href) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { totalItems, toggleCart, wishlist } = useCart()
  const navigate  = useNavigate()
  const location  = useLocation()
  const isHome    = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  function handleNavClick(href, isRoute) {
    if (isRoute) {
      navigate(href)
      setOpen(false)
      return
    }
    if (!isHome) {
      navigate('/')
      setTimeout(() => scrollTo(href), 300)
    } else {
      scrollTo(href)
    }
    setOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-sand-50/95 backdrop-blur-sm border-b border-sand-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="cursor-pointer group">
          <span className="font-display text-2xl font-light text-sand-900 tracking-wide
                           group-hover:text-terra transition-colors duration-300">
            LUMEN <span className="italic">Studio</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNavClick(l.href, l.isRoute)}
              className="font-body text-xs font-medium tracking-widest text-sand-600
                         hover:text-sand-900 transition-colors duration-200 uppercase"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Wishlist */}
          <Link to="/favoritos"
            className="relative w-10 h-10 flex items-center justify-center
                       text-sand-600 hover:text-sand-900 transition-colors">
            <RiHeartLine size={20} />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-blush
                               text-sand-900 text-[8px] font-medium flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button
            id="cart-icon"
            onClick={toggleCart}
            className="relative w-10 h-10 flex items-center justify-center
                       text-sand-600 hover:text-sand-900 transition-colors"
            aria-label="Abrir carrinho"
          >
            <RiShoppingBagLine size={20} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-1.5 right-1.5 w-4 h-4 bg-sand-900 text-sand-50
                             text-[9px] font-medium flex items-center justify-center"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* CTA desktop */}
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex btn-dark py-2.5 px-6 text-xs ml-2"
          >
            Agendar Visita
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-sand-800"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-sand-50 border-t border-sand-200 px-6 py-6 flex flex-col gap-1"
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className="text-left font-body text-xs text-sand-600 hover:text-sand-900
                           py-3 border-b border-sand-100 uppercase tracking-widest transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark text-center justify-center mt-4"
            >
              Agendar Visita
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
