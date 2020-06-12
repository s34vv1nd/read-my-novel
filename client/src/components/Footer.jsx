import React, { Component } from 'react';
import { Button, Nav, Navbar, Row, Col, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export default class Footer extends Component {
    render() {

        return (
            <div class="jumbotron bg-secondary text-white ">
                <div class="row">
                    <div class="col-sm-6">
                        <h3> READ MY NOVEL</h3>
                        <span>
                            <Link to="#"> <i className="fa fa-facebook-f contact"></i></Link>
                            <Link to="#"> <i className="fa fa-instagram contact"></i></Link>
                            <Link to="#"> <i className="fa fa-twitter contact"></i></Link>
                        </span>
                        <p id="footer_copyright"> Long &copy; 2020 </p>
                    </div>

                    <div class="col-sm-2">
                        <h4>TEAMS</h4>
                        <span><Link to="#">About</Link></span><br />
                        <span><Link to="#">Guideline</Link></span><br />
                    </div>
                    <div class="col-sm-2">
                        <h4>RESOURCES</h4>
                        <span><Link to="#">Download Apps</Link></span><br />
                        <span><Link to="#">Be an Author</Link></span><br />
                        <span><Link to="#">Help Center</Link></span><br />
                        <span><Link to="#">Privacy Policy</Link></span><br />
                        <span><Link to="#">Term of Service</Link></span><br />
                    </div>
                    <div class="col-sm-2">
                        <h4>REFERALS</h4>
                        <span><Link to="#">Webnovel</Link></span><br />
                    </div>

                </div>
            </div>
        )
    }
}

