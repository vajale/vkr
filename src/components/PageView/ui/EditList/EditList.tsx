import React from "react";

import { DocumentBlockType, type DocumentBlock } from "../../model/types";
import { useAppDispatch } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";
import { motion } from "framer-motion";
import { LucideIcon, MaterialIcon } from "@/assets/Icon";
import { StyledBox, StyledList, StyledListButton } from "@/components/PageView/ui/EditList/styled";

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

    const handleSwitchViewStyle = () => {
        dispatch(pageActions.updateBlock({
            ...block,
            simpleView: !block.simpleView
        }));
        onEdit();
    };

    const getBlockOptions = () => {
        switch (block.type) {
            case DocumentBlockType.IMAGE:
                return (
                    <StyledListButton fullWidth size={'small'} onClick={handleSwitchViewStyle}>
                        Изменить стиль
                        <LucideIcon name={'LuBookDown'}/>
                    </StyledListButton>
                );
        }
    };

    return (
        <StyledBox position={'absolute'}>
            <StyledList alignContent={'flex-start'}>
                <motion.div>
                    <StyledListButton fullWidth size={'small'}
                                      onClick={handleDeleteButtonClick}>
                        <MaterialIcon name={"MdDeleteOutline"}/>
                        Удалить
                    </StyledListButton>
                </motion.div>
                <motion.div>
                    <StyledListButton fullWidth size={'small'}
                                       onClick={handleDuplicateBlock}>
                        <MaterialIcon name={"MdOutlineNoteAlt"}/>
                        Дублировать
                    </StyledListButton>
                </motion.div>
                {getBlockOptions()}
            </StyledList>
        </StyledBox>
    );
};

export default EditList;
