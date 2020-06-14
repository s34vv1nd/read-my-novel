import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookList from './BookList';
import { loadUser } from '../../actions/auth';
import { getBooksCreated } from '../../actions/creation';

class Create extends Component {
    constructor() {
        super();
        this.state = {

        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        await this.props.loadUser();
        await this.props.getBooksCreated(this.props.user._id);
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        return (
            <>
                <Fragment>
                    <BookList books={this.props.books} />
                </Fragment>
                <Link to='/create/book'><Button>Create book</Button></Link>
            </>
        )
    }
}

Create.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
    books: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    books: state.creation.books,
});

export default connect(
    mapStateToProps,
    { loadUser, getBooksCreated }
)(Create);