import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import SearchFilter from '../components/searchFilter';
import { defaultSearchFilter, API_URL } from '../components/utils';
import '../styles/socialMediaAnalysis.scss';

const SocialMediaAnalysis = (props, context) => {
    const [searchFilter, setSearchFilter] = useState(defaultSearchFilter);
    const [isGetting, setGetting] = useState(false);
    const [emotionByDate, seEmotionByDate] = useState({});
    const [emotionLst, setEmotionLst] = useState([]);

    useEffect(() => {
        if (isGetting) {
            let queryString = API_URL + '/getuserpostsemotions?';
            const {
                socialMediaSourceOption,
                username,
                timezoneOption,
                dateRange,
            } = searchFilter;

            const queryParam = {
                socialMediaSource: socialMediaSourceOption.value,
                username,
                timezone: timezoneOption.value,
                startDate: dateRange.startDate.toISOString().slice(0, 10),
                endDate: dateRange.endDate.toISOString().slice(0, 10),
            };

            Object.keys(queryParam).forEach((key, index) => {
                if (index !== 0) {
                    queryString += '&';
                }

                queryString += `${key}=${queryParam[key]}`;
            });

            fetch(queryString)
                .then((response) => response.json())
                .then((data) => {
                    seEmotionByDate(data.byDate);
                    setEmotionLst(data.emotions);
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    setGetting(false);
                });
        }
    }, [isGetting]);

    function getUserEmotions() {
        setGetting(true);
    }

    // =================== Render=============
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

            <Button
                variant='primary'
                className='submit'
                disabled={isGetting}
                onClick={getUserEmotions}
            >
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
