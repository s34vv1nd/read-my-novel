import React, { Component, Fragment } from 'react';
import HomeCarousel from './HomeCarousel.jsx';

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <HomeCarousel />
                <h2>New Ongoing Releases</h2>
                <div></div>
                <h2>Recommended</h2>
                <div></div>
                <h2>Power Ranking</h2>
                <div></div>
                <h2>Latest Updates</h2>
                <table></table>
            </Fragment>
        )
    }
}