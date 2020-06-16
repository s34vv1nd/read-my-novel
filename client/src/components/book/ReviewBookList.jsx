import React, { Component, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

const ReviewBookList = ({
    reviews,
}) => {
    const [rating, setRating] = useState(null);

    const getRating = async (bookid, userid) => {
        try {
            const res = await axios.get('api/ratings', {
                params: {
                    user: userid,
                    book: bookid
                }
            });

            console.log(res.data);
            if(res.data) return res.data;
            return 0;
        } catch(err) {
            console.log(err);
            return 0;
        }
    }

    useEffect

    if (!reviews) {
        return <p>Not available reviews. Create now!</p>
    }

    return (
        <div class="container" style={{ marginTop: '20px' }}>
            <h2>Other review</h2>

            <div class="card">
                <div class="card-body">
                    {reviews.map(review =>
                        <div class="row">
                            <div class="col-md-2">
                                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
                                <p class="text-secondary text-center">Created at: {review.createdAt}</p>
                            </div>
                            <div class="col-md-10">
                                {/* <p>
                                    <a class="float-left" href="#"><strong>{review.user.username}</strong></a>
                                    <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                    <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                    <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                    <span class="float-right"><i class="text-warning fa fa-star"></i></span>

                                </p> */}
                                {}
                                {/* <Rating initialRating={rating} readonly /> */}
                                <div class="clearfix"></div>
                                <p>{review.content}</p>
                                <p>
                                    <a class="float-right btn text-white btn-danger"> <i class="fa fa-heart"></i> Like</a>
                                </p>
                            </div>
                        </div>)
                    }

                </div>
            </div>
        </div>
    );
}

export default ReviewBookList;