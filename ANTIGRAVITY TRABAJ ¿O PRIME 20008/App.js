/**
 * EcoSwap 🌱 - Interactive Client Logic & Reactive State
 */

// Datos iniciales ampliados con los dos originales del usuario
const DEFAULT_ITEMS = [
  {
    id: '1',
    title: 'Libro de Programación en React',
    category: 'Libros',
    points: 50,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80',
    user: 'Ana G.',
    distance: '0.8 km',
    condition: 'Excelente estado',
    co2: '2.5 kg',
    description: 'Manual práctico de desarrollo en React y React Native. Excelente para iniciarse en proyectos modernos y buenas prácticas.'
  },
  {
    id: '2',
    title: 'Cafetera de émbolo (Vidrio)',
    category: 'Electrodomésticos',
    points: 120,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
    user: 'Carlos M.',
    distance: '1.4 km',
    condition: 'Como nueva',
    co2: '4.8 kg',
    description: 'Prensa francesa de vidrio borosilicato y émbolo de acero inoxidable. Capacidad para 3 tazas de café o infusiones.'
  },
  {
    id: '3',
    title: 'Monstera Deliciosa en maceta artesanal',
    category: 'Plantas & Jardín',
    points: 40,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80',
    user: 'Lucía R.',
    distance: '0.5 km',
    condition: 'Sana y con brotes',
    co2: '3.1 kg',
    description: 'Hermosa planta purificadora de ambiente. Incluye maceta de terracota sellada y sustrato orgánico.'
  },
  {
    id: '4',
    title: 'Auriculares Bluetooth Cancelación Ruido',
    category: 'Tecnología',
    points: 180,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
    user: 'Martín D.',
    distance: '2.1 km',
    condition: 'Muy buen estado',
    co2: '9.2 kg',
    description: 'Almohadillas confortables, conector USB-C y autonomía de 22 horas continuas. Funciona perfecto.'
  },
  {
    id: '5',
    title: 'Chaqueta Denim Vintage Upcycled',
    category: 'Moda Sostenible',
    points: 90,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=500&q=80',
    user: 'Sofía P.',
    distance: '1.2 km',
    condition: 'Impecable',
    co2: '14.5 kg',
    description: 'Campera de mezclilla recuperada con apliques botánicos bordados a mano. Talle M unisex.'
  },
  {
    id: '6',
    title: 'Set de Botellas Térmicas de Acero',
    category: 'Hogar & Deco',
    points: 60,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80',
    user: 'Diego F.',
    distance: '3.0 km',
    condition: 'Nuevo sin uso',
    co2: '6.0 kg',
    description: 'Doble capa térmica libre de BPA. Mantiene agua fría 24 horas y caliente 12 horas. Reemplaza cientos de descartables.'
  }
];

