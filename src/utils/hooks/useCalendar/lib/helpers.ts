import { type DateCellItem } from '../types/types';
import { sundayWeekToMondayWeekDayMap } from './getFormattedDate';

const getDayOfTheWeek = (date: Date) => {
    const day = date.getDay();
    return sundayWeekToMondayWeekDayMap[day];
};

export function isToday (cell: DateCellItem, todayDate: Date) {
    return (
        todayDate.getFullYear() === cell.year &&
        todayDate.getMonth() === cell.month &&
        todayDate.getDate() === cell.date
    );
}

export const daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const validValueRegex = /^\d{2}-\d{2}-\d{4}$/;

export const getDaysAmountInAMonth = (year: number, month: number) => {
    const nextMonthDate = new Date(year, month + 1, 1);
    nextMonthDate.setMinutes(-1);
    return nextMonthDate.getDate();
};

export const getWeekDatesNumbersInAMonth = (year: number, month: number, date: number) => {
    const daysInAMonth = getDaysAmountInAMonth(year, month);

    if (date > daysInAMonth) {
        return [0, 0];
    }

    const monthDate = new Date(year, month, date);
    const currentWeekDay = getDayOfTheWeek(monthDate);

    const startWeekDate = date - currentWeekDay;
    const endWeekDate = date + ((currentWeekDay - 7) * -1) - 1;

    const start = startWeekDate <= 0
        ? getDaysAmountInAMonth(year, month - 1) + startWeekDate
        : startWeekDate;

    const end = endWeekDate > daysInAMonth
        ? endWeekDate - getDaysAmountInAMonth(year, month - 1) + 1
        : endWeekDate;

    return [start, end];
};

export const getWeekDaysDates = (year: number, month: number, date: number) => {
    const [start, end] = getWeekDatesNumbersInAMonth(year, month, date);
    const daysInAMonth = getDaysAmountInAMonth(year, month - 1);

    const numbers: number[] = [];

    for (let i = 0; i < 5; i++) {
        const newNumber = start + i;

        if (newNumber >= daysInAMonth) {
            numbers.push((newNumber - daysInAMonth) + 1);
        } else {
            numbers.push(newNumber + 1);
        }
    }

    return [start, ...numbers, end];
};

export const getWeekDaysCells = (year: number, month: number, date: number) => {
    const weekDaysNumbers = getWeekDaysDates(year, month, date);

    const dateCells: DateCellItem[] = weekDaysNumbers.map((value) => ({
        date: value,
        year,
        month,
    }));

    return dateCells;
};

export const isValidateString = (string: string) => {
    const isValidateRegExp = validValueRegex.test(string);

    if (!isValidateRegExp) {
        return false;
    }

    const [date, month, year] = string
        .split('-')
        .map((s) => parseInt(s, 10));

    if (month < 1 || month >= 12 || date < 1) {
        return false;
    }

    const maxDaysInAMonth = getDaysAmountInAMonth(year, month - 1);

    return date <= maxDaysInAMonth;
};

export const getPreviousMonthDays = (year: number, month: number) => {
    const currentMonth = new Date(year, month, 1);
    const dayOfTheWeek = getDayOfTheWeek(currentMonth);

    const prevDaysAmount = dayOfTheWeek - 1;
    const daysAmountInPrevMonth = getDaysAmountInAMonth(year, month - 1);

    const [cellYear, cellMonth] = month === 0 ? [year - 1, 11] : [year, month - 1];

    const dateCells: DateCellItem[] = [];

    for (let i = prevDaysAmount; i >= 0; i--) {
        dateCells.push({
            year: cellYear,
            month: cellMonth,
            date: daysAmountInPrevMonth - i,
            view: {
                type: 'past',
            },
        });
    }

    return dateCells;
};

const CELLS_AMOUNT = 7 * 6;

export const getNextMonthsDay = (year: number, month: number) => {
    const currentMonth = new Date(year, month, 1);
    const dayOfTheeWeek = currentMonth.getDay();
    const prevCellsNumber = dayOfTheeWeek - 1;

    const daysAmount = getDaysAmountInAMonth(year, month);

    const nextMonthDays = CELLS_AMOUNT - daysAmount - prevCellsNumber;

    const [cellYear, cellMonth] = month === 11 ? [year + 1, 0] : [year, month + 1];
    const dateCells: DateCellItem[] = [];

    for (let i = 1; i < nextMonthDays - 1; i++) {
        dateCells.push({
            year: cellYear,
            month: cellMonth,
            date: i,
            view: {
                type: 'next',
            },
        });
    }

    return dateCells;
};

export const getCurrentMonthDays = (year: number, month: number, daysAmount: number) => {
    const dateCells: DateCellItem[] = [];

    for (let i = 1; i <= daysAmount; i++) {
        dateCells.push({
            year,
            month,
            date: i,
            view: {
                type: 'current',
            },
        });
    }

    return dateCells;
};

export const getFormattedDateFromInputValue = (input: string) => {
    if (!isValidateString(input)) {
        return null;
    }

    const [date, month, year] = input.split('-')
        .map((s) => parseInt(s, 10));

    return new Date(year, month - 1, date);
};

export const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];
