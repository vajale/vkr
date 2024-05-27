import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { Button, Paper, Stack } from "@mui/material";
import { type Task } from "@/components/PageView/model/types";
import { MaterialIcon } from "@/assets/Icon";
import EditableTextField from "../PageView/ui/EditableTextField/EditableTextField";
import { useSortable } from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";

interface TaskProps {
    task: Task
}

const DndTask = ({ task }: TaskProps) => {
    const [canEdit, setEdit] = useState(false);

    const { setNodeRef, listeners, attributes, transform, active } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Translate.toString(transform),
        color: "none",
        height: "auto",
        display: "flex",
        border: "none",
        opacity: active?.id === task.id ? 0.7 : 1,
    };

    const handleSwitchEdit = () => {
        setEdit(prevState => !prevState);
    };

    return (
        <div id={task.id} ref={setNodeRef} {...listeners} {...attributes} style={style}>
            <Paper sx={{ padding: 1 }}>
                <Stack width={"100%"} flexDirection={'row'} justifyContent={'space-between'}>
                    <EditableTextField width={'200px'} canEdit={canEdit} title={task.content}/>
                    <Button onClick={handleSwitchEdit} size={'small'} sx={{ width: 28, height: 28, minWidth: 28 }}>
                        <MaterialIcon name={'MdEdit'}/>
                    </Button>
                </Stack>
            </Paper>
        </div>

    );
};

export default DndTask;
