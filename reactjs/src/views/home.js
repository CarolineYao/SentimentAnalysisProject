import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/home.scss';

class Home extends Component {
  constructor(){
    super();
  }

  render() {
    return (
        <h1 className='section-title'>This is Home page</h1>
    );
  }

}

export default withRouter(Home);