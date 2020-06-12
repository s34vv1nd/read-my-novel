import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Chapter extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        return (
            <div>
                <p>Chapter</p>
            </div>
        )
    }
}

Chapter.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
)(Chapter);
