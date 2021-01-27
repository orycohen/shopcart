import './Cart.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Axios from 'axios';
import Product from './Product.js'

const Home = ({cartid}) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/api/products"
        }).then(resProducts => {
            Axios({
                method: "GET",
                withCredentials: true,
                url: `/api/cart/${cartid}`
            }).then(resCart => {
                setProducts(resProducts.data);
                setCartItems(resCart.data);
            }).catch(error => {
                setProducts([]);
                setCartItems({});
            });
        }).catch(error => {
            setProducts([]);
            setCartItems({});
        });
    },[setProducts, setCartItems, cartid]);

    const addProduct = (id) => {
        let newCartItems;
        if (cartItems[id])
            newCartItems = {...cartItems, [id]: cartItems[id] + 1}
        else
            newCartItems = {...cartItems, [id]: 1}
        Axios({
            method: "PUT",
            withCredentials: true,
            url: "/api/cart",
            data: {cartid, newcart: newCartItems}
        }).then(res => {
            setCartItems(newCartItems);
        }).catch(error => {});
    }

    const subProduct = (id) => {
        if (!cartItems[id] || cartItems[id] === 0) return;
        let newCartItems = {...cartItems, [id]: cartItems[id] - 1}
        if (newCartItems[id] === 0)
            delete newCartItems[id];
        Axios({
            method: "PUT",
            withCredentials: true,
            url: "/api/cart",
            data: {cartid, newcart: newCartItems}
        }).then(res => {
            setCartItems(newCartItems);
        }).catch(error => {});
    }

    return (
        <ListGroup>
            {
                Object.values(products).map(prod => 
                    <ListGroup.Item key={prod._id} >
                        <Container fluid="xl">
                            <Row>
                                <Col xs={1} lg={1} md={1} sm={1} className="center">
                                    {cartItems[prod._id] ? cartItems[prod._id] : 0}
                                </Col>
                                <Col xs={1} lg={1} md={1} sm={1} className="center">
                                    <Button variant="primary" className="m-2" onClick={() => addProduct(prod._id)} >+</Button>
                                    <Button variant="primary" className="m-2" onClick={() => subProduct(prod._id)} >-</Button>
                                </Col>
                                <Col xs={9} lg={10} md={9} sm={10}>
                                    <Product name={prod.productName} price={prod.productPrice} desc={prod.productDescription}/>
                                </Col>
                            </Row>
                        </Container>
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    );
}

export default Home;
