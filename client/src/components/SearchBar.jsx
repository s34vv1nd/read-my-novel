import React from "react";
import Select from 'react-select';
import { connect } from 'react-redux'
import Spinner from "./Spinner";
import { useHistory } from "react-router-dom";
import './SearchBar.css'


const SearchBar = ({ books }) => {
    let history = useHistory();

    const onChange = async (book) => {
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