import React, { Component } from 'react';
import { Container, Row, Col, Image, ListGroup, ButtonGroup, Button, Tabs, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Detail extends Component {

    constructor(props) {
        super();
        this.state = {
            // Takes active tab from props if it is defined there
            activeTab: props.activeTab || 1
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedTab) {
        // The active tab must be set into the state so that
        // the Tabs component knows about the change and re-renders.
        this.setState({
            activeTab: selectedTab
        });
    }

    render() {

        return (
            <>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <Image src="" alt="Image" thumbnail />
                        </Col>
                        <Col xs={12} md={4}>
                            <h2>Name</h2>
                            <ListGroup horizontal>
                                <ListGroup.Item>Genre</ListGroup.Item>
                                <ListGroup.Item>Completed</ListGroup.Item>
                                <ListGroup.Item>#chapters</ListGroup.Item>
                                <ListGroup.Item>Views</ListGroup.Item>
                            </ListGroup>
                            <p>Author: </p>
                            <p>Rating: </p>
                            <ButtonGroup>
                                <Button variant="secondary">Read</Button>
                                <Button variant="secondary">Add to library</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
                <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                    <Tab eventKey={1} title="About">
                        <h4>Overview</h4>
                        <h4>Most views</h4>
                        <ListGroup horizontal>
                            <ListGroup.Item>
                                <p><Link to=''>Username</Link></p>
                                <p>#views</p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <p><Link to=''>Username</Link></p>
                                <p>#views</p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <p><Link to=''>Username</Link></p>
                                <p>#views</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Tab>
                    <Tab eventKey={2} title="Table of Contents">
                        <Container>
                            <Row>
                                <Col xs={9} md={4}>
                                    <Link to=''>Chapter</Link>
                                    <p>Date</p>
                                </Col>
                                <Col xs={9} md={4}>
                                    <Link to=''>Chapter</Link>
                                    <p>Date</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9} md={4}>
                                    <Link to=''>Chapter</Link>
                                    <p>Date</p>
                                </Col>
                                <Col xs={9} md={4}>
                                    <Link to=''>Chapter</Link>
                                    <p>Date</p>s
                                </Col>
                            </Row>
                        </Container>
                    </Tab>
                </Tabs>

            </>
        );
    }
}
