import React from "react";

import { Button, Paper, Stack, Typography } from "@mui/material";
import CreateTaskButton from "@/components/Tasks/CreateTaskButton";
import { type Task } from "@/components/PageView/model/types";
import Dropable from "@/components/DnDComponents/Dropable/Dropable";
import DndTask from "@/components/Tasks/DndTask";

interface TaskWrapperProps {
    label: string,
    tabId: string
    items: Task[],
}

const DndTaskWrapper = ({ label = 'Задачи', items, tabId }: TaskWrapperProps) => {
    const haveTasks = false;

    return (
        <Paper sx={{ backgroundColor: 'white', minHeight: 70 }}>
            <Stack p={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography>{label}</Typography>
                <Button sx={{ width: 28, height: 28, minWidth: 28 }}>
                    |
                </Button>
            </Stack>
            <Stack id={tabId} p={2}>
                {items.map((item) => (
                    <Dropable nodeId={item.id} key={item.id} id={item.id}>
                        <DndTask task={item}/>
                    </Dropable>
                ))}
                <CreateTaskButton/>
            </Stack>

        </Paper>
    );
};

export default DndTaskWrapper;
