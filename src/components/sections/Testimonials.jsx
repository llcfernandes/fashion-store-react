import React from 'react'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { RiStarFill } from 'react-icons/ri'

const testimonials = [
  {
    name: 'Beatriz M.',
    role: 'Advogada',
    text: 'A Lumen transformou minha forma de me vestir. A consultoria pessoal me ajudou a entender o meu estilo de verdade. Só compro aqui.',
  },
  {
    name: 'Camila T.',
    role: 'Empresária',
    text: 'Qualidade impecável em cada peça. Cheguei uma vez por recomendação e nunca mais parei de voltar. As roupas simplesmente duram.',
  },
  {
    name: 'Marina F.',
    role: 'Professora',
    text: 'Atendimento cuidadoso e atencioso. Sinto que sou tratada como pessoa, não como número. Recomendo com os olhos fechados.',
  },
  {
    name: 'Renata O.',
    role: 'Designer',
    text: 'A curadoria de peças é incomparável. Não é uma loja genérica — cada item foi escolhido com olho criativo. Me identifico com tudo.',
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="depoimentos" className="py-32 bg-sand-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="eyebrow">Depoimentos</p>
          <h2 className="font-display text-5xl text-sand-900 font-light">
            O que dizem nossas clientes
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-sand-50 p-8 hover:bg-white transition-colors duration-300 group"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, s) => (
                  <RiStarFill key={s} size={13} className="text-terra" />
                ))}
              </div>
              <p className="font-display text-xl text-sand-700 italic leading-relaxed mb-7">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-blush" />
                <div>
                  <div className="font-body text-sm font-medium text-sand-800">{t.name}</div>
                  <div className="font-body text-xs text-sand-400 uppercase tracking-wider">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
