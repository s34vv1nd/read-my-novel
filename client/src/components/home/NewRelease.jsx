import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import axios from 'axios';

const imgdefault = "https://gitensite.s3.amazonaws.com/bookcovers/7573.jpg"

export default class HomeRelease extends Component {

    constructor() {
        super();
        this.state = {
            books: null
        }
    }

    loadBooks = async () => {
        const { data } = await axios.get('api/books', {
            params: {
                page: 1,
                perPage: 9,
                sortBy: 'updatedAt'
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
            < div className="col-md-4" >
                <div className="card" style={{ marginTop: '50px' }}>
                    <img className="card-img-top" src={this.state.books[0].cover ? this.state.books[0].cover : imgdefault} alt="Book image"></img>
                    <div className="card-body">
                        <h4 className="card-title"><Link to={"book/" + this.state.books[0]._id}>{this.state.books[0].name}</Link></h4>
                        <p className="card-text">Author: {this.state.books[0].author.username}</p>
                        <p className="card-text">{this.state.books[0].sypnosis ? this.state.books[0].sypnosis.slice(0, 200)+'...' : null}</p>
                        <p className="card-text">Rating: {this.state.books[0].ratings}</p>
                        <a href={"book/" + this.state.books[0]._id} className="btn btn-primary">READ</a>
                    </div>
                </div>
            </div >
        )
    }

    otherBooks = () => {
        return (
            [{ marginTop: '20px' }, { marginTop: '20px', marginBottom: '20px' }].map((value, index) => {
                return (
                    <div className="row" style={value}>
                        {
                            this.state.books.slice(4 * index + 1, 4 * index + 5).map(
                                book => (
                                    <div className="col-lg-3 col-md-6" style={{ padding: '10px' }}>
                                        <div className="card h-100" >
                                            <img
                                                className="card-img-top"
                                                src={book.cover ? book.cover : imgdefault}
                                                alt="Book image">
                                            </img>
                                            <div className="card-body">
                                                <h5 className="card-title"><Link to={"book/" + book._id}>{book.name}</Link></h5>
                                                <p className="card-text">
                                                    <div>{book.author.username}</div>
                                                    <div>Rating: {book.ratings}</div>
                                                </p>
                                                <a href={"book/" + book._id} className="btn btn-primary mt-auto">READ</a>
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
            <div className="row" style={{ border: 'ridge', backgroundColor: 'white' }}>
                {this.mainBook()}
                <div className="col-md-8">
                    {this.otherBooks()}
                </div>
            </div>
        )
    }
}
