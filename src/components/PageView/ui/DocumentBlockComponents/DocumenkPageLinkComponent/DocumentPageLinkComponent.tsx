import { Route } from "react-router-dom";
import { type DocumentPageLinkBlock } from "../../../model/types";
import React from "react";
import { Link } from "@mui/material";

interface PageLinkProps {
    label?: string,
    block: DocumentPageLinkBlock
}

const defaultStyle: React.CSSProperties = {
    padding: 7,
    fontSize: 21,
    width: 500,
    textDecoration: 'none'
};

export const DocumentPageLinkComponent = (props: PageLinkProps) => {
    const { label = 'Page link', block } = props;
    const { id } = block;

    return (
        <Link id={id} href={block.src} style={defaultStyle}>
            {label}
        </Link>
    );
};
