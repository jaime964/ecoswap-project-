// =============================================================================
// EcoSwap 🌱 - Next.js 14 Server Actions (Admin, Monetización e Inventario)
// =============================================================================

'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { sendLowStockAlertEmail, sendWelcomePremiumEmail } from '@/lib/mailer';

export type ActionResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

/**
 * Server Action: Crear una nueva campaña publicitaria
 */
export async function createAdCampaignAction(formData: FormData): Promise<ActionResponse> {
  try {
    const title = formData.get('title') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const targetUrl = formData.get('targetUrl') as string;
    const budgetRaw = formData.get('budget') as string;
    const budget = parseFloat(budgetRaw) || 0.0;

    if (!title || !imageUrl || !targetUrl || budget <= 0) {
      return {
        success: false,
        message: 'Todos los campos son obligatorios y el presupuesto debe ser mayor a 0.',
      };
    }

    const campaign = await prisma.adCampaign.create({
      data: {
        title,
        imageUrl,
        targetUrl,
        budget,
        status: 'ACTIVE',
        impressions: 0,
        clicks: 0,
      },
    });

    revalidatePath('/admin');
    revalidatePath('/products');

    return {
      success: true,
      message: `Campaña "${title}" creada exitosamente con presupuesto de $${budget.toFixed(2)}.`,
      data: campaign,
    };
  } catch (error: unknown) {
    console.error('Error al crear campaña publicitaria:', error);
    return {
      success: false,
      message: 'Ocurrió un error en el servidor al registrar la campaña publicitaria.',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Server Action: Alternar estado de campaña (ACTIVE <-> PAUSED)
 */
export async function toggleAdCampaignStatusAction(
  campaignId: string,
  newStatus: 'ACTIVE' | 'PAUSED'
): Promise<ActionResponse> {
  try {
    const updated = await prisma.adCampaign.update({
      where: { id: campaignId },
      data: { status: newStatus },
    });

    revalidatePath('/admin');
    revalidatePath('/products');

    return {
      success: true,
      message: `Campaña ${newStatus === 'ACTIVE' ? 'activada' : 'pausada'} con éxito.`,
      data: updated,
    };
  } catch (error: unknown) {
    console.error('Error al alternar estado de campaña:', error);
    return {
      success: false,
      message: 'No se pudo modificar el estado de la campaña.',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Server Action: Actualizar precio, stock y patrocinio con alerta de stock crítico
 */
export async function updateProductStockAndPriceAction(
  productId: string,
  stock: number,
  price: number,
  isSponsored?: boolean
): Promise<ActionResponse> {
  try {
    if (stock < 0 || price < 0) {
      return {
        success: false,
        message: 'El stock y el precio deben ser valores positivos.',
      };
    }

    const dataToUpdate: { stock: number; price: number; isSponsored?: boolean } = { stock, price };
    if (typeof isSponsored === 'boolean') {
      dataToUpdate.isSponsored = isSponsored;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: dataToUpdate,
    });

    // Notificación automática si el stock está por debajo del umbral (< 5 unidades)
    if (stock < 5) {
      await sendLowStockAlertEmail(
        process.env.ADMIN_ALERT_EMAIL || 'admin@ecoswap.eco',
        updatedProduct.title,
        stock,
        productId
      );
      console.warn(`[STOCK ALERT] Alerta de stock crítico (<5) enviada para producto: ${updatedProduct.title}`);
    }

    revalidatePath('/admin');
    revalidatePath('/products');

    return {
      success: true,
      message: `Producto "${updatedProduct.title}" actualizado: Stock = ${stock}, Precio = $${price.toFixed(2)}${stock < 5 ? ' (⚠️ Alerta de stock enviada)' : ''}.`,
      data: updatedProduct,
    };
  } catch (error: unknown) {
    console.error('Error al actualizar inventario:', error);
    return {
      success: false,
      message: 'No se pudo actualizar el inventario.',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Server Action: Cambiar estado del usuario (ACTIVE <-> SUSPENDED)
 */
export async function toggleUserStatusAction(
  userId: string,
  newStatus: 'ACTIVE' | 'SUSPENDED'
): Promise<ActionResponse> {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status: newStatus },
    });

    revalidatePath('/admin');

    return {
      success: true,
      message: `Usuario ${updatedUser.name} ahora está ${newStatus === 'ACTIVE' ? 'Activo' : 'Suspendido'}.`,
      data: updatedUser,
    };
  } catch (error: unknown) {
    console.error('Error al cambiar estado del usuario:', error);
    return {
      success: false,
      message: 'No se pudo modificar el estado del usuario.',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Server Action: Asignar o revocar rol de Administrador
 */
export async function toggleUserRoleAction(
  userId: string,
  newRole: 'USER' | 'ADMIN'
): Promise<ActionResponse> {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath('/admin');

    return {
      success: true,
      message: `Rol del usuario ${updatedUser.name} actualizado a ${newRole}.`,
      data: updatedUser,
    };
  } catch (error: unknown) {
    console.error('Error al cambiar rol del usuario:', error);
    return {
      success: false,
      message: 'No se pudo modificar el rol de usuario.',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Server Action: Simular suscripción a Premium (Checkout)
 */
export async function upgradeToPremiumAction(
  userId: string,
  gateway: 'STRIPE' | 'MERCADOPAGO' = 'MERCADOPAGO'
): Promise<ActionResponse> {
  try {
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1); // 1 año de membresía

    const gatewayId = gateway === 'STRIPE'
      ? `cus_${Math.random().toString(36).substring(2, 12)}`
      : `mp_sub_${Math.random().toString(36).substring(2, 12)}`;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: 'PREMIUM',
        subscriptionExpiresAt: expiresAt,
        stripeCustomerId: gateway === 'STRIPE' ? gatewayId : undefined,
        mercadoPagoId: gateway === 'MERCADOPAGO' ? gatewayId : undefined,
        ecoPoints: { increment: 200 }, // Bono de bienvenida Premium
      },
    });

    // Enviar correo transaccional de bienvenida Premium
    await sendWelcomePremiumEmail(user.email, user.name, expiresAt);

    revalidatePath('/premium');
    revalidatePath('/products');
    revalidatePath('/admin');

    return {
      success: true,
      message: `¡Felicidades ${user.name}! Tu suscripción a EcoSwap Premium ha sido activada con éxito hasta ${expiresAt.toLocaleDateString('es-ES')}.`,
      data: user,
    };
  } catch (error: unknown) {
    console.error('Error al actualizar membresía:', error);
    return {
      success: false,
      message: 'Error al procesar la suscripción Premium.',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

