function loadAll(classes){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'products.json', true);
    
    xhr.onload = () => {
      products = JSON.parse(xhr.responseText);
      showAll(classes)
    };
    xhr.send();
}

function showAll(classes){
    let output = "";
    
         for(let item of products){

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


function loadSingle(id){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'products.json', true);
    
    xhr.onload = () => {
      products = JSON.parse(xhr.responseText);
      showProduct(products, id)
    };
    xhr.send();
}

function showProduct(products, id){

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




function showDropDown() {
    var node = document.getElementById('dropDown');
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