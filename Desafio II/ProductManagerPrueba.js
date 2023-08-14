const fs = require('fs');
const archivo = './new_file.txt';

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

    async addProduct2(title, description, price, thumbnail, code, stock) {
        
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id++
        };
    
        try {
          if (!fs.existsSync(archivo)) {
            const listaVacia = [];
            listaVacia.push(newProduct);
    
            await fs.promises.writeFile(
              archivo,
              JSON.stringify(listaVacia, null, '\t')
            );
          } else {
            const contenidoObj = await this.consultarProducto();

            const existingProduct = contenidoObj.find(prod => prod.code === code);
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

            contenidoObj.push(newProduct);
            await fs.promises.writeFile(
              archivo,
              JSON.stringify(contenidoObj, null, '\t')
            );
          }
        } catch (error) {
          console.log(error);
        }
      }

    async consultarProducto() {
        const contenido = await fs.promises.readFile(archivo, 'utf-8');
        const contenidoObj = JSON.parse(contenido);
        return contenidoObj;
      }

    getProduct() { //metodo que retorno lista de productos en arreglo product
        fs.readFile('new_file.txt', 'utf8', function (err, data) {
            if (err) {
                let string = JSON.stringify(this.products);
                fs.writeFileSync('new_file.txt', "[]", function (err) {
                    if (err) throw err;
                    //console.log('Producto guardado!');
                });



                fs.readFile('new_file.txt', 'utf8', function (err, data) {
                    if (err) {
                        console.log("error leyendo el archivo");

                    }
                    const objprod2 = JSON.parse(data);
                    return console.log(objprod2);
                }
                )
                return;

            }

            const objprod = JSON.parse(data == undefined? "[]":data);
            return console.log(objprod);

        });

    }

    async getproductByID(idfind) { //busqueda de productos por ID

        try {
            if (!fs.existsSync(archivo)) {
              return console.log("El archivo no existe");
            } else {
              const contenidoObj = await this.consultarProducto();

              if (contenidoObj.find((produ) => produ.id === idfind)) {
                return contenidoObj.find((produ) => produ.id === idfind);
            } else {
                return "Not found";
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
        };


        try {
            if (!fs.existsSync(archivo)) {
              return console.log("El archivo no existe");
            } else {
              const contenidoObj = await this.consultarProducto();

              if (contenidoObj.find((produ) => produ.id === idfind)) {
                
                const updatedprod = contenidoObj.find((produ) => produ.id === idfind);

                for (const [key, value] of Object.entries(dateProduct)) { //valida que los campos no sean vacios
                    if (value) {
                        updatedprod[key] = value; 
                        //console.log(`La propiedad '${key}' del objeto ingresado está vacía, verifique que todos los campos estén completados`);
                        //return;
                    }
                }

                contenidoObj.idfind = updatedprod;

                let contenidoObjstring = JSON.stringify(contenidoObj, null, '\t');

                fs.writeFileSync(archivo, contenidoObjstring, function (err) {
                    if (err) throw err;
                    console.log('Producto modificado!');
                });


            } else {
                return "No consegui producto con ese ID";
            }

            }
          } catch (error) {
            console.log(error);
          }

    }

    async deleteproductByID(idfind) { //update de productos por ID
        const product = await this.consultarProducto();
        const productSinId = product.filter((prod) => prod.id != idfind);
        await fs.promises.writeFile(
            archivo,
            JSON.stringify(productSinId, null, '\t')
            );
        
        }

    }



const productos = new ProductManager(); //instanciamos clase ProductManager

//const producto1 = productos.addProduct2( "Asus Laptop", "Asus TUF Gaming A15 2022 color gris", 100, "www.amazon.com/asus_tuf_a15", 100, 4); //agregamos primer producto
//const producto2 = productos.addProduct2("Laptop HP", "HP Victus Gaming color negro", 800, "www.hplaptops.com/hp_victus", 101, 10); //agregamos segundo producto
//const producto3 = productos.addProduct("Acer Gaming", "Acer Pradetor color metalico", 1500, "www.milpatop.com/acer/acer_prad", 102, 6); //agregamos tercer producto

//console.log("La lista de productos registrados es:"); 

//console.log(productos.getProduct()); //obtenemos lista de productos resgistrados anteriormente
//productos.getProduct();


//console.log("El producto retornado de busqueda por ID es el siguiente:");

const funcionAsync = async () => {
    //await productos.addProduct2( "Asus Laptop", "Asus TUF Gaming A15 2022 color gris", 100, "www.amazon.com/asus_tuf_a15", 100, 4); //agregamos primer producto
    //await productos.addProduct2("Laptop HP", "HP Victus Gaming color negro", 800, "www.hplaptops.com/hp_victus", 101, 10); //agregamos segundo producto
    //await productos.addProduct2("Laptop Acer", "Acer Pradator Gaming color blanco", 1000, "www.acerlaptops.com/hp_victus", 105, 18);
    //console.log(await productos.getproductByID (6));
    //productos.getProduct();
    //await productos.updateproductByID(1, "Laptop Canaimita", null, null, null, 200, 15);
    await productos.deleteproductByID(0);

 };

funcionAsync();



//console.log(productos.getproductByID (0)); //buscamos el producto con el ID ingresado, como ejemplo en este caso se coloca id=1