const PRESET_IMAGES = [
  { label: 'Planta', url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80' },
  { label: 'Libros', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80' },
  { label: 'Taza / Deco', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80' },
  { label: 'Ropa', url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=80' }
];

const INITIAL_MISSIONS = [
  { id: 'm1', title: 'Dona un libro o artículo infantil', pointsReward: 40, icon: '📖', completed: false },
  { id: 'm2', title: 'Completar tu primer canje comunitario', pointsReward: 35, icon: '🤝', completed: false },
  { id: 'm3', title: 'Trae tu propia bolsa reutilizable', pointsReward: 15, icon: '🛍️', completed: false },
  { id: 'm4', title: 'Comparte EcoSwap con un vecino', pointsReward: 20, icon: '🌱', completed: false }
];

// Campañas iniciales para el Motor de Publicidad (Ad Server)
const DEFAULT_AD_CAMPAIGNS = [
  {
    id: 'ad_1',
    title: '🌱 Huerto Urbano Sustentable: 30% OFF en Semillas Orgánicas',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a701?auto=format&fit=crop&w=800&q=80',
    targetUrl: 'https://huertourbano.example.com',
    budget: 450.0,
    status: 'ACTIVE',
    impressions: 1420,
    clicks: 128
  },
  {
    id: 'ad_2',
    title: '🚲 Bicicletas Eléctricas E-Ride: Movilidad Urbana Cero Emisiones',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    targetUrl: 'https://eride-mobility.example.com',
    budget: 800.0,
    status: 'ACTIVE',
    impressions: 3200,
    clicks: 295
  },
  {
    id: 'ad_3',
    title: '☕ Café de Especialidad en Cápsulas Compostables 100% Biodegradables',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    targetUrl: 'https://compostablecafe.example.com',
    budget: 250.0,
    status: 'PAUSED',
    impressions: 890,
    clicks: 64
  }
];

// Carrito inicial con productos para probar checkout
const DEFAULT_CART = [
  {
    id: '2',
    title: 'Cafetera de émbolo (Vidrio)',
    price: 24.5,
    points: 120,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '3',
    title: 'Monstera Deliciosa en maceta artesanal',
    price: 12.0,
    points: 40,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80'
  }
];

// Usuarios demo para el Gestor de Usuarios
const DEFAULT_USERS_LIST = [
  { id: 'u1', name: 'Admin General EcoSwap', email: 'admin@ecoswap.eco', role: 'ADMIN', status: 'ACTIVE', subscriptionTier: 'PREMIUM', ecoPoints: 1200 },
  { id: 'u2', name: 'Lucas Verde (Premium)', email: 'lucas.verde@ecoswap.eco', role: 'USER', status: 'ACTIVE', subscriptionTier: 'PREMIUM', ecoPoints: 650 },
  { id: 'u3', name: 'Camila Ríos', email: 'camila.eco@gmail.com', role: 'USER', status: 'ACTIVE', subscriptionTier: 'FREE', ecoPoints: 250 },
  { id: 'u4', name: 'Usuario Spam Reportado', email: 'usuario.spam@example.com', role: 'USER', status: 'SUSPENDED', subscriptionTier: 'FREE', ecoPoints: 0 }
];

// Estado de la Aplicación con persistencia en localStorage
class EcoSwapState {
  constructor() {
    this.userPoints = parseInt(localStorage.getItem('ecoswap_points')) || 250;
    
    const savedItems = localStorage.getItem('ecoswap_items');
    this.items = savedItems ? JSON.parse(savedItems) : DEFAULT_ITEMS;

    // Asegurar campos de Fase 3 en items (precio, stock, isSponsored)
    this.items = this.items.map(item => ({
      price: item.price || (item.points ? Math.round(item.points * 0.25) : 15.0),
      stock: typeof item.stock === 'number' ? item.stock : (item.id === '2' ? 3 : item.id === '4' ? 2 : 8),
      isSponsored: Boolean(item.isSponsored),
      isExclusive: Boolean(item.isExclusive),
      ...item
    }));

    const savedClaimed = localStorage.getItem('ecoswap_claimed');
    this.claimedItems = savedClaimed ? JSON.parse(savedClaimed) : [];

    const savedHistory = localStorage.getItem('ecoswap_history');
    this.history = savedHistory ? JSON.parse(savedHistory) : [
      { id: 'h1', desc: 'Bono de bienvenida a EcoSwap', amount: '+250 Pts', date: 'Hoy' }
    ];

    const savedMissions = localStorage.getItem('ecoswap_missions');
    this.missions = savedMissions ? JSON.parse(savedMissions) : INITIAL_MISSIONS;

    // Fase 3: Membresía y Rol de Usuario
    this.subscriptionTier = localStorage.getItem('ecoswap_subscription_tier') || 'FREE';
    this.subscriptionExpiresAt = localStorage.getItem('ecoswap_subscription_expires_at') || null;
    this.userRole = localStorage.getItem('ecoswap_user_role') || 'ADMIN'; // Simulación para pruebas fluidas de /admin

    // Fase 3: Campañas Publicitarias y Carrito
    const savedAds = localStorage.getItem('ecoswap_ads');
    this.adCampaigns = savedAds ? JSON.parse(savedAds) : DEFAULT_AD_CAMPAIGNS;

    const savedCart = localStorage.getItem('ecoswap_cart');
    this.cart = savedCart ? JSON.parse(savedCart) : DEFAULT_CART;

    const savedUsers = localStorage.getItem('ecoswap_users_list');
    this.usersList = savedUsers ? JSON.parse(savedUsers) : DEFAULT_USERS_LIST;

    // Racha Diaria de Conexión (+10 EcoPts constantes por día)
    this.streak = parseInt(localStorage.getItem('ecoswap_streak')) || 0;
    this.bestStreak = parseInt(localStorage.getItem('ecoswap_best_streak')) || 0;
    this.lastStreakDate = localStorage.getItem('ecoswap_last_streak_date') || null;
    this.totalStreakPoints = parseInt(localStorage.getItem('ecoswap_total_streak_points')) || 0;
    this.testDayOffset = parseInt(localStorage.getItem('ecoswap_test_day_offset')) || 0;

    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.currentTab = 'feed';
  }

  save() {
    localStorage.setItem('ecoswap_points', this.userPoints);
    localStorage.setItem('ecoswap_items', JSON.stringify(this.items));
    localStorage.setItem('ecoswap_claimed', JSON.stringify(this.claimedItems));
    localStorage.setItem('ecoswap_history', JSON.stringify(this.history));
    localStorage.setItem('ecoswap_missions', JSON.stringify(this.missions));
    localStorage.setItem('ecoswap_streak', this.streak);
    localStorage.setItem('ecoswap_best_streak', this.bestStreak);
    if (this.lastStreakDate) {
      localStorage.setItem('ecoswap_last_streak_date', this.lastStreakDate);
    } else {
      localStorage.removeItem('ecoswap_last_streak_date');
    }
    localStorage.setItem('ecoswap_total_streak_points', this.totalStreakPoints);
    localStorage.setItem('ecoswap_test_day_offset', this.testDayOffset);

    // Persistencia de Fase 3
    localStorage.setItem('ecoswap_subscription_tier', this.subscriptionTier);
    if (this.subscriptionExpiresAt) {
      localStorage.setItem('ecoswap_subscription_expires_at', this.subscriptionExpiresAt);
    }
    localStorage.setItem('ecoswap_user_role', this.userRole);
    localStorage.setItem('ecoswap_ads', JSON.stringify(this.adCampaigns));
    localStorage.setItem('ecoswap_cart', JSON.stringify(this.cart));
    localStorage.setItem('ecoswap_users_list', JSON.stringify(this.usersList));
  }

  addPoints(amount, reason) {
    this.userPoints += amount;
    this.history.unshift({
      id: 'h_' + Date.now(),
      desc: reason,
      amount: `+${amount} Pts`,
      date: 'Hace un instante'
    });
    this.save();
  }

  deductPoints(amount, reason) {
    this.userPoints -= amount;
    this.history.unshift({
      id: 'h_' + Date.now(),
      desc: reason,
      amount: `-${amount} Pts`,
      date: 'Hace un instante'
    });
    this.save();
  }
}

const state = new EcoSwapState();

// Sanitización básica para inyección segura en HTML
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================
// Toast & Feedback System
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
  
  const icon = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

// ==========================================
// Confetti Animation Engine
// ==========================================
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#10b981', '#34d399', '#059669', '#f59e0b', '#fbbf24', '#60a5fa'];

  for (let i = 0; i < 70; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 3 + (Math.random() - 0.5) * 100,
      w: Math.random() * 9 + 4,
      h: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -12 - 4,
      gravity: 0.38,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1
    });
  }

  let animationFrame;
  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.012;

      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(updateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  updateConfetti();
}

// ==========================================
// UI Rendering
// ==========================================
function updatePointsDisplay() {
  const headerPoints = document.getElementById('header-points-val');
  const walletBig = document.getElementById('wallet-balance-big');
  if (headerPoints) headerPoints.textContent = `${state.userPoints} Pts`;
  if (walletBig) walletBig.textContent = `${state.userPoints} Pts`;

  // Render Wallet history list
  const historyList = document.getElementById('wallet-history-list');
  if (historyList) {
    historyList.innerHTML = state.history.map(item => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding: 0.5rem 0.75rem; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-light); font-size: 0.85rem;">
        <div>
          <div style="font-weight: 600;">${escapeHTML(item.desc)}</div>
          <div style="font-size: 0.75rem; color: var(--text-subtle);">${escapeHTML(item.date)}</div>
        </div>
        <div style="font-weight: 700; color: ${item.amount.startsWith('+') ? 'var(--color-primary-dark)' : 'var(--color-danger)'};">
          ${escapeHTML(item.amount)}
        </div>
      </div>
    `).join('');
  }
}

function updateImpactStats() {
  const statCo2Saved = document.getElementById('stat-co2-saved');
  const statItemsSwapped = document.getElementById('stat-items-swapped');
  const impactCo2Display = document.getElementById('impact-co2-display');
  const ecoLevelTitle = document.getElementById('eco-level-title');

  const userCo2Total = state.claimedItems.reduce((acc, item) => {
    const val = parseFloat(item.co2) || 3.0;
    return acc + val;
  }, 18.4);

  const totalSwapped = 89 + state.claimedItems.length;
  const communityCo2 = 142.5 + (state.claimedItems.length * 3.5);

  if (statCo2Saved) statCo2Saved.textContent = `${communityCo2.toFixed(1)} kg`;
  if (statItemsSwapped) statItemsSwapped.textContent = `${totalSwapped}`;
  if (impactCo2Display) impactCo2Display.textContent = `${userCo2Total.toFixed(1)} kg`;
  
  if (ecoLevelTitle) {
    if (state.userPoints >= 400) {
      ecoLevelTitle.textContent = 'Héroe de la Biosfera 🌳';
    } else if (state.userPoints >= 250) {
      ecoLevelTitle.textContent = 'Guardián Verde 🌿';
    } else {
      ecoLevelTitle.textContent = 'Brote Comunitario 🌱';
    }
  }
}

// Pool de productos patrocinados para inyección en el catálogo (cada 5 elementos normales)
const SPONSORED_PRODUCTS_POOL = [
  {
    id: 'spons_1',
    title: '⭐ Kit Solar Portátil Monocristalino 25W [AD]',
    category: 'Tecnología',
    points: 210,
    price: 54.0,
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=500&q=80',
    user: 'SolTech Energía Limpia (Sponsor)',
    distance: 'Envío Nacional $0',
    condition: 'Nuevo garantizado',
    co2: '28.5 kg',
    isSponsored: true,
    description: 'Carga todos tus dispositivos con energía solar fotovoltaica 100% limpia. Panel plegable ultra liviano para camping o emergencias.'
  },
  {
    id: 'spons_2',
    title: '⭐ Huerto Urbano Hidropónico Automatizado [AD]',
    category: 'Plantas & Jardín',
    points: 190,
    price: 48.0,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a701?auto=format&fit=crop&w=500&q=80',
    user: 'EcoGarden Orgánicos (Sponsor)',
    distance: 'Despacho Rápido',
    condition: 'Nuevo en empaque reciclable',
    co2: '22.0 kg',
    isSponsored: true,
    description: 'Cultiva verduras y aromáticas en tu balcón sin necesidad de tierra y con recirculación automática de nutrientes.'
  }
];

function renderFeed() {
  const grid = document.getElementById('items-grid');
  const counter = document.getElementById('items-counter');
  if (!grid) return;

  // Filtrado por categoría y búsqueda
  const filtered = state.items.filter(item => {
    const matchCategory = state.selectedCategory === 'all' || item.category.toLowerCase() === state.selectedCategory.toLowerCase();
    const matchSearch = item.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        item.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        (item.user && item.user.toLowerCase().includes(state.searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // Requisito: Inyectar un producto con isSponsored = true cada 5 elementos normales
  const normalItems = filtered.filter(i => !i.isSponsored);
  const displayedItems = [];
  let sponsoredIdx = 0;

  for (let i = 0; i < normalItems.length; i++) {
    displayedItems.push(normalItems[i]);

    // Cada 5 elementos normales, inyectar producto patrocinado
    if ((i + 1) % 5 === 0 && SPONSORED_PRODUCTS_POOL.length > 0) {
      const adItem = SPONSORED_PRODUCTS_POOL[sponsoredIdx % SPONSORED_PRODUCTS_POOL.length];
      displayedItems.push({
        ...adItem,
        id: `${adItem.id}_injected_${i}`
      });
      sponsoredIdx++;
    }
  }

  if (counter) {
    counter.textContent = `${displayedItems.length} disponible${displayedItems.length === 1 ? '' : 's'} (con anuncios inyectados)`;
  }

  if (displayedItems.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🍃</div>
        <h4 class="empty-title">No hay objetos en esta búsqueda</h4>
        <p class="empty-desc">Prueba cambiando los filtros o sé el primero en donar algo de esta categoría a tu vecindario.</p>
        <button class="btn-primary" onclick="openPublishModal()">
          <span>➕</span> Publicar un Objeto
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = displayedItems.map(item => {
    const canAfford = state.userPoints >= item.points;
    const isSponsored = Boolean(item.isSponsored);

    return `
      <article class="card ${isSponsored ? 'card-sponsored' : ''}" data-id="${item.id}">
        <div class="card-image-wrap" onclick="openDetailModal('${item.id}')" style="cursor: pointer;" title="Ver detalles">
          <img src="${item.image}" alt="${escapeHTML(item.title)}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80'">
          
          ${isSponsored 
            ? `<div class="card-badge-top ad-badge"><span>⚡</span> Patrocinado (Ad)</div>`
            : item.isExclusive
            ? `<div class="card-badge-top" style="background:#ca8a04; color:#fff;"><span>👑</span> Solo Premium</div>`
            : `<div class="card-badge-top"><span>🌿</span> ${escapeHTML(item.condition || 'Buen estado')}</div>`
          }

          <div class="card-distance">
            📍 ${escapeHTML(item.distance || 'Cerca de ti')}
          </div>
        </div>

        <div class="card-body">
          <div class="card-top-info" onclick="openDetailModal('${item.id}')" style="cursor: pointer;">
            <div class="card-category">
              <span>🏷️</span> ${escapeHTML(item.category)}
            </div>
            <h4 class="card-title">${escapeHTML(item.title)}</h4>
            <div class="card-user">
              <span>👤</span> Por ${escapeHTML(item.user || 'Vecino solidario')}
            </div>
          </div>

          <div class="card-footer">
            <div class="card-points">
              <span class="points-val">⭐ ${item.points} Pts</span>
              <span class="points-hint">${isSponsored ? '⚡ Ad Verificado' : `Evita ~${escapeHTML(item.co2 || '2.0 kg')} CO₂`}</span>
            </div>

            <div style="display:flex; gap:0.35rem;">
              <button 
                class="btn-claim ${!canAfford && !isSponsored ? 'disabled' : ''}" 
                onclick="${isSponsored ? `handleSponsoredClick('${item.id}')` : `handleClaim('${item.id}')`}"
                style="${isSponsored ? 'background:#f59e0b; color:#1a1003; font-weight:800;' : ''}"
                title="${isSponsored ? 'Ver oferta patrocinada' : canAfford ? 'Reclamar con tus puntos' : 'Puntos insuficientes'}"
              >
                <span>${isSponsored ? '⚡' : '🤝'}</span> ${isSponsored ? 'Ver Ad' : 'Reclamar'}
              </button>

              <button
                class="chip-btn"
                onclick="addToCart('${item.id}')"
                title="Agregar al carrito de compras"
                style="padding:0.4rem 0.6rem; font-size:0.85rem;"
              >
                🛒
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderClaimed() {
  const grid = document.getElementById('claimed-grid');
  if (!grid) return;

  if (state.claimedItems.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📦</div>
        <h4 class="empty-title">Aún no has reclamado ningún objeto</h4>
        <p class="empty-desc">Explora los artículos disponibles en tu comunidad y dales una segunda oportunidad usando tus EcoPoints.</p>
        <button class="btn-primary" onclick="switchTab('feed')">
          <span>🔍</span> Explorar Feed
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = state.claimedItems.map(item => `
    <article class="card">
      <div class="card-image-wrap">
        <img src="${item.image}" alt="${escapeHTML(item.title)}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80'">
        <div class="card-badge-top" style="background: rgba(16, 185, 129, 0.9);">
          <span>✅</span> Canje Exitoso
        </div>
      </div>
      <div class="card-body">
        <div class="card-top-info">
          <div class="card-category"><span>🏷️</span> ${escapeHTML(item.category)}</div>
          <h4 class="card-title">${escapeHTML(item.title)}</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">
            Donado originalmente por <strong>${escapeHTML(item.user)}</strong>.
          </p>
        </div>
        <div class="card-footer">
          <span style="font-size: 0.85rem; color: var(--color-primary-dark); font-weight: 700;">
            🌱 ${escapeHTML(item.co2 || '3.5 kg')} CO₂ ahorrado
          </span>
          <span style="font-size: 0.8rem; color: var(--text-subtle);">Listo para retiro</span>
        </div>
      </div>
    </article>
  `).join('');
}

function renderMissions() {
  const grid = document.getElementById('missions-grid');
  if (!grid) return;

  grid.innerHTML = state.missions.map(m => `
    <div class="impact-card" style="align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div class="impact-icon-circle">${m.icon}</div>
        <div>
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.2rem;">${m.title}</h4>
          <span style="font-size: 0.82rem; color: var(--color-primary-dark); font-weight: 700;">+${m.pointsReward} EcoPoints</span>
        </div>
      </div>
      <button 
        class="btn-claim ${m.completed ? 'disabled' : ''}" 
        onclick="completeMission('${m.id}')"
        ${m.completed ? 'disabled' : ''}
      >
        ${m.completed ? '✅ Completada' : 'Cumplir'}
      </button>
    </div>
  `).join('');
}

// ==========================================
// Handlers & Actions
// ==========================================
function handleClaim(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  if (state.userPoints >= item.points) {
    state.deductPoints(item.points, `Canje de "${item.title}"`);
    state.items = state.items.filter(i => i.id !== item.id);
    state.claimedItems.unshift({ ...item, claimedAt: new Date().toLocaleDateString() });
    state.save();

    // Actualizar UI y celebrar
    updatePointsDisplay();
    updateImpactStats();
    renderFeed();
    renderClaimed();
    triggerConfetti();

    showToast(`¡Felicidades! Has adquirido: ${item.title} (-${item.points} Pts)`);
  } else {
    showToast('No tienes suficientes puntos ecológicos. ¡Dona o cumple misiones para ganar más!', 'warning');
  }
}

function completeMission(missionId) {
  const mission = state.missions.find(m => m.id === missionId);
  if (!mission || mission.completed) return;

  mission.completed = true;
  state.addPoints(mission.pointsReward, `Misión verde: ${mission.title}`);
  updatePointsDisplay();
  renderMissions();
  triggerConfetti();
  showToast(`¡Misión cumplida! Ganaste +${mission.pointsReward} EcoPoints ⭐`);
}

// ==========================================
// Sistema de Racha Diaria (Daily Streak System) 🔥🌱
// Bono fijo de 10 EcoPts por login diario (no va incrementando)
// ==========================================
const DAILY_LOGIN_POINTS = 10;

function getEffectiveNow() {
  const now = new Date();
  if (state.testDayOffset) {
    now.setDate(now.getDate() + state.testDayOffset);
  }
  return now;
}

function formatDateToYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getStreakStatus() {
  const now = getEffectiveNow();
  const todayStr = formatDateToYMD(now);
  const lastDate = state.lastStreakDate;

  if (!lastDate) {
    return {
      canClaim: true,
      claimedToday: false,
      streakBroken: false,
      currentStreak: state.streak,
      nextStreak: 1,
      todayStr
    };
  }

  const d1 = new Date(lastDate + 'T00:00:00');
  const d2 = new Date(todayStr + 'T00:00:00');
  const diffDays = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Ya reclamó el bono de hoy
    return {
      canClaim: false,
      claimedToday: true,
      streakBroken: false,
      currentStreak: state.streak,
      nextStreak: state.streak + 1,
      todayStr
    };
  } else if (diffDays === 1) {
    // Reclamó ayer -> la racha continúa consecutivamente
    return {
      canClaim: true,
      claimedToday: false,
      streakBroken: false,
      currentStreak: state.streak,
      nextStreak: state.streak + 1,
      todayStr
    };
  } else {
    // Pasaron 2 o más días -> se rompió la racha anterior
    return {
      canClaim: true,
      claimedToday: false,
      streakBroken: state.streak > 0,
      currentStreak: 0,
      nextStreak: 1,
      todayStr
    };
  }
}

function getStreakRank(days) {
  if (days >= 30) {
    return { title: 'Leyenda EcoSwap 👑', icon: '👑', desc: '¡Constancia legendaria! Eres un pilar de la comunidad ecológica.' };
  } else if (days >= 14) {
    return { title: 'Guardián Diario 🛡️', icon: '🛡️', desc: '¡2 semanas seguidas! Un compromiso ambiental inquebrantable.' };
  } else if (days >= 7) {
    return { title: 'Semana Imparable ⚡', icon: '⚡', desc: '¡7 días consecutivos! Tu hábito de consumo consciente está consolidado.' };
  } else if (days >= 3) {
    return { title: 'Hábito Verde 🌿', icon: '🌿', desc: '¡3 días seguidos! Estás construyendo un impacto positivo diario.' };
  } else if (days >= 1) {
    return { title: 'Semilla Constante 🌱', icon: '🌱', desc: '¡Gran inicio! Conéctate mañana para mantener tu llama activa.' };
  }
  return { title: 'Comienza tu Racha 🌱', icon: '🍃', desc: 'Conéctate cada día para ganar +10 EcoPts y mantener tu racha activa.' };
}

function getMidnightCountdown() {
  const now = getEffectiveNow();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diffMs = midnight - now;

  if (diffMs <= 0) return '00:00:00';

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function renderDaysTrack(container, status) {
  if (!container) return;

  const currentStreak = status.currentStreak;
  const cycleIndex = currentStreak > 0 ? ((currentStreak - 1) % 7) + 1 : 0;
  const cycleBase = currentStreak > 0 ? Math.floor((currentStreak - 1) / 7) * 7 : 0;

  let daysHtml = '';
  for (let i = 1; i <= 7; i++) {
    const dayNumber = cycleBase + i;
    let stateClass = 'locked';
    let icon = '🔒';

    if (status.claimedToday) {
      if (i < cycleIndex) {
        stateClass = 'completed';
        icon = '✅';
      } else if (i === cycleIndex) {
        stateClass = 'completed active-today';
        icon = '🔥';
      } else {
        stateClass = 'locked';
        icon = '🔒';
      }
    } else {
      // Aún no reclama hoy
      const targetDayInCycle = currentStreak === 0 ? 1 : cycleIndex + 1;
      if (i < targetDayInCycle) {
        stateClass = 'completed';
        icon = '✅';
      } else if (i === targetDayInCycle) {
        stateClass = 'active-today';
        icon = '🔥';
      } else {
        stateClass = 'locked';
        icon = '🔒';
      }
    }

    daysHtml += `
      <div class="streak-day-item ${stateClass}" title="Día ${dayNumber}: +10 EcoPts fijos">
        <span class="streak-day-name">Día ${dayNumber}</span>
        <span class="streak-day-icon">${icon}</span>
        <span class="streak-day-reward">+10 Pts</span>
      </div>
    `;
  }

  container.innerHTML = daysHtml;
}

function updateStreakUI() {
  const status = getStreakStatus();
  const rank = getStreakRank(status.currentStreak);

  // 1. Header Streak Badge
  const headerStreakVal = document.getElementById('header-streak-val');
  const streakBadgeBtn = document.getElementById('btn-open-streak');
  if (headerStreakVal) {
    headerStreakVal.textContent = `${status.currentStreak} Día${status.currentStreak === 1 ? '' : 's'}`;
  }
  if (streakBadgeBtn) {
    streakBadgeBtn.classList.toggle('has-claim', status.canClaim);
  }

  // 2. Main Dashboard Widget Card
  const widgetRank = document.getElementById('widget-streak-rank');
  const widgetTitle = document.getElementById('widget-streak-title');
  const widgetDesc = document.querySelector('.streak-widget-desc');
  const widgetClaimBtn = document.getElementById('btn-widget-claim');
  const widgetClaimText = document.getElementById('btn-widget-claim-text');
  const widgetCountdownBox = document.getElementById('widget-countdown-box');
  const widgetDaysTrack = document.getElementById('widget-days-track');
  const incentiveMsg = document.getElementById('streak-incentive-msg');

  if (widgetRank) widgetRank.textContent = rank.title;
  if (widgetTitle) {
    if (status.claimedToday) {
      widgetTitle.textContent = `¡Racha de hoy completada! (${status.currentStreak} Días 🔥)`;
    } else if (status.streakBroken) {
      widgetTitle.textContent = '¡Inicia una nueva racha ecológica hoy!';
    } else if (status.currentStreak > 0) {
      widgetTitle.textContent = `¡Mantén viva tu racha de ${status.currentStreak} días!`;
    } else {
      widgetTitle.textContent = '¡Comienza tu racha de login diario!';
    }
  }

  if (widgetDesc) {
    if (status.claimedToday) {
      widgetDesc.innerHTML = `Ya sumaste tus <strong>10 EcoPts</strong> de hoy. Vuelve mañana para alcanzar el <strong>Día ${status.nextStreak}</strong> y seguir acumulando beneficios comunitarios.`;
    } else {
      widgetDesc.innerHTML = `Conéctate a diario y recibe <strong>10 EcoPts fijos</strong> para canjear productos en tu comunidad sin gastar dinero.`;
    }
  }

  if (widgetClaimBtn && widgetClaimText) {
    if (status.canClaim) {
      widgetClaimBtn.classList.remove('claimed', 'disabled');
      widgetClaimBtn.disabled = false;
      widgetClaimText.textContent = `Reclamar Login (+10 EcoPts)`;
      if (widgetCountdownBox) widgetCountdownBox.style.display = 'none';
    } else {
      widgetClaimBtn.classList.add('claimed');
      widgetClaimBtn.disabled = true;
      widgetClaimText.textContent = `✅ Login de hoy reclamado`;
      if (widgetCountdownBox) widgetCountdownBox.style.display = 'flex';
    }
  }

  if (widgetDaysTrack) {
    renderDaysTrack(widgetDaysTrack, status);
  }

  if (incentiveMsg) {
    const points = state.userPoints;
    if (points < 40) {
      const needed = 40 - points;
      const daysNeeded = Math.ceil(needed / DAILY_LOGIN_POINTS);
      incentiveMsg.innerHTML = `Con solo <strong>${daysNeeded} día${daysNeeded === 1 ? '' : 's'} más</strong> de login podrás canjear una <strong>Monstera Deliciosa (40 Pts)</strong> completamente gratis.`;
    } else if (points < 60) {
      incentiveMsg.innerHTML = `¡Ya tienes saldo para canjear <strong>Plantas (40 Pts)</strong> o <strong>Libros (50 Pts)</strong>! Revisa el feed comunitario para no perderlos.`;
    } else {
      incentiveMsg.innerHTML = `Con tus <strong>${points} EcoPts</strong> acumulados puedes canjear múltiples productos en la comunidad. ¡Explora las novedades!`;
    }
  }

  // 3. Modal de Racha Diaria
  const modalStreakCount = document.getElementById('modal-streak-count');
  const modalStreakRank = document.getElementById('modal-streak-rank');
  const modalBestStreak = document.getElementById('modal-best-streak');
  const modalTotalStreakPts = document.getElementById('modal-total-streak-pts');
  const modalDaysTrack = document.getElementById('modal-days-track');
  const modalClaimBtn = document.getElementById('btn-modal-claim');
  const modalClaimText = document.getElementById('btn-modal-claim-text');
  const modalCountdownBox = document.getElementById('modal-countdown-box');
  const modalDesc = document.getElementById('modal-streak-desc');

  if (modalStreakCount) modalStreakCount.textContent = status.currentStreak;
  if (modalStreakRank) modalStreakRank.textContent = rank.title;
  if (modalBestStreak) modalBestStreak.textContent = `${state.bestStreak} Día${state.bestStreak === 1 ? '' : 's'}`;
  if (modalTotalStreakPts) modalTotalStreakPts.textContent = `${state.totalStreakPoints} Pts`;

  if (modalDesc) {
    modalDesc.innerHTML = rank.desc + `<br><small style="color:var(--text-subtle);">Bono garantizado: 10 EcoPts por día (recompensa constante).</small>`;
  }

  if (modalClaimBtn && modalClaimText) {
    if (status.canClaim) {
      modalClaimBtn.classList.remove('claimed', 'disabled');
      modalClaimBtn.disabled = false;
      modalClaimText.textContent = `Reclamar Recompensa (+10 EcoPts)`;
      if (modalCountdownBox) modalCountdownBox.style.display = 'none';
    } else {
      modalClaimBtn.classList.add('claimed');
      modalClaimBtn.disabled = true;
      modalClaimText.textContent = `✅ Recompensa de hoy completada`;
      if (modalCountdownBox) modalCountdownBox.style.display = 'block';
    }
  }

  if (modalDaysTrack) {
    renderDaysTrack(modalDaysTrack, status);
  }

  // 4. Modal Billetera (Sincronización)
  const walletStreakDays = document.getElementById('wallet-streak-count');
  const walletStreakSub = document.getElementById('wallet-streak-sub');
  const walletBonusBtn = document.getElementById('btn-daily-bonus');
  const walletBonusLabel = document.getElementById('wallet-bonus-btn-label');

  if (walletStreakDays) {
    walletStreakDays.textContent = `${status.currentStreak} Día${status.currentStreak === 1 ? '' : 's'}`;
  }
  if (walletStreakSub) {
    walletStreakSub.textContent = status.claimedToday 
      ? '¡Racha de hoy activa! Vuelve mañana para +10 Pts' 
      : 'Disponible para reclamar: +10 EcoPts fijos';
  }
  if (walletBonusBtn && walletBonusLabel) {
    if (status.canClaim) {
      walletBonusBtn.classList.remove('disabled');
      walletBonusBtn.disabled = false;
      walletBonusLabel.textContent = 'Reclamar Login Diario (+10 EcoPts)';
    } else {
      walletBonusBtn.classList.add('disabled');
      walletBonusBtn.disabled = true;
      walletBonusLabel.textContent = '✅ Login de hoy reclamado';
    }
  }

  // 5. Test Offset Indicator
  const offsetDisplay = document.getElementById('test-offset-display');
  if (offsetDisplay) {
    if (state.testDayOffset > 0) {
      offsetDisplay.textContent = `⚡ Modo simulación: +${state.testDayOffset} día(s) en el futuro (Fecha: ${status.todayStr})`;
    } else {
      offsetDisplay.textContent = `Fecha real: ${status.todayStr}`;
    }
  }
}

function claimDailyStreak() {
  const status = getStreakStatus();

  if (!status.canClaim) {
    showToast('¡Ya has reclamado tu recompensa de hoy! Vuelve mañana para continuar tu racha 🔥', 'warning');
    return;
  }

  const newStreak = status.nextStreak;
  state.streak = newStreak;
  if (state.streak > state.bestStreak) {
    state.bestStreak = state.streak;
  }
  state.lastStreakDate = status.todayStr;
  state.totalStreakPoints += DAILY_LOGIN_POINTS;

  // Añadir exactamente 10 EcoPts al saldo del usuario
  state.addPoints(DAILY_LOGIN_POINTS, `🔥 Racha Diaria (Día ${newStreak}) - Login diario`);
  state.save();

  // Actualizar UI y celebraciones
  updatePointsDisplay();
  updateStreakUI();
  triggerConfetti();

  const rank = getStreakRank(newStreak);
  showToast(`¡Día ${newStreak} de racha conseguido! Ganaste +10 EcoPts 🔥 (${rank.title})`);
}

// Simulador para pruebas rápidas
function simulateAdvanceDay(days = 1) {
  state.testDayOffset += days;
  state.save();
  updateStreakUI();
  const status = getStreakStatus();
  showToast(`⚡ Día avanzado en +${days}. Fecha simulada: ${status.todayStr}`);
}

function resetStreak() {
  state.streak = 0;
  state.lastStreakDate = null;
  state.testDayOffset = 0;
  state.totalStreakPoints = 0;
  state.save();
  updateStreakUI();
  showToast('🔄 Racha y simulación reiniciadas con éxito.');
}

function openStreakModal() {
  updateStreakUI();
  const modal = document.getElementById('modal-streak');
  if (modal) modal.classList.add('active');
}

function closeStreakModal() {
  const modal = document.getElementById('modal-streak');
  if (modal) modal.classList.remove('active');
}

// ==========================================
// Modals
// ==========================================
function openPublishModal() {
  const modal = document.getElementById('modal-publish');
  if (modal) modal.classList.add('active');

  // Render presets
  const container = document.getElementById('preset-images-container');
  if (container) {
    container.innerHTML = PRESET_IMAGES.map(p => `
      <img src="${p.url}" alt="${p.label}" class="preset-thumb" onclick="selectPresetImage('${p.url}', this)" title="${p.label}">
    `).join('');
  }
}

function closePublishModal() {
  const modal = document.getElementById('modal-publish');
  if (modal) modal.classList.remove('active');
}

function selectPresetImage(url, element) {
  const input = document.getElementById('pub-image');
  if (input) input.value = url;
  document.querySelectorAll('.preset-thumb').forEach(el => el.classList.remove('selected'));
  if (element) element.classList.add('selected');
}

function openWalletModal() {
  updatePointsDisplay();
  const modal = document.getElementById('modal-wallet');
  if (modal) modal.classList.add('active');
}

function closeWalletModal() {
  const modal = document.getElementById('modal-wallet');
  if (modal) modal.classList.remove('active');
}

function openDetailModal(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  const modal = document.getElementById('modal-detail');
  const content = document.getElementById('detail-modal-content');
  if (!modal || !content) return;

  const canAfford = state.userPoints >= item.points;

  content.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title"><span>🌱</span> Detalle del Artículo</h3>
      <button class="btn-close" onclick="closeDetailModal()">&times;</button>
    </div>
    
    <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1rem; max-height: 240px;">
      <img src="${item.image}" alt="${escapeHTML(item.title)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80'">
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
      <div>
        <div class="card-category"><span>🏷️</span> ${escapeHTML(item.category)}</div>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main);">${escapeHTML(item.title)}</h3>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary-dark);">⭐ ${item.points} Pts</span>
      </div>
    </div>

    <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem;">
      ${escapeHTML(item.description || 'Artículo en excelente estado listo para ser reutilizado en la comunidad.')}
    </p>

    <div style="background: var(--color-primary-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 1.25rem; display: flex; justify-content: space-around; text-align: center;">
      <div>
        <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Estado</div>
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-primary-darker);">${escapeHTML(item.condition || 'Óptimo')}</div>
      </div>
      <div>
        <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Distancia</div>
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-primary-darker);">${escapeHTML(item.distance || '0.9 km')}</div>
      </div>
      <div>
        <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Impacto Positivo</div>
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-primary-darker);">${escapeHTML(item.co2 || '3.0 kg')} CO₂</div>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
      <button class="chip-btn" onclick="closeDetailModal()">Cerrar</button>
      <button 
        class="btn-primary ${!canAfford ? 'disabled' : ''}" 
        onclick="handleClaim('${item.id}'); closeDetailModal();"
      >
        <span>🤝</span> ${canAfford ? 'Confirmar Reclamo' : 'Puntos Insuficientes'}
      </button>
    </div>
  `;

  modal.classList.add('active');
}

function closeDetailModal() {
  const modal = document.getElementById('modal-detail');
  if (modal) modal.classList.remove('active');
}

// ==========================================
// Tabs & Navigation
// ==========================================
function switchTab(tabName) {
  state.currentTab = tabName;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  const views = {
    'feed': document.getElementById('view-feed'),
    'my-swaps': document.getElementById('view-my-swaps'),
    'impact': document.getElementById('view-impact'),
    'missions': document.getElementById('view-missions')
  };

  Object.entries(views).forEach(([name, el]) => {
    if (el) el.style.display = name === tabName ? 'block' : 'none';
  });

  if (tabName === 'feed') renderFeed();
  if (tabName === 'my-swaps') renderClaimed();
  if (tabName === 'missions') renderMissions();
}

// ==========================================
// Theme Toggle (Light / Dark)
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem('ecoswap_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ecoswap_theme', next);
  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
}

// ============================================================================
// FASE 3: MONETIZACIÓN, MOTOR DE PUBLICIDAD Y ADMIN DASHBOARD V2
// ============================================================================

// 1. Motor de Publicidad (Sponsored Banner)
let currentAdIndex = 0;
let adRotationInterval = null;

function renderSponsoredBanner() {
  const container = document.getElementById('sponsored-banner-section');
  if (!container) return;

  const activeAds = state.adCampaigns.filter(a => a.status === 'ACTIVE');
  if (activeAds.length === 0) {
    container.innerHTML = '';
    return;
  }

  const ad = activeAds[currentAdIndex % activeAds.length];
  // Incrementar conteo de visualización (impresión)
  ad.impressions = (ad.impressions || 0) + 1;
  state.save();

  container.innerHTML = `
    <div class="sponsored-banner-card" style="background: linear-gradient(135deg, rgba(6,78,59,0.92) 0%, rgba(15,23,42,0.95) 100%), url('${ad.imageUrl}') center/cover no-repeat; cursor: pointer;" onclick="handleAdClick('${ad.id}')">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span class="ad-badge" style="padding: 2px 10px; border-radius: 999px; font-size: 0.72rem;">⚡ Patrocinado (Ad)</span>
          <span style="font-size:0.75rem; color:#a7f3d0; font-weight:600;">Publicidad Sustentable Verificada • Ad Server</span>
        </div>
        <div style="display:flex; align-items:center; gap:0.6rem; font-size:0.75rem; color:#cbd5e1;">
          <span>👁️ ${ad.impressions.toLocaleString()} imp.</span>
          <span>🖱️ ${ad.clicks.toLocaleString()} clics</span>
          <span style="color:#fbbf24; font-weight:700;">CTR: ${ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : '0.0'}%</span>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap;">
        <div style="max-width: 650px;">
          <h3 style="font-size:1.15rem; font-weight:800; color:#fff; margin-bottom:0.25rem;">${escapeHTML(ad.title)}</h3>
          <p style="font-size:0.8rem; color:#e2e8f0; margin:0;">Marcas comprometidas con la neutralidad de carbono y productos circulares certificados.</p>
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <button class="btn-primary" style="background:#fbbf24; color:#1a1003; font-weight:800; border:none; padding:0.5rem 1rem; border-radius:10px; font-size:0.8rem;">
            Ver Anuncio ➔
          </button>
        </div>
      </div>

      <div style="display:flex; justify-content:center; gap:6px; margin-top:0.25rem;">
        ${activeAds.map((_, idx) => `
          <span style="width:${idx === currentAdIndex % activeAds.length ? '20px' : '6px'}; height:6px; border-radius:3px; background:${idx === currentAdIndex % activeAds.length ? '#fbbf24' : 'rgba(255,255,255,0.4)'}; transition:all 0.3s;"></span>
        `).join('')}
      </div>
    </div>
  `;
}

function startAdRotation() {
  if (adRotationInterval) clearInterval(adRotationInterval);
  renderSponsoredBanner();
  adRotationInterval = setInterval(() => {
    const activeAds = state.adCampaigns.filter(a => a.status === 'ACTIVE');
    if (activeAds.length > 1) {
      currentAdIndex = (currentAdIndex + 1) % activeAds.length;
      renderSponsoredBanner();
    }
  }, 7000);
}

function handleAdClick(adId) {
  const ad = state.adCampaigns.find(a => a.id === adId);
  if (!ad) return;
  ad.clicks = (ad.clicks || 0) + 1;
  state.save();
  showToast(`🖱️ Registrado clic en anuncio: "${ad.title}" (CTR actualizado)`);
  renderSponsoredBanner();
  window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
}

function handleSponsoredClick(productId) {
  const ad = SPONSORED_PRODUCTS_POOL.find(p => productId.startsWith(p.id)) || SPONSORED_PRODUCTS_POOL[0];
  showToast(`⚡ Abriendo producto patrocinado: ${ad.title}`);
  openDetailModal(productId);
}

// 2. Cabecera y Estado de Monetización
function updateHeaderMonetizationUI() {
  const isPremium = state.subscriptionTier === 'PREMIUM';
  const label = document.getElementById('header-premium-label');
  const tag = document.getElementById('header-premium-tag');
  const btn = document.getElementById('btn-open-premium');
  const cartCount = document.getElementById('header-cart-count');

  if (label) label.textContent = isPremium ? 'Socio Premium' : 'Club Premium';
  if (tag) tag.textContent = isPremium ? '⭐ VIP' : '⭐';
  if (btn) {
    if (isPremium) {
      btn.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
      btn.style.color = '#ffffff';
      btn.style.borderColor = '#34d399';
    } else {
      btn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      btn.style.color = '#1a1003';
      btn.style.borderColor = '#fbbf24';
    }
  }

  const totalCartQty = state.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  if (cartCount) cartCount.textContent = totalCartQty;
}

// 3. Sistema de Membresía EcoSwap Premium & Checkout
let currentPlanCycle = 'annual';

function openPremiumModal() {
  const modal = document.getElementById('modal-premium');
  if (!modal) return;
  updatePlanCycleDisplay();
  modal.classList.add('active');
}

function closePremiumModal() {
  const modal = document.getElementById('modal-premium');
  if (modal) modal.classList.remove('active');
}

function updatePlanCycleDisplay() {
  const priceDisplay = document.getElementById('premium-price-display');
  const priceDesc = document.getElementById('premium-price-desc');
  const btnAnnual = document.getElementById('btn-plan-annual');
  const btnMonthly = document.getElementById('btn-plan-monthly');

  if (currentPlanCycle === 'annual') {
    btnAnnual?.classList.add('active');
    btnMonthly?.classList.remove('active');
    if (priceDisplay) priceDisplay.innerHTML = `$39.99 <span class="price-sub">/ año ($3.33/mes)</span>`;
    if (priceDesc) priceDesc.textContent = 'Facturado anualmente. Ahorras un 35% y recibes +200 EcoPuntos de bienvenida.';
  } else {
    btnMonthly?.classList.add('active');
    btnAnnual?.classList.remove('active');
    if (priceDisplay) priceDisplay.innerHTML = `$4.99 <span class="price-sub">/ mes</span>`;
    if (priceDesc) priceDesc.textContent = 'Facturado mensualmente. Cancela cuando quieras sin contratos.';
  }
}

function handleSubscriptionCheckout(gateway) {
  // Simulación de pasarela de pago (Stripe o Mercado Pago)
  state.subscriptionTier = 'PREMIUM';
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  state.subscriptionExpiresAt = expiresAt.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  
  // Bono de bienvenida
  state.addPoints(200, `Bono de Bienvenida: Club EcoSwap Premium (${gateway})`);
  state.save();

  // Enviar correo transaccional
  sendEmailSimulation('WELCOME_PREMIUM', {
    to: 'lucas.verde@ecoswap.eco',
    name: 'Lucas Verde',
    expiresAt: state.subscriptionExpiresAt,
    gateway
  });

  updateHeaderMonetizationUI();
  updatePointsDisplay();
  closePremiumModal();
  triggerConfetti();
  showToast(`🎉 ¡Membresía PREMIUM activada con ${gateway}! Envíos $0 y EcoPuntos x2 garantizados.`);
}

// 4. Carrito de Compras Sustentable (Beneficios Premium)
function openCartModal() {
  const modal = document.getElementById('modal-cart');
  if (!modal) return;
  renderCartModal();
  modal.classList.add('active');
}

function closeCartModal() {
  const modal = document.getElementById('modal-cart');
  if (modal) modal.classList.remove('active');
}

function addToCart(productId) {
  let prod = state.items.find(i => i.id === productId);
  if (!prod) {
    prod = SPONSORED_PRODUCTS_POOL.find(i => productId.startsWith(i.id));
  }
  if (!prod) return;

  const existing = state.cart.find(c => c.id === prod.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    state.cart.push({
      id: prod.id,
      title: prod.title,
      price: prod.price || 15.0,
      points: prod.points || 50,
      quantity: 1,
      image: prod.image
    });
  }
  state.save();
  updateHeaderMonetizationUI();
  showToast(`🛒 "${prod.title}" agregado al carrito de compras`);
}

function renderCartModal() {
  const container = document.getElementById('cart-items-container');
  const banner = document.getElementById('cart-premium-banner');
  const tierIndicator = document.getElementById('cart-tier-indicator');
  const subtotalVal = document.getElementById('cart-subtotal-val');
  const shippingVal = document.getElementById('cart-shipping-val');
  const totalVal = document.getElementById('cart-total-val');
  const pointsVal = document.getElementById('cart-points-val');

  const isPremium = state.subscriptionTier === 'PREMIUM';

  if (tierIndicator) {
    tierIndicator.innerHTML = `Nivel: <strong style="color:${isPremium ? '#f59e0b' : 'var(--text-muted)'}">${isPremium ? 'PREMIUM ⭐' : 'FREE 🌱'}</strong> (<a href="#" onclick="toggleTierSimulation(); return false;" style="color:var(--color-primary); font-weight:700;">alternar</a>)`;
  }

  // Banner Premium
  if (banner) {
    if (isPremium) {
      banner.className = 'cart-premium-alert active-premium';
      banner.innerHTML = `
        <span style="font-size:1.3rem;">👑</span>
        <div>
          <strong>¡Beneficios Club EcoSwap Premium Activos!</strong><br>
          <span>Tu costo de envío es <strong>$0.00</strong> y tus EcoPuntos se multiplican por <strong>2 (x2)</strong>.</span>
        </div>
      `;
    } else {
      banner.className = 'cart-premium-alert free-upsell';
      banner.innerHTML = `
        <div>
          <strong>¿Quieres Envío GRATIS ($0)?</strong><br>
          <span style="font-size:0.75rem;">Sube a EcoSwap Premium y duplica tus EcoPuntos automáticamente.</span>
        </div>
        <button class="chip-btn" onclick="closeCartModal(); openPremiumModal();" style="background:#f59e0b; color:#1a1003; font-weight:800; border:none;">
          Ser Premium ➔
        </button>
      `;
    }
  }

  if (state.cart.length === 0) {
    if (container) {
      container.innerHTML = `
        <div style="text-align:center; padding:2rem 1rem; color:var(--text-muted);">
          <div style="font-size:2rem; margin-bottom:0.5rem;">🍃</div>
          <p>Tu carrito está vacío.</p>
        </div>
      `;
    }
    if (subtotalVal) subtotalVal.textContent = '$0.00';
    if (shippingVal) shippingVal.textContent = '$0.00';
    if (totalVal) totalVal.textContent = '$0.00';
    if (pointsVal) pointsVal.textContent = '+0 Pts';
    return;
  }

  // Cálculos de subtotal
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // REQUISITO: Si el usuario es PREMIUM, envío es automáticamente $0
  const STANDARD_SHIPPING = 5.0;
  const shippingCost = isPremium ? 0.0 : STANDARD_SHIPPING;
  const totalAmount = subtotal + shippingCost;

  // REQUISITO: Si el usuario es PREMIUM, cálculo de EcoPuntos se multiplica por 2
  const multiplier = isPremium ? 2 : 1;
  const ecoPointsEarned = Math.floor(subtotal * multiplier);

  if (subtotalVal) subtotalVal.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingVal) shippingVal.innerHTML = isPremium ? '<strong style="color:var(--color-primary);">$0.00 (Envío Gratuito)</strong>' : `$${shippingCost.toFixed(2)}`;
  if (totalVal) totalVal.textContent = `$${totalAmount.toFixed(2)}`;
  if (pointsVal) pointsVal.innerHTML = `+${ecoPointsEarned} Pts ${isPremium ? '<span style="color:#f59e0b; font-size:0.75rem; font-weight:800;">(x2 Multiplicador Premium)</span>' : ''}`;

  if (container) {
    container.innerHTML = state.cart.map(item => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0; border-bottom:1px solid var(--border-light);">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <img src="${item.image}" alt="${escapeHTML(item.title)}" style="width:42px; height:42px; object-fit:cover; border-radius:8px;">
          <div>
            <div style="font-weight:700; font-size:0.85rem;">${escapeHTML(item.title)}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">$${item.price.toFixed(2)} c/u</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <button class="chip-btn" onclick="updateCartItemQty('${item.id}', -1)" style="padding:2px 8px;">-</button>
          <span style="font-weight:700; font-size:0.85rem;">${item.quantity}</span>
          <button class="chip-btn" onclick="updateCartItemQty('${item.id}', 1)" style="padding:2px 8px;">+</button>
          <span style="font-weight:800; font-size:0.9rem; min-width:55px; text-align:right;">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    `).join('');
  }
}

