import React, { memo, useEffect, useMemo } from "react";
import CalendarCell from "@/pages/Calendar/CalendarCell";
import { type DateCellItem } from "@/utils/hooks/useCalendar";
import { StyledCalendarGrid } from "@/pages/Calendar/styled";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { calendarActions, selectTasks } from "@/store/slices/calendarSlice";
import CalendarCellTask from "@/pages/Calendar/CalendarCellTask";
import { type Task } from "@/components/PageView/model/types";
import { useGetTasksQuery } from "@/api/tasksApi/endpoints";
import { selectUserId } from "@/store/slices/userSlice";
import { Box, Button, Stack, Typography } from "@mui/material";
import { trimDateTime } from "@/utils/helper/helpers";

interface WrapperProps {
    cells: DateCellItem[]
    tasks: Task[]
    onCellClick: (date: DateCellItem) => void,
}

const CalendarMonthWrapper = memo((props: WrapperProps) => {
    const { cells, onCellClick, tasks } = props;

    const dispatch = useAppDispatch();

    const userId = useAppSelector(selectUserId);

    const { data, isLoading, isSuccess } = useGetTasksQuery({ userId });

    useEffect(() => {
        if (isSuccess) {
            dispatch(calendarActions.setTasks(data));
        }
    }, [data]);

    const handleCellClick = (date: DateCellItem, task: Task | null) => {
        // if (task != null) {
        //     dispatch(calendarActions.selectTask(task));
        // }

        onCellClick(date);
    };

    const cellsToRender = useMemo(() => cells.map((cell) => {
        const key = new Date(cell.year, cell.month, cell.date).toJSON();
        const dateTasks = tasks.filter((task) => trimDateTime(task.date) === trimDateTime(key));

        const dateTask = tasks.find((task) => task.date === key);

        if (dateTasks.length > 1) {
            const boxOfTasks = () => (
                <Button>
                    <Box width={140} height={70}>
                        <Stack flexDirection={'row'}>
                            <Typography>Задачи: {dateTasks.length}</Typography>
                        </Stack>
                    </Box>
                </Button>
            );

            return <CalendarCell content={boxOfTasks()}
                                 cell={cell}
                                 key={key}/>;
        } else if (dateTask) {
             const taskContent = <CalendarCellTask task={dateTask}/>;

            return <CalendarCell content={taskContent}
                                 cell={cell}
                                 key={key}/>;
        }

        return <CalendarCell onClick={(date) => {
            handleCellClick(date, null);
        }} cell={cell} key={key}/>;
    }), [cells, tasks]);

    return (
        <StyledCalendarGrid>
            {cellsToRender}
        </StyledCalendarGrid>
    );
});

export default CalendarMonthWrapper;
