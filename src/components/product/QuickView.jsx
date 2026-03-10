/*
 * QuickView — Modal de visualização rápida de produto
 * Corrigido por Lucas Fernandes — Desenvolvedor Web
 *
 * FIXES:
 *  - Seleção de tamanho/cor com estado visual (ativo/selecionado)
 *  - addToCart agora passa size e color selecionados
 *  - Validação: exige seleção de tamanho antes de adicionar
 *  - Wishlist funciona corretamente em todos os estados
 */

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { RiCloseLine, RiShoppingBagLine, RiHeartLine, RiHeartFill } from 'react-icons/ri'
import { useCart } from '../../context/CartContext'
import { useFlyToCart } from '../../hooks/useFlyToCart'
import { formatPrice } from '../../data/products'

export default function QuickView({ product, onClose }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const { flyToCart } = useFlyToCart()
  const imgRef = useRef(null)

  // Seleções do usuário
  const [selectedSize,  setSelectedSize]  = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [added,         setAdded]         = useState(false)
  const [sizeError,     setSizeError]     = useState(false)

  const wished = isInWishlist(product?.id)

  // Reset ao mudar de produto
  useEffect(() => {
    setSelectedSize(null)
    setSelectedColor(null)
    setAdded(false)
    setSizeError(false)
  }, [product?.id])

  // Fechar com Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Bloquear scroll do body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!product) return null

  const hasSizes  = product.sizes?.length > 0
  const hasColors = product.colors?.length > 0

  function handleAdd() {
    // Validar seleção de tamanho se o produto tem tamanhos
    if (hasSizes && !selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)

    flyToCart(imgRef.current)
    addToCart({
      id:    product.id,
      name:  product.name,
      price: product.price,
      image: product.image,
      size:  selectedSize  || null,
      color: selectedColor || null,
    })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      onClose()
    }, 1200)
  }

  function handleSizeSelect(size) {
    setSelectedSize(size)
    if (sizeError) setSizeError(false)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-sand-950/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 bg-sand-50 w-full max-w-3xl max-h-[92vh] overflow-y-auto
                     grid grid-cols-1 md:grid-cols-2"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Fechar */}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center
                       bg-sand-100 hover:bg-sand-200 text-sand-700 transition-colors"
          >
            <RiCloseLine size={18} />
          </button>

          {/* Imagem */}
          <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[520px] overflow-hidden">
            <img
              ref={imgRef}
              src={product.images?.[0] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount && (
              <span className="absolute top-4 left-4 bg-terra text-sand-50
                               font-body text-[10px] tracking-widest uppercase px-2.5 py-1">
                -{discount}%
              </span>
            )}
          </div>

          {/* Informações */}
          <div className="p-7 md:p-8 flex flex-col">
            <div className="flex-1">
              <p className="eyebrow mb-1">{product.colors?.[0]}</p>
              <h2 className="font-display text-3xl text-sand-900 leading-tight mb-4">
                {product.name}
              </h2>

              {/* Preço */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-body text-2xl text-sand-900 font-medium">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-body text-sand-400 text-base line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Descrição */}
              <p className="font-body text-sand-500 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* ── Seleção de Tamanho ── */}
              {hasSizes && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-body text-xs text-sand-500 uppercase tracking-widest">
                      Tamanho
                      {selectedSize && (
                        <span className="ml-2 text-sand-900 font-medium">{selectedSize}</span>
                      )}
                    </p>
                    {sizeError && (
                      <p className="font-body text-xs text-terra">Selecione um tamanho</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => {
                      const active = selectedSize === s
                      return (
                        <button
                          key={s}
                          onClick={() => handleSizeSelect(s)}
                          className={`font-body text-xs px-3.5 py-2 border transition-all duration-150
                            ${active
                              ? 'border-sand-900 bg-sand-900 text-sand-50'
                              : sizeError
                                ? 'border-terra text-sand-600 hover:border-sand-700 hover:text-sand-900'
                                : 'border-sand-300 text-sand-600 hover:border-sand-700 hover:text-sand-900'
                            }`}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ── Seleção de Cor ── */}
              {hasColors && (
                <div className="mb-7">
                  <p className="font-body text-xs text-sand-500 uppercase tracking-widest mb-2">
                    Cor
                    {selectedColor && (
                      <span className="ml-2 text-sand-900 font-medium">{selectedColor}</span>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => {
                      const active = selectedColor === c
                      return (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`font-body text-xs px-3.5 py-2 border transition-all duration-150
                            ${active
                              ? 'border-sand-900 bg-sand-900 text-sand-50'
                              : 'border-sand-200 text-sand-600 hover:border-sand-600 hover:text-sand-900'
                            }`}
                        >
                          {c}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Ações */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleAdd}
                className={`w-full flex items-center justify-center gap-2 py-4
                           font-body text-xs tracking-widest uppercase transition-all duration-300
                           ${added
                             ? 'bg-terra text-sand-50'
                             : 'bg-sand-900 text-sand-50 hover:bg-sand-700'
                           }`}
              >
                <RiShoppingBagLine size={15} />
                {added ? 'Adicionado ao carrinho ✓' : 'Adicionar ao carrinho'}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-full flex items-center justify-center gap-2 py-4
                           border border-sand-300 text-sand-700 font-body text-xs
                           tracking-widest uppercase hover:border-sand-700 transition-all"
              >
                {wished
                  ? <><RiHeartFill size={14} className="text-terra" /> Nos favoritos</>
                  : <><RiHeartLine size={14} /> Adicionar aos favoritos</>
                }
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
