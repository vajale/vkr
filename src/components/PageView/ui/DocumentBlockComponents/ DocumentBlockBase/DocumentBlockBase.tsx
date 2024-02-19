import React, { useMemo, useRef } from "react";

import { useMouseView } from "../../../model/hooks/useMouseView";
import BlockAddButton from "../BlockAddButton/BlockAddButton";

import { Stack } from "@mui/material";
import { blockTypes } from "../../../model/hooks/useDocumentParser";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface DocumentBlockBaseProps {
    id: string;
    editButtons?: boolean;
    menuOpened?: boolean;
    children: React.ReactNode;
}

const DocumentBlockBase = (props: DocumentBlockBaseProps) => {
    const { children, editButtons = true, menuOpened = false, id } = props;
    const { setNodeRef, listeners, attributes, transform, active } = useDraggable({
        id
    });

    const docRef = useRef<HTMLDivElement>(null);
    const [isHover] = useMouseView(docRef);

    const style = {
        transform: CSS.Translate.toString(transform),
        background: "none",
        color: "none",
        height: "auto",
        marginBottom: 7,
        display: "flex",
        border: "none",
        opacity: active?.id === id ? 0.7 : 1
    };

    const handleButtonClick = () => {
    };

    const typeList = useMemo(
        () => Object.keys(blockTypes).map((item, index) => <li key={index}>{item}</li>),
        [blockTypes]
    );

    return (
        <div ref={setNodeRef} style={style} id={id} >
        <Stack flexDirection={"row"} ref={docRef}>
            <Stack flexDirection={"row"} marginRight={1} alignItems={"flex-start"}>
                <div style={{ width: 40 }}>
                    {isHover && editButtons && (
                        <div id={id} {...listeners} {...attributes}>
                            <Stack flexDirection={"row"} gap={0.4}>
                                <BlockAddButton buttonContent={"#"} onClick={handleButtonClick}/>
                                <BlockAddButton buttonContent={"+"} onClick={handleButtonClick}/>
                            </Stack>
                        </div>
                    )}
                    {menuOpened && (
                        <div
                            style={{
                                position: "absolute",
                                background: "grey",
                                padding: 7,
                                borderRadius: 7,
                                listStyle: "none"
                            }}>
                            <div>{typeList}</div>
                        </div>
                    )}
                </div>
            </Stack>
            <DndContext>
                <div>{children && children}</div>
            </DndContext>
        </Stack>
        </div>
    );
};

export default DocumentBlockBase;
