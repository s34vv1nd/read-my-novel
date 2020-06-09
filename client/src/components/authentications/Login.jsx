import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { login } from '../../actions/auth';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
            redirect: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    render() {
        //let location = useLocation();
        let { from } = this.props.location.state || { from: { pathname: "/" } };

        if (this.props.isAuthenticated) {
            console.log(this.props.location);
            return <Redirect to={from} />;
        }

        return (
            <>
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.onChange} value={this.state.email} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.onChange} value={this.state.password} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Link to='/register'><small>Did not have an account?</small></Link>
            </>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { login }
)(withRouter(Login));