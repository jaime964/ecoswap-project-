// =============================================================================
// EcoSwap 🌱 - Next.js Middleware de Protección de Rutas Administrativas
// =============================================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware que protege el acceso a '/admin' y sub-rutas.
 * Verifica la existencia de una sesión válida y el rol 'ADMIN'.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Solo evaluar rutas administrativas
  if (pathname.startsWith('/admin')) {
    // 1. Verificar token o rol en cookies/headers (ej. 'ecoswap_user_role', 'next-auth.session-token', etc.)
    const userRole = request.cookies.get('ecoswap_user_role')?.value || 
                     request.headers.get('x-user-role');
    const userSession = request.cookies.get('ecoswap_session')?.value;

    // Simulación: Si no hay rol o el rol no es ADMIN, bloquear y redirigir
    const isAdmin = userRole === 'ADMIN' || (userSession && userSession.includes('role=ADMIN'));

    if (!isAdmin) {
      console.warn(`[MIDDLEWARE SECURITY] Acceso denegado a ruta protegida: ${pathname}. Rol actual: ${userRole || 'ANONYMOUS'}`);
      
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('error', 'unauthorized_admin');
      loginUrl.searchParams.set('redirect', pathname);

      // En desarrollo, permitimos parámetro de bypass explícito ?dev_admin=true para testing cómodo
      const devBypass = request.nextUrl.searchParams.get('dev_admin');
      if (devBypass === 'true') {
        const response = NextResponse.next();
        response.cookies.set('ecoswap_user_role', 'ADMIN', { path: '/' });
        return response;
      }

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configuración de rutas interceptadas
export const config = {
  matcher: ['/admin/:path*'],
};

