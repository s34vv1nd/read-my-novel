import React, { Component } from 'react';
import { setAlert } from '../../actions/alert';
import { postReviews } from '../../actions/book';
import { connect } from 'react-redux';
import axios from 'axios';

class ReviewForm extends Component {
    constructor() {
        super();
        this.state = {
            content: '',
            bookid: null
        }

        //this.componentDidMount = this.componentDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // setReview = async (bookid, content) => {
    //     try {
    //         const res = await axios.post('api/books/' + bookid + '/reviews', {
    //             content: content
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // async componentDidMount() {
    // }

    async onChange(e) {
        this.setState({ content: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        if (!this.state.content) {
            console.log("Content is empty");
            await this.props.setAlert('Please enter your review', "danger", 2000);
        } else {
            await this.props.postReviews(this.props.bookid, this.state.content);
            this.setState({content: ""});
        }
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Share your thoughts</h2>
                <div className="col-md-12" style={{ margin: 'auto', width: '80%' }}>
                    <div className="widget-area no-padding blank" >
                        <div className="status-upload">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="row">
                                    <textarea placeholder="Write something..."
                                        style={{ width: '100%', height: 'auto' }}
                                        onChange={this.onChange}
                                        value={this.state.content}>
                                    ""
                                    </textarea>
                                </div>
                                <div className="row pull-right" style={{ marginTop: '10px' }}>
                                    <button type="submit" className="btn btn-success green pull-right">
                                        <i className="fa fa-share"></i> Share</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(
    null,
    { setAlert, postReviews }
)(ReviewForm);