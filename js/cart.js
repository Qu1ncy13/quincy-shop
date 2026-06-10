const cartItems = document.querySelector(".cart-items");
const totalSum = document.querySelector(".total-sum");
const emptyCart = document.querySelector(".empty-cart")
const cartModal = document.querySelector(".overlay");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function renderCart(){
    let cartHTML = "";
    cart.forEach((item)=>{
        cartHTML += `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.alt}">
            <a href="product.html?id=${item.id}">${item.title}</a>
            <p class="item-total">$ ${(item.price * item.quantity).toFixed(2)}</p>
            <button class = "btn deleteBtn">Удалить</button>
            <div class="count-buttons">
                <button class="count-btn-minus">-</button>
                <input type="number" name="count" value="${item.quantity}">
                <button class="count-btn-plus">+</button>
            </div>
        </div>
        `;
    });
    cartHTML += `
    <div class="clean-cart-btn-wrapper">
        <button class="clean-cart-btn">
            <svg class="clean-cart-btn-icon" viewBox="0 0 36 36"  xmlns="http://www.w3.org/2000/svg" >
                <title>trash-line</title>
                <path class="clr-i-outline clr-i-outline-path-1" d="M27.14,34H8.86A2.93,2.93,0,0,1,6,31V11.23H8V31a.93.93,0,0,0,.86,1H27.14A.93.93,0,0,0,28,31V11.23h2V31A2.93,2.93,0,0,1,27.14,34Z"></path><path class="clr-i-outline clr-i-outline-path-2" d="M30.78,9H5A1,1,0,0,1,5,7H30.78a1,1,0,0,1,0,2Z"></path><rect class="clr-i-outline clr-i-outline-path-3" x="21" y="13" width="2" height="15"></rect><rect class="clr-i-outline clr-i-outline-path-4" x="13" y="13" width="2" height="15"></rect><path class="clr-i-outline clr-i-outline-path-5" d="M23,5.86H21.1V4H14.9V5.86H13V4a2,2,0,0,1,1.9-2h6.2A2,2,0,0,1,23,4Z"></path>
                <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
                        </svg>Отчистить корзину
        </button>
    </div>    
    `;
    cartItems.innerHTML = cartHTML;

}
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}
function changeQuantity(id, value){
    const item = cart.find((item) => item.id === id);
    item.quantity += value;
    if (item.quantity < 1){
        item.quantity = 1;
    }
    if (item.quantity > 99){
        item.quantity = 99;
    }
    updateCart();
}
// Здесь задаются все кнопки
renderCart();

function setupCartEvents(){
    const plusBtn = document.querySelectorAll(".count-btn-plus");
    const minusBtn = document.querySelectorAll(".count-btn-minus");
    const deleteItemBtn = document.querySelectorAll(".deleteBtn");
    const cleanCartButton = document.querySelector(".clean-cart-btn");
    const cleanCartConfirmBtn = cartModal.querySelector(".confirm-btn");
    const cleanCartCancelBtn = cartModal.querySelector(".cancel-btn");
     
    plusBtn.forEach((button) =>{
        button.addEventListener("click", ()=>{
            const cartItem = button.closest(".cart-item");
            const id = Number(cartItem.dataset.id);
            changeQuantity(id, 1)
        });
    });
    minusBtn.forEach((button) =>{
        button.addEventListener("click", () =>{
            const cartItem = button.closest(".cart-item");
            const id = Number(cartItem.dataset.id);
            changeQuantity(id, -1);
        });
    });
    deleteItemBtn.forEach((button) => {
        button.addEventListener("click", ()=>{
            const cartItem = button.closest(".cart-item");
            const id = Number(cartItem.dataset.id);
            cart = cart.filter((item) => {
                return item.id != id;
            });
            updateCart();
        });
    }); 
    cleanCartButton.addEventListener("click", () =>{
        cartModal.classList.remove("hidden");
        
    });
    cleanCartConfirmBtn.addEventListener("click", () =>{
        cart = [];
        cartModal.classList.add("hidden");
        updateCart();
    });
    cleanCartCancelBtn.addEventListener("click", () =>{
        cartModal.classList.add("hidden");
    });
    
}
updateCart();
function updateCartTotal(){
    let sum = 0;
    cart.forEach((item) =>{
        sum += item.price *  item.quantity;  
    });
    totalSum.textContent = "$ " + sum.toFixed(2);
}

function checkEmptyCart(){
    if (cart.length == 0){
        cartItems.classList.add("hidden");
        emptyCart.classList.remove("hidden");
    }
    else{
        cartItems.classList.remove("hidden");
        emptyCart.classList.add("hidden");
    }
}
function updateCart(){
    renderCart();
    setupCartEvents();
    updateCartTotal();
    checkEmptyCart();
    saveCart();
}
