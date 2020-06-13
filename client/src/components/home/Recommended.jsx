import React, { Component } from 'react';
import { Link } from 'react-router-dom'


export default class Recommended extends Component {
    render() {
        return (
            <div class="row" style={{ border: 'ridge', backgroundColor: 'white' }}>
                <div class="col-md-4">
                    <div class="card" style={{ marginTop: '50px' }}>
                        <img class="card-img-top" src="img_avatar1.png" alt="Book image"></img>
                        <div class="card-body">
                            <h4 class="card-title"><Link to="#">Name</Link></h4>
                            <p class="card-text">Book intro</p>
                            <a href="#" class="btn btn-primary">READ</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="row" style={{ marginTop: '20px' }}>
                        <div class="col-md-3">
                            <div class="card" >
                                <img class="card-img-top" src="img_avatar1.png" alt="Book image"></img>
                                <div class="card-body">
                                    <h4 class="card-title"><Link to="#">Name</Link></h4>
                                    <p class="card-text">Book intro</p>
                                    <a href="#" class="btn btn-primary">READ</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card" >
                                <img class="card-img-top" src="img_avatar1.png" alt="Book image"></img>
                                <div class="card-body">
                                    <h4 class="card-title"><Link to="#">Name</Link></h4>
                                    <p class="card-text">Book intro</p>
                                    <a href="#" class="btn btn-primary">READ</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card" >
                                <img class="card-img-top" src="img_avatar1.png" alt="Book image"></img>
                                <div class="card-body">
                                    <h4 class="card-title"><Link to="#">Name</Link></h4>
                                    <p class="card-text">Book intro</p>
                                    <a href="#" class="btn btn-primary">READ</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card" >
                                <img class="card-img-top" src="img_avatar1.png" alt="Book image"></img>
                                <div class="card-body">
                                    <h4 class="card-title"><Link to="#">Name</Link></h4>
                                    <p class="card-text">Book intro</p>
                                    <a href="#" class="btn btn-primary">READ</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <div class="col-md-3">
                            <div class="card" >
                                <img class="card-img-top" src="img_avatar1.png" alt="Book image"></img>
                                <div class="card-body">
                                    <h4 class="card-title"><Link to="#">Name</Link></h4>
                                    <p class="card-text">Book intro</p>
                                    <a href="#" class="btn btn-primary">READ</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card" >
                                <img class="card-img-top" src="img_avatar1.png" alt="Book image"></img>
                                <div class="card-body">
                                    <h4 class="card-title"><Link to="#">Name</Link></h4>
                                    <p class="card-text">Book intro</p>
                                    <a href="#" class="btn btn-primary">READ</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card" >
                                <img class="card-img-top" src="img_avatar1.png" alt="Book image"></img>
                                <div class="card-body">
                                    <h4 class="card-title"><Link to="#">Name</Link></h4>
                                    <p class="card-text">Book intro</p>
                                    <a href="#" class="btn btn-primary">READ</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card" >
                                <img class="card-img-top" src="img_avatar1.png" alt="Book image"></img>
                                <div class="card-body">
                                    <h4 class="card-title"><Link to="#">Name</Link></h4>
                                    <p class="card-text">Book intro</p>
                                    <a href="#" class="btn btn-primary">READ</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
