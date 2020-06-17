import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { loadUser } from '../../actions/auth';
import Spinner from '../Spinner';

class UpdateBookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookname: '',
            genres: '',
            completed: null,
            sypnosis: '',
            file: null,
            imgURL: '',
            errors: {},
            loading: false,
            submitted: false
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        const { data } = await axios.get('/api/books/' + this.props.match.params.bookid);
        console.log(data.book);
        await this.setState({
            bookname: data.book.name,
            genres: data.book.genres[0].name,
            completed: data.book.completed,
            sypnosis: data.book.sypnosis,
            imgURL: data.book.cover,
        })
        console.log('state: ', this.state);
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    updateBook = async ({ bookid, name, genrenames, sypnosis, cover }) => {
        const res = await axios.put('api/books/' + bookid, { book: {name, genrenames, sypnosis, cover} });
        return res.data;
    }

    async onSubmit(e) {
        e.preventDefault();
        if (!this.state.bookname) {
            console.log("Book name must not be empty");
            await this.props.setAlert('Book name must not be empty', "danger", 2000);
            return;
        }
        else
            if (!this.state.genres || this.state.genres.length === 0 || !this.state.genres[0]) {
                console.log("Choose one genre");
                await this.props.setAlert('Choose one genre', "danger", 2000);
                return;
            }
            else
                if (this.state.file) {
                    const formData = new FormData();
                    formData.append("cover", this.state.file);
                    const config = {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    }
                    await axios.post('api/upload/cover', formData, config).then(res => {
                        console.log('RES', res.data.fileNameInServer)
                        let filePath = res.data.fileNameInServer
                        if (filePath) {
                            filePath = filePath.split('\\')[1]
                        }
                        this.setState({
                            imgURL: '/api/view/' + filePath
                        })
                    })
                }

        await this.updateBook({
            bookid: this.props.match.params.bookid,
            name: this.state.bookname,
            genrenames: [this.state.genres],
            sypnosis: this.state.sypnosis,
            cover: this.state.imgURL
        });

        this.setState({ submitted: true })
    }

    render() {
        if (this.state.submitted) {
            return <Redirect to='/create'></Redirect>
        }

        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <Fragment>
                <Form noValidate onSubmit={this.onSubmit} encType="multipart/form-data">
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
                                <option key={genre._id} value={genre.name}>{genre.name}</option>
                            )}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="sypnosis">
                        <Form.Label>Sypnosis</Form.Label>
                        <Form.Control as="textarea" placeholder="Something to introduce your book..."
                            onChange={this.onChange} value={this.state.sypnosis} />
                    </Form.Group>

                    <Form.Group controlId="cover">
                        <Form.Label>Book cover</Form.Label>
                        <Form.Control
                            onChange={(evt) => {
                                evt.preventDefault();
                                this.setState({
                                    file: evt.target.files[0],
                                })
                            }}
                            type="file"
                            name="cover"
                            placeholder="choose image"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update Book
                    </Button>
                </Form>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    genres: state.genres
});

export default withRouter(connect(
    mapStateToProps,
    { setAlert }
)(UpdateBookForm));