/* =============================================
   UGEJA – script.js
   Products, Cart, Login/Discount System
   ============================================= */

// ── PRODUCT DATA ──────────────────────────────
// Add your real image filenames and prices here!
const products = [
  // TOYS
  {
    id: 1, category: "toys",
    name: "Едукативна Играчка – Сортер",
    price: 590,
    img: "toy1.jpg",
    badge: "new",
    description: "Квалитетна едукативна играчка за деца од 1–3 години. Помага при развој на фини моторни вештини и препознавање бои и форми."
  },
  {
    id: 2, category: "toys",
    name: "Кукла со Облека",
    price: 890,
    img: "toy2.jpg",
    badge: null,
    description: "Прекрасна кукла со комплет облека. Идеален подарок за девојчиња. Материјалот е нетоксичен и безбеден за деца."
  },
  {
    id: 3, category: "toys",
    name: "Конструктор – Коцки",
    price: 750,
    img: "toy3.jpg",
    badge: null,
    description: "Сет со 100 коцки во различни форми и бои. Ја поттикнува креативноста и просторното размислување кај деца."
  },
  {
    id: 4, category: "toys",
    name: "Тркачко Возило RC",
    price: 1490,
    img: "toy4.jpg",
    badge: "sale",
    description: "Радио-контролирано тркачко возило со брзина до 20 км/ч. Батерија за 40+ минути играање. Возраст: 6+."
  },
  // CHRISTMAS
  {
    id: 5, category: "christmas",
    name: "Новогодишна Елка 120cm",
    price: 1990,
    img: "xmas1.jpg",
    badge: "sale",
    description: "Вештачка новогодишна елка 120 cm со реалистичен изглед. Лесна за склопување. Вклучени украсни гранки."
  },
  {
    id: 6, category: "christmas",
    name: "Фигура Дедо Мраз 60cm",
    price: 890,
    img: "xmas2.jpg",
    badge: "sale",
    description: "Декоративна фигура на Дедо Мраз висока 60 cm. Идеална за дом, изложбен простор или деловни простории."
  },
  {
    id: 7, category: "christmas",
    name: "Украсни Светла LED",
    price: 490,
    img: "xmas3.jpg",
    badge: null,
    description: "10 метри LED светла со 8 режими на светкање. Енергетски ефикасни, безбедни за употреба во затворен и отворен простор."
  },
  {
    id: 8, category: "christmas",
    name: "Новогодишна Елка 180cm",
    price: 3490,
    img: "xmas4.jpg",
    badge: null,
    description: "Луксузна вештачка елка 180 cm со густи гранки и меморија-жица. Огнеотпорен материјал, издржлива за повеќе сезони."
  },
  // HOME
  {
    id: 9, category: "home",
    name: "Декоративни Перници – Сет 2",
    price: 690,
    img: "home1.jpg",
    badge: null,
    description: "Сет од 2 декоративни перници со преклопни навлаки. Меки, удобни и лесни за одржување. Достапни во повеќе бои."
  },
  {
    id: 10, category: "home",
    name: "Ароматична Свеќа – Лаванда",
    price: 390,
    img: "home2.jpg",
    badge: "new",
    description: "Рачно правена ароматична свеќа со мирис на лаванда. Гори до 40 часа. Совршен подарок или украс за дом."
  },
  {
    id: 11, category: "home",
    name: "Рамка за Слика 30×40",
    price: 290,
    img: "home3.jpg",
    badge: null,
    description: "Елегантна дрвена рамка за слика во формат 30×40 cm. Природен дрвен материјал, достапна во светло и темно дрво."
  },
  {
    id: 12, category: "home",
    name: "Кујнски Сет – Садови",
    price: 1290,
    img: "home4.jpg",
    badge: null,
    description: "Сет од 5 кујнски садови со антилепачки премаз. Соодветни за индукциски шпорет. Со стаклени капаци и силиконски рачки."
  },
];

// ── AUTH SYSTEM ──────────────────────────────
// Demo accounts (in real use, this would be a backend)
// Passwords are stored as plain text here for demo - in production use hashing!
const DEMO_ACCOUNTS = [
  { username: "korisnik1", password: "demo123", name: "Марко" },
  { username: "korisnik2", password: "test456", name: "Ана" },
];

// Register stores new users in localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("ugeja_users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("ugeja_users", JSON.stringify(users));
}

let currentUser = JSON.parse(localStorage.getItem("ugeja_currentUser") || "null");
const DISCOUNT_RATE = 0.10; // 10%

// ── CART STATE ────────────────────────────────
let cart = JSON.parse(localStorage.getItem("ugeja_cart") || "[]");

