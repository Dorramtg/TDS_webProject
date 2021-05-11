import { globalUser, selectedProduct } from './../sharedService.js';
import { shopItemModel, shopItemPresenter, shopItemView } from './shopItem.js';
//MVP 

export class productItemModel {
    //data 
    constructor(private _id: number = 0,
        private _productName: string = "",
        private _price: number = 0,
        private _description: string = "",
        private _quantity: number = 0,
        private _category: string = "",
        private _img: string = "") {
    }
    //getters 
    getId() { return this._id }
    getProductName() { return this._productName }
    getDescription() { return this._description }
    getPrice() { return this._price }
    getQuantity() { return this._quantity }
    getCategory() { return this._category }
    getImg() { return this._img }
    //setters
    setId(_id: number) { this._id = _id }
    setProductName(_productName: string) { this._productName = _productName }
    setDescription(_description: string) { this._description = _description }
    setPrice(_price: number) { this._price = _price }
    setQuantity(_quantity: number) { this._quantity = _quantity }
    setCategory(_category: string) { this._category = _category }
    setImg(_img: string) { this._img = _img }
}

export class productItemView {
    private html: any;
    private detailsBtn: any;
    private addToCartBtn: any;

    //html view + interaction of the user
    constructor() { }
    getHtml() { return this.html; }

    setModel(_model: productItemModel) {
        /*
        <tr>
            <td>Actions</td> 
            <td>Product</td> 
            <td>price</td>
            <td>img</td> 
            <td>quantity</td>
        <tr> 
        */
        this.html = document.createElement("div");
        this.html.setAttribute("class", "productCard");

        var productH1 = document.createElement("h1");
        productH1.innerHTML = _model.getProductName().slice(0, 10);

        var rowImgDescr = document.createElement("div")
        rowImgDescr.setAttribute("class", "rowImgDescr");

        var imgImg = document.createElement("img");
        imgImg.setAttribute("src", _model.getImg());
        imgImg.setAttribute("class", "imgImg");

        var descriptionH2 = document.createElement("h2");
        descriptionH2.setAttribute("class", "descriptionH2");
        descriptionH2.innerHTML = _model.getDescription();

        rowImgDescr.append(imgImg, descriptionH2);

        var rowPriceBtns = document.createElement("div")
        rowPriceBtns.setAttribute("class", "rowPriceBtns");

        this.detailsBtn = document.createElement("button")
        this.detailsBtn.setAttribute("class", "detailsBtn");
        this.detailsBtn.innerHTML = "Details"

        this.addToCartBtn = document.createElement("button")
        this.addToCartBtn.setAttribute("class", "addToCartBtn");
        this.addToCartBtn.innerHTML = "Add to cart"

        var priceH2 = document.createElement("h2");
        priceH2.setAttribute("class", "priceH2");
        priceH2.innerHTML = _model.getPrice().toString() + "$";

        rowPriceBtns.append(priceH2, this.detailsBtn, this.addToCartBtn)
        this.html.append(productH1, rowImgDescr, rowPriceBtns);
    }
    addAddToCartBtnHandler(handler) {
        this.addToCartBtn.addEventListener('click', handler);
    }
    addDetailsBtnHandler(handler) {
        this.detailsBtn.addEventListener('click', handler);
    }
}


export class productItemPresenter {
    constructor(private _view: productItemView, private _model: productItemModel) {
        _view.setModel(_model);
        _view.addAddToCartBtnHandler(function () {
            if (globalUser.getShopListP().getModel().getShopList()[_model.getId()] == undefined) {
                var shopItemP = new shopItemPresenter(new shopItemView(), new shopItemModel(
                    _model.getId(), _model.getProductName(), _model.getPrice(),
                    _model.getDescription(), 1, _model.getCategory(), _model.getImg())
                )
                globalUser.getShopListP().getModel().addToShopList(shopItemP)
                globalUser.getShopListP().updateView();
                document.getElementById("shopList").append(globalUser.getShopListP().getView().getHtml());
                this.innerHTML = "alreadyAdded" 
                //TO-DO : swap to a remove button!
            }
        });
        _view.addDetailsBtnHandler(function () {
            selectedProduct._model = _model;
            var modal = document.getElementById("selectedProductModal");
            var span = document.getElementById("modalClose");
            modal.style.display = "block";
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            selectedProduct.updateModal();
        });
    }
    getView() { return this._view };
    getModel() { return this._model }
    // takes data from the model and updates the view
    // adds events handlers to the view 
    // update model

}
