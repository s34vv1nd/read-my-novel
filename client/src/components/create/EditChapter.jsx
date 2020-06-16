import React, { Component, Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect, Link, withRouter } from 'react-router-dom';
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
            chapter: null,
            name: '',
            content: '',
            price: 0,
            published: false
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickPublish = this.onClickPublish.bind(this);
    }

    loadChapter = async (bookid, chapid) => {
        try {
            const res_chapter = await axios.get('api/books/' + bookid + '/chapters/' + chapid);
            const res_book = await axios.get('api/books/' + bookid);

            if (res_chapter.data.success && res_book.data.success) {
                return {
                    book: res_book.data.book,
                    chapter: res_chapter.data.chapter,
                    published: res_chapter.data.chapter.published
                };
            }
            return null;
        }
        catch (err) {
            console.error(err);
        }
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
                chapter: result.chapter,
                published: result.published
            });
        }

        if (this.state.book && this.state.chapter) {
            await this.setState({
                name: this.state.chapter.name,
                content: this.state.chapter.content
            });
        }
    }

    updateChapter = async (bookid, chapid, name, content, price, published) => {
        try {
            const { data } = await axios.put('api/books/' + bookid + '/chapters/' + chapid, {
                name,
                content,
                price,
                published
            })
            console.log(data);
        }
        catch (err) {
            console.error(err);
        }
    }

    onChange = async e => {
        e.preventDefault();
        await this.setState({ [e.target.id]: e.target.value });
    }

    onClickPublish = async () => {
        try {
            await this.updateChapter(
                this.state.bookid,
                this.state.chapid,
                this.state.name,
                this.state.content,
                this.state.price,
                true
            );
            this.props.history.push('/create/book/' + this.state.bookid);
        }
        catch (err) {
            console.error(err);
        }
    }

    async onSubmit() {
        try {
            await this.updateChapter(
                this.state.bookid,
                this.state.chapid,
                this.state.name,
                this.state.content,
                this.state.price,
                this.state.published
            );
            this.props.history.push('/create/book/' + this.state.bookid);
        }
        catch (err) {
            console.error(err);
        }
    }

    render() {

        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        if (!this.state.book && !this.state.chapter) {
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

                        <Button variant="primary" disabled={this.state.published} onClick={this.onClickPublish}>
                            {this.state.published ? "Already published" : "Publish"}
                        </Button>

                        <Button variant="primary" type="submit">
                            Save
                        </Button>

                    </Form>
                </Fragment>

            </>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(
    mapStateToProps,
)(CreateChapter));