import React, {useMemo} from "react";
import {DocumentBlock, DocumentBlockType} from "../types";
import DocumentBlockBase from "../../ui/DocumentBlockComponents/ DocumentBlockBase/DocumentBlockBase";

export const blockTypes: Record<DocumentBlockType, string> = {
    [DocumentBlockType.CHECKBOX]: "checkbox",
    [DocumentBlockType.QUOTE]: "quote",
    [DocumentBlockType.TEXT]: "text",
    [DocumentBlockType.CODE]: "code",
    [DocumentBlockType.IMAGE]: "image",
}

interface PageView {
    blocks: DocumentBlock[]
}

export const useDocumentParser = (page: PageView) => {
    const {blocks} = page

    const getBlockByType = (block: DocumentBlock) => {
        const {type, id} = block

        switch (type) {
            case DocumentBlockType.CODE:
                return (
                    <DocumentBlockBase>
                        <code>
                            {block.code}
                        </code>
                        {block?.children && getBlockByType(block.children)}
                    </DocumentBlockBase>
                );
            case DocumentBlockType.IMAGE:
                return (
                    <DocumentBlockBase>
                        {block?.title && <span>{block.title}</span>}
                        <img src={block.src} alt={block.title}/>
                        {block?.children && getBlockByType(block.children)}
                    </DocumentBlockBase>)

            case DocumentBlockType.CHECKBOX:
                return (
                    <DocumentBlockBase>
                        <input type={'checkbox'}/>
                        <span>{block.title}</span>
                        {block?.children && getBlockByType(block.children)}
                    </DocumentBlockBase>
                )
            case DocumentBlockType.TEXT:
                return (
                    <DocumentBlockBase>
                        <text>
                            {block.title}
                        </text>
                        {block?.children && getBlockByType(block.children)}
                    </DocumentBlockBase>

                );
        }
    }

    return useMemo(() => {

        return blocks.map((block) => {
            const content = getBlockByType(block)

            if (content) {
                return content
            }

            return <span>Unreadble block</span>
        })
    }, [blocks])
};