function updateCartItemQty(id, delta) {
  const item = state.cart.find(c => c.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(c => c.id !== id);
  }
  state.save();
  updateHeaderMonetizationUI();
  renderCartModal();
}

function toggleTierSimulation() {
  state.subscriptionTier = state.subscriptionTier === 'PREMIUM' ? 'FREE' : 'PREMIUM';
  state.save();
  updateHeaderMonetizationUI();
  renderCartModal();
  showToast(`Nivel cambiado a: ${state.subscriptionTier} (Beneficios recalculados al instante)`);
}

function handleCartCheckout() {
  if (state.cart.length === 0) return;

  const isPremium = state.subscriptionTier === 'PREMIUM';
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = isPremium ? 0.0 : 5.0;
  const totalAmount = subtotal + shippingCost;
  const multiplier = isPremium ? 2 : 1;
  const ecoPointsEarned = Math.floor(subtotal * multiplier);
  const orderId = `ORD_${Date.now().toString().slice(-6)}`;

  // Asignar puntos
  state.addPoints(ecoPointsEarned, `Compra E-Commerce #${orderId} ${isPremium ? '(Beneficio x2 Premium)' : ''}`);

  // Disparar correo transaccional de confirmación
  sendEmailSimulation('ORDER_CONFIRMED', {
    to: 'lucas.verde@ecoswap.eco',
    name: 'Lucas Verde',
    orderId,
    total: totalAmount,
    shippingCost,
    subtotal,
    points: ecoPointsEarned,
    isPremium
  });

  state.cart = [];
  state.save();

  updateHeaderMonetizationUI();
  updatePointsDisplay();
  closeCartModal();
  triggerConfetti();
  showToast(`🎉 ¡Orden #${orderId} completada! Has ganado +${ecoPointsEarned} EcoPuntos.`);
}

