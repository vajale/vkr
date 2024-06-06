import React, { useMemo } from "react";

import { Button, Paper, Stack, Typography } from "@mui/material";
import CreateTaskButton from "@/components/Tasks/CreateTaskButton";
import { type Task } from "@/components/PageView/model/types";
import Dropable from "@/components/DnDComponents/Dropable/Dropable";
import DndTask from "@/components/Tasks/DndTask";
import { SortableContext } from "@dnd-kit/sortable";

interface TaskWrapperProps {
    label: string,
    tabId: string
    items: Task[],
    bgColor: string
    createTask: (columnId: string) => void;
    updateTask: (id: string, content: string) => void;
    deleteTask: (id: string) => void;
    tasks: Task[];
}

const DndTaskWrapper = ({ label = 'Задачи', items, tabId, bgColor, createTask, tasks, deleteTask, updateTask }: TaskWrapperProps) => {
    return (
        <Paper sx={{ backgroundColor: bgColor, minHeight: 70, width: 300 }}>
            <Stack p={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography>{label}</Typography>
                <Button sx={{ width: 28, height: 28, minWidth: 28 }}>
                </Button>
            </Stack>
            <Stack id={tabId} gap={1} p={2}>
                    {items.map((item) => (
                        <Dropable id={item.id} key={item.id} nodeId={item.id}>
                            <DndTask key={item.id} task={item}/>
                        </Dropable>

                    ))}
                <CreateTaskButton id={tabId}/>
            </Stack>
        </Paper>
    );
};

export default DndTaskWrapper;
