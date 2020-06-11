import React, { Component } from 'react';
import { Container, Row, Col, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
import { loadBookBy } from '../../actions/browse';

const Browse = ({
    books,
    loadBookBy
}) => {
    useEffect(() => {
        loadBookBy();
    }, []);

    return (
        <>
            <h2>Novels Genre</h2>
            <ListGroup horizontal>
                <ListGroupItem><Link to="#">All</Link></ListGroupItem>
                <ListGroupItem><Link to="#">Horror</Link></ListGroupItem>
                <ListGroupItem><Link to="#">Sci-fi</Link></ListGroupItem>
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

const mapStateToProps = state => ({
    books: state.creation.books,
});

export default connect(
    mapStateToProps,
    { loadBookBy }
)(Browse);
