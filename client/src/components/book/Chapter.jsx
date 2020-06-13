import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadChapter } from '../../actions/book';

class Chapter extends Component {
    constructor() {
        super();
        this.state = {
            bookid: '',
            chapid: ''
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        await this.setState({
            bookid: this.props.match.params.bookid,
            chapid: this.props.match.params.chapid
        });

        await this.props.loadChapter(this.state.bookid, this.state.chapid);
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />;
        }

        return (
            <div>
                <h2>Name: {this.props.book.name}</h2>
                {console.log(this.props.chapters[0])}
                <h2>Chapter {this.props.chapters[0].number}: {this.props.chapters[0].name}</h2>
                <p>Content: {this.props.chapters[0].content}</p>
            </div>
        )
    }
}

Chapter.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    book: state.book.book,
    chapters: state.book.chapters
});

export default connect(
    mapStateToProps,
    { loadChapter }
)(Chapter);
