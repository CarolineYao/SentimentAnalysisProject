import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class About extends Component {
  constructor(){
    super();
  }

  render() {
    return (
        <h1>About</h1>
    );
  }

}

export default withRouter(About);