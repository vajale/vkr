import { Box, Button, Stack } from "@mui/material";
import { DocumentBlockType } from "../../model/types";
import { StyledBox, StyledList, StyledListButton } from "../EditList/styled";
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
      <StyledBox width={140} position={'absolute'}>
         Создать блок...
         <Stack>
            {Object.values(DocumentBlockType).map((value) => (
                <Button
                    onClick={() => {
                       handleEditType(value);
                    }}
                    key={value}>
                   {value}
                </Button>
            ))}
         </Stack>
      </StyledBox>
   );
};

export default CreateList;
