import { type DocumentBlock, DocumentBlockType, type Page } from "../../components/PageView/model/types";

export const mock =
   "Sed ut perspiciatis, inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime   perferendis doloribus asperiores repellat.";
export const mock2 =
   "Ae ab illo inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";

export const mockDocs1: DocumentBlock[] = [
   {
      id: "1",
      type: DocumentBlockType.TEXT,
      content: "BIDLO",
      textType: {
         variant: 'subtitle1'
      }
   },
   {
      id: "3",
      type: DocumentBlockType.LINK,
      content: "asfasfasfsaf",
      textType: {
         variant: 'subtitle1'
      }
   }
];

export const mockDocs2: DocumentBlock[] = [
   {
      id: "4124124",
      type: DocumentBlockType.TEXT,
      content: "jkzdvkasfvkjsdvbnk",
      textType: {
         variant: 'subtitle1'
      }
   },
   {
      id: "65iuj5jrs",
      type: DocumentBlockType.TEXT,
      content: "52125512",
      textType: {
         variant: 'h5'
      }
   },
   {
      id: "ewrewr",
      type: DocumentBlockType.CODE,
      content: "xcbxcbxcb",
      textType: {
         variant: 'subtitle1'
      }
   },
];

export const mockPage1: Page = {
   id: 'ssaas',
   documentBlocks: mockDocs1,
   parent: "bro"
};

export const mockPage2: Page = {
   id: 'ssaas',
   documentBlocks: mockDocs2,
   parent: "ssaas"
};