// 5. Admin Dashboard v2 con Sidebar & 4 Pestañas
let currentAdminTab = 'overview';

function openAdminModal() {
  const modal = document.getElementById('modal-admin');
  if (!modal) return;

  // Middleware Check: Verificar si usuario es ADMIN
  if (state.userRole !== 'ADMIN') {
    showToast('⚠️ [MIDDLEWARE ERROR] Acceso denegado: Se requiere rol de ADMIN.', 'error');
  }

  updateAdminRoleBadge();
  renderAdminTab(currentAdminTab);
  modal.classList.add('active');
}

function closeAdminModal() {
  const modal = document.getElementById('modal-admin');
  if (modal) modal.classList.remove('active');
}

function updateAdminRoleBadge() {
  const badge = document.getElementById('admin-current-role-badge');
  const simText = document.getElementById('sim-role-text');
  if (badge) {
    badge.textContent = `Rol: ${state.userRole} • ${state.userRole === 'ADMIN' ? 'Acceso Autorizado' : 'Bloqueado por middleware.ts'}`;
  }
  if (simText) simText.textContent = state.userRole;
}

function toggleAdminRoleSimulation() {
  state.userRole = state.userRole === 'ADMIN' ? 'USER' : 'ADMIN';
  state.save();
  updateAdminRoleBadge();
  renderAdminTab(currentAdminTab);
  showToast(`Rol simulado: ${state.userRole}`);
}

