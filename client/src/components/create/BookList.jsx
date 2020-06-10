import React, { Component, Fragment } from 'react';
import {Row, Col, Button, Table} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getBooksCreated } from '../../actions/creation';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: null
        }
    }

    render() {
                
        if (this.props.books) {
            this.state.bookList = this.props.books.map(book =>
                <tr>
                    <td>{ this.props.books.indexOf(book) }</td>
                    <td>{ book.name }</td>
                    <td>{ book.genres.map(genre => `${genre} `) }</td>
                    <td>{ book.completed ? "Completed" : "Ongoing" }</td>
                    <td>{ book.Date }</td>
                </tr>
            );
        }

        return (
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
                    {this.state.bookList}
                </tbody>
            </Table>
        );
    }
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
    books: state.creation.books
});

export default connect(
    mapStateToProps,
    {getBooksCreated}
)(BookList);