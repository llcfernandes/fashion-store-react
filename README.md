# Lumen Studio – Boutique de Moda 👗

Template premium para boutique de moda feminina, desenvolvido com React + Vite + **Tailwind CSS v4**.

## ✨ Visão Geral

Site editorial para loja de moda feminina. Design boutique de luxo com paleta areia/terra, tipografia display Cormorant Garamond e layout split assimétrico. Configuração CSS-first com Tailwind v4.

## 🛠 Tecnologias (versões atualizadas — Março 2026)

| Tecnologia | Versão |
|---|---|
| React | ^19.1.0 |
| Vite | ^6.3.0 |
| Tailwind CSS | ^4.1.0 |
| @tailwindcss/vite | ^4.1.0 |
| Motion (ex-Framer Motion) | ^12.0.0 |
| React Icons | ^5.5.0 |
| React Intersection Observer | ^9.16.0 |

## 🆕 Tailwind CSS v4 — O que mudou

Tailwind v4 usa **configuração CSS-first**. Não há mais `tailwind.config.js` nem `postcss.config.js`.

**Setup (vite.config.js):**
```js
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [react(), tailwindcss()] })
```

**CSS (src/styles/index.css):**
```css
@import "tailwindcss";

@theme {
  --color-sand-100: #F5F0EB;
  --color-terra: #B07050;
  --font-display: "Cormorant Garamond", serif;
}
```

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── sections/
│       ├── Hero.jsx          ← Split editorial layout
│       ├── About.jsx
│       ├── Gallery.jsx       ← Masonry com hover
│       ├── Categories.jsx    ← Cards com arrow hover
│       ├── Editorial.jsx     ← Fullscreen quote
│       ├── Testimonials.jsx
│       ├── FAQ.jsx
│       └── Contact.jsx       ← Contato + newsletter
├── styles/
│   └── index.css             ← @theme + classes customizadas
├── App.jsx
└── main.jsx
```

## 🚀 Como Rodar

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
npm run preview
```

## 🎨 Identidade Visual

| Elemento | Valor |
|---|---|
| Paleta | Sand (areia) + Terra + Blush |
| Fundo | `#F5F0EB` |
| Acento | `#B07050` (terra) |
| Fonte display | Cormorant Garamond |
| Fonte corpo | Jost |
| CSS | Tailwind CSS v4 |

## 🔧 Personalização

Substitua os dados genéricos:
- `lumenstudio.moda` → Instagram real
- `(00)` → telefone real
- `5500000000000` → WhatsApp real

---

Desenvolvido por **Lucas Fernandes** – Desenvolvedor Web
