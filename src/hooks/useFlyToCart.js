/*
 * useFlyToCart — Animação de produto voando para o ícone do carrinho
 * Feature implementada por Lucas Fernandes
 * Desenvolvedor Web
 *
 * Como funciona:
 * 1. Pega as coordenadas da imagem do produto (source)
 * 2. Pega as coordenadas do ícone do carrinho (target)
 * 3. Cria um clone da imagem e anima via CSS transform até o target
 * 4. Remove o clone ao fim da animação
 */

import { useCallback } from 'react'

export function useFlyToCart() {
  const flyToCart = useCallback((sourceEl) => {
    const cartIcon = document.getElementById('cart-icon')
    if (!sourceEl || !cartIcon) return

    const srcRect  = sourceEl.getBoundingClientRect()
    const destRect = cartIcon.getBoundingClientRect()

    // Create flying clone
    const clone = document.createElement('img')
    clone.src = sourceEl.src
    clone.style.cssText = `
      position: fixed;
      z-index: 9999;
      top: ${srcRect.top}px;
      left: ${srcRect.left}px;
      width: ${srcRect.width}px;
      height: ${srcRect.height}px;
      object-fit: cover;
      border-radius: 4px;
      pointer-events: none;
      transition: all 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      opacity: 1;
      transform: scale(1);
    `
    document.body.appendChild(clone)

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const dx = destRect.left + destRect.width / 2 - srcRect.left - srcRect.width / 2
        const dy = destRect.top + destRect.height / 2 - srcRect.top - srcRect.height / 2

        clone.style.transform  = `translate(${dx}px, ${dy}px) scale(0.1)`
        clone.style.opacity    = '0'
        clone.style.borderRadius = '50%'
      })
    })

    // Bounce animation on cart icon
    setTimeout(() => {
      cartIcon.classList.add('cart-bounce')
      setTimeout(() => cartIcon.classList.remove('cart-bounce'), 400)
    }, 650)

    // Cleanup clone
    setTimeout(() => {
      if (clone.parentNode) clone.parentNode.removeChild(clone)
    }, 800)
  }, [])

  return { flyToCart }
}
