import React, { useState } from "react";
import { type DocumentContentType, type DocumentTextBlock } from "../../../model/types";

interface TextBlockProps {
    block: DocumentTextBlock;
    contentEditable?: boolean;
    onContentChange?: (data: DocumentContentType) => void;
    onHotKeyInput?: (id: string, input: string) => void;
}

const defaultStyle = {
    padding: 7,
    borderRadius: 7,
    color: "none",
    marginBottom: 7,
    display: "flex",
    alignItems: "center",
    border: "none",
    outline: "none",
    resize: "none",
    width: 700

};

const DocumentBlockText = (props: TextBlockProps) => {
    const { block, onContentChange } = props;

    const [content, setContent] = useState<string>(() => block.content);

    const handleContentInput = (textContent: string | null) => {
        if (onContentChange == null || textContent == null) return;

        setContent(textContent);
    };

    const handleContentBlur = () => {
        if (onContentChange != null) {
            onContentChange(content);
        }
    };

    return (
        <textarea
            style={{ ...defaultStyle }}
            onInput={(e) => {
                handleContentInput(e.currentTarget.value);
            }}
            rows={content.length / 40}
            spellCheck={true}
            contentEditable={true}
            suppressContentEditableWarning={true}
            placeholder="Type / or something..."
            onBlur={handleContentBlur}>
         {content}
      </textarea>
    );
};

export default DocumentBlockText;
