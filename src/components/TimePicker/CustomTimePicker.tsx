import React, { type ChangeEventHandler, useEffect, useState, type ChangeEvent } from "react";
import TimePicker from "react-time-picker";

import 'react-time-picker/dist/TimePicker.css';
import './CustomDatePicker.css';
import { Stack, Typography } from "@mui/material";

interface TimePickerProps {
    onChange: (time: string) => void
    label?: string,
    defaultValue?: string
}

const CustomTimePicker = ({ onChange, defaultValue, label }: TimePickerProps) => {
    const [time, setTime] = useState(defaultValue);

    useEffect(() => {
        onChange(time);
    }, [time]);

    const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setTime(() => event.target.value);
    };

    return (
        <Stack flexDirection={'row'} alignContent={'center'} gap={2}>
            <Typography>{label}</Typography>
            <input type={'time'} style={{ width: 100 }} value={time} onChange={(e) => {
                handleTimeChange(e);
            }}/>
        </Stack>
    );
};

export default CustomTimePicker;
