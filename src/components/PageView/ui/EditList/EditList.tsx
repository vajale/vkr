import React, { useMemo, useState } from "react";

import { DocumentBlockType, type DocumentBlock, type DocumentBlockBase } from "../../model/types";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { documentPageActions } from "@/store/slices/pageSlice";
import { motion } from "framer-motion";
import { MaterialIcon } from "@/assets/Icon";
import { StyledBox, StyledList } from "@/components/PageView/ui/EditList/styled";

interface EditListProps {
    block: DocumentBlock
}

const EditList = ({ block }: EditListProps) => {
    const [settingsList, setSettingsListOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    // @ts-expect-error
    const handleChange = (event) => {
        const type = event.target.value as string;

        dispatch(documentPageActions.updateDocumentBlock({
            ...block,
            textType: {
                ...block.textType,
                variant: type
            }
        }));
    };

    const blockTypeSettings = useMemo(() => {
        if (block.type === DocumentBlockType.TEXT) {
            return ['h1', 'h2', 'h3', 'h4', 'h5', 'subtitle1'].map((value, index) => (
                <MenuItem key={index} value={value}>
                    <MaterialIcon name={"MdNotes"}/>{value}
                </MenuItem>
            ));
        }

        return null;
    }, [block]);

    const handleDeleteButtonClick = () => {
        dispatch(documentPageActions.removeDocumentBlock({ id: block.id }));
        dispatch(documentPageActions.setEditDocumentId(''));
    };

    return (
        <StyledBox position={'absolute'}>
            <StyledList>
                <motion.div>
                    <Button fullWidth sx={{ maxHeight: 40 }}
                            onClick={handleDeleteButtonClick}>
                        <MaterialIcon name={"MdDeleteOutline"}/>
                        Удалить
                    </Button>
                </motion.div>
                <motion.div>
                    <Button fullWidth sx={{ maxHeight: 40 }}
                            onClick={handleDeleteButtonClick}>
                        <MaterialIcon name={"MdOutlineNoteAlt"}/>
                        Дублировать
                    </Button>
                </motion.div>
                <motion.div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={block.textType?.variant}
                            label="Тип"
                            onChange={handleChange}
                        >
                            {blockTypeSettings}
                        </Select>
                    </FormControl>
                </motion.div>
            </StyledList>
        </StyledBox>
    );
};

export default EditList;
