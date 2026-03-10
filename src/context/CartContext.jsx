/*
 * CartContext — Carrinho persistente com localStorage
 * Corrigido por Lucas Fernandes — Desenvolvedor Web
 *
 * FIX: Deduplicação agora usa cartItemKey (id + size + color)
 *      para que o mesmo produto em tamanhos/cores diferentes
 *      seja tratado como itens separados no carrinho.
 */

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY  = 'lumen_cart'
const WISHLIST_KEY = 'lumen_wishlist'

// Chave única por variação de produto (id + tamanho + cor)
function cartItemKey(item) {
  return `${item.id}__${item.size || ''}__${item.color || ''}`
}

// ─── Reducer ────────────────────────────────────────────────────────────────

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key    = cartItemKey(action.item)
      const exists = state.items.find((i) => cartItemKey(i) === key)

      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            cartItemKey(i) === key ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] }
    }

    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.cartKey !== action.cartKey) }

    case 'SET_QTY':
      if (action.qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.cartKey !== action.cartKey) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartKey === action.cartKey ? { ...i, qty: action.qty } : i
        ),
      }

    case 'CLEAR':
      return { ...state, items: [] }

    case 'TOGGLE_WISH': {
      const inWish = state.wishlist.includes(action.id)
      return {
        ...state,
        wishlist: inWish
          ? state.wishlist.filter((id) => id !== action.id)
          : [...state.wishlist, action.id],
      }
    }

    case 'OPEN_CART':   return { ...state, cartOpen: true }
    case 'CLOSE_CART':  return { ...state, cartOpen: false }
    case 'TOGGLE_CART': return { ...state, cartOpen: !state.cartOpen }

    default:
      return state
  }
}

function loadState() {
  try {
    const cart = localStorage.getItem(STORAGE_KEY)
    const wish = localStorage.getItem(WISHLIST_KEY)
    return {
      items:    cart ? JSON.parse(cart) : [],
      wishlist: wish ? JSON.parse(wish) : [],
      cartOpen: false,
    }
  } catch {
    return { items: [], wishlist: [], cartOpen: false }
  }
}

// ─── Provider ───────────────────────────────────────────────────────────────

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist))
  }, [state.wishlist])

  // addToCart agora recebe { id, name, price, image, size, color }
  // Gera cartKey único para identificação no reducer
  const addToCart = useCallback((item) => {
    const enriched = { ...item, cartKey: cartItemKey(item) }
    dispatch({ type: 'ADD', item: enriched })
  }, [])

  const removeFromCart = useCallback((cartKey) => dispatch({ type: 'REMOVE', cartKey }), [])
  const setQty         = useCallback((cartKey, qty) => dispatch({ type: 'SET_QTY', cartKey, qty }), [])
  const clearCart      = useCallback(() => dispatch({ type: 'CLEAR' }), [])
  const toggleWishlist = useCallback((id) => dispatch({ type: 'TOGGLE_WISH', id }), [])
  const openCart       = useCallback(() => dispatch({ type: 'OPEN_CART' }), [])
  const closeCart      = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])
  const toggleCart     = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), [])

  const totalItems   = state.items.reduce((acc, i) => acc + i.qty, 0)
  const totalPrice   = state.items.reduce((acc, i) => acc + i.price * i.qty, 0)
  const isInWishlist = useCallback((id) => state.wishlist.includes(id), [state.wishlist])

  return (
    <CartContext.Provider value={{
      items: state.items,
      wishlist: state.wishlist,
      cartOpen: state.cartOpen,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleWishlist,
      isInWishlist,
      openCart,
      closeCart,
      toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
