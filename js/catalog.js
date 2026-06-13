const catalogGrid = document.querySelector(".catalog-grid");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


function renderCatalog(){
    let catalogHTML = "";
    products.forEach((product) =>{
        const isFavorite = favorites.some(item => item.id === product.id);
        const isInCart = cart.some((item) => item.id === product.id);
        const cartItem = cart.find((item) => item.id === product.id);
        let quantity = cartItem ? cartItem.quantity : 1;
        catalogHTML += `
            <div class="product-card" data-id="${product.id}">
                <a href="product.html?id=${product.id}"><img src="${product.image}" alt="${product.alt}"></a>
                <a href="product.html?id=${product.id}" class="product-card-name"><h3>${product.title}</h3></a>                        
                <p>$ ${product.price}</p>
                <div class = "button-block">
                    ${isInCart 
                        ? `<div class="count-buttons" style = "width:75%; gap:15px">
                                <button class="count-btn-minus" data-id = "${product.id}">-</button>
                                <input type="number" name="count" value="${quantity}" style = "width:70%">
                                <button class="count-btn-plus" data-id = "${product.id}">+</button>
                            </div>`
                        : `<button class="catalog-btn add-cart-btn" data-id="${product.id}" >Добавить в корзину</button>`}
                    
                      
                    <button class="add-favorites-btn ${isFavorite ? 'active' : ''}" data-id="${product.id}">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="heart-icon">
                            <title/><g><path d="M16,28.72a3,3,0,0,1-2.13-.88L3.57,17.54a8.72,8.72,0,0,1-2.52-6.25,8.06,8.06,0,0,1,8.14-8A8.06,8.06,0,0,1,15,5.68l1,1,.82-.82h0a8.39,8.39,0,0,1,11-.89,8.25,8.25,0,0,1,.81,12.36L18.13,27.84A3,3,0,0,1,16,28.72ZM9.15,5.28A6.12,6.12,0,0,0,4.89,7a6,6,0,0,0-1.84,4.33A6.72,6.72,0,0,0,5,16.13l10.3,10.3a1,1,0,0,0,1.42,0L27.23,15.91A6.25,6.25,0,0,0,29,11.11a6.18,6.18,0,0,0-2.43-4.55,6.37,6.37,0,0,0-8.37.71L16.71,8.8a1,1,0,0,1-1.42,0l-1.7-1.7a6.28,6.28,0,0,0-4.4-1.82Z"/></g>
                        </svg>
                    </button>
                    
                </div>
            </div>
        `
    });
    catalogGrid.innerHTML = catalogHTML;
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
    saveCart();
    updateCatalog();
}

function setupCatalogEvents(){
    const addToCartBtn = document.querySelectorAll(".add-cart-btn");
    const addToFavsBtn = document.querySelectorAll(".add-favorites-btn");

    const countBtnMinus = document.querySelectorAll(".count-btn-minus");
    const countBtnPlus = document.querySelectorAll(".count-btn-plus");

    addToCartBtn.forEach((button) =>{
        button.addEventListener("click", () =>{
            const id = Number(button.dataset.id);
            const product = products.find((item) => item.id === id);
            cart.push({
                    ...product,
                    quantity:1
                });
                localStorage.setItem("cart",JSON.stringify(cart));
                updateCatalog();
        });
    });
    addToFavsBtn.forEach((button) =>{
        button.addEventListener("click", () =>{
            const id = Number(button.dataset.id);
            const product = products.find((item) => item.id === id);
            const favsItem = favorites.find((item) => item.id === id);
            if (favsItem !== undefined){
                favorites = favorites.filter(item => item.id !== id);
            }
            else {
                favorites.push(product);
            }
            saveFavs();
            updateCatalog()
        });
    });
    countBtnPlus.forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            changeQuantity(id, 1);
        });
    });
    countBtnMinus.forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            changeQuantity(id, -1);
        });
    }); 
}

function saveFavs(){
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}
function updateCatalog(){
    renderCatalog();
    setupCatalogEvents();
}
saveFavs();
updateCatalog()
