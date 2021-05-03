async function getData(){
    let path = "./E-Commerce/assets/js/products.json"
    return await fetch(path)
        .then(response => {
            return response.json();
        })
        .catch( e=> {
            return e;
        });
}