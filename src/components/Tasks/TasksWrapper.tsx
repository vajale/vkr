import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { memo, useEffect, useMemo, useState } from "react";
import { LucideIcon, MaterialIcon } from "@/assets/Icon";
import {
    type DragEndEvent,
    DndContext,
    closestCenter,
    useSensor,
    MouseSensor,
    useSensors,
} from "@dnd-kit/core";
import TaskColumn from "@/components/Tasks/TaskColumn";
import { type Task } from "../PageView/model/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { calendarActions, selectTasks } from "@/store/slices/calendarSlice";
import { useGetTasksQuery, useUpdateAllTasksMutation } from "@/api/tasksApi/endpoints";
import { selectUserId } from "@/store/slices/userSlice";

function customCollisionDetection ({ active, droppableRects, droppableContainers }) {
    if (!active?.rect?.current?.translated) {
        return [];
    }

    const activeRect = active.rect.current.translated;
    let closestId = null;
    let minDistance = Infinity;

    for (const droppableContainer of droppableContainers) {
        const id = droppableContainer.id;
        const rect = droppableRects.get(id);

        if (rect && rect.left !== undefined && rect.top !== undefined) {
            const distance = Math.sqrt(
                Math.pow(activeRect.left - rect.left, 2) + Math.pow(activeRect.top - rect.top, 2)
            );

            if (distance < minDistance) {
                minDistance = distance;
                closestId = id;
            }
        }
    }

    return closestId ? [{ id: closestId }] : [];
}

enum ColumnState {
    TODO = 'В очереди',
    DONE = 'Сделано',
    UNASSIGNED = 'Неприсвоено',
    IN_PROGRESS = 'В процессе'
}

const TasksWrapper = memo(() => {
    const dispatch = useAppDispatch();

    const [activeId, setActiveId] = useState(null);

    const userId = useAppSelector(selectUserId);
    const allTasks = useAppSelector(selectTasks);

    const { data, isLoading, isSuccess } = useGetTasksQuery({ userId });

    const [updateTasks, { isLoading: isUpdating }] = useUpdateAllTasksMutation();

    const handleUpdateTasks = () => {
        if (allTasks.length !== 0 || isUpdating) {
            void updateTasks({ tasks: allTasks, userId });
        }
    };

    useEffect(() => {
        handleUpdateTasks();
    }, [allTasks]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(calendarActions.setTasks(data));
        }
    }, [data]);

    const handleDragEnd = (e: DragEndEvent) => {
        const container = e.over?.id;

        const task: Task = e.active.data.current?.task;

        switch (container) {
            case ColumnState.TODO:
                dispatch(calendarActions.updateTaskPriority({ id: task.id, priority: '1' }));
                break;
            case ColumnState.IN_PROGRESS:
                dispatch(calendarActions.updateTaskPriority({ id: task.id, priority: '2' }));
                break;
            case ColumnState.DONE:
                dispatch(calendarActions.updateTaskPriority({ id: task.id, priority: '3' }));
                break;
            case ColumnState.UNASSIGNED:
                dispatch(calendarActions.updateTaskPriority({ id: task.id, priority: '4' }));
                break;
        }

        setActiveId(null);
    };

    const handleDragMove = (event: DragEndEvent) => {
        const container = event.over?.id;

        if (container) {
            setActiveId(container);
        }
    };

    const [todoTask, makeTask, finishedTask, errorTask] = useMemo(() => {
        const tasks1 = allTasks.filter(task => task.priority === '1');
        const tasks2 = allTasks.filter(task => task.priority === '2');
        const tasks3 = allTasks.filter(task => task.priority === '3');
        const tasks4 = allTasks.filter(task => task.priority === '4');

        return [tasks1, tasks2, tasks3, tasks4];
    }, [allTasks]);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    const sensors = useSensors(
        mouseSensor,
    );

    const activeItem = activeId !== null ? allTasks.find(item => item.id === activeId) : null;

    console.log(activeId);

    return (
        <Paper sx={{ width: '98%', margin: 1, height: '90%' }}>
            <Stack mt={2} mb={2} flexDirection={'row'} alignItems={'center'}>
                <Typography ml={3} mr={1} variant={'h5'}>
                    Задачи
                </Typography>
                <LucideIcon name={'LuStickyNote'}/>
            </Stack>
            <Box height={'90%'} sx={{ backgroundColor: 'whitesmoke' }} margin={1} borderRadius={1} p={2}>
                {isSuccess && <Stack flexDirection={'row'} gap={1} alignItems={'flex-start'}>
                    <DndContext
                        collisionDetection={customCollisionDetection}
                        onDragEnd={handleDragEnd}
                        onDragMove={handleDragMove}
                        sensors={sensors}
                    >
                        <TaskColumn activeId={activeId} priority={'1'} parentId={ColumnState.TODO} items={todoTask}/>
                        <TaskColumn activeId={activeId} priority={'2'} parentId={ColumnState.IN_PROGRESS} items={makeTask}/>
                        <TaskColumn activeId={activeId} priority={'3'} parentId={ColumnState.DONE} items={finishedTask}/>
                        <TaskColumn activeId={activeId} priority={'4'} parentId={ColumnState.UNASSIGNED} items={errorTask}/>
                    </DndContext>
                </Stack>}
            </Box>
        </Paper>
    );
});

export default TasksWrapper;
