/*
 * HomePage — Página inicial
 * Atualizado por Lucas Fernandes — Desenvolvedor Web
 *
 * CHANGE: FAQ e Testimonials movidos para /experiencias
 */

import React from 'react'
import Hero        from '../components/sections/Hero'
import About       from '../components/sections/About'
import Gallery     from '../components/sections/Gallery'
import Categories  from '../components/sections/Categories'
import Editorial   from '../components/sections/Editorial'
import Contact     from '../components/sections/Contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Gallery />
      <Categories />
      <Editorial />
      <Contact />
    </main>
  )
}
