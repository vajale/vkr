import React, { useMemo } from "react";
import CalendarCell from "@/pages/Calendar/CalendarCell";
import { type DateCellItem } from "@/utils/hooks/useCalendar";
import { StyledCalendarGrid } from "@/pages/Calendar/styled";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { calendarActions, selectCalendarTasks } from "@/store/slices/calendarSlice";
import CalendarCellTask from "@/pages/Calendar/CalendarCellTask";
import { type Task } from "@/components/PageView/model/types";

interface WrapperProps {
    cells: DateCellItem[]
    onCellClick: (date: DateCellItem) => void
}

const CalendarMonthWrapper = (props: WrapperProps) => {
    const { cells, onCellClick } = props;

    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectCalendarTasks);

    const handleCellClick = (date: DateCellItem, task: Task | null) => {
        // if (task != null) {
        //     dispatch(calendarActions.selectTask(task));
        // }

        onCellClick(date);
    };

    const cellsToRender = useMemo(() => cells.map((cell) => {
        const key = new Date(cell.year, cell.month, cell.date).toJSON();
        const taskForDate = tasks.find((task) => task.date === key);

        if (taskForDate != null) {
            const cellContent = <CalendarCellTask task={taskForDate}/>;

            return <CalendarCell content={cellContent}
                                 cell={cell}
                                 key={key}/>;
        }

        return <CalendarCell onClick={(date) => { handleCellClick(date, null); }} cell={cell} key={key}/>;
    }), [cells, tasks]);

    return (
        <StyledCalendarGrid>
            {cellsToRender}
        </StyledCalendarGrid>
    );
};

export default CalendarMonthWrapper;
