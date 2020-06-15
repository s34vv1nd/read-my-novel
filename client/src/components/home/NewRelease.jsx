import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import axios from 'axios';


export default class HomeRelease extends Component {

    constructor() {
        super();
        this.state = {
            books: null
        }
    }

    loadBooks = async () => {
        const res = await axios.get('api/books', {
            params: {
                status: 'ongoing',
                page: 1,
                perPage: 9,
                sortBy: 'createdAt'
            }
        });
        if (res.data.success) await this.setState({ books: res.data.books });
    }

    async componentDidMount() {
        await this.loadBooks();
        console.log(this.state.books);
    }

    mainBook = () => {
        return (
            < div class="col-md-4" >
                <div class="card" style={{ marginTop: '50px' }}>
                    <img class="card-img-top" src="img_avatar1.png" alt="Book image"></img>
                    <div class="card-body">
                        <h4 class="card-title"><Link to="#">{this.state.books[0].name}</Link></h4>
                        <p class="card-text">Book intro</p>
                        <a href={"book/" + this.state.books[0]._id} class="btn btn-primary">READ</a>
                    </div>
                </div>
            </div >
        )
    }

    otherBooks = () => {
        return (
            [{ marginTop: '20px' }, { marginTop: '20px', marginBottom: '20px' }].map((value, index) => {
                return (
                    <div class="row" style={value}>
                        {
                            this.state.books.slice(4 * index + 1, 4 * index + 5).map(
                                book => (
                                    <div class="col-md-3">
                                        <div class="card" >
                                            <img class="card-img-top" src="img_avatar1.png" alt="Book image"></img>
                                            <div class="card-body">
                                                <h4 class="card-title"><Link to="#">{book.name}</Link></h4>
                                                <p class="card-text">Book intro</p>
                                                <a href="#" class="btn btn-primary">READ</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                )
            }))
            
    }

    render() {
        console.log(this.state.books);
        if (!this.state.books) {
            return <Spinner />
        }

        return (
            <div class="row" style={{ border: 'ridge', backgroundColor: 'white' }}>
                {this.mainBook()}
                <div class="col-md-8">
                    {this.otherBooks()}
                </div>
            </div>
        )
    }
}
