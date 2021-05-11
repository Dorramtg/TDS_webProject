import { globalUser } from './sharedService.js';
import { shopItemModel, shopItemPresenter, shopItemView } from "./MVP/shopItem.js" 
import { productItemModel, productItemPresenter, productItemView } from './MVP/productItem.js';

//* Defining how the Single page application should behave 
//* and initializing the event listeners for all the buttons etc
function SignIn() {
    var email = (<HTMLInputElement>document.getElementById("logInEmailInput")).value;
    var password = (<HTMLInputElement>document.getElementById("logInPasswordInput")).value;
    if (email == "achraf.affes@supcom.tn" && password == "test513") {
        console.log(email + " " + password)
        document.getElementById("SignIn").hidden = true;
        document.getElementById("HomeScreen").hidden = false;
        document.getElementById("navBar").hidden = false;
    }
}

function SignOut() { 
    document.getElementById("productsList").hidden = true;
    document.getElementById("SignIn").hidden = false;
    document.getElementById("shopList").hidden = true;
    document.getElementById("HomeScreen").hidden = true;
    document.getElementById("navBar").hidden = true; 
}

function goToShopList(){ 
    document.getElementById("shopList").hidden = false;
    document.getElementById("productsList").hidden = true;
    document.getElementById("HomeScreen").hidden = true; 
    window.scrollTo(0,0);
}

function goToHome() { 
    document.getElementById("shopList").hidden = true; 
    document.getElementById("productsList").hidden = true;
    document.getElementById("HomeScreen").hidden = false;
    window.scrollTo(0,0);
}

function goToSignUp() {
    document.getElementById("SignIn").hidden = true;
    document.getElementById("SignUp").hidden = false;
}

function goToSignIn() {
    document.getElementById("SignUp").hidden = true;
    document.getElementById("SignIn").hidden = false;
}

function goToStartShopping(){
    document.getElementById("productsList").hidden = false;
    document.getElementById("HomeScreen").hidden = true;
}

document.getElementById("SignInButton").addEventListener('click', SignIn);
document.getElementById("SignOutButton").addEventListener('click', SignOut);
document.getElementById("goToSignIn").addEventListener('click', goToSignIn);
document.getElementById("goToSignUp").addEventListener('click', goToSignUp);
document.getElementById("goToHome").addEventListener('click', goToHome);
document.getElementById("goToMyShopList").addEventListener('click', goToShopList);
document.getElementById("startShoppingBtn").addEventListener('click', goToStartShopping);


//* fetching data from a fake API and calling the appendData function to
//* append my cart list.

function appendData(table){
    for (let index = 0; index < table.length; index++) {
        const element = table[index];
        var productItemP = new productItemPresenter(new productItemView(), new productItemModel(
                element.id, element.title ,element.price, element.description,4, element.category, element.image
            )
        )
       document.getElementById("productsList").append(productItemP.getView().getHtml());  
    } 
}

fetch('https://fakestoreapi.com/products?limit=14')
    .then(res => res.json())
    .then((json) =>{
        appendData(json);  
        console.log(globalUser.getShopListP().getModel().getTotalPrice())
    }
);
