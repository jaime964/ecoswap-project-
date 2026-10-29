import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white p-8 md:p-14 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <span>🌿</span> Fase 3: E-Commerce y Monetización Activa
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Economía Circular Inteligente con <span className="text-emerald-400">EcoSwap</span>
          </h1>
          <p className="text-base md:text-lg text-emerald-100/90 leading-relaxed">
            Intercambia productos locales, acumula EcoPuntos por reducir tu huella de carbono y
            descubre el modelo de negocio escalable con suscripciones Premium y anuncios patrocinados.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/products"
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg hover:shadow-emerald-500/30 transition transform hover:-translate-y-0.5"
            >
              Explorar Catálogo con Ads ➔
            </Link>
            <Link
              href="/premium"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-lg hover:shadow-amber-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>⭐</span> Unirse a EcoSwap Premium
            </Link>
            <Link
              href="/admin"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition backdrop-blur-sm"
            >
              🛡️ Admin Dashboard v2
            </Link>
          </div>
        </div>
      </section>

      {/* Grid de Tres Pilares de la Fase 3 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center text-2xl">
            ⭐
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Membresía EcoSwap Premium
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Envíos 100% gratuitos ($0) en todas las compras, multiplicador x2 de EcoPuntos automáticos y acceso a productos exclusivos.
          </p>
          <Link
            href="/premium"
            className="inline-block text-xs font-bold text-amber-600 hover:text-amber-500 hover:underline pt-2"
          >
            Ver Landing Page Premium ➔
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center text-2xl">
            📢
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Motor de Anuncios y Patrocinios
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Banners rotativos con registro en tiempo real de impresiones y clics, más inyección automática de productos patrocinados cada 5 items.
          </p>
          <Link
            href="/products"
            className="inline-block text-xs font-bold text-emerald-600 hover:text-emerald-500 hover:underline pt-2"
          >
            Ver Anuncios en Catálogo ➔
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center text-2xl">
            🛡️
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Admin Dashboard v2
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Sidebar con gráficos de ingresos y conversión, gestión de usuarios (suspender/hacer admin), métricas CTR y edición rápida de stock/precios.
          </p>
          <Link
            href="/admin"
            className="inline-block text-xs font-bold text-indigo-600 hover:text-indigo-500 hover:underline pt-2"
          >
            Abrir Panel Administrativo ➔
          </Link>
        </div>
      </section>
    </div>
  );
}

