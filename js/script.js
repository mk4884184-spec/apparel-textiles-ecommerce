const products = [
  {
    id: 1,
    name: "Classic Cotton Shirt",
    category: "Men",
    price: 1299,
    icon: "👕"
  },
  {
    id: 2,
    name: "Premium Denim Jacket",
    category: "Men",
    price: 2499,
    icon: "🧥"
  },
  {
    id: 3,
    name: "Elegant Summer Dress",
    category: "Women",
    price: 1899,
    icon: "👗"
  },
  {
    id: 4,
    name: "Casual Linen Top",
    category: "Women",
    price: 999,
    icon: "👚"
  },
  {
    id: 5,
    name: "Leather Handbag",
    category: "Accessories",
    price: 2199,
    icon: "👜"
  },
  {
    id: 6,
    name: "Classic Sunglasses",
    category: "Accessories",
    price: 799,
    icon: "🕶️"
  },
  {
    id: 7,
    name: "Comfort Hoodie",
    category: "Men",
    price: 1599,
    icon: "🥼"
  },
  {
    id: 8,
    name: "Cotton Kurti",
    category: "Women",
    price: 1399,
    icon: "👘"
  }
];

let cart = [];
let wishlist = [];
let currentProducts = [...products];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const cartCount = document.getElementById("cartCount");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const productModal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const newsletterForm = document.getElementById("newsletterForm");

/* DISPLAY PRODUCTS */

function displayProducts(items) {
  productGrid.innerHTML = "";

  if (items.length === 0) {
    productGrid.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;padding:40px;">
        No products found.
      </p>
    `;
    return;
  }

  items.forEach(product => {
    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        ${product.icon}
      </div>

      <div class="product-info">
        <span class="product-category">
          ${product.category}
        </span>

        <h3>${product.name}</h3>

        <p class="price">
          ₹${product.price.toLocaleString("en-IN")}
        </p>

        <div class="product-buttons">
          <button onclick="addToCart(${product.id})">
            Add to Cart
          </button>

          <button class="wish" onclick="addToWishlist(${product.id})">
            ♡
          </button>

          <button class="wish" onclick="openProduct(${product.id})">
            View
          </button>
        </div>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

/* SEARCH */

function searchProducts() {
  const query = searchInput.value.toLowerCase().trim();

  currentProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );

  applySort();
}

/* CATEGORY FILTER */

function filterCategory(category) {
  if (category === "All") {
    currentProducts = [...products];
  } else {
    currentProducts = products.filter(
      product => product.category === category
    );
  }

  searchInput.value = "";
  applySort();

  document.getElementById("shop").scrollIntoView({
    behavior: "smooth"
  });
}

/* SORT */

function applySort() {
  const value = sortSelect.value;

  let sorted = [...currentProducts];

  if (value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  if (value === "name") {
    sorted.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  displayProducts(sorted);
}

/* CART */

function addToCart(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  cart.push(product);

  updateCartCount();

  showMessage(`${product.name} added to cart.`);
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}

/* WISHLIST */

function addToWishlist(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  const exists = wishlist.some(item => item.id === id);

  if (exists) {
    wishlist = wishlist.filter(item => item.id !== id);
    showMessage("Removed from wishlist.");
  } else {
    wishlist.push(product);
    showMessage("Added to wishlist.");
  }
}

/* PRODUCT MODAL */

function openProduct(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  modalBody.innerHTML = `
    <div style="text-align:center;">
      <div style="font-size:80px;">
        ${product.icon}
      </div>

      <p class="product-category">
        ${product.category}
      </p>

      <h2>${product.name}</h2>

      <p class="price">
        ₹${product.price.toLocaleString("en-IN")}
      </p>

      <p>
        Premium quality apparel designed for comfort,
        durability and everyday style.
      </p>

      <br>

      <button class="btn" onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    </div>
  `;

  productModal.classList.add("show");
}

/* CLOSE MODAL */

closeModal.addEventListener("click", () => {
  productModal.classList.remove("show");
});

productModal.addEventListener("click", event => {
  if (event.target === productModal) {
    productModal.classList.remove("show");
  }
});

/* MOBILE MENU */

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

/* CLOSE MOBILE MENU AFTER CLICK */

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

/* CATEGORY BUTTONS */

document.querySelectorAll(".category-card").forEach(button => {
  button.addEventListener("click", () => {
    filterCategory(button.dataset.category);
  });
});

/* SEARCH AND SORT */

searchInput.addEventListener("input", searchProducts);

sortSelect.addEventListener("change", applySort);

/* CART BUTTON */

document.getElementById("cartBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    showMessage("Your cart is empty.");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  showMessage(
    `Cart: ${cart.length} item(s) | Total: ₹${total.toLocaleString("en-IN")}`
  );
});

/* WISHLIST BUTTON */

document.getElementById("wishlistBtn").addEventListener("click", () => {
  if (wishlist.length === 0) {
    showMessage("Your wishlist is empty.");
  } else {
    showMessage(
      `Wishlist contains ${wishlist.length} product(s).`
    );
  }
});

/* NEWSLETTER */

newsletterForm.addEventListener("submit", event => {
  event.preventDefault();

  const email = document.getElementById("emailInput").value;

  if (!email) return;

  showMessage("Thank you for subscribing!");

  newsletterForm.reset();
});

/* MESSAGE */

function showMessage(message) {
  const notification = document.createElement("div");

  notification.textContent = message;

  notification.style.position = "fixed";
  notification.style.bottom = "25px";
  notification.style.right = "25px";
  notification.style.background = "#2c211a";
  notification.style.color = "white";
  notification.style.padding = "14px 20px";
  notification.style.borderRadius = "8px";
  notification.style.zIndex = "5000";
  notification.style.boxShadow = "0 10px 25px rgba(0,0,0,.2)";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2500);
}

/* INITIAL LOAD */

displayProducts(products);