function switchAdminTab(tab) {
  currentAdminTab = tab;
  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.admintab === tab);
  });
  renderAdminTab(tab);
}

function renderAdminTab(tab) {
  const main = document.getElementById('admin-main-content');
  if (!main) return;

  // Si no es admin y middleware bloquea
  if (state.userRole !== 'ADMIN') {
    main.innerHTML = `
      <div style="background:#fef2f2; border:1px solid #fecdd3; border-radius:14px; padding:2.5rem 1.5rem; text-align:center;">
        <div style="font-size:2.5rem; margin-bottom:0.5rem;">🛑</div>
        <h3 style="color:#991b1b; font-weight:800; font-size:1.2rem;">Acceso Denegado por middleware.ts</h3>
        <p style="color:#b91c1c; font-size:0.85rem; margin:0.5rem 0 1.25rem;">
          La ruta protegida <code>/admin/*</code> requiere rol de <strong>ADMIN</strong>. Tu rol actual es <code>${state.userRole}</code>.
        </p>
        <button class="btn-primary" onclick="toggleAdminRoleSimulation();" style="background:#ef4444; color:#fff; font-weight:800;">
          Cambiar a Rol ADMIN para Probar
        </button>
      </div>
    `;
    return;
  }

  if (tab === 'overview') {
    renderAdminOverview(main);
  } else if (tab === 'users') {
    renderAdminUsers(main);
  } else if (tab === 'ads') {
    renderAdminAds(main);
  } else if (tab === 'inventory') {
    renderAdminInventory(main);
  } else if (tab === 'emails') {
    renderAdminEmails(main);
  }
}

