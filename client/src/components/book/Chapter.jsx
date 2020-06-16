import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../Spinner';

class Chapter extends Component {
    constructor() {
        super();
        this.state = {
            bookid: '',
            chapid: '',
            book: null,
            chapter: null
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    loadChapter = async (bookid, chapid) => {
        const res_chapter = await axios.get('api/books/' + bookid + '/chapters/' + chapid);
        const res_book = await axios.get('api/books/' + bookid);

        if (res_chapter.data.success && res_book.data.success) {
            return {
                book: res_book.data.book,
                chapter: res_chapter.data.chapter
            };
        }
        return null;
    }

    async componentDidMount() {
        await this.setState({
            bookid: this.props.match.params.bookid,
            chapid: this.props.match.params.chapid
        });

        await this.setState(await this.loadChapter(this.state.bookid, this.state.chapid));
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        if (!this.state.book && !this.state.chapter) {
            return <Spinner />;
        }

        return (
            <div>
                <h2>Name: {this.state.book.name}</h2>
                <h2>Chapter {this.state.chapter.number}: {this.state.chapter.name}</h2>
                <p>Content: {this.state.chapter.content}</p>
            </div>
        )
    }
}

Chapter.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps,
    // { loadChapter }
)(Chapter);
