import React, { Component, Fragment, useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBooksCreated } from '../../actions/creation';
import Spinner from '../Spinner';

const BookList = ({
    books,
}) => {
    return  (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Book name</th>
                    <th>Book genres</th>
                    <th>Status</th>
                    <th>Created at</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book =>
                    <tr key={books.indexOf(book) + 1}>
                        <td>{books.indexOf(book) + 1}</td>
                        <td>{book.name}</td>
                        <td>{book.genres.map(genre => `${genre['name'] || genre} `)}</td>
                        <td>{book.completed ? "Completed" : "Ongoing"}</td>
                        <td>{book.createdAt}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    );
}

export default BookList;