import React, { useRef, useState } from "react";

import { useMouseView } from "../../../model/hooks/useMouseView";

import { Stack } from "@mui/material";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch } from "../../../../../store/hooks";
import { documentPageActions } from "../../../../../store/slices/pageSlice";
import EditList from "../../EditList/EditList";
import { type DocumentBlockType } from "../../../model/types";

interface DocumentBlockBaseProps {
   id: string;
   disableEditButtons?: boolean;
   isMenuOpen?: boolean;
   onMoveButtonClick?: (id: string) => void;
   onEditButtonClick?: (id: string) => void;
   children: React.ReactNode;
   onTypeChange?: (type: DocumentBlockType, id: string) => void;
}

const DocumentBlockBase = (props: DocumentBlockBaseProps) => {
   const {
      children,
      onMoveButtonClick,
      onEditButtonClick,
      disableEditButtons = false,
      isMenuOpen = false,
      id,
      onTypeChange
   } = props;

   const [isEditabale, setIsEditabale] = useState<boolean>(isMenuOpen);
   const dispatch = useAppDispatch();

   const { setNodeRef, listeners, attributes, transform, active } = useDraggable({ id });
   const docRef = useRef<HTMLDivElement>(null);

   const [isHover] = useMouseView(docRef);

   const style = {
      transform: CSS.Translate.toString(transform),
      background: "none",
      color: "none",
      height: "auto",
      marginBottom: 7,
      display: "flex",
      border: "none",
      opacity: active?.id === id ? 0.7 : 1
   };

   const handleEditClick = () => {
      if (onEditButtonClick == null) return;

      onEditButtonClick(id);
      setIsEditabale((prevState) => !prevState);
   };

   const handleTypeEdit = (type: DocumentBlockType) => {
      if (onTypeChange == null) return;

      onTypeChange(type, id);
      setIsEditabale(false);
      dispatch(
         documentPageActions.updateDocumentType({
            type,
            id
         })
      );
   };

   return (
      <div ref={setNodeRef} style={style} id={id}>
         <Stack flexDirection={"row"} ref={docRef}>
            <Stack flexDirection={"row"} marginRight={2} alignItems={"flex-start"}>
               <div style={{ width: 40 }}>
                  {(isHover && !disableEditButtons) && (
                     <Stack flexDirection={"row"} gap={0.4}>
                        <button
                           style={{
                              width: 24,
                              border: "none",
                              background: "white",
                              borderRadius: 4
                           }}
                           onClick={handleEditClick}>
                           +
                        </button>
                        <div id={id} {...listeners} {...attributes}>
                           <button
                              style={{
                                 width: 24,
                                 border: "none",
                                 background: "white",
                                 borderRadius: 4
                              }}
                              onClick={() => onMoveButtonClick}>
                              ||
                           </button>
                        </div>
                     </Stack>
                  )}
                  {isMenuOpen && <EditList onTypeEdit={handleTypeEdit} />}
               </div>
            </Stack>
            {children && (
               <DndContext>
                  <div>{children}</div>
               </DndContext>
            )}
         </Stack>
      </div>
   );
};

export default DocumentBlockBase;
