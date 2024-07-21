export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getProducts = (limit, page, sort, query) => {

        return this.dao.getProducts(limit, page, sort, query);
    }
    addProduct = (product, email) => {
        return this.dao.addProduct(product, email);
    }
    deleteProduct = (itemId, email) => {
        return this.dao.deleteProduct(itemId, email);
    }
    updateProduct = (prodId, email) => {
        return this.dao.updateProduct(prodId, email);
    }
    getProductsById = (itemId) => {
        return this.dao.getProductsById(itemId);
    }
    updateProductStock = (prodId, newStock) => {
        return this.dao.updateProductStock(prodId, newStock);
    }
};