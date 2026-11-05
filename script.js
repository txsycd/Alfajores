/* ==========================================================================
   Dulce Alma — configuración rápida
   Cambiá estos datos y el sitio se actualiza solo.
   ========================================================================== */

const CONFIG = {
  marca: 'Dulce Alma',
  // Tu número de WhatsApp con código de país. Sin +, sin espacios ni guiones.
  whatsapp: '5491123456789',
  locale: 'es-AR',
  moneda: 'ARS',
  envioGratisDesde: 25000,
};

/* ---------- Utilidades ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const money = (n) => new Intl.NumberFormat(CONFIG.locale, {
  style: 'currency',
  currency: CONFIG.moneda,
  maximumFractionDigits: 0,
}).format(n);

let uidCounter = 0;

/* ---------- Ilustración de alfajor (SVG generativo) ---------- */
function alfajorSVG(f) {
  const uid = 'a' + (++uidCounter);
  const texture = f.texture || 'rgba(0,0,0,.24)';
  const dots = [
    [70, 74], [92, 66], [118, 82], [146, 68], [162, 90],
    [84, 96], [132, 102], [154, 110], [60, 86], [176, 78],
  ].map(([cx, cy], i) =>
    `<circle cx="${cx}" cy="${cy}" r="${i % 3 === 0 ? 1.7 : 1.1}" fill="${texture}"/>`
  ).join('');

  return `
  <svg viewBox="0 0 240 214" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="tapa-${uid}" x1="0" y1="0" x2=".35" y2="1">
        <stop offset="0" stop-color="${f.tapaLight}"/>
        <stop offset=".55" stop-color="${f.tapa}"/>
        <stop offset="1" stop-color="${f.tapaDark}"/>
      </linearGradient>
      <linearGradient id="relleno-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${f.rellenoLight}"/>
        <stop offset="1" stop-color="${f.rellenoDark}"/>
      </linearGradient>
    </defs>

    <ellipse cx="121" cy="190" rx="76" ry="12" fill="#3A1F12" opacity=".16"/>

    <rect x="42" y="116" width="156" height="56" rx="27" fill="url(#tapa-${uid})"/>
    <rect x="36" y="94" width="168" height="36" rx="18" fill="url(#relleno-${uid})"/>
    <rect x="42" y="50" width="156" height="60" rx="28" fill="url(#tapa-${uid})"/>

    <rect x="54" y="58" width="132" height="13" rx="6.5" fill="#fff" opacity=".13"/>
    <g>${dots}</g>

    <circle cx="35" cy="110" r="7" fill="${f.rellenoDark}"/>
    <circle cx="205" cy="110" r="7" fill="${f.rellenoDark}"/>
    <circle cx="35" cy="110" r="3" fill="${f.rellenoLight}" opacity=".55"/>
    <circle cx="205" cy="110" r="3" fill="${f.rellenoLight}" opacity=".55"/>

    <circle cx="64" cy="178" r="2.2" fill="${f.tapaDark}" opacity=".45"/>
    <circle cx="86" cy="186" r="1.4" fill="${f.tapaDark}" opacity=".35"/>
    <circle cx="178" cy="182" r="1.8" fill="${f.tapaDark}" opacity=".4"/>
    <circle cx="196" cy="174" r="1.2" fill="${f.tapaDark}" opacity=".3"/>
    <circle cx="48" cy="64" r="1.3" fill="#fff" opacity=".35"/>
    <circle cx="188" cy="66" r="1" fill="#fff" opacity=".3"/>
  </svg>`;
}

