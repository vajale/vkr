import { type DocumentBlock, type Page } from "../../../components/PageView/model/types";

export interface DocumentsPageSchema {
   isLoading: boolean;
   error: undefined | string;
   pageData: Page;
   formData: DocumentBlock[];
   isPageEdit: boolean;
   style: {
      header: boolean;
      logo: string | "none";
   };
}
