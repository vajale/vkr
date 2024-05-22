import React from "react";
import { motion } from "framer-motion";
import { type DateCellItem } from "@/utils/hooks/useCalendar";
import { Box, Stack } from "@mui/material";

interface CellProps {
    cell: DateCellItem
    onClick?: (date: DateCellItem) => void
    content?: React.ReactNode | null
}

const CalendarCell = (props: CellProps) => {
    const { cell, onClick, content } = props;

    return (
        <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'whitesmoke' }}
            onClick={() => {
                if (onClick != null) {
                    if (cell.view?.type !== "next" || cell.view?.type !== 'past') {
                        onClick(cell);
                    }
                }
            }}
            style={{
                border: 'none',
                height: 100,
                width: 160,
                padding: 7,
                opacity: cell.view?.type === "past" || cell.view?.type === "next" ? 0.3 : 1
            }}>
            <Stack flexDirection={'column'} alignItems={'flex-start'} width={'100%'} height={'100%'}>
                {cell.date}
                {content ?? content}
            </Stack>
        </motion.button>
    );
};

export default CalendarCell;
