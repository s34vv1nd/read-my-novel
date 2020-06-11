import React, { Component, Fragment, useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BookList = ({
    books,
}) => {
    return  (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Genres</th>
                    <th>Status</th>
                    <th>Rating</th>
                    <th>Created at</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book =>
                    <tr key={books.indexOf(book) + 1}>
                        <td>{books.indexOf(book) + 1}</td>
                        <td><Link to="#">{book.name}</Link></td>
                        <td>{book.genres.map(genre => `${genre['name'] || genre} `)}</td>
                        <td>{book.completed ? "Completed" : "Ongoing"}</td>
                        <td>{book.rating}</td>
                        <td>{book.createdAt}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    );
}

export default BookList;