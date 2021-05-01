import React, { useEffect, useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import SearchFilter from '../components/searchFilter';
import EmotionCalendar from '../components/emotionCalendar';
import {
    defaultSearchFilter,
    API_URL,
    emotions,
    generateMockDataForEmotionByDate,
    getDateText,
} from '../components/utils';
import PostItemsList from '../components/postItemsList';
import '../styles/socialMediaAnalysis.scss';
import loading from '../loading-spinner.svg';

const SocialMediaAnalysis = (props, context) => {
    const [searchFilter, setSearchFilter] = useState(defaultSearchFilter);
    const [isLoading, setLoading] = useState(false);
    const [emotionByDate, seEmotionByDate] = useState({});
    const [emotionLst, setEmotionLst] = useState([]);
    const [postLst, setPostLst] = useState([]);
    const elementRef = useRef();

    useEffect(() => {
        if (isLoading) {
            let queryString = API_URL + '/getuserpostsemotions?';
            const { socialMediaSourceOption, username, timezoneOption, dateRange } = searchFilter;

            const queryParam = {
                socialMediaSource: socialMediaSourceOption.value,
                username,
                timezone: timezoneOption.value,
                startDate: getDateText(dateRange.startDate),
                endDate: getDateText(dateRange.endDate),
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
                    setLoading(false);
                });
        }
    }, [isLoading]);

    useEffect(() => {
        const mockEmotionByDateData = generateMockDataForEmotionByDate();
        seEmotionByDate(mockEmotionByDateData);
    }, []);

    function getUserEmotions() {
        setLoading(true);
    }

    const submitButtonProps = {
        isLoading,
        onClick: getUserEmotions,
    };

    function scrollToList() {
        const node = elementRef.current;

        node.scrollIntoView({ behavior: 'smooth' });
    }

    function handleCalendarEventClicked(event) {
        const date = getDateText(event.start);
        const selectedDate = moment(date, 'YYYY-MM-DD')
            .tz(searchFilter.timezoneOption.value)
            .format();

        const emotionToPost = emotionByDate[selectedDate];

        if (emotionToPost !== undefined) {
            const postNestedLst = Object.values(emotionToPost).map((posts) => {
                return posts;
            });
            const flattened = postNestedLst
                .flat()
                .sort((a, b) => new Date(a.time) - new Date(b.time));

            setPostLst(flattened);
            scrollToList();
        }
    }

    // =================== Render=============

    return (
        <div className='social-media-analysis page'>
            <h1 className='section-title'>This is Social Media Analysis page</h1>

            <SearchFilter
                searchFilter={searchFilter}
                submitButtonProps={submitButtonProps}
                onChange={setSearchFilter}
            />

            {isLoading ? (
                <div className='loading-spinner-wrapper'>
                    <img className='loading-spinner' src={loading} alt='Loading Spinner' />
                </div>
            ) : (
                <React.Fragment>
                    <div>
                        <EmotionCalendar
                            emotionByDate={emotionByDate}
                            emotions={emotions}
                            onCalendarEventClicked={handleCalendarEventClicked}
                        />
                    </div>

                    <div className='temp-placeholder per-tweet-wrapper' ref={elementRef}>
                        Section display after clicking on specific date on calendar
                        {postLst.length > 0 && (
                            <PostItemsList
                                postItemsLst={postLst}
                                timezone={searchFilter.timezoneOption.value}
                            />
                        )}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default withRouter(SocialMediaAnalysis);