/* ---------- Catálogo ---------- */
const FLAVORS = [
  {
    id: 'clasico',
    nombre: 'Clásico de dulce de leche',
    desc: 'Dulce de leche repostero entre dos tapas de chocolate semiamargo. El que nunca falla.',
    precio: 2900,
    badge: 'Más vendido',
    tint: '#FBEBD5',
    tapaLight: '#6B4330', tapa: '#472519', tapaDark: '#2C130C',
    rellenoLight: '#D99446', rellenoDark: '#A85E1E',
    texture: 'rgba(0,0,0,.28)',
  },
  {
    id: 'chocolate',
    nombre: 'Chocolate 70%',
    desc: 'Tapas de cacao intenso con un corazón de dulce de leche apenas dulce. Para paladares serios.',
    precio: 3200,
    tint: '#F2E3D6',
    tapaLight: '#4A2E22', tapa: '#2A1610', tapaDark: '#140A06',
    rellenoLight: '#C98B45', rellenoDark: '#98601F',
    texture: 'rgba(0,0,0,.32)',
  },
  {
    id: 'maicena',
    nombre: 'Maicena & coco',
    desc: 'Tapas de maicena que se deshacen, rellenas de dulce de leche y coco rallado. Tradición pura.',
    precio: 3000,
    tint: '#FBF3E1',
    tapaLight: '#F8EACD', tapa: '#E7D0A7', tapaDark: '#C9A97C',
    rellenoLight: '#D99446', rellenoDark: '#A65F1F',
    texture: 'rgba(140,100,60,.3)',
  },
  {
    id: 'pistacho',
    nombre: 'Pistacho & sal marina',
    desc: 'Crema de pistacho tostado con un hilo de sal marina. El que todos quieren probar.',
    precio: 3800,
    badge: 'Nuevo',
    tint: '#EFF1DE',
    tapaLight: '#5B5334', tapa: '#3A3520', tapaDark: '#221F10',
    rellenoLight: '#B7CE7C', rellenoDark: '#7E9C45',
    texture: 'rgba(0,0,0,.28)',
  },
  {
    id: 'redvelvet',
    nombre: 'Red velvet',
    desc: 'Tapas de terciopelo rojo y relleno de crema de queso. Elegante, suave y adictivo.',
    precio: 3400,
    tint: '#F7E4E1',
    tapaLight: '#A6403C', tapa: '#7A2323', tapaDark: '#4E1212',
    rellenoLight: '#F6EFE4', rellenoDark: '#DCCDBA',
    texture: 'rgba(0,0,0,.22)',
  },
  {
    id: 'limon',
    nombre: 'Limón & merengue',
    desc: 'Curd de limón bien ácido con merengue quemado. Fresco, como una tarde de verano.',
    precio: 3300,
    tint: '#FBF4D9',
    tapaLight: '#F7E9CB', tapa: '#E9D3A9', tapaDark: '#CBAE7C',
    rellenoLight: '#F7DD72', rellenoDark: '#DDB53C',
    texture: 'rgba(140,100,60,.28)',
  },
];

const COMBOS = [
  {
    id: 'caja6',
    nombre: 'Caja Degustación',
    cantidad: 6,
    kicker: 'Para probar',
    desc: 'Seis alfajores, seis sabores distintos. La mejor forma de encontrar tu favorito.',
    precio: 16900,
    antes: 18000,
    features: ['Elegís los 6 sabores', 'Caja kraft compostable', 'Ideal para regalar'],
  },
  {
    id: 'caja12',
    nombre: 'Caja Regalo',
    cantidad: 12,
    kicker: 'La más elegida',
    desc: 'Doce alfajores a elección, con lazo y tarjeta escrita a mano. Un regalo que se recuerda.',
    precio: 31900,
    features: ['Elegís los sabores', 'Tarjeta escrita a mano', 'Envío gratis incluido'],
    destacado: true,
    tag: 'Más vendido',
  },
  {
    id: 'caja24',
    nombre: 'Caja Compartir',
    cantidad: 24,
    kicker: 'Para eventos',
    desc: 'Veinticuatro alfajores para la oficina, el cumpleaños o ese evento que necesita dulzura.',
    precio: 59900,
    features: ['Ahorrás 15% vs. sueltos', 'Factura para empresas', 'Entrega coordinada'],
  },
];

