import React, { useState } from "react";

import { DocumentBlockType, type DocumentBlock } from "../../model/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pageActions, selectPage } from "@/store/slices/pageSlice";
import { LucideIcon, MaterialIcon } from "@/assets/Icon";
import { StyledEditBox, StyledList, StyledListButton } from "@/components/PageView/ui/EditList/styled";
import { useClickOutside } from "@/utils/hooks/useClickOutside";
import { Divider, Stack, Typography } from "@mui/material";
import { formatDateString } from "@/utils/helper/helpers";
import { selectUsername } from "@/store/slices/userSlice";
import EditColorSelect from "@/components/PageView/ui/EditList/EditColorSelect";

interface EditListProps {
    block: DocumentBlock,
    onEdit: () => void,
    onOutsideClick: () => void
}

const EditList = ({ block, onEdit, onOutsideClick }: EditListProps) => {
    const dispatch = useAppDispatch();

    const [backgroundSelectOpen, setBackgroundSelectOpen] = useState<boolean>();

    const ref = useClickOutside(onOutsideClick);

    const username = useAppSelector(selectUsername);
    const page = useAppSelector(selectPage);

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
    const handleOpenBackgroundSwitchColor = () => {
        setBackgroundSelectOpen(prevState => !prevState);
    };

    const handleSwitchViewStyle = () => {
        dispatch(pageActions.updateBlock({
            block: {
                ...block,
                simpleView: !block.simpleView
            },
            username
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
            case DocumentBlockType.TEXT:
                return (
                    <div style={{ position: 'relative' }}>
                        {/* <StyledListButton fullWidth size={'small'} onClick={handleSwitchViewStyle}> */}
                        {/*    <Typography>Изменить цвет</Typography> */}
                        {/*    <LucideIcon name={'LuPalette'}/> */}
                        {/* </StyledListButton> */}
                        <StyledListButton fullWidth size={'small'} onClick={handleOpenBackgroundSwitchColor}>
                            <Typography>Изменить задний фон</Typography>
                            <MaterialIcon name={'MdEdit'}/>
                        </StyledListButton>
                    </div>

                );
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <StyledEditBox width={240} animate={{ scale: 1 }} initial={{ scale: 0 }} ref={ref}>
                <Typography p={1}>Редактировать...</Typography>
                <StyledListButton fullWidth size={'small'}
                                  onClick={handleDeleteButtonClick}>
                    <Typography>
                        Удалить
                    </Typography>
                    <MaterialIcon name={"MdDelete"}/>
                </StyledListButton>
                <StyledListButton fullWidth size={'small'}
                                  onClick={handleDuplicateBlock}>
                    <Typography>
                        Дублировать
                    </Typography>
                    <LucideIcon name={"LuDatabase"}/>
                </StyledListButton>
                <Divider orientation={'horizontal'} sx={{ width: '90%' }}/>
                {getBlockOptions()}
                <Divider orientation={'horizontal'} sx={{ width: '90%' }}/>
                {block.creator?.date && (
                    <Stack mt={1} ml={1}>
                        <Typography sx={{ opacity: 0.6 }} fontSize={12}>Последние
                            изменения: {block.creator?.username}</Typography>
                        <Typography sx={{ opacity: 0.6 }} fontSize={12}>{formatDateString(block.creator?.date)}</Typography>
                    </Stack>
                )}
            </StyledEditBox>
            {backgroundSelectOpen &&
                <EditColorSelect onOutsideClick={() => {
                    setBackgroundSelectOpen(false);
                }} block={block} onSelect={onEdit}/>}
        </div>

    );
};

export default EditList;
