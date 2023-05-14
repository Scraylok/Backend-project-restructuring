import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'

const routerProduct = Router()

routerProduct.get("/", getProducts)
routerProduct.get("/:id", getProduct)
routerProduct.post("/", createProduct)
routerProduct.put("/:id", updateProduct)
routerProduct.delete("/:id", deleteProduct)


export default routerProduct