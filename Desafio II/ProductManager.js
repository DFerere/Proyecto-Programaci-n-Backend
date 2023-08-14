const fs = require('fs'); //Definimos modulo de file system
const archivo = './new_file.txt'; //definimos nombre y ruta del archivo

class ProductManager {
    //declaramos propiedades de la clase 
    title;
    description;
    price;
    thumbnail;
    code;
    stock;
    static id = 0; //variable estatica id del producto


    constructor() { //constructor con elemento product arreglo vacio
        this.products = []; //definimos arreglo vacio que guardara productos
        this.path;
    }

    //Funcion para agregar productos
    async addProduct2(title, description, price, thumbnail, code, stock) {
        
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id++
        }; //instanciamos objeto con propiedades que recibira del nuevo producto
    
        try {
          if (!fs.existsSync(archivo)) { //verifica que el archivo exista
            const listaVacia = []; //crea lista vacia para agregar nuevo producto
            listaVacia.push(newProduct); //agrega nuevo producto a objeto newproduct
    
            await fs.promises.writeFile( //crea el archivo
              archivo,
              JSON.stringify(listaVacia, null, '\t') //agrega con un string lista de nuevo producto
            );
          } else {
            const contenidoObj = await this.consultarProducto(); //si existe el archivo llama función consultarProducto que trae contenido del archivo

            const existingProduct = contenidoObj.find(prod => prod.code === code); //valida que el codigo del producto nuevo no exista 
            if (existingProduct) { //Valida que no existe previamente el mismo codigo
                console.log("Codigo de objeto ingresado ya existe");
                return;
            }

            for (const [key, value] of Object.entries(newProduct)) { //valida que los campos no sean vacios
                if (key !== 'id' && !value) {
                    console.log(`La propiedad '${key}' del objeto ingresado está vacía, verifique que todos los campos estén completados`);
                    return;
                }
            }

            contenidoObj.push(newProduct); //agrega newProduct a contenidoObj
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

    getProduct() { //metodo que retorno lista de productos en arreglo product
        fs.readFile('new_file.txt', 'utf8', function (err, data) {
            if (err) { //if en caso de que archivo no exista
                let string = JSON.stringify(this.products);
                fs.writeFileSync('new_file.txt', "[]", function (err) { //lo crea y guarda en objeto vacio tipo string
                    if (err) throw err;
                });



                fs.readFile('new_file.txt', 'utf8', function (err, data) { //lee la lista vacia y la devuelve en pantalla
                    if (err) {
                        console.log("error leyendo el archivo");

                    }
                    const objprod2 = JSON.parse(data);
                    return console.log(objprod2);
                }
                )
                return;

            }

            const objprod = JSON.parse(data == undefined? "[]":data); //de lo contrario (existe el archivo) solo convierte el contenido en objeto y lo devuelve
            return console.log(objprod);

        });

    }

    async getproductByID(idfind) { //busqueda de productos por ID

        try {
            if (!fs.existsSync(archivo)) { //valida que exista el archivo
              return console.log("El archivo no existe");
            } else {
              const contenidoObj = await this.consultarProducto(); //se trae contenido del archivo

              if (contenidoObj.find((produ) => produ.id === idfind)) { //busca el ID del producto en el contenido
                return contenidoObj.find((produ) => produ.id === idfind);
            } else {
                return "Not found"; //mensaje si no consigue el producto
            }

            }
          } catch (error) {
            console.log(error);
          }

    }

    async updateproductByID(idfind, title, description, price, thumbnail, code, stock) { //update de productos por ID

        const dateProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }; //definimos nuevo objeto vacio con propiedades del producto que posiblemente se modifiquen


        try {
            if (!fs.existsSync(archivo)) { //se valida que exista el archivo
              return console.log("El archivo no existe");
            } else {
              const contenidoObj = await this.consultarProducto(); //se trae contenido del archivo si existe

              if (contenidoObj.find((produ) => produ.id === idfind)) { //se busca el Id del producto ingresado
                
                const updatedprod = contenidoObj.find((produ) => produ.id === idfind); //se trae objeto del producto buscado

                for (const [key, value] of Object.entries(dateProduct)) { //valida que los campos ingresado no sean vacios
                    if (value) { //si no es vacio significa que el usuario envio un valor que desea modificar de una propiedad del producto
                        updatedprod[key] = value; 
                    }
                }

                contenidoObj.idfind = updatedprod; //el producto del ID ingresado se cambio por el producto modificado en el contenidoObj

                let contenidoObjstring = JSON.stringify(contenidoObj, null, '\t'); //se convierte contenidoObj a string

                fs.writeFileSync(archivo, contenidoObjstring, function (err) { //se agrega al archivo
                    if (err) throw err;
                    console.log('Producto modificado!');
                });


            } else {
                return "No consegui producto con ese ID"; //error se ID de producto ingresado no existe
            }

            }
          } catch (error) {
            console.log(error);
          }

    }

    async deleteproductByID(idfind) { //metodo para eliminar productos por ID
        const product = await this.consultarProducto(); //trae contenido del archivo
        const productSinId = product.filter((prod) => prod.id != idfind); //filtra producto con el ID ingresado
        await fs.promises.writeFile(
            archivo,
            JSON.stringify(productSinId, null, '\t') //escribe objeto sin producto del ID ingresado en el archivo en formato string
            );
        
        }

    }



const productos = new ProductManager(); //instanciamos clase ProductManager

const funcionAsync = async () => { //definimos funcición asincrona para la ejecución de cada metodo
  //Descomente aquellos metodos que desea probar
    //await productos.addProduct2( "Asus Laptop", "Asus TUF Gaming A15 2022 color gris", 100, "www.amazon.com/asus_tuf_a15", 100, 4); //agregamos primer producto
    //await productos.addProduct2("Laptop HP", "HP Victus Gaming color negro", 800, "www.hplaptops.com/hp_victus", 101, 10); //agregamos segundo producto
    //await productos.addProduct2("Laptop Acer", "Acer Pradator Gaming color blanco", 1000, "www.acerlaptops.com/hp_victus", 105, 18);
    //console.log(await productos.getproductByID (1)); //llamamos metodo para buscar producto por ID
    //productos.getProduct(); //retorna contenido del file que resguarda lista de productos
    //await productos.updateproductByID(1, "Laptop Canaimita", null, null, null, 200, 15); //modificamos datos de un producto por ID
    //await productos.deleteproductByID(1); //borramos un producto de la lista segun su ID

 };

funcionAsync(); //ejecutamos función asincrona 



