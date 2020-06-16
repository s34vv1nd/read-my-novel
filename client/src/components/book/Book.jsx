import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Image, ListGroup, ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';
import ChapterList from './ChapterList';
import { setAlert } from '../../actions/alert';
import { addToLibrary, removeFromLibrary } from '../../actions/library';
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
            needRedirect: false
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

    isInLibrary = async (bookid) => {
        const { data } = await axios.get('api/library', {
            params: {
                bookid: bookid
            }
        })
        if (data.success && data.books != 0) return true;
        return false;
    }

    getReviews = async (bookid) => {
        try {
            const res = await axios.get('api/books/' + bookid + '/reviews', {
                params: {
                    // user: userid,
                }
            });
            console.log(res.data);
            if (res.data.success) return res.data.reviews;
            return null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async componentDidMount() {
        await this.setState({ bookid: this.props.match.params.bookid });
        await this.setState({ book: await this.loadBook(this.state.bookid) });
        await this.setState({ reviews: await this.getReviews(this.state.bookid) });
        await this.setState({ inLibrary: await this.isInLibrary(this.state.bookid) });
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

        if (!this.state.book) {
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
                            <ListGroup horizontal>
                                {this.state.book.genres.map(genre => <ListGroup.Item key={genre.name}>{genre.name}</ListGroup.Item>)}
                                <ListGroup.Item key="status">
                                    {this.state.book.completed === true ? "Completed" : "Ongoing"}
                                </ListGroup.Item>
                            </ListGroup>
                            <p></p>
                            <p>Author: {this.state.book.author.username}</p>
                            <p>Rating: {this.state.book.ratings}</p>
                            <ButtonGroup style={{ marginBottom: '20px' }}>
                                <Button variant="primary" onClick={this.onClickLibrary}>
                                    {this.state.inLibrary ? "Remove from library" : "Add to library"}
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>

                <Fragment>
                    <ChapterList bookid={this.state.bookid} />
                </Fragment>

                <Fragment>
                    <hr></hr>
                    <ReviewForm bookid={this.state.bookid} />
                </Fragment>


                <div class="container" style={{ marginTop: '50px' }}>
                    <h2>REVIEWS:</h2>

                    <div class="card">
                        <div class="card-body">
                            {!this.state.reviews || this.state.reviews == 0 ? null : this.state.reviews.map(review =>
                                <Fragment>
                                    <ReviewList review={review} bookid={this.state.bookid} />
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default withRouter(connect(
    mapStateToProps,
    { setAlert }
)(Book));
