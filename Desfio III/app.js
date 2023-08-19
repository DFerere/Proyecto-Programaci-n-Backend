const express = require('express'); 
const pm = require("./ProductManager.js");

const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productos = new pm(); 

app.get('/products', async (req, res)  => {

    var limit = req.query.limit;
    parseInt(limit);
    const response = await productos.getProducts();

    if(limit === undefined){
        return res.send(response)
    }

    const slicedArray = response.slice(0, limit);

    res.send(slicedArray)
})

app.get('/products/:pid', async (req, res)  => {

    var pid = parseInt(req.params.pid);
    
    const response = await productos.getproductByID(pid);

    res.send(response)
})



app.get('/bienvenido', (req, res)  => {
    res.send("Hola todos")
})

app.listen(8080, ()  => console.log("Servidor corriendo!!"))
