// =============================================================================
// EcoSwap 🌱 - API Route: /api/ads/[id]/click (Registro de Clic & Redirección)
// =============================================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const campaign = await prisma.adCampaign.update({
      where: { id },
      data: {
        clicks: { increment: 1 },
      },
      select: { id: true, clicks: true, impressions: true, targetUrl: true },
    });

    const ctr = campaign.impressions > 0
      ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2)
      : '0.00';

    return NextResponse.json({
      success: true,
      clicks: campaign.clicks,
      ctr: `${ctr}%`,
      targetUrl: campaign.targetUrl,
    });
  } catch (error: unknown) {
    console.error('Error al registrar clic publicitario:', error);
    return NextResponse.json(
      { error: 'No se pudo contabilizar el clic.' },
      { status: 500 }
    );
  }
}

