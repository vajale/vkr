import { Box, Button, Stack } from "@mui/material";
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
      <Box style={{
          backgroundColor: 'white'
      }} width={140} position={'absolute'}>
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
      </Box>
   );
};

export default CreateList;
