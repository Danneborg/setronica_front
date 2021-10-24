import './App.css';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import ListOfProductsComp from "./Components/ListOfProductsComp";
import HeaderComp from "./Components/HeaderComp";
import FooterComp from "./Components/FooterComp";
import CreateProductComp from "./Components/CreateProductComp";

function App() {
    return (
        <div>
            <Router>
                    <HeaderComp/>
                    <div className="container">
                        <Switch>
                            <Route path="/" exact component={ListOfProductsComp}></Route>
                            <Route path="/add-product" component={CreateProductComp}></Route>
                        </Switch>
                    </div>
                    <FooterComp/>
            </Router>
        </div>
    );
}

export default App;
