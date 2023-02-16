let http = new XMLHttpRequest();
http.open('get', 'products.json', true);
http.send();
http.onload = function loadAll(){
   if(this.readyState == 4 && this.status == 200){
      let products = JSON.parse(this.responseText);
      let output = "";
      

        for(let item of products){
            output += `
               <div class="product">
                  <img src="${item.image}" alt="${item.description}">
                  <p class="title">${item.title}</p>
                  <p class="brand">${item.brand}</p>
                  <div class="priceContainer">
                   <p class="price">
                       <span>${item.price}</span>
                       <span>SEK</span>
                   </p>
                   <span id="star"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
                  </div>
               </div>
            `;
         }
;
      document.querySelector('.products1').innerHTML = output;
      document.querySelector('.products2').innerHTML = output;
      document.querySelector('.products3').innerHTML = output;

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