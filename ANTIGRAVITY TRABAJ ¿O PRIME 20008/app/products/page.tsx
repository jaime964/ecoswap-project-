// =============================================================================
// EcoSwap 🌱 - /products (Catálogo de Productos con Inyección de Ads y Banner)
// =============================================================================

'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import SponsoredBanner from '@/components/SponsoredBanner';
import Cart from '@/components/Cart';

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  price: number;
  stock: number;
  condition: string;
  imageUrl: string;
  distance: string;
  co2Savings: number;
  isSponsored: boolean;
  isExclusive: boolean;
  user?: string;
}

const INITIAL_NORMAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'Libro de Programación en React & TypeScript',
    description: 'Manual práctico de desarrollo moderno con Next.js y React. Buenas prácticas y código limpio.',
    category: 'Libros',
    points: 50,
    price: 15.0,
    stock: 8,
    condition: 'Excelente estado',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80',
    distance: '0.8 km',
    co2Savings: 2.5,
    isSponsored: false,
    isExclusive: false,
    user: 'Ana G.',
  },
  {
    id: 'prod-2',
    title: 'Cafetera de émbolo (Vidrio Borosilicato)',
    description: 'Prensa francesa de vidrio borosilicato y émbolo de acero inoxidable para 3 tazas de café.',
    category: 'Electrodomésticos',
    points: 120,
    price: 24.5,
    stock: 3,
    condition: 'Como nueva',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
    distance: '1.4 km',
    co2Savings: 4.8,
    isSponsored: false,
    isExclusive: false,
    user: 'Carlos M.',
  },
  {
    id: 'prod-3',
    title: 'Monstera Deliciosa en maceta artesanal',
    description: 'Hermosa planta purificadora de ambiente en maceta de barro cocido con sustrato orgánico.',
    category: 'Plantas & Jardín',
    points: 40,
    price: 12.0,
    stock: 12,
    condition: 'Sana y con brotes',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80',
    distance: '0.5 km',
    co2Savings: 3.1,
    isSponsored: false,
    isExclusive: false,
    user: 'Lucía R.',
  },
  {
    id: 'prod-4',
    title: 'Auriculares Bluetooth Cancelación de Ruido',
    description: 'Almohadillas confortables, conector USB-C y batería de 22 horas continúas.',
    category: 'Tecnología',
    points: 180,
    price: 49.0,
    stock: 2,
    condition: 'Muy buen estado',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
    distance: '2.1 km',
    co2Savings: 9.2,
    isSponsored: false,
    isExclusive: false,
    user: 'Martín D.',
  },
  {
    id: 'prod-5',
    title: 'Chaqueta Denim Vintage Upcycled',
    description: 'Campera de mezclilla recuperada con bordados botánicos artesanales a mano. Talle M.',
    category: 'Moda Sostenible',
    points: 90,
    price: 32.0,
    stock: 4,
    condition: 'Impecable',
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=500&q=80',
    distance: '1.2 km',
    co2Savings: 14.5,
    isSponsored: false,
    isExclusive: false,
    user: 'Sofía P.',
  },
  {
    id: 'prod-6',
    title: 'Set de Botellas Térmicas de Acero Doble Capa',
    description: 'Doble capa térmica libre de BPA. Mantiene bebidas frías 24h y calientes 12h.',
    category: 'Hogar & Deco',
    points: 60,
    price: 18.0,
    stock: 9,
    condition: 'Nuevo sin uso',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80',
    distance: '3.0 km',
    co2Savings: 6.0,
    isSponsored: false,
    isExclusive: false,
    user: 'Diego F.',
  },
  {
    id: 'prod-7',
    title: 'Lámpara de Escritorio LED con Base de Bambú',
    description: 'Bajo consumo energético (4W), luz cálida regulable y madera de bambú certificada FSC.',
    category: 'Hogar & Deco',
    points: 75,
    price: 22.0,
    stock: 6,
    condition: 'Excelente estado',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80',
    distance: '1.9 km',
    co2Savings: 5.4,
    isSponsored: false,
    isExclusive: false,
    user: 'Valeria S.',
  },
  {
    id: 'prod-8',
    title: 'Mochila de Lona de Algodón Orgánico 20L',
    description: 'Compartimento acolchado para notebook de 15 pulgadas y tela impermeable biodegradable.',
    category: 'Moda Sostenible',
    points: 110,
    price: 38.0,
    stock: 7,
    condition: 'Casi nueva',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80',
    distance: '2.5 km',
    co2Savings: 8.1,
    isSponsored: false,
    isExclusive: false,
    user: 'Tomás N.',
  },
  {
    id: 'prod-9',
    title: 'Juego de Té Japonés Cerámica Gres Hecho a Mano',
    description: 'Tetera con infusor y 4 cuencos esmaltados en verde bosque. Hecho en torno alfarero.',
    category: 'Hogar & Deco',
    points: 130,
    price: 42.0,
    stock: 5,
    condition: 'Impecable',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80',
    distance: '1.1 km',
    co2Savings: 7.2,
    isSponsored: false,
    isExclusive: false,
    user: 'Elena K.',
  },
  {
    id: 'prod-10',
    title: 'Teclado Mecánico Inalámbrico Compacto 60%',
    description: 'Interruptores silenciosos lubricados, conexión Bluetooth y cable trenzado removible.',
    category: 'Tecnología',
    points: 160,
    price: 45.0,
    stock: 4,
    condition: 'Muy bueno',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80',
    distance: '3.4 km',
    co2Savings: 11.0,
    isSponsored: false,
    isExclusive: false,
    user: 'Germán T.',
  },
];

