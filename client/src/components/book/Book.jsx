import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Image, ListGroup, ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import ChapterList from './ChapterList';
import { loadBook } from '../../actions/book';
import {setAlert} from '../../actions/alert';
import { isInLibrary, addToLibrary, removeFromLibrary } from '../../actions/library';

class Book extends Component {

    constructor(props) {
        super();
        this.state = {
            inLibrary: false,
            needRedirect: false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onClickLibrary = this.onClickLibrary.bind(this);
    }

    async componentDidMount() {
        const bookid = this.props.match.params.bookid;
        await this.props.loadBook(bookid);
        const inLibrary = await isInLibrary(bookid);
        if (inLibrary === true) {
            // In library
            await this.setState({ inLibrary: true });
        }
        else {
            // Not in library
            await this.setState({ inLibrary: false });
        }
    }

    async onClickLibrary(e) {
        e.preventDefault();
        if (!this.props.isAuthenticated) {
            await this.props.setAlert('Please login to bookmark!', 'info');
            await this.setState({needRedirect: true});
            return;
        }
        const bookid = this.props.match.params.bookid;
        const inLibrary = await isInLibrary(bookid);
        if (inLibrary) {
            if (await removeFromLibrary(bookid)) {
                await this.setState({ inLibrary: false });
            }
        }
        else {
            if (await addToLibrary(bookid)) {
                await this.setState({ inLibrary: true });
            }
        }
    }

    render() {

        if (this.state.needRedirect) {
            return <Redirect to='/login'></Redirect>
        }

        return (
            <>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <Image src="" alt="Image" thumbnail />
                        </Col>
                        <Col xs={12} md={4}>
                            {
                                (this.props.chapters && this.props.chapters[0]) ?
                                    <h3><Link to={{
                                        pathname: '/book/' + this.props.match.params.bookid + '/' + this.props.chapters[0]._id,
                                    }}>Name: {this.props.book.name}</Link></h3>
                                : 
                                    <h3>{this.props.book.name}</h3>
                            }
                            <ListGroup horizontal>
                                {this.props.book.genres.map(genre => <ListGroup.Item key={genre.name}>{genre.name}</ListGroup.Item>)}
                                <ListGroup.Item key="status">{this.props.book.completed == true ? "Completed" : "Ongoing"}</ListGroup.Item>
                            </ListGroup>
                            <p>Author: {this.props.book.author.username}</p>
                            <p>Rating: {this.props.book.ratings}</p>
                            <ButtonGroup>
                                <Button variant="primary" onClick={this.onClickLibrary}>
                                    {this.state.inLibrary ? "Remove from library" : "Add to library"}
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>

                <Fragment>
                    <ChapterList chapters={this.props.chapters} bookid={this.props.match.params.bookid} />
                </Fragment>


            </>
        );
    }
}

const mapStateToProps = state => ({
    book: state.book.book,
    books: state.browse.books,
    chapters: state.book.chapters,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { loadBook, isInLibrary, setAlert }
)(Book);
