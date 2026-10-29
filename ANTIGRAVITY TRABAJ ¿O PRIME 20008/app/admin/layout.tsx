// =============================================================================
// EcoSwap 🌱 - app/admin/layout.tsx (Sidebar Layout Responsivo para Admin Dashboard)
// =============================================================================

import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[85vh] flex flex-col md:flex-row gap-8">
      {/* Sidebar de Navegación Administrativa */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24 space-y-6">
          {/* Cabecera del Sidebar */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl font-bold">
              🛡️
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 dark:text-white">
                EcoSwap Admin
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Rol: SUPERADMIN
              </span>
            </div>
          </div>

          {/* Menú de Accesos Rápidos */}
          <nav className="space-y-1">
            <Link
              href="/admin?tab=overview"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span>📊</span>
              <span>Dashboard General</span>
            </Link>
            <Link
              href="/admin?tab=users"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span>👥</span>
              <span>Gestor de Usuarios</span>
            </Link>
            <Link
              href="/admin?tab=ads"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span>📢</span>
              <span>Gestor de Publicidad</span>
            </Link>
            <Link
              href="/admin?tab=inventory"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span>📦</span>
              <span>Gestor de Inventario</span>
            </Link>
          </nav>

          {/* Widget de Estado del Middleware */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
            <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Protección Middleware Activa
            </div>
            <p className="text-slate-500 text-[10px]">
              Rutas <code>/admin/*</code> verificadas por <code>middleware.ts</code> (Rol ADMIN requerido).
            </p>
          </div>

          {/* Enlace de Regreso */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/products"
              className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
            >
              <span>‹</span> Volver a la Tienda
            </Link>
          </div>
        </div>
      </aside>

      {/* Contenido Principal del Panel */}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}

