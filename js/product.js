const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const productPlace = document.querySelector(".product");
const priceWrapper = document.querySelector(".price-wrapper");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const product = products.find(item => item.id === id);


function renderProductPage(){
    let productPage = "";
    let specsHTML = "";
    const isInCart = cart.find((item) => product.id === item.id);
    product.specs.forEach((spec) => {
        specsHTML += `<li>${spec}</li>`;
    });
    productPage += `
    <div class="container">
        <div class="product-wrapper">

            <div class = "product-image">
                <img src = "${product.image}" alt="${product.alt}">
            </div>

            <div class="product-info">
                <h1>${product.title}</h1>

                <div class="price-wrapper ${isInCart ? `isInCart` : ''}">
                    <p class="price">$ ${product.price}</p>
                    ${isInCart
                        ?`<div class="count-buttons count-btns-product-page">
                            <button class="count-btn-minus" data-id = "${product.id}">-</button>
                            <input type="number" name="count" value="${isInCart.quantity}">
                            <button class="count-btn-plus" data-id = "${product.id}">+</button>
                        </div>`
                         : `<button class="btn add-cart-btn" style="font-size: 18px; padding: 15px 100px;"> В корзину</button>`}
                         
                </div>
                <div class="description"> 
                    <p>${product.description}</p>
                </div>
                <div class="chars">
                    <h3> Характеристики</h3>
                    <ul>
                        ${specsHTML}
                    </ul>
                </div>   
            </div>
        </div>
    </div>    
    `
    productPlace.innerHTML = productPage;
}
function changeQuantity(id, value){
    const item = cart.find((item) => item.id === id);;
    item.quantity += value;
    if (item.quantity < 1){
        item.quantity = 1;
    }
    if (item.quantity > 99){
        item.quantity = 99;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateProductPage();
}
function setupProductPageEvents(){
    const addToCartBtn = document.querySelector(".add-cart-btn");
    
    const countBtnPlus = document.querySelector(".count-btn-plus");
    const countBtnMinus = document.querySelector(".count-btn-minus");


    if (addToCartBtn){
        addToCartBtn.addEventListener("click", () =>{
        const id = product.id;
        const productInCart = products.find((item) => item.id === id);
        cart.push({
            ...productInCart,
            quantity:1
        });
        updateProductPage();
        saveCart();
    });
    }
    else{
        countBtnMinus.addEventListener("click", () => {
            const id = Number(countBtnMinus.dataset.id);
            changeQuantity(id, -1);
            updateProductPage();
            
        });
        countBtnPlus.addEventListener("click", () =>{
            const id = Number(countBtnPlus.dataset.id);
            changeQuantity(id, 1);
            updateProductPage();
        });
    }


    

}
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}
function updateProductPage(){
    renderProductPage();
    setupProductPageEvents();
}
updateProductPage();