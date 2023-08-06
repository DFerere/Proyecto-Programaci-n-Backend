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
        this.product = []; //definimos arreglo vacio que guardara productos
    }

    addProduct(title, description, price, thumbnail, code, stock){ //metodo que añade producto al arreglo vacio product
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        const newproduct = { title: this.title, description: this.description, price: this.price, thumbnail: this.thumbnail, code: this.code, stock: this.stock, id : ProductManager.id};
        const propertynewproduct = Object.values(newproduct); //extrae los valores de las propiedades del producto


        if (this.product.find((prod) => prod.code === code)){ //verifica que el codigo del nuevo producto agregado no coinncida con uno ya existente en el arreglo
            const mensajecode = "Codigo de objeto ingresado ya existe";
            return console.log(mensajecode);
        };

    
        for (let i = 0; i < propertynewproduct.length - 1; i++) { //recorre la lista de valores de las propiedades de los productos
            const result = propertynewproduct[i];
            let len = result.length; //calcula la longitud de la propiedad

            if (len === undefined){
                len = result.toString().length; //significa que el valor de la propiedad es numerico y debemos transformarla a string para calcular su longitud
            }

            if(len === 0){ //si la longitud del valor de una propiedad es cero significa que dicho campo esta vacio
                const mensaje = "Una propiedad del objeto ingresado es vacio, verifique que todos los campos esten completados";
                return console.log(mensaje);
            }
          }

          ProductManager.id++; //incremento ID del producto;
          this.product.push(newproduct); //añade producto a arreglo product
                             
    }
    
    getProduct(){ //metodo que retorno lista de productos en arreglo product
        return this.product;

    }

    getproductByID (idfind){ //busqueda de productos por ID
        return this.product.find((produ) => produ.id === idfind); 
    }  

}


const productos = new ProductManager(); //instanciamos clase ProductManager

const producto1 = productos.addProduct( "Asus Laptop", "Asus TUF Gaming A15 2022 color gris", 100, "www.amazon.com/asus_tuf_a15", 100, 4); //agregamos primer producto
const producto2 = productos.addProduct("Laptop HP", "HP Victus Gaming color negro", 800, "www.hplaptops.com/hp_victus", 101, 10); //agregamos segundo producto
const producto3 = productos.addProduct("Acer Gaming", "Acer Pradetor color metalico", 1500, "www.milpatop.com/acer/acer_prad", 102, 6); //agregamos tercer producto

console.log("La lista de productos registrados es:"); 

console.log(productos.getProduct()); //obtenemos lista de productos resgistrados anteriormente

console.log("El producto retornado de busqueda por ID es el siguiente:");

console.log(productos.getproductByID (1)); //buscamos el producto con el ID ingresado, como ejemplo en este caso se coloca id=1