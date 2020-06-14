import React, { Component, Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadChapter } from '../../actions/book';
import { createChapter} from '../../actions/creation';


class CreateChapter extends Component {
    constructor() {
        super();
        this.state = {
            bookid: '',
            chapid: '',
            name: '',
            content: '',
            price: 0
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        await this.setState({
            bookid: this.props.match.params.bookid,
            chapid: this.props.match.params.chapid
        });

        if (this.state.chapid) {
            await this.props.loadChapter(this.state.bookid, this.state.chapid);
            await this.setState({
                name: this.props.chapters[0].name,
                content: this.props.chapters[0].content
            });
        }
    }

    async onChange(e) {
        e.preventDefault();
        await this.setState({ [e.target.id]: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        //update chapter
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login'/>;
        }

        return (
            <>
                <h2>{this.props.book.name}</h2>
                <Fragment>
                    <Form noValidate onSubmit={this.onSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Book's name</Form.Label>
                            <Form.Control type="text" placeholder="Enter chapter's name"
                                onChange={this.onChange} value={this.state.name} />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows="20" placeholder="Enter content"
                                onChange={this.onChange} value={this.state.content} />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder="Enter chapter's price"
                                onChange={this.onChange} value={this.state.price} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create chapter
                        </Button>

                    </Form>
                </Fragment>

            </>
        )
    }
}

CreateChapter.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    book: state.book.book,
    chapters: state.book.chapters,
});

export default connect(
    mapStateToProps,
    { loadChapter, createChapter }
)(CreateChapter);