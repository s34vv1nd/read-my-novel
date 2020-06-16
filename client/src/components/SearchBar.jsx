import React, { useState } from "react";
import SelectSearch from 'react-select-search';
import ReactSearchBox from 'react-search-box';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import axios from 'axios';
import { connect } from 'react-redux'
import { useEffect } from "react";
import Spinner from "./Spinner";
import { Redirect, useHistory } from "react-router-dom";
import './SearchBar.css'


const SearchBar = ({ books }) => {
    const [bookid, setBookID] = useState(null);
    let history = useHistory();

    const onChange = async (book) => {
        setBookID(book.value);
        if (book.value) history.push('book/' + book.value);
    }
    

    if (!books) {
        return <Spinner />
    }

    return (
        <Select
            className="select-custom-class"
            options={books.map(book => ({ label: book.name, value: book._id }))}
            onChange={onChange}
            isClearable
            placeholder='Search...'
            style="min-width: 100%"
        />
    );
}

const mapStateToProps = state => ({
    books: state.books,
});

export default connect(
    mapStateToProps,
)(SearchBar);