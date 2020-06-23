import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from './applogo.png';
import { logout } from '../../actions/auth';
import { AppName } from '../../GlobalVariables.js';
import SearchBar from './SearchBar';

class Header extends Component {
    render() {

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
                        <Link to="/library" className="nav-link"> Library </Link>
                    </Nav>
                    <Nav style={{paddingRight: "20px"}}>
                        <SearchBar />
                    </Nav>
                    <Nav>
                        
                    </Nav>
                    <Nav>
                        {this.props.isAuthenticated ?
                            <Button variant="primary" onClick={this.props.logout}> Logout </Button>
                            :
                            <Link to='/login'><Button variant="primary"> Login </Button></Link>
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
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps,
    { logout }
)(Header);