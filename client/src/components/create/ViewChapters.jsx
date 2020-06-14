import React, { Component } from 'react';
import { Button, Table, ButtonGroup } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadBook } from '../../actions/book';
import { deleteBook, deleteChapter, createChapter } from '../../actions/creation';


class ViewChapters extends Component {
    constructor() {
        super();
        this.state = {
            bookid: '',
            chapid: ''
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onClickCreateChapter = this.onClickCreateChapter.bind(this);
        this.onClickDeleteBook = this.onClickDeleteBook.bind(this);
        this.onClickDeleteChapter = this.onClickDeleteChapter.bind(this);
    }

    async componentDidMount() {
        await this.setState({
            bookid: this.props.match.params.bookid
        });

        await this.props.loadBook(this.state.bookid);
    }

    async onClickDeleteChapter(e) {
        e.preventDefault();
        await this.setState({
            chapid: e.target.value
        });

        await this.props.deleteChapter(this.state.bookid, this.state.chapid);
        await this.props.loadBook(this.state.bookid);
    }

    async onClickDeleteBook(e) {
        e.preventDefault();
        await this.props.deleteBook(this.state.bookid);
        this.props.history.goBack();
    }

    async onClickCreateChapter(e) {
        e.preventDefault();
        await this.props.createChapter({
            bookid: this.state.bookid, 
            name: "Chapter Name", 
            content: "Chapter Content", 
            price: 0
        });

        //console.log(this.props.newchapter);
        this.props.history.push('/create/book/' + this.state.bookid + '/chapter/' + this.props.newchapter._id);
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
                                    <td><Button onClick={this.onClickDeleteChapter} value={chapter._id}>Delete</Button></td>
                                </tr>)
                            }
                        </tbody>
                    </Table>
                    :
                    <p>No chapter available</p>
                }

                <ButtonGroup>
                    <Button onClick={this.onClickCreateChapter}>Create chapter</Button>
                    <Button onClick={this.onClickDeleteBook}>Delete book</Button>
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
    newchapter: state.creation.chapter
});

export default connect(
    mapStateToProps,
    { loadBook, deleteBook, deleteChapter, createChapter }
)(ViewChapters);