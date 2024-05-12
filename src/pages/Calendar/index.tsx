import React, { useState } from "react";
import { MainLayout } from "@/components/layouts/main/MainLayout";
import { Box } from "@mui/material";
import CalendarHeader from "@/pages/Calendar/CalendarHeader";
import CalendarMonthWrapper from "@/pages/Calendar/CalendarMonthWrapper";
import { type DateCellItem, useCalendar } from "@/utils/hooks/useCalendar";

import CreateTaskModal from "@/components/CreateTaskModal/CreateTaskModal";

const CalendarPage = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCellDate, setSelectedCellDate] = useState<DateCellItem | null>(null);

    const { monthDateCells, date, month, year, controls } = useCalendar({
        selectedValue: new Date()
    });

    const { switchMonthNext, switchMonthPrevious } = controls;

    const handleOpenCreateTaskModal = (date: DateCellItem) => {
        setSelectedCellDate(date);
        setModalOpen(true);
    };

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
                    cells={monthDateCells}/>
                 <CreateTaskModal
                    modalOpen={modalOpen}
                    defaultDate={selectedCellDate}
                    onTaskCreate={handleCloseModal}/>
            </Box>
        </MainLayout>
    );
};

export default CalendarPage;
