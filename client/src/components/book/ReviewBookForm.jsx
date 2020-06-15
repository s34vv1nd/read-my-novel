import React, { Component } from 'react';

export default class ReviewBookForm extends Component {
    render() {
        return (
            <div class="container">
                <h2 class="text-center">Review Form</h2>
                <div class="col-md-12"  style={{ margin: 'auto', width: '80%'}}>
                    <div class="widget-area no-padding blank" >
                        <div class="status-upload">
                            <form>
                                <div class="row">
                                    <textarea placeholder="How do u feel about this book?"
                                        style={{ width: '100%', height: 'auto' }}></textarea>
                                </div>
                                <div class="row">
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