import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {setAlert} from '../../actions/alert';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class NewBookForm extends Component {
    constructor() {
        super();
        this.state = {
            bookname: '',
            genres: [],
            errors: {},
            submitted: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    createBook = async ({name, genres}) => {
        const res = await axios.post('api/books', { name, genres });
        return res.data;
    }

    async onSubmit(e) {
        e.preventDefault();
        if (!this.state.genres) {
            setAlert('Choose one genre!!', "danger", 2000);
            return;
        }
        await this.createBook({ name: this.state.bookname, genres: [this.state.genres] });
        this.setState({submitted : true})
    }

    render() {
        if (this.state.submitted) {
            return <Redirect to='/create'></Redirect>
        }

        return (
            <Fragment>
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group controlId="bookname">
                        <Form.Label>Book's name</Form.Label>
                        <Form.Control type="text" placeholder="Enter book's name"
                            onChange={this.onChange} value={this.state.bookname} />
                    </Form.Group>

                    <Form.Group controlId="genres">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control as="select" placeholder="Enter genres" onChange={this.onChange} value={this.state.genres} >
                            <option value={null}>Choose...</option>
                            {this.props.genres.map(genre => 
                                <option key = {genre._id} value={genre.name}>{genre.name}</option>
                            )}
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create Book
                    </Button>
                </Form>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    genres: state.genres
});

export default connect(
    mapStateToProps,
    { setAlert }
)(NewBookForm);