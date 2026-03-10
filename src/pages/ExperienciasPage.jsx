/*
 * ExperienciasPage — Página de Depoimentos + FAQ com design sofisticado
 * Feature implementada por Lucas Fernandes — Desenvolvedor Web
 *
 * Design: editorial luxury — fundo escuro (sand-900), depoimentos com avatar,
 * stars, animações stagger ao scroll, FAQ accordion premium com animação suave.
 */

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { RiStarFill, RiArrowLeftLine, RiAddLine, RiSubtractLine } from 'react-icons/ri'

// ─── Dados ────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: 'Beatriz M.',
    role: 'Advogada',
    stars: 5,
    text: 'A Lumen transformou minha forma de me vestir. A consultoria pessoal me ajudou a entender o meu estilo de verdade. Só compro aqui.',
    initials: 'BM',
    color: 'bg-blush',
  },
  {
    name: 'Camila T.',
    role: 'Empresária',
    stars: 5,
    text: 'Qualidade impecável em cada peça. Cheguei uma vez por recomendação e nunca mais parei de voltar. As roupas simplesmente duram.',
    initials: 'CT',
    color: 'bg-terra/20',
  },
  {
    name: 'Marina F.',
    role: 'Professora',
    stars: 5,
    text: 'Atendimento cuidadoso e atencioso. Sinto que sou tratada como pessoa, não como número. Recomendo com os olhos fechados.',
    initials: 'MF',
    color: 'bg-sand-600',
  },
  {
    name: 'Renata O.',
    role: 'Designer',
    stars: 5,
    text: 'A curadoria de peças é incomparável. Não é uma loja genérica — cada item foi escolhido com olho criativo. Me identifico com tudo.',
    initials: 'RO',
    color: 'bg-blush/60',
  },
  {
    name: 'Juliana P.',
    role: 'Médica',
    stars: 5,
    text: 'Pedi pelo WhatsApp e foi incrível. Mandaram fotos, medidas, opções de combinação. Chegou tudo perfeito. Vou pedir de novo!',
    initials: 'JP',
    color: 'bg-terra/30',
  },
  {
    name: 'Fernanda L.',
    role: 'Arquiteta',
    stars: 5,
    text: 'Comprei um vestido para evento e recebi tantos elogios. A qualidade do tecido e o corte são de outro nível. Vale cada centavo.',
    initials: 'FL',
    color: 'bg-sand-500',
  },
]

const FAQS = [
  {
    q: 'A loja tem provador?',
    a: 'Sim! Temos provadores privativos com boa iluminação e espelhos de corpo inteiro. Nossa consultora pode acompanhar e sugerir combinações durante toda a experiência.',
  },
  {
    q: 'Fazem troca e devolução?',
    a: 'Sim. Aceitamos troca em até 30 dias desde que a peça esteja em perfeito estado, com etiqueta, e acompanhada da nota fiscal. Para compras online, o frete de retorno é por nossa conta.',
  },
  {
    q: 'Atendem por agendamento?',
    a: 'Atendemos tanto por livre acesso quanto por agendamento VIP. No agendamento, a consultora reserva um horário exclusivo para você, com maior atenção e experiência personalizada.',
  },
  {
    q: 'Têm vendas pelo WhatsApp ou online?',
    a: 'Vendemos pelo WhatsApp com envio para todo o Brasil. Enviamos fotos, vídeos e medidas detalhadas para facilitar sua escolha. A experiência é tão boa quanto vir pessoalmente.',
  },
  {
    q: 'Quais formas de pagamento aceitam?',
    a: 'Aceitamos cartão de crédito (até 10x sem juros), débito, PIX e dinheiro. Para compras acima de R$800, também aceitamos boleto bancário.',
  },
  {
    q: 'Como funciona o atendimento por tamanho especial?',
    a: 'Trabalhamos com uma ampla grade de tamanhos e podemos solicitar peças específicas do nosso fornecedor. Consulte nossa equipe pelo WhatsApp para verificar disponibilidade.',
  },
]

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ExperienciasPage() {
  const navigate = useNavigate()

  function handleBack() {
    navigate('/')
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
  }

  return (
    <main className="bg-sand-100 min-h-screen">
      {/* Hero da página */}
      <PageHero onBack={handleBack} />

      {/* Métricas */}
      <MetricsStrip />

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA final */}
      <CTASection />
    </main>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function PageHero({ onBack }) {
  return (
    <div className="relative bg-sand-900 pt-28 pb-20 px-6 overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-r border-sand-800/50"
            style={{ left: `${(i + 1) * 18}%` }}
          />
        ))}
      </div>

      {/* Voltar */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sand-400 hover:text-sand-200
                   font-body text-xs tracking-widest uppercase transition-colors mb-12"
      >
        <RiArrowLeftLine size={13} />
        Início
      </button>

      <div className="max-w-4xl">
        <motion.p
          className="eyebrow text-terra mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nossa história contada por quem importa
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl text-sand-50 font-light leading-[0.95] mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Experiências<br />
          <span className="italic text-blush">que ficam.</span>
        </motion.h1>

        <motion.p
          className="font-body text-sand-400 text-base leading-relaxed max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Cada cliente tem uma história. Aqui você encontra depoimentos reais
          e respostas para as dúvidas mais frequentes.
        </motion.p>
      </div>
    </div>
  )
}

