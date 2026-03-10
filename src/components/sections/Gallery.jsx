import React from 'react'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'

const items = [
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', label: 'Look do Dia', tall: true },
  { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', label: 'Casual Chic', tall: false },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80', label: 'Estilo Editorial', tall: false },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80', label: 'Verão Collection', tall: true },
  { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80', label: 'Basics Premium', tall: false },
  { src: 'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=600&q=80', label: 'Noite', tall: false },
]

export default function Gallery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="galeria" className="py-24 bg-sand-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="eyebrow">Nossa Galeria</p>
            <h2 className="font-display text-4xl md:text-5xl text-sand-900 font-light">
              Cada peça,<br />
              <span className="italic">uma história.</span>
            </h2>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('categorias')
              if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
            }}
            className="hidden md:block btn-outline-dark"
          >
            Ver Coleção
          </button>
        </motion.div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative overflow-hidden group cursor-pointer ${item.tall ? 'row-span-2' : ''}`}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105
                  ${item.tall ? 'h-full min-h-[480px]' : 'h-56 md:h-64'}`}
              />
              <div className="absolute inset-0 bg-sand-900/0 group-hover:bg-sand-900/30 transition-all duration-400 flex items-end">
                <span className="font-body text-xs text-sand-50 tracking-widest uppercase px-5 pb-5
                               translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
