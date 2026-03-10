/*
 * useWhatsApp — Checkout via WhatsApp com tamanho e cor na mensagem
 * Corrigido por Lucas Fernandes — Desenvolvedor Web
 *
 * FIX: Mensagem agora inclui tamanho e cor de cada item
 */

import { useCallback } from 'react'
import { formatPrice } from '../data/products'

const WHATSAPP_NUMBER = '5500000000000'

export function useWhatsApp() {
  const buildMessage = useCallback((items, customer) => {
    const lines = items.map((i) => {
      const variacoes = [
        i.size  ? `Tamanho: ${i.size}`  : null,
        i.color ? `Cor: ${i.color}` : null,
      ].filter(Boolean)

      const detalhes = variacoes.length > 0
        ? ` (${variacoes.join(', ')})`
        : ''

      return `- ${i.name}${detalhes} — ${i.qty}x — ${formatPrice(i.price * i.qty)}`
    }).join('\n')

    const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)

    const parts = [
      'Olá! Gostaria de fazer um pedido na Lumen Studio. 🛍️',
      '',
      '*Dados do cliente:*',
      `Nome: ${customer.name}`,
      `Telefone: ${customer.phone}`,
      `Cidade/Bairro: ${customer.city}`,
      '',
      '*Produtos escolhidos:*',
      lines,
      '',
      `*Total: ${formatPrice(total)}*`,
    ]

    if (customer.notes?.trim()) {
      parts.push('', `*Observações:*`, customer.notes.trim())
    }

    return parts.join('\n')
  }, [])

  const openWhatsApp = useCallback(
    (items, customer) => {
      const message = buildMessage(items, customer)
      const encoded = encodeURIComponent(message)
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank')
    },
    [buildMessage]
  )

  return { openWhatsApp, buildMessage }
}
