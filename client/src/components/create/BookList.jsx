import React, { Component, Fragment, useEffect } from 'react';
import { Table } from 'react-bootstrap';

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