import { FormattedTime } from 'entities/Tasks/model/type/Task';

export const shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export const sundayWeekToMondayWeekDayMap: Record<number, number> = {
    0: 6,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
};

export enum DATE_TYPE {
    FULL = 19,
    DATE = 10
}

export const getFormattedDateValue = (value: Date) => {
    const dateValue = value.getDate();
    const date = value.getDate() > 9 ? dateValue : `0${dateValue}`;
    const monthValue = value.getMonth() + 1;
    const month = value.getMonth() > 9 ? monthValue : `0${monthValue}`;
    const year = value.getFullYear();

    return `${date}-${month}-${year}`;
};

export const getFormattedDate = (date: Date) => {
    const string = getFormattedDateValue(date);

    const [dates, month, year] = string
        .split('-')
        .map((s) => parseInt(s, 10));

    const taskTime: FormattedTime = {
        date: (`${year}-${month}-${dates}`),
        time: date.toJSON().slice(11, 19),
    };

    return taskTime;
};

export function getParsedDate(time: FormattedTime): Date {
    const dateString = `${time.date}`;
    const parse = Date.parse(dateString);
    const parseDate = new Date(parse);

    return parseDate;
}