function renderAdminOverview(container) {
  container.innerHTML = `
    <div>
      <h3 style="font-size:1.15rem; font-weight:900; margin-bottom:0.25rem;">📊 Dashboard General de Métricas</h3>
      <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:1.25rem;">Monitoreo en tiempo real de ingresos, membresías Premium y rotación de anuncios.</p>

      <div class="admin-kpi-grid">
        <div class="admin-kpi-card">
          <div class="admin-kpi-label">Ingresos Totales (MRR)</div>
          <div class="admin-kpi-val" style="color:var(--color-primary-dark);">$28,450.00</div>
          <span style="font-size:0.7rem; color:var(--color-primary); font-weight:700;">+24% este mes</span>
        </div>

        <div class="admin-kpi-card">
          <div class="admin-kpi-label">Socios Premium Activos</div>
          <div class="admin-kpi-val" style="color:#f59e0b;">420 socios</div>
          <span style="font-size:0.7rem; color:var(--text-muted);">18.6% del total</span>
        </div>

        <div class="admin-kpi-card">
          <div class="admin-kpi-label">Campañas Publicitarias</div>
          <div class="admin-kpi-val" style="color:#6366f1;">${state.adCampaigns.length} activas</div>
          <span style="font-size:0.7rem; color:var(--text-muted);">CTR promedio: 8.8%</span>
        </div>

        <div class="admin-kpi-card">
          <div class="admin-kpi-label">EcoPuntos en Circulación</div>
          <div class="admin-kpi-val" style="color:var(--color-primary-dark);">84,500 Pts</div>
          <span style="font-size:0.7rem; color:var(--color-primary); font-weight:700;">~1,840 kg CO₂ evitado</span>
        </div>
      </div>

      <!-- Gráficos Visuales de Ingresos y Usuarios (Chart.js / SVG representation) -->
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-top:1rem;">
        <!-- Gráfico 1: Evolución de Ingresos -->
        <div style="background:var(--bg-surface); border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <strong style="font-size:0.85rem;">📈 Desglose Mensual de Ingresos</strong>
            <span style="font-size:0.7rem; color:var(--text-muted);">Suscripciones vs Ads</span>
          </div>

          <div style="height:140px; display:flex; align-items:flex-end; justify-content:space-between; gap:0.5rem; padding-bottom:0.5rem; border-bottom:1px solid var(--border-light);">
            ${[
              { m: 'May', s: 45, a: 20 },
              { m: 'Jun', s: 55, a: 25 },
              { m: 'Jul', s: 65, a: 30 },
              { m: 'Ago', s: 80, a: 38 },
              { m: 'Sep', s: 92, a: 45 },
              { m: 'Oct', s: 105, a: 55 }
            ].map(col => `
              <div style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end; gap:2px;">
                <div style="width:100%; max-width:26px; height:${col.a}%; background:#fbbf24; border-radius:3px 3px 0 0;" title="Ads: $${col.a * 100}"></div>
                <div style="width:100%; max-width:26px; height:${col.s}%; background:#10b981; border-radius:0 0 3px 3px;" title="Subs: $${col.s * 100}"></div>
                <span style="font-size:0.65rem; color:var(--text-muted); margin-top:4px;">${col.m}</span>
              </div>
            `).join('')}
          </div>

          <div style="display:flex; justify-content:center; gap:1rem; margin-top:0.6rem; font-size:0.72rem;">
            <span style="display:flex; align-items:center; gap:4px;"><span style="width:10px; height:10px; background:#10b981; border-radius:2px;"></span> Suscripciones</span>
            <span style="display:flex; align-items:center; gap:4px;"><span style="width:10px; height:10px; background:#fbbf24; border-radius:2px;"></span> Publicidad Ads</span>
          </div>
        </div>

        <!-- Gráfico 2: Usuarios Free vs Premium -->
        <div style="background:var(--bg-surface); border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1rem; display:flex; flex-direction:column; justify-content:space-between;">
          <strong style="font-size:0.85rem; margin-bottom:0.5rem;">👥 Usuarios: Premium vs Free</strong>

          <div style="display:flex; align-items:center; justify-content:center; padding:0.5rem 0; position:relative;">
            <svg viewBox="0 0 36 36" style="width:120px; height:120px; transform:rotate(-90deg);">
              <path stroke="#e2e8f0" stroke-width="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
              <path stroke="#f59e0b" stroke-dasharray="19, 100" stroke-width="4" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            </svg>
            <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; pointer-events:none;">
              <span style="font-size:1.2rem; font-weight:900;">18.6%</span>
              <span style="font-size:0.65rem; color:#f59e0b; font-weight:800;">PREMIUM</span>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; font-size:0.75rem; border-top:1px solid var(--border-light); padding-top:0.5rem;">
            <span>⭐ 420 Premium</span>
            <span>🌱 1,840 Free</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAdminUsers(container) {
  container.innerHTML = `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <div>
          <h3 style="font-size:1.15rem; font-weight:900; margin-bottom:0.25rem;">👥 Gestor de Usuarios & Membresías</h3>
          <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Administra permisos, suspende cuentas o promueve a Administrador.</p>
        </div>
      </div>

      <div style="overflow-x:auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Membresía</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>EcoPuntos</th>
              <th style="text-align:right;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${state.usersList.map(u => `
              <tr>
                <td>
                  <strong>${escapeHTML(u.name)}</strong><br>
                  <span style="font-size:0.72rem; color:var(--text-muted); font-family:monospace;">${escapeHTML(u.email)}</span>
                </td>
                <td>
                  <span class="chip-btn" style="padding:2px 8px; font-size:0.72rem; font-weight:800; ${u.subscriptionTier === 'PREMIUM' ? 'background:#fef3c7; color:#92400e;' : ''}">
                    ${u.subscriptionTier === 'PREMIUM' ? '⭐ PREMIUM' : '🌱 FREE'}
                  </span>
                </td>
                <td>
                  <span style="font-weight:700; font-size:0.75rem; color:${u.role === 'ADMIN' ? '#4338ca' : 'inherit'};">
                    ${u.role}
                  </span>
                </td>
                <td>
                  <span style="font-weight:700; font-size:0.75rem; color:${u.status === 'ACTIVE' ? 'var(--color-primary)' : 'var(--color-danger)'};">
                    ${u.status === 'ACTIVE' ? '● Activo' : '✕ Suspendido'}
                  </span>
                </td>
                <td><strong>${u.ecoPoints} Pts</strong></td>
                <td style="text-align:right;">
                  <button class="chip-btn" onclick="toggleAdminUserRole('${u.id}')" style="font-size:0.72rem;">
                    ${u.role === 'ADMIN' ? 'Revocar Admin' : 'Hacer Admin'}
                  </button>
                  <button class="chip-btn" onclick="toggleAdminUserStatus('${u.id}')" style="font-size:0.72rem; color:${u.status === 'ACTIVE' ? 'var(--color-danger)' : 'var(--color-primary)'};">
                    ${u.status === 'ACTIVE' ? 'Suspender' : 'Reactivar'}
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function toggleAdminUserStatus(userId) {
  const user = state.usersList.find(u => u.id === userId);
  if (!user) return;
  user.status = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
  state.save();
  renderAdminUsers(document.getElementById('admin-main-content'));
  showToast(`Estado de ${user.name} actualizado a: ${user.status}`);
}

function toggleAdminUserRole(userId) {
  const user = state.usersList.find(u => u.id === userId);
  if (!user) return;
  user.role = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
  state.save();
  renderAdminUsers(document.getElementById('admin-main-content'));
  showToast(`Rol de ${user.name} actualizado a: ${user.role}`);
}

function renderAdminAds(container) {
  container.innerHTML = `
    <div>
      <h3 style="font-size:1.15rem; font-weight:900; margin-bottom:0.25rem;">📢 Gestor de Publicidad & Campañas</h3>
      <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:1.25rem;">Crea nuevas campañas patrocinadas y monitorea el CTR en tiempo real.</p>

      <!-- Formulario Crear Campaña -->
      <div style="background:var(--bg-surface); border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.25rem;">
        <h4 style="font-size:0.9rem; font-weight:800; margin-bottom:0.75rem;">➕ Nueva Campaña Publicitaria (AdCampaign)</h4>
        <form id="admin-create-ad-form" onsubmit="handleCreateAdSubmit(event);" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:0.75rem;">
          <div>
            <label style="font-size:0.72rem; font-weight:700;">Título del Anuncio:</label>
            <input type="text" id="new-ad-title" required placeholder="Ej: 🚴‍♂️ Bicicletas Bambú: 20% OFF" style="width:100%; padding:0.5rem; border:1px solid var(--border-light); border-radius:8px; font-size:0.8rem;">
          </div>
          <div>
            <label style="font-size:0.72rem; font-weight:700;">URL Imagen Banner:</label>
            <input type="url" id="new-ad-image" required value="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" style="width:100%; padding:0.5rem; border:1px solid var(--border-light); border-radius:8px; font-size:0.8rem;">
          </div>
          <div>
            <label style="font-size:0.72rem; font-weight:700;">URL Destino (Target):</label>
            <input type="url" id="new-ad-url" required value="https://ecoswap.eco" style="width:100%; padding:0.5rem; border:1px solid var(--border-light); border-radius:8px; font-size:0.8rem;">
          </div>
          <div>
            <label style="font-size:0.72rem; font-weight:700;">Presupuesto ($ USD):</label>
            <input type="number" id="new-ad-budget" required min="10" value="350" style="width:100%; padding:0.5rem; border:1px solid var(--border-light); border-radius:8px; font-size:0.8rem;">
          </div>
          <div style="display:flex; align-items:flex-end;">
            <button type="submit" class="btn-primary" style="width:100%; justify-content:center; padding:0.5rem; font-size:0.82rem;">
              Publicar Campaña
            </button>
          </div>
        </form>
      </div>

      <!-- Tabla de Campañas con CTR -->
      <div style="overflow-x:auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Campaña</th>
              <th>Presupuesto</th>
              <th>Impresiones</th>
              <th>Clics</th>
              <th>CTR (%)</th>
              <th>Estado</th>
              <th style="text-align:right;">Acción</th>
            </tr>
          </thead>
          <tbody>
            ${state.adCampaigns.map(c => {
              const ctr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(2) : '0.00';
              return `
                <tr>
                  <td>
                    <strong>${escapeHTML(c.title)}</strong><br>
                    <a href="${c.targetUrl}" target="_blank" style="font-size:0.72rem; color:var(--color-primary);">${c.targetUrl}</a>
                  </td>
                  <td><strong>$${c.budget.toFixed(2)}</strong></td>
                  <td>${c.impressions.toLocaleString()}</td>
                  <td>${c.clicks.toLocaleString()}</td>
                  <td><strong style="color:#f59e0b;">${ctr}%</strong></td>
                  <td>
                    <span class="chip-btn" style="padding:2px 8px; font-size:0.72rem; font-weight:800; ${c.status === 'ACTIVE' ? 'background:#d1fae5; color:#065f46;' : 'background:#f1f5f9; color:#475569;'}">
                      ${c.status}
                    </span>
                  </td>
                  <td style="text-align:right;">
                    <button class="chip-btn" onclick="toggleAdminAdStatus('${c.id}')" style="font-size:0.72rem;">
                      ${c.status === 'ACTIVE' ? 'Pausar' : 'Reanudar'}
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function handleCreateAdSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('new-ad-title').value.trim();
  const imageUrl = document.getElementById('new-ad-image').value.trim();
  const targetUrl = document.getElementById('new-ad-url').value.trim();
  const budget = parseFloat(document.getElementById('new-ad-budget').value) || 100;

  const newAd = {
    id: `ad_${Date.now()}`,
    title,
    imageUrl,
    targetUrl,
    budget,
    status: 'ACTIVE',
    impressions: 0,
    clicks: 0
  };

  state.adCampaigns.unshift(newAd);
  state.save();
  renderAdminAds(document.getElementById('admin-main-content'));
  renderSponsoredBanner();
  showToast(`✅ Campaña "${title}" creada exitosamente.`);
}

function toggleAdminAdStatus(adId) {
  const ad = state.adCampaigns.find(a => a.id === adId);
  if (!ad) return;
  ad.status = ad.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
  state.save();
  renderAdminAds(document.getElementById('admin-main-content'));
  renderSponsoredBanner();
  showToast(`Campaña ${ad.status === 'ACTIVE' ? 'activada' : 'pausada'}.`);
}

function renderAdminInventory(container) {
  container.innerHTML = `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
        <div>
          <h3 style="font-size:1.15rem; font-weight:900; margin-bottom:0.25rem;">📦 Gestor de Inventario con Edición Rápida</h3>
          <p style="font-size:0.8rem; color:var(--text-muted); margin:0;">Modifica precios y existencias en la tabla sin salir de la página.</p>
        </div>
        <span class="chip-btn" style="background:#fef2f2; color:#b91c1c; font-weight:800; font-size:0.72rem; border:1px solid #fecdd3;">
          ⚠️ Umbral Crítico: &lt; 5 unidades
        </span>
      </div>

      <div style="overflow-x:auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio ($ USD)</th>
              <th>Stock</th>
              <th>Patrocinado (Ad)</th>
              <th style="text-align:right;">Guardar / Acción</th>
            </tr>
          </thead>
          <tbody>
            ${state.items.map(item => {
              const isLow = item.stock < 5;
              return `
                <tr style="${isLow ? 'background: rgba(254, 226, 226, 0.25);' : ''}">
                  <td>
                    <strong>${escapeHTML(item.title)}</strong><br>
                    ${isLow ? '<span style="font-size:0.7rem; color:#dc2626; font-weight:800;">⚠️ Stock bajo (&lt; 5) - Alerta disponible</span>' : ''}
                  </td>
                  <td>${escapeHTML(item.category)}</td>
                  <td>
                    <input type="number" step="0.5" id="inv-price-${item.id}" value="${item.price}" style="width:75px; padding:3px 6px; border:1px solid var(--border-light); border-radius:6px; font-weight:700;">
                  </td>
                  <td>
                    <input type="number" min="0" id="inv-stock-${item.id}" value="${item.stock}" style="width:65px; padding:3px 6px; border:1px solid ${isLow ? '#ef4444' : 'var(--border-light)'}; border-radius:6px; font-weight:800; color:${isLow ? '#dc2626' : 'inherit'};">
                  </td>
                  <td>
                    <button class="chip-btn" onclick="toggleItemSponsored('${item.id}')" style="font-size:0.72rem; font-weight:800; ${item.isSponsored ? 'background:#f59e0b; color:#1a1003;' : ''}">
                      ${item.isSponsored ? '⚡ Patrocinado' : 'Normal'}
                    </button>
                  </td>
                  <td style="text-align:right;">
                    <button class="btn-primary" onclick="saveInventoryRow('${item.id}')" style="padding:3px 10px; font-size:0.75rem;">
                      💾 Guardar
                    </button>
                    ${isLow ? `
                      <button class="chip-btn" onclick="triggerLowStockAlertEmail('${item.id}')" title="Despachar correo transaccional de alerta de stock bajo" style="font-size:0.72rem; color:#dc2626; border-color:#fecdd3;">
                        📧 Enviar Alerta
                      </button>
                    ` : ''}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function saveInventoryRow(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  const priceInput = document.getElementById(`inv-price-${itemId}`);
  const stockInput = document.getElementById(`inv-stock-${itemId}`);

  const newPrice = parseFloat(priceInput?.value) || item.price;
  const newStock = parseInt(stockInput?.value) || item.stock;

  item.price = newPrice;
  item.stock = newStock;
  state.save();

  // Si stock cayó a menos de 5, simular envío de correo de alerta
  if (newStock < 5) {
    sendEmailSimulation('LOW_STOCK_ALERT', {
      adminEmail: 'admin@ecoswap.eco',
      productTitle: item.title,
      stock: newStock,
      productId: item.id
    });
  }

  renderAdminInventory(document.getElementById('admin-main-content'));
  renderFeed();
  showToast(`✅ Producto "${item.title}" actualizado: $${newPrice} | ${newStock} un.`);
}

function toggleItemSponsored(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;
  item.isSponsored = !item.isSponsored;
  state.save();
  renderAdminInventory(document.getElementById('admin-main-content'));
  renderFeed();
  showToast(`Producto ${item.isSponsored ? 'marcado como PATROCINADO (Ad)' : 'removido de patrocinados'}.`);
}

function triggerLowStockAlertEmail(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;
  sendEmailSimulation('LOW_STOCK_ALERT', {
    adminEmail: 'admin@ecoswap.eco',
    productTitle: item.title,
    stock: item.stock,
    productId: item.id
  });
}

function renderAdminEmails(container) {
  container.innerHTML = `
    <div>
      <h3 style="font-size:1.15rem; font-weight:900; margin-bottom:0.25rem;">📧 Notificaciones Transaccionales (Emails)</h3>
      <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:1.25rem;">Plantillas HTML automatizadas preparadas para Resend / Nodemailer.</p>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem;">
        <div style="background:var(--bg-surface); border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1rem; text-align:center;">
          <div style="font-size:2rem; margin-bottom:0.5rem;">⭐</div>
          <strong style="font-size:0.85rem;">Bienvenido a EcoSwap Premium</strong>
          <p style="font-size:0.75rem; color:var(--text-muted); margin:0.4rem 0 0.8rem;">Enviado tras el checkout exitoso en Stripe o Mercado Pago.</p>
          <button class="chip-btn" onclick="openEmailPreviewModal('WELCOME_PREMIUM')" style="font-size:0.75rem; font-weight:700;">
            Ver Plantilla HTML ➔
          </button>
        </div>

        <div style="background:var(--bg-surface); border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1rem; text-align:center;">
          <div style="font-size:2rem; margin-bottom:0.5rem;">📦</div>
          <strong style="font-size:0.85rem;">Tu orden ha sido confirmada</strong>
          <p style="font-size:0.75rem; color:var(--text-muted); margin:0.4rem 0 0.8rem;">Detalle de compra, desglose de envíos $0 y EcoPuntos x2.</p>
          <button class="chip-btn" onclick="openEmailPreviewModal('ORDER_CONFIRMED')" style="font-size:0.75rem; font-weight:700;">
            Ver Plantilla HTML ➔
          </button>
        </div>

        <div style="background:var(--bg-surface); border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1rem; text-align:center;">
          <div style="font-size:2rem; margin-bottom:0.5rem;">⚠️</div>
          <strong style="font-size:0.85rem;">Alerta de Stock Bajo (Admins)</strong>
          <p style="font-size:0.75rem; color:var(--text-muted); margin:0.4rem 0 0.8rem;">Disparado automáticamente cuando las existencias son &lt; 5 unidades.</p>
          <button class="chip-btn" onclick="openEmailPreviewModal('LOW_STOCK_ALERT')" style="font-size:0.75rem; font-weight:700;">
            Ver Plantilla HTML ➔
          </button>
        </div>
      </div>
    </div>
  `;
}

// 6. Notificaciones Transaccionales & Modal de Vista Previa HTML
function sendEmailSimulation(type, data) {
  let subject = '';
  let recipient = data.to || data.adminEmail || 'usuario@ecoswap.eco';

  if (type === 'WELCOME_PREMIUM') {
    subject = '⭐ ¡Bienvenido al Club EcoSwap Premium! Envíos gratis y el doble de EcoPuntos';
  } else if (type === 'ORDER_CONFIRMED') {
    subject = `📦 Orden Confirmada #${data.orderId} - EcoSwap Sustentable`;
  } else if (type === 'LOW_STOCK_ALERT') {
    subject = `⚠️ [ALERTA INTERNA ADMIN] Stock Crítico en Catálogo: ${data.productTitle}`;
  }

  console.log('------------------------------------------------------------');
  console.log(`📧 [EMAIL TRANSMITTED VIA MAILER.TS]`);
  console.log(`📨 Para: ${recipient}`);
  console.log(`📌 Asunto: ${subject}`);
  console.log(`📝 Datos:`, data);
  console.log('------------------------------------------------------------');

  showToast(`📧 Correo enviado: "${subject.slice(0, 42)}..." a ${recipient}`);
}

function openEmailPreviewModal(type) {
  const modal = document.getElementById('modal-email-preview');
  const frame = document.getElementById('email-preview-frame');
  if (!modal || !frame) return;

  const getTemplateHtml = (t) => {
    if (t === 'WELCOME_PREMIUM') {
      return `
        <div style="font-family:sans-serif; padding:24px; color:#1f2937; max-width:580px; margin:0 auto; background:#fff;">
          <div style="background:linear-gradient(135deg,#059669,#10b981); color:#fff; padding:24px; border-radius:12px; text-align:center;">
            <span style="background:#fbbf24; color:#78350f; font-weight:800; font-size:11px; padding:3px 10px; border-radius:99px; text-transform:uppercase;">Club Verde</span>
            <h2 style="margin:8px 0;">¡Bienvenido a EcoSwap Premium! 🌱</h2>
            <p style="margin:0; opacity:0.95;">Hola Lucas Verde, gracias por impulsar la economía circular.</p>
          </div>
          <div style="padding:16px 0;">
            <p>Tu membresía anual está activa hasta el <strong>28 de octubre de 2027</strong>. Beneficios activos:</p>
            <div style="background:#f9fafb; padding:10px 14px; border-radius:8px; margin-bottom:8px;">🚚 <strong>Envíos 100% Gratuitos ($0)</strong> en todos tus canjes.</div>
            <div style="background:#f9fafb; padding:10px 14px; border-radius:8px; margin-bottom:8px;">⭐ <strong>El doble de EcoPuntos (x2)</strong> en cada compra.</div>
            <div style="background:#f9fafb; padding:10px 14px; border-radius:8px;">👑 <strong>Acceso al catálogo exclusivo</strong> de productos sustentables.</div>
          </div>
        </div>
      `;
    } else if (t === 'ORDER_CONFIRMED') {
      return `
        <div style="font-family:sans-serif; padding:24px; color:#1e293b; max-width:580px; margin:0 auto; background:#fff;">
          <div style="background:#0f172a; color:#fff; padding:20px; border-radius:12px;">
            <h2 style="margin:0;">🎉 ¡Tu orden ha sido confirmada!</h2>
            <span style="font-size:12px; color:#94a3b8;">Orden #ORD_883912</span>
          </div>
          <div style="padding:16px 0;">
            <p>Hola <strong>Lucas Verde</strong>, tu pedido ya está en preparación para entrega ecológica.</p>
            <table style="width:100%; border-collapse:collapse; font-size:13px;">
              <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:6px 0;">Cafetera de émbolo (x1)</td><td style="text-align:right;">$24.50</td></tr>
              <tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:6px 0;">Monstera Deliciosa (x1)</td><td style="text-align:right;">$12.00</td></tr>
              <tr><td style="padding:6px 0;">Envío:</td><td style="text-align:right; color:#10b981; font-weight:700;">$0.00 (Gratis Premium)</td></tr>
              <tr style="font-weight:800; font-size:15px;"><td style="padding:8px 0;">Total Pagado:</td><td style="text-align:right;">$36.50</td></tr>
            </table>
            <div style="background:#ecfdf5; border:1px solid #a7f3d0; color:#065f46; padding:10px; border-radius:8px; text-align:center; margin-top:14px; font-weight:700;">
              🌿 Has ganado <strong>+72 EcoPuntos</strong> (¡Multiplicador x2 Premium activo!)
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div style="font-family:sans-serif; padding:24px; color:#1e293b; max-width:580px; margin:0 auto; background:#fff;">
          <div style="background:#ea580c; color:#fff; padding:20px; border-radius:12px;">
            <h2 style="margin:0;">⚠️ [ALERTA ADMIN] Stock Crítico en Catálogo</h2>
          </div>
          <div style="padding:16px 0;">
            <p>Estimado Administrador,</p>
            <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:14px; color:#9f1239;">
              <strong>Cafetera de émbolo (Vidrio Borosilicato)</strong><br>
              <span>ID: prod_2</span><br>
              <span style="color:#dc2626; font-weight:800;">Unidades restantes: 3 (Umbral mínimo: 5)</span>
            </div>
            <p style="font-size:13px; color:#64748b; margin-top:12px;">Actualiza el inventario en el panel de administración para evitar quiebres.</p>
          </div>
        </div>
      `;
    }
  };

  frame.innerHTML = getTemplateHtml(type);

  // Tab activation
  document.getElementById('btn-email-tab-premium')?.classList.toggle('active', type === 'WELCOME_PREMIUM');
  document.getElementById('btn-email-tab-order')?.classList.toggle('active', type === 'ORDER_CONFIRMED');
  document.getElementById('btn-email-tab-stock')?.classList.toggle('active', type === 'LOW_STOCK_ALERT');

  modal.classList.add('active');
}

// ==========================================
// Init & Event Listeners
// ==========================================
function tickStreakCountdown() {
  const countdownText = getMidnightCountdown();
  const widgetTimer = document.getElementById('widget-countdown-timer');
  const modalTimer = document.getElementById('modal-countdown-timer');
  if (widgetTimer) widgetTimer.textContent = countdownText;
  if (modalTimer) modalTimer.textContent = countdownText;
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updatePointsDisplay();
  renderFeed();
  renderMissions();
  updateStreakUI();
  updateHeaderMonetizationUI();
  startAdRotation();

  // Iniciar reloj de cuenta regresiva para la racha diaria
  tickStreakCountdown();
  setInterval(tickStreakCountdown, 1000);

  // Theme toggle
  document.getElementById('btn-toggle-theme')?.addEventListener('click', toggleTheme);

  // Home logo click
  document.getElementById('btn-brand-home')?.addEventListener('click', () => switchTab('feed'));

  // Racha Diaria (Header, Widget, Modal & Wallet)
  document.getElementById('btn-open-streak')?.addEventListener('click', openStreakModal);
  document.getElementById('btn-close-streak')?.addEventListener('click', closeStreakModal);
  document.getElementById('btn-widget-claim')?.addEventListener('click', claimDailyStreak);
  document.getElementById('btn-modal-claim')?.addEventListener('click', claimDailyStreak);
  document.getElementById('btn-wallet-open-streak-details')?.addEventListener('click', () => {
    closeWalletModal();
    openStreakModal();
  });
  document.getElementById('btn-explore-swaps')?.addEventListener('click', () => {
    switchTab('feed');
    document.getElementById('items-grid')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Botones del Simulador de Racha (para pruebas del usuario)
  document.getElementById('btn-test-advance-day')?.addEventListener('click', () => simulateAdvanceDay(1));
  document.getElementById('btn-test-break-streak')?.addEventListener('click', () => simulateAdvanceDay(2));
  document.getElementById('btn-test-reset-streak')?.addEventListener('click', resetStreak);

  // Wallet
  document.getElementById('btn-open-wallet')?.addEventListener('click', openWalletModal);
  document.getElementById('btn-close-wallet')?.addEventListener('click', closeWalletModal);
  document.getElementById('btn-daily-bonus')?.addEventListener('click', claimDailyStreak);

  // ==========================================
  // FASE 3: Event Listeners de Monetización
  // ==========================================
  // EcoSwap Premium
  document.getElementById('btn-open-premium')?.addEventListener('click', openPremiumModal);
  document.getElementById('btn-close-premium-modal')?.addEventListener('click', closePremiumModal);
  document.getElementById('btn-plan-annual')?.addEventListener('click', () => {
    currentPlanCycle = 'annual';
    updatePlanCycleDisplay();
  });
  document.getElementById('btn-plan-monthly')?.addEventListener('click', () => {
    currentPlanCycle = 'monthly';
    updatePlanCycleDisplay();
  });
  document.getElementById('btn-pay-mercadopago')?.addEventListener('click', () => handleSubscriptionCheckout('Mercado Pago'));
  document.getElementById('btn-pay-stripe')?.addEventListener('click', () => handleSubscriptionCheckout('Stripe'));

  // Carrito de Compras
  document.getElementById('btn-open-cart')?.addEventListener('click', openCartModal);
  document.getElementById('btn-close-cart-modal')?.addEventListener('click', closeCartModal);
  document.getElementById('btn-cart-checkout')?.addEventListener('click', handleCartCheckout);

  // Admin Dashboard v2
  document.getElementById('btn-open-admin')?.addEventListener('click', openAdminModal);
  document.getElementById('btn-close-admin-modal')?.addEventListener('click', closeAdminModal);
  document.getElementById('btn-toggle-admin-role-sim')?.addEventListener('click', toggleAdminRoleSimulation);

  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      switchAdminTab(btn.dataset.admintab);
    });
  });

  // Email Preview Modal
  document.getElementById('btn-close-email-modal')?.addEventListener('click', () => {
    document.getElementById('modal-email-preview')?.classList.remove('active');
  });
  document.getElementById('btn-email-tab-premium')?.addEventListener('click', () => openEmailPreviewModal('WELCOME_PREMIUM'));
  document.getElementById('btn-email-tab-order')?.addEventListener('click', () => openEmailPreviewModal('ORDER_CONFIRMED'));
  document.getElementById('btn-email-tab-stock')?.addEventListener('click', () => openEmailPreviewModal('LOW_STOCK_ALERT'));

  // Auto-prompt de bienvenida: si el usuario no ha reclamado su bono de 10 EcoPts de hoy, invitamos cordialmente
  const streakStatus = getStreakStatus();
  if (streakStatus.canClaim && !sessionStorage.getItem('ecoswap_streak_prompted')) {
    sessionStorage.setItem('ecoswap_streak_prompted', 'true');
    setTimeout(() => {
      openStreakModal();
    }, 850);
  }

  // Publish Modal
  document.getElementById('btn-open-publish')?.addEventListener('click', openPublishModal);
  document.getElementById('btn-close-publish')?.addEventListener('click', closePublishModal);
  document.getElementById('btn-cancel-publish')?.addEventListener('click', closePublishModal);

  // Publish Form submit
  document.getElementById('form-publish')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('pub-title').value.trim();
    const category = document.getElementById('pub-category').value;
    const points = parseInt(document.getElementById('pub-points').value) || 50;
    const image = document.getElementById('pub-image').value.trim() || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80';
    const desc = document.getElementById('pub-desc').value.trim();

    const newItem = {
      id: 'item_' + Date.now(),
      title,
      category,
      points,
      image,
      user: 'Tú (EcoVecino)',
      distance: '0.1 km',
      condition: 'Muy bueno',
      co2: `${(points * 0.08).toFixed(1)} kg`,
      description: desc || 'Objeto donado por un miembro activo de EcoSwap para darle una segunda vida.'
    };

    state.items.unshift(newItem);
    state.addPoints(30, `Donación de objeto: "${title}"`);
    state.save();

    closePublishModal();
    e.target.reset();
    updatePointsDisplay();
    renderFeed();
    triggerConfetti();
    showToast(`¡Objeto publicado con éxito! Ganaste +30 EcoPoints 🌱`);
  });

  // Search input
  document.getElementById('search-input')?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderFeed();
  });

  // Category chips (específico para el selector del feed)
  document.querySelectorAll('#category-chips .chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#category-chips .chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedCategory = btn.dataset.category || 'all';
      renderFeed();
    });
  });

  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Close modals on overlay click
  ['modal-publish', 'modal-wallet', 'modal-detail', 'modal-streak', 'modal-pwa-install', 'modal-premium', 'modal-cart', 'modal-admin', 'modal-email-preview'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('click', (e) => {
      if (e.target === el) {
        el.classList.remove('active');
      }
    });
  });

  updateImpactStats();
  initPWA();
});

