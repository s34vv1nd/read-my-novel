import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../Spinner';
//import { Star } from "@material-ui/icons";

const ReviewBookList = ({
    review,
    bookid
}) => {
    const [rating, setRating] = useState(null);

    const getRating = async (book_id, user_id) => {
        try {
            const res = await axios.get('api/ratings', {
                params: {
                    user: user_id,
                    book: book_id
                }
            });

            if (res.data != 0) return res.data;
            return null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const rate = await getRating(bookid, review.user._id);
            await setRating(rate);
        }
        asyncFunc();
    }, []);

    if (!review) {
        return <Spinner />;
    }

    return (

        <div class="row">
            <div class="col-md-2 text-center">
                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" style={{ width: '50%' }} />
                <p class="text-secondary text-center">Created at: {review.createdAt}</p>
            </div>
            <div class="col-md-10">
                <p>
                    <a class="float-left" href="#"><strong>{review.user.username}</strong></a>
                </p>
                <hr />
                
                <div class="clearfix"></div>
                <p>{review.content}</p>
                <p>
                    <a class="float-right btn text-white btn-danger"> <i class="fa fa-heart"></i> Like</a>
                </p>
            </div>
        </div>

    );
}

export default ReviewBookList;