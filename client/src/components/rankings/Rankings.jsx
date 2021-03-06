import React, { Component } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { loadRankings } from '../../actions/rankings';
import { connect } from 'react-redux';

// import styles from './Rankings.module.css';
import './Rankings.css';
import Spinner from '../layout/Spinner';

const imgdefault = "https://gitensite.s3.amazonaws.com/bookcovers/7573.jpg"


class Rankings extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        await this.props.loadRankings();
    }

    render() {
        if (!this.props.books) {
            return <Spinner />
        }

        return (
            <>
                <h2 style={{textAlign:'center', marginTop:'20px'}}> Power Ranking</h2>
                <Container>
                    {this.props.books.map(book =>
                        <Row className="bookRow" key={this.props.books.indexOf(book) + 1}>
                            <Container className="bookContainer">
                                <Row>
                                    <Col md={12} lg={1}> <h4 style={{color:'blue'}}>{this.props.books.indexOf(book) + 1}</h4>  </Col>
                                    <Col md={3} lg={2}>
                                        <Image width="100" height="80" src={book.cover ? book.cover : imgdefault} alt="Image" thumbnail 
                                        style={{margin: 'auto', display: 'block'}}/>
                                    </Col>
                                    <Col md={6} lg={6}>
                                        <h4><Link to={{
                                            pathname: '/book/' + book._id,
                                            state: { id: book._id }
                                        }}>{book.name}</Link></h4>
                                        <p>Author: {book.author.username}</p>
                                        <p>Rating: {book.ratings} </p>

                                    </Col>
                                    <Col xs={6} lg={3}>
                                        <Link to={{
                                            pathname: '/book/' + book._id,
                                            state: { id: book._id }
                                        }}><button type="button" className="btn btn-primary " style={{marginRight: '10px'}} >Read</button></Link>
                                        <button type="button" className="btn btn-primary" >Vote</button>

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