// ============================================================================
// PWA (Progressive Web App) Manager
// ============================================================================
let deferredInstallPrompt = null;

function openPwaInstallModal() {
  const modal = document.getElementById('modal-pwa-install');
  if (!modal) return;

  // Auto-detect user platform
  const ua = navigator.userAgent || '';
  const isIOS = (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && !window.MSStream;
  const isAndroid = /Android/.test(ua);
  
  let targetPlatform = 'desktop';
  if (isIOS) {
    targetPlatform = 'ios';
  } else if (isAndroid) {
    targetPlatform = 'android';
  }

  // Switch to the detected tab
  switchPwaPlatformTab(targetPlatform);

  // Update CTA button label and status based on prompt availability
  const statusLabel = document.getElementById('pwa-status-text');
  const ctaBtn = document.getElementById('btn-pwa-direct-install');
  const ctaText = document.getElementById('pwa-direct-cta-label');

  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    if (statusLabel) statusLabel.textContent = '¡EcoSwap ya está instalada en este dispositivo!';
    if (ctaText) ctaText.textContent = 'App Instalada ✓';
    if (ctaBtn) ctaBtn.classList.add('disabled');
  } else if (deferredInstallPrompt) {
    if (statusLabel) statusLabel.textContent = 'Descarga directa con 1 solo clic';
    if (ctaText) ctaText.textContent = 'Instalar EcoSwap Ahora';
    if (ctaBtn) ctaBtn.classList.remove('disabled');
  } else if (isIOS) {
    if (statusLabel) statusLabel.textContent = 'Disponible para agregar a tu pantalla de inicio';
    if (ctaText) ctaText.textContent = 'Ver pasos para iPhone/iPad';
    if (ctaBtn) ctaBtn.classList.remove('disabled');
  } else {
    if (statusLabel) statusLabel.textContent = 'Guía de instalación rápida paso a paso';
    if (ctaText) ctaText.textContent = 'Comenzar Instalación';
    if (ctaBtn) ctaBtn.classList.remove('disabled');
  }

  modal.classList.add('active');
}

