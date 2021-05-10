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

//* Here we export the globalUser as a constant and we use it all screens
export const globalUser = User.getInstance()