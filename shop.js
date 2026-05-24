
const shopItems = [
  {
    id: 1,
    image: "/assets/images/Voetbal.jpg",
    name: "Voetbal Pro Grip",
    description: "De Voetbal Pro Grip is de ideale bal voor zowel recreatieve spelers als fanatieke voetballers.",
    price: 15,
  },
  {
    id: 2,
    image: "/assets/images/Basketbal.jpg",
    name: "Basketbal StreetMaster",
    description: "De StreetMaster is dé basketbal voor buitengebruik.",
    price: 15,
  },
  {
    id: 3,
    image: "/assets/images/Pingpongbal.jpg",
    name: "Pingpongballen Precision Pack",
    description: "De Precision Pack pingpongballen zijn ontworpen voor spelers die houden van snelheid, stabiliteit en een consistente stuit.",
    price: 14,
  },
  {
    id: 4,
    image: "/assets/images/Tennisbal.jpg",
    name: "Tennisballen MatchPro",
    description: "De MatchPro tennisballen zijn gemaakt voor spelers die topprestaties verwachten.",
    price: 6,
  },
  {
    id: 5,
    image: "/assets/images/Volleybal.jpg",
    name: "Volleybal AirSoft Touch",
    description: "De AirSoft Touch volleybal is ontworpen voor comfort en controle.",
    price: 13,
  },
  {
    id: 6,
    image: "/assets/images/Poolbal.jpg",
    name: "Poolballen Classic Set",
    description: "De Classic Set poolballen biedt professionele kwaliteit voor thuisgebruik en recreatieve speeltafels.",
    price: 11,
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const productsContainer = document.querySelector(".products");
const cartContainer = document.querySelector(".shopping-cart");
const wishlistContainer = document.querySelector(".wishlist");

function saveState() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function renderProducts() {
  productsContainer.innerHTML = "";

  shopItems.forEach((item) => {
    const productCard = document.createElement("article");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <div class="product-image" style="background-image: url('${item.image}')"></div>
      <div class="product-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>

        <!-- Bekijk product -->
        <a href="/detailpaginas/product${item.id}.html" class="button view">Bekijk product</a>

        <!-- Winkelmandje -->
        <button class="button cart" data-id="${item.id}">Toevoegen aan winkelmandje</button>

        <!-- Wishlist -->
        <button class="button wishlist" data-id="${item.id}">❤️</button>

        <div class="notification" style="display:none; margin-top:5px; font-size:0.85rem; color:green;"></div>
      </div>
    `;

    productsContainer.appendChild(productCard);
  });

  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll(".product-card .cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const item = shopItems.find((i) => i.id === id);

      const existing = cart.find((i) => i.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ ...item, qty: 1 });
      }

      saveState();
      renderCart();
      showNotification(e.target, "Product toegevoegd!");
    });
  });

  document.querySelectorAll(".product-card .wishlist").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const item = shopItems.find((i) => i.id === id);

      const exists = wishlist.find((i) => i.id === id);
      if (exists) {
        wishlist = wishlist.filter((i) => i.id !== id);
        btn.style.backgroundColor = "";
      } else {
        wishlist.push({ ...item });
        btn.style.backgroundColor = "#ffcccc";
      }

      saveState();
      renderWishlist();
      showNotification(e.target, exists ? "Verwijderd uit wishlist!" : "Toegevoegd aan wishlist!");
    });
  });
}


function renderCart() {
  cartContainer.innerHTML = "<h2>Shopping Cart</h2>";

  if (cart.length === 0) {
    cartContainer.innerHTML += "<p>Je winkelmandje is leeg.</p>";
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Product</th>
        <th>Aantal</th>
        <th>Prijs</th>
        <th>Verwijder</th>
      </tr>
    </thead>
    <tbody>
      ${cart
        .map(
          (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>€${(item.price * item.qty).toFixed(2)}</td>
          <td><button class="remove-cart" data-id="${item.id}">❌</button></td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  `;

  cartContainer.appendChild(table);

  
  document.querySelectorAll(".remove-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      cart = cart.filter((i) => i.id !== id);
      saveState();
      renderCart();
    });
  });

  
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalEl = document.createElement("p");
  totalEl.textContent = `Totaal: €${total.toFixed(2)}`;
  cartContainer.appendChild(totalEl);
}


function renderWishlist() {
  wishlistContainer.innerHTML = "<h2>Wishlist</h2>";

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML += "<p>Je wishlist is leeg.</p>";
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Product</th>
        <th>Prijs</th>
        <th>Verwijder</th>
      </tr>
    </thead>
    <tbody>
      ${wishlist
        .map(
          (item) => `
        <tr>
          <td>${item.name}</td>
          <td>€${item.price.toFixed(2)}</td>
          <td><button class="remove-wishlist" data-id="${item.id}">❌</button></td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  `;

  wishlistContainer.appendChild(table);

  document.querySelectorAll(".remove-wishlist").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      wishlist = wishlist.filter((i) => i.id !== id);
      saveState();
      renderWishlist();
    });
  });

  const total = wishlist.reduce((sum, item) => sum + item.price, 0);
  const totalEl = document.createElement("p");
  totalEl.textContent = `Totaal: €${total.toFixed(2)}`;
  wishlistContainer.appendChild(totalEl);
}


function showNotification(button, message) {
  const notif = button.parentElement.querySelector(".notification");
  notif.textContent = message;
  notif.style.display = "block";
  setTimeout(() => {
    notif.style.display = "none";
  }, 1500);
}


document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  renderWishlist();
});
