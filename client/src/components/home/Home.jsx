import React, { Component, Fragment } from 'react';
import HomeCarousel from './HomeCarousel.jsx';

import Footer from '.././Footer.jsx';

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <HomeCarousel />
                <Footer />
            </Fragment>
        )
    }
}