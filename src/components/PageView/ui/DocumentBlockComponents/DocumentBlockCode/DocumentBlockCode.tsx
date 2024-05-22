import React from "react";
import {
    type DocumentCodeBlock,
    type DocumentContentType,
} from "../../../model/types";
import TextEditor, { TextEditorProvider } from "@/components/TextEditor/TextEditor";
import ToolPanel from "@/components/TextEditor/ToolPanel";
import { pageActions } from "@/store/slices/pageSlice";
import { useAppDispatch } from "@/store/hooks";

const codeStyle = {
    background: "#ececec",
    borderRadius: 7,
    border: "none",
    padding: 7,
    color: "none",
    height: "auto",
    marginBottom: 7,
    display: "flex",
    alignItems: "center",
    width: 700,
    outline: "none",
};

interface CodeBlockProps {
    block: DocumentCodeBlock;
    canEdit?: boolean;
    onContentChange?: (data: DocumentContentType) => void;
    onHotKeyInput?: () => void;
}

const DocumentBlockCode = ({ block, onContentChange, canEdit = true }: CodeBlockProps) => {
    const dispatch = useAppDispatch();

    const handleTextChange = (json: string) => {
        if (onContentChange) {
            onContentChange(json);

            dispatch(
                pageActions.updateBlock({ ...block, content: json })
            );
        }
    };

    return (
        <TextEditorProvider json={block.content}>
            <ToolPanel/>
            <TextEditor canEdit={canEdit} onChange={handleTextChange}/>
        </TextEditorProvider>
    );
};

export default DocumentBlockCode;
