import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../Spinner';
//import { Star } from "@material-ui/icons";

const ReviewList = ({
    bookid,
    reviews
}) => {

    if (!reviews || !bookid) {
        return <Spinner />;
    }

    const displayReview = (review) => (
        <div className="row">
            <div className="col-md-2 text-center">
                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" style={{ width: '50%' }} />
                <p className="text-secondary text-center">Created at: {review.createdAt}</p>
            </div>
            <div className="col-md-10">
                <p>
                    <a className="float-left" href="#"><strong>{review.user.username}</strong></a>
                </p>
                <hr />

                <div className="clearfix"></div>
                <p>{review.content}</p>
                {/* <p>
                    <a className="float-right btn text-white btn-danger"> <i className="fa fa-heart"></i> Like</a>
                </p> */}
            </div>
        </div>
    )

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <h2>REVIEWS:</h2>

            <div className="card">
                <div className="card-body">
                    {reviews.map(review => displayReview(review))}
                </div>
            </div>
        </div>

    );
}

const mapStateToProps = state => ({
    reviews: state.reviews,
});

export default withRouter(connect(
    mapStateToProps,
)(ReviewList));