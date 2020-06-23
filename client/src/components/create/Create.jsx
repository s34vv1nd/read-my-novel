import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import BookList from './BookList';


class Create extends Component {
    constructor() {
        super();
        this.state = {
            userid: null,
            books: null
        }
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
        if (this.props.user)
            await this.setState({
                books: await this.getBooksCreated(this.props.user._id)
            });
    }

    async componentDidUpdate(prevProps) {
        if (this.props.user && (!prevProps.user || !this.state.books || prevProps.user._id !== this.props.user._id))
            await this.setState({
                books: await this.getBooksCreated(this.props.user._id)
            });
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        if (!this.props.user || !this.state.books) { return <Spinner /> }

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
    user: PropTypes.object,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default withRouter(connect(
    mapStateToProps,
)(Create));