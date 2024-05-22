import React, { useMemo } from "react";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { type DocumentBlock, DocumentBlockType } from "@/components/PageView/model/types";
import { MenuItem } from "@mui/material";
import { pageActions } from "@/store/slices/pageSlice";
import { useAppDispatch } from "@/store/hooks";

interface Props {
    block: DocumentBlock,
    onSelect: (item: string) => void
}

const EditTextSelect = (props: Props) => {
    const { onSelect, block } = props;

    const [variant, setVariant] = React.useState(block.textType?.variant);

    const dispatch = useAppDispatch();

    const handleChange = (event: SelectChangeEvent) => {
        const type = event.target.value;

        setVariant(type);
        dispatch(pageActions.updateBlock({
            ...block,
            textType: {
                ...block.textType,
                variant: type
            }
        }));
    };

    const blockTypeSettings = useMemo(() => {
        if (block.type === DocumentBlockType.TEXT) {
            return ['h1', 'h2', 'h3', 'h4', 'h5', 'subtitle1'];
        }

        if (block.type === DocumentBlockType.CHECKBOX) {
            return ['h1', 'h2', 'h3', 'h4', 'h5', 'subtitle1'];
        }

        if (block.type === DocumentBlockType.TODO) {
            return ['h1', 'h2', 'h3', 'h4', 'h5', 'subtitle1'];
        }

        return null;
    }, [block]);

    return (
        <FormControl variant={'outlined'} fullWidth size="small">
            <InputLabel id="demo-select-small-label">Размер текста</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={variant}
                label={"Размер текста"}
                onChange={handleChange}
            >
                {blockTypeSettings?.map(item =>
                    <MenuItem value={item} key={item}>
                        {item}
                    </MenuItem>)
                }
            </Select>
        </FormControl>
    );
};

export default EditTextSelect;
