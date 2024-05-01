import React, { memo, useEffect, useRef, useState } from "react";

import { useMouseHover } from "../../../model/hooks/useMouseHover";

import { Box, Button, Popover, Popper, Stack } from "@mui/material";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch } from "@/store/hooks";
import { documentPageActions } from "@/store/slices/pageSlice";
import { type DocumentBlock, type DocumentBlockType } from "../../../model/types";
import { MaterialIcon } from "@/assets/Icon";
import { motion } from "framer-motion";
import CreateList from "../../CreateList/CreateList";
import EditList from "@/components/PageView/ui/EditList/EditList";

interface DocumentBlockBaseProps {
    item: DocumentBlock;
    ignoreButtonsHover?: boolean;
    isAddMenuOpen?: boolean;
    onMove?: (id: string) => void;
    onAdd?: (type: DocumentBlockType) => void;
    children: React.ReactNode;
    onTypeChange?: (type: DocumentBlockType, id: string) => void;
    canEdit?: boolean
}

const DocumentBlockBase = memo((props: DocumentBlockBaseProps) => {
    const { children, onAdd, item, ignoreButtonsHover = false, canEdit } = props;

    const [addListOpen, setAddListOpen] = React.useState(false);
    const [editListOpen, setEditListOpen] = React.useState(false);

    const dispatch = useAppDispatch();

    const { setNodeRef, listeners, attributes, transform, active } = useDraggable({ id: item.id });

    const docRef = useRef<HTMLDivElement>(null);
    const [isHover] = useMouseHover(docRef);

    const style = {
        transform: CSS.Translate.toString(transform),
        color: "none",
        height: "auto",
        display: "flex",
        border: "none",
        opacity: active?.id === item.id ? 0.7 : 1,
    };

    useEffect(() => {
    }, [ignoreButtonsHover]);

    const handleTypeEdit = (type: DocumentBlockType) => {
        dispatch(documentPageActions.updateDocumentType({ id: item.id, type }));
    };

    const handleAddBlock = (type: DocumentBlockType) => {
        if (onAdd != null) {
            onAdd(type);
        }

        setAddListOpen(false);
        setEditListOpen(false);

        dispatch(documentPageActions.addDocumentBlock(type));
        dispatch(documentPageActions.setEditDocumentId(''));
    };

    const handleEditClick = () => {
        setAddListOpen(false);
        setEditListOpen(false);
        dispatch(documentPageActions.setEditDocumentId(''));
    };

    const showButtons = canEdit && (isHover || (addListOpen || editListOpen));

    return (
        <div ref={setNodeRef} style={style} id={item.id}>
            <Stack flexDirection={"row"} ref={docRef}>
                <Stack marginRight={2}>
                    <div style={{ width: 60 }}>
                        {showButtons && <motion.div initial={{ scale: 1 }} animate={{ scale: 1.1 }}>
                            <Stack flexDirection={"row"}>
                                <Button
                                    style={{
                                        minWidth: 30,
                                        borderRadius: 4,
                                    }}
                                    onClick={() => {
                                        setAddListOpen(prevState => !prevState);
                                        setEditListOpen(false);
                                        dispatch(documentPageActions.setEditDocumentId(item.id));
                                    }}>
                                    <MaterialIcon name={"MdAdd"}/>
                                </Button>
                                <div id={item.id} {...listeners} {...attributes}>
                                    <Button
                                        onClick={() => {
                                            setEditListOpen(prevState => !prevState);
                                            setAddListOpen(false);
                                            dispatch(documentPageActions.setEditDocumentId(item.id));
                                        }}
                                        style={{
                                            minWidth: 30,
                                            borderRadius: 4,
                                        }}>
                                        <MaterialIcon name={"MdGrid3X3"}/>
                                    </Button>
                                </div>
                            </Stack>
                        </motion.div>}
                        {addListOpen && <CreateList onTypeClick={handleAddBlock}/>}
                        {editListOpen && <EditList block={item}/> }
                    </div>
                </Stack>
                {(
                    <DndContext>
                        <div>{children}</div>
                    </DndContext>
                ) && children}
            </Stack>
        </div>
    );
});

export default DocumentBlockBase;
