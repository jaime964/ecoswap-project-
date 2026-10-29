// =============================================================================
// EcoSwap 🌱 - app/admin/page.tsx (Admin Dashboard v2 con 4 Pestañas y Server Actions)
// =============================================================================

'use client';

import React, { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminCharts from '@/components/AdminCharts';
import {
  createAdCampaignAction,
  toggleAdCampaignStatusAction,
  updateProductStockAndPriceAction,
  toggleUserStatusAction,
  toggleUserRoleAction,
} from '@/app/actions/admin';

// Tipos para estado local reactivo
interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED';
  subscriptionTier: 'FREE' | 'PREMIUM';
  ecoPoints: number;
}

interface CampaignItem {
  id: string;
  title: string;
  imageUrl: string;
  targetUrl: string;
  budget: number;
  status: 'ACTIVE' | 'PAUSED';
  clicks: number;
  impressions: number;
}

interface InventoryProductItem {
  id: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  isSponsored: boolean;
}

export default function AdminPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [isPending, startTransition] = useTransition();
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 1. Estado de Usuarios
  const [users, setUsers] = useState<UserItem[]>([
    {
      id: 'usr-1',
      name: 'Admin General EcoSwap',
      email: 'admin@ecoswap.eco',
      role: 'ADMIN',
      status: 'ACTIVE',
      subscriptionTier: 'PREMIUM',
      ecoPoints: 1200,
    },
    {
      id: 'usr-2',
      name: 'Lucas Verde (Premium)',
      email: 'lucas.verde@ecoswap.eco',
      role: 'USER',
      status: 'ACTIVE',
      subscriptionTier: 'PREMIUM',
      ecoPoints: 650,
    },
    {
      id: 'usr-3',
      name: 'Camila Ríos',
      email: 'camila.eco@gmail.com',
      role: 'USER',
      status: 'ACTIVE',
      subscriptionTier: 'FREE',
      ecoPoints: 250,
    },
    {
      id: 'usr-4',
      name: 'Usuario Spam Reportado',
      email: 'usuario.spam@example.com',
      role: 'USER',
      status: 'SUSPENDED',
      subscriptionTier: 'FREE',
      ecoPoints: 0,
    },
  ]);

  // 2. Estado de Campañas Publicitarias
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([
    {
      id: 'ad-1',
      title: '🌱 Huerto Urbano Sustentable: 30% OFF Semillas Orgánicas',
      imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a701?auto=format&fit=crop&w=600&q=80',
      targetUrl: 'https://huertourbano.example.com',
      budget: 450.0,
      status: 'ACTIVE',
      impressions: 1420,
      clicks: 128,
    },
    {
      id: 'ad-2',
      title: '🚲 Bicicletas Eléctricas E-Ride: Movilidad Cero Emisiones',
      imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
      targetUrl: 'https://eride-mobility.example.com',
      budget: 800.0,
      status: 'ACTIVE',
      impressions: 3200,
      clicks: 295,
    },
    {
      id: 'ad-3',
      title: '☕ Café de Especialidad en Cápsulas Compostables 100%',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      targetUrl: 'https://compostablecafe.example.com',
      budget: 250.0,
      status: 'PAUSED',
      impressions: 890,
      clicks: 64,
    },
  ]);

  // 3. Estado de Inventario para Edición Rápida (Inline Editing)
  const [inventory, setInventory] = useState<InventoryProductItem[]>([
    {
      id: 'prod-1',
      title: 'Libro de Programación en React & TypeScript',
      category: 'Libros',
      price: 15.0,
      stock: 8,
      isSponsored: false,
    },
    {
      id: 'prod-2',
      title: 'Cafetera de émbolo (Vidrio Borosilicato)',
      category: 'Electrodomésticos',
      price: 24.5,
      stock: 3, // ALERTA STOCK CRÍTICO (< 5)
      isSponsored: false,
    },
    {
      id: 'prod-3',
      title: 'Monstera Deliciosa en maceta artesanal',
      category: 'Plantas & Jardín',
      price: 12.0,
      stock: 12,
      isSponsored: false,
    },
    {
      id: 'prod-4',
      title: 'Auriculares Bluetooth Cancelación de Ruido',
      category: 'Tecnología',
      price: 49.0,
      stock: 2, // ALERTA STOCK CRÍTICO (< 5)
      isSponsored: false,
    },
    {
      id: 'prod-5',
      title: 'Chaqueta Denim Vintage Upcycled',
      category: 'Moda Sostenible',
      price: 32.0,
      stock: 4, // ALERTA STOCK CRÍTICO (< 5)
      isSponsored: false,
    },
    {
      id: 'prod-6',
      title: '⭐ Kit Solar Portátil de Emergencia [AD]',
      category: 'Tecnología',
      price: 54.0,
      stock: 15,
      isSponsored: true,
    },
  ]);

  // Estados temporales para inline-editing
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  // Manejador: Crear nueva campaña (Server Action)
  const handleCreateCampaign = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await createAdCampaignAction(formData);
      if (res.success) {
        setNotification({ type: 'success', text: res.message });
        const newCampaign: CampaignItem = {
          id: `ad_${Date.now()}`,
          title: formData.get('title') as string,
          imageUrl: formData.get('imageUrl') as string,
          targetUrl: formData.get('targetUrl') as string,
          budget: parseFloat(formData.get('budget') as string) || 100,
          status: 'ACTIVE',
          clicks: 0,
          impressions: 0,
        };
        setCampaigns((prev) => [newCampaign, ...prev]);
        form.reset();
      } else {
        setNotification({ type: 'error', text: res.message });
      }
    });
  };

  // Manejador: Alternar estado de campaña
  const handleToggleCampaignStatus = (campaignId: string, currentStatus: 'ACTIVE' | 'PAUSED') => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    startTransition(async () => {
      await toggleAdCampaignStatusAction(campaignId, nextStatus);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === campaignId ? { ...c, status: nextStatus } : c))
      );
      setNotification({
        type: 'success',
        text: `Campaña ${nextStatus === 'ACTIVE' ? 'activada' : 'pausada'} con éxito.`,
      });
    });
  };

  // Manejador: Suspender / Activar usuario
  const handleToggleUserStatus = (userId: string, currentStatus: 'ACTIVE' | 'SUSPENDED') => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    startTransition(async () => {
      await toggleUserStatusAction(userId, nextStatus);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: nextStatus } : u))
      );
      setNotification({
        type: 'success',
        text: `Estado del usuario cambiado a ${nextStatus}.`,
      });
    });
  };

  // Manejador: Cambiar rol de usuario
  const handleToggleUserRole = (userId: string, currentRole: 'USER' | 'ADMIN') => {
    const nextRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    startTransition(async () => {
      await toggleUserRoleAction(userId, nextRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u))
      );
      setNotification({
        type: 'success',
        text: `Rol de usuario actualizado a ${nextRole}.`,
      });
    });
  };

  // Manejador: Guardar edición rápida de stock y precio (Inline Editing)
  const handleSaveInlineEdit = (productId: string, isSponsored: boolean) => {
    startTransition(async () => {
      const res = await updateProductStockAndPriceAction(productId, editStock, editPrice, isSponsored);
      setInventory((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, price: editPrice, stock: editStock } : p
        )
      );
      setEditingRowId(null);
      setNotification({
        type: 'success',
        text: res.message || 'Inventario actualizado correctamente.',
      });
    });
  };

  // Manejador: Alternar patrocinio de un producto
  const handleToggleSponsoredProduct = (productId: string, current: boolean) => {
    const product = inventory.find((p) => p.id === productId);
    if (!product) return;
    startTransition(async () => {
      await updateProductStockAndPriceAction(productId, product.stock, product.price, !current);
      setInventory((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, isSponsored: !current } : p))
      );
      setNotification({
        type: 'success',
        text: `Producto ${!current ? 'marcado como PATROCINADO (Ad)' : 'removido de patrocinados'}.`,
      });
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner de Notificaciones Toast / Alert */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between shadow-md transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-500 text-white'
              : 'bg-rose-500 text-white'
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-bold">
            <span>{notification.type === 'success' ? '✅' : '❌'}</span>
            <span>{notification.text}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-white hover:opacity-75 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navegación por pestañas superiores */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>📊</span> Dashboard General
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>👥</span> Gestor de Usuarios
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'ads'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>📢</span> Gestor de Publicidad
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'inventory'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>📦</span> Gestor de Inventario
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* PESTAÑA 1: Dashboard General (Métricas y Gráficos)                 */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Tarjetas KPI */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500">Ingresos Totales (YTD)</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">$28,450.00</div>
              <span className="text-[10px] text-emerald-500 font-bold">+24% este mes</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500">Usuarios Premium Activos</span>
              <div className="text-2xl font-black text-amber-500">420 socios</div>
              <span className="text-[10px] text-slate-400">18.6% del total</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500">Campañas Publicitarias</span>
              <div className="text-2xl font-black text-indigo-500">3 activas</div>
              <span className="text-[10px] text-slate-400">CTR promedio: 8.8%</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500">EcoPuntos Circulados</span>
              <div className="text-2xl font-black text-emerald-600">84,500 Pts</div>
              <span className="text-[10px] text-emerald-500 font-bold">~1,840 kg CO₂ evitado</span>
            </div>
          </div>

          {/* Gráficos Recharts / SVG */}
          <AdminCharts
            freeUsersCount={1840}
            premiumUsersCount={420}
            totalRevenue={28450.0}
          />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* PESTAÑA 2: Gestor de Usuarios                                      */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>👥</span> Gestor de Usuarios & Membresías
              </h3>
              <p className="text-xs text-slate-500">
                Visualiza niveles de suscripción, suspende cuentas infractoras o promueve a rol de Administrador.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
              {users.length} usuarios registrados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[11px]">
                  <th className="py-3 px-3">Usuario</th>
                  <th className="py-3 px-3">Membresía</th>
                  <th className="py-3 px-3">Rol</th>
                  <th className="py-3 px-3">Estado</th>
                  <th className="py-3 px-3">EcoPuntos</th>
                  <th className="py-3 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                          u.subscriptionTier === 'PREMIUM'
                            ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {u.subscriptionTier === 'PREMIUM' ? '⭐ PREMIUM' : '🌱 FREE'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                          u.role === 'ADMIN'
                            ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold ${
                          u.status === 'ACTIVE'
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                            : 'text-rose-600 bg-rose-50 dark:bg-rose-950/40'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            u.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                        {u.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-emerald-600">
                      {u.ecoPoints} Pts
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Botón Cambiar Rol Admin */}
                        <button
                          onClick={() => handleToggleUserRole(u.id, u.role)}
                          disabled={isPending}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                        >
                          {u.role === 'ADMIN' ? 'Quitar Admin' : 'Hacer Admin'}
                        </button>

                        {/* Botón Suspender / Reactivar */}
                        <button
                          onClick={() => handleToggleUserStatus(u.id, u.status)}
                          disabled={isPending}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                            u.status === 'ACTIVE'
                              ? 'bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-950/60 dark:text-rose-300'
                              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                          }`}
                        >
                          {u.status === 'ACTIVE' ? 'Suspender' : 'Reactivar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* PESTAÑA 3: Gestor de Publicidad (Crear Anuncios & Métricas CTR)     */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'ads' && (
        <div className="space-y-6">
          {/* Formulario para Crear Nueva Campaña (Server Action) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>📢</span> Crear Nueva Campaña Publicitaria
            </h3>
            <p className="text-xs text-slate-500">
              Sube banners sustentables que se rotarán automáticamente en el componente <code>SponsoredBanner</code>.
            </p>

            <form onSubmit={handleCreateCampaign} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Título del Anuncio:
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Ej: 🚴‍♂️ Bicicletas Bambú: 20% OFF en tu primer canje"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  URL de Imagen (Banner):
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  required
                  defaultValue="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  URL de Destino (Target URL):
                </label>
                <input
                  type="url"
                  name="targetUrl"
                  required
                  defaultValue="https://ecoswap.eco"
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Presupuesto Asignado ($ USD):
                </label>
                <input
                  type="number"
                  name="budget"
                  required
                  min="10"
                  defaultValue="300"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition disabled:opacity-50"
                >
                  {isPending ? 'Guardando en BD...' : '➕ Publicar Campaña en Ad Server'}
                </button>
              </div>
            </form>
          </div>

          {/* Tabla de Campañas con CTR en tiempo real */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-base font-black text-slate-900 dark:text-white">
              Campañas Activas & Rendimiento CTR
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[11px]">
                    <th className="py-3 px-3">Campaña</th>
                    <th className="py-3 px-3">Presupuesto</th>
                    <th className="py-3 px-3">Impresiones</th>
                    <th className="py-3 px-3">Clics</th>
                    <th className="py-3 px-3">CTR (%)</th>
                    <th className="py-3 px-3">Estado</th>
                    <th className="py-3 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {campaigns.map((c) => {
                    const ctr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(2) : '0.00';
                    return (
                      <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="py-3.5 px-3 max-w-xs">
                          <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{c.title}</div>
                          <a
                            href={c.targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-emerald-600 hover:underline truncate block"
                          >
                            {c.targetUrl}
                          </a>
                        </td>

                        <td className="py-3.5 px-3 font-semibold">${c.budget.toFixed(2)}</td>

                        <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 font-mono">
                          {c.impressions.toLocaleString()}
                        </td>

                        <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 font-mono">
                          {c.clicks.toLocaleString()}
                        </td>

                        <td className="py-3.5 px-3 font-extrabold text-amber-500">
                          {ctr}%
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              c.status === 'ACTIVE'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => handleToggleCampaignStatus(c.id, c.status)}
                            disabled={isPending}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                              c.status === 'ACTIVE'
                                ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 dark:bg-amber-950/60 dark:text-amber-300'
                                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                            }`}
                          >
                            {c.status === 'ACTIVE' ? 'Pausar' : 'Reanudar'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* PESTAÑA 4: Gestor de Inventario con Edición Rápida (Inline)         */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'inventory' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>📦</span> Gestor de Inventario con Edición Rápida
              </h3>
              <p className="text-xs text-slate-500">
                Modifica precios y stock en tiempo real sin recargar la página. Si el stock cae a &lt; 5 unidades, se envía automáticamente el correo de alerta interna.
              </p>
            </div>
            <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/50 px-3 py-1 rounded-full border border-rose-200">
              ⚠️ Umbral Crítico: &lt; 5 unidades
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[11px]">
                  <th className="py-3 px-3">Producto</th>
                  <th className="py-3 px-3">Categoría</th>
                  <th className="py-3 px-3">Precio ($ USD)</th>
                  <th className="py-3 px-3">Stock Disponible</th>
                  <th className="py-3 px-3">Patrocinado (Ad)</th>
                  <th className="py-3 px-3 text-right">Acción Rápida</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {inventory.map((item) => {
                  const isEditing = editingRowId === item.id;
                  const isLowStock = item.stock < 5;

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/30 ${
                        isLowStock ? 'bg-rose-50/30 dark:bg-rose-950/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3 max-w-xs">
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {item.title}
                        </div>
                        {isLowStock && (
                          <span className="text-[10px] font-black text-rose-600 flex items-center gap-1 mt-0.5">
                            <span>⚠️</span> ¡Stock bajo! Alerta por correo enviada a admins
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-slate-500">{item.category}</td>

                      {/* Celda de Precio con Inline Edit */}
                      <td className="py-3.5 px-3 font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.5"
                            value={editPrice}
                            onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 rounded-lg border border-emerald-500 bg-white dark:bg-slate-800 text-xs font-bold outline-none"
                          />
                        ) : (
                          <span className="font-bold text-slate-900 dark:text-white">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </td>

                      {/* Celda de Stock con Inline Edit */}
                      <td className="py-3.5 px-3 font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            value={editStock}
                            onChange={(e) => setEditStock(parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 rounded-lg border border-emerald-500 bg-white dark:bg-slate-800 text-xs font-bold outline-none"
                          />
                        ) : (
                          <span
                            className={`font-black px-2 py-0.5 rounded-md ${
                              isLowStock
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200'
                                : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {item.stock} un.
                          </span>
                        )}
                      </td>

                      {/* Toggle de Patrocinio */}
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => handleToggleSponsoredProduct(item.id, item.isSponsored)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase transition ${
                            item.isSponsored
                              ? 'bg-amber-400 text-slate-950 shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          {item.isSponsored ? '⚡ Sí (Ad)' : 'No'}
                        </button>
                      </td>

                      {/* Botones de Acción Inline */}
                      <td className="py-3.5 px-3 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleSaveInlineEdit(item.id, item.isSponsored)}
                              disabled={isPending}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow transition"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditingRowId(null)}
                              className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingRowId(item.id);
                              setEditPrice(item.price);
                              setEditStock(item.stock);
                            }}
                            className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold transition"
                          >
                            ✏️ Editar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

