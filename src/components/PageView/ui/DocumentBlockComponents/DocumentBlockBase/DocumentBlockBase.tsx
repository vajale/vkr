import React, { memo, useEffect, useRef, useState } from "react";

import { useMouseHover } from "../../../model/hooks/useMouseHover";

import { Button, Stack } from "@mui/material";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch } from "@/store/hooks";
import { documentPageActions } from "@/store/slices/pageSlice";
import { type DocumentBlock, type DocumentBlockType } from "../../../model/types";
import CreateList from "../../CreateList/CreateList";
import { MaterialIcon } from "@/assets/Icon";

interface DocumentBlockBaseProps {
   item: DocumentBlock;
   ignoreButtonsHover?: boolean;
   isAddMenuOpen?: boolean;
   onMove?: (id: string) => void;
   onAdd?: (type: DocumentBlockType) => void;
   children: React.ReactNode;
   onTypeChange?: (type: DocumentBlockType, id: string) => void;
}

const DocumentBlockBase = memo((props: DocumentBlockBaseProps) => {
   const { children, onAdd, item, ignoreButtonsHover = false } = props;

   const [buttonsOptions, setButtonOptions] = useState({
      isAddMenuOpened: false,
      isEditButtonsDisable: false,
      isEditMenuOpened: false
   });

   const dispatch = useAppDispatch();

   const { setNodeRef, listeners, attributes, transform, active } = useDraggable({ id: item.id });
   const docRef = useRef<HTMLDivElement>(null);

   const [isHover] = useMouseHover(docRef);

   const style = {
      transform: CSS.Translate.toString(transform),
      background: "none",
      color: "none",
      height: "auto",
      display: "flex",
      border: "none",
      opacity: active?.id === item.id ? 0.7 : 1,
   };

   useEffect(() => {
      setButtonOptions((prevState) => ({
         ...prevState,
         isEditButtonsDisable: ignoreButtonsHover
      }));
   }, [ignoreButtonsHover]);

   const handleTypeEdit = (type: DocumentBlockType) => {
      dispatch(documentPageActions.updateDocumentType({ id: item.id, type }));

      setButtonOptions((prevState) => ({ ...prevState, isEditMenuOpened: false }));
   };

   const handleAddButtonClick = () => {
      setButtonOptions((prevState) => ({
         ...prevState,
         isAddMenuOpened: !prevState.isAddMenuOpened
      }));
   };

   const handleAddBlock = (type: DocumentBlockType) => {
      if (onAdd != null) {
         onAdd(type);
      }

      setButtonOptions((prevState) => ({
         ...prevState,
         isAddMenuOpened: false
      }));

      dispatch(documentPageActions.addDocumentBlock(type));
   };

   const handleDeleteButtonClick = () => {
      console.log(item.id);
      dispatch(documentPageActions.removeDocumentBlock({ id: item.id }));
   };

   const handleEditClick = () => {
      setButtonOptions((prevState) => ({
         ...prevState,
         isEditMenuOpened: !prevState.isEditMenuOpened
      }));
   };

   return (
      <div ref={setNodeRef} style={style} id={item.id}>
         <Stack flexDirection={"row"} ref={docRef}>
            <Stack marginRight={2}>
               <div style={{ width: 40 }}>
                  {isHover && !buttonsOptions.isEditButtonsDisable && (
                     <Stack flexDirection={"row"} gap={0.4}>
                        <button
                           style={{
                              width: 24,
                              border: "none",
                              background: "white",
                              borderRadius: 4,
                              justifyContent: "center"
                           }}
                           onClick={handleAddButtonClick}>
                           +
                        </button>
                        <div id={item.id} {...listeners} {...attributes}>
                           <button
                              onClick={handleEditClick}
                              style={{
                                 width: 16,
                                 border: "none",
                                 background: "white",
                                 borderRadius: 4,
                                 display: "flex",
                                 justifyContent: "center"
                              }}>
                              ::
                           </button>
                        </div>
                     </Stack>
                  )}
                  {buttonsOptions.isAddMenuOpened && <CreateList onTypeClick={handleAddBlock} />}
                  {buttonsOptions.isEditMenuOpened && (
                     <CreateList
                        onTypeClick={(type) => {
                           handleTypeEdit(type);
                        }}
                     />
                  )}
               </div>
            </Stack>
            {(
               <DndContext>
                  <div>{children}</div>
               </DndContext>
            ) && children}
         </Stack>
         <Button sx={{ minWidth: 20, maxHeight: 30, ml: 2 }} onClick={handleDeleteButtonClick}>
            <MaterialIcon name={"MdDeleteOutline"}/>
         </Button>
      </div>
   );
});

export default DocumentBlockBase;
