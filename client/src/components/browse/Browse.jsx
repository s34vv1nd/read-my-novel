import React, { Component } from 'react';
import { Container, Row, Col, Image, ListGroup, ButtonGroup, Button, Tabs, Tab, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Browse extends Component {

    render() {

        return (
            <>
                <h2>Novels Genre</h2>
                <ListGroup horizontal>
                    <ListGroupItem><Link to="#">All</Link></ListGroupItem>
                    <ListGroupItem><Link to="#">Genre</Link></ListGroupItem>
                    <ListGroupItem><Link to="#">Genre</Link></ListGroupItem>
                    <ListGroupItem><Link to="#">Genre</Link></ListGroupItem>
                    <ListGroupItem><Link to="#">Genre</Link></ListGroupItem>
                </ListGroup>

                <ListGroup horizontal>
                    <ListGroupItem><Link to="#">All</Link></ListGroupItem>
                    <ListGroupItem><Link to="#">Completed</Link></ListGroupItem>
                    <ListGroupItem><Link to="#">Ongoing</Link></ListGroupItem>
                </ListGroup>

                <Container>
                    <Row>
                        <Col xs={9} md={4}>
                            <Container>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Image width="100" height="80" src="" alt="Image" thumbnail />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <h4><Link to="#">Name</Link></h4>
                                        <p>Genre</p>
                                        <p>Rating</p>
                                        <p>Overview</p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={9} md={4}>
                            <Container>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Image width="100" height="80" src="" alt="Image" thumbnail />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <h4><Link to="#">Name</Link></h4>
                                        <p>Genre</p>
                                        <p>Rating</p>
                                        <p>Overview</p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>

            </>
        );
    }
}
