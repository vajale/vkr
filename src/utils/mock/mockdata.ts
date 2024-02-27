import { type DocumentBlock, DocumentBlockType } from "../../components/PageView/model/types";

export const mock =
   "Sed ut perspiciatis, inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime   perferendis doloribus asperiores repellat.";
export const mock2 =
   "Ae ab illo inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";

export const mockDocs: DocumentBlock[] = [
   {
      id: "999",
      type: DocumentBlockType.TEXT,
      content:
         'negro el pidrasos "' +
         'lee quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda  perferendis doloribus asperiores repellat"'
   },
   {
      id: "2243",
      type: DocumentBlockType.CHECKBOX,
      content: "bombaclat",
      flag: true
   },
   {
      id: "236236",
      type: DocumentBlockType.CODE,
      content: "window.sosnihuica()",
      children: {
         id: "sinok ebany",
         type: DocumentBlockType.CODE,
         content: "event.poshelNahoy()"
      }
   },
   {
      id: "345",
      type: DocumentBlockType.TEXT,
      content: `Lorem ipsum \n ${mock} \n ${mock2}`
   },
   {
      id: "346",
      type: DocumentBlockType.TEXT,
      content:
          'negro el pidrasos "' +
          'lee quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda  perferendis doloribus asperiores repellat"'
   },
   {
      id: "2134",
      type: DocumentBlockType.TEXT,
      content:
          'negro el pidrasos "' +
          'lee quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda  perferendis doloribus asperiores repellat"'
   },
   {
      id: "421",
      type: DocumentBlockType.TEXT,
      content:
          'negro el pidrasos "' +
          'lee quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda  perferendis doloribus asperiores repellat"'
   }
];
