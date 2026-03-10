import React from 'react'
import { motion } from 'motion/react'

export default function Hero() {
  return (
    <section id="inicio" className="min-h-screen flex flex-col md:flex-row overflow-hidden">

      {/* Left content */}
      <div className="flex-1 flex flex-col justify-end pb-16 px-8 md:px-16 lg:px-24 pt-32 bg-sand-100 relative">
        {/* Background texture lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 border-r border-sand-200/60"
              style={{ left: `${(i + 1) * 16}%` }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <p className="eyebrow mb-6">Coleção 2025</p>

          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-sand-900 leading-[0.92] mb-8 font-light">
            Elegância<br />
            <span className="italic text-terra">que fala</span><br />
            por você.
          </h1>

          <p className="font-body text-sand-500 text-sm leading-relaxed max-w-xs mb-10">
            Curadoria pessoal de peças exclusivas com atendimento VIP.
            Cada detalhe pensado para realçar sua autenticidade.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('categorias')
                if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
              }}
              className="btn-dark"
            >
              Ver Coleção
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('contato')
                if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
              }}
              className="btn-outline-dark"
            >
              Agendar Visita
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 flex gap-10 mt-16 pt-8 border-t border-sand-300"
        >
          {[
            { value: '5.000+', label: 'Clientes' },
            { value: '10+', label: 'Anos' },
            { value: '100%', label: 'Autêntico' },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display text-3xl text-sand-800">{s.value}</div>
              <div className="font-body text-xs text-sand-400 tracking-wider uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right image */}
      <motion.div
        className="flex-1 relative min-h-[60vh] md:min-h-screen"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
          alt="Moda feminina Lumen Studio"
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sand-900/20" />

        {/* Collection tag */}
        <div className="absolute bottom-8 left-8 bg-sand-50/90 backdrop-blur-sm px-6 py-4">
          <div className="font-display text-xl text-sand-800 italic">Primavera–Verão</div>
          <div className="font-body text-xs text-sand-400 tracking-widest uppercase">Coleção 2025</div>
        </div>
      </motion.div>
    </section>
  )
}
