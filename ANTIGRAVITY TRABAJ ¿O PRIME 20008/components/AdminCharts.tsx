// =============================================================================
// EcoSwap 🌱 - AdminCharts.tsx (Gráficos Interactivos de Ingresos & Usuarios)
// =============================================================================

'use client';

import React from 'react';

interface AdminChartsProps {
  freeUsersCount?: number;
  premiumUsersCount?: number;
  totalRevenue?: number;
}

export default function AdminCharts({
  freeUsersCount = 1840,
  premiumUsersCount = 420,
  totalRevenue = 28450.0,
}: AdminChartsProps) {
  const totalUsers = freeUsersCount + premiumUsersCount;
  const premiumPct = Math.round((premiumUsersCount / totalUsers) * 100);
  const freePct = 100 - premiumPct;

  // Datos simulados de ingresos mensuales (en miles de USD)
  const monthlyRevenue = [
    { month: 'May', subs: 12.4, ads: 4.8 },
    { month: 'Jun', subs: 14.2, ads: 6.1 },
    { month: 'Jul', subs: 18.0, ads: 7.5 },
    { month: 'Ago', subs: 21.5, ads: 9.2 },
    { month: 'Sep', subs: 25.1, ads: 11.0 },
    { month: 'Oct', subs: 28.4, ads: 13.6 },
  ];

  const maxVal = 45; // escala max en miles

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Gráfico 1: Evolución de Ingresos Totales (Suscripciones + Ads) */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📈</span> Ingresos Totales por Monetización
            </h3>
            <p className="text-xs text-slate-500">
              Desglose mensual de Suscripciones Premium ($39.99/año) y Campañas Publicitarias
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              Suscripciones
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              Publicidad Ads
            </span>
          </div>
        </div>

        {/* Gráfico de Barras / Áreas Responsive en SVG */}
        <div className="pt-6 pb-2">
          <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-200 dark:border-slate-800">
            {monthlyRevenue.map((item) => {
              const heightSubs = (item.subs / maxVal) * 100;
              const heightAds = (item.ads / maxVal) * 100;

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full max-w-[42px] flex flex-col items-center justify-end h-full relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap z-20 shadow">
                      Total: ${(item.subs + item.ads).toFixed(1)}k
                    </div>

                    {/* Barra de Publicidad */}
                    <div
                      style={{ height: `${heightAds}%` }}
                      className="w-full bg-amber-400 group-hover:bg-amber-300 rounded-t-sm transition-all"
                    />

                    {/* Barra de Suscripciones */}
                    <div
                      style={{ height: `${heightSubs}%` }}
                      className="w-full bg-emerald-500 group-hover:bg-emerald-400 rounded-b-md transition-all"
                    />
                  </div>

                  <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400">MRR Suscripciones:</span>
            <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              $14,850 / mes
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400">Facturación Ads:</span>
            <div className="text-base font-extrabold text-amber-500">
              $13,600 / mes
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400">Crecimiento MoM:</span>
            <div className="text-base font-extrabold text-slate-900 dark:text-white">
              +18.4% 🚀
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico 2: Distribución de Usuarios (Premium vs Free) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>👥</span> Ratio de Usuarios
          </h3>
          <p className="text-xs text-slate-500">
            Distribución entre comunidad Gratuita y Miembros Club Verde
          </p>
        </div>

        {/* Representación Circular Donut en SVG */}
        <div className="flex flex-col items-center justify-center py-2 relative">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
            {/* Fondo base (FREE) */}
            <path
              className="text-slate-100 dark:text-slate-800"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Anillo Premium */}
            <path
              className="text-amber-400 transition-all duration-1000 ease-out"
              strokeDasharray={`${premiumPct}, 100`}
              strokeWidth="4"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>

          {/* Texto central en el donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {premiumPct}%
            </span>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
              Premium
            </span>
          </div>
        </div>

        {/* Leyenda y detalles */}
        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Socios Premium
              </span>
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {premiumUsersCount} usuarios
            </span>
          </div>

          <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Usuarios Free
              </span>
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {freeUsersCount} usuarios
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

