import React, { Component, Fragment, useEffect } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import BookList from './BookList';
import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";
import { loadBookBy, loadGenres } from '../../actions/browse';

class Browse extends Component {
    constructor() {
        super();
        this.state = {
            genre: '',
            status: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        this.props.loadBookBy(this.state.genre, this.state.status);
        // return <Redirect to={{
        //     pathname: '/browse',
        //     state: {
        //         genre: this.state.genre,
        //         status: this.state.status
        //     }
        // }}
        // />
    }

    render() {

        return (
            <>
                <h2>Novels Genre</h2>
                <Container>
                    <Row>
                        <Col xs={12} md={4}>
                            <Form.Group>
                                <Form.Label>Genre</Form.Label>
                                <Form.Control as="select" onChange={this.onChange} value={this.state.genre}>
                                    {this.props.genres.map(genre => <option>{genre.name}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" onChange={this.onChange} value={this.state.status}>
                                    <option>All</option>
                                    <option>Completed</option>
                                    <option>Ongoing</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                            <Button variant="outline-secondary" onClick={this.onSubmit}>Submit</Button>{' '}
                        </Col>
                    </Row>
                </Container>

                <Fragment>
                    <BookList books={this.props.books} />
                </Fragment>

            </>
        )
    }
}

const mapStateToProps = state => ({
    books: state.browse.books,
    genres: state.browse.genres
});

export default connect(
    mapStateToProps,
    { loadBookBy, loadGenres }
)(Browse);