// ─── Métricas ─────────────────────────────────────────────────────────────────

function MetricsStrip() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  const metrics = [
    { value: '5.000+', label: 'Clientes felizes' },
    { value: '98%',    label: 'Satisfação' },
    { value: '10+',    label: 'Anos de história' },
    { value: '4.9★',   label: 'Avaliação média' },
  ]

  return (
    <div ref={ref} className="bg-terra py-10 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="font-display text-4xl text-sand-50 mb-1">{m.value}</div>
            <div className="font-body text-xs text-sand-200 tracking-widest uppercase">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Depoimentos ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="py-28 bg-sand-50 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Depoimentos</p>
          <h2 className="font-display text-5xl md:text-6xl text-sand-900 font-light">
            O que dizem<br />
            <span className="italic">nossas clientes</span>
          </h2>
        </motion.div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial: t, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="bg-sand-100 p-8 flex flex-col group hover:bg-white
                 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[...Array(t.stars)].map((_, s) => (
          <RiStarFill key={s} size={14} className="text-terra" />
        ))}
      </div>

      {/* Depoimento */}
      <p className="font-display text-lg text-sand-700 italic leading-relaxed mb-8 flex-1">
        "{t.text}"
      </p>

      {/* Autor */}
      <div className="flex items-center gap-4">
        {/* Avatar com iniciais */}
        <div className={`w-11 h-11 rounded-full ${t.color} flex items-center justify-center
                         flex-shrink-0`}>
          <span className="font-body text-xs font-semibold text-sand-800">
            {t.initials}
          </span>
        </div>
        <div>
          <div className="font-body text-sm font-medium text-sand-900">{t.name}</div>
          <div className="font-body text-xs text-sand-400 uppercase tracking-wider">{t.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen]       = useState(null)
  const [ref, inView]         = useInView({ triggerOnce: true, threshold: 0.05 })

  function toggle(i) {
    setOpen((prev) => (prev === i ? null : i))
  }

  return (
    <section ref={ref} className="py-28 bg-sand-100 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Dúvidas</p>
          <h2 className="font-display text-5xl md:text-6xl text-sand-900 font-light">
            Perguntas<br />
            <span className="italic">Frequentes</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="divide-y divide-sand-200">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={open === i}
              onToggle={() => toggle(i)}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ faq, index, isOpen, onToggle, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-7 text-left group"
      >
        <span className={`font-body text-base font-medium leading-snug transition-colors duration-200
          ${isOpen ? 'text-terra' : 'text-sand-800 group-hover:text-terra'}`}>
          {faq.q}
        </span>

        {/* Ícone + / - com animação */}
        <span
          className={`w-8 h-8 flex-shrink-0 border flex items-center justify-center
                      transition-all duration-300
                      ${isOpen
                        ? 'border-terra bg-terra text-sand-50'
                        : 'border-sand-300 text-sand-400 group-hover:border-terra group-hover:text-terra'
                      }`}
        >
          {isOpen
            ? <RiSubtractLine size={14} />
            : <RiAddLine size={14} />
          }
        </span>
      </button>

      {/* Resposta com animação de altura */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-14">
              <p className="font-body text-sand-500 text-sm leading-relaxed border-l-2 border-terra pl-5">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── CTA final ───────────────────────────────────────────────────────────────

function CTASection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} className="bg-sand-900 py-24 px-6">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow text-terra mb-4">Pronta para sua experiência?</p>
        <h2 className="font-display text-4xl md:text-5xl text-sand-50 font-light mb-6">
          Venha nos visitar<br />
          <span className="italic text-blush">ou compre pelo WhatsApp</span>
        </h2>
        <p className="font-body text-sand-400 text-sm leading-relaxed mb-10">
          Nossa equipe está pronta para te atender com exclusividade.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark bg-[#25D366] hover:bg-[#1da851] py-4 px-8"
          >
            Falar no WhatsApp
          </a>
          <Link to="/" className="btn-outline-dark border-sand-600 text-sand-300
                                   hover:border-sand-400 hover:text-sand-100 py-4 px-8">
            Ver coleção
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