function saveCart() {
  localStorage.setItem("ugeja_cart", JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

// ── HELPER: FORMAT PRICE ──────────────────────
function fmt(n) {
  return n.toLocaleString("mk-MK") + " ден";
}

// ── TOAST NOTIFICATIONS ───────────────────────
function showToast(msg, icon = "✓") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<span>${icon}</span> ${msg}`;
  container.appendChild(t);
  setTimeout(() => {
    t.style.transition = "all 0.3s";
    t.style.opacity = "0";
    t.style.transform = "translateX(40px)";
    setTimeout(() => t.remove(), 300);
  }, 2800);
}

// ── PRODUCT CARD BUILDER ──────────────────────
function buildCard(p) {
  const discounted = currentUser ? p.price * (1 - DISCOUNT_RATE) : null;
  const priceHTML = discounted
    ? `<div class="card-price">${fmt(discounted)} <span class="original-price">${fmt(p.price)}</span></div>`
    : `<div class="card-price">${fmt(p.price)}</div>`;

  const badgeHTML = p.badge
    ? `<div class="card-badge ${p.badge}">${p.badge === "sale" ? "🔥 Акција" : "Ново"}</div>`
    : "";

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    ${badgeHTML}
    <img src="${p.img}" alt="${p.name}" onerror="this.src='logo.jpg'">
    <div class="card-body">
      <div class="card-name">${p.name}</div>
      ${priceHTML}
      <button class="add-to-cart-btn" onclick="addToCart(${p.id}, event)">
        🛒 Додај во корпа
      </button>
    </div>
  `;
  card.querySelector("img").addEventListener("click", () => openProduct(p));
  return card;
}

function renderProducts() {
  const toysGrid = document.getElementById("toysGrid");
  const christmasGrid = document.getElementById("christmasGrid");
  const homeGrid = document.getElementById("homeGrid");

  if (!toysGrid) return; // not on index page

  toysGrid.innerHTML = "";
  christmasGrid.innerHTML = "";
  homeGrid.innerHTML = "";

  products.forEach((p, i) => {
    const card = buildCard(p);
    card.style.animationDelay = `${i * 0.06}s`;
    if (p.category === "toys") toysGrid.appendChild(card);
    else if (p.category === "christmas") christmasGrid.appendChild(card);
    else if (p.category === "home") homeGrid.appendChild(card);
  });
}

// ── OPEN PRODUCT PAGE ─────────────────────────
function openProduct(p) {
  const url = `product.html?id=${p.id}`;
  window.location.href = url;
}

// ── CART FUNCTIONS ────────────────────────────
function addToCart(productId, e) {
  if (e) e.stopPropagation();
  const p = products.find(x => x.id === productId);
  if (!p) return;

  const existing = cart.find(x => x.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`"${p.name}" додаден во корпата`, "🛒");

  // Button flash
  if (e) {
    const btn = e.target.closest("button");
    if (btn) {
      btn.classList.add("added");
      btn.textContent = "✓ Додадено!";
      setTimeout(() => {
        btn.classList.remove("added");
        btn.innerHTML = "🛒 Додај во корпа";
      }, 1500);
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter(x => x.id !== productId);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function changeQty(productId, delta) {
  const item = cart.find(x => x.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  const badge = document.getElementById("cartBadge");
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline" : "none";
  }
}

function renderCartItems() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>Корпата е празна</p>
        <p style="font-size:0.85rem;margin-top:6px;color:#aaa;">Додај производи за да купиш</p>
      </div>`;
    updateCartFooter();
    return;
  }

  container.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" onerror="this.src='logo.jpg'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmt(item.price)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    `;
    container.appendChild(div);
  });

  updateCartFooter();
}

function updateCartFooter() {
  const subtotalEl = document.getElementById("cartSubtotal");
  const discountEl = document.getElementById("cartDiscount");
  const totalEl = document.getElementById("cartTotal");
  const savingsEl = document.getElementById("cartSavings");

  const subtotal = getCartTotal();

  if (subtotalEl) subtotalEl.textContent = fmt(subtotal);

  if (currentUser && cart.length > 0) {
    const savings = subtotal * DISCOUNT_RATE;
    const total = subtotal - savings;
    if (discountEl) discountEl.parentElement.style.display = "flex";
    if (savingsEl) savingsEl.parentElement.style.display = "flex";
    if (discountEl) discountEl.textContent = "-" + fmt(savings);
    if (savingsEl) savingsEl.textContent = "-" + fmt(savings);
    if (totalEl) totalEl.textContent = fmt(total);
  } else {
    if (discountEl) discountEl.parentElement.style.display = "none";
    if (savingsEl) savingsEl.parentElement.style.display = "none";
    if (totalEl) totalEl.textContent = fmt(subtotal);
  }
}

function openCart() {
  document.getElementById("cartOverlay").classList.add("open");
  document.getElementById("cartSidebar").classList.add("open");
  renderCartItems();
}

function closeCart() {
  document.getElementById("cartOverlay").classList.remove("open");
  document.getElementById("cartSidebar").classList.remove("open");
}

// ── LOGIN / REGISTER ──────────────────────────
function openLoginModal() {
  document.getElementById("loginModal").classList.add("open");
  document.getElementById("loginError").textContent = "";
}

function closeLoginModal() {
  document.getElementById("loginModal").classList.remove("open");
}

function switchTab(tab) {
  document.querySelectorAll(".modal-tab").forEach(t => t.classList.remove("active"));
  document.querySelector(`[data-tab="${tab}"]`).classList.add("active");
  document.getElementById("loginForm").style.display = tab === "login" ? "block" : "none";
  document.getElementById("registerForm").style.display = tab === "register" ? "block" : "none";
  document.getElementById("loginError").textContent = "";
}

function doLogin() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errorEl = document.getElementById("loginError");

  if (!username || !password) {
    errorEl.textContent = "Внеси корисничко ime и лозинка.";
    return;
  }

  // Check demo accounts + registered accounts
  const allUsers = [...DEMO_ACCOUNTS, ...getUsers()];
  const user = allUsers.find(u => u.username === username && u.password === password);

  if (!user) {
    errorEl.textContent = "Погрешно корисничко ime или лозинка.";
    return;
  }

  currentUser = { username: user.username, name: user.name };
  localStorage.setItem("ugeja_currentUser", JSON.stringify(currentUser));
  closeLoginModal();
  updateAuthUI();
  renderProducts();
  renderCartItems();
  showToast(`Добредојде, ${user.name}! 10% попуст активиран 🎉`, "👤");
}

