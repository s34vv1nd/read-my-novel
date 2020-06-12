import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Image, ListGroup, ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import ChapterList from './ChapterList';
import { loadBook } from '../../actions/book';

class Book extends Component {

    constructor(props) {
        super();
        //this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        await this.props.loadBook(this.props.match.params.bookid);
        console.log(this.props.book);
    }

    render() {

        return (
            <>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <Image src="" alt="Image" thumbnail />
                        </Col>
                        <Col xs={12} md={4}>
                            <h3>Name: {this.props.book.name}</h3>
                            <ListGroup horizontal>
                                {this.props.book.genres.map(genre => <ListGroup.Item key={genre.name}>{genre.name}</ListGroup.Item>)}
                                <ListGroup.Item key="status">{this.props.book.completed == true ? "Completed" : "Ongoing"}</ListGroup.Item>
                            </ListGroup>
                            <p>Author: {this.props.book.author.username}</p>
                            <p>Rating: {this.props.book.ratings}</p>
                            <ButtonGroup>
                                <Button variant="primary">Read</Button>
                                <Button variant="primary">Add to library</Button>
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
    chapters: state.book.chapters
});

export default connect(
    mapStateToProps,
    { loadBook }
)(Book);
