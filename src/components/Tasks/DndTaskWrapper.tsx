import React, { useState } from "react";

import { closestCenter, DndContext, type DragEndEvent, MouseSensor, useSensor } from "@dnd-kit/core";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import CreateTaskButton from "@/components/Tasks/CreateTaskButton";
import { type Task } from "@/components/PageView/model/types";
import Dropable from "@/components/DnDComponents/Dropable/Dropable";
import DndTask from "@/components/Tasks/DndTask";

interface TaskWrapperProps {
    label: string,
    items: Task[]
}

const DndTaskWrapper = ({ label = 'Задачи', items }: TaskWrapperProps) => {
    const [tasks, setTasks] = useState(items);

    const handleDragEnd = async (e: DragEndEvent) => {
        const { active, over } = e;

        if (over === null || active.id === over.id) {
            return;
        }

        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        const newArray = arrayMove(tasks, oldIndex, newIndex);

        setTasks(newArray);
    };

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 20,
        },
    });

    const haveTasks = false;

    return (
        <Paper sx={{ backgroundColor: 'white', minHeight: 70 }}>
            <Stack p={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography>{label}</Typography>
                <Button sx={{ width: 28, height: 28, minWidth: 28 }}>
                    |
                </Button>
            </Stack>
            <Stack p={2}>
                {haveTasks
                    ? <CreateTaskButton/>
                    : (
                        <DndContext onDragEnd={handleDragEnd} sensors={[mouseSensor]}
                                    collisionDetection={closestCenter}>
                            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                                {tasks.map((item) => (
                                    <Dropable key={item.id} id={item.id}>
                                        <DndTask task={item}/>
                                    </Dropable>
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}
            </Stack>

        </Paper>
    );
};

export default DndTaskWrapper;
