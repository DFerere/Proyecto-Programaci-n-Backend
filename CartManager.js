import fs from 'fs';
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

    const newCart = {
      productos : this.products,
      idcart : CartManager.idcart++
    }; //instanciamos objeto con propiedades que recibira del nuevo producto

    try {
      if (!fs.existsSync(archivo)) { //verifica que el archivo exista
        const listaVacia = []; //crea lista vacia para agregar nuevo producto
        listaVacia.push(newCart); //agrega nuevo producto a objeto newproduct

        await fs.promises.writeFile( //crea el archivo
          archivo,
          JSON.stringify(listaVacia, null, '\t') //agrega con un string lista de nuevo producto
        );
      } else {
        
        const contenidoObj = await this.consultarProducto(); //si existe el archivo llama función consultarProducto que trae contenido del archivo


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



