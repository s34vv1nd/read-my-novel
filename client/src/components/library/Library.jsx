import React, { Component, Fragment } from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {loadLibrary} from '../../actions/library';
import { removeFromLibrary } from '../../actions/book';
import Spinner from '../Spinner';

class Library extends Component {
    constructor() {
        super();
        this.state = {
            bookid: '',
            loading: true
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this);
    }

    async componentDidMount() {
        await this.props.loadLibrary().then(() => {
            this.setState({loading: false});
        })
    }

    async onClickRemove(e) {
        e.preventDefault();
        await this.setState({
            bookid: e.target.value
        });

        await removeFromLibrary(e.target.value);
        await this.props.loadLibrary();
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        if (this.state.loading) {
            return <Spinner />
        }

        return (
            <>
                <h2 style={{textAlign:'center', marginTop:'20px'}}>Library</h2>
                {(this.props.books && this.props.books[0])?
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book name</th>
                                <th>Book genres</th>
                                <th>Status</th>
                                <th>Last update</th>
                                <th>Bookmark</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.books.map(book =>
                                <tr key={this.props.books.indexOf(book) + 1}>
                                    <td>{this.props.books.indexOf(book) + 1}</td>
                                    <td><Link to={'/book/' + book.book._id}>{book.book.name}</Link></td>
                                    <td>{book.book.genres.map(genre => `${genre.name || genre}, `)}</td>
                                    <td>{book.book.completed ? "Completed" : "Ongoing"}</td>
                                    <td>{new Date(book.updatedAt).toLocaleDateString("en-US")}</td>
                                    <td>{book.bookmark === 0 ? null :
                                        (<Link to={'/book/' + book.book._id + '/' + book.bookmark_id}>
                                            {'Chapter ' + book.bookmark}
                                        </Link>)}
                                    </td>
                                    <td><Button variant="danger" onClick={this.onClickRemove} value={book.book._id}>X</Button></td>
                                </tr>)
                            }
                        </tbody>
                    </Table>

                    :
                    <p>You haven't added any books yet. It’s time to <Link to='/browse'>EXPLORE</Link></p>
                }

            </>
        )
    }
}

Library.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    books: state.library.books,
});

export default connect(
    mapStateToProps,
    { loadLibrary }
)(Library);
