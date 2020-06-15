import React, { Component } from 'react';
import { Button, Nav, Navbar, Row, Col, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Footer.css';


export default class Footer extends Component {
    render() {

        return (
            <div class="jumbotron bg-secondary text-white" style={{marginTop: '50px'}}>
                <div class="row">
                    <div class="col-md-6">
                        <h3> READ MY NOVEL</h3>
                        <div className="icon">
                            <Link to="#" className="link"> <i className="fa fa-facebook-f contact"></i></Link>
                            <Link to="#" className="link"> <i className="fa fa-instagram contact"></i></Link>
                            <Link to="#" className="link"> <i className="fa fa-twitter contact"></i></Link>
                        </div>
                        <p id="footer_copyright"> Long &copy; 2020 </p>
                    </div>

                    <div class="col-md-2">
                        <h5>TEAMS</h5>
                        <span><Link to="#" className="link">About</Link></span><br />
                        <span><Link to="#" className="link">Guideline</Link></span><br />
                    </div>
                    <div class="col-md-2">
                        <h5>RESOURCES</h5>
                        <span><Link to="#" className="link">Download Apps</Link></span><br />
                        <span><Link to="#" className="link">Be an Author</Link></span><br />
                        <span><Link to="#" className="link">Help Center</Link></span><br />
                        <span><Link to="#" className="link">Privacy Policy</Link></span><br />
                        <span><Link to="#" className="link">Term of Service</Link></span><br />
                    </div>
                    <div class="col-md-2">
                        <h5>REFERALS</h5>
                        <span><Link to="#" className="link">Webnovel</Link></span><br />
                    </div>

                </div>
            </div>
        )
    }
}

