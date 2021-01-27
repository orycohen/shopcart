import './App.css';
import Cart from './Cart.js';
import Home from './Home.js';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

const App = ({user}) => {
    return (
        <Router>
            <Navbar expand="lg" variant="light" bg="light">
                <Navbar.Brand>Cart.io</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="nav-item-collapse">
                        <Link to="/cart">Cart</Link>
                    </Navbar.Text><br/>
                    <Navbar.Text className="nav-item-collapse">
                        <Link to="/">Home</Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <Switch>
                    <Route path="/cart">
                        <Cart cartid={user.cart}/>
                    </Route>
                    <Route path="/">
                        <Home cartid={user.cart}/>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
