import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../Spinner';
import BookList from './BookList';


class Create extends Component {
    constructor() {
        super();
        this.state = {
            userid: null,
            books: null
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    getBooksCreated = async (userid) => {
        try {
            const { data } = await axios.get('api/books', {
                params: {
                    author: userid
                }
            });
            if (data.success) return data.books;
            return null;
        }
        catch (err) {
            console.error(err);
            this.props.history.push('/');
            return null;
        }
    }

    async componentDidMount() {
        await this.setState({
            userid: await this.props.user._id
        });

        await this.setState({
            books: await this.getBooksCreated(this.state.userid)
        })

    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        if (!this.state.books) {
            return <Spinner />
        }

        return (
            <>
                <Fragment>
                    <BookList books={this.state.books} />
                </Fragment>
                <Link to='/create/book'><Button>Create book</Button></Link>
            </>
        )
    }
}

Create.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default withRouter(connect(
    mapStateToProps,
)(Create));