import { format, isValid } from 'date-fns';
import { Redirect } from 'react-router';

export const moment = require('moment-timezone');

export const API_URL = 'http://localhost:5000';

export const emotions = ['fear', 'joy', 'love', 'anger', 'sadness', 'surprise'];

export const emotionsToColor = {
    anger: 'rgb(218, 251, 192)',
    love: 'rgb(251, 195, 192)',
    sadness: 'rgb(172, 197, 237)',
    joy: 'rgb(248, 251, 192)',
    fear: 'rgb(179, 172, 237)',
    surprise: 'rgb(251, 224, 192)',
};

export const MILLI = {
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
};

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

export function capitalizeText(text) {
    return text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
}

export function formatDate(value, dateFormat) {
    if (value && isValid(value)) {
        return format(value, dateFormat);
    }
    return '';
}

export function guessUserTimezone() {
    return moment.tz.guess();
}

export function getTimezoneLst() {
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

export function generateRandomText(num) {
    const text = [
        'Her mom had warned her. She had been warned time and again, but she had refused to believe her.',
        'She had done everything right and she knew she would be rewarded for doing so with the promotion.',
        'So when the promotion was given to her main rival, it not only stung, it threw her belief system into disarray.',
        'It was her first big lesson in life, but not the last.',
        'Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking.',
        'What can explain these striations and their common orientation?',
        'Did you ever hear about the Great Ice Age or the Pleistocene Epoch?',
        'The many boulders frozen to the underside of the ice sheet tended to scratch the rocks over which they rode.',
        'The scratches or striations seen in the park rocks were caused by these attached boulders.',
        'The ice sheet also plucked and rounded Burke Mountain into the shape it possesses today.',
        'He wondered if he should disclose the truth to his friends. It would be a risky move.',
        'Yes, the truth would make things a lot easier if they all stayed on the same page, but the truth might fracture the group leaving everything in even more of a mess than it was not telling the truth.',
        'It was time to decide which way to go.',
        'You know that tingly feeling you get on the back of your neck sometimes?',
        'I just got that feeling when talking with her.',
        'You know I do not believe in sixth senses, but there is something not right with her.',
        'I do not know how I know, but I just do.',
        'Greg understood that this situation would make Michael terribly uncomfortable.',
        'Michael simply had no idea what was about to come and even though Greg could prevent it from happening, he opted to let it happen.',
        'It was quite ironic, really.',
        'It was something Greg had said he would never wish upon anyone a million times, yet here he was knowingly letting it happen to one of his best friends.',
        'It had been her dream for years but Dana had failed to take any action toward making it come true.',
        'There had always been a good excuse to delay or prioritize another project.',
        'As she woke, she realized she was once again at a crossroads.',
        'Would it be another excuse or would she finally find the courage to pursue her dream?',
        'Dana rose and took her first step.',
        'The alarm went off and Jake rose awake.',
        'Rising early had become a daily ritual, one that he could not fully explain.',
        'From the outside, it was a wonder that he was able to get up so early each morning for someone who had absolutely no plans to be productive during the entire day.',
        'Then came the night of the first falling star.',
        'It was seen early in the morning, rushing over Winchester eastward, a line of flame high in the atmosphere.',
        'Hundreds must have seen it and taken it for an ordinary falling star.',
        'It seemed that it fell to earth about one hundred miles east of him.',
        'He looked at the sand. Picking up a handful, he wondered how many grains were in his hand.',
        'Hundreds of thousands? "Not enough," the said under his breath. I need more.',
    ];

    return Array.from(Array(num).keys())
        .map(() => text[Math.floor(Math.random() * text.length)])
        .join(' ');
}

export function generateRandomTimeBetween(start, end) {
    const milliseconds = end.diff(start, 'milliseconds');

    return moment(start).add(Math.floor(Math.random() * milliseconds), 'milliseconds');
}

export function generateRandomTimeXDaysAfter(start, x = 1) {
    const end = moment(start).add(1, 'days');

    return generateRandomTimeBetween(start, end);
}

export function generateMockDataForEmotionByDate(
    timezone = guessUserTimezone(),
    startDateString = moment().clone().startOf('month').format('YYYY-MM-DD'),
    endDateString = moment().format('YYYY-MM-DD')
) {
    const startDate = moment.tz(startDateString, 'YYYY-MM-DD', timezone);
    const endDate = moment(endDateString, 'YYYY-MM-DD', timezone);
    const numOfEntries = endDate.diff(startDate, 'days') + 1;

    const result = {};
    Array.from(Array(numOfEntries).keys()).forEach((index) => {
        const date = moment(startDate).add(index, 'days');

        // 10% probability that there isn't any posts
        if (Math.random() < 0.1) {
            return;
        }

        result[date.format()] = {};
        const dateResult = result[date.format()];

        emotions.forEach((emotion) => {
            // 20% probability that there isn't any posts for this emotion
            if (Math.random() < 0.2) {
                return;
            }

            const numOfPosts = Math.ceil(Math.random() * 10);

            dateResult[emotion] = Array.from(Array(numOfPosts).keys())
                .map(() => {
                    const numOfSentences = Math.ceil(Math.random() * 5);
                    const randomTime = generateRandomTimeXDaysAfter(date);

                    return {
                        emotion: emotion,
                        text: generateRandomText(numOfSentences),
                        time: randomTime.format('YYYY-MM-DD HH:mm:ss z'),
                    };
                })
                .sort((a, b) => (a.time > b.time ? 1 : -1));
        });
    });

    console.log('Mock data generated:', result);
    return result;
}
