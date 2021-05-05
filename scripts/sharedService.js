import { ShopListPresenter } from './MVP/shopList.js';
//* The User class defines the `getInstance` method that lets clients access
//* the unique User instance. 
var User = /** @class */ (function () {
    //* The User's constructor should always be private to prevent direct
    //* construction calls with the `new` operator. 
    function User() {
        this.shopListP = new ShopListPresenter;
    }
    //* The static method that controls the access to the singleton instance. 
    //* This implementation let you subclass the Singleton class while keeping
    //* just one instance of each subclass around.
    User.getInstance = function () {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    };
    User.prototype.getShopListP = function () { return this.shopListP; };
    return User;
}());
export var user = User.getInstance();
