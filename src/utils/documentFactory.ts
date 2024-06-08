import {
    DocumentBlockType,
    type DocumentCheckboxBlock,
    type DocumentCodeBlock,
    type DocumentPageImageBlock,
    type DocumentPageLinkBlock,
    type DocumentTextBlock,
    type DocumentTodoBlock,
} from "@/components/PageView/model/types";
import { User, type UserFirebase } from "@/store/slices/userSlice/types";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/userSlice";

export const getPageLinkWithParent = (link: string, username: string) => {
    const id = new Date().toJSON();

    const newBlock: DocumentPageLinkBlock = {
        id,
        type: DocumentBlockType.LINK,
        src: link,
        content: "Page_link",
        textType: {
            variant: "subtitle1",
        },
        creator: {
            username,
            date: id
        }
    };

    return newBlock;
};

export const documentFactory = (type: DocumentBlockType, username: string) => {
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
            creator: {
                username,
                date: id
            }
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
            creator: {
                username,
                date: id
            }
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
            creator: {
                username,
                date: id
            }
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
            creator: {
                username,
                date: id
            }
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
            creator: {
                username,
                date: id
            }
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
            creator: {
                username,
                date: id
            }
        };

        return newBlock;
    }
};
