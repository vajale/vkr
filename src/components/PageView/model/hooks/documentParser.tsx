import React, { ChangeEventHandler, useMemo } from "react";
import { DocumentBlock, DocumentBlockType } from "../types";
import DocumentBlockBase from "../../ui/DocumentBlockComponents/ DocumentBlockBase/DocumentBlockBase";
import { Stack } from "@mui/material";

export const blockTypes: Record<DocumentBlockType, string> = {
  [DocumentBlockType.CHECKBOX]: "checkbox",
  [DocumentBlockType.QUOTE]: "quote",
  [DocumentBlockType.TEXT]: "text",
  [DocumentBlockType.CODE]: "code",
  [DocumentBlockType.IMAGE]: "image",
};

const defaultStyle = {
  background: "none",
  color: "none",
  height: "auto",
  marginBottom: 7,
  display: "flex",
  alignItems: "center",
  border: "none",
};

const codeStyle = {
  background: "lightgrey",
  borderRadius: 7,
  padding: 14,
  color: "none",
  height: "auto",
  marginBottom: 7,
  display: "flex",
  alignItems: "center",
  width: " 100%",
};

interface PageView {
  blocks: DocumentBlock[];
}

export const useDocumentParser = (page: PageView) => {
  const { blocks } = page;

  const getBlockByType = (block: DocumentBlock) => {
    const { type, id } = block;

    const getChildren = (child: React.ReactNode) => {
      return <DocumentBlockBase editButtons={false}>{child}</DocumentBlockBase>;
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};

    switch (type) {
      case DocumentBlockType.CODE:
        return (
          <DocumentBlockBase>
            <code style={codeStyle} contentEditable={"true"}>
              {block.code}
            </code>
            {block?.children && getChildren(getBlockByType(block.children))}
          </DocumentBlockBase>
        );
      case DocumentBlockType.IMAGE:
        return (
          <DocumentBlockBase>
            {block?.title && <span>{block.title}</span>}
            <div contentEditable={"true"} style={defaultStyle}>
              {block.title}
            </div>
            {block?.children && getChildren(getBlockByType(block.children))}
          </DocumentBlockBase>
        );

      case DocumentBlockType.CHECKBOX:
        return (
          <DocumentBlockBase>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input type={"checkbox"} />
              <div contentEditable={"true"} style={defaultStyle}>
                {block.title}
              </div>
              {block?.children && getChildren(getBlockByType(block.children))}
            </div>
          </DocumentBlockBase>
        );
      case DocumentBlockType.TEXT:
        return (
          <DocumentBlockBase>
            <div contentEditable={"true"} style={defaultStyle}>
              <div>
                <div>{block.title}</div>
                <div>
                  {block.paragraphs.map((paragraph) => (
                    <p>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            {block?.children && getChildren(getBlockByType(block.children))}
          </DocumentBlockBase>
        );
    }
  };

  return useMemo(() => {
    return blocks.map((block) => {
      const content = getBlockByType(block);

      if (content) {
        return <Stack flexDirection={"column"}>{content}</Stack>;
      }

      return <span>Unreadble block</span>;
    });
  }, [blocks]);
};
