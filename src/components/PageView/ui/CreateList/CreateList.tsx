import { DocumentBlockType } from "../../model/types";
import { StyledList, StyledListButton } from "../EditList/styled";
import React from "react";

interface ListProps {
   onTypeClick?: (type: DocumentBlockType) => void;
}

const CreateList = ({ onTypeClick }: ListProps) => {
   const handleEditType = (newType: DocumentBlockType) => {
      if (onTypeClick == null) return;

      if (newType === DocumentBlockType.IMAGE || newType === DocumentBlockType.QUOTE) return;

      onTypeClick(newType);
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
      </StyledList>
   );
};

export default CreateList;
