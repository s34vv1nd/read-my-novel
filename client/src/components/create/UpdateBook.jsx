import React, { Component } from 'react';
import { Button, Table, ButtonGroup, Image, Spinner } from 'react-bootstrap';
import { Redirect, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
const imgdefault = "https://gitensite.s3.amazonaws.com/bookcovers/7573.jpg"


class UpdateBook extends Component {
    constructor() {
        super();
        this.state = {
            bookid: '',
            chapid: '',
            book: {},
            chapters: [],
            loading: true,
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
        await this.setState({ book: await this.getCurrentBook(this.state.bookid) });
        await this.setState({ chapters: await this.getChapters(this.state.bookid) });
        this.setState({loading: false});
    }

    async onClickDeleteChapter(e) {
        e.preventDefault();
        await this.setState({
            chapid: e.target.value
        });

        await axios.delete('/api/books/' + this.state.bookid + '/chapters/' + this.state.chapid);
        await this.setState({ chapters: await this.getChapters(this.state.bookid) });
    }

    async onClickDeleteBook(e) {
        e.preventDefault();
        await axios.delete('api/books/' + this.state.bookid);
        await this.setState({ isDeleted: true });
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
            console.log("Update book: ", this.props.location);
            return <Redirect to={{
                pathname: '/login',
                state: {
                    from: this.props.location
                }
            }} />;
        }

        if (this.state.isDeleted) {
            return <Redirect to='/create' />;
        }

        if (this.state.loading) return <Spinner />

        return (
            <>
                <h2>{this.state.book.name}</h2>
                <Image style={{width: "25%"}} src={this.state.book.cover ? this.state.book.cover : imgdefault} alt="Image" thumbnail />
                {this.state.chapters && this.state.chapters[0] ? (

                    <Table responsive>
                        <thead>
                            <tr>
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
                                    <td>{chapter.number}</td>
                                    <td>
                                        <Link to={'/create/book/' + this.state.bookid + '/chapter/' + chapter._id}>
                                            {chapter.name}
                                        </Link>
                                    </td>
                                    <td>{chapter.published ? "Published" : "Not published"}</td>
                                    <td>{new Date(chapter.createdAt).toLocaleDateString("en-US")}</td>
                                    <td>{new Date(chapter.updatedAt).toLocaleDateString("en-US")}</td>
                                    {/* <td>
                                        <Link to={'/create/book/' + this.state.bookid + '/chapter/' + chapter._id}>
                                            <Button>
                                                Update
                                            </Button>
                                        </Link>
                                    </td> */}
                                    <td><Button variant="danger" onClick={this.onClickDeleteChapter} value={chapter._id}>X</Button></td>
                                </tr>)
                            }
                        </tbody>
                    </Table>)
                    :
                    <p>No chapter available</p>
                }

                <ButtonGroup >
                    <Button onClick={this.onClickCreateChapter}>Create chapter</Button>
                    <Button onClick={this.onClickDeleteBook}>Delete book</Button>
                </ButtonGroup>

            </>
        )
    }
}

UpdateBook.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(
    mapStateToProps,
)(UpdateBook));