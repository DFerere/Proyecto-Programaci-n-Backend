import { productsModel } from '../models/productsmodels.js';

class ProductManagerMongo {

    //Funcion para agregar productos
    async createproduct(title, description, price, thumbnail, code, stock, status, category) {


        const produ = await productsModel.create({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
        })

        console.log(produ); 

        return produ;
    }

    async getallProducts(){
        const getprod = await productsModel.find(); 
        return getprod; 
    }

}

export default ProductManagerMongo;