const QUOTES = [
  {
    texto: 'Pedí una caja para un cumpleaños y terminé pidiendo tres más. <em>El de pistacho es peligrosamente bueno.</em>',
    nombre: 'Camila R.',
    lugar: 'Palermo · CABA',
    inicial: 'C',
    color: 'linear-gradient(135deg,#C98443,#8E4E22)',
  },
  {
    texto: 'Se nota que son caseros. La masa se deshace y el dulce de leche no empalaga. <em>Mi papá dijo que era el mejor que probó en años.</em>',
    nombre: 'Martín G.',
    lugar: 'Villa Crespo · CABA',
    inicial: 'M',
    color: 'linear-gradient(135deg,#7C8A4E,#4B5730)',
  },
  {
    texto: 'Los regalé a mis clientes en fin de año y <em>me escribieron todos preguntando dónde los compré.</em> La caja es hermosa.',
    nombre: 'Lucía M.',
    lugar: 'Belgrano · CABA',
    inicial: 'L',
    color: 'linear-gradient(135deg,#A6534B,#6B2620)',
  },
];

const CATALOG = new Map();
FLAVORS.forEach((f) => CATALOG.set(f.id, { ...f, tipo: 'alfajor', detalle: 'Alfajor suelto' }));
COMBOS.forEach((c) => CATALOG.set(c.id, { ...c, tipo: 'combo', detalle: `Caja x${c.cantidad}` }));

const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

/* ---------- Render: hero ---------- */
$$('[data-alfajor]').forEach((el) => {
  const f = FLAVORS.find((x) => x.id === el.dataset.alfajor);
  if (f) el.innerHTML = alfajorSVG(f);
});

