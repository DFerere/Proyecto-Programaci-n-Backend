import express from 'express'; 

import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';

const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productsRouter); //endpoint para gestionar productos

app.use('/api/carts', cartsRouter); //endpoint para gestionar carritos 


app.get('/bienvenido', (req, res)  => {
    res.send("Hola todos")
})

app.listen(8080, ()  => console.log("Servidor corriendo!!"))
