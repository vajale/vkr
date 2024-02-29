export enum DocumentBlockType {
   TEXT = "TEXT",
   CHECKBOX = "CHECKBOX",
   CODE = "CODE",
   QUOTE = "QUOTE",
   IMAGE = "IMAGE",
}

export interface DocumentBlockBase {
   id: string;
   type: DocumentBlockType;
   content: DocumentContentType;
   children?: DocumentBlock;
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

export type DocumentBlock =
   | DocumentTextBlock
   | DocumentImageBlock
   | DocumentCodeBlock
   | DocumentCheckboxBlock;
