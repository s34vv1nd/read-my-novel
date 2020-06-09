import React, { Component, Fragment } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Create extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        return (
            <Fragment>
                <Row>
                    <Col>
                        <Button>

                        </Button>
                    </Col>
                </Row>
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
)(Create);
