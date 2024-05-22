import React, { useMemo, useState } from "react";

import { DocumentBlockType, type DocumentBlock } from "../../model/types";
import { Button, FormControl, MenuItem, Popover, Select, Stack } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";
import { motion } from "framer-motion";
import { MaterialIcon } from "@/assets/Icon";
import { StyledBox, StyledList } from "@/components/PageView/ui/EditList/styled";
import EditTextSelect from "@/components/PageView/ui/EditList/EditTextSelect";
import EditColorSelect from "@/components/PageView/ui/EditList/EditColorSelect";

interface EditListProps {
    block: DocumentBlock,
    onEdit: () => void
}

const EditList = ({ block, onEdit }: EditListProps) => {
    const dispatch = useAppDispatch();

    const handleDeleteButtonClick = () => {
        dispatch(pageActions.removeBlock({ id: block.id }));
        onEdit();
    };

    const handleDuplicateBlock = () => {
        dispatch(pageActions.duplicateBlock({
            ...block,
            id: new Date().toJSON()
        }));
        onEdit();
    };

    return (
        <StyledBox position={'absolute'}>
            <StyledList alignContent={'flex-start'}>
                <motion.div>
                    <Button fullWidth sx={{ maxHeight: 40 }}
                            onClick={handleDeleteButtonClick}>
                        <MaterialIcon name={"MdDeleteOutline"}/>
                        Удалить
                    </Button>
                </motion.div>
                <motion.div>
                    <Button fullWidth sx={{ maxHeight: 40 }}
                            onClick={handleDuplicateBlock}>
                        <MaterialIcon name={"MdOutlineNoteAlt"}/>
                        Дублировать
                    </Button>
                </motion.div>
                {/* <motion.div> */}
                {/*    <Stack gap={2}> */}
                {/*        <EditTextSelect block={block} onSelect={handleSelectChange}/> */}
                {/*        <EditColorSelect block={block} onSelect={handleSelectChange}/> */}
                {/*    </Stack> */}
                {/* </motion.div> */}
            </StyledList>
        </StyledBox>
    );
};

export default EditList;
