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
let x = document.getElementsByClassName('imageTextContainer');
  
for (i = 0; i < x.length; i++) { 
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display="none";
    }
    else {
        x[i].style.display="";          
    }
}
}