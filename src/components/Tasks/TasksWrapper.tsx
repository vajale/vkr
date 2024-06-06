import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { MaterialIcon } from "@/assets/Icon";
import DndTaskWrapper from "./DndTaskWrapper";
import { closestCenter, DndContext, type DragEndEvent, MouseSensor, useSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { calendarActions, selectTasks } from "@/store/slices/calendarSlice";
import KanbanBoard from "@/components/DnDComponents/Dropable/Test";

const TasksWrapper = () => {
    const dispatch = useAppDispatch();

    const tasks = useAppSelector(selectTasks);

    const handleDragEnd = async (e: DragEndEvent) => {
        const { active, over } = e;

        if (over === null || active.id === over.id) {
            return;
        }

        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        const newArray = arrayMove(tasks, oldIndex, newIndex);

        if (over) {
            const overNodeId = document.querySelector(`[id="${over.id}"]`).parentNode.id;
            const findTask = tasks.find(task => task.id === active.id);

            console.log(overNodeId);

            if (overNodeId) {
                dispatch(calendarActions.updateTaskPriority({ id: findTask.id, priority: overNodeId }));
            }
        }
    };

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 20,
        },
    });

    const [todoTask, makeTask, finishedTask, errorTask] = useMemo(() => {
        const tasks1 = tasks.filter(task => task.priority === '1');
        const tasks2 = tasks.filter(task => task.priority === '2');
        const tasks3 = tasks.filter(task => task.priority === '3');
        const tasks4 = tasks.filter(task => task.priority === '4');

        return [tasks1, tasks2, tasks3, tasks4];
    }, [tasks]);

    return (
        <Paper sx={{ width: '98%', margin: 1, height: '90%' }}>
            <Stack mt={2} mb={2} flexDirection={'row'} alignItems={'center'}>
                <Typography ml={3} mr={1} mb={2} variant={'h5'}>
                    Задачи
                </Typography>
                <MaterialIcon name={'MdFavoriteBorder'}/>
            </Stack>
            <Box height={'90%'} sx={{ backgroundColor: 'whitesmoke' }} margin={1} borderRadius={1}>
                <KanbanBoard/>
            </Box>
        </Paper>
    );
};

export default TasksWrapper;
