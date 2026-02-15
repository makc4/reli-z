const products = [
  {name:"Мультипіч", price:29000, img:"img/microwave.jpg"},
  {name:"Кавомашина", price:29000, img:"img/coffee.webp"},
  {name:"Пральна машина", price:39000, img:"img/washing_machine.jpg"},
  {name:"Комп'ютер", price:49000, img:"img/computer.webp"},
  {name:"Конвектор", price:2000, img:"img/heater.webp"},
  {name:"Електростанок", price:2399, img:"img/generator.webp"},
  {name:"Телефон Xiaomi", price:7999, img:"img/xiaomi_phone.webp"},
  {name:"Ноутбук Lenovo", price:25999, img:"img/lenovo_laptop.webp"},
  {name:"Телевізор LG", price:18999, img:"img/lg_tv.url"},
  {name:"Блендер Philips", price:1499, img:"img/blender.url"},
  {name:"Пилосос Samsung", price:8999, img:"img/vacuum.url"},
  {name:"Мікрохвильовка Gorenje", price:4999, img:"img/microwave_gorenje.jpg"},
  {name:"Холодильник Bosch", price:32999, img:"img/bosch_fridge.jpg"},
  {name:"Навушники Sony", price:3499, img:"img/sony_headphones.jpg"},
  {name:"Планшет Apple iPad", price:21999, img:"img/ipad.jpg"},
  {name:"Монітор Acer", price:7999, img:"img/acer_monitor.jpg"}
];

const container = document.getElementById("products");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const themeToggle = document.getElementById("themeToggle");

const cartToggle = document.getElementById("cartToggle");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = [];

function renderProducts(list){
  container.innerHTML="";

  if(list.length === 0){
    container.innerHTML = "<h3>Нічого не знайдено 😢</h3>";
    return;
  }

  list.forEach(product=>{
    const card=document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML=`
      <i class="fa-solid fa-heart favorite"></i>
      <img src="${product.img}" alt="${product.name}">
      <div class="product-info">
        <div>
          <p class="product-name">${product.name}</p>
          <p class="product-price">${product.price} грн</p>
        </div>
        <div class="square">🛒</div>
      </div>
    `;

    const square = card.querySelector(".square");
    const heart = card.querySelector(".favorite");

    square.addEventListener("click", ()=>{
      addToCart(product);
    });

    heart.addEventListener("click", ()=>{
      heart.classList.toggle("active");
    });

    container.appendChild(card);
  });
}

function addToCart(product){
  cart.push(product);
  updateCart();
}

function updateCart(){
  cartCount.textContent = cart.length;
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index)=>{
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.price} грн
      <button data-index="${index}">X</button>
    `;
    const btn = li.querySelector("button");
    btn.addEventListener("click", ()=>{
      cart.splice(index,1);
      updateCart();
    });
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = "Сума: " + total + " грн";
}

// Пошук
function searchProducts(){
  const value = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(value)
  );
  renderProducts(filtered);
}

// Події
searchBtn.addEventListener("click", searchProducts);
searchInput.addEventListener("keyup", e=>{
  if(e.key === "Enter") searchProducts();
});

// Темна тема
themeToggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
});

// Відкриття/закриття корзини
cartToggle.addEventListener("click", ()=>{
  cartModal.style.display = "flex";
});

closeCart.addEventListener("click", ()=>{
  cartModal.style.display = "none";
});

// Клік поза модальним вікном закриває корзину
cartModal.addEventListener("click", e=>{
  if(e.target === cartModal){
    cartModal.style.display = "none";
  }
});

renderProducts(products);
updateCart();
