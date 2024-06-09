import React, { useEffect, useState } from "react";
import { MainLayout } from "@/components/layouts/main/MainLayout";
import { Box } from "@mui/material";
import CalendarHeader from "@/pages/Calendar/CalendarHeader";
import CalendarMonthWrapper from "@/pages/Calendar/CalendarMonthWrapper";
import { type DateCellItem, useCalendar } from "@/utils/hooks/useCalendar";

import CreateTaskModal from "@/components/CreateTaskModal/CreateTaskModal";
import { useUpdateAllTasksMutation } from "@/api/tasksApi/endpoints";
import { useAppSelector } from "@/store/hooks";
import { selectTasks } from "@/store/slices/calendarSlice";
import { selectUserId } from "@/store/slices/userSlice";

const CalendarPage = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCellDate, setSelectedCellDate] = useState<DateCellItem | null>(null);

    const tasks = useAppSelector(selectTasks);
    const userId = useAppSelector(selectUserId);

    const [updateTasks, { isLoading: isUpdating }] = useUpdateAllTasksMutation();

    const { monthDateCells, date, month, year, controls } = useCalendar({
        selectedValue: new Date()
    });

    const { switchMonthNext, switchMonthPrevious } = controls;

    const handleOpenCreateTaskModal = (date: DateCellItem) => {
        setSelectedCellDate(date);
        setModalOpen(true);
    };

    useEffect(() => {
        if (tasks.length !== 0 || isUpdating) {
            void updateTasks({ tasks, userId });
        }
    }, [tasks]);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <MainLayout>
            <Box padding={1}>
                <CalendarHeader
                    month={month}
                    date={date}
                    year={year}
                    onNext={switchMonthNext}
                    onPrevious={switchMonthPrevious}/>
                <CalendarMonthWrapper
                    onCellClick={handleOpenCreateTaskModal}
                    tasks={tasks}
                    cells={monthDateCells}/>
                <CreateTaskModal
                    onClose={handleCloseModal}
                    modalOpen={modalOpen}
                    defaultDate={selectedCellDate}
                    onTaskCreate={handleCloseModal}/>
            </Box>
        </MainLayout>
    );
};

export default CalendarPage;
