import React, { Component, Fragment, useEffect } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import BookList from './BookList';
import {
    Redirect
} from "react-router-dom";
import { loadRankings } from '../../actions/rankings';

class Rankings extends Component {
    constructor() {
        super();
        this.state = {
          
        }

        this.onChange = this.onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        await this.props.loadRankings();
    }

    async onChange(e) {
        await this.setState({ [e.target.id]: e.target.value });
        await this.props.loadRankings();
    }


    render() {
        
        return (
            <>
                <h2>Power Rankings</h2>
                <Container>
                    <Row>
                       
                    </Row>
                </Container>

                <Fragment>
                    <BookList books={this.props.books} />
                </Fragment>

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