function doRegister() {
  const name = document.getElementById("regName").value.trim();
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value;
  const errorEl = document.getElementById("loginError");

  if (!name || !username || !password) {
    errorEl.textContent = "Пополни ги сите полиња.";
    return;
  }
  if (username.length < 3) {
    errorEl.textContent = "Корисничкото ime мора да има минум 3 знаци.";
    return;
  }
  if (password.length < 4) {
    errorEl.textContent = "Лозинката мора да има минум 4 знаци.";
    return;
  }

  const allUsers = [...DEMO_ACCOUNTS, ...getUsers()];
  if (allUsers.find(u => u.username === username)) {
    errorEl.textContent = "Ова корисничко ime веќе постои.";
    return;
  }

  const users = getUsers();
  users.push({ name, username, password });
  saveUsers(users);

  currentUser = { username, name };
  localStorage.setItem("ugeja_currentUser", JSON.stringify(currentUser));
  closeLoginModal();
  updateAuthUI();
  renderProducts();
  renderCartItems();
  showToast(`Успешна регистрација! Добредојде, ${name}! 10% попуст активиран 🎉`, "✓");
}

function doLogout() {
  currentUser = null;
  localStorage.removeItem("ugeja_currentUser");
  updateAuthUI();
  renderProducts();
  renderCartItems();
  showToast("Одјавен/а", "👋");
}

function updateAuthUI() {
  const authArea = document.getElementById("authArea");
  if (!authArea) return;

  if (currentUser) {
    authArea.innerHTML = `
      <div class="user-chip" onclick="doLogout()" title="Клик за одјава">
        👤 ${currentUser.name}
        <span class="discount-tag">-10%</span>
      </div>`;
  } else {
    authArea.innerHTML = `
      <a class="login-nav-btn" onclick="openLoginModal()">🔑 Влези</a>`;
  }
}

// ── CHECKOUT ──────────────────────────────────
function doCheckout() {
  if (cart.length === 0) {
    showToast("Корпата е празна!", "⚠️");
    return;
  }

  const subtotal = getCartTotal();
  const discount = currentUser ? subtotal * DISCOUNT_RATE : 0;
  const total = subtotal - discount;

  let itemsHTML = cart.map(item => `
    <div class="order-summary-item">
      <span>${item.name} × ${item.qty}</span>
      <span>${fmt(item.price * item.qty)}</span>
    </div>
  `).join("");

  if (currentUser && discount > 0) {
    itemsHTML += `
      <div class="order-summary-item" style="color:#2ecc71;font-weight:700;">
        <span>🎉 Попуст -10% (${currentUser.name})</span>
        <span>-${fmt(discount)}</span>
      </div>`;
  }

  const modal = document.getElementById("checkoutModal");
  document.getElementById("checkoutItems").innerHTML = itemsHTML;
  document.getElementById("checkoutTotal").textContent = fmt(total);

  if (!currentUser) {
    document.getElementById("checkoutLoginHint").style.display = "block";
  } else {
    document.getElementById("checkoutLoginHint").style.display = "none";
  }

  closeCart();
  modal.classList.add("open");
}

