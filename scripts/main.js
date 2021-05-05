import { user } from './sharedService.js';
import { shopItemModel, shopItemPresenter, shopItemView } from "./MVP/shopItem.js";
function SignIn() {
    var email = document.getElementById("logInEmailInput").value;
    var password = document.getElementById("logInPasswordInput").value;
    if (email == "achraf.affes@supcom.tn" && password == "test513") {
        console.log(email + " " + password);
        document.getElementById("SignIn").hidden = true;
        document.getElementById("HomeScreen").hidden = false;
        document.getElementById("navBar").hidden = false;
    }
}
function SignOut() {
    document.getElementById("SignIn").hidden = false;
    document.getElementById("shopList").hidden = true;
    document.getElementById("HomeScreen").hidden = true;
    document.getElementById("navBar").hidden = true;
}
function goToShopList() {
    document.getElementById("shopList").hidden = false;
    document.getElementById("HomeScreen").hidden = true;
    window.scrollTo(0, 0);
}
function goToHome() {
    document.getElementById("shopList").hidden = true;
    document.getElementById("HomeScreen").hidden = false;
    window.scrollTo(0, 0);
}
function goToSignUp() {
    document.getElementById("SignIn").hidden = true;
    document.getElementById("SignUp").hidden = false;
}
function goToSignIn() {
    document.getElementById("SignUp").hidden = true;
    document.getElementById("SignIn").hidden = false;
}
function appendData(table) {
    for (var index = 0; index < table.length; index++) {
        var element = table[index];
        var itemP = new shopItemPresenter(new shopItemView(), new shopItemModel(element.id, element.title, element.price, element.description, 4, element.category, element.image));
        user.getShopListP().getModel().addToShopList(itemP);
        user.getShopListP().updateView();
        document.getElementById("shopList").append(user.getShopListP().getView().getHtml());
    }
}
document.getElementById("SignInButton").addEventListener('click', SignIn);
document.getElementById("SignOutButton").addEventListener('click', SignOut);
document.getElementById("goToSignIn").addEventListener('click', goToSignIn);
document.getElementById("goToSignUp").addEventListener('click', goToSignUp);
document.getElementById("goToHome").addEventListener('click', goToHome);
document.getElementById("goToMyShopList").addEventListener('click', goToShopList);
fetch('https://fakestoreapi.com/products?limit=5')
    .then(function (res) { return res.json(); })
    .then(function (json) {
    appendData(json);
    console.log(user.getShopListP().getModel().getTotalPrice());
});
