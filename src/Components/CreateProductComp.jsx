import React, {Component} from 'react';
import CurrencyService from "../Services/CurrencyService";
import ProductsService from "../Services/ProductsService";

class CreateProductComp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            product_name: '',
            product_description: '',
            product_price: '',
            product_currency_id: '',
            product_currency_name: '',
            currencies: []
        }
        this.changeNameHandler.bind(this);
        this.changeDescriptionHandler.bind(this);
        this.changePriceHandler.bind(this);
        this.savOrUpdateProduct = this.savOrUpdateProduct.bind(this);
        this.findArrayElementByTitle = this.findArrayElementByTitle.bind(this);
    }

    componentDidMount() {
        CurrencyService.getCurrencies().then((res) => {
            this.setState({currencies: res.data})
        })

        if (this.state.id > 0) {
            ProductsService.getProductById(this.state.id).then((res) => {
                let product = res.data;
                this.setState({
                    product_name: product.name,
                    product_description: product.description,
                    product_price: product.price,
                    product_currency_id: product.currency.id,
                    product_currency_name: product.currency.name,
                })
            });
        }
    }

    changeNameHandler = (event) => {
        this.setState({product_name: event.target.value});
    }
    changeDescriptionHandler = (event) => {
        this.setState({product_description: event.target.value});
    }

    changePriceHandler = (event) => {
        this.setState({product_price: event.target.value});
    }

    savOrUpdateProduct = (e) => {
        e.preventDefault();
        let currency_id = document.getElementById('currency_select').value;
        let localCurrency = this.findArrayElementByTitle(this.state.currencies, currency_id);
        let product = {
            name: this.state.product_name,
            description: this.state.product_description,
            price: this.state.product_price,
            currency: {
                id: localCurrency.id,
                name: localCurrency.name
            }
        }

        if (this.state.id > 0) {
            ProductsService.updateProduct(product, this.state.id).then(res => {
                this.props.history.push("/");
            });
        } else {
            ProductsService.createProduct(product).then(res => {
                this.props.history.push("/");

            })
        }
    }

    cancel() {
        this.props.history.push("/");
    }

    findArrayElementByTitle(array, id) {
        return array.find((element) => {
            return element.id == id;
        })
    }

    getTitle() {
        if (this.state.id > 0) {
            return <h3 className="text-center">Update product</h3>;
        } else {
            return <h3 className="text-center">Add product</h3>;
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form action="">
                                    <div className="mb-3">
                                        <label htmlFor="name">Name</label>
                                        <input id="name" type="text" placeholder="Name" name="name"
                                               className="form-control"
                                               value={this.state.product_name}
                                               onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description">Description</label>
                                        <input id="description" type="text" placeholder="Description" name="description"
                                               className="form-control"
                                               value={this.state.product_description}
                                               onChange={this.changeDescriptionHandler}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price">Price</label>
                                        <input id="price" type="number" placeholder="Price" name="price"
                                               className="form-control"
                                               value={this.state.product_price}
                                               onChange={this.changePriceHandler}/>
                                    </div>
                                    <div className="mb-3">
                                        <select id="currency_select" placeholder="Select currency" required
                                                className="form-select">
                                            {
                                                this.state.currencies.map(
                                                    currency => {
                                                        if (currency.id === this.state.product_currency_id) {
                                                            return <option selected
                                                                           value={currency.id}>{currency.name}</option>
                                                        } else {
                                                            return <option value={currency.id}>{currency.name}</option>
                                                        }
                                                    }
                                                )
                                            }
                                        </select>
                                    </div>

                                    <button className="btn btn-success" onClick={this.savOrUpdateProduct}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                            style={{marginLeft: "10px"}}>Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateProductComp;