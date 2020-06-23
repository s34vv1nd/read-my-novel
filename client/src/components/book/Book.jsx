import './Book.css';
import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Image, ListGroup, ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import ChapterList from './ChapterList';
import { setAlert } from '../../actions/alert';
//import { loadReviews } from '../../actions/reviews';
import { loadBook, isInLibrary, addToLibrary, removeFromLibrary, setRating } from '../../actions/book';
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'

const imgdefault = "https://gitensite.s3.amazonaws.com/bookcovers/7573.jpg"

class Book extends Component {

    constructor(props) {
        super();
        this.state = {
            needRedirect: false,
            loading: true
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onClickLibrary = this.onClickLibrary.bind(this);
        this.starClickHandler = this.starClickHandler.bind(this);
    }

    async getRatings(user, book) {
        try {
            const rating = await axios.get('/api/ratings/', {
                params: {
                    book, user
                }
            });
            if (!rating || rating.length === 0) return 0;
            return rating[0];
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        await Promise.all([
            await this.props.loadBook(this.props.match.params.bookid),
        ]).then(() => {
            this.setState({ loading: false });
        })
        this.setState({ reviews: this.props.reviews });
    }

    async onClickLibrary(e) {
        e.preventDefault();
        if (!this.props.isAuthenticated) {
            await this.props.setAlert('Please login to bookmark!', 'info');
            await this.setState({ needRedirect: true });
            return;
        }
        if (this.props.inLibrary) {
            if (await this.props.removeFromLibrary(this.props.book._id)) {
                //await this.setState({ inLibrary: false });
            }
        }
        else {
            if (await this.props.addToLibrary(this.props.book._id)) {
                //await this.setState({ inLibrary: true });
            }
        }
    }

    async starClickHandler(e) {
        e.preventDefault();
        if (!this.props.isAuthenticated) {
            await this.setState({ needRedirect: true });
            return;
        }
        this.setState({loading: true});
        const bookid = this.props.book._id;
        this.props.setRating({ bookid, rating: e.target.dataset.value}).then(() => {
            this.setState({loading: false});
        });
    }

    render() {

        if (this.state.needRedirect) {
            return <Redirect to={{pathname: '/login', state: {from: this.props.location}}}></Redirect>
        }

        if (!this.props.book || !this.props.reviews || this.state.loading) {
            return <Spinner />;
        }

        return (
            <div>
                <Container style={{ border: 'ridge' }}>
                    <Row>
                        <Col md={4} lg={4}>
                            <Image src={this.props.book.cover ? this.props.book.cover : imgdefault} alt="Image" thumbnail />
                        </Col>
                        <Col md={8} lg={8} style={{ marginTop: '20px' }}>
                            <h3>{this.props.book.name}</h3>
                            <Row>
                                <Col lg={8}>
                                    <ListGroup horizontal>
                                        {this.props.book.genres.map(genre =>
                                            <ListGroup.Item key={genre.name}>
                                                {genre.name}
                                            </ListGroup.Item>)}
                                    </ListGroup>
                                    <ListGroup horizontal>
                                        <ListGroup.Item key="status" variant="primary">
                                            {this.props.book.completed === true ? "Completed" : "Ongoing"}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col lg={4}>
                                    <ButtonGroup style={{ marginBottom: '20px' }}>
                                        {this.props.isAuthenticated ? <Button variant="primary" onClick={this.onClickLibrary}>
                                            {this.props.inLibrary ? "Remove from library" : "Add to library"}
                                        </Button>: null}
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <p style={{ marginTop: '10px' }}>Author: {this.props.book.author.username}</p>
                            <p>Rating: {this.props.book.ratings}</p>
                            <span>Rate this book: {[...Array(5).keys()].map(n => {
                                return (
                                    <span
                                        className="star"
                                        style={{color: (this.props.isAuthenticated && n < this.props.book.rating) ? "yellow" : "gray"}}
                                        key={n + 1}
                                        data-value={n + 1}
                                        onClick={this.starClickHandler}
                                    >
                                        &#9733;
                                    </span>
                                );
                            })}</span>
                            <hr></hr>
                            <p>{this.props.book.sypnosis}</p>
                        </Col>

                    </Row>
                </Container>

                <ChapterList bookid={this.props.book._id} />

                <hr></hr>
                <ReviewForm bookid={this.props.book._id} />
                {!this.props.reviews || this.props.reviews == 0 ? null : <ReviewList bookid={this.props.book._id} />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    reviews: state.book.reviews,
    book: state.book.book,
    inLibrary: state.book.inLibrary
});

export default withRouter(connect(
    mapStateToProps,
    { setAlert, loadBook, isInLibrary, addToLibrary, removeFromLibrary, setRating }
)(Book));
