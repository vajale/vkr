import React from "react";

import { DocumentBlockType } from "../../model/types";
import { StyledList, StyledListButton } from "./styled";

interface EditListProps {
   onEdit?: (type: DocumentBlockType) => void;
}

const EditList = ({ onEdit }: EditListProps) => {
   const handleEditType = (newType: DocumentBlockType) => {
      if (onEdit == null) return;

      if (newType === DocumentBlockType.IMAGE || newType === DocumentBlockType.QUOTE) return;

      onEdit(newType);
   };

   return (
      <StyledList>
         {Object.values(DocumentBlockType).map((value) => (
            <StyledListButton
               onClick={() => {
                  handleEditType(value);
               }}
               key={value}>
               {value}
            </StyledListButton>
         ))}
         {Object.values(DocumentBlockType).map((value) => (
            <button
               onClick={() => {
                  handleEditType(value);
               }}
               key={value}>
               {value}
            </button>
         ))}
      </StyledList>
   );
};

export default EditList;
