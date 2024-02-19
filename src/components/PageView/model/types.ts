export enum DocumentBlockType {
  TEXT = "TEXT",
  CHECKBOX = "CHECKBOX",
  CODE = "CODE",
  QUOTE = "QUOTE",
  IMAGE = "IMAGE",
}

export type DocumentBlockBase = {
  id: string;
  type: DocumentBlockType;
  children?: DocumentBlock;
};

export interface DocumentCodeBlock extends DocumentBlockBase {
  type: DocumentBlockType.CODE;
  code: string;
}

export interface DocumentImageBlock extends DocumentBlockBase {
  type: DocumentBlockType.IMAGE;
  title?: string;
  src: string;
}

export interface DocumentCheckboxBlock extends DocumentBlockBase {
  type: DocumentBlockType.CHECKBOX;
  title: string;
  flag: boolean;
}

export interface DocumentQuoteBlock extends DocumentBlockBase {
  type: DocumentBlockType.QUOTE;
  title: string;
  quote: boolean;
}

export interface DocumentTextBlock extends DocumentBlockBase {
  type: DocumentBlockType.TEXT;
  paragraphs: string[];
  title?: string;
}

export type DocumentBlock =
  | DocumentTextBlock
  | DocumentImageBlock
  | DocumentCodeBlock
  | DocumentCheckboxBlock;
