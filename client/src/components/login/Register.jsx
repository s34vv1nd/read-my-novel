import React, { Component } from 'react';

export default class Register extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">
                            Username
                        </label>
                        <input type="text" className="form-control" id="username" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email address
                        </label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" className="form-control" id="password" placeholder="Enter password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">
                            Confirm password
                        </label>
                        <input type="password" className="form-control" id="confirm-password" placeholder="Confirm password" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
            </div>
        )
    }
}