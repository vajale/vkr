import { type Task } from "@/components/PageView/model/types";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { MaterialIcon } from "@/assets/Icon";
import { useAppDispatch } from "@/store/hooks";
import { calendarActions } from "@/store/slices/calendarSlice";

interface TaskProps {
    task: Task
}

const CalendarCellTask = (props: TaskProps) => {
    const { task } = props;

    const dispatch = useAppDispatch();

    const handleRemoveTask = () => {
        dispatch(calendarActions.removeTask(task));
    };

    const getBackground = () => {
        switch (task.priority) {
            case '1':
                return '#00c9f5';
            case '2':
                return '#2aa600';
            case '3':
                return '#e1ef00';
            case '4':
                return '#c50000';
        }
    };

    return (
        <Stack sx={{ backgroundColor: getBackground(), borderRadius: 1, zIndex: 10, width: 140 }} padding={1} gap={1}
               flexDirection={'row'}>
            <Stack>
                <Typography gutterBottom>{task.content}</Typography>
                <Typography variant={'subtitle1'} gutterBottom>{task.time}</Typography>
            </Stack>
            <Button style={{ width: 20 }} size={'small'} onClick={handleRemoveTask}>
                <MaterialIcon name={"MdDelete"}/>
            </Button>
        </Stack>
    );
};

export default CalendarCellTask;
