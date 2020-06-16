import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Image, ListGroup, ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';
import ChapterList from './ChapterList';
import { setAlert } from '../../actions/alert';
import { isInLibrary, addToLibrary, removeFromLibrary } from '../../actions/library';
import ReviewBookForm from './ReviewBookForm'
import ReviewBookList from './ReviewBookList'


class Book extends Component {

    constructor(props) {
        super();
        this.state = {
            bookid: null,
            book: null,
            inLibrary: false,
            needRedirect: false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onClickLibrary = this.onClickLibrary.bind(this);
    }

    loadBook = async (bookid) => {
        try {
            const { data } = await axios.get('api/books/' + this.state.bookid);
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
        if (data.success) return true;
        return false;
    }

    async componentDidMount() {
        await this.setState({ bookid: this.props.match.params.bookid });
        await this.setState({ book: await this.loadBook(this.state.bookid) });
        await this.setState({ inLibrary: this.isInLibrary(this.state.bookid) });
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
            <>
                <Container style={{ border: 'ridge' }}>
                    <Row>
                        <Col xs={6} md={4}>
                            <Image src="" alt="Image" thumbnail />
                        </Col>
                        <Col xs={12} md={4}>
                            {
                                (this.state.chapters && this.state.chapters[0]) ?
                                    <h3><Link to={{
                                        pathname: '/book/' + this.state.bookid + '/' + this.state.chapters[0]._id,
                                    }}>Name: {this.state.book.name}</Link></h3>
                                    :
                                    <h3>{this.state.book.name}</h3>
                            }
                            <ListGroup horizontal>
                                {this.state.book.genres.map(genre => <ListGroup.Item key={genre.name}>{genre.name}</ListGroup.Item>)}
                                <ListGroup.Item key="status">
                                    {this.state.book.completed === true ? "Completed" : "Ongoing"}
                                </ListGroup.Item>
                            </ListGroup>
                            <p>Author: {this.state.book.author.username}</p>
                            <p>Rating: {this.state.book.ratings}</p>
                            <ButtonGroup>
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
                    <ReviewBookForm />
                    <ReviewBookList />
                </Fragment>


            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default withRouter(connect(
    mapStateToProps,
    { isInLibrary, addToLibrary, removeFromLibrary, setAlert }
)(Book));
