import * as React from "react";
import Draft, { convertToRaw, Editor, type EditorState } from "draft-js";
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from "./config";
import { useEditorApi } from "./context";
import { useState } from "react";

export interface TextEditorProps {
    onChange: (json: string) => void,
    canEdit: boolean,
    onFocus?: () => void,
    onBlur?: () => void,
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange, canEdit, onBlur, onFocus }) => {
    const editorApi = useEditorApi();

    const handleEditorChange = () => {
        const raw = convertToRaw(editorApi.state.getCurrentContent());
        const json = JSON.stringify(raw);

        onChange(json);
    };

    const editorProps = {
        handleKeyCommand: editorApi.handleKeyCommand,
        customStyleMap: CUSTOM_STYLE_MAP,
        blockRenderMap: BLOCK_RENDER_MAP,
        editorState: editorApi.state,
        keyBindingFn: editorApi.handlerKeyBinding,
    };

    return (
        <Editor spellCheck
                handleKeyCommand={editorApi.handleKeyCommand}
                customStyleMap={CUSTOM_STYLE_MAP}
                blockRenderMap={BLOCK_RENDER_MAP}
                editorState={editorApi.state}
                onChange={editorApi.onChange}
                placeholder={''}
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
    );
};

export default TextEditor;
