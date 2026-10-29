// =============================================================================
// EcoSwap 🌱 - Transactional Mailer Service & Templates (Fase 3)
// =============================================================================

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export interface SentEmailRecord extends EmailPayload {
  id: string;
  sentAt: string;
}

// Registro en memoria de correos para entornos de desarrollo y pruebas de auditoría
export const emailAuditLog: SentEmailRecord[] = [];

/**
 * Envia un correo electrónico transaccional.
 * En desarrollo simula el envío con formateo en consola y registro para auditoría.
 * En producción se conecta con proveedores como Resend o Nodemailer.
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId: string }> {
  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const from = payload.from || 'EcoSwap Sustentable <notificaciones@ecoswap.eco>';

  const record: SentEmailRecord = {
    ...payload,
    from,
    id: messageId,
    sentAt: new Date().toISOString(),
  };

  emailAuditLog.unshift(record);

  // Registro en consola para simulación transparente
  console.log('------------------------------------------------------------');
  console.log(`📧 [TRANSACTIONAL EMAIL DISPATCHED] ID: ${messageId}`);
  console.log(`📨 Para: ${payload.to}`);
  console.log(`🏷️  De:   ${from}`);
  console.log(`📌 Asunto: ${payload.subject}`);
  console.log(`⏰ Fecha: ${record.sentAt}`);
  console.log('------------------------------------------------------------');

  return { success: true, messageId };
}

// =============================================================================
// 1. Plantilla: Bienvenido a EcoSwap Premium
// =============================================================================
export function renderWelcomePremiumTemplate(userName: string, expiresAtDate?: string | Date): string {
  const expirationStr = expiresAtDate
    ? new Date(expiresAtDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    : '1 Año Completo';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f0fdf4; margin: 0; padding: 24px; color: #1f2937; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #d1fae5; box-shadow: 0 10px 25px -5px rgba(16,185,129,0.1); }
    .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; padding: 36px 32px; text-align: center; }
    .header h1 { margin: 0 0 8px; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 0; font-size: 15px; opacity: 0.95; }
    .badge-crown { display: inline-block; background: #fbbf24; color: #78350f; font-weight: 800; font-size: 12px; padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .body-content { padding: 32px; }
    .benefit-row { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 18px; padding: 14px; background: #f9fafb; border-radius: 12px; border: 1px solid #f3f4f6; }
    .benefit-icon { font-size: 22px; line-height: 1; }
    .benefit-title { font-weight: 700; color: #065f46; font-size: 15px; margin-bottom: 3px; }
    .benefit-desc { font-size: 13px; color: #4b5563; margin: 0; }
    .cta-btn { display: block; text-align: center; background: #10b981; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 15px; margin: 28px 0 16px; box-shadow: 0 4px 12px rgba(16,185,129,0.3); }
    .footer { text-align: center; font-size: 12px; color: #9ca3af; padding: 20px 32px 28px; border-top: 1px solid #f3f4f6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge-crown">⭐ Club Verde Exclusivo</div>
      <h1>¡Te damos la bienvenida a EcoSwap Premium! 🌱</h1>
      <p>Hola <strong>${userName}</strong>, gracias por dar un paso audaz por la economía circular.</p>
    </div>
    <div class="body-content">
      <p style="font-size: 15px; line-height: 1.6; color: #374151;">
        Tu membresía anual ya está activa hasta el <strong>${expirationStr}</strong>. A partir de este momento, cada acción tuya en nuestra plataforma maximiza el impacto ecológico positivo y te brinda beneficios inmediatos:
      </p>

      <div class="benefit-row">
        <div class="benefit-icon">🚚</div>
        <div>
          <div class="benefit-title">Envíos 100% Gratuitos e Ilimitados</div>
          <p class="benefit-desc">Cero costos de flete o despacho en todas tus compras y canjes sin monto mínimo.</p>
        </div>
      </div>

      <div class="benefit-row">
        <div class="benefit-icon">⭐</div>
        <div>
          <div class="benefit-title">EcoPuntos x2 en Cada Transacción</div>
          <p class="benefit-desc">Multiplica por el doble tus puntos acumulados para canjear más rápido objetos de tu comunidad.</p>
        </div>
      </div>

      <div class="benefit-row">
        <div class="benefit-icon">👑</div>
        <div>
          <div class="benefit-title">Catálogo de Artículos Exclusivos</div>
          <p class="benefit-desc">Acceso prioritario a bicicletas recicladas, tecnología reacondicionada y promociones verdes.</p>
        </div>
      </div>

      <a href="https://ecoswap.eco/products?filter=exclusive" class="cta-btn">
        Explorar el Catálogo Exclusivo ➔
      </a>
    </div>
    <div class="footer">
      <p>EcoSwap - Economía Circular y Comunidad Sostenible.<br>Si no solicitaste esta suscripción, comunícate con soporte@ecoswap.eco.</p>
    </div>
  </div>
</body>
</html>
  `;
}

// =============================================================================
// 2. Plantilla: Tu Orden ha sido Confirmada
// =============================================================================
export interface OrderItemSummary {
  title: string;
  quantity: number;
  unitPrice: number;
  points: number;
}

export function renderOrderConfirmedTemplate(
  userName: string,
  orderId: string,
  items: OrderItemSummary[],
  subtotal: number,
  shippingCost: number,
  totalAmount: number,
  ecoPointsEarned: number,
  isPremium: boolean
): string {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-size: 14px;">${item.title} (x${item.quantity})</td>
      <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-size: 14px; text-align: right; font-weight: 600;">$${(item.unitPrice * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #0f172a; color: #ffffff; padding: 28px 32px; }
    .header h2 { margin: 0 0 6px; font-size: 22px; }
    .order-tag { font-size: 13px; color: #94a3b8; font-family: monospace; }
    .body { padding: 32px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .summary-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; color: #64748b; }
    .total-row { display: flex; justify-content: space-between; padding: 12px 0; font-size: 17px; font-weight: 800; color: #0f172a; border-top: 2px solid #e2e8f0; margin-top: 12px; }
    .eco-badge { background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; border-radius: 8px; padding: 12px; margin-top: 20px; text-align: center; font-weight: 700; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>🎉 ¡Tu orden ha sido confirmada!</h2>
      <div class="order-tag">Orden #${orderId}</div>
    </div>
    <div class="body">
      <p>Hola <strong>${userName}</strong>, recibimos tu pedido correctamente y ya está en preparación para entrega ecológica.</p>
      
      <table>
        <thead>
          <tr style="text-align: left; font-size: 12px; text-transform: uppercase; color: #94a3b8; border-bottom: 2px solid #e2e8f0;">
            <th style="padding-bottom: 8px;">Producto</th>
            <th style="padding-bottom: 8px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <div style="margin-top: 20px;">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Envío:</span>
          <span>${shippingCost === 0 ? '<strong style="color: #10b981;">GRATIS (Beneficio Premium)</strong>' : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        <div class="total-row">
          <span>Total Pagado:</span>
          <span>$${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div class="eco-badge">
        🌿 Has acumulado <strong>+${ecoPointsEarned} EcoPuntos</strong> ${isPremium ? '(¡Multiplicador x2 Premium activo!)' : ''}
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// =============================================================================
// 3. Plantilla: Alerta de Stock Bajo (Solo Admins)
// =============================================================================
export function renderLowStockAlertTemplate(
  productTitle: string,
  currentStock: number,
  productId: string,
  minThreshold: number = 5
): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fff7ed; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #fed7aa; }
    .header { background: #ea580c; color: #ffffff; padding: 24px 32px; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 8px; }
    .body { padding: 32px; font-size: 15px; line-height: 1.6; }
    .alert-box { background: #fff1f2; border: 1px solid #fecdd3; border-radius: 10px; padding: 16px; margin: 20px 0; }
    .cta-btn { display: inline-block; background: #ea580c; color: #ffffff !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; margin-top: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>⚠️ [ALERTA INTERNA ADMIN] Stock Crítico en Catálogo</h2>
    </div>
    <div class="body">
      <p>Estimado Administrador de EcoSwap,</p>
      <p>El sistema automático de inventario ha detectado que las existencias del siguiente producto están por debajo del umbral mínimo de seguridad (<strong>${minThreshold} unidades</strong>):</p>
      
      <div class="alert-box">
        <div style="font-size: 16px; font-weight: 800; color: #9f1239; margin-bottom: 6px;">${productTitle}</div>
        <div style="font-size: 14px; color: #475569;">ID del Producto: <code>${productId}</code></div>
        <div style="font-size: 15px; font-weight: 700; color: #dc2626; margin-top: 8px;">
          Unidades restantes en almacén: <strong>${currentStock}</strong>
        </div>
      </div>

      <p>Se sugiere contactar al proveedor o actualizar las existencias en el Gestor de Inventario para evitar quiebres de stock en el catálogo.</p>

      <a href="https://ecoswap.eco/admin?tab=inventory&product=${productId}" class="cta-btn">
        Abrir Gestor de Inventario en Admin ➔
      </a>
    </div>
  </div>
</body>
</html>
  `;
}

// =============================================================================
// Métodos de Alto Nivel para Despacho
// =============================================================================

export async function sendWelcomePremiumEmail(userEmail: string, userName: string, expiresAt?: Date | string) {
  const html = renderWelcomePremiumTemplate(userName, expiresAt);
  return sendEmail({
    to: userEmail,
    subject: '⭐ ¡Bienvenido al Club EcoSwap Premium! Envíos gratis y el doble de EcoPuntos',
    html,
  });
}

export async function sendOrderConfirmedEmail(
  userEmail: string,
  userName: string,
  orderId: string,
  items: OrderItemSummary[],
  subtotal: number,
  shippingCost: number,
  totalAmount: number,
  ecoPointsEarned: number,
  isPremium: boolean
) {
  const html = renderOrderConfirmedTemplate(
    userName,
    orderId,
    items,
    subtotal,
    shippingCost,
    totalAmount,
    ecoPointsEarned,
    isPremium
  );
  return sendEmail({
    to: userEmail,
    subject: `📦 Orden Confirmada #${orderId} - EcoSwap`,
    html,
  });
}

export async function sendLowStockAlertEmail(adminEmail: string, productTitle: string, currentStock: number, productId: string) {
  const html = renderLowStockAlertTemplate(productTitle, currentStock, productId);
  return sendEmail({
    to: adminEmail,
    subject: `⚠️ Alerta de Stock Bajo: ${productTitle} (${currentStock} disponibles)`,
    html,
  });
}

