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
            chapters: null
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    loadChapter = async (bookid, chapid) => {
        const { chapter_data } = await axios.get('api/books/' + bookid + '/chapters/' + chapid);
        const { book_data } = await axios.get('api/books/' + bookid);

        if (chapter_data.success && book_data.success) {
            return {
                book: book_data.book,
                chapters: chapter_data.chapters
            };
        }
        return null;
    }

    async componentDidMount() {
        await this.setState({
            bookid: this.props.match.params.bookid,
            chapid: this.props.match.params.chapid
        });

        await this.setState({
            book: (await this.loadChapter(this.state.bookid, this.state.chapid)).book,
            chapters: (await this.loadChapter(this.state.bookid, this.state.chapid)).chapters
        })

        //await this.props.loadChapter(this.state.bookid, this.state.chapid);
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        if (!this.state.book && !this.state.chapters) {
            return <Spinner />;
        }

        return (
            <div>
                <h2>Name: {this.state.book.name}</h2>
                {/* {console.log(this.state.chapters[0])} */}
                <h2>Chapter {this.state.chapters[0].number}: {this.props.chapters[0].name}</h2>
                <p>Content: {this.state.chapters[0].content}</p>
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
