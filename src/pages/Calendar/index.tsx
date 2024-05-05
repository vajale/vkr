import { MainLayout } from "@/components/layouts/main/MainLayout";
import React from "react";
import { useCalendar } from "@/utils/hooks/useCalendar";
import { motion } from "framer-motion";
import { daysOfTheWeek, months } from "@/utils/hooks/useCalendar/lib/helpers";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";

export enum CalendarSwitch {
    NEXT = "next",
    PREVIOUS = "prev",
}

export const CalendarPage = () => {
    const { monthDateCells, date, month, year, controls } = useCalendar({
        selectedValue: new Date(2024, 4, 5)
    });

    const { switchMonthNext, switchMonthPrevious } = controls;

    return (
        <MainLayout>
            <Stack ml={1} gap={1}>
                <Stack flexDirection={'row'} gap={1} justifyContent={'flex-end'}>
                    <Button onClick={switchMonthPrevious}>
                        <MaterialIcon name={'MdKeyboardArrowLeft'}/>
                    </Button>
                    <Typography width={230} variant={'h4'}>{`${months[month]} ${year}`}</Typography>
                    <Button onClick={switchMonthNext}>
                        <MaterialIcon name={'MdKeyboardArrowRight'}/>
                    </Button>
                </Stack>
                <Divider/>
                <Typography style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", height: 40 }}>
                    {daysOfTheWeek.map((cell) => <div key={cell}>{cell}</div>)}
                </Typography>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gridTemplateRows: 'repeat(7, 1fr)'
                }}>
                    {monthDateCells.map((dataCell) =>
                        <motion.div
                            whileHover={{ scale: 1.05, backgroundColor: 'whitesmoke' }}
                            style={{
                                height: 100,
                                width: 160,
                                padding: 7,
                                opacity: dataCell.view?.type === "past" || dataCell.view?.type === "next" ? 0.3 : 1
                            }}
                            key={dataCell.date}>
                            {dataCell.date}
                        </motion.div>
                    )}
                </div>
            </Stack>

        </MainLayout>
    );
};
