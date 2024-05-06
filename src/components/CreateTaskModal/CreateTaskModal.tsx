import React, { type ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { calendarActions, selectCalendarTasks, selectEditTask, selectTaskById } from "@/store/slices/calendarSlice";
import { StyledCreateTaskModal } from "@/pages/Calendar/styled";
import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import CustomTimePicker from "@/components/TimePicker/CustomTimePicker";
import CustomRadioGroup from "@/components/RadioGroup/CustomRadioGroup";
import { type Task } from "@/components/PageView/model/types";
import { type DateCellItem } from "@/utils/hooks/useCalendar";

interface ModalProps {
    defaultDate: DateCellItem | null
    onTaskCreate: () => void
    modalOpen: boolean
}

const def = {
    id: new Date().toDateString(),
    priority: '1',
    content: '',
    time: ''
};

const CreateTaskModal = (props: ModalProps) => {
    const { defaultDate, modalOpen, onTaskCreate } = props;

    const dispatch = useAppDispatch();
    const selectedTask = useAppSelector(selectTaskById({ id: new Date(defaultDate?.year, defaultDate?.month, defaultDate?.date) }));

    const [task, setTask] = useState<Task>({
        id: new Date().toJSON(),
        priority: '1',
        content: '',
        time: '',
        date: new Date().toDateString()
    });

    useEffect(() => {
        if (selectedTask !== undefined) {
            setTask(selectedTask);
        }
    }, [selectedTask]);

    const handlePriorityChange = (priorityValue: string) => {
        setTask((prevState) => ({ ...prevState, priority: priorityValue }));
    };

    const handleTimeChange = (timeValue: string) => {
        setTask((prevState) => ({ ...prevState, time: timeValue }));
    };
    const handleChangeTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setTask((prevState) => ({ ...prevState, content: e.target.value }));
    };

    const handleSubmitCreateTask = () => {
        if (defaultDate !== null) {
            const newTask = structuredClone(task);
            newTask.date = new Date(defaultDate.year, defaultDate.month, defaultDate.date).toJSON();
            newTask.id = new Date(defaultDate.year, defaultDate.month, defaultDate.date).toJSON();

            dispatch(calendarActions.updateTasks(newTask));
            onTaskCreate();
        }
    };

    if (!modalOpen) {
        return null;
    }

    return (
        <Modal open={modalOpen}>
            <StyledCreateTaskModal justifyContent={'center'} alignContent={'center'}>
                <Typography mb={2}>Создать задачу</Typography>
                <Stack gap={3} justifyContent={'flex-start'}>
                    <TextField value={task.content}
                               variant={'outlined'}
                               size={'small'}
                               onChange={handleChangeTaskName}
                               placeholder={"Название задачи"}/>
                    <CustomTimePicker label={'Время'} defaultValue={task.time} onChange={handleTimeChange}/>
                    <CustomRadioGroup onChange={handlePriorityChange}
                                      items={['1', '2', '3', '4']}
                                      defaultValue={task.priority}/>
                    <Stack alignItems={'center'}>
                        <Button sx={{ maxWidth: 140 }} variant={'contained'}
                                onClick={handleSubmitCreateTask}>Добавить</Button>
                    </Stack>
                </Stack>
            </StyledCreateTaskModal>
        </Modal>
    );
};

export default CreateTaskModal;
