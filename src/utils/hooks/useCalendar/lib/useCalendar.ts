import {
    useLayoutEffect, useMemo, useState,
} from 'react';
import {
    getCurrentMonthDays,
    getDaysAmountInAMonth,
    getNextMonthsDay,
    getPreviousMonthDays, getWeekDatesNumbersInAMonth, getWeekDaysCells, getWeekDaysDates,
} from './helpers';

interface CalendarProps {
    selectedValue: Date;
    inputValue?: Date;
}

export const useCalendar = (props: CalendarProps) => {
    const {
        selectedValue, inputValue,
    } = props;

    const [panelYear, setPanelYear] = useState(() => selectedValue.getFullYear());
    const [panelMonth, setPanelMonth] = useState(() => selectedValue.getMonth());
    const [panelDate, setPanelDate] = useState(() => selectedValue.getDate());

    useLayoutEffect(() => {
        if (!inputValue) {
            return;
        }

        setPanelYear(inputValue.getFullYear());
        setPanelMonth(inputValue.getMonth());
        setPanelDate(inputValue.getDate());
    }, [inputValue]);

    const [weekStart, weekEnd, weekDates] = useMemo(() => {
        const [start, end] = getWeekDatesNumbersInAMonth(panelYear, panelMonth, panelDate);
        const array = getWeekDaysDates(panelYear, panelMonth, panelDate);

        return [start, end, array];
    }, [panelDate, panelMonth]);

    const monthDateCells = useMemo(() => {
        const currentDaysCell = getCurrentMonthDays(
            panelYear,
            panelMonth,
            getDaysAmountInAMonth(panelYear, panelMonth),
        );
        const prevDaysCell = getPreviousMonthDays(panelYear, panelMonth);
        const nextDaysCell = getNextMonthsDay(panelYear, panelMonth);

        return [...prevDaysCell, ...currentDaysCell, ...nextDaysCell];
    }, [panelYear, panelMonth]);

    const weekDateCells = useMemo(
        () => getWeekDaysCells(panelYear, panelMonth, panelDate),
        [weekEnd],
    );

    const switchYear = (index: 1 | -1) => {
        setPanelYear((year) => year + index);
    };

    const switchMonthPrevious = () => {
        if (panelMonth === 0) {
            setPanelMonth(11);
            setPanelYear((year) => year - 1);
        } else {
            setPanelMonth((prevState) => prevState - 1);
        }
    };

    const switchMonthNext = () => {
        if (panelMonth === 11) {
            setPanelMonth(0);
            setPanelYear((year) => year + 1);
        } else {
            setPanelMonth((prevState) => prevState + 1);
        }
    };

    const switchDateNext = () => {
        const daysInAMonth = getDaysAmountInAMonth(panelYear, panelMonth);

        if (panelDate === daysInAMonth) {
            switchMonthNext();
            setPanelDate(1);
        } else {
            setPanelDate((prevState) => prevState + 1);
        }
    };

    const switchDatePrevious = () => {
        const daysInAMonth = getDaysAmountInAMonth(panelYear, panelMonth);

        if (panelDate === 0) {
            switchMonthPrevious();
            setPanelDate(daysInAMonth);
        } else {
            setPanelDate((prevState) => prevState - 1);
        }
    };

    const switchDate = (value: number) => {
        const daysInAMonth = getDaysAmountInAMonth(panelYear, panelMonth);
        const newValue = panelDate + value;

        if (newValue > daysInAMonth) {
            const daysInANextMonth = getDaysAmountInAMonth(panelYear, panelMonth + 1);
            switchMonthNext();
            setPanelDate((prevState) => (newValue - daysInANextMonth));
            return;
        }

        if (newValue < 0) {
            const daysInAPrevMonth = getDaysAmountInAMonth(panelYear, panelMonth - 1);
            switchMonthPrevious();
            setPanelDate((prevState) => (newValue + daysInAPrevMonth));
        }
    };

    return {
        monthDateCells,
        weekDateCells,
        weekDates,
        year: panelYear,
        month: panelMonth,
        date: panelDate,
        controls: {
            switchYear,
            switchMonthNext,
            switchMonthPrevious,
            switchDateNext,
            switchDatePrevious,
        },
    };
};
