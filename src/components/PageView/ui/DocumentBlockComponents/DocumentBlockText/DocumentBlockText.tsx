import React, { memo, useState } from "react";
import { type DocumentContentType, type DocumentTextBlock } from "../../../model/types";
import { color, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";
import TextEditor, { TextEditorProvider } from "@/components/TextEditor/TextEditor";
import ToolPanel from "@/components/TextEditor/ToolPanel";
import EditableTextField from "@/components/PageView/ui/EditableTextField/EditableTextField";
import { selectUsername } from "@/store/slices/userSlice";

interface TextBlockProps {
    block: DocumentTextBlock;
    canEdit?: boolean;
    onContentChange?: (data: DocumentContentType) => void;
    onHotKeyInput?: (id: string, input: string) => void;
}

const DocumentBlockText = memo((props: TextBlockProps) => {
    const { block, onContentChange, canEdit } = props;

    const dispatch = useAppDispatch();

    const username = useAppSelector(selectUsername);

    const handleContentChange = (json: string) => {
        if (onContentChange) {
            onContentChange(json);

            dispatch(
                pageActions.updateBlock({ block: { ...block, content: json }, username })
            );
        }
    };

    const backgroundColor = block.textType?.backgroundColor !== undefined ? block.textType?.backgroundColor : 'none';

    return (
        <div style={{ backgroundColor, borderRadius: '7px' }}>
            <EditableTextField disableEditTools={false} placeholder={'Напишите что-нибудь...'}
                               title={block.content}
                               canEdit={canEdit}
                               width={'1300px'}
                               onContentChange={handleContentChange}/>
        </div>

    );
});

export default DocumentBlockText;
