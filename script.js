const products = [
  {name:"Мультипіч", price:29000, img:"img/microwave.jpg"},
  {name:"Кавомашина", price:29000, img:"img/coffee.webp"},
  {name:"Пральна машина", price:39000, img:"img/washing_machine.jpg"},
  {name:"Комп'ютер", price:49000, img:"img/computer.webp"},
  {name:"Конвектор", price:2000, img:"img/heater.webp"},
  {name:"Електростанок", price:2399, img:"img/generator.webp"},
  {name:"Телефон Xiaomi", price:7999, img:"img/xiaomi_phone.webp"},
  {name:"Ноутбук Lenovo", price:25999, img:"img/lenovo_laptop.webp"},
  {name:"Телевізор LG", price:18999, img:"img/lg_tv.webp"},
  {name:"Блендер Philips", price:1499, img:"img/blender.webp"},
  {name:"Пилосос Samsung", price:8999, img:"img/vacuum.webp"},
  {name:"Мікрохвильовка Gorenje", price:4999, img:"img/microwave_gorenje.webp"},
  {name:"Холодильник Bosch", price:32999, img:"img/bosch_fridge.webp"},
  {name:"Навушники Sony", price:3499, img:"img/sony_headphones.webp"},
  {name:"Планшет Apple iPad", price:21999, img:"img/ipad.webp"},
  {name:"Монітор Acer", price:7999, img:"img/acer_monitor.webp"}
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
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = [];

// Render products
function renderProducts(list){
  container.innerHTML="";
  if(list.length === 0){
    container.innerHTML = "<h3>Нічого не знайдено 😢</h3>";
    return;
  }

  list.forEach((product,i)=>{
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";

    card.innerHTML = `
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
    square.addEventListener("click", ()=>{ addToCart(product); });
    heart.addEventListener("click", ()=>{ heart.classList.toggle("active"); });

    container.appendChild(card);
    setTimeout(()=>{card.style.opacity=1;card.style.transform="translateY(0)";},i*50);
  });
}

// Add to cart
function addToCart(product){
  const exists = cart.find(item=>item.name===product.name);
  if(exists){
    exists.qty +=1;
  } else {
    cart.push({...product, qty:1});
  }
  updateCart();
}

// Update cart
function updateCart(){
  cartCount.textContent = cart.reduce((sum,item)=>sum+item.qty,0);
  cartItems.innerHTML="";
  let total=0;
  cart.forEach((item,index)=>{
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.price} грн
      <input type="number" min="1" value="${item.qty}" data-index="${index}">
      <button data-index="${index}">X</button>
    `;
    const btn = li.querySelector("button");
    const input = li.querySelector("input");

    btn.addEventListener("click", ()=>{
      cart.splice(index,1);
      updateCart();
    });
    input.addEventListener("change", e=>{
      const val = parseInt(e.target.value);
      if(val>0){ cart[index].qty=val; updateCart(); }
    });
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });
  cartTotal.textContent = "Сума: " + total + " грн";
}

// Search
function searchProducts(){
  const value = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(product=>product.name.toLowerCase().includes(value));
  renderProducts(filtered);
}

// Events
searchBtn.addEventListener("click", searchProducts);
searchInput.addEventListener("keyup", e=>{if(e.key==="Enter") searchProducts();});
themeToggle.addEventListener("click", ()=>{document.body.classList.toggle("dark");});
cartToggle.addEventListener("click", ()=>{cartModal.style.display="flex";});
closeCart.addEventListener("click", ()=>{cartModal.style.display="none";});
cartModal.addEventListener("click", e=>{if(e.target===cartModal) cartModal.style.display="none";});
checkoutBtn.addEventListener("click", ()=>{
  alert("Замовлення оформлено! Загальна сума: "+cart.reduce((sum,i)=>sum+i.price*i.qty,0)+" грн");
  cart=[]; updateCart(); cartModal.style.display="none";
});

// Banner button scroll to products
document.getElementById("shopNowBtn").addEventListener("click", ()=>{
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
});

// Add sale item to cart
document.querySelector(".add-sale").addEventListener("click", e=>{
  const name=e.target.dataset.name;
  const price=parseInt(e.target.dataset.price);
  const img=e.target.dataset.img;
  addToCart({name,price,img});
});

renderProducts(products);
updateCart();

// Кнопка "Купити" в секции Sale
document.querySelectorAll(".add-sale").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = {
      name: btn.dataset.name,
      price: parseInt(btn.dataset.price),
      img: btn.dataset.img
    };
    addToCart(product); // используем уже существующую функцию
    cartModal.style.display = "flex"; // открываем корзину сразу
  });
});