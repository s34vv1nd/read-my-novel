import React, { Component, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../Spinner';
import { Button, Navbar } from 'react-bootstrap';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { updateBookmark } from '../../actions/library';


class Chapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookid: '',
            chapid: '',
            chapters: null,
            book: null,
            chapter: null,
            comments: null,
            needRedirect: false,
            loading: false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClickPrevChap = this.onClickPrevChap.bind(this);
        this.onClickNextChap = this.onClickNextChap.bind(this);
    }

    loadChapter = async (bookid, chapid) => {
        try {
            if (!bookid || !chapid) return null;
            const res_chapter = await axios.get('api/books/' + bookid + '/chapters/' + chapid);
            const res_book = await axios.get('api/books/' + bookid);
            const success = await updateBookmark({ bookid, chapnum: res_chapter.data.chapter.number });
            if (res_chapter.data.success && res_book.data.success) {
                return {
                    book: res_book.data.book,
                    chapter: res_chapter.data.chapter
                };
            }
            return null;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    getChapters = async (bookid) => {
        try {
            if (!bookid) return null;
            const { data } = await axios.get('api/books/' + bookid + '/chapters', {
                params: {
                    published: true
                }
            });
            if (!data.success) return null;
            return data.chapters;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    getComments = async (bookid, chapid) => {
        try {
            const res = await axios.get('api/books/' + bookid + '/chapters/' + chapid + '/comments');
            if (res.data.success) return res.data.comments;
            return null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async componentDidMount() {
        await this.setState({
            bookid: this.props.match.params.bookid,
            chapid: this.props.match.params.chapid
        })
        await this.setState(await this.loadChapter(this.state.bookid, this.state.chapid));
        await this.setState({ chapters: await this.getChapters(this.state.bookid) });
        await this.setState({ comments: await this.getComments(this.state.bookid, this.state.chapid) });
    }

    displayContent = (content) => {
        const paragraphs = content.split("\n");
        return paragraphs.map(p => (
            <p>{p}</p>
        ))
    }

    changeChapter = async (chapid) => {
        this.setState({ loading: true });
        await Promise.all(
            [await this.setState({ chapid }),
            await this.setState(await this.loadChapter(this.state.bookid, this.state.chapid)),
            await this.setState({ chapters: await this.getChapters(this.state.bookid) })],
            await this.setState({ comments: await this.getComments(this.state.bookid, this.state.chapid) })
        ).then(() => {
            this.setState({ loading: false });
        })
    }

    onChange = async (e) => {
        e.preventDefault();
        const newchap = e.target.value;
        if (newchap !== this.state.chapid) {
            this.changeChapter(newchap);
        }
    }

    onClickPrevChap = async () => {
        let num = this.state.chapter.number;
        const newchap = this.state.chapters.find(chap => chap.number === num - 1);
        this.changeChapter(newchap._id);
    }

    onClickNextChap = async () => {
        let num = this.state.chapter.number;
        const newchap = this.state.chapters.find(chap => chap.number === num + 1);
        await this.changeChapter(newchap._id);
    }

    chaptersNavBar = () => {
        return (
            <Navbar style={{ justifyContent: "center", alignItems: "stretch" }} noValidate>
                <Button
                    disabled={this.state.chapter._id === this.state.chapters[0]._id}
                    onClick={this.onClickPrevChap}
                >
                    Prev Chapter
                </Button>

                <select style={{marginLeft: '10px', marginRight: '10px'}}
                    defaultValue={this.state.chapter._id} onChange={this.onChange}>
                    {this.state.chapters.map(chapter => (
                        <option key={chapter._id} value={chapter._id}>
                            {'Chapter ' + chapter.number + ": " + chapter.name}
                        </option>
                    ))}
                </select>

                <Button
                    disabled={this.state.chapter._id === this.state.chapters[this.state.chapters.length - 1]._id}
                    onClick={this.onClickNextChap}
                >
                    Next Chapter
                </Button>
            </Navbar>
        )
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />;
        }

        if (!this.state.book || !this.state.chapter || !this.state.chapters || this.state.loading) {
            console.log(
                this.state
            )
            return <Spinner />;
        }

        return (
            <>
                <div>
                    {this.chaptersNavBar()}
                    <h2>{this.state.book.name}</h2>
                    <h2>Chapter {this.state.chapter.number}: {this.state.chapter.name}</h2>
                    <h5>Author: {this.state.book.author.username}</h5>
                    <div>
                        {this.displayContent(this.state.chapter.content)}
                    </div>
                    {this.chaptersNavBar()}
                </div>

                {/* <Fragment>
                    <CommentForm bookid={this.state.bookid} chapid={this.state.chapid} />
                    <hr />
                    <hr />
                    <hr />
                    <CommentList comments={this.state.comments} />
                </Fragment> */}
            </>
        )
    }
}

Chapter.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    books: state.library
});

export default withRouter(connect(
    mapStateToProps,
)(Chapter));