function closePwaInstallModal() {
  const modal = document.getElementById('modal-pwa-install');
  if (modal) modal.classList.remove('active');
}

function switchPwaPlatformTab(platform) {
  document.querySelectorAll('.pwa-platform-tab').forEach(tab => {
    const isTarget = tab.dataset.platform === platform;
    tab.classList.toggle('active', isTarget);
    tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  document.querySelectorAll('.pwa-step-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-pwa-${platform}`);
  });
}

function initPWA() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const headerInstallBtn = document.getElementById('btn-header-install');
  const cornerInstallBtn = document.getElementById('btn-corner-install');
  const cornerWidget = document.getElementById('pwa-corner-widget');
  const installBanner = document.getElementById('pwa-install-banner');
  const bannerInstallBtn = document.getElementById('btn-pwa-banner-install');
  const bannerCloseBtn = document.getElementById('btn-pwa-banner-close');
  const directInstallBtn = document.getElementById('btn-pwa-direct-install');
  const modalCloseBtn = document.getElementById('btn-close-pwa-modal');
  const shareBtn = document.getElementById('btn-pwa-share-app');
  const simulateBtn = document.getElementById('btn-pwa-simulate-mode');
  const offlineStatusBanner = document.getElementById('offline-status-banner');

  // Si ya se está ejecutando como app nativa instalada
  if (isStandalone) {
    if (headerInstallBtn) headerInstallBtn.style.display = 'none';
    if (cornerWidget) cornerWidget.style.display = 'none';
    if (installBanner) installBanner.style.display = 'none';
  }

  // 1. Registro del Service Worker
  if ('serviceWorker' in navigator) {
    const registerSW = () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker activo y registrado. Scope:', reg.scope);

          // Detectar nuevas versiones del Service Worker
          reg.addEventListener('updatefound', () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  showToast('🔄 ¡Nueva versión disponible! Recarga la app para aplicar las mejoras.');
                }
              });
            }
          });
        })
        .catch((err) => {
          console.warn('[PWA] Advertencia en Service Worker:', err);
        });
    };

    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
    }
  }

  // 2. Control del evento de instalación nativa (beforeinstallprompt)
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;

    if (!isStandalone) {
      if (headerInstallBtn) {
        headerInstallBtn.style.display = 'inline-flex';
      }

      const dismissed = sessionStorage.getItem('ecoswap_pwa_dismissed');
      if (installBanner && !dismissed) {
        setTimeout(() => {
          if (deferredInstallPrompt && !isStandalone) {
            installBanner.style.display = 'block';
          }
        }, 2000);
      }
    }
  });

  // Manejador unificado de instalación / descarga
  const triggerInstallFlow = async () => {
    if (deferredInstallPrompt) {
      try {
        deferredInstallPrompt.prompt();
        const choiceResult = await deferredInstallPrompt.userChoice;
        if (choiceResult && choiceResult.outcome === 'accepted') {
          console.log('[PWA] Instalación aceptada por el usuario.');
          closePwaInstallModal();
          if (headerInstallBtn) headerInstallBtn.style.display = 'none';
          if (cornerWidget) cornerWidget.style.display = 'none';
          if (installBanner) installBanner.style.display = 'none';
          triggerConfetti();
          showToast('🎉 ¡EcoSwap instalada exitosamente en tu dispositivo!');
        } else {
          console.log('[PWA] Instalación postergada.');
        }
      } catch (err) {
        console.warn('[PWA] Error durante prompt de instalación:', err);
        openPwaInstallModal();
      } finally {
        deferredInstallPrompt = null;
      }
    } else {
      // Si el navegador no soporta o no tiene el prompt nativo listo (iOS Safari, Firefox, Desktop directo)
      openPwaInstallModal();
    }
  };

  // Asignar listeners a los botones de descarga (Esquina superior e inferior)
  cornerInstallBtn?.addEventListener('click', triggerInstallFlow);
  headerInstallBtn?.addEventListener('click', triggerInstallFlow);
  bannerInstallBtn?.addEventListener('click', triggerInstallFlow);
  directInstallBtn?.addEventListener('click', triggerInstallFlow);

  bannerCloseBtn?.addEventListener('click', () => {
    if (installBanner) installBanner.style.display = 'none';
    sessionStorage.setItem('ecoswap_pwa_dismissed', 'true');
  });

  modalCloseBtn?.addEventListener('click', closePwaInstallModal);

  // Selector de pestañas de plataforma en el modal
  document.querySelectorAll('.pwa-platform-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchPwaPlatformTab(tab.dataset.platform);
    });
  });

  // Compartir o Copiar Enlace
  shareBtn?.addEventListener('click', async () => {
    const shareData = {
      title: 'EcoSwap 🌱 | Plataforma Comunitaria de Intercambio',
      text: '¡Instala la aplicación EcoSwap y dale una segunda vida a tus objetos acumulando EcoPuntos!',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('🚀 ¡Gracias por compartir EcoSwap!');
        return;
      } catch (e) {
        // Fallback a portapapeles si el usuario canceló o falló
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('📋 ¡Enlace de EcoSwap copiado al portapapeles!');
    } catch (err) {
      showToast('ℹ️ Comparte la dirección: ' + window.location.href);
    }
  });

  // Simulación y diagnóstico de estado PWA
  simulateBtn?.addEventListener('click', () => {
    const swStatus = 'serviceWorker' in navigator ? 'Disponible' : 'No soportado';
    const hasPrompt = deferredInstallPrompt ? 'Nativo Listo ⚡' : 'Instalación Guiada 📱';
    const isApp = (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) ? 'Sí (Standalone)' : 'No (Navegador)';
    
    showToast(`📱 Diagnóstico PWA: SW: ${swStatus} | Modo App: ${isApp} | Tipo: ${hasPrompt}`);
  });

  // Evento cuando la aplicación fue instalada con éxito por el navegador
  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    if (headerInstallBtn) headerInstallBtn.style.display = 'none';
    if (cornerWidget) cornerWidget.style.display = 'none';
    if (installBanner) installBanner.style.display = 'none';
    closePwaInstallModal();
    triggerConfetti();
    showToast('🎉 ¡EcoSwap se ha añadido exitosamente a tus aplicaciones!');
  });

  // 3. Monitoreo de Conexión Online / Offline
  function updateNetworkStatus() {
    const isOnline = navigator.onLine;
    if (offlineStatusBanner) {
      offlineStatusBanner.style.display = isOnline ? 'none' : 'block';
    }
  }

  window.addEventListener('online', () => {
    updateNetworkStatus();
    showToast('🟢 Conexión a internet restablecida.');
  });

  window.addEventListener('offline', () => {
    updateNetworkStatus();
    showToast('📡 Modo Sin Conexión activo. Tus datos se guardan localmente.');
  });

  updateNetworkStatus();

  // 4. Atajos de URL PWA (Shortcuts en el Manifest)
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get('action');
  if (action === 'publish') {
    setTimeout(openPublishModal, 350);
  } else if (action === 'streak') {
    setTimeout(openStreakModal, 350);
  } else if (action === 'wallet') {
    setTimeout(openWalletModal, 350);
  }
}

// Exponer funciones globales para controladores de eventos inline en HTML
window.openPublishModal = openPublishModal;
window.closePublishModal = closePublishModal;
window.selectPresetImage = selectPresetImage;
window.openWalletModal = openWalletModal;
window.closeWalletModal = closeWalletModal;
window.openDetailModal = openDetailModal;
window.closeDetailModal = closeDetailModal;
window.handleClaim = handleClaim;
window.completeMission = completeMission;
window.switchTab = switchTab;
window.claimDailyBonus = claimDailyStreak;
window.claimDailyStreak = claimDailyStreak;
window.openStreakModal = openStreakModal;
window.closeStreakModal = closeStreakModal;
window.simulateAdvanceDay = simulateAdvanceDay;
window.resetStreak = resetStreak;
window.openPwaInstallModal = openPwaInstallModal;
window.closePwaInstallModal = closePwaInstallModal;
window.switchPwaPlatformTab = switchPwaPlatformTab;

// Exponer funciones globales de Fase 3 (Monetización, Ads & Admin)
window.openPremiumModal = openPremiumModal;
window.closePremiumModal = closePremiumModal;
window.handleSubscriptionCheckout = handleSubscriptionCheckout;
window.openCartModal = openCartModal;
window.closeCartModal = closeCartModal;
window.addToCart = addToCart;
window.updateCartItemQty = updateCartItemQty;
window.toggleTierSimulation = toggleTierSimulation;
window.handleCartCheckout = handleCartCheckout;
window.openAdminModal = openAdminModal;
window.closeAdminModal = closeAdminModal;
window.switchAdminTab = switchAdminTab;
window.toggleAdminRoleSimulation = toggleAdminRoleSimulation;
window.toggleAdminUserStatus = toggleAdminUserStatus;
window.toggleAdminUserRole = toggleAdminUserRole;
window.handleCreateAdSubmit = handleCreateAdSubmit;
window.toggleAdminAdStatus = toggleAdminAdStatus;
window.saveInventoryRow = saveInventoryRow;
window.toggleItemSponsored = toggleItemSponsored;
window.triggerLowStockAlertEmail = triggerLowStockAlertEmail;
window.openEmailPreviewModal = openEmailPreviewModal;
window.handleAdClick = handleAdClick;
window.handleSponsoredClick = handleSponsoredClick;

