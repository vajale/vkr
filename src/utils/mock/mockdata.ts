import { type DocumentBlock, DocumentBlockType } from "../../components/PageView/model/types";

export const mock =
   "Sed ut perspiciatis, inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime   perferendis doloribus asperiores repellat.";
export const mock2 =
   "Ae ab illo inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";

export const mockDocs: DocumentBlock[] = [
   {
      id: "1",
      type: DocumentBlockType.TEXT,
      title: "negro el pidrasos",
      paragraphs: ["lee quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda  perferendis doloribus asperiores repellat"]
   },
   {
      id: "2",
      type: DocumentBlockType.CHECKBOX,
      title: "bombaclat",
      flag: true
   },
   {
      id: "3",
      type: DocumentBlockType.CODE,
      code: "window.sosnihuica()",
      children: {
         id: "sinok ebany",
         type: DocumentBlockType.CODE,
         code: "event.poshelNahoy()",
         children: {
            id: "sinok ebany",
            type: DocumentBlockType.CODE,
            code: "event.poshelNahoy()"
         }
      }
   },
   {
      id: "4",
      type: DocumentBlockType.TEXT,
      title: "Lorem ipsum ",
      paragraphs: [mock, mock2]
   }
];
