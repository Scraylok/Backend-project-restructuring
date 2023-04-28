import { findCartById, createCart, updateCart } from "../services/cartService.js";
import { findProductById } from "../services/productService.js";
import productModel from "../models/MongoDB/productModel.js";


export const getCart = async (req, res) => {
    try {
        const cart = await findCartById(req.params.cid)
        console.log(cart)
        const popCart = await cart.populate({
            path:'products.productId', model: productModel})
        
        res.send({
            status: "success",
            payload: popCart
        })
    } catch (error) {
        res.send({
            status: "error",
            payload: error.message
        })
    }
}

export const createNewCart = async (req, res) => {
    try {
        const cart = {}
        const newCart = await createCart(cart)
        res.send({
            status: "success",
            payload: newCart
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error.message
        })
    }
}
export const addProductToCart = async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    //console.log(idCart, idProduct)

    try {
        const cart = await cartManager.addProductToCart(idCart, idProduct, 1);
            
        res.send({
            status: "success",
            payload: cart
        })
    } catch (error) {
        res.send({
            status: "error",
            payload: `Product ${idProduct} not found.`
        })
    }}

    export const updateAllCart = async (req, res) => {
        try {
            const prodArray = req.body
            const addedProducts = await cartManager.updateAllProducts(req.params.cid, prodArray)
    
            res.send({
                status: "success",
                payload: addedProducts
            })
    
        } catch (error) {
            res.send({
                status: "error",
                payload: error
            })
        }
    
    }

    