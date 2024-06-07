import { Button, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { calendarActions } from "@/store/slices/calendarSlice";
import { type Task } from "@/components/PageView/model/types";
import { useAddTaskMutation } from "@/api/tasksApi/endpoints";
import { selectUserId } from "@/store/slices/userSlice";
import { getSecondaryBackground } from "@/utils/mock/mockdata";

interface ButtonProps {
    id: string
}

const CreateTaskButton = (props: ButtonProps) => {
    const { id } = props;

    const userId = useAppSelector(selectUserId);

    const [addTask] = useAddTaskMutation();

    const dispatch = useAppDispatch();

    const handleCreateTask = () => {
        const newTask: Task = {
            id: new Date().toJSON(),
            priority: id,
            content: '',
            time: '',
            date: new Date().toJSON()
        };

        dispatch(calendarActions.addTasks(newTask));
        void addTask({ task: newTask, userId });
    };

    return (
        <Button sx={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} onClick={handleCreateTask}>
            <Stack width={'100%'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                <MaterialIcon name={'MdAdd'}/>
                <Typography marginRight={1} variant={'small'} marginLeft={1}>Создать задачу</Typography>
            </Stack>
        </Button>
    );
};

export default CreateTaskButton;
