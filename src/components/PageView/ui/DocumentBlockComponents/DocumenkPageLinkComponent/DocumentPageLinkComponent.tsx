import { Route } from "react-router-dom";
import { type DocumentPageLinkBlock } from "../../../model/types";
import React from "react";
import { Link } from "@mui/material";

interface PageLinkProps {
    label?: string,
    block: DocumentPageLinkBlock
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
    width: 500
};

export const DocumentPageLinkComponent = (props: PageLinkProps) => {
    const { label = 'Page_link', block } = props;
    const { id } = block;

    return (
        <Link id={id}>
            {label}
        </Link>
    );
};
