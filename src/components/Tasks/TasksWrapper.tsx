import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { MaterialIcon } from "@/assets/Icon";
import DndTaskWrapper from "./DndTaskWrapper";
import { mocktasks, mocktasks2, mocktasks3, mocktasks4 } from "@/utils/mock/mockdata";
import { closestCenter, DndContext, type DragEndEvent, MouseSensor, useSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const TasksWrapper = () => {
    const [tasks, setTasks] = useState([...mocktasks, ...mocktasks2, ...mocktasks3, ...mocktasks4]);

    const handleDragEnd = async (e: DragEndEvent) => {
        const { active, over, collisions } = e;

        if (over === null || active.id === over.id) {
            return;
        }

        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        const newArray = arrayMove(tasks, oldIndex, newIndex);

        if (over) {
            const overNodeId = document.querySelector(`[id="${over.id}"]`).parentNode.id;

            setTasks(tasks.map((item) => {
                if (item.id === active.id) {
                    item.priority = overNodeId;
                }

                return item;
            }));
        }

        setTasks(newArray);
    };

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 20,
        },
    });

    const handleDragMove = (e: DragEndEvent) => {
        const { active, over, collisions } = e;
        //
        // if (collisions != null) {
        //     collisions.map(item => { console.log(item.data.droppableContainer.node.current.parentNode); });
        // }
    };

    return (
        <Paper sx={{ width: '98%', margin: 1, height: '90%' }}>
            <Stack mt={2} mb={2} flexDirection={'row'} alignItems={'center'}>
                <Typography ml={3} mr={1} mb={2} variant={'h5'}>
                    Задачи
                </Typography>
                <MaterialIcon name={'MdFavoriteBorder'}/>
            </Stack>
            <Box height={'90%'} sx={{ backgroundColor: 'whitesmoke' }} margin={1} borderRadius={1}>
                <Grid container spacing={3} gap={1} padding={5}>
                    <DndContext onDragMove={handleDragMove} onDragEnd={handleDragEnd} sensors={[mouseSensor]} collisionDetection={closestCenter}>
                        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                            <Grid xs>
                                <DndTaskWrapper tabId={1} items={tasks.filter(task => task.priority == '1')} label={'Сделать'}/>
                            </Grid>
                            <Grid xs>
                                <DndTaskWrapper tabId={2} items={tasks.filter(task => task.priority == '2')} label={'Делается'}/>
                            </Grid>
                            <Grid xs>
                                <DndTaskWrapper tabId={3} items={tasks.filter(task => task.priority == '3')} label={'Сделано'}/>
                            </Grid>
                            <Grid xs>
                                <DndTaskWrapper tabId={4} items={tasks.filter(task => task.priority == '4')} label={'Проблемы'}/>
                            </Grid>
                        </SortableContext>
                    </DndContext>
                </Grid>
            </Box>
        </Paper>
    );
};

export default TasksWrapper;
