import {
    DocumentBlockType,
    type DocumentCheckboxBlock,
    type DocumentCodeBlock,
    type DocumentPageImageBlock,
    type DocumentPageLinkBlock,
    type DocumentTextBlock,
    type DocumentTodoBlock,
} from "@/components/PageView/model/types";

export const getPageLinkWithParent = (link: string) => {
    const id = new Date().toJSON();

    const newBlock: DocumentPageLinkBlock = {
        id,
        type: DocumentBlockType.LINK,
        src: link,
        content: "Page_link",
        textType: {
            variant: "subtitle1",
        },
    };

    return newBlock;
};

export const documentObjectHelper = (type: DocumentBlockType) => {
    const id = new Date().toJSON();
    const defaultContent = "";

    if (type === DocumentBlockType.TEXT) {
        const newBlock: DocumentTextBlock = {
            id,
            type,
            content: defaultContent,
            textType: {
                variant: "subtitle1",
            },
        };

        return newBlock;
    }
    if (type === DocumentBlockType.CHECKBOX) {
        const newBlock: DocumentCheckboxBlock = {
            id,
            type,
            content: defaultContent,
            flag: false,
            textType: {
                variant: "subtitle1",
            },
        };

        return newBlock;
    }

    if (type === DocumentBlockType.LINK) {
        const newBlock: DocumentPageLinkBlock = {
            id,
            type,
            src: "/",
            content: "Page_link",
            textType: {
                variant: "subtitle1",
            },
        };

        return newBlock;
    }

    if (type === DocumentBlockType.IMAGE) {
        const newBlock: DocumentPageImageBlock = {
            id,
            type,
            src: id,
            sizes: {
                width: "200",
                height: "200",
            },
            alt: "img_block",
            simpleView: false,
        };

        return newBlock;
    }

    if (type === DocumentBlockType.CODE) {
        const newBlock: DocumentCodeBlock = {
            id,
            type,
            content: defaultContent,
            textType: {
                variant: "subtitle1",
            },
        };

        return newBlock;
    }

    if (type === DocumentBlockType.TODO) {
        const newBlock: DocumentTodoBlock = {
            id,
            type,
            content: "Задачи",
            textType: {
                variant: "subtitle1",
            },
            todos: [
                {
                    id: "TODO" + id,
                    completed: false,
                    title: "Новая задача",
                },
            ],
        };

        return newBlock;
    }
};
