/*
 * ProductFilters — Filtros modernos para páginas de categoria
 * Feature implementada por Lucas Fernandes
 * Desenvolvedor Web
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { RiEqualizerLine, RiCloseLine, RiCheckLine } from 'react-icons/ri'

const SORT_OPTIONS = [
  { value: 'default',    label: 'Em destaque' },
  { value: 'price-asc',  label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'new',        label: 'Novidades' },
  { value: 'sale',       label: 'Promoções' },
]

const PRICE_RANGES = [
  { value: 'all',   label: 'Todos os preços' },
  { value: '0-100', label: 'Até R$ 100' },
  { value: '100-200', label: 'R$ 100 – R$ 200' },
  { value: '200-400', label: 'R$ 200 – R$ 400' },
  { value: '400+',  label: 'Acima de R$ 400' },
]

export default function ProductFilters({ filters, onChange, total }) {
  const [open, setOpen] = useState(false)

  function setFilter(key, value) {
    onChange({ ...filters, [key]: value })
  }

  const activeCount = [
    filters.sort !== 'default',
    filters.price !== 'all',
    filters.onlyNew,
    filters.onlySale,
  ].filter(Boolean).length

  return (
    <div className="mb-10">
      {/* Bar */}
      <div className="flex items-center justify-between py-4 border-y border-sand-200">
        <p className="font-body text-xs text-sand-500 uppercase tracking-widest">
          {total} {total === 1 ? 'produto' : 'produtos'}
        </p>

        <div className="flex items-center gap-4">
          {/* Sort dropdown */}
          <SortDropdown value={filters.sort} onChange={(v) => setFilter('sort', v)} />

          {/* Filter button */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 font-body text-xs uppercase tracking-widest
                       text-sand-600 hover:text-sand-900 transition-colors"
          >
            <RiEqualizerLine size={14} />
            Filtrar
            {activeCount > 0 && (
              <span className="w-4 h-4 bg-terra text-sand-50 text-[9px] flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-sand-950/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-[90] w-80 bg-sand-50
                         flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-sand-200">
                <h3 className="font-display text-xl text-sand-900">Filtrar</h3>
                <button onClick={() => setOpen(false)}
                        className="w-8 h-8 flex items-center justify-center
                                   hover:bg-sand-100 text-sand-500 transition-colors">
                  <RiCloseLine size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8">
                {/* Price */}
                <FilterGroup title="Preço">
                  {PRICE_RANGES.map((r) => (
                    <FilterOption
                      key={r.value}
                      label={r.label}
                      active={filters.price === r.value}
                      onClick={() => setFilter('price', r.value)}
                    />
                  ))}
                </FilterGroup>

                {/* Type */}
                <FilterGroup title="Tipo">
                  <FilterOption
                    label="Novidades"
                    active={filters.onlyNew}
                    onClick={() => setFilter('onlyNew', !filters.onlyNew)}
                  />
                  <FilterOption
                    label="Em promoção"
                    active={filters.onlySale}
                    onClick={() => setFilter('onlySale', !filters.onlySale)}
                  />
                </FilterGroup>
              </div>

              <div className="border-t border-sand-200 px-6 py-5 flex gap-3">
                <button
                  onClick={() => onChange({ sort: 'default', price: 'all', onlyNew: false, onlySale: false })}
                  className="flex-1 btn-outline-dark py-3 justify-center text-xs"
                >
                  Limpar
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 btn-dark py-3 justify-center text-xs"
                >
                  Aplicar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const current = SORT_OPTIONS.find((o) => o.value === value)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-body text-xs uppercase tracking-widest
                   text-sand-600 hover:text-sand-900 transition-colors"
      >
        {current.label}
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-44 bg-sand-50 border border-sand-200
                       shadow-lg z-50 py-1"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {SORT_OPTIONS.map((o) => (
              <button
                key={o.value}
                onClick={() => { onChange(o.value); setOpen(false) }}
                className={`w-full text-left px-4 py-2.5 font-body text-xs
                           transition-colors flex items-center justify-between
                           ${value === o.value
                             ? 'text-sand-900 bg-sand-100'
                             : 'text-sand-600 hover:bg-sand-50 hover:text-sand-900'}`}
              >
                {o.label}
                {value === o.value && <RiCheckLine size={12} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  )
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <h4 className="font-body text-xs text-sand-500 uppercase tracking-widest mb-4">{title}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

function FilterOption({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 font-body text-sm transition-colors
                 ${active ? 'text-sand-900' : 'text-sand-500 hover:text-sand-800'}`}
    >
      <span className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors
                        ${active ? 'border-sand-900 bg-sand-900' : 'border-sand-300'}`}>
        {active && <RiCheckLine size={10} className="text-sand-50" />}
      </span>
      {label}
    </button>
  )
}

// ─── Filter logic helper (usado nas páginas) ─────────────────────────────────

export function applyFilters(products, filters) {
  let result = [...products]

  if (filters.onlyNew)  result = result.filter((p) => p.isNew)
  if (filters.onlySale) result = result.filter((p) => p.isSale)

  if (filters.price !== 'all') {
    const [min, max] = filters.price.split('-').map(Number)
    result = result.filter((p) => {
      if (filters.price === '400+') return p.price >= 400
      return p.price >= min && p.price <= max
    })
  }

  switch (filters.sort) {
    case 'price-asc':  result.sort((a, b) => a.price - b.price); break
    case 'price-desc': result.sort((a, b) => b.price - a.price); break
    case 'new':        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    case 'sale':       result.sort((a, b) => (b.isSale ? 1 : 0) - (a.isSale ? 1 : 0)); break
    default: break
  }

  return result
}

export const DEFAULT_FILTERS = {
  sort: 'default',
  price: 'all',
  onlyNew: false,
  onlySale: false,
}
