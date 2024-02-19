import React, { useState } from "react";

import PageHeader from "../PageHeader/PageHeader";
import { Paper } from "@mui/material";
import { useDocumentParser } from "../../model/hooks/useDocumentParser";
import { type DocumentBlock } from "../../model/types";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { mockDocs } from "../../../../utils/mock/mockdata";
import Dropable from "../../../DnDComponents/Dropable/Dropable";

const PageView = () => {
    const [documents, setDocuments] = useState<DocumentBlock[]>(() => mockDocs);

    const { blocks, getBlockByType } = useDocumentParser({
        blocks: documents
    });

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;

        if (over === null || active.id === over.id) {
            return;
        }

        setDocuments((blocks) => {
            const oldIndex = blocks.findIndex((block) => block.id === active.id);
            const newIndex = blocks.findIndex((block) => block.id === over.id);
            return arrayMove(blocks, oldIndex, newIndex);
        });
    };

    const handleDragMove = (e: DragEndEvent) => {
        const { over } = e;

        if (over === null) return;
    };

    return (
        <>
            <PageHeader text={"Page"}/>
            <Paper
                sx={{
                    width: 600,
                    height: 900,
                    p: 2,
                    bgcolor: "whitesmoke"
                }}>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
                    <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                        {blocks.map((item) => {
                            return (
                                <Dropable id={item.id}>
                                    {getBlockByType(item)}
                                </Dropable>
                            );
                        })}
                    </SortableContext>
                </DndContext>
            </Paper>
        </>
    );
};

export default PageView;
