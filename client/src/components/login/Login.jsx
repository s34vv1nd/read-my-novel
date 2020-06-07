import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';

export default withRouter(class Login extends Component {
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
        this.setState({[e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        if (1) {
            this.props.history.push('/');
        }
    }

    render() {
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
            </div>
        )
    }
})