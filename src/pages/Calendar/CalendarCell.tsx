import React from "react";
import { motion } from "framer-motion";
import { type DateCellItem } from "@/utils/hooks/useCalendar";
import { Box, Stack } from "@mui/material";
import { getBackground } from "@/utils/mock/mockdata";
import { StyledCalendarCell } from "@/pages/Calendar/styled";

interface CellProps {
    cell: DateCellItem
    onClick?: (date: DateCellItem) => void
    content?: React.ReactNode | null
}

const CalendarCell = (props: CellProps) => {
    const { cell, onClick, content } = props;

    return (
        <StyledCalendarCell
            whileHover={{ scale: 1.05, border: '1px rgb(0,0,0,0.1) solid' }}
            onClick={() => {
                if (onClick != null) {
                    if (cell.view?.type !== "next" || cell.view?.type !== 'past') {
                        onClick(cell);
                    }
                }
            }}
            style={{
                opacity: cell.view?.type === "past" || cell.view?.type === "next" ? 0.3 : 1,
            }}>
            <Stack flexDirection={'column'} alignItems={'flex-start'} width={'100%'} height={'100%'}>
                {cell.date}
                {content}
            </Stack>
        </StyledCalendarCell>
    );
};

export default CalendarCell;
