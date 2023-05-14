import cartModel from "../models/MongoDB/cartModel.js";

//Obtiene los prod segun el id
export const findCartById = async (id) => {
    try {
        const cart = await cartModel.findById(id)
        return cart
    } catch (error) {
        throw new Error(error)
    }
}

//Creación del carrito
export const createCart = async (cart) => {
    try {
        const newCart = await cartModel()
        await newCart.save()
        return newCart
    } catch (error) {
        throw new Error(error)
    }
}

//Eliminacion del carrito
export const deleteCart = async (id) => {
    try {
        return await cartModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

//Actualización del carrito
export const updateCart = async (id, info) => {
    try {
        return await cartModel.findByIdAndUpdate(id, info);
    } catch (error) {
        throw new Error(error);
    }
}