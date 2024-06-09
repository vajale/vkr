import React, { memo } from "react";

import { Button, Paper, Stack, Typography } from "@mui/material";
import { type Task } from "@/components/PageView/model/types";
import ColumnTask from "@/components/Tasks/ColumnTask";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import CreateTaskButton from "@/components/Tasks/CreateTaskButton";
import { getBackground } from "@/utils/mock/mockdata";
import { SortableContext } from "@dnd-kit/sortable";

interface TaskWrapperProps {
    parentId: string,
    priority: string,
    items: Task[],
    bgColor?: string,
    activeId: unknown
}

const ColumnOfTasks = memo(({ parentId = 'Задачи', items, bgColor, priority, activeId }: TaskWrapperProps) => {
    const { setNodeRef } = useDroppable({
        id: parentId,
    });

    return (
        <Paper sx={{
            width: 320,
            opacity: activeId == parentId ? 0.6 : 1
        }}>
            <Stack p={2} m={1} borderRadius={1} flexDirection={'row'} alignItems={'center'}
                   justifyContent={'space-between'} sx={{ backgroundColor: getBackground(priority) }}>
                <Typography fontWeight={700} variant={'h5'}>{parentId}</Typography>
                <Button sx={{ width: 28, height: 28, minWidth: 28 }}>
                </Button>
            </Stack>
            <Stack gap={2} p={2} sx={{
                overflowX: 'none',
                overflowY: 'auto',
                minHeight: 300,
                maxHeight: 600,
            }}>
                <div ref={setNodeRef}>
                    {items.map((item, key) => (
                        <div key={item.id}>
                            <ColumnTask
                                task={item}
                                index={key}
                                parent={parentId}
                            />
                        </div>
                    ))}
                    <CreateTaskButton id={priority}/>
                </div>
            </Stack>
        </Paper>
    );
});

export default ColumnOfTasks;
