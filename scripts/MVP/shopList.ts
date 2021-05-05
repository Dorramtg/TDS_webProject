import { globalUser } from '../sharedService.js';
import { shopItemPresenter } from './shopItem.js';

export class ShopListModel {
    private shopList: { [id: number]: shopItemPresenter };
    private totalPrice: number;
    constructor() {
        this.shopList = {};
        this.totalPrice = 0;
    }
    getTotalPrice() { return this.totalPrice; };
    getShopList() { return this.shopList };

    setTotalPrice(totalPrice: number) { this.totalPrice = totalPrice; }
    dropShopList() {
        this.shopList = {};
    }
    addToShopList(shopItem: shopItemPresenter) {
        this.shopList[shopItem.getModel().getId()] = shopItem;
    }
    removeFromShopList(shopItem: shopItemPresenter) {
        delete this.shopList[shopItem.getModel().getId()];
    }

    reduceTotalPrice(price: number) {
        this.totalPrice -= price;
    }
    addToTotalPrice(price: number) {
        this.totalPrice += price;
    }
}

export class ShopListView {
    private html: any;
    private totalPricetxt_Td: any;
    getHtml() { return this.html }
    getTotalTd() { return this.totalPricetxt_Td }
    setModel(model: ShopListModel) {
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
            Object.keys(model.getShopList()).forEach(key => {
                table.append(model.getShopList()[key].getView().getHtml());
            });

            var totalTable = document.createElement("table");
            totalTable.setAttribute("id","totalPriceTable")
            var totalTr = document.createElement("tr");
            this.totalPricetxt_Td = document.createElement("td"); 
            this.totalPricetxt_Td.innerHTML = "Total Price "+ model.getTotalPrice().toFixed(2).toString()+"$";
            
            totalTr.append(this.totalPricetxt_Td)
            totalTable.appendChild(totalTr) 
            
            this.html.append(table, totalTable);
        }
    }
}

export class ShopListPresenter {
    private view: ShopListView;
    private model: ShopListModel;
    constructor() {
        this.view = new ShopListView();
        this.model = new ShopListModel();
        this.view.setModel(this.model);
    }
    getView() { return this.view }
    getModel() { return this.model }
    updateView() {
        this.view.setModel(this.model)
    }
}