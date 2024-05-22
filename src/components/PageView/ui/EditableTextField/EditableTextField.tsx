import React, { useState } from 'react';
import { convertFromRaw, convertToRaw, Editor, EditorState, RichUtils } from 'draft-js';
import { Box, Divider } from '@mui/material';
import { StyledEditorButton, StyledEditorButtonsContainer } from "@/components/PageView/ui/EditableTextField/styled";
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from "@/components/PageView/ui/EditableTextField/types";

interface TextFiled {
    onTextChange: (jsonObj: string) => void
    content: string
}

const EditableTextField = (props: TextFiled) => {
    const { onTextChange, content } = props;

    const [editorState, setEditorState] = useState<EditorState>(() => {
        if (content === '' || content === undefined) {
            return EditorState.createEmpty();
        }

        try {
            const raw = JSON.parse(content);
            const contentState = convertFromRaw(raw);
            return EditorState.createWithContent(contentState);
        } catch (e) {
            return EditorState.createEmpty();
        }
    });

    const [editorButtonsFlag, setEditorButtonsFlag] = useState<false>(false);

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);

        const raw = convertToRaw(state.getCurrentContent());
        const json = JSON.stringify(raw);

        if (onTextChange !== null) {
            onTextChange(json);
        }
    };

    const toggleInlineStyle = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const inlineStyless = () => {
        return (
            <StyledEditorButtonsContainer flexDirection={'row'} style={{ marginBottom: '10px' }}>
                <StyledEditorButton size={'small'} onClick={() => {
                    toggleInlineStyle('BOLD');
                    setEditorState(false);
                }}>Bold
                </StyledEditorButton>
                <Divider flexItem orientation={'vertical'}/>
                <StyledEditorButton onClick={() => {
                    toggleInlineStyle('ITALIC');
                    setEditorState(false);
                }}>Italic
                </StyledEditorButton>
                <Divider flexItem orientation={'vertical'}/>
                <StyledEditorButton onClick={() => {
                    toggleInlineStyle('UNDERLINE');
                    setEditorState(false);
                }}>Underline
                </StyledEditorButton>
                <Divider flexItem orientation={'vertical'}/>
                <StyledEditorButton onClick={() => {
                    toggleInlineStyle('h1');
                    setEditorState(false);
                }}>H1
                </StyledEditorButton>
                <Divider flexItem orientation={'vertical'}/>
            </StyledEditorButtonsContainer>
        );
    };

    const inlineStyles = () => {
        return (
            <StyledEditorButtonsContainer flexDirection={'row'} style={{ marginBottom: '10px' }}>
                {}
            </StyledEditorButtonsContainer>
        );
    };

    // <StyledEditorButton onClick={() => {
    //     toggleInlineStyle('ITALIC');
    //     setEditorState(false);
    // }}>{item}
    // </StyledEditorButton>

    return (
        <Box position={'relative'}>
             {inlineStyless()}
            <div style={{ padding: '10px', width: 600 }}>
                <Editor
                    // customStyleMap={CUSTOM_STYLE_MAP}
                    // blockRenderMap={BLOCK_RENDER_MAP}
                    editorState={editorState}
                    onChange={handleEditorChange}
                    onFocus={() => {
                        setEditorButtonsFlag(true);
                    }}
                    onBlur={() => {
                        setEditorButtonsFlag(false);
                    }}
                />
            </div>
        </Box>
    );
};

export default EditableTextField;
