import React, {Component} from 'react';
import ProductsService from "../Services/ProductsService";

class ListOfProductsComp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.viewProduct = this.viewProduct.bind(this);
        this.searchForAProduct = this.searchForAProduct.bind(this);
    }

    componentDidMount() {
        ProductsService.getProducts().then((res) => {
            this.setState({products: res.data})
        })
    }

    addProduct() {
        this.props.history.push("/add-product/-1");
    }

    editProduct(id) {
        this.props.history.push(`/add-product/${id}`);
    }

    deleteProduct(id) {
        ProductsService.deleteProduct(id).then((res => {
            window.location.reload();
        }));
    }

    viewProduct(id) {
        this.props.history.push(`/view-product/${id}`);
    }

    searchForAProduct() {
        let opt = document.getElementById("search-option").value;
        let value = document.getElementById("site-search").value;
        ProductsService.findByParams(opt, value).then((res => {
            this.setState({products: res.data})
        }));
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Product list</h2>
                <div className="row">
                    <div className="col-8">
                        <button className="btn btn-primary" onClick={this.addProduct}>Add product</button>
                        <label htmlFor="site-search">Search for a product:</label>
                        <input type="search" id="site-search" name="q"
                               aria-label="Search through site content"/>
                        <select style={{marginLeft: "10px"}} className="form-select-sm" name="search-option"
                                id="search-option">
                            <option value="name">Name</option>
                            <option value="description">Description</option>
                        </select>
                        <button onClick={() => this.searchForAProduct()} style={{marginLeft: "10px"}}
                                className="btn btn-info">Search
                        </button>
                    </div>
                </div>
                {(this.state.products && this.state.products.length) ? (
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
                                            <td>
                                                <button onClick={() => this.editProduct(product.id)}
                                                        className="btn btn-primary">Update
                                                </button>
                                                <button style={{marginLeft: "10px"}}
                                                        onClick={() => this.deleteProduct(product.id)}
                                                        className="btn btn-danger">Delete
                                                </button>
                                                <button style={{marginLeft: "10px"}}
                                                        onClick={() => this.viewProduct(product.id)}
                                                        className="btn btn-info">View
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h3 className='text-center'>Product not found</h3>
                )}


            </div>
        );
    }
}

export default ListOfProductsComp;