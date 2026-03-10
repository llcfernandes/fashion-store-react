/*
 * CartDrawer — Painel lateral do carrinho com checkout via WhatsApp
 * Corrigido por Lucas Fernandes — Desenvolvedor Web
 *
 * FIXES:
 *  - CartItem exibe tamanho e cor selecionados
 *  - removeFromCart e setQty usam cartKey (não id)
 *  - CheckoutForm exibe variações (tamanho/cor) no resumo
 *  - Reset de step ao fechar o drawer
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  RiCloseLine, RiDeleteBinLine, RiAddLine, RiSubtractLine,
  RiShoppingBagLine, RiWhatsappLine, RiArrowRightLine,
} from 'react-icons/ri'
import { useCart } from '../../context/CartContext'
import { useWhatsApp } from '../../hooks/useWhatsApp'
import { formatPrice } from '../../data/products'

const EMPTY_FORM = { name: '', phone: '', city: '', notes: '' }

export default function CartDrawer() {
  const {
    items, cartOpen, closeCart,
    removeFromCart, setQty, clearCart,
    totalPrice, totalItems,
  } = useCart()
  const { openWhatsApp } = useWhatsApp()

  const [step,    setStep]    = useState('cart') // 'cart' | 'checkout'
  const [form,    setForm]    = useState(EMPTY_FORM)
  const [errors,  setErrors]  = useState({})
  const [sending, setSending] = useState(false)

  function validate() {
    const e = {}
    if (!form.name.trim())  e.name  = 'Informe seu nome'
    if (!form.phone.trim()) e.phone = 'Informe seu telefone'
    if (!form.city.trim())  e.city  = 'Informe sua cidade/bairro'
    return e
  }

  function handleCheckout() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setSending(true)
    setTimeout(() => {
      openWhatsApp(items, form)
      clearCart()
      setForm(EMPTY_FORM)
      setStep('cart')
      closeCart()
      setSending(false)
    }, 600)
  }

  function handleField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }))
  }

  function onClose() {
    closeCart()
    // Reseta o step após o drawer fechar (aguarda animação)
    setTimeout(() => setStep('cart'), 400)
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-sand-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-[110] w-full max-w-md
                       bg-sand-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-sand-200">
              <div>
                <h2 className="font-display text-2xl text-sand-900">
                  {step === 'cart' ? 'Meu Carrinho' : 'Finalizar Pedido'}
                </h2>
                {step === 'cart' && totalItems > 0 && (
                  <p className="font-body text-xs text-sand-400 mt-0.5">
                    {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar carrinho"
                className="w-9 h-9 flex items-center justify-center hover:bg-sand-100
                           text-sand-500 hover:text-sand-900 transition-colors"
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            {/* Corpo com scroll */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {step === 'cart' ? (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {items.length === 0
                      ? <EmptyCart onClose={onClose} />
                      : (
                        <div className="px-6 py-4 flex flex-col gap-5">
                          {items.map((item) => (
                            <CartItem
                              key={item.cartKey}
                              item={item}
                              onRemove={() => removeFromCart(item.cartKey)}
                              onQty={(q) => setQty(item.cartKey, q)}
                            />
                          ))}
                        </div>
                      )
                    }
                  </motion.div>
                ) : (
                  <motion.div
                    key="checkout"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 py-6"
                  >
                    <CheckoutForm
                      form={form}
                      errors={errors}
                      onChange={handleField}
                      items={items}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Rodapé fixo */}
            {items.length > 0 && (
              <div className="border-t border-sand-200 px-6 py-5 bg-sand-50">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-body text-sm text-sand-500 uppercase tracking-widest">Total</span>
                  <span className="font-display text-2xl text-sand-900">{formatPrice(totalPrice)}</span>
                </div>

                {step === 'cart' ? (
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full btn-dark py-4 justify-center gap-2"
                  >
                    Finalizar pedido
                    <RiArrowRightLine size={15} />
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleCheckout}
                      disabled={sending}
                      className="w-full flex items-center justify-center gap-2 py-4
                                 bg-[#25D366] text-white font-body text-xs tracking-widest
                                 uppercase hover:bg-[#1da851] transition-colors
                                 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <RiWhatsappLine size={16} />
                      {sending ? 'Abrindo WhatsApp…' : 'Enviar pelo WhatsApp'}
                    </button>
                    <button
                      onClick={() => setStep('cart')}
                      className="w-full btn-outline-dark py-3 justify-center text-xs"
                    >
                      ← Voltar ao carrinho
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── CartItem — exibe tamanho e cor selecionados ──────────────────────────

function CartItem({ item, onRemove, onQty }) {
  return (
    <div className="flex gap-4 pb-5 border-b border-sand-200 last:border-0">
      <div className="w-20 h-24 flex-shrink-0 overflow-hidden">
        <img src={item.image} alt={item.name}
             className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-display text-base text-sand-900 leading-tight mb-0.5">
          {item.name}
        </h4>

        {/* Variações selecionadas */}
        <div className="flex flex-wrap gap-x-3 mb-1">
          {item.size && (
            <span className="font-body text-xs text-sand-500">
              Tam: <strong className="text-sand-700">{item.size}</strong>
            </span>
          )}
          {item.color && (
            <span className="font-body text-xs text-sand-500">
              Cor: <strong className="text-sand-700">{item.color}</strong>
            </span>
          )}
        </div>

        <p className="font-body text-sm text-sand-600">{formatPrice(item.price)}</p>

        {/* Quantidade + remover */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-sand-200">
            <button
              onClick={() => onQty(item.qty - 1)}
              aria-label="Diminuir quantidade"
              className="w-7 h-7 flex items-center justify-center text-sand-500
                         hover:bg-sand-100 transition-colors"
            >
              <RiSubtractLine size={13} />
            </button>
            <span className="w-8 text-center font-body text-sm text-sand-900">
              {item.qty}
            </span>
            <button
              onClick={() => onQty(item.qty + 1)}
              aria-label="Aumentar quantidade"
              className="w-7 h-7 flex items-center justify-center text-sand-500
                         hover:bg-sand-100 transition-colors"
            >
              <RiAddLine size={13} />
            </button>
          </div>
          <button
            onClick={onRemove}
            aria-label="Remover item"
            className="text-sand-400 hover:text-terra transition-colors p-1"
          >
            <RiDeleteBinLine size={15} />
          </button>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-body text-sm font-medium text-sand-900">
          {formatPrice(item.price * item.qty)}
        </p>
      </div>
    </div>
  )
}

// ─── Carrinho vazio ───────────────────────────────────────────────────────

function EmptyCart({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <RiShoppingBagLine size={40} className="text-sand-300 mb-4" />
      <h3 className="font-display text-2xl text-sand-700 mb-2">Carrinho vazio</h3>
      <p className="font-body text-sm text-sand-400 mb-8">
        Adicione produtos para começar seu pedido.
      </p>
      <button onClick={onClose} className="btn-dark py-3 px-8">
        Explorar coleção
      </button>
    </div>
  )
}

// ─── Formulário de checkout ───────────────────────────────────────────────

function CheckoutForm({ form, errors, onChange, items }) {
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)

  return (
    <div>
      {/* Resumo com variações */}
      <div className="bg-sand-100 px-4 py-4 mb-6">
        <p className="font-body text-xs text-sand-500 uppercase tracking-widest mb-3">
          Resumo do pedido
        </p>
        {items.map((i) => (
          <div key={i.cartKey} className="mb-2">
            <div className="flex justify-between font-body text-sm text-sand-700">
              <span>{i.name} <span className="text-sand-400">× {i.qty}</span></span>
              <span>{formatPrice(i.price * i.qty)}</span>
            </div>
            {(i.size || i.color) && (
              <p className="font-body text-xs text-sand-400 mt-0.5">
                {[i.size && `Tam: ${i.size}`, i.color && `Cor: ${i.color}`]
                  .filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
        ))}
        <div className="border-t border-sand-200 mt-3 pt-3 flex justify-between
                        font-body text-sm font-medium text-sand-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Campos */}
      <div className="flex flex-col gap-4">
        <Field
          label="Nome completo *"
          value={form.name}
          error={errors.name}
          onChange={(v) => onChange('name', v)}
          placeholder="Seu nome"
        />
        <Field
          label="Telefone *"
          value={form.phone}
          error={errors.phone}
          onChange={(v) => onChange('phone', v)}
          placeholder="(00) 00000-0000"
          type="tel"
        />
        <Field
          label="Cidade / Bairro *"
          value={form.city}
          error={errors.city}
          onChange={(v) => onChange('city', v)}
          placeholder="Ex: São Paulo – Jardins"
        />
        <div>
          <label className="font-body text-xs text-sand-500 uppercase tracking-widest mb-2 block">
            Observações
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Dúvidas sobre tamanho, entrega, etc…"
            rows={3}
            className="w-full border border-sand-300 bg-sand-50 px-4 py-3
                       font-body text-sm text-sand-900 placeholder:text-sand-400
                       focus:outline-none focus:border-sand-700 resize-none transition-colors"
          />
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, error, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="font-body text-xs text-sand-500 uppercase tracking-widest mb-2 block">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border bg-sand-50 px-4 py-3
                   font-body text-sm text-sand-900 placeholder:text-sand-400
                   focus:outline-none transition-colors
                   ${error ? 'border-terra' : 'border-sand-300 focus:border-sand-700'}`}
      />
      {error && <p className="font-body text-xs text-terra mt-1">{error}</p>}
    </div>
  )
}
