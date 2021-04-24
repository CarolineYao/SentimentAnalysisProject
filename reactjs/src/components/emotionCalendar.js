import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { withRouter } from 'react-router-dom';

import { MILLI, capitalizeText, emotionsToColor } from './utils';
import '../styles/emotionCalendar.scss';

const localizer = momentLocalizer(moment);

const VIEWS = {
    month: 'month',
    week: 'week',
};

const EmotionCalendar = (props) => {
    const elementRef = useRef();
    const [calendarView, setCalendarView] = useState(VIEWS.month);
    const { emotionByDate, emotions } = props;
    const eachEmotionDuration = MILLI.day / emotions.length;

    const emotionToTimeSlot = {};
    emotions.forEach((emotion, index) => {
        const startOffset = index * eachEmotionDuration;
        const endOffset = (index + 1) * eachEmotionDuration - 1;

        emotionToTimeSlot[emotion] = {
            startOffset,
            endOffset,
        };
    });

    const emotionEventsList = Object.entries(emotionByDate)
        .map(([date, dateToEmotionMap]) => {
            return emotions.map((emotion) => {
                const { startOffset, endOffset } = emotionToTimeSlot[emotion];
                const emotionToPostLst = dateToEmotionMap[emotion];
                const start = moment(date).add(startOffset).toDate();
                const end = moment(date).add(endOffset).toDate();

                const isEmpty = emotionToPostLst === undefined;
                const title = isEmpty
                    ? 'This block should be transparent'
                    : `${capitalizeText(emotion)} - ${emotionToPostLst.length} Posts`;

                return {
                    title: title,
                    allDay: false,
                    emotion: emotion,
                    start,
                    end,
                    isEmpty,
                };
            });
        })
        .flat();

    const handleViewChange = (view) => {
        setCalendarView(view);
    };

    const eventStyleGetter = (event) => {
        const isEmpty = event.isEmpty;
        const color = emotionsToColor[event.emotion];
        const result = {
            style: {
                backgroundColor: color,
                border: `1px solid ${color}`,
                opacity: isEmpty ? 0 : 1,
                color: 'rgb(0, 0, 0, 1)',
                'font-size': '12px',
            },
        };

        return result;
    };

    useEffect(() => {
        if (emotions && emotions.length > 0 && calendarView === VIEWS.week) {
            // NOTE: should avoid using jQuery, however, in this scenario, using jQuery is the better approach
            const node = elementRef.current;

            if (node instanceof HTMLElement) {
                const timeslotNodes = node.querySelectorAll(
                    'div.rbc-time-column div.rbc-time-slot span.rbc-label'
                );

                timeslotNodes.forEach((timeslotNode, index) => {
                    timeslotNode.textContent = capitalizeText(emotions[index]);
                });
            }
        }
    }, [emotions, calendarView]);

    return (
        <div className={'calendar ' + calendarView} ref={elementRef}>
            <Calendar
                showAllEvents
                timeslots={emotions.length}
                step={40}
                localizer={localizer}
                events={emotionEventsList}
                views={Object.values(VIEWS)}
                onView={handleViewChange}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
};

export default withRouter(EmotionCalendar);
