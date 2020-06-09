import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
            <div className="container">
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            Email address
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email address"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm password"
                            value={this.state.confirmPassword}
                            onChange={this.onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
                <Link to='/login'><small>Already have an account?</small></Link>
            </div>
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
