import { CSS } from "@dnd-kit/utilities";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Avatar, Box, Button, Paper, Stack } from "@mui/material";
import { type Task } from "@/components/PageView/model/types";
import { MaterialIcon } from "@/assets/Icon";
import { useSortable } from "@dnd-kit/sortable";
import EditableTextField from "../PageView/ui/EditableTextField/EditableTextField";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { MotionDivider } from "@/components/framer/Divider";
import { getBackground, getSecondaryBackground } from "@/utils/mock/mockdata";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { calendarActions } from "@/store/slices/calendarSlice";
import { useRemoveTaskMutation, useUpdateTaskMutation } from "@/api/tasksApi/endpoints";
import { selectAvatar, selectUserId, selectUsername } from "@/store/slices/userSlice";
import { formatDateString, stringAvatar } from "@/utils/helper/helpers";
import Draggable from "@/components/DnDComponents/Dropable/Draggable";
import Dropable from "@/components/DnDComponents/Dropable/Dropable";

interface TaskProps {
    task: Task,
    parent: string,
    index: number,
    onChange?: () => void
}

const ColumnTask = memo(({ task, parent, index, onChange }: TaskProps) => {
    const dispatch = useAppDispatch();

    const [canEdit, setEdit] = useState(false);
    const userId = useAppSelector(selectUserId);
    const username = useAppSelector(selectUsername);
    const avatar = useAppSelector(selectAvatar);

    const [updateTaskContent] = useUpdateTaskMutation();
    const [removeTask] = useRemoveTaskMutation();

    const { setNodeRef, listeners, attributes, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: {
            task,
            index,
            parent,
        },
    });

    const handleContentChange = (jsonString: string) => {
        dispatch(calendarActions.updateTask({ ...task, content: jsonString }));
        void updateTaskContent({ taskToUpdate: { ...task, content: jsonString }, userId });
    };

    const style = useMemo(() => {
        return {
            transform: CSS.Translate.toString(transform),
            color: "none",
            height: "auto",
            display: "flex",
            transition,
            marginBottom: 7,
            background: isDragging && 'rgba(0, 0, 0, 0.05)',
            opacity: isDragging ? 0.5 : 1,
            // cursor: canEdit ? 'cursor' : 'move',
        };
    }, [isDragging, transition, transform]);

    const handleSwitchEdit = useCallback(() => {
        setEdit(prevState => !prevState);
    }, []);

    const handleRemoveTask = useCallback(() => {
        dispatch(calendarActions.removeTask(task));
        void removeTask({ task, userId });
    }, []);

    const taskDate = useMemo(() => formatDateString(task.date), []);

    return (
            <motion.div ref={setNodeRef} {...listeners} {...attributes} style={style}>
                <Paper sx={{ padding: 1, minWidth: 200, width: '100%' }}>
                    <Stack width={"100%"} flexDirection={'row'} justifyContent={'space-between'}>
                        <Stack>
                            <Box maxWidth={'60%'} borderRadius={1} p={0.5} ml={0.8} mt={1}
                                 sx={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>{taskDate}</Box>
                            <EditableTextField width={'200px'} onContentChange={handleContentChange} canEdit={canEdit}
                                               title={task.content} placeholder={'...'}/>
                            {canEdit && <MotionDivider initial={{ scale: 0 }} animate={{ scale: 0.95 }} flexItem
                                                       orientation={'horizontal'}/>}
                            <Avatar {...stringAvatar(username)} />
                        </Stack>
                        <Stack>
                            <Button onClick={handleSwitchEdit} size={'small'}
                                    sx={{ width: 28, height: 28, minWidth: 28 }}>
                                <MaterialIcon name={'MdEdit'}/>
                            </Button>
                            <Button onClick={handleRemoveTask} size={'small'}
                                    sx={{ width: 28, height: 28, minWidth: 28 }}>
                                <MaterialIcon name={'MdDelete'}/>
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </motion.div>
    );
});

export default ColumnTask;
