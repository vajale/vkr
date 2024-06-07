import React, { memo } from "react";

import { Button, Paper, Stack, Typography } from "@mui/material";
import { type Task } from "@/components/PageView/model/types";
import ColumnTask from "@/components/Tasks/ColumnTask";
import { useDroppable } from "@dnd-kit/core";
import CreateTaskButton from "@/components/Tasks/CreateTaskButton";
import { getBackground } from "@/utils/mock/mockdata";

interface TaskWrapperProps {
    parentId: string,
    priority: string,
    items: Task[],
    bgColor?: string,
}

const TaskColumn = memo(({ parentId = 'Задачи', items, bgColor, priority }: TaskWrapperProps) => {
    const { setNodeRef } = useDroppable({
        id: parentId,
    });

    return (
        <Paper sx={{ width: 320, minHeight: 300, maxHeight: 600, overflowX: 'auto', overflowY: 'none' }}>
            <Stack p={2} m={1} borderRadius={1} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ backgroundColor: getBackground(priority) }}>
                <Typography fontWeight={700} variant={'h5'}>{parentId}</Typography>
                <Button sx={{ width: 28, height: 28, minWidth: 28 }}>
                </Button>
            </Stack>
            <Stack gap={2} p={2}>
                <div ref={setNodeRef}>
                    {items.map((item, key) => (
                        <ColumnTask key={item.id}
                                    task={item}
                                    index={key}
                                    parent={parentId}
                        />
                    ))}
                    <CreateTaskButton id={priority}/>
                </div>
            </Stack>
        </Paper>
    );
});

export default TaskColumn;
