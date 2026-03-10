/*
 * Footer — Links corrigidos para funcionar em qualquer rota
 * Corrigido por Lucas Fernandes — Desenvolvedor Web
 *
 * FIX: Links de âncora agora usam navigate('/') + scroll
 *      para funcionar corretamente em páginas internas como /vestidos
 */

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiInstagramLine, RiFacebookLine, RiPinterestLine } from 'react-icons/ri'

export default function Footer() {
  const navigate = useNavigate()

  // Navega para a homepage e depois rola para a âncora
  function goTo(section) {
    navigate('/')
    setTimeout(() => {
      const el = document.getElementById(section)
      if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
    }, 300)
  }

  const NAV_ITEMS = [
    { label: 'Início',        action: () => goTo('inicio') },
    { label: 'Sobre',         action: () => goTo('sobre') },
    { label: 'Galeria',       action: () => goTo('galeria') },
    { label: 'Categorias',    action: () => goTo('categorias') },
    { label: 'Contato',       action: () => goTo('contato') },
    { label: 'Depoimentos',   action: () => navigate('/experiencias') },
    { label: 'Favoritos',     action: () => navigate('/favoritos') },
  ]

  return (
    <footer className="bg-sand-900 text-sand-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-display text-3xl text-sand-100 font-light mb-3">
              LUMEN <span className="italic">Studio</span>
            </div>
            <p className="font-body text-sand-500 text-sm leading-relaxed max-w-xs mb-6">
              Boutique de moda feminina com curadoria pessoal e atendimento VIP.
              Desde 2013 ajudando mulheres a expressarem sua identidade pela moda.
            </p>
            <div className="flex gap-3">
              {[RiInstagramLine, RiFacebookLine, RiPinterestLine].map((Icon, i) => (
                <a key={i} href="#"
                   className="w-9 h-9 border border-sand-700 flex items-center justify-center
                             text-sand-500 hover:border-blush hover:text-blush transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-body text-xs text-sand-500 uppercase tracking-widest mb-5">
              Navegação
            </h4>
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-left font-body text-sand-500 hover:text-sand-200
                             text-sm transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-body text-xs text-sand-500 uppercase tracking-widest mb-5">
              Contato
            </h4>
            <div className="flex flex-col gap-3 font-body text-sand-500 text-sm">
              <span>(00) 00000-0000</span>
              <span>@lumenstudio.moda</span>
              <span>Rua da Moda, 200 – Jardins</span>
              <span>São Paulo – SP</span>
              <span className="text-xs text-sand-600 mt-1">
                Seg–Sex: 10h–19h | Sáb: 10h–17h
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-sand-800 pt-8 flex flex-col sm:flex-row
                        justify-between items-center gap-4">
          <p className="font-body text-xs text-sand-600">
            © {new Date().getFullYear()} Lumen Studio. Todos os direitos reservados.
          </p>
          <p className="font-body text-xs text-sand-600">
            Desenvolvido por{' '}
            <strong className="text-sand-500 font-medium">Lucas Fernandes</strong>
            {' '}– Desenvolvedor Web
          </p>
        </div>
      </div>
    </footer>
  )
}
