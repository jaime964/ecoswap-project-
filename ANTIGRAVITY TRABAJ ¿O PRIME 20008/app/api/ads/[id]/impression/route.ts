// =============================================================================
// EcoSwap 🌱 - API Route: /api/ads/[id]/impression (Registro de Visualización)
// =============================================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const updated = await prisma.adCampaign.update({
      where: { id },
      data: {
        impressions: { increment: 1 },
      },
      select: { id: true, impressions: true, clicks: true },
    });

    return NextResponse.json({
      success: true,
      impressions: updated.impressions,
    });
  } catch (error: unknown) {
    console.error('Error al registrar impresión de anuncio:', error);
    return NextResponse.json(
      { error: 'No se pudo contabilizar la impresión.' },
      { status: 500 }
    );
  }
}

