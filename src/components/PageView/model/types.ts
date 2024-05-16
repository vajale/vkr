export enum DocumentBlockType {
    TEXT = "TEXT",
    CHECKBOX = "CHECKBOX",
    CODE = "CODE",
    TODO = "TODO",
    QUOTE = "QUOTE",
    IMAGE = "IMAGE",
    LINK = "LINK",
}

export interface DocumentBlockBase {
    id: string;
    type: DocumentBlockType;
    content: DocumentContentType;
    textType: {
        variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'subtitle1'
        weight?: 'strong' | 'bald' | 'pussy'
    } | null
}

export type DocumentContentType = string;

export interface DocumentCodeBlock extends DocumentBlockBase {
    type: DocumentBlockType.CODE;
}

export interface DocumentImageBlock extends DocumentBlockBase {
    type: DocumentBlockType.IMAGE;
    src: string;
}

export interface DocumentCheckboxBlock extends DocumentBlockBase {
    type: DocumentBlockType.CHECKBOX;
    flag: boolean;
}

export interface DocumentQuoteBlock extends DocumentBlockBase {
    type: DocumentBlockType.QUOTE;
    quote: boolean;
}

export interface DocumentTextBlock extends DocumentBlockBase {
    type: DocumentBlockType.TEXT;
    title?: string;
}

export interface DocumentPageLinkBlock extends DocumentBlockBase {
    type: DocumentBlockType.LINK;
    src?: string;
}

interface Todo {
    title: string,
    completed: boolean,
    id: string
}

export interface DocumentTodoBlock extends DocumentBlockBase {
    type: DocumentBlockType.TODO;
    todos: Todo[];
}

export type DocumentBlock =
    | DocumentTextBlock
    | DocumentImageBlock
    | DocumentCodeBlock
    | DocumentCheckboxBlock | DocumentPageLinkBlock | DocumentTodoBlock;

export interface Page {
    id: string;
    visual?: {
        background?: string,
        name?: string;
    }
    documentBlocks?: DocumentBlock[];
    parent?: string | null
}

export interface CalendarPage {
    id: string,
    tasks: Task[]
}

export interface Task {
    id: string,
    content: string,
    priority: string
    date: string
    time: string
}