// Pool de Productos Patrocinados para Inyección
const SPONSORED_PRODUCTS_POOL: ProductItem[] = [
  {
    id: 'spons-1',
    title: '⭐ Kit Solar Portátil Monocristalino 25W [AD]',
    description: 'Carga tus dispositivos con energía 100% limpia. Panel plegable ultra liviano para camping o cortes de luz.',
    category: 'Tecnología',
    points: 210,
    price: 54.0,
    stock: 15,
    condition: 'Nuevo en empaque ecológico',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=500&q=80',
    distance: 'Envío Nacional Gratis',
    co2Savings: 28.5,
    isSponsored: true,
    isExclusive: false,
    user: 'SolTech Sustentable (Marca Patrocinadora)',
  },
  {
    id: 'spons-2',
    title: '⭐ Huerto Urbano Vertical Hidropónico [AD]',
    description: 'Cultiva tus propias hortalizas orgánicas en tu balcón o cocina sin tierra y con recirculación automática.',
    category: 'Plantas & Jardín',
    points: 190,
    price: 48.0,
    stock: 10,
    condition: 'Nuevo garantizado',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a701?auto=format&fit=crop&w=500&q=80',
    distance: 'Despacho Rápido',
    co2Savings: 22.0,
    isSponsored: true,
    isExclusive: false,
    user: 'EcoGarden Orgánicos (Marca Patrocinadora)',
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);
  const [userTier, setUserTier] = useState<'FREE' | 'PREMIUM'>('FREE');

  const categories = [
    'all',
    'Libros',
    'Electrodomésticos',
    'Plantas & Jardín',
    'Tecnología',
    'Moda Sostenible',
    'Hogar & Deco',
  ];

  // Inyección de Productos Patrocinados: Cada 5 productos normales inyecta 1 patrocinado
  const displayedProducts = useMemo(() => {
    // 1. Filtrar normales
    const filteredNormals = INITIAL_NORMAL_PRODUCTS.filter((prod) => {
      const matchCategory = selectedCategory === 'all' || prod.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    // 2. Inyectar patrocinado cada 5 elementos normales
    const result: ProductItem[] = [];
    let sponsoredIndex = 0;

    for (let i = 0; i < filteredNormals.length; i++) {
      result.push(filteredNormals[i]);

      // Regla: cada 5 elementos normales (posiciones 5, 10, ...)
      if ((i + 1) % 5 === 0 && SPONSORED_PRODUCTS_POOL.length > 0) {
        const sponsored = SPONSORED_PRODUCTS_POOL[sponsoredIndex % SPONSORED_PRODUCTS_POOL.length];
        result.push({
          ...sponsored,
          id: `${sponsored.id}-injected-${i}`,
          isSponsored: true,
        });
        sponsoredIndex++;
      }
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* 1. Componente de Publicidad: Banner Rotativo con Impresiones y Clics */}
      <SponsoredBanner />

      {/* Barra de Filtros, Búsqueda y Botón del Carrito */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Input de Búsqueda */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3.5 top-3 text-slate-400">🔍</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar libros, plantas, tecnología, deco..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Chips de Categorías */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Todos los Objetos' : cat}
            </button>
          ))}
        </div>

        {/* Botón Carrito Flotante */}
        <button
          onClick={() => setShowCartDrawer(!showCartDrawer)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 shadow transition"
        >
          <span>🛒</span>
          <span>{showCartDrawer ? 'Ocultar Carrito' : 'Abrir Carrito'}</span>
        </button>
      </div>

      {/* Drawer / Vista del Carrito si está activado */}
      {showCartDrawer && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <Cart
            userSubscriptionTier={userTier}
            userEmail="usuario.demo@ecoswap.eco"
            userName="Demostración EcoSwap"
          />
        </div>
      )}

      {/* Cabecera del Catálogo */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>🌿</span> Catálogo Comunitario Sustentable
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Productos con inyección de items patrocinados cada 5 elementos
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          {displayedProducts.length} productos listados
        </span>
      </div>

      {/* Grid de Productos con Distintivo de Patrocinado (Ad) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map((product) => {
          return (
            <article
              key={product.id}
              className={`group flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 border ${
                product.isSponsored
                  ? 'border-2 border-amber-400 dark:border-amber-500 ring-2 ring-amber-400/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Imagen con badge */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge de Patrocinado (Ad) */}
                {product.isSponsored && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md flex items-center gap-1">
                    <span>⚡</span>
                    <span>Patrocinado (Ad)</span>
                  </div>
                )}

                {/* Badge de Condición o Distancia */}
                {!product.isSponsored && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 text-white backdrop-blur-md">
                    🌿 {product.condition}
                  </div>
                )}

                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-sm shadow">
                  📍 {product.distance}
                </div>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="flex-1 p-5 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      {product.category}
                    </span>
                    {product.stock < 5 && (
                      <span className="text-[10px] font-extrabold text-rose-500 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                        ¡Solo {product.stock} disponibles!
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-bold">
                      ⭐ {product.points} EcoPuntos
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCartDrawer(true)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition shadow-sm ${
                      product.isSponsored
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {product.isSponsored ? 'Ver Oferta Ad' : '🛒 Agregar'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

