import moment from 'moment';

export const date = (value) => {
    return moment(value).format('MM-DD-YYYY');
};

export const dateTime = (value) => {
    return moment(value).format('MM-DD-YYYY HH:mm');
};

export const time = (value) => {
    return moment(value).format('HH:mm');
};

export const fromNow = (value, withoutSuffix = false) => {
    return moment(value).fromNow(withoutSuffix);
};

export default {
    date,
    dateTime,
    time,
    fromNow,
};