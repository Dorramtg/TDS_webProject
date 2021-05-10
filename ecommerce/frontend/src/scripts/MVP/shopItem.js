import { user } from './../sharedService.js';
//MVP 
var shopItemModel = /** @class */ (function () {
    function shopItemModel(_id, _productName, _price, _description, _quantity, _category, _img) {
        this._id = _id;
        this._productName = _productName;
        this._price = _price;
        this._description = _description;
        this._quantity = _quantity;
        this._category = _category;
        this._img = _img;
        this._totalPrice = this._quantity * this._price;
        user.getShopListP().getModel().setTotalPrice(user.getShopListP().getModel().getTotalPrice() + this._totalPrice);
    }
    //getters 
    shopItemModel.prototype.getId = function () { return this._id; };
    shopItemModel.prototype.getProductName = function () { return this._productName; };
    shopItemModel.prototype.getDescription = function () { return this._description; };
    shopItemModel.prototype.getPrice = function () { return this._price; };
    shopItemModel.prototype.getTotalPrice = function () { return this._totalPrice; };
    shopItemModel.prototype.getQuantity = function () { return this._quantity; };
    shopItemModel.prototype.getCategory = function () { return this._category; };
    shopItemModel.prototype.getImg = function () { return this._img; };
    //setters
    shopItemModel.prototype.setId = function (_id) { this._id = _id; };
    shopItemModel.prototype.setProductName = function (_productName) { this._productName = _productName; };
    shopItemModel.prototype.setDescription = function (_description) { this._description = _description; };
    shopItemModel.prototype.setPrice = function (_price) { this._price = _price; };
    shopItemModel.prototype.setTotalPrice = function (_totalPrice) { this._totalPrice = _totalPrice; };
    shopItemModel.prototype.setQuantity = function (_quantity) { this._quantity = _quantity; };
    shopItemModel.prototype.setCategory = function (_category) { this._category = _category; };
    shopItemModel.prototype.setImg = function (_img) { this._img = _img; };
    return shopItemModel;
}());
export { shopItemModel };
var shopItemView = /** @class */ (function () {
    //html view + interaction of the user
    function shopItemView() {
    }
    shopItemView.prototype.getHtml = function () { return this.html; };
    shopItemView.prototype.getPriceTd = function () { return this.priceTd; };
    shopItemView.prototype.getQuantityInput = function () { return this.quantityInput; };
    shopItemView.prototype.setPriceTd = function (value) { this.priceTd = value; };
    shopItemView.prototype.setQuantityInput = function (value) { this.quantityInput.value = value; };
    shopItemView.prototype.setModel = function (_model) {
        /*
        <tr>
            <td>Actions</td>
            <td>Product</td>
            <td>price</td>
            <td>img</td>
            <td>quantity</td>
        <tr>
        */
        this.html = document.createElement("tr");
        var actionsTd = document.createElement("td");
        actionsTd.setAttribute("class", "actionsTd");
        this.removeBtn = document.createElement("button");
        this.removeBtn.innerHTML = "X";
        this.removeBtn.setAttribute("class", "removeItemBtn");
        actionsTd.appendChild(this.removeBtn);
        var productTd = document.createElement("td");
        productTd.setAttribute("class", "productTd");
        productTd.innerHTML = _model.getProductName().slice(0, 10);
        this.priceTd = document.createElement("td");
        this.priceTd.setAttribute("class", "priceTd");
        this.priceTd.innerHTML = _model.getTotalPrice().toFixed(2).toString() + "$";
        var imgTd = document.createElement("td");
        var imgImg = document.createElement("img");
        imgTd.setAttribute("class", "imgTd");
        imgImg.setAttribute("src", _model.getImg());
        imgImg.setAttribute("class", "imgImg");
        imgTd.appendChild(imgImg);
        var quantityTd = document.createElement("td");
        quantityTd.setAttribute("class", "quantityTd");
        this.quantityInput = document.createElement("input");
        this.quantityInput.value = _model.getQuantity();
        this.quantityInput.setAttribute("type", "number");
        this.quantityInput.setAttribute("class", "quantityInput");
        this.quantityInput.setAttribute("min", "0");
        quantityTd.append(this.quantityInput);
        this.html.append(actionsTd, productTd, imgTd, quantityTd, this.priceTd);
    };
    shopItemView.prototype.addRemoveBtnHandler = function (handler) {
        this.removeBtn.addEventListener('click', handler);
    };
    shopItemView.prototype.addQuantityInputHandler = function (handler) {
        this.quantityInput.addEventListener('input', handler);
    };
    return shopItemView;
}());
export { shopItemView };
var shopItemPresenter = /** @class */ (function () {
    function shopItemPresenter(_view, _model) {
        this._view = _view;
        this._model = _model;
        _view.setModel(_model);
        var shopItem = this;
        _view.addRemoveBtnHandler(function () {
            user.getShopListP().getModel().reduceTotalPrice(_model.getTotalPrice());
            user.getShopListP().getModel().removeFromShopList(shopItem);
            user.getShopListP().getView().getTotalTd().innerHTML = "Total Price " + user.getShopListP().getModel().getTotalPrice().toFixed(2) + "$";
            _view.getHtml().remove();
        });
        _view.addQuantityInputHandler(function () {
            user.getShopListP().getModel().reduceTotalPrice(_model.getTotalPrice());
            _model.setTotalPrice(_model.getPrice() * _view.getQuantityInput().value);
            user.getShopListP().getModel().addToTotalPrice(_model.getTotalPrice());
            _view.getPriceTd().innerHTML = (_model.getTotalPrice()).toFixed(2).toString() + "$";
            user.getShopListP().getView().getTotalTd().innerHTML = "Total Price " + user.getShopListP().getModel().getTotalPrice().toFixed(2) + "$";
        });
    }
    shopItemPresenter.prototype.getView = function () { return this._view; };
    ;
    shopItemPresenter.prototype.getModel = function () { return this._model; };
    return shopItemPresenter;
}());
export { shopItemPresenter };
