var ShopListModel = /** @class */ (function () {
    function ShopListModel() {
        this.shopList = {};
        this.totalPrice = 0;
    }
    ShopListModel.prototype.getTotalPrice = function () { return this.totalPrice; };
    ;
    ShopListModel.prototype.getShopList = function () { return this.shopList; };
    ;
    ShopListModel.prototype.setTotalPrice = function (totalPrice) { this.totalPrice = totalPrice; };
    ShopListModel.prototype.dropShopList = function () {
        this.shopList = {};
    };
    ShopListModel.prototype.addToShopList = function (shopItem) {
        this.shopList[shopItem.getModel().getId()] = shopItem;
    };
    ShopListModel.prototype.removeFromShopList = function (shopItem) {
        delete this.shopList[shopItem.getModel().getId()];
    };
    ShopListModel.prototype.reduceTotalPrice = function (price) {
        this.totalPrice -= price;
    };
    ShopListModel.prototype.addToTotalPrice = function (price) {
        this.totalPrice += price;
    };
    return ShopListModel;
}());
export { ShopListModel };
var ShopListView = /** @class */ (function () {
    function ShopListView() {
    }
    ShopListView.prototype.getHtml = function () { return this.html; };
    ShopListView.prototype.getTotalTd = function () { return this.totalPricetxt_Td; };
    ShopListView.prototype.setModel = function (model) {
        /*
        <table id="ShopListTable">
            <tr>
                <th></th>
                <th>Product</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </table>
        */
        if (this.html != null) {
            this.html.remove();
        }
        this.html = document.createElement("div");
        if (Object.keys(model.getShopList()).length != 0) {
            var table = document.createElement("table");
            table.setAttribute("id", "ShopListTable");
            var tr = document.createElement("tr");
            var emptyTh = document.createElement("th");
            var ProductTh = document.createElement("th");
            ProductTh.innerHTML = "Product";
            var ImageTh = document.createElement("th");
            ImageTh.innerHTML = "Image";
            var QuantityTh = document.createElement("th");
            QuantityTh.innerHTML = "Quantity";
            var PriceTh = document.createElement("th");
            PriceTh.innerHTML = "Price";
            tr.append(emptyTh, ProductTh, ImageTh, QuantityTh, PriceTh);
            table.appendChild(tr);
            Object.keys(model.getShopList()).forEach(function (key) {
                table.append(model.getShopList()[key].getView().getHtml());
            });
            var totalTable = document.createElement("table");
            totalTable.setAttribute("id", "totalPriceTable");
            var totalTr = document.createElement("tr");
            this.totalPricetxt_Td = document.createElement("td");
            this.totalPricetxt_Td.innerHTML = "Total Price " + model.getTotalPrice().toFixed(2).toString() + "$";
            totalTr.append(this.totalPricetxt_Td);
            totalTable.appendChild(totalTr);
            /*
            this.totalTd = document.createElement("h1");
            this.totalTd.innerHTML = model.getTotalPrice().toString();
            */
            this.html.append(table, totalTable);
        }
    };
    return ShopListView;
}());
export { ShopListView };
var ShopListPresenter = /** @class */ (function () {
    function ShopListPresenter() {
        this.view = new ShopListView();
        this.model = new ShopListModel();
        this.view.setModel(this.model);
    }
    ShopListPresenter.prototype.getView = function () { return this.view; };
    ShopListPresenter.prototype.getModel = function () { return this.model; };
    ShopListPresenter.prototype.updateView = function () {
        this.view.setModel(this.model);
    };
    return ShopListPresenter;
}());
export { ShopListPresenter };
