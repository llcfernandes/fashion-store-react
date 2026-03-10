/*
 * Categories — Seção de categorias com links para páginas dedicadas
 * Feature implementada por Lucas Fernandes
 * Desenvolvedor Web
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { RiArrowRightLine } from 'react-icons/ri'

const CATEGORIES = [
  {
    name: 'Vestidos',
    slug: 'vestidos',
    count: '82 peças',
    img: 'https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=600&q=80',
    desc: 'Do casual ao sofisticado. Para cada ocasião.',
  },
  {
    name: 'Blusas & Tops',
    slug: 'blusas-tops',
    count: '114 peças',
    img: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
    desc: 'Estampas exclusivas e básicos essenciais.',
  },
  {
    name: 'Calças & Saias',
    slug: 'calcas-saias',
    count: '67 peças',
    img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80',
    desc: 'Cortes perfeitos para valorizar cada silhueta.',
  },
  {
    name: 'Acessórios',
    slug: 'acessorios',
    count: '95 peças',
    img: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
    desc: 'O detalhe que transforma um look.',
  },
]

export default function Categories() {
  const [hovered, setHovered] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="categorias" className="py-32 bg-sand-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="eyebrow">Categorias</p>
          <h2 className="font-display text-5xl text-sand-900 font-light">
            Explore a coleção
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link to={`/${cat.slug}`} className="group block cursor-pointer">
                {/* Image */}
                <div className="relative overflow-hidden mb-5 h-80">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-sand-900/0 group-hover:bg-sand-900/15 transition-all duration-500" />

                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-end justify-center pb-5
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-sand-50/95 font-body text-[10px] tracking-widest
                                     uppercase text-sand-900 px-5 py-2.5">
                      Ver todos
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-sand-900 mb-1">{cat.name}</h3>
                    <p className="font-body text-xs text-sand-400 tracking-wider uppercase">{cat.count}</p>
                    <p className="font-body text-sand-500 text-sm mt-2 leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className={`w-9 h-9 border flex items-center justify-center flex-shrink-0 ml-3 mt-1
                                  transition-all duration-300 ${
                                    hovered === i
                                      ? 'bg-sand-900 border-sand-900 text-sand-50'
                                      : 'border-sand-300 text-sand-400'
                                  }`}>
                    <RiArrowRightLine size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Coming soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center mt-14 gap-4"
        >
          <div className="h-px bg-sand-300 flex-1 max-w-16" />
          <p className="font-body text-xs text-sand-400 tracking-[0.25em] uppercase">
            Em breve mais categorias
          </p>
          <div className="h-px bg-sand-300 flex-1 max-w-16" />
        </motion.div>
      </div>
    </section>
  )
}
