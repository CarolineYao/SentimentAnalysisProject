import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/about.scss';

class About extends Component {
    constructor() {
        super();
    }

    render() {
        return <h1 className='section-title'>This is About page</h1>;
    }
}

export default withRouter(About);
