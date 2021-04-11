import { format, isValid } from 'date-fns';

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

export function formatDate(value, dateFormat) {
    if (value && isValid(value)) {
        return format(value, dateFormat);
    }
    return '';
}
