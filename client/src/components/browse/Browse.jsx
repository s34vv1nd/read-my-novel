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
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        await this.props.loadGenres();
        await this.props.loadBookBy();
    }

    async onChange(e) {
        await this.setState({ [e.target.id]: e.target.value });
        await this.props.loadBookBy(this.state.genre, this.state.status);
    }

    // async onSubmit(e) {
    //     e.preventDefault();
    // }

    render() {
        
        return (
            <>
                <h2>Novels Genre</h2>
                <Container>
                    <Row>
                        <Col xs={12} md={4}>
                            <Form noValidate>
                                <Form.Group>
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control as="select" id="genre" onChange={this.onChange} value={this.state.genre}>
                                        <option value ='all'>All</option>
                                        {this.props.genres.map(genre => <option key={genre.id} value={genre.name}>{genre.name}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form>

                        </Col>
                        <Col xs={12} md={4}>
                            <Form noValidate>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control as="select" id="status" onChange={this.onChange} value={this.state.status}>
                                        <option key='all' value='all'>All</option>
                                        <option key='completed' value='completed'>Completed</option>
                                        <option key='ongoing' value='ongoing'>Ongoing</option>
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
