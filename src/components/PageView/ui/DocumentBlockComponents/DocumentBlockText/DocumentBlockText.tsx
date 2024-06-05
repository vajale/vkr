import React, { useState } from "react";
import { type DocumentContentType, type DocumentTextBlock } from "../../../model/types";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";
import TextEditor, { TextEditorProvider } from "@/components/TextEditor/TextEditor";
import ToolPanel from "@/components/TextEditor/ToolPanel";
import EditableTextField from "@/components/PageView/ui/EditableTextField/EditableTextField";

interface TextBlockProps {
    block: DocumentTextBlock;
    canEdit?: boolean;
    onContentChange?: (data: DocumentContentType) => void;
    onHotKeyInput?: (id: string, input: string) => void;
}

const DocumentBlockText = (props: TextBlockProps) => {
    const { block, onContentChange, canEdit } = props;

    const dispatch = useAppDispatch();

    const handleContentChange = (json: string) => {
        if (onContentChange) {
            onContentChange(json);

            dispatch(
                pageActions.updateBlock({ ...block, content: json })
            );
        }
    };

    return (
        <EditableTextField placeholder={'Напишите что-нибудь...'} title={block.content} canEdit={canEdit} onContentChange={handleContentChange}/>
    );
};

export default DocumentBlockText;
