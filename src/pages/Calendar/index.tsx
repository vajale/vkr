import { MainLayout } from "@/components/layouts/main/MainLayout";
import React from "react";
import { useCalendar } from "@/utils/hooks/useCalendar";
import { motion } from "framer-motion";
import { daysOfTheWeek, months } from "@/utils/hooks/useCalendar/lib/helpers";
import { Stack, Typography } from "@mui/material";

export const CalendarPage = () => {
    const { monthDateCells, date, month, year } = useCalendar({ inputValue: new Date(), selectedValue: new Date() });

    return (
        <MainLayout>
            <Stack ml={1}>
                <Typography>{`${months[month]} ${year}`}</Typography>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", height: 40 }}>
                    {daysOfTheWeek.map((cell) => <div>{cell}</div>)}
                </div>
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
                                opacity: dataCell.view?.type == "past" || dataCell.view?.type == "next" ? 0.3 : 1
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
