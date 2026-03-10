/*
 * ProductCard — Card de produto com Quick View, Wishlist e Fly-to-Cart
 * Corrigido por Lucas Fernandes — Desenvolvedor Web
 *
 * FIXES:
 *  - "Adicionar" no hover agora abre QuickView (forçando seleção de tamanho/cor)
 *    em vez de adicionar diretamente sem variações
 *  - Wishlist isInWishlist usa useCallback corretamente
 *  - Acessibilidade melhorada
 */

import React, { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { RiHeartLine, RiHeartFill, RiEyeLine, RiShoppingBagLine } from 'react-icons/ri'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../data/products'

export default function ProductCard({ product, onQuickView }) {
  const { toggleWishlist, isInWishlist } = useCart()
  const wished = isInWishlist(product.id)

  function handleWishlist(e) {
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  function handleQuickView(e) {
    e.stopPropagation()
    onQuickView?.(product)
  }

  // "Adicionar" no hover abre o QuickView para selecionar tamanho/cor
  // Isso evita adicionar sem variação selecionada (BUG corrigido)
  function handleAddClick(e) {
    e.stopPropagation()
    onQuickView?.(product)
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-sand-50 cursor-pointer"
    >
      {/* Container da imagem */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-sand-900 text-sand-50 font-body text-[10px] tracking-widest uppercase px-2.5 py-1">
              Novo
            </span>
          )}
          {product.isSale && (
            <span className="bg-terra text-sand-50 font-body text-[10px] tracking-widest uppercase px-2.5 py-1">
              Sale
            </span>
          )}
        </div>

        {/* Botão de favorito */}
        <button
          onClick={handleWishlist}
          aria-label={wished ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
                     bg-sand-50/90 backdrop-blur-sm transition-all duration-200
                     hover:bg-sand-50 hover:scale-110"
        >
          {wished
            ? <RiHeartFill size={15} className="text-terra" />
            : <RiHeartLine size={15} className="text-sand-500" />
          }
        </button>

        {/* Overlay com ações ao hover */}
        <div className="absolute inset-0 bg-sand-900/0 group-hover:bg-sand-900/10
                        transition-all duration-500 flex flex-col items-center justify-end
                        pb-4 gap-2 opacity-0 group-hover:opacity-100">

          {/* Visualizar rápido */}
          <button
            onClick={handleQuickView}
            className="w-[85%] flex items-center justify-center gap-2
                       bg-sand-50/95 backdrop-blur-sm text-sand-900
                       font-body text-[11px] tracking-widest uppercase py-2.5
                       hover:bg-sand-900 hover:text-sand-50 transition-all duration-200"
          >
            <RiEyeLine size={13} />
            Visualizar rápido
          </button>

          {/* Adicionar — abre QuickView para seleção de variações */}
          <button
            onClick={handleAddClick}
            className="w-[85%] flex items-center justify-center gap-2
                       bg-sand-900 text-sand-50 hover:bg-sand-700
                       font-body text-[11px] tracking-widest uppercase py-2.5
                       transition-all duration-200"
          >
            <RiShoppingBagLine size={13} />
            Adicionar
          </button>
        </div>
      </div>

      {/* Informações do produto */}
      <div className="pt-4 pb-5 px-1">
        <p className="font-body text-[10px] text-sand-400 tracking-widest uppercase mb-1">
          {product.colors?.[0]}
        </p>
        <h3 className="font-display text-lg text-sand-900 leading-tight mb-2">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-body text-sand-900 font-medium text-sm">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-sand-400 text-xs line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
