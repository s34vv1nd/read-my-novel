import React, { Component, Fragment } from 'react';
import HomeCarousel from './HomeCarousel.jsx';
import { Link } from 'react-router-dom'
import HomeRelease from './NewRelease.jsx';
import Recommended from './Recommended.jsx';

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <HomeCarousel />
                <h2 style={{marginTop: '20px'}}>New Ongoing Releases</h2>
                <HomeRelease />
                <h2 style={{marginTop: '20px'}}>Recommended</h2>
                <Recommended />
            </Fragment>
        )
    }
}