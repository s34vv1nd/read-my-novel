import React, { Component } from 'react';


export default class Comment extends Component {
    render() {
        return (
            <div class="container">
                <h2 class="text-center">Comment List</h2>

                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2">
                                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
                                <p class="text-secondary text-center">15 Minutes Ago</p>
                            </div>
                            <div class="col-md-10">
                                <p>
                                    <a class="float-left" href="#"><strong>Long Nguyen</strong></a>
                                    <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                    <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                    <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                    <span class="float-right"><i class="text-warning fa fa-star"></i></span>

                                </p>
                                <div class="clearfix"></div>
                                <p>This book is awesome!!!</p>
                                <p>
                                    <a class="float-right btn text-white btn-danger"> <i class="fa fa-heart"></i> Like</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
