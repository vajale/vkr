import { type DocumentCheckboxBlock, type DocumentContentType } from "../../../model/types";
import React, { useState } from "react";
import { usePageSettings } from "../../../model/hooks/usePageSettings";
import { Checkbox, Typography } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";

interface CheckboxBlockProps {
    block: DocumentCheckboxBlock;
    canEdit?: boolean;
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
    width: 700,
    height: 50,
    overflow: "hidden",
};

const DocumentBlockCheckbox = ({ block, onContentChange, canEdit = true, onHotKeyInput }: CheckboxBlockProps) => {
    const [content, setContent] = useState<string>(() => block.content);

    const dispatch = useAppDispatch();

    const handleContentInput = (textContent: string | null) => {
        if (onContentChange == null || textContent == null) return;

        if (textContent === "/" && onHotKeyInput != null) {
            onHotKeyInput(block.id, textContent);
        }

        setContent(textContent);
    };

    const handleContentBlur = () => {
        if (onContentChange != null) {
            onContentChange(content);
        }
    };

    const alignItemsStyle = block.content.length > 52 ? "flex-start" : "center";
    const marginStyle = block.content.length > 52 ? 7 : 0;

    const handleCheckboxChange = () => {
        dispatch(pageActions.updateDocumentBlock({ ...block, flag: !block.flag }));
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: alignItemsStyle }}>
            <Checkbox onChange={handleCheckboxChange} checked={block.flag}/>
            <Typography sx={{ opacity: block.content.length == 0 ? 0.5 : 1 }}
                        width={"600px"}
                        component={'div'}
                        data-placeholder={'asffas'}
                        variant={block.textType?.variant}
                        fontWeight={block.textType?.weight}
                        contentEditable={canEdit}
                        onInput={(e) => {
                            setContent(e.currentTarget.textContent!);
                        }}
                        onBlur={() => {
                            if (onContentChange != null) {
                                onContentChange(content);
                            }
                        }}>
                {block.content.length == 0 ? 'Напишите что-нибудь' : block.content}
            </Typography>
        </div>
    );
};

{ /*   <textarea */ }
{ /*       disabled={!canEdit} */ }
{ /*       style={{ ...defaultStyle, opacity: block.content.length === 0 ? 0.6 : 1 }} */ }
{ /*       onInput={(e) => { */ }
{ /*           handleContentInput(e.currentTarget.textContent); */ }
{ /*       }} */ }
{ /*       spellCheck={true} */ }
{ /*       rows={block.content.length / 65} */ }
{ /*       contentEditable={true} */ }
{ /*       suppressContentEditableWarning={true} */ }
{ /*       placeholder="Type / or something..." */ }
{ /*       onBlur={handleContentBlur}> */ }
{ /*   {block.content} */ }
{ /* </textarea> */ }

export default DocumentBlockCheckbox;
