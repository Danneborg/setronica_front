import React, {Component} from 'react';

class HeaderComp extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark p-2">
                    <div><a href="/" className="navbar-brand">Product management</a></div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComp;