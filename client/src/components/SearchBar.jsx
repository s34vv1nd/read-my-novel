import React, { useState } from "react";
import SelectSearch from 'react-select-search';
import ReactSearchBox from 'react-search-box';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import axios from 'axios';
import { connect } from 'react-redux'
import { useEffect } from "react";
import Spinner from "./Spinner";
import { Redirect } from "react-router-dom";


const SearchBar = ({ books }) => {
    const [bookid, setBookID] = useState(null);

    const onChange = async (book) => {
        setBookID(book.value);
    }
    

    if (!books) {
        return <Spinner />
    }

    if (bookid) {
        return <Redirect to={'book/' + bookid} />
    }

    return (
        <Select
            options={books.map(book => ({ label: book.name, value: book._id }))}
            onChange={onChange}
            isClearable
            placeholder='Search...'
        />
    );
}

const mapStateToProps = state => ({
    books: state.books,
});

export default connect(
    mapStateToProps,
)(SearchBar);