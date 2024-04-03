import React, {memo, useEffect, useState} from "react";

import PageHeader from "../PageHeader/PageHeader";
import {Button, Paper, Stack} from "@mui/material";

import {documentPageActions, selectDocumentHeaderFlag, selectDocuments} from "../../../../store/slices/pageSlice";

import {
    type DragEndEvent,
    useSensor,
    MouseSensor,
    closestCenter,
    DndContext
} from "@dnd-kit/core";
import {SortableContext, arrayMove, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useAppDispatch, useAppSelector} from "@/store/hooks";

import {useFetchPagesQuery, useUpdatePageMutation} from "@/components/PageView/model/services/firebaseDocumentsAPI";
import {selectUser} from "@/store/slices/userSlice";
import { DocumentBlockType } from "../../model/types";
import Dropable from "@/components/DnDComponents/Dropable/Dropable";
import DocumentBlockBase from "../DocumentBlockComponents/DocumentBlockBase/DocumentBlockBase";
import DocumentBlockCode from "../DocumentBlockComponents/DocumentBlockCode/DocumentBlockCode";
import DocumentBlockText from "../DocumentBlockComponents/DocumentBlockText/DocumentBlockText";
import DocumentBlockCheckbox from "../DocumentBlockComponents/DocumentCheckbox/DocumentBlockCheckbox";
import {
    DocumentPageLinkComponent
} from "../DocumentBlockComponents/DocumenkPageLinkComponent/DocumentPageLinkComponent";


const PageView = memo(() => {
    const {data, isLoading, isError, refetch} = useFetchPagesQuery({userId: '2rLcXc4sd4WD97mu8o8jiyXRMxt1'})

    const [pageViewData, setPageViewData] = useState({
        currentId: "",
        isCanEdit: true
    });

    const dispatch = useAppDispatch();

    const isHaveHeader = useAppSelector(selectDocumentHeaderFlag);
    const {documentBlocks: docs} = useAppSelector(selectDocuments);
    const page = useAppSelector(selectDocuments);
    const user = useAppSelector(selectUser);

    const [updateRandomPage, {isLoading: updateLoading}] = useUpdatePageMutation()

    useEffect(() => {
        if(data) {
            dispatch(documentPageActions.setPage(data[0]))
        }
    }, [data, isLoading]);

    const handleDragEnd = async (e: DragEndEvent) => {
        const {active, over} = e;

        if (over === null || active.id === over.id) {
            return;
        }

        const oldIndex = docs.findIndex((block) => block.id === active.id);
        const newIndex = docs.findIndex((block) => block.id === over.id);
        const newArray = arrayMove(docs, oldIndex, newIndex);

        dispatch(documentPageActions.updateDocuments(newArray));
        updateRandomPage({userId: user.id, id: page.id, newPage: page}).then(() => refetch())
    };

    const handleDragMove = (e: DragEndEvent) => {
        const {active} = e;
    };

    const handleAddDocuments = () => {
        updateRandomPage({userId: user.id, id: page.id, newPage: page}).then(() => refetch())

    };

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 50
        }
    });

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (isError) {
        return <h2>Error</h2>;
    }

    return (
        <Stack flexDirection={"column"}>
            <PageHeader text={"Header"} isHaveHover={isHaveHeader}/>
            <Paper
                sx={{
                    width: 600,
                    height: 900,
                    p: 2,
                    bgcolor: "whitesmoke"
                }}>
                <h1>Page</h1>
                <DndContext
                    sensors={[mouseSensor]}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragMove={handleDragMove}>
                    <SortableContext items={docs} strategy={verticalListSortingStrategy}>
                        {docs.map((item) => {
                            const handleEditButtonClick = (id: string) => {
                                if (id === "") return;

                                setPageViewData((prevState) => ({...prevState, isCanEdit: false}));
                            };

                            const baseProps = {
                                // ignoreButtonsHover: pageViewData.isCanEdit,
                                onEditButtonClick: handleEditButtonClick,
                                onAdd: handleAddDocuments
                            };

                            const handleHotKeyClick = () => {
                            };

                            switch (item.type) {
                                case DocumentBlockType.CODE:
                                    return (
                                        <Dropable key={item.id} id={item.id}>
                                            <DocumentBlockBase item={item} {...baseProps}>
                                                <DocumentBlockCode
                                                    block={item}
                                                    onContentChange={(data) => {
                                                        dispatch(
                                                            documentPageActions.updateDocumentBlock({
                                                                ...item,
                                                                content: data
                                                            })
                                                        );
                                                    }}
                                                />
                                            </DocumentBlockBase>
                                        </Dropable>
                                    );
                                case DocumentBlockType.CHECKBOX:
                                    return (
                                        <Dropable key={item.id} id={item.id}>
                                            <DocumentBlockBase item={item} {...baseProps}>
                                                <DocumentBlockCheckbox
                                                    block={item}
                                                    onContentChange={(data) => {
                                                        dispatch(
                                                            documentPageActions.updateDocumentBlock({
                                                                ...item,
                                                                content: data
                                                            })
                                                        );
                                                    }}
                                                />
                                            </DocumentBlockBase>
                                        </Dropable>
                                    );
                                case DocumentBlockType.TEXT:
                                    return (
                                        <Dropable key={item.id} id={item.id}>
                                            <DocumentBlockBase item={item} {...baseProps}>
                                                <DocumentBlockText
                                                    block={item}
                                                    onHotKeyInput={handleHotKeyClick}
                                                    onContentChange={(data) => {
                                                        dispatch(
                                                            documentPageActions.updateDocumentBlock({
                                                                ...item,
                                                                content: data
                                                            })
                                                        );
                                                    }}
                                                />
                                            </DocumentBlockBase>
                                        </Dropable>
                                    );
                                case DocumentBlockType.LINK:
                                    return (
                                        <Dropable key={item.id} id={item.id}>
                                            <DocumentBlockBase item={item} {...baseProps}>
                                                <DocumentPageLinkComponent block={item}/>
                                            </DocumentBlockBase>
                                        </Dropable>
                                    );
                                default:
                                    break;
                            }
                        })}
                    </SortableContext>
                </DndContext>
            </Paper>
        </Stack>
    );
});

export default PageView;
