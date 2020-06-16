import React, { Component } from 'react';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import axios from 'axios';

class CommentForm extends Component {
    constructor() {
        super();
        this.state = {
            content: null,
            bookid: null,
            chapid: null
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setComment = async (bookid, chapid, content) => {
        try {
            const res = await axios.post('api/books/' + bookid + '/chapters/' + chapid + '/comments', {
                content: content
            });
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async componentDidMount() {
        await this.setState({ 
            bookid: this.props.bookid,
            chapid: this.props.chapid
        });
        // console.log(this.state.bookid);
    }

    async onChange(e) {
        this.setState({ content: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        if(!this.state.content) {
            console.log("Content is empty");
            await this.props.setAlert('Please enter your comment', "danger", 2000);
            return;
        } else {
            await this.setReview(this.state.bookid, this.state.chapid, this.state.content);
            console.log("Set comment");
        }
    }

    render() {
        return (
            <div class="container">
                <h2 class="text-center">Comment Form</h2>
                <div class="col-md-12" style={{ margin: 'auto', width: '80%' }}>
                    <div class="widget-area no-padding blank" >
                        <div class="status-upload">
                            <form>
                                <div class="row">
                                    <textarea placeholder="How do u feel about this chapter?"
                                        style={{ width: '100%', height: 'auto' }}
                                        onChange={this.onChange}
                                        value={this.state.content}></textarea>
                                </div>
                                <div class="row pull-right" style={{ marginTop: '10px' }}>
                                    <button type="submit" class="btn btn-success green pull-right">
                                        <i class="fa fa-share"></i> Share</button>

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
    mapStateToProps,
    { setAlert }
)(CommentForm);