import React, { Component } from 'react';
import { Button, Table, ButtonGroup } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadBook } from '../../actions/book';


class ViewChapters extends Component {
    constructor() {
        super();
        this.state = {
            bookid: ''
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        await this.setState({
            bookid: this.props.match.params.bookid
        });

        await this.props.loadBook(this.state.bookid);
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        return (
            <>
                <h2>{this.props.book.name}</h2>
                {this.props.chapters && this.props.chapters[0] ?
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Chapter #</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Created at</th>
                                <th>Last update</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.chapters.map(chapter =>
                                <tr key={this.props.chapters.indexOf(chapter) + 1}>
                                    <td>{this.props.chapters.indexOf(chapter) + 1}</td>
                                    <td>{chapter.number}</td>
                                    <td><Link to={{
                                        pathname: '/create/book/' + this.state.bookid + '/chapter/' + chapter._id,
                                        state: { id: chapter._id }
                                    }}>{chapter.name}</Link></td>
                                    <td>{chapter.published ? "Publish" : "Not publish"}</td>
                                    <td>{chapter.createdAt}</td>
                                    <td>{chapter.updatedAt}</td>
                                    <td><Link to={{
                                        pathname: '/create/book/' + this.state.bookid + '/chapter/' + chapter._id,
                                        state: { id: chapter._id }
                                    }}><Button>Update</Button></Link></td>
                                    <td><Button>Delete</Button></td>
                                </tr>)
                            }
                        </tbody>
                    </Table>
                    :
                    <p>No chapter available</p>
                }

                <ButtonGroup>
                    <Link to={{
                        pathname: '/create/book/' + this.state.bookid + '/chapter'
                    }}><Button>Create chapter</Button></Link>
                    <Button>Delete book</Button>
                </ButtonGroup>

            </>
        )
    }
}

ViewChapters.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    book: state.book.book,
    chapters: state.book.chapters,
});

export default connect(
    mapStateToProps,
    { loadBook }
)(ViewChapters);