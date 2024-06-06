import { Button, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { calendarActions } from "@/store/slices/calendarSlice";
import { type Task } from "@/components/PageView/model/types";

interface ButtonProps {
    id: string
}

const CreateTaskButton = (props: ButtonProps) => {
    const { id } = props;

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
    };

    return (
        <Button onClick={handleCreateTask}>
            <Stack width={'100%'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                <MaterialIcon name={'MdAdd'}/>
                <Typography marginLeft={1}>Создать задачу</Typography>
            </Stack>
        </Button>
    );
};

export default CreateTaskButton;
