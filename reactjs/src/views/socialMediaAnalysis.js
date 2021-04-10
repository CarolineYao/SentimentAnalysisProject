import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/socialMediaAnalysis.scss';

class SocialMediaAnalysis extends Component {
  constructor(){
    super();
  }

  render() {
    return (
        <h1 className='section-title'>This is Social Media Analysis page</h1>
    );
  }

}

export default withRouter(SocialMediaAnalysis);