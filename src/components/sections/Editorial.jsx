import React from 'react'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'

export default function Editorial() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="relative min-h-[60vh] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
        alt="Editorial Lumen Studio"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-sand-900/55" />

      <div className="relative z-10 flex items-center justify-center min-h-[60vh] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <p className="font-body text-xs text-blush tracking-widest uppercase mb-6">
            Filosofia Lumen
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-sand-50 leading-tight font-light mb-8">
            "Moda não é o que você veste.<br />
            <span className="italic">É como você se sente."</span>
          </h2>
          <div className="w-12 h-px bg-blush mx-auto mb-8" />
          <p className="font-body text-sand-300 text-sm leading-relaxed mb-10">
            Na Lumen, acreditamos que cada mulher merece se sentir poderosa, 
            elegante e completamente ela mesma — todos os dias.
          </p>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sand-50 text-sand-900
                       font-body text-xs tracking-widest uppercase transition-all duration-300
                       hover:bg-blush"
          >
            Agende uma Consultoria
          </a>
        </motion.div>
      </div>
    </section>
  )
}
