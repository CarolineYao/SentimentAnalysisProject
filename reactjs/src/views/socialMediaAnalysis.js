import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SocialMediaAnalysis extends Component {
  constructor(){
    super();
  }

  render() {
    return (
        <h1>Social Media Analysis</h1>
    );
  }

}

export default withRouter(SocialMediaAnalysis);