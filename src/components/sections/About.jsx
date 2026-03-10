import React from 'react'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'

const pillars = [
  { title: 'Curadoria Pessoal', desc: 'Cada peça é selecionada com critério estético rigoroso e sensibilidade de moda.' },
  { title: 'Qualidade Premium', desc: 'Tecidos nobres, acabamentos impecáveis e marcas cuidadosamente escolhidas.' },
  { title: 'Atendimento VIP', desc: 'Consultora exclusiva para entender seu estilo e sugerir as peças certas.' },
  { title: 'Troca Garantida', desc: 'Política de troca facilitada para que você se sinta 100% satisfeita.' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="sobre" className="py-32 bg-sand-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80"
                alt="Interior da loja"
                className="w-full h-80 object-cover col-span-2"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80"
                alt="Peças da coleção"
                className="w-full h-52 object-cover"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80"
                alt="Detalhes da moda"
                className="w-full h-52 object-cover"
                loading="lazy"
              />
            </div>
            {/* Year badge */}
            <div className="absolute top-8 -right-5 bg-terra text-sand-50 px-6 py-4 hidden lg:block">
              <div className="font-display text-3xl font-light">2013</div>
              <div className="font-body text-xs tracking-widest uppercase mt-1">Desde</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="eyebrow">Sobre a Lumen</p>
            <h2 className="font-display text-5xl text-sand-900 leading-tight mb-6">
              Mais que uma boutique.<br />
              <span className="italic text-terra">Uma experiência.</span>
            </h2>
            <div className="w-10 h-px bg-blush mb-6" />
            <p className="font-body text-sand-500 leading-relaxed mb-8">
              Desde 2013, a <strong className="text-sand-700 font-medium">Lumen Studio</strong> é o destino da mulher que valoriza 
              autenticidade e elegância. Acreditamos que a moda não é só roupa —
              é expressão, é identidade, é presença.
            </p>
            <p className="font-body text-sand-400 text-sm leading-relaxed mb-10">
              Nossa loja foi criada para ser um espaço de descoberta: um lugar onde você 
              encontra peças que ressoam com quem você é — e com quem quer se tornar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="group"
                >
                  <div className="w-5 h-px bg-blush mb-3 group-hover:w-8 transition-all duration-300" />
                  <h4 className="font-body text-sm font-semibold text-sand-800 mb-1 uppercase tracking-wide">{p.title}</h4>
                  <p className="font-body text-sand-400 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
