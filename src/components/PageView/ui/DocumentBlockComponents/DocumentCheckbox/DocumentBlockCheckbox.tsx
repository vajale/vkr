import { type DocumentCheckboxBlock, type DocumentContentType } from "../../../model/types";
import React, { useState } from "react";
import { usePageSettings } from "../../../model/hooks/usePageSettings";
import { Checkbox, Divider, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";
import EditableTextField from "@/components/PageView/ui/EditableTextField/EditableTextField";
import { motion } from "framer-motion";
import { MotionDivider } from "@/components/framer/Divider";
import { selectUsername } from "@/store/slices/userSlice";

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

const DocumentBlockCheckbox = ({ block, onContentChange, canEdit = true }: CheckboxBlockProps) => {
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

    const handleCheckboxChange = () => {
        dispatch(pageActions.updateBlock({ block: { ...block, flag: !block.flag }, username }));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', gap: 1 }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
                <Checkbox onChange={handleCheckboxChange} checked={block.flag}/>
                <EditableTextField title={block.content} canEdit={canEdit} onContentChange={handleContentChange}/>
            </div>
            {block.flag &&
                <MotionDivider initial={{ scale: 0 }}
                               animate={{ scale: 0.95 }}
                               orientation={'horizontal'}
                               variant={'fullWidth'}
                               flexItem
                />
            }
        </div>

    );
};

export default DocumentBlockCheckbox;
