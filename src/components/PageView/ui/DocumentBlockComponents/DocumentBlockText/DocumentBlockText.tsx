import React, { useState } from "react";
import { type DocumentContentType, type DocumentTextBlock } from "../../../model/types";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";
import TextEditor, { TextEditorProvider } from "@/components/TextEditor/TextEditor";
import ToolPanel from "@/components/TextEditor/ToolPanel";

interface TextBlockProps {
    block: DocumentTextBlock;
    canEdit?: boolean;
    onContentChange?: (data: DocumentContentType) => void;
    onHotKeyInput?: (id: string, input: string) => void;
}

const DocumentBlockText = (props: TextBlockProps) => {
    const { block, onContentChange, canEdit } = props;
    const [toolPanelOpen, setToolPanelOpen] = useState(false);

    const dispatch = useAppDispatch();

    const handleTextChange = (json: string) => {
        if (onContentChange) {
            onContentChange(json);

            dispatch(
                pageActions.updateBlock({ ...block, content: json })
            );
        }
    };

    const handleBlur = () => {
        setToolPanelOpen(false);
    };

    const handleFocus = () => {
        setToolPanelOpen(true);
    };

    return (
        <motion.div style={{ border: toolPanelOpen ? '1px solid #d7d7d7' : 'none', borderRadius: 7, padding: 7 }}>
            <TextEditorProvider json={block.content}>
                {toolPanelOpen && <ToolPanel/>}
                <TextEditor onFocus={handleFocus}
                            onBlur={handleBlur}
                            canEdit={canEdit}
                            onChange={handleTextChange}
                />
            </TextEditorProvider>
        </motion.div>
    );
};

export default DocumentBlockText;
