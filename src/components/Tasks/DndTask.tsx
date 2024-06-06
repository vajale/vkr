import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { Button, Paper, Stack } from "@mui/material";
import { type Task } from "@/components/PageView/model/types";
import { MaterialIcon } from "@/assets/Icon";
import { useSortable } from "@dnd-kit/sortable";
import EditableTextField from "../PageView/ui/EditableTextField/EditableTextField";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";

interface TaskProps {
    task: Task
}

const DndTask = ({ task }: TaskProps) => {
    const [canEdit, setEdit] = useState(false);

    const { setNodeRef, listeners, attributes, transform, active, transition, isDragging } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Translate.toString(transform),
        color: "none",
        height: "auto",
        display: "flex",
        border: "none",
        opacity: isDragging,
        transition,
        cursor: 'move',
    };

    const handleSwitchEdit = () => {
        setEdit(prevState => !prevState);
    };

    return (
        <motion.div id={task.id} ref={setNodeRef} {...listeners} {...attributes} style={style}>
            <Paper sx={{ padding: 1, minWidth: 200 }}>
                <Stack width={"100%"} flexDirection={'row'} justifyContent={'space-between'}>
                    <EditableTextField width={'200px'} canEdit={canEdit} title={task.content} placeholder={task.id}/>
                    <Button onClick={handleSwitchEdit} size={'small'} sx={{ width: 28, height: 28, minWidth: 28 }}>
                        <MaterialIcon name={'MdEdit'}/>
                    </Button>
                </Stack>
            </Paper>
        </motion.div>

    );
};

export default DndTask;
