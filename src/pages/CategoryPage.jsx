/*
 * CategoryPage — Página de categoria com grid de produtos + filtros
 * Corrigido por Lucas Fernandes — Desenvolvedor Web
 *
 * FIX: Botão "Voltar" agora redireciona para /#categorias (seção na homepage)
 */

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { RiArrowLeftLine } from 'react-icons/ri'
import { CATEGORIES, getProductsByCategory } from '../data/products'
import ProductCard from '../components/product/ProductCard'
import QuickView from '../components/product/QuickView'
import ProductFilters, { applyFilters, DEFAULT_FILTERS } from '../components/product/ProductFilters'

export default function CategoryPage() {
  const { slug }       = useParams()
  const navigate       = useNavigate()
  const category       = CATEGORIES[slug]
  const allProducts    = getProductsByCategory(slug)

  const [filters,          setFilters]          = useState(DEFAULT_FILTERS)
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  // Reset ao mudar de categoria
  useEffect(() => {
    setFilters(DEFAULT_FILTERS)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  // Voltar para a seção de categorias na homepage
  function handleBack() {
    navigate('/')
    // Aguarda a renderização da homepage e faz scroll até #categorias
    setTimeout(() => {
      const el = document.getElementById('categorias')
      if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
    }, 300)
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-100">
        <div className="text-center">
          <h1 className="font-display text-4xl text-sand-900 mb-4">Categoria não encontrada</h1>
          <button onClick={handleBack} className="btn-dark">← Voltar</button>
        </div>
      </div>
    )
  }

  const filtered = applyFilters(allProducts, filters)

  return (
    <>
      <main className="bg-sand-100 min-h-screen">
        {/* Banner da categoria */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={category.banner}
            alt={category.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sand-950/45" />

          {/* Botão Voltar — vai para /#categorias */}
          <button
            onClick={handleBack}
            className="absolute top-24 left-6 md:left-10 flex items-center gap-2
                       text-sand-200 hover:text-sand-50 transition-colors
                       font-body text-xs tracking-widest uppercase"
          >
            <RiArrowLeftLine size={14} />
            Categorias
          </button>

          {/* Título */}
          <motion.div
            className="absolute bottom-10 left-6 md:left-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs text-sand-300 tracking-widest uppercase mb-2">
              Coleção 2025
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-sand-50 font-light">
              {category.label}
            </h1>
            <p className="font-body text-sand-300 text-sm mt-2">{category.description}</p>
          </motion.div>
        </div>

        {/* Conteúdo */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            total={filtered.length}
          />

          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="font-display text-2xl text-sand-400 mb-3">
                  Nenhum produto encontrado
                </p>
                <p className="font-body text-sm text-sand-400 mb-6">
                  Tente ajustar os filtros.
                </p>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="btn-outline-dark py-3 px-8"
                >
                  Limpar filtros
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <ProductCard
                      product={product}
                      onQuickView={() => setQuickViewProduct(product)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {quickViewProduct && (
          <QuickView
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
