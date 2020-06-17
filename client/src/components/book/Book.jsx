import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Image, ListGroup, ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';
import ChapterList from './ChapterList';
import { setAlert } from '../../actions/alert';
import { isInLibrary, addToLibrary, removeFromLibrary } from '../../actions/library';
import { loadReviews } from '../../actions/reviews';
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'

const imgdefault = "https://gitensite.s3.amazonaws.com/bookcovers/7573.jpg"

class Book extends Component {

    constructor(props) {
        super();
        this.state = {
            bookid: null,
            book: null,
            reviews: null,
            inLibrary: false,
            needRedirect: false,
            loading: true
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onClickLibrary = this.onClickLibrary.bind(this);
    }

    loadBook = async (bookid) => {
        try {
            const { data } = await axios.get('api/books/' + bookid);
            if (data.success) {
                return data.book;
            }
            return null;
        }
        catch (err) {
            console.error(err);
            return null;
        }
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
        let reviews;
        this.setState({ loading: true });
        await Promise.all([
            await this.setState({ bookid: this.props.match.params.bookid }),
            await this.setState({ book: await this.loadBook(this.state.bookid) }),
            await this.setState({ inLibrary: await isInLibrary(this.state.bookid) }),
            await this.props.loadReviews(this.state.bookid),
            reviews = await Promise.all(this.props.reviews.map(async review => [review, await this.getRatings(review.user._id, this.state.bookid)]))
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
        if (this.state.inLibrary) {
            if (await removeFromLibrary(this.state.bookid)) {
                await this.setState({ inLibrary: false });
            }
        }
        else {
            if (await addToLibrary(this.state.bookid)) {
                await this.setState({ inLibrary: true });
            }
        }
    }

    render() {

        if (this.state.needRedirect) {
            return <Redirect to='/login'></Redirect>
        }

        if (!this.state.book || !this.state.reviews || this.state.loading) {
            return <Spinner />;
        }

        return (
            <div>
                <Container style={{ border: 'ridge' }}>
                    <Row>
                        <Col md={4} lg={4}>
                            <Image src={this.state.book.cover ? this.state.book.cover : imgdefault} alt="Image" thumbnail />
                        </Col>
                        <Col md={8} lg={8} style={{ marginTop: '20px' }}>
                            <h3>{this.state.book.name}</h3>
                            <Row>
                                <Col lg={8}>
                                    <ListGroup horizontal>
                                        {this.state.book.genres.map(genre =>
                                            <ListGroup.Item key={genre.name}>
                                                {genre.name}
                                            </ListGroup.Item>)}
                                    </ListGroup>
                                    <ListGroup horizontal>
                                        <ListGroup.Item key="status" variant="primary">
                                            {this.state.book.completed === true ? "Completed" : "Ongoing"}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col lg={4}>
                                    <ButtonGroup style={{ marginBottom: '20px' }}>
                                        <Button variant="primary" onClick={this.onClickLibrary}>
                                            {this.state.inLibrary ? "Remove from library" : "Add to library"}
                                        </Button>
                                    </ButtonGroup> 
                                </Col>
                            </Row>


                            <p>Author: {this.state.book.author.username}</p>
                            <p>Rating: {this.state.book.ratings}</p>

                            <p>{this.state.book.sypnosis}</p>




                        </Col>

                    </Row>
                </Container>

                <ChapterList bookid={this.state.bookid} />

                <hr></hr>
                <ReviewForm bookid={this.state.bookid} />
                {!this.state.reviews ? null : <ReviewList reviews={this.state.reviews} bookid={this.state.bookid} />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    reviews: state.reviews,
});

export default withRouter(connect(
    mapStateToProps,
    { setAlert, loadReviews }
)(Book));
