import { Button, Stack } from "@mui/material";
import { DocumentBlockType } from "../../model/types";
import { StyledBox } from "../EditList/styled";
import React from "react";

interface ListProps {
   onTypeClick?: (type: DocumentBlockType) => void;
}

const AddList = ({ onTypeClick }: ListProps) => {
   const handleEditType = (newType: DocumentBlockType) => {
      if (onTypeClick == null) return;

      if (newType === DocumentBlockType.IMAGE || newType === DocumentBlockType.QUOTE) return;

      onTypeClick(newType);
   };

   return (
      <StyledBox width={140} position={'absolute'}>
         Создать блок...
         <Stack>
            {/* {Object.values(DocumentBlockType).filter((item) => item === DocumentBlockType.IMAGE || DocumentBlockType.QUOTE || DocumentBlockType.CODE).map((value) => ( */}
            {/*    <Button */}
            {/*        onClick={() => { */}
            {/*           handleEditType(value); */}
            {/*        }} */}
            {/*        key={value}> */}
            {/*       {value} */}
            {/*    </Button> */}
            {/* ))} */}
             <Button
                 onClick={() => {
                     handleEditType(DocumentBlockType.TEXT);
                 }}>
                 Текстовый блок
             </Button>
         </Stack>
      </StyledBox>
   );
};

export default AddList;