function confirmCheckout() {
  document.getElementById("checkoutModal").classList.remove("open");
  cart = [];
  saveCart();
  updateCartUI();
  renderCartItems();
  showToast("Нарачката е поднесена! Ви благодариме 🙏", "✓");
}

// ── PRODUCT PAGE LOGIC ────────────────────────
function loadProductPage() {
  const params = new URLSearchParams(window.location.search);

  // Support both ?id= (new) and ?img= (legacy)
  const id = parseInt(params.get("id"));
  const imgFile = params.get("img");

  let p = null;

  if (id) {
    p = products.find(x => x.id === id);
  }

  if (!p && imgFile) {
    // Legacy support
    document.getElementById("prodImage").src = imgFile;
    document.getElementById("prodImage").alt = imgFile;
    document.getElementById("prodDesc").innerHTML = generateDescription(imgFile);
    return;
  }

  if (p) {
    document.getElementById("prodImage").src = p.img;
    document.getElementById("prodImage").alt = p.name;
    document.title = `Идеја – ${p.name}`;

    const discountedPrice = currentUser ? p.price * (1 - DISCOUNT_RATE) : null;
    const priceHTML = discountedPrice
      ? `<div class="prod-price-large">${fmt(discountedPrice)} <span style="font-size:1rem;color:#aaa;text-decoration:line-through;font-family:Nunito,sans-serif;">${fmt(p.price)}</span></div>`
      : `<div class="prod-price-large">${fmt(p.price)}</div>`;

    document.getElementById("prodDesc").innerHTML = `
      ${priceHTML}
      <p>${p.description}</p>
      <button class="add-to-cart-btn" style="margin-top:20px;padding:14px;font-size:1rem;border-radius:12px;" onclick="addToCartAndGoBack(${p.id})">
        🛒 Додај во корпа
      </button>
    `;
  }
}

function addToCartAndGoBack(id) {
  addToCart(id, null);
  setTimeout(() => window.location.href = "index.html", 800);
}

// ── LEGACY generateDescription ────────────────
function generateName(file) {
  return file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
}

function generateDescription(file) {
  const name = generateName(file);
  return `<strong>${name}</strong><br>Производ достапен во продавницата Идеја, Куманово.`;
}

// ── TRANSLATION ───────────────────────────────
let lang = "mk";
const translations = {
  mk: {
    toys: "Играчки",
    christmas: "Christmas Sale 🎄",
    home: "Производи за Дом",
    heroTitle: "Играчки и производи за дом",
    heroSub: "Квалитетни производи за секој дом и секое дете. Огромен избор на подароци, куќни декорации и играчки.",
  },
  en: {
    toys: "Toys",
    christmas: "Christmas Sale 🎄",
    home: "Home Products",
    heroTitle: "Toys & Home Products",
    heroSub: "Quality products for every home and every child. Huge selection of gifts, home decorations and toys.",
  }
};

function toggleLang() {
  lang = lang === "mk" ? "en" : "mk";
  const btn = document.getElementById("translateBtn");
  if (btn) btn.textContent = lang === "mk" ? "EN" : "МК";
  applyTranslations();
}

function applyTranslations() {
  const t = translations[lang];
  const toysHead = document.querySelector("#toys h2");
  const xmasHead = document.querySelector("#christmas h2");
  const homeHead = document.querySelector("#home h2");
  const heroTitle = document.querySelector(".hero-text h2");
  const heroSub = document.querySelector(".hero-text p");
  if (toysHead) toysHead.textContent = t.toys;
  if (xmasHead) xmasHead.textContent = t.christmas;
  if (homeHead) homeHead.textContent = t.home;
  if (heroTitle) heroTitle.textContent = t.heroTitle;
  if (heroSub) heroSub.textContent = t.heroSub;
}

// ── INIT ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const isProductPage = document.body.classList.contains("product-page-body");

  updateAuthUI();
  updateCartUI();

  if (isProductPage) {
    loadProductPage();
  } else {
    renderProducts();
  }

  // Close cart on overlay click
  const overlay = document.getElementById("cartOverlay");
  if (overlay) overlay.addEventListener("click", closeCart);

  // Close modals on overlay click
  document.querySelectorAll(".modal-overlay").forEach(el => {
    el.addEventListener("click", (e) => {
      if (e.target === el) el.classList.remove("open");
    });
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeCart();
      document.querySelectorAll(".modal-overlay.open").forEach(m => m.classList.remove("open"));
    }
  });
});
