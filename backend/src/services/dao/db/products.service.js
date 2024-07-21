import { productsModel } from "./models/products.js";
import EmailService from "../email.service.js";
const emailService = new EmailService()
export default class ProductService {
    constructor() {
        console.log('Working products with database persistance in mongodb')
    }

    getProducts = async (limit, page, sort, query) => {
        try {
            limit = limit > 0 ? limit : 10;
            page = page > 0 ? page : 1
            let options = { limit: limit, page, lean: true, price: sort }

            let queryObj = {}
            if (query !== '') {
                if (query === "disponible"){
                    queryObj = { status: true };
                }else{
                    queryObj = {category: query}
                }
            }
  
            let result = await productsModel.paginate( queryObj, options)
            
            result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}${limit ? `&limit=${limit}` : ''}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : '';
            result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}${limit ? `&limit=${limit}` : ''}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : '';

            result.isValid = !(page < 1 || page > result.totalPages)
            return result
            
        } catch (error) {
            console.error(`Error leyendo los productos: ${error}`)

        }

    }

    addProduct = async (product, email) => {
        try {
            if(email !== 'adminCoder@coder.com'){
                product.owner = email
            }else{
                product.owner = 'admin'
            }

            let result = await productsModel.create(product)
            console.log(product.owner)
            console.log(result)
         
            return result
        } catch (error) {
            console.error(`Error agregando el producto: ${error}`)
        }
    }

    deleteProduct = async (itemId, email) => {
        try {
            const product = await this.getProductsById(itemId)
            if(!product){
                throw new Error('No existe el producto')
            }
            
            if(email !== 'adminCoder@coder.com' && email !== product.owner){
                throw new Error('El producto no pertence al usuario, no pudo ser modificado')
            }

            let result = await productsModel.deleteOne({ _id: itemId })
            if(product.owner !== 'admin'){
                const emailDeletedProduct = {
                    from: "E-commerce Cattalina Test - " + config.gmailAccount,
                    to: product.owner,
                    subject: 'Su producto fue eliminado',
                    html: `<div><h3> Su producto ya no forma parte de nuestro catálogo. </h3>
                    </div>`
                }
                await emailService.sendEmail(emailDeletedProduct)
            }
            console.log(result)
            return result
        } catch (error) {
            console.error(`Error eliminando el producto: ${error}`)
        }
    }

    updateProduct = async (prodId, email) => {
        try {
            const product = await this.getProductsById(prodId)
            console.log(product)
            console.log('el prod owner en update',product.owner)

            if(email !== 'adminCoder@coder.com' && email !== product.owner){
                throw new Error('El producto no pertence al usuario, no pudo ser modificado')
            }

            let result = await productsModel.updateOne({ _id: prodId }, product)
            return result

        } catch (error) {
            console.error(`Error en la actualizacion del producto: ${error}`)
        }

    }

    getProductsById = async (itemId) => {
        try {
            let result = await productsModel.findOne({ _id: itemId }).lean();
            return result
        } catch (error) {
            console.error(`Error leyendo el producto: ${error}`)

        }
    }


    updateProductStock = async (prodId, newStock) => {
        try {
            console.log(`newStock desde el updateProdStock service ? ${newStock}`)

            let result = await productsModel.updateOne({ _id: prodId },
                 {$set: {stock: newStock}})
            console.log(result)
            return result

        } catch (error) {
            console.error(`Error en la actualizacion del producto: ${error}`)
            res.status(500)
        }

    }

}
