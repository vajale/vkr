import { FormControl, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import onChange = toast.onChange;

interface RadioProps {
    items: string[],
    defaultValue: string,
    onChange: (value: string) => void
}

const MUIColorsGroup = ["info", "success", "warning", "error"];

const CustomRadioGroup = (props: RadioProps) => {
    const { items, defaultValue, onChange } = props;

    const [selectedValue, setSelectedValue] = React.useState(defaultValue);

    useEffect(() => {
        onChange(selectedValue);
    }, [selectedValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(() => event.target.value);
    };

    const controlProps = (item: string) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    return (
        <FormControl>
            <Stack flexDirection={'row'} alignItems={'center'}>
                <FormLabel id="controlled-radio-buttons-group">Важность</FormLabel>
                <RadioGroup>
                    <Stack flexDirection={'row'}>
                        {items.map((item, index) =>
                            <Radio key={index + item} {...controlProps(item)} color={MUIColorsGroup[index]}/>
                        )}
                    </Stack>
                </RadioGroup>
            </Stack>
        </FormControl>
    );
};

export default CustomRadioGroup;
