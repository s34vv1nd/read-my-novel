import React, { useState } from "react";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { connect } from 'react-redux'
import Spinner from "./Spinner";
import { useHistory, Redirect, withRouter } from "react-router-dom";
import './SearchBar.css'
import { loadBook } from '../actions/book';


const SearchBar = ({ dispatch, books }) => {
    let history = useHistory();

    const onChange = (option) => {
        if (option && option.value) {
            dispatch(loadBook(option.value));
            history.push('/book/' + option.value);
        }
    }

    if (!books) {
        return <Spinner />
    }

    return (
        <div>
            <Select
                className="select-custom-class"
                options={books.map(book => ({ label: book.name, value: book._id }))}
                onChange={onChange}
                isClearable
                placeholder='Search...'
            />
        </div>
    );
}

const mapStateToProps = state => ({
    books: state.books,
});

export default withRouter(connect(
    mapStateToProps
)(SearchBar));