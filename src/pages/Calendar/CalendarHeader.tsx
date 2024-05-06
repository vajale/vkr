import React from "react";
import { MaterialIcon } from "@/assets/Icon";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { daysOfTheWeek, months } from "@/utils/hooks/useCalendar/lib/helpers";

interface HeaderProps {
    onNext: () => void
    onPrevious: () => void
    date: string | number
    month: number
    year: string | number
}

const CalendarHeader = (props: HeaderProps) => {
    const { onNext, onPrevious, year, month } = props;

    return (
        <div>
            <Stack flexDirection={'row'} gap={1} justifyContent={'flex-start'}>
                <Button onClick={onPrevious}>
                    <MaterialIcon name={'MdKeyboardArrowLeft'}/>
                </Button>
                <Typography display={'flex'}
                            justifyContent={'center'}
                            width={250} variant={'h4'}>
                    {`${months[month]} ${year}`}
                </Typography>
                <Button onClick={onNext}>
                    <MaterialIcon name={'MdKeyboardArrowRight'}/>
                </Button>
            </Stack>
            <Divider sx={{ mb: 2, mt: 2 }}/>
            <Typography style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", height: 40 }}>
                {daysOfTheWeek.map((cell) => <div key={cell}>{cell}</div>)}
            </Typography>
        </div>
    );
};

export default CalendarHeader;
