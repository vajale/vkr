import {
    DocumentBlockType,
    type DocumentCheckboxBlock, type DocumentCodeBlock,
    type DocumentPageLinkBlock,
    type DocumentTextBlock
} from "@/components/PageView/model/types";

export const documentObjectHelper = (type: DocumentBlockType) => {
    const id = new Date().toJSON();
    const defaultContent = "";

    if (type === DocumentBlockType.TEXT) {
        const newBlock: DocumentTextBlock = {
            id,
            type,
            content: defaultContent
        };

        return newBlock;
    }
    if (type === DocumentBlockType.CHECKBOX) {
        const newBlock: DocumentCheckboxBlock = {
            id,
            type,
            content: defaultContent,
            flag: false
        };

        return newBlock;
    }

    if (type === DocumentBlockType.LINK) {
        const newBlock: DocumentPageLinkBlock = {
            id,
            type,
            src: '/',
            content: "Page_link"
        };

        return newBlock;
    }

    if (type === DocumentBlockType.CODE) {
        const newBlock: DocumentCodeBlock = {
            id,
            type,
            content: defaultContent
        };

        return newBlock;
    }
};
