import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const Product = ({price, name, desc}) => {
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title> {name}{": "}{price}{"$"} </Card.Title>
                    <Card.Text> {desc} </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Product;
