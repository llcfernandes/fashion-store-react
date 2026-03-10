/*
 * Dados dos produtos — Lumen Studio
 * Feature implementada por Lucas Fernandes
 * Desenvolvedor Web
 */

export const CATEGORIES = {
  vestidos: {
    slug: 'vestidos',
    label: 'Vestidos',
    description: 'Do casual ao sofisticado. Para cada ocasião.',
    banner: 'https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=1400&q=80',
  },
  'blusas-tops': {
    slug: 'blusas-tops',
    label: 'Blusas & Tops',
    description: 'Estampas exclusivas e básicos essenciais.',
    banner: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=1400&q=80',
  },
  'calcas-saias': {
    slug: 'calcas-saias',
    label: 'Calças & Saias',
    description: 'Cortes perfeitos para valorizar cada silhueta.',
    banner: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1400&q=80',
  },
  acessorios: {
    slug: 'acessorios',
    label: 'Acessórios',
    description: 'O detalhe que transforma um look.',
    banner: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1400&q=80',
  },
}

export const PRODUCTS = [
  // VESTIDOS
  {
    id: 'v001',
    name: 'Vestido Linho Verão',
    category: 'vestidos',
    price: 289.90,
    originalPrice: 349.90,
    isNew: true,
    isSale: true,
    description: 'Vestido midi em linho natural com caimento fluido. Perfeito para dias quentes com sofisticação.',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Off-white', 'Areia', 'Terracota'],
    image: 'https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    ],
  },
  {
    id: 'v002',
    name: 'Vestido Noite Seda',
    category: 'vestidos',
    price: 520.00,
    originalPrice: null,
    isNew: true,
    isSale: false,
    description: 'Vestido longo em cetim com decote elegante. Ideal para ocasiões especiais e eventos noturnos.',
    sizes: ['P', 'M', 'G'],
    colors: ['Preto', 'Champagne'],
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
      'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=800&q=80',
    ],
  },
  {
    id: 'v003',
    name: 'Vestido Floral Midi',
    category: 'vestidos',
    price: 219.90,
    originalPrice: 269.90,
    isNew: false,
    isSale: true,
    description: 'Estampa floral exclusiva em tecido crepe. Fluidez e elegância para o dia a dia.',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Rosa', 'Azul', 'Verde'],
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    ],
  },
  {
    id: 'v004',
    name: 'Vestido Básico Rib',
    category: 'vestidos',
    price: 159.90,
    originalPrice: null,
    isNew: false,
    isSale: false,
    description: 'Vestido curto em malha canelada com ajuste perfeito. Um básico essencial do guarda-roupa.',
    sizes: ['P', 'M', 'G'],
    colors: ['Preto', 'Bege', 'Branco'],
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    ],
  },

  // BLUSAS & TOPS
  {
    id: 'b001',
    name: 'Blusa Manga Balão',
    category: 'blusas-tops',
    price: 149.90,
    originalPrice: null,
    isNew: true,
    isSale: false,
    description: 'Blusa com mangas balão em viscose premium. Elegante e versátil para combinar com calças e saias.',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Caramelo'],
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80',
    ],
  },
  {
    id: 'b002',
    name: 'Top Cropped Cetim',
    category: 'blusas-tops',
    price: 119.90,
    originalPrice: 149.90,
    isNew: false,
    isSale: true,
    description: 'Top cropped em cetim com alças finas. Peça versátil que vai do casual ao elegante.',
    sizes: ['P', 'M', 'G'],
    colors: ['Champagne', 'Rosa', 'Preto'],
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
    ],
  },
  {
    id: 'b003',
    name: 'Camisa Oversized Linho',
    category: 'blusas-tops',
    price: 189.90,
    originalPrice: null,
    isNew: true,
    isSale: false,
    description: 'Camisa oversized em linho lavado. Caimento relaxado com acabamento impecável.',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Off-white', 'Azul Claro', 'Rosa Antigo'],
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    ],
  },
  {
    id: 'b004',
    name: 'Regata Básica Premium',
    category: 'blusas-tops',
    price: 89.90,
    originalPrice: null,
    isNew: false,
    isSale: false,
    description: 'Regata em supima cotton com toque de seda. A base perfeita para qualquer look.',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Cinza', 'Nude'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    ],
  },

  // CALÇAS & SAIAS
  {
    id: 'c001',
    name: 'Calça Wide Leg Alfaiataria',
    category: 'calcas-saias',
    price: 299.90,
    originalPrice: 379.90,
    isNew: true,
    isSale: true,
    description: 'Calça wide leg em tecido de alfaiataria italiano. Caimento perfeito e elegância atemporal.',
    sizes: ['34', '36', '38', '40', '42'],
    colors: ['Preto', 'Caramelo', 'Off-white'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    ],
  },
  {
    id: 'c002',
    name: 'Saia Midi Plissada',
    category: 'calcas-saias',
    price: 229.90,
    originalPrice: null,
    isNew: true,
    isSale: false,
    description: 'Saia midi plissada em seda italiana. Movimento suave e feminino para qualquer ocasião.',
    sizes: ['P', 'M', 'G'],
    colors: ['Terracota', 'Verde Musgo', 'Azul Marinho'],
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80',
    ],
  },
  {
    id: 'c003',
    name: 'Calça Slouchy Jeans',
    category: 'calcas-saias',
    price: 259.90,
    originalPrice: null,
    isNew: false,
    isSale: false,
    description: 'Jeans premium com lavagem exclusiva e corte slouchy. Conforto e estilo sem abrir mão.',
    sizes: ['34', '36', '38', '40', '42', '44'],
    colors: ['Azul Médio', 'Azul Escuro'],
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
    ],
  },
  {
    id: 'c004',
    name: 'Saia Lápis Couro',
    category: 'calcas-saias',
    price: 349.90,
    originalPrice: 420.00,
    isNew: false,
    isSale: true,
    description: 'Saia lápis em couro ecológico de alta qualidade. Poder e sofisticação em cada detalhe.',
    sizes: ['P', 'M', 'G'],
    colors: ['Preto', 'Caramelo'],
    image: 'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=800&q=80',
    ],
  },

  // ACESSÓRIOS
  {
    id: 'a001',
    name: 'Bolsa Estruturada Couro',
    category: 'acessorios',
    price: 489.90,
    originalPrice: null,
    isNew: true,
    isSale: false,
    description: 'Bolsa estruturada em couro legítimo com fecho dourado. Investimento para o seu guarda-roupa.',
    sizes: ['Único'],
    colors: ['Caramelo', 'Preto', 'Nude'],
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
    ],
  },
  {
    id: 'a002',
    name: 'Cinto Trançado Couro',
    category: 'acessorios',
    price: 129.90,
    originalPrice: 159.90,
    isNew: false,
    isSale: true,
    description: 'Cinto em couro genuíno com trança artesanal. O detalhe que eleva qualquer look.',
    sizes: ['P/M', 'G/GG'],
    colors: ['Caramelo', 'Preto'],
    image: 'https://images.unsplash.com/photo-1624623278313-a930126a11c3?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1624623278313-a930126a11c3?w=800&q=80',
    ],
  },
  {
    id: 'a003',
    name: 'Lenço de Seda Estampado',
    category: 'acessorios',
    price: 189.90,
    originalPrice: null,
    isNew: true,
    isSale: false,
    description: 'Lenço em seda pura com estampa exclusiva Lumen. Versátil: use no cabelo, pescoço ou bolsa.',
    sizes: ['Único'],
    colors: ['Floral Rosa', 'Geométrico Azul', 'Abstrato Terra'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
  },
  {
    id: 'a004',
    name: 'Brinco Argola Dourada',
    category: 'acessorios',
    price: 89.90,
    originalPrice: null,
    isNew: false,
    isSale: false,
    description: 'Argolas douradas em banho de ouro 18k. Clássicas, elegantes e atemporais.',
    sizes: ['P', 'M', 'G'],
    colors: ['Dourado'],
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    ],
  },
]

export const getProductsByCategory = (slug) =>
  PRODUCTS.filter((p) => p.category === slug)

export const getProductById = (id) =>
  PRODUCTS.find((p) => p.id === id)

export const formatPrice = (price) =>
  price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
