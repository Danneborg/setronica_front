import axios from "axios";

const PRODUCT_BASE_URL = "http://localhost:8080/api/currency/getAllCurrencies"

class CurrencyService {
    getCurrencies() {
        return axios.get(PRODUCT_BASE_URL)
    }
}

export default new CurrencyService()