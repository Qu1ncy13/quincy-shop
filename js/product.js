const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const productPlace = document.querySelector(".product");

const product = products.find(item => item.id === id);

function renderProductPage(){
    let productPage = "";
    let specsHTML = "";
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

                <div class="price-wrapper">
                    <p class="price">$ ${product.price}</p>
                    <button class="btn" style="font-size: 18px; padding: 15px 100px;"> В корзину</button>
                            
                </div>
                <div class="description"> 
                    <p>${product.description}</p>
                </div>
                <div class="chars">
                    <h3> Характеристики</h3>
                    <ul>
                        ${specsHTML};
                    </ul>
                </div>   
            </div>
        </div>
    </div>    
    `
    productPlace.innerHTML = productPage;
}
renderProductPage();
