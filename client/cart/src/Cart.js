import './Cart.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Axios from 'axios';
import {Link} from "react-router-dom";
import Product from './Product.js'

const Cart = ({cartid}) => {
    const [cartItems, setCartItems] = useState([]);
    const [shipPrice, setShipPrice] = useState(0);
    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: `/api/cart/${cartid}`
        }).then(resCart => {
            Axios({
                method: "GET",
                withCredentials: true,
                url: `/api/products/${cartid}`
            }).then(resProducts => {
                let items = {};
                resProducts.data.forEach(prod => {
                    items[prod._id] = {
                        name: prod.productName,
                        price: prod.productPrice,
                        desc: prod.productDescription,
                        quant: resCart.data[prod._id]
                    };
                });
                setShipPrice(getShippingPrice(items));
                setCartItems(items);
            }).catch(error => {
                setCartItems([]);
                setShipPrice(0);
            });
        }).catch(error => {
            setCartItems([]);
            setShipPrice(0);
        });
    },[setCartItems, cartid]);

    const getTotalPrice = () => {
        const items = Object.values(cartItems);
        if (items.length === 0) return 0;
        const totalPrice = items.map(i => i.price * i.quant).reduce((i1, i2) => i1 + i2);
        return totalPrice + shipPrice;
    }

    const getShippingPrice = (cartItems) => {
        const items = Object.values(cartItems);
        if (items.length === 0) return 0;
        const itemsCount = items.map(i => i.quant).reduce((i1, i2) => i1 + i2);
        if (itemsCount > 4)
            return 10
        return 0
    }

    const emptyCart = () => {
        Axios({
            method: "DELETE",
            url: "/api/cart/",
            withCredentials: true,
            data: {cartid}
        }).then(res => {setCartItems({})})
        .catch(error => {});
    }

    if (Object.values(cartItems).length === 0) {
        return (
            <Container className="center p-4">
                <h3>
                    Your cart is empty..
                </h3>
                <h4>
                    <Link to="/">Fill it!</Link>
                </h4>
            </Container>
        );
    }

    return (
        <Container>
            <Row>
                <Col sm={8} xs={12}>
                    <Row>
                        <Col sm={8} xs={8}>
                            <ListGroup>
                            <ListGroup.Item key={"nameundefined"} active>q: item name</ListGroup.Item>
                            {
                                cartItems ?
                                Object.values(cartItems).map(cartItem => 
                                    <ListGroup.Item key={`name${cartItem.name}`}>{cartItem.quant}: {cartItem.name}</ListGroup.Item>
                                ) :
                                {}
                            }
                            </ListGroup>
                        </Col>
                        <Col sm={4} xs={4}>
                            <ListGroup>
                            <ListGroup.Item key={"priceundefined"} active>price</ListGroup.Item>
                            {
                                cartItems ?
                                Object.values(cartItems).map(cartItem => 
                                    <ListGroup.Item key={`price${cartItem.name}`}>{cartItem.price}$</ListGroup.Item>
                                ) :
                                {}
                            }
                            </ListGroup>
                        </Col>
                    </Row>
                </Col>
                <Col sm={4} xs={12} className="center p-3">
                    <h5> {"Shipping: "}{ shipPrice }$ </h5>
                    <h3>Total</h3>
                    <h4> { getTotalPrice() }$ </h4>
                    <Button 
                        variant="danger"
                        onClick={getTotalPrice() == 0 ? null : emptyCart}
                    >Empty Cart</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;
