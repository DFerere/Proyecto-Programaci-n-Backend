import ProductManagerMongo from './productsManagerMongo.js';
const productos = new ProductManagerMongo(); //instanciamos clase que maneja productos
import { cartsModel } from '../models/cartsmodels.js';

class CartManagerMongo {

    async createcart(idProduct, quantity) {
        console.log(quantity);
        console.log(idProduct); 
        console.log("Creo carro"); 
        const cart = await cartsModel.create({
            idProduct, 
            quantity,
        }); 

        console.log(cart); 

        return cart;
    }


}


export default CartManagerMongo; //exportamos clase CartManagerMongo
