import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import axios from 'axios';

const imgdefault = "https://gitensite.s3.amazonaws.com/bookcovers/7573.jpg"

export default class Recommended extends Component {

    constructor() {
        super();
        this.state = {
            books: null
        }
    }

    loadBooks = async () => {
        const { data } = await axios.get('api/books', {
            params: {
                status: 'ongoing',
                page: 1,
                perPage: 9,
                sortBy: 'ratings'
            }
        });
        if (data.success) return data.books;
        return null;
    }

    async componentDidMount() {
        await this.setState({ books: await this.loadBooks() });
    }

    mainBook = () => {
        return (
            < div class="col-md-4" >
                <div class="card" style={{ marginTop: '50px' }}>
                    <img class="card-img-top" src={this.state.books[0].cover ? this.state.books[0].cover : imgdefault} alt="Book image"></img>
                    <div class="card-body">
                        <h4 class="card-title"><Link to={"book/" + this.state.books[0]._id}>{this.state.books[0].name}</Link></h4>
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
                                    <div class="col-lg-3 col-md-6" style={{ padding: '10px' }}>
                                        <div class="card h-100"  >
                                            <img
                                                class="card-img-top"
                                                src={book.cover ? book.cover : imgdefault}
                                                alt="Book image">
                                            </img>
                                            <div class="card-body">
                                                <h5 class="card-title"><Link to={"book/" + book._id}>{book.name}</Link></h5>
                                                <p class="card-text">
                                                    <div>{book.author.username}</div>
                                                    <div>Rating: {book.ratings}</div>
                                                </p>
                                                <a href={"book/" + book._id} class="btn btn-primary mt-auto">READ</a>
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
        if (!this.state.books || !this.state.books[0]) {
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
