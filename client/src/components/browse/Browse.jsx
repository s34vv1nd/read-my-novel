import React, { Component, Fragment, useEffect } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import BookList from './BookList';
import Spinner from '../layout/Spinner';
//import { loadBookBy, loadGenres } from '../../actions/browse';
import axios from 'axios';

class Browse extends Component {
    constructor() {
        super();
        this.state = {
            books: null,
            genre: '',
            status: '',
            sortBy: ''
        }

        this.onChange = this.onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    loadBooksBy = async (genre, status, sortBy) => {
        try {
            const { data } = await axios.get('api/books', {
                params: {
                    genres: genre,
                    status: status,
                    sortBy: 'alphabet'
                }
            });
            if (data.success) return data.books;
            return null;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    async componentDidMount() {
        await this.setState({books: await this.loadBooksBy(this.state.genre, this.state.status, this.state.sortBy)});
    }

    async onChange(e) {
        await this.setState({ [e.target.id]: e.target.value });
        await this.setState({books: await this.loadBooksBy(this.state.genre, this.state.status, this.state.sortBy)});
    }

    render() {
        if (!this.state.books) {
            return <Spinner />
        }
        return (
            <>
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Novels Genre</h2>
                <Container>
                    <Row>
                        <Col xs={12} md={4}>
                            <Form noValidate>
                                <Form.Group>
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control as="select" id="genre" onChange={this.onChange} value={this.state.genre}>
                                        <option value='all'>All</option>
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
                    </Row>
                </Container>

                <Fragment>
                    <BookList books={this.state.books} />
                </Fragment>

            </>
        )
    }
}

const mapStateToProps = state => ({
    genres: state.genres
});

export default connect(
    mapStateToProps,
)(Browse);
