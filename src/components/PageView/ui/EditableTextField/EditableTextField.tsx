import React, { useState } from "react";
import { motion } from "framer-motion";
import TextEditor, { TextEditorProvider, useEditorApi } from "@/components/TextEditor/TextEditor";
import ToolPanel from "@/components/TextEditor/ToolPanel";
import { StyledMotionDiv } from "@/components/PageView/ui/EditableTextField/styled";
import { useClickPosition } from "@/utils/hooks/useMouseClick";

interface TextBlockProps {
    title: string;
    canEdit?: boolean;
    onContentChange?: (jsonString: string) => void;
    disableEditTools?: boolean;
    width?: string,
    placeholder?: string
}

const cursorOffset = {
    x: 0,
    y: 0
};

const EditableTextField = (props: TextBlockProps) => {
    const { canEdit = true, onContentChange, title, disableEditTools, width, placeholder = '...' } = props;

    const [toolPanelOpen, setToolPanelOpen] = useState(false);
    const [clickPosition, setClickPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const handleContentChange = (json: string) => {
        if (onContentChange) {
            onContentChange(json);
        }
    };

    const handleBlur = () => {
        if (disableEditTools) return;
        setToolPanelOpen(false);
    };

    const handleFocus = () => {
        if (disableEditTools) return;
        setToolPanelOpen(true);
    };

    const handleCursorClick = (x: number, y: number) => {
        setClickPosition({ x: x + cursorOffset.x, y: y + cursorOffset.y });
    };

    return (
        <StyledMotionDiv>
            <TextEditorProvider width={width} json={title}>
                {toolPanelOpen && <ToolPanel position={clickPosition}/>}
                <TextEditor
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    canEdit={canEdit}
                    onChange={handleContentChange}
                    onContentCursorClick={handleCursorClick}
                />
            </TextEditorProvider>
        </StyledMotionDiv>
    );
};

export default EditableTextField;
