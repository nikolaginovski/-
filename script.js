/* =============================================
   UGEJA – script.js
   Products, Cart, Login/Discount System
   ============================================= */

// ── PRODUCT DATA ──────────────────────────────
// All images from excel photos folder
const products = [
  // TOYS - First half of products
  { id: 1, category: "toys", name: "Играчка Развој 3060", price: 450, img: "excel photos/3060-1.png", badge: "new", description: "Едукативна играчка за развој на фини моторни вештини. Идеална за мали деца од 1-3 години. Со различни форми и текстури за исследување." },
  { id: 2, category: "toys", name: "Кукла G798A", price: 890, img: "excel photos/G798A.jpg", badge: null, description: "Прекрасна детска кукла со комплетна облека. Нетоксичен материјал, безбеден за деца од сите возрасти. Одличен подарок за девојчиња." },
  { id: 3, category: "toys", name: "Конструктор Коцки", price: 750, img: "excel photos/9088L.png", badge: null, description: "Сет со 100 разноцветни коцки. Развива креативност и просторно размислување. Подходен за деца од 3 години нагоре." },
  { id: 4, category: "toys", name: "RC Тркачко Возило", price: 1490, img: "excel photos/Q-91028E.jpg", badge: "sale", description: "Радиоконтролирано возило со висока брзина. Батерија трае 40+ минути. За деца од 6 години. Со дистанцирана контрола." },
  { id: 5, category: "toys", name: "Играчка Возило CS58", price: 520, img: "excel photos/CS58-E4.jpg", badge: null, description: "Квалитетно направена играчка возило. Безбеден пластичен материјал. Одличен за млади деца за развој на моторни вештини." },
  { id: 6, category: "toys", name: "Интерактивна Играчка", price: 680, img: "excel photos/HQ241162.jpg", badge: "new", description: "Електрична играчка со светло и звук. Развива интерес и соза за светот. Батеријски погнувана, безбедна за деца." },
  { id: 7, category: "toys", name: "Играчка Возило Q-91034", price: 580, img: "excel photos/Q-91034.jpg", badge: null, description: "Забавна играчка за деца. Елегантен дизајн, квалитетна конструкција. Идеална за подарок или за дома за деца од 3+ години." },
  { id: 8, category: "toys", name: "Играчка TMX559", price: 640, img: "excel photos/TMX559-7A.jpg", badge: "sale", description: "Интересна играчка со различни функции. Развива координација и логичко размислување. Препорачливо од 4 години нагоре." },
  { id: 9, category: "toys", name: "Детска Играчка SY044", price: 490, img: "excel photos/SY044-7.jpg", badge: null, description: "Едукативна играчка за развој. Безбедни материјали, забавна и поучна. Средство за активна и позитивна игра на деца." },
  { id: 10, category: "toys", name: "Играчка Конструкција Q-91152", price: 710, img: "excel photos/Q-91152E.jpg", badge: null, description: "Конструктивна играчка за развој на креативност. Содржи повеќе делови. За деца од 5+ години. Идеална за активна игра." },
  { id: 11, category: "toys", name: "Интерактивна Играчка HQ", price: 750, img: "excel photos/HQ241161.jpg", badge: "new", description: "Модерна интерактивна играчка со технолошки функции. Развива логичко размислување и координација. За деца од 4 години." },
  { id: 12, category: "toys", name: "Играчка SY050", price: 520, img: "excel photos/SY050-2.jpg", badge: null, description: "Забавна детска играчка со едукативна вредност. Квалитетна конструкција. Подходна за деца од 2 години нагоре." },
  { id: 13, category: "toys", name: "Играчка Образач 09-D18", price: 430, img: "excel photos/09-D18.jpg", badge: null, description: "Образач за развој на моторни вештини. Различни форми за исследување. Безбеден и нетоксичен материјал за мали деца." },
  { id: 14, category: "toys", name: "Играчка 1399B", price: 560, img: "excel photos/1399B.jpg", badge: "sale", description: "Квалитетна детска играчка со интересен дизајн. Развива креативност. За деца од 3 години нагоре. Препорачена од педагози." },
  { id: 15, category: "toys", name: "Играчка HQ241306", price: 820, img: "excel photos/HQ241306-36 & HQ241306-24 & HQ241306-18 & HQ241306-12.jpg", badge: null, description: "Комплетен сет од повеќе делови. Развива логичко размислување. За деца од 4-8 години. Со подробни упатства за користење." },
  { id: 16, category: "toys", name: "Играчка 368-18", price: 490, img: "excel photos/368-18.jpg", badge: null, description: "Едукативна играчка за развој. Забавна и поучна. За деца од 2 години нагоре. Безбедни, хипоалергени материјали." },
  { id: 17, category: "toys", name: "Играчка 368-19", price: 510, img: "excel photos/368-19.jpg", badge: "new", description: "Образач и развојна играчка. Различни текстури и форми. Стимулира развој на сензори. За мали деца од 1 година." },
  { id: 18, category: "toys", name: "Играчка 368-24G", price: 540, img: "excel photos/368-24G.jpg", badge: null, description: "Развојна играчка со различни активности. Квалитетна конструкција. За деца од 6 месеци до 2 години." },
  { id: 19, category: "toys", name: "Играчка 368-29", price: 580, img: "excel photos/368-29.jpg", badge: null, description: "Забавна и активна играчка за мали деца. Развива моторни и когнитивни вештини. Препорачена од експерти за развој." },
  { id: 20, category: "toys", name: "Играчка 368-30", price: 600, img: "excel photos/368-30.jpg", badge: "sale", description: "Многофункционална развојна играчка. За деца од 1-3 години. Безбедна, сертифицирана и одговарачка на интернационални стандарди." },
  
  // HOME - Second half of products
  { id: 21, category: "home", name: "Декоративни Перници", price: 690, img: "excel photos/JC624-105.jpg", badge: null, description: "Сет од 2 декоративни перници со преклопни навлаки. Меки, удобни и практични. Лесни за одржување. За спална и дневна соба." },
  { id: 22, category: "home", name: "Ароматична Свеќа Лаванда", price: 390, img: "excel photos/MSS-011A.jpg", badge: "new", description: "Рачно правена ароматична свеќа со природен мирис на лаванда. Гори 40+ часа. Создава топло и пријатно светло. Совршена за релаксација." },
  { id: 23, category: "home", name: "Дрвена Рамка за Слика", price: 290, img: "excel photos/K183A10.jpg", badge: null, description: "Елегантна дрвена рамка 30×40 cm. Природен материјал. Подходна за семејни слики или уметнички репродукции." },
  { id: 24, category: "home", name: "Кујнски Сет Садови", price: 1290, img: "excel photos/3905.jpg", badge: null, description: "Комплетен сет од 5 кујнски садови. Антилепачки премаз. За индукциски шпорет. Со стаклени капаци и силиконски рачки." },
  { id: 25, category: "home", name: "Украс за Дом 3047", price: 540, img: "excel photos/3047-2.png", badge: null, description: "Модерен украс за дом. Направен од висококвалитетни материјали. Хармонира со различни стилови на украсување." },
  { id: 26, category: "home", name: "Декоративна Скулптура", price: 820, img: "excel photos/C305.png", badge: "new", description: "Современа скулптура за дневна соба. Елегантен дизајн. Израдена од издржлив материјал. Станува центар на внимање во секој простор." },
  { id: 27, category: "home", name: "Украс 22307-2", price: 480, img: "excel photos/22307-2.jpg", badge: null, description: "Декоративен украс за дом. Фина уметност. Подходен за полици и мебел. Создава топло и пријатно опкружување." },
  { id: 28, category: "home", name: "Украс 22307-3", price: 500, img: "excel photos/22307-3.jpg", badge: "sale", description: "Елегантен декоративен украс. Природен дизајн. За дневна, спална или канцеларија. Одлична вредност за пари." },
  { id: 29, category: "home", name: "Украс 22307-4", price: 520, img: "excel photos/22307-4.jpg", badge: null, description: "Модерен украс за украсување на домот. Висока квалитета на изработка. Траен и практичен. За различни просторни слогови." },
  { id: 30, category: "home", name: "Украсна Композиција 2077", price: 650, img: "excel photos/2077.jpg", badge: null, description: "Комплетна украсна композиција. Вмешува повеќе елементи. За создавање на хармониозна декорација во домот." },
  { id: 31, category: "home", name: "Украс 2185", price: 580, img: "excel photos/2185.jpg", badge: "new", description: "Фина декоративна композиција. За полици и мебел. Создава уютна атмосфера. Совршена за подарок." },
  { id: 32, category: "home", name: "Украс 1799A", price: 620, img: "excel photos/1799A.jpg", badge: null, description: "Елегантен украс за дом. Висока уметничка вредност. Подходен за луѓе со софистициран вкус. За дневна и спални." },
  { id: 33, category: "home", name: "Украс 2004", price: 530, img: "excel photos/2004.jpg", badge: null, description: "Современ украс за дом. Минималистички дизајн. За модерни интеријери. Практичен и пријатен." },
  { id: 34, category: "home", name: "Украс 2022-106", price: 720, img: "excel photos/2022-106.jpg", badge: "sale", description: "Еуропски стил украс. Висока квалитета. Создава елегантна атмосфера. За експоантни интеријери." },
  { id: 35, category: "home", name: "Украс 2022-108", price: 740, img: "excel photos/2022-108.jpg", badge: null, description: "Фина украсна композиција. За дневна соба. Хармонира со класична и модерна декорација. Траен материјал." },
  { id: 36, category: "home", name: "Украс 096-12", price: 420, img: "excel photos/096-12.jpg", badge: null, description: "Едноставен украс за дом. Направен од природни материјали. Неутрална боја. За различни стилови на украсување." },
  { id: 37, category: "home", name: "Украс 096-22A", price: 450, img: "excel photos/096-22A.jpg", badge: "new", description: "Модерен украс со елегантен дизајн. Практичен и визуелно привлекува. За полици и столови. Совршена за подарок." },
  { id: 38, category: "home", name: "Украс 096-32", price: 480, img: "excel photos/096-32.jpg", badge: null, description: "Декоративен украс од добро избрани материјали. Создава топла атмосфера. За спална соба и дневна. Долготраен." },
  { id: 39, category: "home", name: "Украс 12146", price: 560, img: "excel photos/12146.png", badge: null, description: "Висока квалитета украс. Уметнички дизајн. За колеќционари и љубители на лепи предмети. На полица или маса." },
  { id: 40, category: "home", name: "Украс 12201", price: 590, img: "excel photos/12201.png", badge: "sale", description: "Премиум украс за дом. Елегантна композиција. За лаксузна декорација. Совршена инвестиција во домот." },
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
  const priceHTML = `<div class="card-price">${fmt(p.price)}</div>`;

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
  const homeGrid = document.getElementById("homeGrid");

  if (!toysGrid) return; // not on index page

  toysGrid.innerHTML = "";
  homeGrid.innerHTML = "";

  products.forEach((p, i) => {
    const card = buildCard(p);
    card.style.animationDelay = `${i * 0.06}s`;
    if (p.category === "toys") toysGrid.appendChild(card);
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

  if (discountEl) discountEl.parentElement.style.display = "none";
  if (savingsEl) savingsEl.parentElement.style.display = "none";
  if (totalEl) totalEl.textContent = fmt(subtotal);
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
  showToast(`Добредојде, ${user.name}! 🎉`, "👤");
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
  showToast(`Успешна регистрација! Добредојде, ${name}! 🎉`, "✓");
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
  const total = subtotal;

  let itemsHTML = cart.map(item => `
    <div class="order-summary-item">
      <span>${item.name} × ${item.qty}</span>
      <span>${fmt(item.price * item.qty)}</span>
    </div>
  `).join("");

  const modal = document.getElementById("checkoutModal");
  document.getElementById("checkoutItems").innerHTML = itemsHTML;
  document.getElementById("checkoutTotal").textContent = fmt(total);

  document.getElementById("checkoutLoginHint").style.display = "none";

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

    const priceHTML = `<div class="prod-price-large">${fmt(p.price)}</div>`;

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
    home: "Производи за Дом",
    heroTitle: "Играчки и производи за дом",
    heroSub: "Квалитетни производи за секој дом и секое дете. Огромен избор на подароци, куќни декорации и играчки.",
  },
  en: {
    toys: "Toys",
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
  const homeHead = document.querySelector("#home h2");
  const heroTitle = document.querySelector(".hero-text h2");
  const heroSub = document.querySelector(".hero-text p");
  if (toysHead) toysHead.textContent = t.toys;
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
