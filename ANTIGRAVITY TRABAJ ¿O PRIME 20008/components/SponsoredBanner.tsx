// =============================================================================
// EcoSwap 🌱 - SponsoredBanner.tsx (Ad Server Interno con Rotación & Tracking)
// =============================================================================

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

export interface AdCampaignItem {
  id: string;
  title: string;
  imageUrl: string;
  targetUrl: string;
  budget?: number;
  status?: string;
  clicks?: number;
  impressions?: number;
}

interface SponsoredBannerProps {
  initialCampaigns?: AdCampaignItem[];
  autoRotateIntervalMs?: number;
}

export default function SponsoredBanner({
  initialCampaigns = [],
  autoRotateIntervalMs = 7000,
}: SponsoredBannerProps) {
  const [campaigns, setCampaigns] = useState<AdCampaignItem[]>(initialCampaigns);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(initialCampaigns.length === 0);
  const trackedImpressions = useRef<Set<string>>(new Set());

  // Cargar campañas activas si no se pasaron como props iniciales
  useEffect(() => {
    if (initialCampaigns.length === 0) {
      fetch('/api/ads')
        .then((res) => res.json())
        .then((data) => {
          if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
            setCampaigns(data.data);
          }
        })
        .catch((err) => console.error('Error cargando anuncios:', err))
        .finally(() => setLoading(false));
    }
  }, [initialCampaigns]);

  const activeCampaign = campaigns[currentIndex];

  // Registrar impresión en la base de datos
  const trackImpression = useCallback(async (campaignId: string) => {
    // Evitar registrar impresiones duplicadas consecutivas en la misma sesión
    const key = `${campaignId}_${Date.now() - (Date.now() % 15000)}`;
    if (trackedImpressions.current.has(key)) return;
    trackedImpressions.current.add(key);

    try {
      await fetch(`/api/ads/${campaignId}/impression`, {
        method: 'POST',
      });
    } catch (err) {
      console.warn('No se pudo registrar la impresión del banner:', err);
    }
  }, []);

  // Registrar impresión cada vez que cambia el anuncio activo
  useEffect(() => {
    if (activeCampaign?.id) {
      trackImpression(activeCampaign.id);
    }
  }, [activeCampaign?.id, trackImpression]);

  // Rotador automático
  useEffect(() => {
    if (campaigns.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    }, autoRotateIntervalMs);

    return () => clearInterval(timer);
  }, [campaigns.length, autoRotateIntervalMs]);

  // Manejador de clics en el anuncio
  const handleAdClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!activeCampaign) return;

    try {
      // Registrar el clic en la API
      fetch(`/api/ads/${activeCampaign.id}/click`, {
        method: 'POST',
      }).catch((err) => console.warn('Error registrando clic:', err));
    } finally {
      // Abrir en pestaña nueva segura
      window.open(activeCampaign.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % campaigns.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + campaigns.length) % campaigns.length);
  };

  if (loading) {
    return (
      <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl flex items-center justify-center text-sm text-slate-400">
        Cargando publicidad sustentable...
      </div>
    );
  }

  if (!activeCampaign) {
    return null;
  }

  return (
    <section className="relative w-full my-6 overflow-hidden rounded-2xl border border-emerald-200 dark:border-emerald-900/60 shadow-md bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white">
      {/* Fondo con imagen y overlay oscuro */}
      <div className="absolute inset-0 z-0">
        <Image
          src={activeCampaign.imageUrl}
          alt={activeCampaign.title}
          fill
          sizes="100vw"
          className="object-cover opacity-25 mix-blend-overlay transition-opacity duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/70 to-emerald-950/80" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-5 md:p-6 gap-4">
        {/* Contenido textual del anuncio */}
        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm">
              ⚡ Patrocinado (Ad)
            </span>
            <span className="text-xs text-emerald-200 font-medium">
              Publicidad Sustentable Verificada
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-bold tracking-tight text-white line-clamp-2">
            {activeCampaign.title}
          </h3>

          <p className="text-xs md:text-sm text-slate-200 line-clamp-1">
            Impulsa marcas comprometidas con la neutralidad de carbono y la economía circular.
          </p>
        </div>

        {/* Botón de Acción y Controles de Navegación */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAdClick}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <span>Conocer más</span>
            <span aria-hidden="true">➔</span>
          </button>

          {/* Flechas de navegación para múltiples anuncios */}
          {campaigns.length > 1 && (
            <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl backdrop-blur-sm border border-white/10">
              <button
                onClick={handlePrev}
                aria-label="Anuncio anterior"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                aria-label="Siguiente anuncio"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Indicador de progreso / dots */}
      {campaigns.length > 1 && (
        <div className="relative z-10 flex justify-center pb-2 gap-1.5">
          {campaigns.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex ? 'w-6 bg-emerald-400' : 'w-2 bg-white/30'
              }`}
              aria-label={`Ir al anuncio ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

