import React, {Component} from 'react';
import ProductsService from "../Services/ProductsService";

class FooterComp extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <footer className="footer">
                <span className="text-muted">With regards D.Kononikhin</span>
            </footer>
            </div>
        );
    }
}

export default FooterComp;