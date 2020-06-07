import React, { Component } from 'react';
import Header from '../Header';
import HomeCarousel from './HomeCarousel.jsx'


export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <HomeCarousel />
            </div>
        )
    }
}