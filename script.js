let http = new XMLHttpRequest();
http.open('get', 'products.json', true);
http.send();

function loadAll(classes){
   if(http.readyState == 4 && http.status == 200){
      let products = JSON.parse(http.responseText);
      let output = "";
      

      for (let item of products) {
        let stars = "";
        for (let i = 0; i < item.rating; i++) {
            stars += '<i class="fa-solid fa-star"></i>';
        }
            output += `
               <a href="${item.href}">
                <div class="product">
                    <img src="${item.image}" alt="${item.description}">
                    <p class="title">${item.title}</p>
                    <p class="brand">${item.brand}</p>
                    <div class="priceContainer">
                    <p class="price">
                        <span>${item.price}</span>
                        <span>SEK</span>
                    </p>
                    <div id="star">
                    ${stars}
                    </div>
                    </div>
                </div>
               </a>
            `;
         };
         for (c in classes){
            document.querySelector(classes[c]).innerHTML = output;
         }
   }
} 


function loadSingle(id){
    if(http.readyState == 4 && http.status == 200){
       let products = JSON.parse(http.responseText);
       let output = "";


         for(let item of products){
            if (item.id == id){
                output += `
             
                    <div class="productContainer">
                        <div class="productInfoContainer">
                            <img src="${item.image}" alt="${item.description}">
                            <div class="productTextContainer">
                                <p class="title">${item.title}</p>
                                <p class="brand">${item.brand}</p>
                                <div class="ratingPriceContainer">
                                    <span id="star"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
                                    <span id="priceText">${item.price} <span>SEK</span></span>
                                </div>
                                <div class="formContainer">
                                <form>
                                    <select name="size" id="sizeForm">
                                        <option value="0">Select Size</option>
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                </form>
                                <input type="number" placeholder="1" min="1">
                                </div>
                                <a href="" class="addToCart"><div>Add To Cart</div></a>
                                </div>
                            </div>
                            <div id="productDescription">
                                <h2>Description</h2>
                                <p>${item.description}</p>
                            </div>
                        </div>
                    </div>
                `;
            };
            document.querySelector('#singleProduct').innerHTML = output;
        }
    }
 }




function showDropDown() {
    var node = document.getElementById('dropDown');
    if (node.style.visibility=='visible') {
        node.style.visibility = 'hidden';
    }
    else
        node.style.visibility = 'visible'
}

function showSearchOptions() {
    var node = document.getElementById('searchOptionsContainer');
    if (node.style.visibility=='visible') {
        node.style.visibility = 'hidden';
    }
    else
        node.style.visibility = 'visible'
}

function searchOne() {
let input = document.getElementById('searchBar').value
input=input.toLowerCase();
let x = document.getElementsByClassName('product');
  
for (i = 0; i < x.length; i++) { 
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display="none";
    }
    else {
        x[i].style.display="";          
    }
}
}

