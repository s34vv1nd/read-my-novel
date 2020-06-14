import React, { Component } from 'react';
import { Button, Table, ButtonGroup } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';



class ViewChapters extends Component {
    constructor() {
        super();
        this.state = {
            bookid: '',
            chapid: '',
            book: {},
            chapters: [],
            isDeleted: false
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onClickCreateChapter = this.onClickCreateChapter.bind(this);
        this.onClickDeleteBook = this.onClickDeleteBook.bind(this);
        this.onClickDeleteChapter = this.onClickDeleteChapter.bind(this);
    }

    getCurrentBook = async (bookid) => {
        if (!bookid) return null 
        const res = await axios.get('api/books/' + bookid);
        if (!res.data.success) return null;
        return res.data.book;
    }
    
    getChapters = async (bookid) => {
        if (!bookid) return null 
        const res = await axios.get('api/books/' + bookid + '/chapters', {
            params: {
                published: false
            }
        });
        if (!res.data.success) return null;
        return res.data.chapters;
    }

    async componentDidMount() {
        await this.setState({
            bookid: this.props.match.params.bookid
        });
        await this.setState({book: await this.getCurrentBook(this.state.bookid)});
        await this.setState({chapters: await this.getChapters(this.state.bookid)});
    }

    async onClickDeleteChapter(e) {
        e.preventDefault();
        await this.setState({
            chapid: e.target.value
        });

        await axios.delete('/api/books/' + this.state.bookid + '/chapters/' + this.state.chapid);
        await this.setState({chapters: await this.getChapters(this.state.bookid)});
    }

    async onClickDeleteBook(e) {
        e.preventDefault();
        await axios.delete('api/books/' + this.state.bookid);
        await this.setState({isDeleted: true});
    }

    async onClickCreateChapter(e) {
        e.preventDefault();
        const res = await axios.post('api/books/' + this.state.bookid + '/chapters', {
            name: "Name", 
            content: "Content", 
            price: 0
        });

        this.props.history.push('/create/book/' + this.state.bookid + '/chapter/' + res.data.chapter._id);
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        if (this.state.isDeleted) {
            return <Redirect to='/create' />;
        }

        return (
            <>
                <h2>{this.state.book.name}</h2>
                {this.state.chapters && this.state.chapters[0] ?
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
                            {this.state.chapters.map(chapter =>
                                <tr key={this.state.chapters.indexOf(chapter) + 1}>
                                    <td>{this.state.chapters.indexOf(chapter) + 1}</td>
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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
)(ViewChapters);