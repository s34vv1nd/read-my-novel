import React, { Component, Fragment, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookList from './BookList';
import NewBookForm from './NewBookForm';
import { getBooksCreated } from '../../actions/creation';

const Create = ({
    books,
    isAuthenticated,
    getBooksCreated
}) => {
    useEffect(() => {
        getBooksCreated();
    }, []);

    if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    return (
        <Fragment>
            <NewBookForm />
            <BookList books={books} />
        </Fragment>
    )
}


Create.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    books: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    books: state.creation.books,
});

export default connect(
    mapStateToProps,
    { getBooksCreated }
)(Create);