import { type Page } from "@/components/PageView/model/types";

export interface DocumentsPageSchema {
   pageData?: Page;
   isPageEdit?: boolean;
   style: {
      header: boolean;
      logo: string | "none";
   };
   permissions?: string[]
}
