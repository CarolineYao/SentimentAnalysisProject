import { format, isValid } from 'date-fns';

export const API_URL = 'http://localhost:5000';

export const socialMediaSourceList = [
    {
        value: 'twitter',
        label: 'Twitter',
    },
    {
        value: 'fake',
        label: 'A fake option',
    },
];

export const filterLsts = {
    socialMedia: 'socialMedia',
    username: 'username',
    timezone: 'timezone',
    dateRange: 'dateRange',
};

export const defaultSearchFilter = {
    socialMediaSourceOption: socialMediaSourceList[0],
    username: '',
    timezoneOption: getTimezoneLabelObj(guessUserTimezone()),
    dateRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    },
};

export function formatDate(value, dateFormat) {
    if (value && isValid(value)) {
        return format(value, dateFormat);
    }
    return '';
}

export function guessUserTimezone() {
    const moment = require('moment-timezone');

    return moment.tz.guess();
}

export function getTimezoneLst() {
    const moment = require('moment-timezone');
    const timeZonesList = moment.tz.names();

    return timeZonesList.map((timezone) => {
        const timezoneAbbr = moment.tz(timezone).format('z');

        return {
            value: timezone,
            label: `${timezone} (${timezoneAbbr})`,
        };
    });
}

export function getTimezoneLabelObj(timezone) {
    const timezoneOptions = getTimezoneLst();

    return timezoneOptions.find((option) => option.value === timezone);
}
