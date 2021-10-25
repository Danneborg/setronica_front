import axios from "axios";

const PRODUCT_BASE_URL = "http://localhost:8080/api/products/"

class ProductsService {
    getProducts() {
        return axios.get(PRODUCT_BASE_URL);
    }

    createProduct(product) {
        return axios.post(PRODUCT_BASE_URL, product);
    }

    getProductById(id) {
        return axios.get(PRODUCT_BASE_URL + id);
    }

    updateProduct(product, id) {
        return axios.put(PRODUCT_BASE_URL + id, product);
    }

    deleteProduct(id) {
        return axios.delete(PRODUCT_BASE_URL + id);
    }

    findByParams(opt, value) {
        return axios.get(PRODUCT_BASE_URL + 'find/' + opt + '/' + value);
    }
}

export default new ProductsService()