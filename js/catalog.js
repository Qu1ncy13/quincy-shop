const catalogGrid = document.querySelector(".catalog-grid");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let products = [
    {
        id: 1,
        title:"Настольная лампа",
        price: 14.99,
        image: "../images/products_im/lamp.jpg",
        alt: "lamp",
    },
    {
        id: 2,
        title:"Органайзер для канцелярии",
        price: 7.99,
        image: "../images/products_im/organizer.jpg",
        alt:"organizer"
    },
    {
        id: 3,
        title: "Подставка для ноутбука",
        price: 9.99,
        image: "../images/products_im/stand.jpg",
        alt:"stand",
    },
    {
        id: 4,
        title: "Лоток для документов",
        price: 8.99,
        image: "../images/products_im/docums.jpg",
        alt:"docums",
    },
    {
       id:5,
       title:"Доска для заметок",
       price:12.99,
       image:"../images/products_im/board.jpg",
       alt:"board",
    },
    {
        id:6,
        title:"Настольный календарь",
        price:4.99,
        image:"../images/products_im/calendar.jpg",
        alt:"calendar"
    },
    {
        id:7,
        title:"Полка для книг",
        price:11.99,
        image:"../images/products_im/bookstand.jpg",
        alt:"bookstand"
    },
    {
        id:8,
        title:"Настольные часы",
        price:17.99,
        image:"../images/products_im/clock.jpg",
        alt:"clock"
    }
]
function renderCatalog(){
    
    let catalogHTML = "";
    products.forEach((product) =>{
        const isFavorite = favorites.some(item => item.id === product.id);
        catalogHTML += `
            <div class="product-card" data-id="${product.id}">
                <a href="#"><img src="${product.image}" alt="${product.alt}"></a>
                <a href="#" class="product-card-name"><h3>${product.title}</h3></a>                        
                <p>$ ${product.price}</p>
                <div class = "button-block">
                    <button class="catalog-btn add-cart-btn" data-id="${product.id}">Добавить в корзину</button>
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

function setupCatalogEvents(){
    const addToCartBtn = document.querySelectorAll(".add-cart-btn");
    const addToFavsBtn = document.querySelectorAll(".add-favorites-btn")
    addToCartBtn.forEach((button) =>{
        button.addEventListener("click", () =>{
            const id = Number(button.dataset.id);
            const product = products.find((item) => item.id === id);
            const cartItem = cart.find((item) => item.id === id);
            if (cartItem !== undefined){
                cartItem.quantity++;
            }
            else{
                cart.push({
                    ...product,
                    quantity:1
                });
                localStorage.setItem("cart",JSON.stringify(cart));
            }
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
            renderCatalog();
            setupCatalogEvents();
        });
    });
}



function saveFavs(){
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
saveFavs();
renderCatalog();
setupCatalogEvents();
