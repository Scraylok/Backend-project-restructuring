import { Router } from "express";
import { createNewCart, getCart, addProductToCart } from '../controllers/cart.controller.js'

const routerCart = Router()

routerCart.get("/:id", getCart)
routerCart.post("/:id", addProductToCart)
routerCart.put("/:id", createNewCart)
routerCart.put("/product/:id", createNewCart)
routerCart.delete("/:id", createNewCart)
routerCart.delete("/product/:id", createNewCart)
routerCart.post("/", createNewCart)

export default routerCart