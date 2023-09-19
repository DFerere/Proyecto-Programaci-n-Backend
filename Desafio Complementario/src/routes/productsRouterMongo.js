import { Router } from 'express';

import ProductManagerMongo from '../dao/mongo/productsManagerMongo.js';

const router = Router(); 

//const pm = require("./ProductManager.js");

//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

const productosMongo = new ProductManagerMongo(); 

router.get("/",  async (req, res) => {
    res.render("realTimeProducts", {
    })
})

export default router; 