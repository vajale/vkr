import { type DocumentBlock, DocumentBlockType, type Page } from "../../components/PageView/model/types";

export const mock =
   "Sed ut perspiciatis, inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime   perferendis doloribus asperiores repellat.";
export const mock2 =
   "Ae ab illo inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";

export const mockDocs1: DocumentBlock[] = [
   {
      id: "1",
      type: DocumentBlockType.TEXT,
      content: "BIDLO"
   },
   {
      id: "3",
      type: DocumentBlockType.LINK,
      content: "asfasfasfsaf"
   }
];

export const mockDocs2: DocumentBlock[] = [
   {
      id: "4124124",
      type: DocumentBlockType.TEXT,
      content: ""
   },
   {
      id: "4124",
      type: DocumentBlockType.TEXT,
      content: ""
   },
   {
      id: "12312",
      type: DocumentBlockType.TEXT,
      content: ""
   }
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
