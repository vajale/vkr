import React, { memo, useRef } from "react";

import { useMouseHover } from "../../../model/hooks/useMouseHover";

import { Stack } from "@mui/material";
import { DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";
import { type DocumentBlock, type DocumentBlockType } from "../../../model/types";
import { MaterialIcon } from "@/assets/Icon";
import { motion } from "framer-motion";
import AddList from "@/components/PageView/ui/AddList/AddList";
import EditList from "@/components/PageView/ui/EditList/EditList";
import { useSortable } from "@dnd-kit/sortable";
import { StyledButton, StyledButtonsContainer } from "@/components/PageView/ui/PageView/styled";

interface DocumentBlockBaseProps {
    item: DocumentBlock;
    ignoreButtonsHover?: boolean;
    isAddMenuOpen?: boolean;
    onMove?: (id: string) => void;
    onAdd?: (type: DocumentBlockType) => void;
    children: React.ReactNode;
    onTypeChange?: (type: DocumentBlockType, id: string) => void;
    canEdit?: boolean;
}

const DocumentBlockBase = memo((props: DocumentBlockBaseProps) => {
    const { children, onAdd, item, ignoreButtonsHover = false, canEdit } = props;

    const [addListOpen, setAddListOpen] = React.useState(false);
    const [editListOpen, setEditListOpen] = React.useState(false);

    const dispatch = useAppDispatch();

    const { setNodeRef, listeners, attributes, transform, active } = useSortable({ id: item.id });

    const hoverRef = useRef<HTMLDivElement>(null);
    const [isHover] = useMouseHover(hoverRef);

    const style = {
        transform: CSS.Translate.toString(transform),
        color: "none",
        height: "auto",
        display: "flex",
        border: "none",
        opacity: active?.id === item.id ? 0.7 : 1,
    };

    // const handleTypeEdit = (type: DocumentBlockType) => {
    //     dispatch(pageActions.updateDocumentType({ id: item.id, type }));
    // };

    const handleAddBlock = (type: DocumentBlockType) => {
        if (onAdd != null) {
            onAdd(type);
        }

        setAddListOpen(false);
        setEditListOpen(false);
    };

    // const handleEditClick = () => {
    //     setAddListOpen(false);
    //     setEditListOpen(false);
    //     dispatch(pageActions.setEditDocumentId(''));
    // };

    const showButtons = canEdit && (isHover || addListOpen || editListOpen);

    const handleCloseLists = () => {
        setAddListOpen(false);
        setEditListOpen(false);
    };

    return (
        <motion.div ref={setNodeRef} style={style} id={item.id}>
            <Stack flexDirection={"row"} ref={hoverRef}>
                <Stack position={"relative"}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{ width: 60 }}>
                        <StyledButtonsContainer flexDirection={"row"}>
                            <StyledButton
                                onClick={() => {
                                    setAddListOpen((prevState) => !prevState);
                                    setEditListOpen(false);
                                    // dispatch(pageActions.setEditDocumentId(item.id));
                                }}>
                                <MaterialIcon name={"MdAdd"} />
                            </StyledButton>
                            <div id={item.id} {...listeners} {...attributes}>
                                <StyledButton
                                    onClick={() => {
                                        setEditListOpen((prevState) => !prevState);
                                        setAddListOpen(false);
                                        // dispatch(pageActions.setEditDocumentId(item.id));
                                    }}>
                                    {/* <MaterialIcon name={"MdGroup"}/> */}|
                                </StyledButton>
                            </div>
                        </StyledButtonsContainer>
                        {addListOpen && (
                            <AddList onEdit={handleCloseLists} onAddBlock={handleAddBlock} />
                        )}
                        {editListOpen && <EditList onEdit={handleCloseLists} block={item} />}
                    </motion.div>
                </Stack>
                {
                    <DndContext>
                        <div
                            style={{
                                width: 1100,
                                padding: 4,
                                borderRadius: 7,
                                opacity: editListOpen || addListOpen ? 0.7 : 1,
                            }}>
                            {children}
                        </div>
                    </DndContext>
                }
                <div id={item.id} {...listeners} {...attributes}>
                    <StyledButton
                        onClick={() => {
                            setEditListOpen((prevState) => !prevState);
                            setAddListOpen(false);
                            // dispatch(pageActions.setEditDocumentId(item.id));
                        }}>
                        {/* <MaterialIcon name={"MdGroup"}/> */}|
                    </StyledButton>
                </div>
            </Stack>
        </motion.div>
    );
});

export default DocumentBlockBase;
