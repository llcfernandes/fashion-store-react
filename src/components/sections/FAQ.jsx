import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useInView } from 'react-intersection-observer'

const faqs = [
  {
    q: 'A loja tem provador?',
    a: 'Sim! Temos provadores privativos com boa iluminação e espelhos de corpo inteiro. Nossa consultora pode acompanhar e sugerir combinações.',
  },
  {
    q: 'Fazem troca e devolução?',
    a: 'Sim. Aceitamos troca em até 30 dias desde que a peça esteja em perfeito estado, com etiqueta, e acompanhada da nota fiscal.',
  },
  {
    q: 'Atendem por agendamento?',
    a: 'Atendemos tanto por livre acesso quanto por agendamento VIP. No agendamento, a consultora reserva um horário exclusivo para você, com maior atenção e experiência personalizada.',
  },
  {
    q: 'Têm vendas pelo WhatsApp ou online?',
    a: 'Vendemos pelo WhatsApp com envio para todo o Brasil. Enviamos fotos, vídeos e medidas detalhadas para facilitar sua escolha.',
  },
  {
    q: 'Quais formas de pagamento aceitam?',
    a: 'Aceitamos cartão de crédito (até 10x sem juros), débito, PIX e dinheiro. Para compras acima de R$800, também aceitamos boleto.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="faq" className="py-32 bg-sand-50" ref={ref}>
      <div className="max-w-3xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="eyebrow">Dúvidas</p>
          <h2 className="font-display text-5xl text-sand-900 font-light">
            Perguntas Frequentes
          </h2>
        </motion.div>

        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="border-b border-sand-200"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-6 text-left group"
            >
              <span className={`font-body text-base font-medium transition-colors duration-200
                ${open === i ? 'text-terra' : 'text-sand-800 group-hover:text-terra'}`}>
                {faq.q}
              </span>
              <span className={`font-display text-2xl flex-shrink-0 text-sand-300 transition-all duration-300
                ${open === i ? 'rotate-45 text-terra' : ''}`}>
                +
              </span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-sand-500 text-sm leading-relaxed pb-6">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
