import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'EcoSwap 🌱 | Plataforma de Intercambio Ecológico y E-Commerce Circular',
  description:
    'Dale una segunda vida a tus cosas. Intercambia, compra sustentable y únete al Club EcoSwap Premium para envíos gratis y el doble de EcoPuntos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 py-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p className="font-bold text-slate-700 dark:text-slate-300">
              EcoSwap 🌱 • Plataforma de Impacto Comunitario y Comercio Circular
            </p>
            <p>
              Fase 3: Monetización, Motor de Anuncios y Panel de Administración Avanzado.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

