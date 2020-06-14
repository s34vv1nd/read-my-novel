import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createBook, getBooksCreated } from '../../actions/creation';
import { Redirect } from 'react-router-dom';

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

    async onSubmit(e) {
        e.preventDefault();
        await this.props.createBook({ name: this.state.bookname, genres: [this.state.genres] });
        await this.props.getBooksCreated();
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
                        <Form.Control type="text" placeholder="Enter genres"
                            onChange={this.onChange} value={this.state.genres} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create Book
                    </Button>
                </Form>
            </Fragment>
        )
    }
}

NewBookForm.propTypes = {
    createBook: PropTypes.func,
    getBooksCreated: PropTypes.func
};

const mapStateToProps = state => ({

});

export default connect(
    null,
    { createBook, getBooksCreated }
)(NewBookForm);