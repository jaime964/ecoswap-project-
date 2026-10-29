// =============================================================================
// EcoSwap 🌱 - API Route: /api/ads (Motor de Anuncios Interno)
// =============================================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const activeCampaigns = await prisma.adCampaign.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      count: activeCampaigns.length,
      data: activeCampaigns,
    });
  } catch (error: unknown) {
    console.error('Error al obtener campañas en /api/ads:', error);
    return NextResponse.json(
      { error: 'Error al consultar campañas publicitarias activas.' },
      { status: 500 }
    );
  }
}

