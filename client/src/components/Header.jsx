import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '.././applogo.png';
import { logout } from '../actions/authenticate';
import { AppName } from '../GlobalVariables.js';

class Header extends Component {
    render() {
        console.log(this.props.isAuthenticated + " " + (this.props.isAuthenticated ? "logout" : "login"));

        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Link to="/" className="navbar-brand">
                    <img src={logo} width="30" height="30" alt="ReadMyNovel" />
                </Link>
                <Link to="/" className="navbar-brand">{AppName}</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/browse" className="nav-link">Browse</Link>
                        <Link to="/rankings" className="nav-link">Ranking</Link>
                        <Link to="/create" className="nav-link">Create</Link>
                    </Nav>
                    <Nav>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </Nav>
                    <Nav>
                        <Link to="/library" className="nav-link">Library</Link>
                        <Link to="/notifications" className="nav-link">Notifications</Link>
                    </Nav>
                    <Nav>
                        {this.props.isAuthenticated ?
                            <Button variant="primary" onClick={this.props.logout}> Logout </Button>
                            :
                            <Button variant="primary" href="/login"> Login </Button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { logout }
)(Header);