let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favoritesGrid = document.querySelector(".favorites-grid");
const emptyFavs = document.querySelector(".empty-favorites");
const favsModal = document.querySelector(".modal");

function renderFavorites(){
    let favoritesHTML = '';
    favorites.forEach((item) =>{
        favoritesHTML += `
            <div class="product-card" data-id="${item.id}">
                <a href="product.html?id=${item.id}"><img src="${item.image}" alt="${item.alt}"></a>
                <a href="product.html?id=${item.id}" class="product-card-name"><h3>${item.title}</h3></a>                        
                <p>$ ${item.price}</p>
                <div class = "button-block">
                    <button class="catalog-btn add-cart-btn" data-id="${item.id}">Добавить в корзину</button>
                    <button class="add-favorites-btn active" data-id="${item.id}">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="heart-icon">
                            <defs><style>.cls-1{fill:#101820;}</style></defs><title/><g data-name="Layer 54" id="Layer_54"><path class="cls-1" d="M16,28.72a3,3,0,0,1-2.13-.88L3.57,17.54a8.72,8.72,0,0,1-2.52-6.25,8.06,8.06,0,0,1,8.14-8A8.06,8.06,0,0,1,15,5.68l1,1,.82-.82h0a8.39,8.39,0,0,1,11-.89,8.25,8.25,0,0,1,.81,12.36L18.13,27.84A3,3,0,0,1,16,28.72ZM9.15,5.28A6.12,6.12,0,0,0,4.89,7a6,6,0,0,0-1.84,4.33A6.72,6.72,0,0,0,5,16.13l10.3,10.3a1,1,0,0,0,1.42,0L27.23,15.91A6.25,6.25,0,0,0,29,11.11a6.18,6.18,0,0,0-2.43-4.55,6.37,6.37,0,0,0-8.37.71L16.71,8.8a1,1,0,0,1-1.42,0l-1.7-1.7a6.28,6.28,0,0,0-4.4-1.82Z"/></g>
                        </svg>
                    </button>
                </div>
            </div>
        `
    });
    favoritesGrid.innerHTML = favoritesHTML;
}

function checkEmptyFavs(){
    if (favorites.length == 0){
        emptyFavs.classList.remove("hidden");
    }
    else{
        emptyFavs.classList.add("hidden");
    }
}

function setupFavsEvents(){
    const deleteItem = document.querySelectorAll(".add-favorites-btn");
    const deleteConfirmBtn = document.querySelector(".confirm-btn");
    const deleteCancelBtn = document.querySelector(".cancel-btn");
    
    let selectedId = null;

    deleteItem.forEach((button) =>{
        button.addEventListener("click", ()=>{
            selectedId = Number(button.dataset.id);
            favsModal.classList.remove("hidden");
        });
    });
    deleteConfirmBtn.addEventListener("click", () =>{
        favorites = favorites.filter(item => item.id !== selectedId);
        saveFavs();
        updateFavorites();
        favsModal.classList.add("hidden");

    });
    deleteCancelBtn.addEventListener("click", () =>{
        favsModal.classList.add("hidden");
    });

}

function saveFavs(){
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function updateFavorites(){
    renderFavorites();
    checkEmptyFavs();
    setupFavsEvents();
}
saveFavs();
updateFavorites();
