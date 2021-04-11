import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SearchFilter from '../components/searchFilter';
import { defaultSearchFilter } from '../components/utils';
import '../styles/socialMediaAnalysis.scss';

const SocialMediaAnalysis = (props, context) => {
    const [searchFilter, setSearchFilter] = useState(defaultSearchFilter);

    const renderEachRow = () => {
        const dummpLoop = Array.from(Array(10).keys());
        return dummpLoop.map((index) => {
            return (
                <div className='per-tweet' key={index}>
                    This is tweet-{index} along with sentiment analysis result
                </div>
            );
        });
    };

    return (
        <div className='social-media-analysis page'>
            <h1 className='section-title'>
                This is Social Media Analysis page
            </h1>

            <SearchFilter
                searchFilter={searchFilter}
                onChange={setSearchFilter}
            />

            <Button variant='primary' className='submit'>
                Submit
            </Button>

            <div className='temp-placeholder calendar'>
                Reserved for Calendar section
            </div>

            <div className='temp-placeholder per-tweet-wrapper'>
                Section display after clicking on specific date on calendar
                {renderEachRow()}
            </div>
        </div>
    );
};

export default withRouter(SocialMediaAnalysis);
