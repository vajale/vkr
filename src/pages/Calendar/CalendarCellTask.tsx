import { type Task } from "@/components/PageView/model/types";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { MaterialIcon } from "@/assets/Icon";
import { useAppDispatch } from "@/store/hooks";
import { calendarActions } from "@/store/slices/calendarSlice";
import { getBackground } from "@/utils/mock/mockdata";

interface TaskProps {
    task: Task
}

const CalendarCellTask = (props: TaskProps) => {
    const { task } = props;

    const dispatch = useAppDispatch();

    const handleRemoveTask = () => {
        dispatch(calendarActions.removeTask(task));
    };

    return (
        <Stack sx={{
            backgroundColor: getBackground(task),
            borderRadius: 1,
            zIndex: 10,
            width: 140,
            maxHeight: 91,
            position: 'relative'
        }} padding={1} gap={1}
               flexDirection={'row'}>
            <Stack>
                <Typography sx={{ wordBreak: 'break-word', width: 110 }} gutterBottom>{task.content}</Typography>
                <Typography sx={{ borderRadius: 1, padding: 0.5, backgroundColor: 'whitesmoke' }}
                            gutterBottom>{task.time}</Typography>
            </Stack>
            <Button style={{ width: 20, position: 'absolute', minWidth: 24, maxWidth: 24, right: 7 }} size={'small'}
                    onClick={handleRemoveTask}>
                <MaterialIcon name={"MdDelete"}/>
            </Button>
        </Stack>
    );
};

export default CalendarCellTask;
