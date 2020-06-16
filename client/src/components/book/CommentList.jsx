import React, { Component, Fragment, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';


const CommentList = ({
    comments
}) => {

    if (!comments || comments.length == 0) {
        return <p>This book is not have any comment. Comment now!</p>
    }

    return (
        <>
        {
            comments.map(comment =>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>{comment.user.username}</Form.Label>
                        <Form.Control as="textarea" rows="3"  value={comment.content} readOnly />
                    </Form.Group>
                </Form>)
        }
        </>
    );
}

export default CommentList;