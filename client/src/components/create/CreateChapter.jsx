import React, { Component, Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../Spinner';

class CreateChapter extends Component {
    constructor() {
        super();
        this.state = {
            bookid: '',
            chapid: '',
            book: null,
            chapters: null,
            name: '',
            content: '',
            price: 0,
            published: false
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    loadChapter = async (bookid, chapid) => {
        const res_chapter = await axios.get('api/books/' + bookid + '/chapters/' + chapid);
        const res_book = await axios.get('api/books/' + bookid);
        // console.log(res_chapter.data);
        // console.log(res_book.data);

        if (res_chapter.data && res_book.data.success) {
            return {
                book: res_book.data.book,
                chapters: res_chapter.data
            };
        }
        return null;
    }

    updateChapter = async (bookid, chapid, name, content, price, published) => {
        const { data } = await axios.put('api/book/' + bookid + '/chapters/' + chapid, {
            name,
            content,
            price,
            published
        })
    }

    async componentDidMount() {
        await this.setState({
            bookid: this.props.match.params.bookid,
            chapid: this.props.match.params.chapid
        });

        if (this.state.chapid && this.state.bookid) {
            const result = await this.loadChapter(this.state.bookid, this.state.chapid);
            await this.setState({
                book: result.book,
                chapters: result.chapters
            });
        }

        if (this.state.book && this.state.chapters) {
            await this.setState({
                name: this.state.chapters.name,
                content: this.state.chapters.content
            });
        }
    }

    async onChange(e) {
        e.preventDefault();
        await this.setState({ [e.target.id]: e.target.value });
    }

    async onClickPublish(e) {
        e.preventDefault();
        // console.log(this.state.published);
        if (this.state.published) {
            await this.setState({ published: false });
        } else {
            await this.setState({ published: true });
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        //update chapter
        await this.updateChapter(this.state.bookid, this.state.chapid, this.state.name, this.state.content, this.state.price, this.state.published);
    }

    render() {

        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        if (!this.state.book && !this.state.chapters) {
            return <Spinner />;
        }

        return (
            <>
                <h2>{this.state.book.name}</h2>
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

                        <Button variant="primary" onClick={this.onClickPublish}>
                            {this.state.published ? "Not publish" : "Publish"}
                        </Button>

                        <Button variant="primary" onClick={this.onSubmit}>
                            Create
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
});

export default connect(
    mapStateToProps,
    {}
)(CreateChapter);