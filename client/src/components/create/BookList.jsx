import React, { Component, Fragment, useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBooksCreated } from '../../actions/creation';
import Spinner from '../Spinner';

const BookList = ({
    books,
    loadingbook,
    getBooksCreated
}) => {
    return  (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Book name</th>
                    <th>Book genres</th>
                    <th>Status</th>
                    <th>Date created</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book =>
                    <tr key={books.indexOf(book) + 1}>
                        <td>{books.indexOf(book) + 1}</td>
                        <td>{book.name}</td>
                        <td>{book.genres.map(genre => `${genre['name'] || genre} `)}</td>
                        <td>{book.completed ? "Completed" : "Ongoing"}</td>
                        <td>{book.date_created}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    );
}


// BookList.propTypes = {
//     books: PropTypes.arrayOf(PropTypes.exact({
//         author: PropTypes.string,
//         name: PropTypes.string,
//         genres: PropTypes.arrayOf(PropTypes.string),
//         completed: PropTypes.bool,
//         ratings: PropTypes.number,
//         date_created: PropTypes.instanceOf(Date)
//     })),
//     getBooksCreated: PropTypes.func
// };

const mapStateToProps = state => ({
    books: state.creation.books,
    loadingbook: state.creation.loadingbook
});

export default connect(
    mapStateToProps,
    { getBooksCreated }
)(BookList);