renderMenu()

if(!getFromLocalStorage("products")){
    getDataFromApi()
    .then((response) => {
        productsData = response.ProductCollection;
        sendtoLocalStorage("products", productsData);
        loadPageBasedOnURL()
    }).catch(() => {
        console.log("check your api url");
    })
} else {
    loadPageBasedOnURL()
}

updateMenuTotalPrice()

if(!getFromLocalStorage("cart")){
    sendtoLocalStorage("cart", [])
}

window.onhashchange = function() { 
    loadPageBasedOnURL()
}
