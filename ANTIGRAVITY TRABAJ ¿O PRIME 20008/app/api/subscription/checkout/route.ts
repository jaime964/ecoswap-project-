// =============================================================================
// EcoSwap 🌱 - API Route: /api/subscription/checkout
// Pasarela de pago simulada (Stripe / Mercado Pago) para Membresía Premium
// =============================================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendWelcomePremiumEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, gateway = 'MERCADOPAGO', plan = 'ANNUAL' } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'El parámetro userId es requerido para procesar la suscripción.' },
        { status: 400 }
      );
    }

    // Buscar usuario en base de datos
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado en la plataforma.' },
        { status: 404 }
      );
    }

    // Calcular fecha de expiración
    const expiresAt = new Date();
    if (plan === 'ANNUAL') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    // Simular identificador de transacción en Stripe o Mercado Pago
    const transactionReference = gateway === 'STRIPE'
      ? `cs_test_${Math.random().toString(36).substring(2, 14)}`
      : `mp_sub_${Math.random().toString(36).substring(2, 14)}`;

    // Actualizar usuario en Prisma
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: 'PREMIUM',
        subscriptionExpiresAt: expiresAt,
        stripeCustomerId: gateway === 'STRIPE' ? transactionReference : user.stripeCustomerId,
        mercadoPagoId: gateway === 'MERCADOPAGO' ? transactionReference : user.mercadoPagoId,
        ecoPoints: { increment: 200 }, // Bono de 200 EcoPuntos por suscripción
      },
    });

    // Disparar correo de confirmación y bienvenida Premium
    await sendWelcomePremiumEmail(updatedUser.email, updatedUser.name, expiresAt);

    return NextResponse.json({
      success: true,
      message: 'Membresía EcoSwap Premium activada con éxito.',
      data: {
        subscriptionTier: updatedUser.subscriptionTier,
        subscriptionExpiresAt: updatedUser.subscriptionExpiresAt,
        gateway,
        transactionId: transactionReference,
        ecoPoints: updatedUser.ecoPoints,
        perks: [
          'Envíos gratuitos ($0) en todas las órdenes',
          'Multiplicador de EcoPuntos x2 en cada compra',
          'Acceso inmediato a productos exclusivos del catálogo',
        ],
      },
    });
  } catch (error: unknown) {
    console.error('Error en /api/subscription/checkout:', error);
    return NextResponse.json(
      {
        error: 'Error interno al procesar el checkout de la suscripción.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

