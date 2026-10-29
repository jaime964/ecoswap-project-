// =============================================================================
// EcoSwap 🌱 - Cart.tsx (Lógica del Carrito de Compras con Beneficios Premium)
// =============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  points: number;
  quantity: number;
  imageUrl: string;
}

interface CartProps {
  userSubscriptionTier?: 'FREE' | 'PREMIUM';
  initialItems?: CartItem[];
  userEmail?: string;
  userName?: string;
}

export default function Cart({
  userSubscriptionTier = 'FREE',
  initialItems = [
    {
      id: 'item-1',
      title: 'Cafetera de émbolo (Vidrio Borosilicato)',
      price: 24.5,
      points: 120,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'item-2',
      title: 'Monstera Deliciosa en maceta artesanal',
      price: 12.0,
      points: 40,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=300&q=80',
    },
  ],
  userEmail = 'usuario@ecoswap.eco',
  userName = 'Usuario Eco',
}: CartProps) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [tier, setTier] = useState<'FREE' | 'PREMIUM'>(userSubscriptionTier);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<string | null>(null);

  const isPremium = tier === 'PREMIUM';

  // Cálculos de montos
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // REQUISITO: Si el usuario es PREMIUM, el costo de envío es automáticamente $0
  const STANDARD_SHIPPING = 5.0;
  const shippingCost = isPremium || items.length === 0 ? 0.0 : STANDARD_SHIPPING;
  const totalAmount = subtotal + shippingCost;

  // REQUISITO: Si el usuario es PREMIUM, el cálculo de EcoPuntos se multiplica por 2
  const basePointsPerDollar = 1;
  const multiplier = isPremium ? 2 : 1;
  const ecoPointsEarned = Math.floor(subtotal * basePointsPerDollar * multiplier);

  const handleQuantityChange = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);

    try {
      // Simular llamada de confirmación de orden
      await new Promise((r) => setTimeout(r, 1200));

      const generatedOrderId = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderCompleted(generatedOrderId);
      setItems([]);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto">
      {/* Selector de modo para pruebas en tiempo real */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            🛒 Tu Carrito de Compras
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comercio circular y recompensas en EcoPuntos
          </p>
        </div>

        {/* Badge interactivo del estado de membresía */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Nivel:
          </span>
          <button
            onClick={() => setTier(isPremium ? 'FREE' : 'PREMIUM')}
            title="Alternar entre FREE y PREMIUM para probar beneficios"
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              isPremium
                ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <span>{isPremium ? '⭐ PREMIUM' : '🌱 FREE'}</span>
            <span className="text-[10px] underline">(cambiar)</span>
          </button>
        </div>
      </div>

      {orderCompleted ? (
        <div className="text-center py-10 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
            ✅
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            ¡Orden #{orderCompleted} Confirmada!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            Hemos enviado un correo con el desglose ecológico a <strong>{userEmail}</strong>.
            ¡Has ganado <strong>+{ecoPointsEarned} EcoPuntos</strong> {isPremium && '(con beneficio x2 Premium)'}!
          </p>
          <button
            onClick={() => setOrderCompleted(null)}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition"
          >
            Seguir explorando
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-4xl mb-2">🍃</p>
          <p className="font-semibold">Tu carrito está vacío</p>
          <Link
            href="/products"
            className="inline-block mt-4 text-sm font-bold text-emerald-600 hover:underline"
          >
            Ir al Catálogo de Productos ➔
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Banner de Ventajas Premium */}
          {isPremium ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/30 dark:to-emerald-950/30 border border-amber-200 dark:border-amber-800 flex items-center gap-3">
              <span className="text-2xl">👑</span>
              <div className="text-xs md:text-sm">
                <span className="font-bold text-amber-900 dark:text-amber-300">
                  ¡Beneficios de EcoSwap Premium Aplicados!
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Tu envío es <strong>100% GRATIS</strong> y estás recibiendo el <strong>DOBLE (x2) de EcoPuntos</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3">
              <div className="text-xs md:text-sm">
                <span className="font-bold text-emerald-900 dark:text-emerald-300">
                  ¿Quieres Envío Gratis en esta compra?
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Únete a EcoSwap Premium: ahorra ${STANDARD_SHIPPING.toFixed(2)} de envío y duplica tus puntos.
                </p>
              </div>
              <Link
                href="/premium"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap shadow transition"
              >
                Ser Premium ➔
              </Link>
            </div>
          )}

          {/* Lista de Items */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded-xl border border-slate-200 dark:border-slate-800"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                      {item.title}
                    </h4>
                    <span className="text-xs text-slate-500">
                      ${item.price.toFixed(2)} c/u • {item.points} Pts
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-sm font-bold text-slate-900 dark:text-white w-16 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de Costos y EcoPuntos */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal:</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                Costo de Envío:
                {isPremium && (
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                    PREMIUM
                  </span>
                )}
              </span>
              <span className={`font-semibold ${isPremium ? 'text-emerald-600 font-bold' : 'text-slate-900 dark:text-white'}`}>
                {isPremium ? '$0.00 (Envío Gratuito)' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800 text-base font-extrabold text-slate-900 dark:text-white">
              <span>Total a Pagar:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            {/* Recompensa de EcoPuntos con multiplicador x2 */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">⭐</span>
                <span className="font-medium text-emerald-900 dark:text-emerald-300">
                  EcoPuntos a obtener con esta compra:
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                  +{ecoPointsEarned} Pts
                </span>
                {isPremium && (
                  <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    (x2 Multiplicador Premium)
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botón de Finalizar Compra */}
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base shadow-lg hover:shadow-emerald-500/25 transition-all transform active:scale-[0.99] disabled:opacity-50"
          >
            {isCheckingOut ? 'Procesando Pago Seguro...' : `Pagar $${totalAmount.toFixed(2)}`}
          </button>
        </div>
      )}
    </div>
  );
}

