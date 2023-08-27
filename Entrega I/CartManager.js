import fs from 'fs';
import ProductManager from './ProductManager.js';

const productos = new ProductManager();

//const fs = require('fs'); //Definimos modulo de file system
const archivo = './src/cart_file.txt'; //definimos nombre y ruta del archivo

class CartManager {
  //declaramos propiedades de la clase 
  products = [];
  static idcart = 0; //variable estatica id del producto


  constructor() { //constructor con elemento product arreglo vacio
    this.carts = []; //definimos arreglo vacio que guardara productos
    this.path = archivo;
  }

  //Funcion para agregar productos
  async createCart() {

    const quantity = 1;
    let idObject = "";
    const listaVacia = [];

    const newCart = {
      productos: this.products,
      idcart: CartManager.idcart++
    }; //instanciamos objeto con propiedades que recibira del nuevo producto

    const prodObject = []; //crea lista vacia para agregar nuevo producto

    try {
      if (!fs.existsSync(archivo)) { //verifica que el archivo exista


        newCart.productos = prodObject;

        listaVacia.push(newCart); //agrega nuevo producto a objeto newproduct

        await fs.promises.writeFile( //crea el archivo
          archivo,
          JSON.stringify(listaVacia, null, '\t') //agrega con un string lista de nuevo producto
        );
      } else {

        const contenidoObj = await this.consultarProducto(); //si existe el archivo llama función consultarProducto que trae contenido del archivo

        newCart.productos = prodObject;

        //listaVacia.push(newCart);

        contenidoObj.push(newCart); //agrega newProduct a contenidoObj
        await fs.promises.writeFile(
          archivo,
          JSON.stringify(contenidoObj, null, '\t') //escribe en el archivo nuevo producto tipo string
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async consultarProducto() { //funcion que extrae contenido del archiva cada vez que se requiera
    const contenido = await fs.promises.readFile(archivo, 'utf-8');
    const contenidoObj = JSON.parse(contenido);
    return contenidoObj;
  }

  async readProducts() {
    const answer = await fs.promises.readFile(this.path, "utf-8");
    const ObjectAnswer = answer == '' ? [] : JSON.parse(answer);
    return ObjectAnswer;
  }

  async writeFile(allProducts) {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(allProducts, null, '\t'))

  }

  async getcartByID(idfind) { //busqueda de productos por ID

    try {
      if (!fs.existsSync(archivo)) { //valida que exista el archivo
        return console.log("El archivo no existe");
      } else {
        const contenidoObj = await this.consultarProducto(); //se trae contenido del archivo

        if (contenidoObj.find((carrito) => carrito.idcart === idfind)) { //busca el ID del producto en el contenido
          const carro = contenidoObj.find((carrito) => carrito.idcart === idfind);
          return carro.productos;

        } else {
          return "Not found"; //mensaje si no consigue el producto
        }

      }
    } catch (error) {
      console.log(error);
    }

  }


  async addproductCart(idcar, idprod) { //busqueda de productos por ID

    //const prodid = await productos.getproductByID(idprod);
    //const prodid2 = prodid.id;
    const quantity = 1;
    let idObject = 0;

    const prodObject = {
      idObject,
      quantity
    };
    const carroproductos = [];
    const carroproductos2 = [];
    //const productfound = []; 

    try {
      if (!fs.existsSync(archivo)) { //valida que exista el archivo
        return console.log("El archivo no existe");
      } else {
        
        const contenidoObj = await this.consultarProducto(); //se trae contenido del archivo

        if (contenidoObj.find((carrito) => carrito.idcart === idcar)) { //busca el ID del producto en el contenido
          const carro = contenidoObj.find((carrito) => carrito.idcart === idcar);

          //carroproductos2.push(carro.productos);

          const found = carro.productos; 

          console.log(found);

          console.log("Encontre carrito");

          //prodObject.idObject = idprod;
          //const carro = contenidoObj.find((carrito) => carrito.idcart === idcar);
          //carroproductos.push(prodObject);
          //carro.productos = carroproductos;

          //await fs.promises.writeFile(
          //  archivo,
          //  JSON.stringify(contenidoObj, null, '\t') //escribe en el archivo nuevo producto tipo string
          //);

          //console.log(carro.productos);
          //const idproductos = carro.productos;

          console.log(typeof(found));

          //carroproductos2.push(found);

          console.log(carroproductos2); 

          
          const productfound = found.find((productocarrito) => productocarrito.idObject === idprod);
          
          console.log(productfound); 
          //-------------------------------//
          if (productfound) {

            console.log("Encontre producto");

            //productfound = carroproductos2.find((productocarrito) => productocarrito.idObject === idprod);
            productfound.quantity = productfound.quantity + 1;

            carro.productos = found;

            await fs.promises.writeFile(
              archivo,
              JSON.stringify(contenidoObj, null, '\t') //escribe en el archivo nuevo producto tipo string
            );



          } else {
            //prodObject.idObject = idprod;
            //const carro = contenidoObj.find((carrito) => carrito.idcart === idcar);
            //prodObject = carro.productos;

            console.log("No lo encontre producto");

            const carro = contenidoObj.find((carrito) => carrito.idcart === idcar);
            
            const filtered_carro = carro.productos.filter(item => item.idObject !== idprod);
            
            //carroproductos.push(carro.productos);

            console.log(filtered_carro);

            prodObject.idObject = idprod;
            //const carro = contenidoObj.find((carrito) => carrito.idcart === idcar);
            filtered_carro.push(prodObject);

            console.log(filtered_carro);
            carro.productos = filtered_carro;
            //carro.productos = carroproductos;

            await fs.promises.writeFile(
              archivo,
              JSON.stringify(contenidoObj, null, '\t') //escribe en el archivo nuevo producto tipo string
            );

            //console.log(carro.productos);
            //const idproductos = carro.productos; 
            //await fs.promises.writeFile(
             // archivo,
              //JSON.stringify(contenidoObj, null, '\t') //escribe en el archivo nuevo producto tipo string
           // );

          }

          // listaVacia.push(newCart); carro.productos

          return; //carro.productos; 

        } else {
          return "Not found"; //mensaje si no consigue el producto
        }

      }
    } catch (error) {
      console.log(error);
    }

  }


}





//const productos = new ProductManager(); //instanciamos clase ProductManager

//productos.getProduct();

//const funcionAsync = async () => { //definimos funcición asincrona para la ejecución de cada metodo
//Descomente aquellos metodos que desea probar
//await productos.addProduct2( "Asus Laptop", "Asus TUF Gaming A15 2022 color gris", 100, "www.amazon.com/asus_tuf_a15", 100, 4); //agregamos primer producto
//await productos.addProduct2("Laptop HP", "HP Victus Gaming color negro", 800, "www.hplaptops.com/hp_victus", 101, 10); //agregamos segundo producto
//await productos.addProduct2("Laptop Acer", "Acer Pradator Gaming color blanco", 1000, "www.acerlaptops.com/hp_victus", 105, 18);
//console.log(await productos.getproductByID (1)); //llamamos metodo para buscar producto por ID
//productos.getProduct(); //retorna contenido del file que resguarda lista de productos
//await productos.updateproductByID(1, "Laptop Canaimita", null, null, null, 200, 15); //modificamos datos de un producto por ID
//await productos.deleteproductByID(1); //borramos un producto de la lista segun su ID

//};

//funcionAsync(); //ejecutamos función asincrona 
export default CartManager;



