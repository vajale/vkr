import React, { useState } from 'react';
import { motion } from "framer-motion";
import TextEditor, { TextEditorProvider } from "@/components/TextEditor/TextEditor";
import ToolPanel from "@/components/TextEditor/ToolPanel";

interface TextBlockProps {
    title: string;
    canEdit?: boolean;
    onContentChange?: (jsonString: string) => void;
    disableEditTools?: boolean,
}

const EditableTextField = (props: TextBlockProps) => {
    const { canEdit, onContentChange, title, disableEditTools } = props;

    const [toolPanelOpen, setToolPanelOpen] = useState(false);

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

    return (
        <motion.div initial={{ border: 'none' }}
                    whileHover={{ border: "1px solid #d7d7d7" }}
                    style={{
                        boxSizing: 'unset',
                        border: toolPanelOpen ? '1px solid #d7d7d7' : 'none',
                        borderRadius: 7,
                        padding: 7
                    }}>
            <TextEditorProvider json={title}>
                {toolPanelOpen && <ToolPanel/>}
                <TextEditor onFocus={handleFocus}
                            onBlur={handleBlur}
                            canEdit={canEdit}
                            onChange={handleContentChange}
                />
            </TextEditorProvider>
        </motion.div>
    );
};

export default EditableTextField;

// const [editorState, setEditorState] = useState<EditorState>(() => {
//     if (content === '' || content === undefined) {
//         return EditorState.createEmpty();
//     }
//
//     try {
//         const raw = JSON.parse(content);
//         const contentState = convertFromRaw(raw);
//         return EditorState.createWithContent(contentState);
//     } catch (e) {
//         return EditorState.createEmpty();
//     }
// });
//
// const [editorButtonsFlag, setEditorButtonsFlag] = useState<false>(false);
//
// const handleEditorChange = (state: EditorState) => {
//     setEditorState(state);
//
//     const raw = convertToRaw(state.getCurrentContent());
//     const json = JSON.stringify(raw);
//
//     if (onTextChange !== null) {
//         onTextChange(json);
//     }
// };
//
// const toggleInlineStyle = (style: string) => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, style));
// };
//
// const inlineStyless = () => {
//     return (
//         <StyledEditorButtonsContainer flexDirection={'row'} style={{ marginBottom: '10px' }}>
//             <StyledEditorButton size={'small'} onClick={() => {
//                 toggleInlineStyle('BOLD');
//                 setEditorState(false);
//             }}>Bold
//             </StyledEditorButton>
//             <Divider flexItem orientation={'vertical'}/>
//             <StyledEditorButton onClick={() => {
//                 toggleInlineStyle('ITALIC');
//                 setEditorState(false);
//             }}>Italic
//             </StyledEditorButton>
//             <Divider flexItem orientation={'vertical'}/>
//             <StyledEditorButton onClick={() => {
//                 toggleInlineStyle('UNDERLINE');
//                 setEditorState(false);
//             }}>Underline
//             </StyledEditorButton>
//             <Divider flexItem orientation={'vertical'}/>
//             <StyledEditorButton onClick={() => {
//                 toggleInlineStyle('h1');
//                 setEditorState(false);
//             }}>H1
//             </StyledEditorButton>
//             <Divider flexItem orientation={'vertical'}/>
//         </StyledEditorButtonsContainer>
//     );
// };
//
// const inlineStyles = () => {
//     return (
//         <StyledEditorButtonsContainer flexDirection={'row'} style={{ marginBottom: '10px' }}>
//             {}
//         </StyledEditorButtonsContainer>
//     );
// };
//
// // <StyledEditorButton onClick={() => {
// //     toggleInlineStyle('ITALIC');
// //     setEditorState(false);
// // }}>{item}
// // </StyledEditorButton>
//
// return (
//     <Box position={'relative'}>
//         {inlineStyless()}
//         <div style={{ padding: '10px', width: 600 }}>
//             <Editor
//                 // customStyleMap={CUSTOM_STYLE_MAP}
//                 // blockRenderMap={BLOCK_RENDER_MAP}
//                 editorState={editorState}
//                 onChange={handleEditorChange}
//                 onFocus={() => {
//                     setEditorButtonsFlag(true);
//                 }}
//                 onBlur={() => {
//                     setEditorButtonsFlag(false);
//                 }}
//             />
//         </div>
//     </Box>
// );
