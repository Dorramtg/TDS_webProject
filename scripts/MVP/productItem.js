import { globalUser, selectedProduct } from './../sharedService.js';
import { shopItemModel, shopItemPresenter, shopItemView } from './shopItem.js';
//MVP 
var productItemModel = /** @class */ (function () {
    //data 
    function productItemModel(_id, _productName, _price, _description, _quantity, _category, _img) {
        if (_id === void 0) { _id = 0; }
        if (_productName === void 0) { _productName = ""; }
        if (_price === void 0) { _price = 0; }
        if (_description === void 0) { _description = ""; }
        if (_quantity === void 0) { _quantity = 0; }
        if (_category === void 0) { _category = ""; }
        if (_img === void 0) { _img = ""; }
        this._id = _id;
        this._productName = _productName;
        this._price = _price;
        this._description = _description;
        this._quantity = _quantity;
        this._category = _category;
        this._img = _img;
    }
    //getters 
    productItemModel.prototype.getId = function () { return this._id; };
    productItemModel.prototype.getProductName = function () { return this._productName; };
    productItemModel.prototype.getDescription = function () { return this._description; };
    productItemModel.prototype.getPrice = function () { return this._price; };
    productItemModel.prototype.getQuantity = function () { return this._quantity; };
    productItemModel.prototype.getCategory = function () { return this._category; };
    productItemModel.prototype.getImg = function () { return this._img; };
    //setters
    productItemModel.prototype.setId = function (_id) { this._id = _id; };
    productItemModel.prototype.setProductName = function (_productName) { this._productName = _productName; };
    productItemModel.prototype.setDescription = function (_description) { this._description = _description; };
    productItemModel.prototype.setPrice = function (_price) { this._price = _price; };
    productItemModel.prototype.setQuantity = function (_quantity) { this._quantity = _quantity; };
    productItemModel.prototype.setCategory = function (_category) { this._category = _category; };
    productItemModel.prototype.setImg = function (_img) { this._img = _img; };
    return productItemModel;
}());
export { productItemModel };
var productItemView = /** @class */ (function () {
    //html view + interaction of the user
    function productItemView() {
    }
    productItemView.prototype.getHtml = function () { return this.html; };
    productItemView.prototype.setModel = function (_model) {
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
        var rowImgDescr = document.createElement("div");
        rowImgDescr.setAttribute("class", "rowImgDescr");
        var imgImg = document.createElement("img");
        imgImg.setAttribute("src", _model.getImg());
        imgImg.setAttribute("class", "imgImg");
        var descriptionH2 = document.createElement("h2");
        descriptionH2.setAttribute("class", "descriptionH2");
        descriptionH2.innerHTML = _model.getDescription();
        rowImgDescr.append(imgImg, descriptionH2);
        var rowPriceBtns = document.createElement("div");
        rowPriceBtns.setAttribute("class", "rowPriceBtns");
        this.detailsBtn = document.createElement("button");
        this.detailsBtn.setAttribute("class", "detailsBtn");
        this.detailsBtn.innerHTML = "Details";
        this.addToCartBtn = document.createElement("button");
        this.addToCartBtn.setAttribute("class", "addToCartBtn");
        this.addToCartBtn.innerHTML = "Add to cart";
        var priceH2 = document.createElement("h2");
        priceH2.setAttribute("class", "priceH2");
        priceH2.innerHTML = _model.getPrice().toString() + "$";
        rowPriceBtns.append(priceH2, this.detailsBtn, this.addToCartBtn);
        this.html.append(productH1, rowImgDescr, rowPriceBtns);
    };
    productItemView.prototype.addAddToCartBtnHandler = function (handler) {
        this.addToCartBtn.addEventListener('click', handler);
    };
    productItemView.prototype.addDetailsBtnHandler = function (handler) {
        this.detailsBtn.addEventListener('click', handler);
    };
    return productItemView;
}());
export { productItemView };
var productItemPresenter = /** @class */ (function () {
    function productItemPresenter(_view, _model) {
        this._view = _view;
        this._model = _model;
        _view.setModel(_model);
        _view.addAddToCartBtnHandler(function () {
            if (globalUser.getShopListP().getModel().getShopList()[_model.getId()] == undefined) {
                var shopItemP = new shopItemPresenter(new shopItemView(), new shopItemModel(_model.getId(), _model.getProductName(), _model.getPrice(), _model.getDescription(), 1, _model.getCategory(), _model.getImg()));
                globalUser.getShopListP().getModel().addToShopList(shopItemP);
                globalUser.getShopListP().updateView();
                document.getElementById("shopList").append(globalUser.getShopListP().getView().getHtml());
                this.innerHTML = "alreadyAdded";
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
            };
            selectedProduct.updateModal();
        });
    }
    productItemPresenter.prototype.getView = function () { return this._view; };
    ;
    productItemPresenter.prototype.getModel = function () { return this._model; };
    return productItemPresenter;
}());
export { productItemPresenter };
