import React, { useMemo, useState } from "react";
import { DocumentBlockType, type DocumentContentType, type DocumentTextBlock } from "../../../model/types";
import { Typography } from "@mui/material";
import Dropable from "@/components/DnDComponents/Dropable/Dropable";
import DocumentBlockBase from "@/components/PageView/ui/DocumentBlockComponents/DocumentBlockBase/DocumentBlockBase";

import { makeStyles } from '@mui/styles';
import { motion } from "framer-motion";

interface TextBlockProps {
    block: DocumentTextBlock;
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
    width: 700

};

const DocumentBlockText = (props: TextBlockProps) => {
    const { block, onContentChange, canEdit } = props;

    const [content, setContent] = useState<string>(() => block.content);

    const handleContentInput = (textContent: string | null) => {
        if (onContentChange == null || textContent == null) return;

        setContent(textContent);
    };

    const getFontPadding = useMemo(() => {
        const { textType } = block;

        switch (textType?.variant) {
            case "h1":
                return 5;
            case "h2":
                return 4;
            case "h3":
                return 3;
            case "h4":
                return 2;
            case "h5":
                return 1;
            case "subtitle1":
                return 0;
            default:
                return 0;
        }
    }, []);

    return (
        <motion.div whileHover={{ backgroundColor: block.content == '' ? "whitesmoke" : 'none' }}>
            <Typography width={"600px"} p={getFontPadding}
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
                        }}
            >
                {block.content}
            </Typography>
        </motion.div>

    );
};

export default DocumentBlockText;
