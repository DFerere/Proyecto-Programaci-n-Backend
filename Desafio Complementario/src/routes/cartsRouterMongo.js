import { Router } from 'express';

import CartManagerMongo from '../dao/mongo/cartsManagerMongo.js';

const router = Router(); 

//const pm = require("./ProductManager.js");

//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

const productosMongo = new CartManagerMongo(); 

router.get("/",  async (req, res) => {
    res.render("realTimeProducts", {
    })
})

export default router;