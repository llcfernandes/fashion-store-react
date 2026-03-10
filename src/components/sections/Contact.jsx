import React from 'react'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { RiWhatsappLine, RiInstagramLine, RiMapPinLine, RiTimeLine } from 'react-icons/ri'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="contato" className="py-32 bg-sand-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow">Visite-nos</p>
            <h2 className="font-display text-5xl text-sand-900 font-light mb-4">
              Venha nos<br />
              <span className="italic text-terra">conhecer.</span>
            </h2>
            <div className="w-8 h-px bg-blush mb-8" />
            <p className="font-body text-sand-500 leading-relaxed mb-10">
              Nossa loja está de portas abertas para você. Venha explorar a coleção, 
              conversar com a nossa consultora e encontrar as peças que são suas.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: RiWhatsappLine, label: 'WhatsApp', value: '(00) 00000-0000', link: 'https://wa.me/5500000000000' },
                { icon: RiInstagramLine, label: 'Instagram', value: '@lumenstudio.moda', link: '#' },
                { icon: RiMapPinLine, label: 'Endereço', value: 'Rua da Moda, 200 – Jardins\nSão Paulo – SP' },
                { icon: RiTimeLine, label: 'Horário', value: 'Seg–Sex: 10h às 19h\nSáb: 10h às 17h' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-sand-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={18} className="text-terra" />
                    </div>
                    <div>
                      <div className="font-body text-xs text-sand-400 uppercase tracking-wider mb-1">{item.label}</div>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer"
                           className="font-body text-sand-700 hover:text-terra transition-colors text-sm">
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-body text-sand-700 text-sm whitespace-pre-line">{item.value}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <a
              href="https://wa.me/5500000000000?text=Olá!%20Gostaria%20de%20agendar%20uma%20visita%20à%20Lumen%20Studio."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark inline-flex items-center gap-2"
            >
              <RiWhatsappLine size={18} />
              Agendar pelo WhatsApp
            </a>
          </motion.div>

          {/* Right – newsletter + image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative mb-10">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=80"
                alt="Interior Lumen Studio"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sand-900/50 to-transparent h-24" />
            </div>

            <div className="bg-sand-50 p-8">
              <h3 className="font-display text-2xl text-sand-900 mb-2">Newsletter Exclusiva</h3>
              <p className="font-body text-sand-400 text-sm mb-6">
                Receba lançamentos, looks e ofertas especiais antes de todo mundo.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 bg-sand-100 border border-sand-200 px-4 py-3 font-body text-sand-700 text-sm
                           placeholder-sand-400 focus:outline-none focus:border-terra transition-colors"
                />
                <button className="btn-dark px-6 py-3">
                  Entrar
                </button>
              </div>
              <p className="font-body text-xs text-sand-300 mt-3">
                Sem spam. Cancele quando quiser.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
