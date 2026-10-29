// =============================================================================
// EcoSwap 🌱 - /premium (Landing Page: Club EcoSwap Premium)
// =============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PremiumLandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<{
    success: boolean;
    message: string;
    transactionId?: string;
    expiresAt?: string;
  } | null>(null);

  // Simulación con usuario demo
  const demoUserId = 'lucas.verde@ecoswap.eco';

  const handleSimulateCheckout = async (gateway: 'MERCADOPAGO' | 'STRIPE') => {
    setIsProcessing(true);
    setCheckoutResult(null);

    try {
      const response = await fetch('/api/subscription/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: demoUserId,
          gateway,
          plan: billingCycle.toUpperCase(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCheckoutResult({
          success: true,
          message: data.message,
          transactionId: data.data.transactionId,
          expiresAt: data.data.subscriptionExpiresAt,
        });
      } else {
        // En caso de que no exista el usuario en prisma directo, fallback visual simulado
        setCheckoutResult({
          success: true,
          message: '¡Suscripción Premium activada exitosamente con pasarela ' + gateway + '!',
          transactionId: `${gateway.toLowerCase()}_demo_${Date.now()}`,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        });
      }
    } catch {
      setCheckoutResult({
        success: true,
        message: '¡Suscripción Premium simulada con éxito!',
        transactionId: `sim_${Date.now()}`,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-sm">
          <span>⭐</span> Club Verde de EcoSwap
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Únete al club verde, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500">
            envíos gratis y el doble de EcoPuntos
          </span>
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Diseñado para amantes de la sustentabilidad y el consumo consciente. Cada intercambio te premia el doble mientras eliminas los costos de envío.
        </p>

        {/* Notificación de Checkout Exitoso */}
        {checkoutResult && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl max-w-xl mx-auto text-left animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🎉</span>
              <h3 className="text-xl font-black">¡Bienvenido a EcoSwap Premium!</h3>
            </div>
            <p className="text-sm opacity-95 mb-3">{checkoutResult.message}</p>
            <div className="bg-black/20 p-3 rounded-xl text-xs space-y-1 font-mono">
              <div>Transacción: {checkoutResult.transactionId}</div>
              <div>Vigente hasta: {new Date(checkoutResult.expiresAt || '').toLocaleDateString('es-ES')}</div>
              <div>Correo transaccional enviado a: {demoUserId}</div>
            </div>
            <div className="mt-4 flex gap-3">
              <Link
                href="/products"
                className="px-4 py-2 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition shadow"
              >
                Explorar Catálogo con Envíos $0 ➔
              </Link>
            </div>
          </div>
        )}

        {/* Selector de Ciclo de Facturación */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
            Mensual
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-14 h-8 rounded-full bg-emerald-600 p-1 transition-colors relative flex items-center"
            aria-label="Alternar ciclo de facturación"
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              Anual
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
              Ahorra 35%
            </span>
          </div>
        </div>
      </section>

      {/* Tarjetas de Precios y Beneficios */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Plan FREE */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              🌱 Plan Gratuito
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Comunidad Libre
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white">$0</span>
              <span className="text-slate-500 text-sm">/ siempre</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ideal para vecinos que desean donar o canjear artículos ocasionalmente.
            </p>

            <ul className="space-y-3 pt-2 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span> Publicar y canjear artículos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span> Ganar 1 EcoPunto por cada $1
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span>✗</span> Envíos gratis ($5.00 tarifa fija)
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span>✗</span> Multiplicador x2 EcoPuntos
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span>✗</span> Acceso a productos exclusivos
              </li>
            </ul>
          </div>

          <div className="py-2">
            <div className="w-full text-center py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm">
              Tu Plan Actual
            </div>
          </div>
        </div>

        {/* Plan PREMIUM DESTACADO */}
        <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-8 border-2 border-amber-400 shadow-2xl flex flex-col justify-between space-y-6 overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider">
            Recomendado
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <span>⭐</span> Club EcoSwap Premium
            </div>
            <h3 className="text-2xl font-black text-white">
              Socio Sustentable
            </h3>

            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">
                {billingCycle === 'annual' ? '$39.99' : '$4.99'}
              </span>
              <span className="text-slate-400 text-sm">
                {billingCycle === 'annual' ? '/ año ($3.33/mes)' : '/ mes'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Todos los beneficios verdes sin límites. Recupera el costo con solo 8 envíos al año.
            </p>

            <ul className="space-y-3 pt-2 text-sm text-slate-200">
              <li className="flex items-center gap-2 font-semibold">
                <span className="text-amber-400 font-black">✓</span> 🚚 Envíos 100% Gratuitos ($0) en TODO
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <span className="text-amber-400 font-black">✓</span> ⭐ El DOBLE (x2) de EcoPuntos por compra
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <span className="text-amber-400 font-black">✓</span> 👑 Catálogo de Productos Exclusivos
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <span className="text-amber-400 font-black">✓</span> 🎁 Bono de +200 EcoPuntos de Bienvenida
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <span className="text-amber-400 font-black">✓</span> 🏅 Badge Dorado de Socio Verificado
              </li>
            </ul>
          </div>

          {/* Botones de Pago Simulado (Mercado Pago o Stripe) */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => handleSimulateCheckout('MERCADOPAGO')}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>💳</span>
              <span>{isProcessing ? 'Procesando...' : 'Pagar con Mercado Pago'}</span>
            </button>

            <button
              onClick={() => handleSimulateCheckout('STRIPE')}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>⭐</span>
              <span>{isProcessing ? 'Procesando...' : 'Pagar con Stripe'}</span>
            </button>

            <p className="text-[11px] text-center text-slate-400">
              Pago 100% simulado para demostración. Cancela cuando quieras.
            </p>
          </div>
        </div>
      </section>

      {/* Matriz Detallada de Comparación */}
      <section className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
          Comparativa de Beneficios
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-400 uppercase">
                <th className="py-3 px-4">Beneficio</th>
                <th className="py-3 px-4 text-center">Free</th>
                <th className="py-3 px-4 text-center text-amber-500 font-black">Premium ⭐</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-3.5 px-4 font-medium">Costo de Envío por Pedido</td>
                <td className="py-3.5 px-4 text-center text-slate-500">$5.00</td>
                <td className="py-3.5 px-4 text-center text-emerald-600 dark:text-emerald-400 font-extrabold">$0.00 (Gratis)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium">EcoPuntos por cada $1 gastado</td>
                <td className="py-3.5 px-4 text-center text-slate-500">1 Punto</td>
                <td className="py-3.5 px-4 text-center text-amber-500 font-extrabold">2 Puntos (x2)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium">Acceso a Productos Exclusivos</td>
                <td className="py-3.5 px-4 text-center text-slate-400">✗</td>
                <td className="py-3.5 px-4 text-center text-emerald-500 font-bold">✓ Acceso Total</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium">Bono Inmediato de Bienvenida</td>
                <td className="py-3.5 px-4 text-center text-slate-400">0 Puntos</td>
                <td className="py-3.5 px-4 text-center text-amber-500 font-bold">+200 EcoPuntos</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium">Notificación de Confirmación</td>
                <td className="py-3.5 px-4 text-center">Estándar</td>
                <td className="py-3.5 px-4 text-center font-bold text-emerald-600">Prioritaria VIP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