/* ---------- Render: sabores ---------- */
const flavorsGrid = $('#flavorsGrid');
if (flavorsGrid) {
  flavorsGrid.innerHTML = FLAVORS.map((f, i) => `
    <article class="flavor reveal" style="--d:${i * 55}ms">
      ${f.badge ? `<span class="flavor__badge">${f.badge}</span>` : ''}
      <div class="flavor__art" style="--tint:${f.tint}">${alfajorSVG(f)}</div>
      <div class="flavor__body">
        <h3>${f.nombre}</h3>
        <p>${f.desc}</p>
        <div class="flavor__foot">
          <div class="price">${money(f.precio)}<span>c/u</span></div>
          <button class="add-btn" type="button" data-add="${f.id}" aria-label="Agregar ${f.nombre} al pedido">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            Agregar
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

/* ---------- Render: combos ---------- */
const combosGrid = $('#combosGrid');
if (combosGrid) {
  combosGrid.innerHTML = COMBOS.map((c, i) => `
    <article class="combo ${c.destacado ? 'combo--featured' : ''} reveal" style="--d:${i * 80}ms">
      ${c.tag ? `<span class="combo__tag">${c.tag}</span>` : ''}
      <p class="combo__kicker">${c.kicker}</p>
      <h3 class="combo__name">${c.nombre}</h3>
      <p class="combo__desc">${c.desc}</p>
      <div class="combo__price">
        <strong>${money(c.precio)}</strong>
        ${c.antes ? `<span class="combo__antes">${money(c.antes)}</span>` : ''}
      </div>
      <ul class="combo__list">
        ${c.features.map((f) => `<li>${CHECK}${f}</li>`).join('')}
      </ul>
      <button class="btn ${c.destacado ? 'btn--gold' : 'btn--outline'} combo__btn" type="button" data-add="${c.id}">
        Agregar al pedido
      </button>
    </article>
  `).join('');
}

/* ---------- Render: opiniones ---------- */
const quotesGrid = $('#quotesGrid');
if (quotesGrid) {
  const star = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9z"/></svg>';
  quotesGrid.innerHTML = QUOTES.map((q, i) => `
    <article class="quote reveal" style="--d:${i * 70}ms">
      <div class="quote__stars" aria-label="5 de 5 estrellas">${star.repeat(5)}</div>
      <p class="quote__text">“${q.texto}”</p>
      <div class="quote__foot">
        <span class="quote__avatar" style="background:${q.color}">${q.inicial}</span>
        <div class="quote__who">
          <strong>${q.nombre}</strong>
          <span>${q.lugar}</span>
        </div>
        <span class="quote__verified">Compra verificada</span>
      </div>
    </article>
  `).join('');
}

/* ---------- Textos desde CONFIG ---------- */
$$('[data-envio-gratis]').forEach((el) => { el.textContent = money(CONFIG.envioGratisDesde); });

/* ---------- Carrito ---------- */
const CART_KEY = 'dulcealma_carrito_v1';
const drawer = $('#drawer');
const overlay = $('#overlay');
const cartItemsEl = $('#cartItems');
const cartTotalEl = $('#cartTotal');
const freeMsgEl = $('#freeMsg');
const freeBarEl = $('#freeBar');
const toastEl = $('#toast');

let cart = loadCart();
let lastFocused = null;
let toastTimer = null;

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    const clean = {};
    Object.keys(raw).forEach((id) => {
      const qty = Math.floor(Number(raw[id]));
      if (CATALOG.has(id) && qty > 0) clean[id] = Math.min(qty, 99);
    });
    return clean;
  } catch {
    return {};
  }
}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* modo privado */ }
}

function cartLines() {
  return Object.keys(cart)
    .filter((id) => cart[id] > 0 && CATALOG.has(id))
    .map((id) => ({ product: CATALOG.get(id), qty: cart[id] }));
}

function thumbHTML(p) {
  if (p.tipo === 'combo') {
    return `${alfajorSVG(FLAVORS[0])}<span class="cart-item__qtytag">x${p.cantidad}</span>`;
  }
  return alfajorSVG(p);
}

function renderCart() {
  const lines = cartLines();
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.product.precio, 0);

  if (cartItemsEl) {
    cartItemsEl.innerHTML = lines.map(({ product: p, qty }) => `
      <div class="cart-item">
        <div class="cart-item__thumb">${thumbHTML(p)}</div>
        <div class="cart-item__info">
          <p class="cart-item__name">${p.nombre}</p>
          <p class="cart-item__meta">${p.detalle} · ${money(p.precio)}</p>
          <div class="qty">
            <button type="button" data-qty="-1" data-id="${p.id}" aria-label="Quitar una unidad de ${p.nombre}">−</button>
            <span>${qty}</span>
            <button type="button" data-qty="1" data-id="${p.id}" aria-label="Agregar una unidad de ${p.nombre}">+</button>
          </div>
        </div>
        <div class="cart-item__right">
          <strong>${money(p.precio * qty)}</strong>
          <button type="button" class="link-btn" data-remove="${p.id}">Quitar</button>
        </div>
      </div>
    `).join('');
  }

  if (cartTotalEl) cartTotalEl.textContent = money(subtotal);

  const counters = $$('[data-cart-count]');
  counters.forEach((el) => {
    el.textContent = count;
    el.hidden = count === 0;
  });

  if (drawer) {
    drawer.classList.toggle('is-filled', count > 0);
    drawer.classList.toggle('is-empty', count === 0);
  }

  if (freeMsgEl && freeBarEl) {
    const falta = Math.max(0, CONFIG.envioGratisDesde - subtotal);
    const pct = Math.min(100, (subtotal / CONFIG.envioGratisDesde) * 100);
    freeBarEl.style.width = pct + '%';
    freeMsgEl.innerHTML = falta > 0
      ? `Te faltan <strong>${money(falta)}</strong> para el envío gratis`
      : `¡Genial! Tenés <strong>envío gratis</strong> en CABA y GBA 🎉`;
  }

  saveCart();
}

function addToCart(id) {
  const product = CATALOG.get(id);
  if (!product) return;
  cart[id] = Math.min((cart[id] || 0) + 1, 99);
  renderCart();
  bumpCartButton();
  toast(`${product.nombre} sumado a tu pedido`);
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function removeItem(id) {
  delete cart[id];
  renderCart();
}

function bumpCartButton() {
  const btn = $('#cartBtn');
  if (!btn) return;
  btn.classList.remove('is-bump');
  void btn.offsetWidth;
  btn.classList.add('is-bump');
}

/* ---------- Drawer ---------- */
function openCart() {
  if (!drawer) return;
  lastFocused = document.activeElement;
  overlay.hidden = false;
  void overlay.offsetHeight;
  overlay.classList.add('is-open');
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  drawer.scrollTop = 0;
  document.body.classList.add('no-scroll');
  const scrollArea = $('#drawerScroll');
  if (scrollArea) scrollArea.scrollTop = 0;
  window.setTimeout(() => { const c = $('#closeCart'); if (c) c.focus(); }, 90);
}

function closeCart() {
  if (!drawer) return;
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  window.setTimeout(() => {
    if (!overlay.classList.contains('is-open')) overlay.hidden = true;
  }, 380);
  if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
}

/* ---------- Toast ---------- */
function toast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove('is-visible'), 2800);
}

/* ---------- Eventos globales ---------- */
document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add]');
  if (add) { addToCart(add.dataset.add); return; }

  const qtyBtn = e.target.closest('[data-qty]');
  if (qtyBtn) { changeQty(qtyBtn.dataset.id, Number(qtyBtn.dataset.qty)); return; }

  const remove = e.target.closest('[data-remove]');
  if (remove) { removeItem(remove.dataset.remove); return; }

  if (e.target.closest('[data-close-cart]')) {
    closeCart();
    const target = document.getElementById('sabores');
    if (target) window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 200);
    return;
  }
});

const cartBtn = $('#cartBtn');
if (cartBtn) cartBtn.addEventListener('click', openCart);
const closeBtn = $('#closeCart');
if (closeBtn) closeBtn.addEventListener('click', closeCart);
if (overlay) overlay.addEventListener('click', closeCart);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) closeCart();
});

/* foco encerrado dentro del drawer */
if (drawer) {
  drawer.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const nodes = $$('a[href], button:not([disabled]), input, select, textarea', drawer)
      .filter((el) => el.offsetParent !== null);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

/* ---------- Formulario y WhatsApp ---------- */
const form = $('#orderForm');
const entregaEl = $('#entrega');
const addressField = $('#addressField');
const direccionEl = $('#direccion');

function syncAddressField() {
  if (!entregaEl || !addressField || !direccionEl) return;
  const isEnvio = entregaEl.value.toLowerCase().startsWith('envío');
  addressField.classList.toggle('is-hidden', !isEnvio);
  direccionEl.required = isEnvio;
}

if (entregaEl) {
  entregaEl.addEventListener('change', syncAddressField);
  syncAddressField();
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lines = cartLines();
    if (!lines.length) { toast('Tu pedido está vacío'); return; }

    if (!form.checkValidity()) {
      form.reportValidity();
      toast('Completá los datos para la entrega');
      return;
    }

    const data = new FormData(form);
    const nombre = String(data.get('nombre') || '').trim();
    const entrega = String(data.get('entrega') || '');
    const direccion = String(data.get('direccion') || '').trim();
    const notas = String(data.get('notas') || '').trim();
    const subtotal = lines.reduce((sum, l) => sum + l.qty * l.product.precio, 0);
    const envioGratis = subtotal >= CONFIG.envioGratisDesde;

    const items = lines.map((l) => `• ${l.qty} × ${l.product.nombre} — ${money(l.product.precio * l.qty)}`);
    const esEnvio = entrega.toLowerCase().startsWith('envío');
    const envioTexto = !esEnvio ? 'no aplica (retiro en el local)' : (envioGratis ? 'gratis' : 'a coordinar');

    const mensaje = [
      `¡Hola ${CONFIG.marca}! Quiero hacer este pedido:`,
      '',
      ...items,
      '',
      `Total: ${money(subtotal)}`,
      `Envío: ${envioTexto}`,
      '',
      `Nombre: ${nombre}`,
      `Entrega: ${entrega}${direccion ? ` — ${direccion}` : ''}`,
      notas ? `Notas: ${notas}` : '',
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener');
    toast('¡Listo! Te esperamos en WhatsApp 🧡');
  });
}

/* ---------- Links directos a WhatsApp ---------- */
$$('[data-wa]').forEach((el) => {
  const texto = `¡Hola ${CONFIG.marca}! Vi la web y quiero hacer un pedido 🍫`;
  el.setAttribute('href', `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`);
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener');
});

/* ---------- Menú móvil ---------- */
const menuBtn = $('#menuBtn');
const mobileMenu = $('#mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  $$('a', mobileMenu).forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

/* ---------- Header al hacer scroll ---------- */
const header = $('#siteHeader');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Animaciones de aparición ---------- */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  $$('.reveal').forEach((el) => observer.observe(el));
} else {
  $$('.reveal').forEach((el) => el.classList.add('is-visible'));
}

/* ---------- Año del footer ---------- */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* ---------- Inicio ---------- */
renderCart();
