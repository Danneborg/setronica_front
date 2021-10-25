import React, {Component} from 'react';
import ProductsService from "../Services/ProductsService";

class ViewProductComp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            product_name: '',
            product_description: '',
            product_price: '',
            product_currency_id: '',
            product_currency_name: ''
        }
    }

    componentDidMount() {
        ProductsService.getProductById(this.state.id).then((res => {
            let product = res.data;
            this.setState({
                product_name: product.name,
                product_description: product.description,
                product_price: product.price,
                product_currency_name: product.currency.name,
            })
        }));
    }

    render() {
        return (
            <div>
                <div id="view_product" className="card col-6 offset-3">
                    <div className="card-body">
                        <h3 className="textCenter">View product details</h3>
                        <div className="row">
                            <label htmlFor="">Product name: </label>
                            <span>{this.state.product_name}</span>
                        </div>
                        <div className="row">
                            <label htmlFor="">Product description: </label>
                            <span>{this.state.product_description}</span>
                        </div>
                        <div className="row">
                            <label htmlFor="">Product price: </label>
                            <span>{this.state.product_price}</span>
                        </div>
                        <div className="row">
                            <label htmlFor="">Product currency: </label>
                            <span>{this.state.product_currency_name}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewProductComp;