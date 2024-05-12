import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { documentPageActions, selectEditDocumentId, selectPage } from "@/store/slices/pageSlice";
import { Box, Button, Paper, Popover, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import React, { useEffect, useState } from "react";
import { closestCenter, DndContext, type DragEndEvent, MouseSensor, useSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { type DocumentBlock, DocumentBlockType } from "@/components/PageView/model/types";
import Dropable from "@/components/DnDComponents/Dropable/Dropable";
import DocumentBlockBase from "@/components/PageView/ui/DocumentBlockComponents/DocumentBlockBase/DocumentBlockBase";
import DocumentBlockCode from "@/components/PageView/ui/DocumentBlockComponents/DocumentBlockCode/DocumentBlockCode";
import DocumentBlockCheckbox
    from "@/components/PageView/ui/DocumentBlockComponents/DocumentCheckbox/DocumentBlockCheckbox";
import DocumentBlockText from "@/components/PageView/ui/DocumentBlockComponents/DocumentBlockText/DocumentBlockText";
import {
    DocumentPageLinkComponent
} from "@/components/PageView/ui/DocumentBlockComponents/DocumenkPageLinkComponent/DocumentPageLinkComponent";
import { useFirebaseAuth } from "@/components/FireBase";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userSlice";
import EmptyDocumentBlock from "@/components/PageView/ui/DocumentBlockComponents/EmptyDocumentBlock/EmptyDocumentBlock";
import DocumentBlockToDo from "@/components/PageView/ui/DocumentBlockComponents/DocumentBlockToDo/DocumentBlockToDo";

interface BlocksProps {
    docs: DocumentBlock[],
    onDocumentsChanges: () => void,
    canEdit?: boolean
}

const DocumentBlocksList = (props: BlocksProps) => {
    const { docs, onDocumentsChanges, canEdit = true } = props;

    const dispatch = useAppDispatch();

    const docId = useAppSelector(selectEditDocumentId);

    const handleDragEnd = async (e: DragEndEvent) => {
        const { active, over } = e;

        if (over === null || active.id === over.id) {
            return;
        }

        const oldIndex = docs.findIndex((block) => block.id === active.id);
        const newIndex = docs.findIndex((block) => block.id === over.id);
        const newArray = arrayMove(docs, oldIndex, newIndex);

        dispatch(documentPageActions.updateDocuments(newArray));
        onDocumentsChanges();
    };

    if (docs.length === 0) {
        return (
            <Stack flexDirection={'column'} alignItems={'flex-start'} gap={2}>
                <Button><MaterialIcon name={'MdPageview'}/><Typography ml={2}>Пустая страница</Typography></Button>
                <Button><MaterialIcon name={'MdOutlineTask'}/><Typography ml={2}>Список задач</Typography></Button>
                <Button><MaterialIcon name={'MdGrid3X3'}/><Typography ml={2}>Галерея</Typography></Button>
                <Button><MaterialIcon name={'MdCalendarToday'}/><Typography ml={2}>Календарь</Typography></Button>
            </Stack>
        );
    }

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 20
        }
    });

    const [anchorEl, setAnchorEl] = React.useState<null | EventTarget>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEmptySpaceClick = async () => {
        if (docs[docs.length - 1].content !== '') {
            dispatch(documentPageActions.addDocumentBlock(DocumentBlockType.TEXT));
        };
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div style={{ padding: 7, width: "100%" }}>
            <DndContext
                sensors={[mouseSensor]}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>
                <SortableContext items={docs} strategy={verticalListSortingStrategy}>
                    {/* eslint-disable-next-line array-callback-return */}
                    {docs.map((item) => {
                        const baseProps = {
                            ignoreButtonsHover: !canEdit,
                            // onAdd: handleAddDocuments,
                        };

                        const handleHotKeyClick = () => {
                        };

                        const handleDataUpdate = (data: string) => {
                            dispatch(
                                documentPageActions.updateDocumentBlock({
                                    ...item,
                                    content: data
                                })
                            );
                        };

                        const canEditDoc = canEdit;

                        switch (item.type) {
                            case DocumentBlockType.CODE:
                                return (
                                    <Dropable key={item.id} id={item.id}>
                                        <DocumentBlockBase canEdit={canEditDoc} item={item} {...baseProps}>
                                            <DocumentBlockCode
                                                canEdit={canEditDoc}
                                                block={item}
                                                onContentChange={handleDataUpdate}
                                            />
                                        </DocumentBlockBase>
                                    </Dropable>
                                );
                            case DocumentBlockType.CHECKBOX:
                                return (
                                    <Dropable key={item.id} id={item.id}>
                                        <DocumentBlockBase canEdit={canEditDoc} item={item} {...baseProps}>
                                            <DocumentBlockCheckbox
                                                canEdit={canEditDoc}
                                                block={item}
                                                onContentChange={handleDataUpdate}
                                            />
                                        </DocumentBlockBase>
                                    </Dropable>
                                );
                            case DocumentBlockType.TEXT:
                                return (
                                    <Dropable key={item.id} id={item.id}>
                                        <DocumentBlockBase canEdit={canEditDoc} item={item} {...baseProps}>
                                            <DocumentBlockText
                                                canEdit={canEditDoc}
                                                block={item}
                                                onHotKeyInput={handleHotKeyClick}
                                                onContentChange={handleDataUpdate}
                                            />
                                        </DocumentBlockBase>
                                    </Dropable>
                                );
                            case DocumentBlockType.LINK:
                                return (
                                    <Dropable key={item.id} id={item.id}>
                                        <DocumentBlockBase canEdit={canEditDoc} item={item} {...baseProps}>
                                            <DocumentPageLinkComponent block={item}/>
                                        </DocumentBlockBase>
                                    </Dropable>
                                );
                            case DocumentBlockType.TODO:
                                return (
                                    <Dropable key={item.id} id={item.id}>
                                        <DocumentBlockBase canEdit={canEditDoc} item={item} {...baseProps}>
                                            <DocumentBlockToDo block={item}/>
                                        </DocumentBlockBase>
                                    </Dropable>
                                );
                            default:
                                break;
                        }
                    })}
                    {/* <EmptyDocumentBlock onClick={handleEmptySpaceClick}/> */}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default DocumentBlocksList;
