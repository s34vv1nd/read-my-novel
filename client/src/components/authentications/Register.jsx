import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {},
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            this.props.setAlert('Passwords do not match', 'danger')
        } else {
            this.props.register({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            });
        }
    }

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to='/'></Redirect>;
        }

        return (
            <Fragment>
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" 
                        onChange={this.onChange} value={this.state.username} />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" 
                        onChange={this.onChange} value={this.state.email} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" 
                        onChange={this.onChange} value={this.state.password} />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" 
                        onChange={this.onChange} value={this.state.confirmPassword} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Link to='/login'><small>Already have an account?</small></Link>
            </Fragment>
        )
    }
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);
