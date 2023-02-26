
//Sätter variabler till classser och ID i html dokumentet så att de går att ha som destination för funktioner.
const cartContainer = document.querySelector('.cart-container');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;


function eventListeners(){

    // Visar eller döljer kundvagnen genom att lägga till klassen med display:block;
    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    // Väntar på att man trycker på knappen för att lägga till en produkt. Då körs funktionen purchaseProduct.
    productList.addEventListener('click', purchaseProduct);

    // Väntar på att man trycker på knappen för att ta bort en produkt. Då körs funktionen deleteProduct.
    cartList.addEventListener('click', deleteProduct);

    // Väntar på att man trycker på knappen för checkout. Då körs funktionen checkoutFunc.
    checkout.addEventListener('click', checkoutFunc)
}

// Ger en notis till användaren att dess beställning blivit mottagen.
function checkoutFunc(){
    alert("Your order has been recieved! Thank you come again.");
}

// Uppdaterar informationen i kundvagnen genom att sätta html klasserna och ID till variabler som uppdaterats i en annan funktion.
function updateCartInfo(){
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
}

// Ifall man trycker på knappen för att lägga till en produkt kommer variabeln product ihåg vilken produkt de tvar som lades till. Sedan körs funktionen getProductInfo
function purchaseProduct(e){
    if(e.target.classList.contains('add-to-cart-btn')){
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

// Informationen om produkten sparas i variablen productInfo. Detta görs genom att ta informationen som finns i html klasserna i produkten.
// Sedan körs funktionerna addToCartList och saveProductInStorage
function getProductInfo(product){
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.productList img').src,
        name: product.querySelector('.title').textContent,
        category: product.querySelector('.brand').textContent,
        price: product.querySelector('.price').textContent
    }
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

// Skapar en div där produkten läggs till med hjälp av informationen sparad i productInfo.
function addToCartList(product){
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
        <img src = "${product.imgSrc}" alt = "product image">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.name}</h3>
            <span class = "cart-item-category">${product.category}</span>
            <span class = "cart-item-price">${product.price}</span>
        </div>

        <button type = "button" class = "cart-item-del-btn">
            <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
    `;
    cartList.appendChild(cartItem);
}

// Lägger till produkten i en variabel products som sparar alla produkter man lagt till.
function saveProductInStorage(item){
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

// Hämtar alla information från products.
function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
}

// Lägger till alla produkter som finns i products i kundvagnen.
function loadCart(){
    let products = getProductFromStorage();
    if(products.length < 1){
        cartItemID = 1;
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
    }
    products.forEach(product => addToCartList(product));

    updateCartInfo();
}

// Räknar ut totala priset av alla varor i kundvagnen samt hur många varor som finnsi korgen.
function findCartInfo(){
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1));
        return acc += price;
    }, 0);

    return{
        total: total.toFixed(2),
        productCount: products.length
    }
}

// Tar bort en produkt ur kundvagnslistan
function deleteProduct(e){
    let cartItem;
    if(e.target.tagName === "BUTTON"){
        cartItem = e.target.parentElement;
        cartItem.remove(); // this removes from the DOM only
    } else if(e.target.tagName === "I"){
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove(); // this removes from the DOM only
    }

    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    updateCartInfo();
}