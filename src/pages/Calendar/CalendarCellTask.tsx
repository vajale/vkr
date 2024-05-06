import { type Task } from "@/components/PageView/model/types";
import { Box, Typography } from "@mui/material";
import React from "react";

interface TaskProps {
    task: Task
}

const CalendarCellTask = (props: TaskProps) => {
    const { task } = props;

    return (
        <Box width={'100%'}>
            <Typography gutterBottom>{task.content}</Typography>
        </Box>
    );
};

export default CalendarCellTask;
