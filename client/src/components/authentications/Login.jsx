import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {useLocation} from 'react-router-dom';
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
            <div className="container">
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email"
                            value={this.state.email} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" className="form-control" id="password" placeholder="Enter password"
                            value={this.state.password} onChange={this.onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Log in
                    </button>

                </form>
                <Link to='/register'><small>Did not have an account?</small></Link>
            </div>
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