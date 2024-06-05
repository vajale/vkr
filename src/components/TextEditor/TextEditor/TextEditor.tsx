import * as React from "react";
import { convertToRaw, Editor } from "draft-js";
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from "./config";
import { useEditorApi } from "./context";

import "./CustomTextEditor.css";
import { useRef, useState } from "react";

export interface TextEditorProps {
    onChange: (json: string) => void,
    canEdit: boolean,
    onFocus?: () => void,
    onBlur?: () => void,
    placeholder: string,
    onContentCursorClick?: (x: number, y: number) => void
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
    const { onChange, canEdit, onBlur, onFocus, placeholder, onContentCursorClick } = props;

    const editorApi = useEditorApi();

    const divRef = useRef(null);

    const handleEditorChange = () => {
        const raw = convertToRaw(editorApi.state.getCurrentContent());

        const json = JSON.stringify(raw);
        onChange(json);
    };

    const handleDivClick = (event) => {
        const rect = divRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (onContentCursorClick) {
            onContentCursorClick(x, y);
        }
    };

    return (
        <div ref={divRef}
             onClick={handleDivClick} style={{ position: 'relative' }}>
            <Editor spellCheck
                    handleKeyCommand={editorApi.handleKeyCommand}
                    customStyleMap={CUSTOM_STYLE_MAP}
                    blockRenderMap={BLOCK_RENDER_MAP}
                    editorState={editorApi.state}
                    onChange={editorApi.onChange}
                    placeholder={placeholder}
                    onFocus={() => {
                        if (onFocus) {
                            onFocus();
                        }
                    }}
                    onBlur={() => {
                        if (onBlur) {
                            onBlur();
                        }
                        handleEditorChange();
                    }}
                    keyBindingFn={editorApi.handlerKeyBinding}
                    readOnly={!canEdit}
            />
        </div>

    );
};

export default TextEditor;
