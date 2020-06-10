import React, { Component } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import styles from './Rankings.module.css';



export default class Rankings extends Component {
    render() {
        return (
            <>
                <h2> Power Ranking</h2>
                <Container>
                    <Row>
                        <Col xs={12} md={4} className={styles.topBookCol}>
                            <Container className={styles.bookContainer}>
                                <Row>
                                    <Col >
                                        <h4>1</h4>
                                        <Image width="100" height="80" src="" alt="Image" thumbnail />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <h4><Link to="#">Name</Link></h4>
                                        <p>Author: </p>
                                        <p>View: </p>
                                        <button type="button" class="btn btn-primary">Vote</button>
                                        <button type="button" class="btn btn-primary">Read</button>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={12} md={4} className={styles.topBookCol}>
                            <Container className={styles.bookContainer}>
                                <Row>
                                    <Col >
                                        <h4>2</h4>
                                        <Image width="100" height="80" src="" alt="Image" thumbnail />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <h4><Link to="#">Name</Link></h4>
                                        <p>Author: </p>
                                        <p>View: </p>
                                        <button type="button" class="btn btn-primary">Vote</button>
                                        <button type="button" class="btn btn-primary">Read</button>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={12} md={4} className={styles.topBookCol}>
                            <Container className={styles.bookContainer}>
                                <Row>
                                    <Col >
                                        <h4>3</h4>
                                        <Image width="100" height="80" src="" alt="Image" thumbnail />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <h4><Link to="#">Name</Link></h4>
                                        <p>Author: </p>
                                        <p>View: </p>
                                        <button type="button" class="btn btn-primary">Vote</button>
                                        <button type="button" class="btn btn-primary">Read</button>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row className={styles.bookRow}>
                        <Container className={styles.bookContainer}>
                            <Row>
                                <Col xs={9} md={1}> <h4>4</h4>  </Col>
                                <Col xs={9} md={1}>
                                    <Image width="100" height="80" src="" alt="Image" thumbnail />
                                </Col>
                                <Col xs={9} md={7}>
                                    <h4><Link to="#">Name</Link></h4>
                                    <p>Author: </p>
                                    <button type="button" class="btn btn-primary">Read</button>
                                </Col>
                                <Col xs={9} md={3}>
                                    <p>View: </p>
                                    <button type="button" class="btn btn-primary">Vote</button>

                                </Col>
                            </Row>

                        </Container>


                    </Row>
                    <Row className={styles.bookRow}>
                        <Container className={styles.bookContainer}>
                            <Row>
                                <Col xs={9} md={1}> <h4>5</h4>  </Col>
                                <Col xs={9} md={1}>
                                    <Image width="100" height="80" src="" alt="Image" thumbnail />
                                </Col>
                                <Col xs={9} md={7}>
                                    <h4><Link to="#">Name</Link></h4>
                                    <p>Author: </p>
                                    <button type="button" class="btn btn-primary">Read</button>
                                </Col>
                                <Col xs={9} md={3}>
                                    <p>View: </p>
                                    <button type="button" class="btn btn-primary">Vote</button>

                                </Col>
                            </Row>

                        </Container>


                    </Row>

                </Container>
            </>
        )
    }
}
