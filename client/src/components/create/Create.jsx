import React, { Component, Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookList from './BookList';
import NewBookForm from './NewBookForm';
import { getBooksCreated } from '../../actions/creation';

class Create extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }
        
        this.props.getBooksCreated();

        return (
            <Fragment>
                <NewBookForm />
                <BookList />
            </Fragment>
        )
    }
}

Create.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {getBooksCreated}
)(Create);