import { productItemModel } from './MVP/productItem.js';
import { ShopListPresenter } from './MVP/shopList.js'; 
//* The User class defines the `getInstance` method that lets clients access
//* the unique User instance. 
class User{
    private static instance: User; 
    //* The shopListP is a ShopListPresenter that containes a list of shopItemPresenters
    //* mapped using their own IDs, this makes the comminucation between the products 
    //* and myCart screens much easier
    private shopListP = new ShopListPresenter; 
    //* The User's constructor should always be private to prevent direct
    //* construction calls with the `new` operator. 
    private constructor(){
        
    }
    //* The static method that controls the access to the singleton instance. 
    //* This implementation let you subclass the Singleton class while keeping
    //* just one instance of each subclass around.
    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        } 
        return User.instance;
    }
    getShopListP(){return this.shopListP}
}
class selectedItem{
    html:any;
    modalContent:any;
    modal_closeBtn:any;
    modal_productName:any;
    modal_img:any;
    modal_description:any;
    modal_price:any;
    modal_feedBackDiv:any
    constructor(public _model:productItemModel){ 
        this.html = document.createElement("div");
        this.html.setAttribute("class","modal");
        this.html.setAttribute("id","selectedProductModal")

        this.modalContent = document.createElement("div");
        this.modalContent.setAttribute("class","modal-content");

        this.modal_closeBtn = document.createElement("span"); 
        this.modal_closeBtn.setAttribute("id","modalClose");
        this.modal_closeBtn.innerHTML = "&times";
        this.modal_closeBtn.onclick = function() {
            document.getElementById("selectedProductModal").style.display = "none"; 
        }
        this.modal_productName = document.createElement("h1");
        this.modal_productName.setAttribute("class","modal-ProductName");
        this.modal_productName.innerHTML = _model.getProductName();

        this.modal_img = document.createElement("img");
        this.modal_img.setAttribute("class","modal-Img");
        this.modal_img.setAttribute("src",_model.getImg()) ;

        
        this.modal_description = document.createElement("h1");
        this.modal_description.setAttribute("class","modal-Description");
        this.modal_description.innerHTML =  _model.getDescription();

        this.modal_price = document.createElement("h2");
        this.modal_price.setAttribute("class","modal-Price");
        this.modal_price.innerHTML= _model.getPrice().toString()+"$";

        var hr1 = document.createElement("hr");
        var hr2 = document.createElement("hr");

        this.modal_feedBackDiv = document.createElement("div");
        this.modal_feedBackDiv.setAttribute("id","modal-feedBackDiv");
        //TO-DO : add a new MVP element for feedbacks !
        //TO-DO : print all feedbacks here ! 
        this.modalContent.append(this.modal_closeBtn, this.modal_productName, hr1,this.modal_img,
            this.modal_description, this.modal_price,hr2,this.modal_feedBackDiv);
        this.html.appendChild(this.modalContent);
        document.body.appendChild(this.html);
        /*<div class="modal-content">
            <span class="close">&times;</span>
            <p>Some text in the Modal..</p>
        </div>*/
    }
    updateModal(){
        this.modal_productName.innerHTML = this._model.getProductName();
        this.modal_img.setAttribute("src",this._model.getImg()) ;
        this.modal_description.innerHTML =  this._model.getDescription();
        this.modal_price.innerHTML= "Price : " + this._model.getPrice().toString()+"$"; 
    }
}

//* Here we export the globalUser as a constant and we use it all screens
export const globalUser = User.getInstance();
export let selectedProduct = new selectedItem(new productItemModel());
