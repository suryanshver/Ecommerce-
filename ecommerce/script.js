const cartBtn = document.getElementById("cart-btn");
const cartSection = document.getElementById("cart-section");
const cartItems = document.getElementById("cart-items");
const addButtons = document.querySelectorAll(".add-to-cart");
const categoryButtons = document.querySelectorAll(".cat-btn");
const products = document.querySelectorAll(".product-item");

let cart = {};

// Toggle cart
cartBtn.addEventListener("click", () => {
  cartSection.style.display =
    cartSection.style.display === "block" ? "none" : "block";
});

// Add to cart
addButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);

    if (cart[name]) {
      cart[name].qty += 1;
    } else {
      cart[name] = { price, qty: 1 };
    }
    renderCart();
  });
});

// Render cart
function renderCart() {
  cartItems.innerHTML = "";

  Object.keys(cart).forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><span class="circle" onclick="removeItem('${item}')">&times;</span></td>
      <td></td>
      <td>${item}</td>
      <td>$${cart[item].price.toFixed(2)}</td>
      <td>${cart[item].qty}</td>
      <td>$${(cart[item].price * cart[item].qty).toFixed(2)}</td>
    `;

    cartItems.appendChild(row);
  });

  cartSection.style.display = "block";
}

// Remove item
function removeItem(item) {
  delete cart[item];
  renderCart();
}

// Filter products
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    products.forEach((product) => {
      product.classList.toggle(
        "hide",
        filter !== "all" && product.dataset.category !== filter
      );
    });
  });
});
