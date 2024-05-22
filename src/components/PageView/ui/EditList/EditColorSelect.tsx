import { type DocumentBlock, DocumentBlockType } from "@/components/PageView/model/types";
import React, { useMemo } from "react";
import { useAppDispatch } from "@/store/hooks";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { pageActions } from "@/store/slices/pageSlice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem } from "@mui/material";
import { rainbowColors } from "@/utils/mock/mockdata";

interface Props {
    block: DocumentBlock,
    onSelect: (item: string) => void
}

const EditColorSelect = (props: Props) => {
    const { onSelect, block } = props;

    const [variant, setVariant] = React.useState(block.textType?.fontColor);

    const dispatch = useAppDispatch();

    const handleChange = (event: SelectChangeEvent) => {
        const color = event.target.value;

        if (color !== undefined) {
            setVariant(color);
            dispatch(pageActions.updateBlock({
                ...block,
                textType: {
                    ...block.textType,
                    fontColor: color
                }
            } as DocumentBlock));
        }
    };

    return (
        <FormControl variant={'outlined'} fullWidth size="small">
            <InputLabel id="demo-select-small-label">Цвет текста</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={variant}
                label={"Цвет текста"}
                onChange={handleChange}
            >
                {rainbowColors?.map(item =>
                    <MenuItem value={item} key={item}>
                        {item}
                    </MenuItem>)
                }
            </Select>
        </FormControl>
    );
};

export default EditColorSelect;
