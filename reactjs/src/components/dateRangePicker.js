import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { formatDate } from './utils';
import '../styles/dateRangePicker.scss';

const DateRangePicker = (props, context) => {
    const { dateRange } = props;
    const [isSelectorActive, setIsSelectorActive] = useState(false);
    const dateDisplayFormat = 'MMM d, yyyy';

    const handleDateRangeSelect = (ranges) => {
        props.onChange(ranges.selection);
    };

    const handlesOnClick = () => {
        setIsSelectorActive(!isSelectorActive);
    };

    return (
        <div className='date-range-picker'>
            <div className='date-display-wrapper'>
                <div
                    className='rdrDateDisplay date-display'
                    onClick={handlesOnClick}
                >
                    <span className='rdrDateInput rdrDateDisplayItem'>
                        <input
                            readOnly={true}
                            placeholder='Early'
                            value={formatDate(
                                dateRange.startDate,
                                dateDisplayFormat
                            )}
                        />
                    </span>
                    <span className='rdrDateInput rdrDateDisplayItem'>
                        <input
                            readOnly={true}
                            placeholder='Continuous'
                            value={formatDate(
                                dateRange.endDate,
                                dateDisplayFormat
                            )}
                        />
                    </span>
                </div>
            </div>
            {isSelectorActive && (
                <DateRange
                    className='from-date'
                    ranges={[dateRange]}
                    maxDate={new Date()}
                    showDateDisplay={false}
                    dateDisplayFormat={dateDisplayFormat}
                    onChange={handleDateRangeSelect}
                />
            )}
        </div>
    );
};

export default DateRangePicker;
