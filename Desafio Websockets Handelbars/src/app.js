import express from 'express';

import productsRouter from './routes/productsRouter.js';
import productsRouterHandlebars from './routes/productsRouterHandlebars.js';
import realproductsRouterHandlebars from '../src/routes/realproductsRouterHandelbars.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';

import ProductManager from './routes/ProductManager.js';

const productos = new ProductManager();

const app = express();

const httpServer = app.listen(8080, () => console.log("Servidor corriendo!!"));
const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productsRouter); //endpoint para gestionar productos
app.use('/home/handlebars', productsRouterHandlebars); //endpoint para gestionar productos
//app.use('/home/realTim


app.use('/api/carts', cartsRouter); //endpoint para gestionar carritos 
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');


app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//////////////////////////////////////////////////
socketServer.on('connection', async socket => {
    console.log("Cliente nuevo conectado")
    const allproducts = await productos.getProducts(); 
    //console.log(response);
    socketServer.emit('prod', allproducts);
    socket.on('message', data => {
        console.log(data);
    })

    socket.on('sendNewProduct', async id => {
        console.log(id);
        const response = await productos.deleteproductByID(id);
        const allproducts = await productos.getProducts(); 
        console.log(response);
        socketServer.emit('prod', allproducts);
        //console.log(response);
        //socketServer.emit('prod', response);
        //res.render('realTimeProducts', {products:response})

    })

    socket.on('sendNewProduct2', async add => {
        console.log(add);
        console.log(typeof(add));
        const title = add.title; 
        const description = add.description; 
        const price = add.price; 
        const thumbnail = add.thumbnail; 
        const code = add.code; 
        const stock = add.stock; 
        const status = add.status; 
        const category = add.category;

        const response = await  productos.addProduct2(title, description, price, thumbnail, code, stock, status, category);
        const allproducts = await productos.getProducts(); 
        console.log(response);
        socketServer.emit('prod', allproducts);
        //res.render('realTimeProducts', {products:response})

    })

    //app.use('/home/realTimeProducts', realproductsRouterHandlebars);

    socket.emit('dataserver', "Hola soy el servidor")

});



app.use('/home/realTimeProducts', realproductsRouterHandlebars);
//app.use('/home/realTimeProducts2', realproductsRouterHandlebars2);
//////////////////////////////////////////////////

app.get('/handlebars', async (req, res) => {

    let TestUser = {
        name: "David",
        lastname: "Ferere"
    }
    //const prod = req.body; 

    //console.log(prod.title); 

    //await carts.createCart();

    res.render('index', TestUser);
})

//document.getElementById("insult-button").addEventListener("click", async (e) => {
//  try {
//    let response = app.use('/api/products', productsRouter);
//  let data = await response.json();
//document.getElementById("insult").innerHTML = data.insult;
//} catch(e) {
//  console.log(e);
//alert("Request for new insult failed.")
//}
//});


app.get('/bienvenido', (req, res) => {
    res.send("Hola todos")
})

//app.listen(8080, ()  => console.log("Servidor corriendo!!"))
