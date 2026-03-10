/*
 * WishlistPage — Página de favoritos (wishlist)
 * Feature implementada por Lucas Fernandes
 * Desenvolvedor Web
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { RiHeartLine, RiArrowLeftLine } from 'react-icons/ri'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/product/ProductCard'
import QuickView from '../components/product/QuickView'

export default function WishlistPage() {
  const { wishlist } = useCart()
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const products = PRODUCTS.filter((p) => wishlist.includes(p.id))

  return (
    <>
      <main className="bg-sand-100 min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-body text-xs tracking-widest
                         uppercase text-sand-400 hover:text-sand-700 transition-colors mb-6"
            >
              <RiArrowLeftLine size={12} />
              Voltar à loja
            </Link>
            <div className="flex items-baseline gap-4">
              <h1 className="font-display text-5xl text-sand-900 font-light">Favoritos</h1>
              {products.length > 0 && (
                <span className="font-body text-sm text-sand-400">
                  {products.length} {products.length === 1 ? 'item' : 'itens'}
                </span>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {products.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-28 text-center"
              >
                <RiHeartLine size={48} className="text-sand-300 mb-5" />
                <h2 className="font-display text-3xl text-sand-600 mb-3">
                  Nenhum favorito ainda
                </h2>
                <p className="font-body text-sm text-sand-400 mb-8 max-w-xs">
                  Salve as peças que você amou para encontrar fácil depois.
                </p>
                <Link to="/" className="btn-dark">
                  Explorar coleção
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
              >
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
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
