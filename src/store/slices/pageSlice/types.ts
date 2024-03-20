import { type DocumentBlock } from "../../../components/PageView/model/types";

export interface DocumentsPageSchema {
   isLoading: boolean;
   error: undefined | string;
   data: DocumentBlock[];
   formData: DocumentBlock[];
   isPageEdit: boolean;
   style: {
      header: boolean;
      logo: string | "none";
   };
}
