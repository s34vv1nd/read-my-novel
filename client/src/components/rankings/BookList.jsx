import React, { Component, Fragment, useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BookList = ({
    books,
}) => {
    return  (
        <Table responsive>
            <tbody>
                {books.map(book =>
                    <tr key={books.indexOf(book) + 1}>
                        <td>{books.indexOf(book) + 1}</td>
                        {/* <td><Image width="100" height="80" src="" alt="Image" thumbnail /></td> */}
                        <td><Link to="#">{book.name}</Link></td>
                        <td>{book.genres.map(genre => `${genre['name'] || genre} `)}</td>
                        <td>{book.completed ? "Completed" : "Ongoing"}</td>
                        <td>{book.rating}</td>
                        <td> <button type="button" class="btn btn-primary">Vote</button></td>
                        <td><button type="button" class="btn btn-primary">Read</button></td>
                    </tr>)
                }
            </tbody>
        </Table>
    );
}

export default BookList;