import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { withRouter } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const EmotionCalendar = (props) => {
    const { emotionByDate, emotions } = props;
    // const eachEmotionDuration =

    return (
        <div>
            {/* <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor='start'
                endAccessor='end'
                style={{ height: 500 }}
            /> */}
        </div>
    );
};

export default withRouter(EmotionCalendar);
