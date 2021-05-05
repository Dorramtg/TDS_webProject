import { globalUser } from './../sharedService.js';
//MVP 

export class shopItemModel {
    //data
    private _totalPrice: number;
    constructor(private _id: number, private _productName: string,
        private _price: number, private _description: string, private _quantity: number,
        private _category: string, private _img: string) {
        this._totalPrice = this._quantity * this._price;
        globalUser.getShopListP().getModel().setTotalPrice(
            globalUser.getShopListP().getModel().getTotalPrice()+this._totalPrice
        );
    }
    //getters 
    getId() { return this._id }
    getProductName() { return this._productName }
    getDescription() { return this._description }
    getPrice() { return this._price }
    getTotalPrice() { return this._totalPrice }
    getQuantity() { return this._quantity }
    getCategory() { return this._category }
    getImg() { return this._img }
    //setters
    setId(_id: number) { this._id = _id }
    setProductName(_productName: string) { this._productName = _productName }
    setDescription(_description: string) { this._description = _description }
    setPrice(_price: number) { this._price = _price }
    setTotalPrice(_totalPrice: number) { this._totalPrice = _totalPrice }
    setQuantity(_quantity: number) { this._quantity = _quantity }
    setCategory(_category: string) { this._category = _category }
    setImg(_img: string) { this._img = _img }
}

export class shopItemView {
    private html: any;
    private removeBtn: any;
    private priceTd: any;
    private quantityInput: any;
    //html view + interaction of the user
    constructor() { }
    getHtml() { return this.html; }
    getPriceTd() { return this.priceTd; }
    getQuantityInput() { return this.quantityInput; }

    setPriceTd(value: string) { this.priceTd = value; }
    setQuantityInput(value: number) { this.quantityInput.value = value; }

    setModel(_model: shopItemModel) {
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
        productTd.innerHTML = _model.getProductName().slice(0,10);

        this.priceTd = document.createElement("td");
        this.priceTd.setAttribute("class", "priceTd");
        this.priceTd.innerHTML = _model.getTotalPrice().toFixed(2).toString()+"$";

        var imgTd = document.createElement("td");
        var imgImg = document.createElement("img");
        imgTd.setAttribute("class", "imgTd");
        imgImg.setAttribute("src", _model.getImg());
        imgImg.setAttribute("class", "imgImg");
        imgTd.appendChild(imgImg);

        var quantityTd = document.createElement("td");
        quantityTd.setAttribute("class", "quantityTd");
        this.quantityInput = document.createElement("input")
        this.quantityInput.value = _model.getQuantity();
        this.quantityInput.setAttribute("type", "number");
        this.quantityInput.setAttribute("class", "quantityInput")
        this.quantityInput.setAttribute("min", "0");
        quantityTd.append(this.quantityInput)

        this.html.append(actionsTd, productTd, imgTd, quantityTd, this.priceTd);
    }
    addRemoveBtnHandler(handler) {
        this.removeBtn.addEventListener('click', handler);
    }
    addQuantityInputHandler(handler) {
        this.quantityInput.addEventListener('input', handler);
    }
}


export class shopItemPresenter {
    constructor(private _view: shopItemView, private _model: shopItemModel) {
        _view.setModel(_model);
        var shopItem = this;
        _view.addRemoveBtnHandler(function () {
            globalUser.getShopListP().getModel().reduceTotalPrice(_model.getTotalPrice()); 
            globalUser.getShopListP().getModel().removeFromShopList(shopItem); 
            globalUser.getShopListP().getView().getTotalTd().innerHTML = "Total Price "+globalUser.getShopListP().getModel().getTotalPrice().toFixed(2)+"$"
            _view.getHtml().remove();
        })
        _view.addQuantityInputHandler(function () {
            globalUser.getShopListP().getModel().reduceTotalPrice(_model.getTotalPrice()); 
            _model.setTotalPrice(_model.getPrice() * _view.getQuantityInput().value)
            globalUser.getShopListP().getModel().addToTotalPrice(_model.getTotalPrice());
            _view.getPriceTd().innerHTML = (_model.getTotalPrice()).toFixed(2).toString()+"$";  
            globalUser.getShopListP().getView().getTotalTd().innerHTML = "Total Price "+globalUser.getShopListP().getModel().getTotalPrice().toFixed(2)+"$"
        })
    }
    getView() { return this._view };
    getModel() { return this._model }
    // takes data from the model and updates the view
    // adds events handlers to the view 
    // update model
}
