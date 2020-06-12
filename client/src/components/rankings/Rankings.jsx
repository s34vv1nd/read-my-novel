import React, { Component } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
import styles from './Rankings.module.css';
// import './Rankings.module.css';
import { loadRankings } from '../../actions/rankings';
import { connect } from 'react-redux';


class Rankings extends Component {
    constructor() {
        super();
        this.state = {
            
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        await this.props.loadRankings();
    }

    render() {
        return (
            <>
                <h2> Power Ranking</h2>
                <Container>
                    {this.props.books.map(book =>
                        <Row className={styles.bookRow} key={this.props.books.indexOf(book) + 1}>
                            <Container className={styles.bookContainer}>
                                <Row>
                                    <Col xs={9} md={1}> <h4>{this.props.books.indexOf(book) + 1}</h4>  </Col>
                                    <Col xs={9} md={1}>
                                        <Image width="100" height="80" src="" alt="Image" thumbnail />
                                    </Col>
                                    <Col xs={9} md={7}>
                                        <h4><Link to={{
                                            pathname: '/book/' + book._id,
                                            state: { id: book._id }
                                        }}>{book.name}</Link></h4>
                                        <p>Author: {book.author.username}</p>
                                        <p>Rating: {book.ratings} </p>

                                    </Col>
                                    <Col xs={9} md={3}>
                                        <Link to={{
                                            pathname: '/book/' + book._id,
                                            state: { id: book._id }
                                        }}><button type="button" class="btn btn-primary" >Read</button></Link>
                                        <button type="button" class="btn btn-primary">Vote</button>

                                    </Col>
                                </Row>

                            </Container>


                        </Row>
                    )}

                </Container>
            </>
        )
    }
}

const mapStateToProps = state => ({
    books: state.rankings.books,
});

export default connect(
    mapStateToProps,
    { loadRankings }
)(Rankings);
