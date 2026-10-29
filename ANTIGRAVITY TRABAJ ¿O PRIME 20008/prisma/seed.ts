// =============================================================================
// EcoSwap 🌱 - Prisma Database Seeder
// =============================================================================

import { PrismaClient, Role, UserStatus, SubscriptionTier, AdCampaignStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Sembrando datos para EcoSwap Fase 3...');

  // Limpieza inicial controlada
  await prisma.orderItem.deleteMany().catch(() => {});
  await prisma.order.deleteMany().catch(() => {});
  await prisma.adCampaign.deleteMany().catch(() => {});
  await prisma.product.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});

  // 1. Usuarios demo
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@ecoswap.eco',
      name: 'Admin General EcoSwap',
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      subscriptionTier: SubscriptionTier.PREMIUM,
      subscriptionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      ecoPoints: 1200,
      streakDays: 45
    }
  });

  const premiumUser = await prisma.user.create({
    data: {
      email: 'lucas.verde@ecoswap.eco',
      name: 'Lucas Verde (Premium)',
      role: Role.USER,
      status: UserStatus.ACTIVE,
      subscriptionTier: SubscriptionTier.PREMIUM,
      stripeCustomerId: 'cus_N98K3x9812A',
      mercadoPagoId: 'mp_sub_8831920',
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      ecoPoints: 650,
      streakDays: 14
    }
  });

  const freeUser = await prisma.user.create({
    data: {
      email: 'camila.eco@gmail.com',
      name: 'Camila Ríos',
      role: Role.USER,
      status: UserStatus.ACTIVE,
      subscriptionTier: SubscriptionTier.FREE,
      ecoPoints: 250,
      streakDays: 3
    }
  });

  const suspendedUser = await prisma.user.create({
    data: {
      email: 'usuario.spam@example.com',
      name: 'Usuario Suspendido',
      role: Role.USER,
      status: UserStatus.SUSPENDED,
      subscriptionTier: SubscriptionTier.FREE,
      ecoPoints: 0,
      streakDays: 0
    }
  });

  // 2. Campañas Publicitarias (Ad Campaigns)
  await prisma.adCampaign.createMany({
    data: [
      {
        title: '🌱 Huerto Urbano Sustentable: 30% OFF en Semillas Orgánicas',
        imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a701?auto=format&fit=crop&w=1200&q=80',
        targetUrl: 'https://huertourbano.example.com',
        budget: 450.0,
        status: AdCampaignStatus.ACTIVE,
        impressions: 1420,
        clicks: 128,
        createdById: adminUser.id
      },
      {
        title: '🚲 Bicicletas Eléctricas E-Ride: Movilidad Cero Emisiones',
        imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80',
        targetUrl: 'https://eride-mobility.example.com',
        budget: 800.0,
        status: AdCampaignStatus.ACTIVE,
        impressions: 3200,
        clicks: 295,
        createdById: adminUser.id
      },
      {
        title: '☕ Café de Especialidad en Cápsulas Compostables 100% Biodegradables',
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
        targetUrl: 'https://compostablecafe.example.com',
        budget: 250.0,
        status: AdCampaignStatus.PAUSED,
        impressions: 890,
        clicks: 64,
        createdById: adminUser.id
      }
    ]
  });

  // 3. Catálogo de Productos (con items normales, patrocinados, exclusivos y alerta de bajo stock)
  await prisma.product.createMany({
    data: [
      {
        title: 'Libro de Programación en React & TypeScript',
        description: 'Manual práctico de desarrollo moderno con Next.js y React. Buenas prácticas y arquitectura limpia.',
        category: 'Libros',
        points: 50,
        price: 15.0,
        stock: 8,
        condition: 'Excelente estado',
        imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
        distance: '0.8 km',
        co2Savings: 2.5,
        isSponsored: false,
        isExclusive: false,
        userId: freeUser.id
      },
      {
        title: 'Cafetera de émbolo (Vidrio Borosilicato)',
        description: 'Prensa francesa con émbolo de acero inoxidable. Ideal para preparar café de especialidad e infusiones.',
        category: 'Electrodomésticos',
        points: 120,
        price: 24.5,
        stock: 3, // ALERTA DE STOCK BAJO (< 5)
        condition: 'Como nueva',
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        distance: '1.4 km',
        co2Savings: 4.8,
        isSponsored: false,
        isExclusive: false,
        userId: premiumUser.id
      },
      {
        title: 'Monstera Deliciosa en maceta artesanal',
        description: 'Hermosa planta purificadora de interiores. Incluye maceta de terracota sellada y sustrato orgánico enriquecido.',
        category: 'Plantas & Jardín',
        points: 40,
        price: 12.0,
        stock: 12,
        condition: 'Sana y con brotes',
        imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
        distance: '0.5 km',
        co2Savings: 3.1,
        isSponsored: false,
        isExclusive: false,
        userId: freeUser.id
      },
      {
        title: 'Auriculares Bluetooth Cancelación de Ruido',
        description: 'Almohadillas confortables ecológicas, puerto USB-C y 22h de batería garantizada.',
        category: 'Tecnología',
        points: 180,
        price: 49.0,
        stock: 2, // ALERTA DE STOCK BAJO (< 5)
        condition: 'Muy buen estado',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        distance: '2.1 km',
        co2Savings: 9.2,
        isSponsored: false,
        isExclusive: false,
        userId: premiumUser.id
      },
      {
        title: 'Chaqueta Denim Vintage Upcycled',
        description: 'Campera recuperada con bordados botánicos artesanales a mano. Talle M unisex, pieza única.',
        category: 'Moda Sostenible',
        points: 90,
        price: 32.0,
        stock: 4, // ALERTA DE STOCK BAJO (< 5)
        condition: 'Impecable',
        imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
        distance: '1.2 km',
        co2Savings: 14.5,
        isSponsored: false,
        isExclusive: false,
        userId: freeUser.id
      },
      {
        title: '⭐ Kit Solar Portátil de Emergencia [PATROCINADO]',
        description: 'Panel solar monocristalino plegable de 25W con cargador de batería de litio para campamento y emergencias ecológicas.',
        category: 'Tecnología',
        points: 220,
        price: 58.0,
        stock: 15,
        condition: 'Nuevo en caja',
        imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
        distance: 'Envío Nacional',
        co2Savings: 28.0,
        isSponsored: true, // PRODUCTO PATROCINADO
        isExclusive: false,
        userId: adminUser.id
      },
      {
        title: 'Pack 4 Botellas Térmicas de Acero Inoxidable Doble Pared',
        description: 'Conserva líquidos fríos 24h y calientes 12h. Libre de BPA, tapa hermética antifugas.',
        category: 'Hogar & Deco',
        points: 60,
        price: 18.0,
        stock: 9,
        condition: 'Nuevo sin uso',
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
        distance: '3.0 km',
        co2Savings: 6.0,
        isSponsored: false,
        isExclusive: false,
        userId: freeUser.id
      },
      {
        title: '👑 Bicicleta Urbana Plegable de Aluminio Reciclado [EXCLUSIVO PREMIUM]',
        description: 'Producto exclusivo para miembros del Club EcoSwap Premium. Cuadro de aleación liviana reciclada, cambios Shimano de 7 velocidades.',
        category: 'Movilidad',
        points: 350,
        price: 180.0,
        stock: 5,
        condition: 'Nuevo reacondicionado',
        imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
        distance: '1.0 km',
        co2Savings: 35.0,
        isSponsored: false,
        isExclusive: true, // EXCLUSIVO PREMIUM
        userId: adminUser.id
      }
    ]
  });

  console.log('✅ Base de datos sembrada con éxito:');
  console.log('   - 4 usuarios creados (Admin, Premium, Free, Suspendido)');
  console.log('   - 3 campañas publicitarias con métricas CTR');
  console.log('   - 8 productos con tags patrocinados, exclusivos y alertas de stock bajo');
}

main()
  .catch((e) => {
    console.error('❌ Error al sembrar datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

