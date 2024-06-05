import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pageActions, selectPageDocuments } from "@/store/slices/pageSlice";
import { Button, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import {
    closestCenter,
    DndContext,
    type DragEndEvent,
    MouseSensor,
    useSensor,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { type DocumentBlock, DocumentBlockType } from "@/components/PageView/model/types";
import Dropable from "@/components/DnDComponents/Dropable/Dropable";
import DocumentBlockBase from "@/components/PageView/ui/DocumentBlockComponents/DocumentBlockBase/DocumentBlockBase";
import DocumentBlockCode from "@/components/PageView/ui/DocumentBlockComponents/DocumentBlockCode/DocumentBlockCode";
import DocumentBlockCheckbox from "@/components/PageView/ui/DocumentBlockComponents/DocumentCheckbox/DocumentBlockCheckbox";
import DocumentBlockText from "@/components/PageView/ui/DocumentBlockComponents/DocumentBlockText/DocumentBlockText";
import { DocumentPageLinkComponent } from "@/components/PageView/ui/DocumentBlockComponents/DocumenkPageLinkComponent/DocumentPageLinkComponent";

import EmptyDocumentBlock from "@/components/PageView/ui/DocumentBlockComponents/EmptyDocumentBlock/EmptyDocumentBlock";
import DocumentBlockToDo from "@/components/PageView/ui/DocumentBlockComponents/DocumentBlockToDo/DocumentBlockToDo";
import DocumentBlockImage from "@/components/PageView/ui/DocumentBlockComponents/DocumentBlockImage/DocumentBlockImage";

interface BlocksProps {
    docs: DocumentBlock[];
    onDocumentsChanges?: () => void;
    canEdit?: boolean;
}

const DocumentBlocksList = (props: BlocksProps) => {
    const { onDocumentsChanges, canEdit } = props;

    const dispatch = useAppDispatch();
    const blocks = useAppSelector(selectPageDocuments);

    const handleDragEnd = async (e: DragEndEvent) => {
        const { active, over } = e;

        if (over === null || active.id === over.id) {
            return;
        }

        const oldIndex = blocks.findIndex((block) => block.id === active.id);
        const newIndex = blocks.findIndex((block) => block.id === over.id);
        const newArray = arrayMove(blocks, oldIndex, newIndex);

        dispatch(pageActions.updateBlocks(newArray));

        if (onDocumentsChanges != null) {
            onDocumentsChanges();
        }
    };

    if (blocks.length === 0) {
        return (
            <Stack flexDirection={"column"} alignItems={"flex-start"} gap={2}>
                <Button>
                    <MaterialIcon name={"MdPageview"} />
                    <Typography ml={2}>Пустая страница</Typography>
                </Button>
                <Button>
                    <MaterialIcon name={"MdOutlineTask"} />
                    <Typography ml={2}>Список задач</Typography>
                </Button>
                <Button>
                    <MaterialIcon name={"MdGrid3X3"} />
                    <Typography ml={2}>Галерея</Typography>
                </Button>
                <Button>
                    <MaterialIcon name={"MdCalendarToday"} />
                    <Typography ml={2}>Календарь</Typography>
                </Button>
            </Stack>
        );
    }

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 20,
        },
    });

    return (
        <div style={{ padding: 7, width: "100%" }}>
            <DndContext
                sensors={[mouseSensor]}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>
                <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                    {blocks.map((item) => {
                        const baseProps = {
                            ignoreButtonsHover: !canEdit,
                            // onAdd: handleAddDocuments,
                        };

                        const handleHotKeyClick = () => {};

                        const handleDataUpdate = (data: string) => {
                            // dispatch(
                            //     pageActions.updateBlocks({
                            //         ...item,
                            //         content: data
                            //     })
                            // );

                            if (onDocumentsChanges != null) {
                                onDocumentsChanges();
                            }
                        };

                        const canEditDoc = canEdit;

                        switch (item.type) {
                            case DocumentBlockType.CODE:
                                return (
                                    <Dropable key={item.id} id={item.id}>
                                        <DocumentBlockBase
                                            canEdit={canEditDoc}
                                            item={item}
                                            {...baseProps}>
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
                                        <DocumentBlockBase
                                            canEdit={canEditDoc}
                                            item={item}
                                            {...baseProps}>
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
                                        <DocumentBlockBase
                                            canEdit={canEditDoc}
                                            item={item}
                                            {...baseProps}>
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
                                        <DocumentBlockBase
                                            canEdit={canEditDoc}
                                            item={item}
                                            {...baseProps}>
                                            <DocumentPageLinkComponent block={item} />
                                        </DocumentBlockBase>
                                    </Dropable>
                                );
                            case DocumentBlockType.IMAGE:
                                return (
                                    <Dropable key={item.id} id={item.id}>
                                        <DocumentBlockBase
                                            canEdit={canEditDoc}
                                            item={item}
                                            {...baseProps}>
                                            <DocumentBlockImage item={item} />
                                        </DocumentBlockBase>
                                    </Dropable>
                                );
                            case DocumentBlockType.TODO:
                                return (
                                    <Dropable key={item.id} id={item.id}>
                                        <DocumentBlockBase
                                            canEdit={canEditDoc}
                                            item={item}
                                            {...baseProps}>
                                            <DocumentBlockToDo
                                                canEdit={canEditDoc}
                                                onContentChange={handleDataUpdate}
                                                block={item}
                                            />
                                        </DocumentBlockBase>
                                    </Dropable>
                                );
                            default:
                                break;
                        }
                    })}
                    <EmptyDocumentBlock onClick={onDocumentsChanges} />
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default DocumentBlocksList;
