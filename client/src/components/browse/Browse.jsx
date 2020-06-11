import React, { Component, Fragment, useEffect } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import BookList from './BookList';
import {
    Redirect
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
        //this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ value: e.target.value });
        this.props.loadBookBy(this.state.genre, this.state.status);
    }

    // async onSubmit(e) {
    //     e.preventDefault();
    // }

    render() {
        this.props.loadGenres();
        this.props.loadBookBy(this.state.genre, this.state.status);
        return (
            <>
                <h2>Novels Genre</h2>
                <Container>
                    <Row>
                        <Col xs={12} md={4}>
                            <Form onChange={this.onChange} value={this.state.genre}>
                                <Form.Group>
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control as="select">
                                        {this.props.genres.map(genre => <option>{genre.name}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form>

                        </Col>
                        <Col xs={12} md={4}>
                            <Form onChange={this.onChange} value={this.state.status}>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control as="select">
                                        <option>All</option>
                                        <option>Completed</option>
                                        <option>Ongoing</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>

                        </Col>
                        {/* <Col xs={12} md={4}>
                            <Button variant="outline-secondary" onClick={this.onSubmit}>Submit</Button>{' '}
                        </Col> */}
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
