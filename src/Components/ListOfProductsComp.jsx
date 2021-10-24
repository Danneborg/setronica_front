import React, {Component} from 'react';
import ProductsService from "../Services/ProductsService";

class ListOfProductsComp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
        this.AddProduct = this.addProduct.bind(this);
    }

    componentDidMount() {
        ProductsService.getProducts().then((res) => {
            this.setState({products: res.data})
        })
    }

    addProduct() {
        this.props.history.push("/add-product");
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Product list</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.AddProduct}>Add product</button>
                </div>
                <div className="row">
                    <table className="table table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Currency</th>
                            <th>Actions</th>
                        </tr>

                        </thead>
                        <tbody>
                        {
                            this.state.products.map(
                                product =>
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.currency.name}</td>
                                        <td></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default ListOfProductsComp;