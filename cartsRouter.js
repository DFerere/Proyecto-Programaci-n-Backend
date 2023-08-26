import { Router } from 'express';

import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';

const router = Router(); 

//const pm = require("./ProductManager.js");

//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

const carts = new CartManager(); 

router.post('/', async (req, res)  => {

    //const prod = req.body; 

    //console.log(prod.title); 
    
    await carts.createCart();

    res.status(200).send();
})

export default router; 