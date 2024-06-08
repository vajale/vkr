import React, { memo, useRef } from "react";

import { useMouseHover } from "../../../model/hooks/useMouseHover";

import { Stack } from "@mui/material";
import { DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";
import { type DocumentBlock, type DocumentBlockType } from "../../../model/types";
import { LucideIcon, MaterialIcon } from "@/assets/Icon";
import { motion } from "framer-motion";
import AddList from "@/components/PageView/ui/AddList/AddList";
import EditList from "@/components/PageView/ui/EditList/EditList";
import { useSortable } from "@dnd-kit/sortable";
import { StyledButton, StyledButtonsContainer } from "@/components/PageView/ui/PageView/styled";
import { useClickOutside } from "@/utils/hooks/useClickOutside";

interface DocumentBlockBaseProps {
    item: DocumentBlock;
    ignoreButtonsHover?: boolean;
    isAddMenuOpen?: boolean;
    onMove?: () => void;
    onAdd?: () => void;
    onEdit?: () => void;
    children: React.ReactNode;
    onTypeChange?: (type: DocumentBlockType, id: string) => void;
    canEdit?: boolean;
}

const DocumentBlockBase = memo((props: DocumentBlockBaseProps) => {
    const { children, item, canEdit, onEdit } = props;

    const [addListOpen, setAddListOpen] = React.useState(false);
    const [editListOpen, setEditListOpen] = React.useState(false);

    const { setNodeRef, listeners, attributes, transform, active } = useSortable({ id: item.id });

    const hoverRef = useRef<HTMLDivElement>(null);

    const style = {
        transform: CSS.Translate.toString(transform),
        color: "none",
        height: "auto",
        display: "flex",
        border: "none",
        opacity: active?.id === item.id ? 0.7 : 1,
    };

    const handleAddBlock = (type: DocumentBlockType) => {
        if (onEdit != null) {
            onEdit();
        }

        setAddListOpen(false);
        setEditListOpen(false);
    };

    const showButtons = canEdit && (addListOpen || editListOpen);

    const handleCloseLists = () => {
        setAddListOpen(false);
        setEditListOpen(false);

        if (onEdit != null) {
            onEdit();
        }
    };

    return (
        <motion.div ref={setNodeRef} style={style} id={item.id}>
            <Stack flexDirection={"row"} ref={hoverRef}>
                <Stack position={"relative"} flexDirection={'row'} alignItems={'center'}>
                    <motion.div style={{ width: 60, alignItems: 'center', display: 'flex', display: 'relative' }}>
                        <StyledButtonsContainer>
                            <StyledButton
                                onClick={() => {
                                    if (addListOpen) return null;

                                    setAddListOpen((prevState) => !prevState);
                                    setEditListOpen(false);
                                    // dispatch(pageActions.setEditDocumentId(item.id));
                                }}>
                                <MaterialIcon name={"MdAdd"} />
                            </StyledButton>
                            <div id={item.id} {...listeners} {...attributes}>
                                <StyledButton
                                    onClick={() => {
                                        if (editListOpen) return null;

                                        setEditListOpen((prevState) => !prevState);
                                        setAddListOpen(false);
                                        // dispatch(pageActions.setEditDocumentId(item.id));
                                    }}>
                                    <LucideIcon name={'LuGripVertical'}/>
                                </StyledButton>
                            </div>
                        </StyledButtonsContainer>
                        {addListOpen && <AddList onEdit={handleCloseLists}
                                                 onAddBlock={handleAddBlock} onOutsideClick={handleCloseLists} />}
                        {editListOpen && <EditList onEdit={handleCloseLists}
                                                   block={item} onOutsideClick={handleCloseLists}/>}
                    </motion.div>
                </Stack>
                {
                    <DndContext>
                        <div style={{ padding: 4, borderRadius: 7, opacity: editListOpen || addListOpen ? 0.7 : 1 }}>
                            {children}
                        </div>
                    </DndContext>
                }
            </Stack>
        </motion.div>
    );
});

export default DocumentBlockBase;
