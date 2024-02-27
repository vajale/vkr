import React from "react";

import { DocumentBlockType } from "../../model/types";

interface ListProps {
   onTypeEdit?: (type: DocumentBlockType) => void;
}

const blockTypes: Record<string, DocumentBlockType> = {
    code: DocumentBlockType.CODE,
    text: DocumentBlockType.TEXT,
    checkbox: DocumentBlockType.CHECKBOX,
    image: DocumentBlockType.IMAGE
};

const EditList = ({ onTypeEdit }: ListProps) => {
   const handleEditType = (newType: DocumentBlockType) => {
      if (onTypeEdit == null) return;

      if (newType === DocumentBlockType.IMAGE || newType === DocumentBlockType.QUOTE) return;

      onTypeEdit(newType);
   };

   return (
      <ul
         style={{
            position: "fixed",
            padding: 7,
            background: "white",
            listStyle: "none",
            display: "flex",
            flexDirection: "column"
         }}>
         {Object.values(DocumentBlockType).map((value) => (
            <button
                style={{ border: 'none', marginBottom: 7, padding: 7, borderRadius: 7, width: 140 }}
               onClick={() => {
                  handleEditType(value);
               }}
               key={value}>
               {value}
            </button>
         ))}
      </ul>
   );
};

export default EditList;
