import { findProducts, findProductById, paginateProducts, createOneProduct, updateOneProduct, deleteOneProduct } from "../services/productService.js";

//Trae todos los productos
export const getProducts = async (req, res) => {
    let { limit = 10, page = 1, category = undefined, stock = undefined, sort = undefined } = req.query;
    try {
    
        if (isNaN(page)) throw new Error("Parameter 'page' must be type: number")

        // Paginacion
        let filter = {}
        if (category) filter.category = category
        if (stock) filter.stock = { $gt: stock - 1 }

        const options = {
            page,
            limit,
            sort: sort && Object.keys(sort).length ? sort : undefined
        };

       
        if (sort != undefined) {
            if (sort.toLowerCase() != "asc" && sort.toLowerCase() != "desc") {
                throw new Error("Invalid sorting parameter")
            } else {
                sort.toLowerCase() == "asc" ? options.sort = "price" : options.sort = "-price"
            }
        }
        
        
       
        const products = await paginateProducts(filter, options)

        if ((page > products.totalPages) || (page <= 0)) throw new Error("Parameter 'page' is out of range")

        // Creacion de links de anterio y siguiente
        const categoryLink = category ? `&category=${category}` : ""
        const stockLink = stock ? `&stock=${stock}` : ""
        const limitLink = limit ? `&limit=${limit}` : ""
        const sortLink = sort ? `&sort=${sort}` : ""

        const prevPageLink = products.hasPrevPage ? `/api/products?page=${products.prevPage}${limitLink}${categoryLink}${stockLink}${sortLink}` : null
        const nextPageLink = products.hasNextPage ? `/api/products?page=${products.nextPage}${limitLink}${categoryLink}${stockLink}${sortLink}` : null

        res.send({
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: prevPageLink,
            nextLink: nextPageLink

        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
}
//Trae son solo producto
export const getProduct = async (req, res) => {
    try {
        const product = await findProductById(req.params.pid)
        res.send({
            status: "success",
            payload: product
        });
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }
}
//Crea un producto
export const createProduct = async (req, res) => {
    try {
        const info = req.body;
        let response = await createOneProduct(info);
        res.send({
            status: "success",
            payload: response,
        });
    } catch (error) {
        res.send({
            status: "error",
            payload: error,
        });
    }
}
//Actualiza un solo producto
export const updateProduct = async (req, res) => {
    try {
        const product = await updateOneProduct(req.params.pid, req.body)
        res.send({
            status: "success",
            payload: `Producto ${JSON.stringify(product)} actualizado.`
        })
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })       
    }

}
//Elimina un producto
export const deleteProduct = async (req, res) => {
    try {
        const product = await deleteOneProduct(req.params.pid) 
        res.send({
            status: "success",
            payload: `Producto ${JSON.stringify(product)} eliminado.`
        })
    } catch (error) {
        res.send({
            status: "error",
            payload: error
        })
    }

}