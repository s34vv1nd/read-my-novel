import React, { Component, Fragment, useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';

const BookList = ({
    books,
}) => {
    if (!books) return <Spinner />
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Genres</th>
                    <th>Status</th>
                    <th>Ratings</th>
                    <th>Created at</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book =>
                    <tr key={books.indexOf(book) + 1}>
                        <td>{books.indexOf(book) + 1}</td>
                        <td><Link to={{
                            pathname: '/book/' + book._id,
                            state: { id: book._id }
                        }}>{book.name}</Link></td>
                        <td>{book.genres.map(genre => `${genre['name'] || genre} `)}</td>
                        <td>{book.completed ? "Completed" : "Ongoing"}</td>
                        <td>{book.ratings}</td>
                        <td>{book.createdAt}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    );
}

export default BookList;