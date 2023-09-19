import mongoose from "mongoose";

const cartsCollections = "carts"; 

const cartsSchema = new mongoose.Schema({

    idProduct: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

})

const cartsModel = mongoose.model(cartsCollections, cartsSchema); 

export {cartsModel}; 