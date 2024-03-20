import React, { useState } from "react";

import PageHeader from "../PageHeader/PageHeader";
import { Paper, Stack } from "@mui/material";

import DocumentBlockCode from "../DocumentBlockComponents/DocumentBlockCode/DocumentBlockCode";
import DocumentBlockText from "../DocumentBlockComponents/DocumentBlockText/DocumentBlockText";
import DocumentBlockBase from "../DocumentBlockComponents/DocumentBlockBase/DocumentBlockBase";
import DocumentBlockCheckbox from "../DocumentBlockComponents/DocumentCheckbox/DocumentBlockCheckbox";

import { documentPageActions, selectDocumentHeaderFlag, selectDocuments } from "../../../../store/slices/pageSlice";

import { DocumentBlockType } from "../../model/types";

import Dropable from "../../../DnDComponents/Dropable/Dropable";
import {
   closestCenter,
   DndContext,
   type DragEndEvent,
   useSensor,
   MouseSensor
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
   DocumentPageLinkComponent
} from "@/components/PageView/ui/DocumentBlockComponents/DocumenkPageLinkComponent/DocumentPageLinkComponent";

const PageView = () => {
   const [pageViewData, setPageViewData] = useState({
      currentId: "",
      isCanEdit: true
   });

   const docs = useAppSelector(selectDocuments);
   const isHaveHeader = useAppSelector(selectDocumentHeaderFlag);

   const dispatch = useAppDispatch();

   const handleDragEnd = (e: DragEndEvent) => {
      const { active, over } = e;

      if (over === null || active.id === over.id) {
         return;
      }

      const oldIndex = docs.findIndex((block) => block.id === active.id);
      const newIndex = docs.findIndex((block) => block.id === over.id);
      const newArray = arrayMove(docs, oldIndex, newIndex);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dispatch(documentPageActions.updateDocuments(newArray));
   };

   const handleDragMove = (e: DragEndEvent) => {
      const { active } = e;

      console.log(active.id);
   };

   const mouseSensor = useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
         distance: 50
      }
   });

   return (
      <Stack flexDirection={"column"}>
         <PageHeader text={"Header"} isHaveHover={isHaveHeader} />
         <Paper
            sx={{
               width: 600,
               height: 900,
               p: 2,
               bgcolor: "whitesmoke"
            }}>
            <h1>Page</h1>
            <DndContext
               sensors={[mouseSensor]}
               collisionDetection={closestCenter}
               onDragEnd={handleDragEnd}
               onDragMove={handleDragMove}>
               <SortableContext items={docs} strategy={verticalListSortingStrategy}>
                  {docs.map((item) => {
                     const handleEditButtonClick = (id: string) => {
                        if (id === "") return;

                        setPageViewData((prevState) => ({ ...prevState, isCanEdit: false }));
                     };

                     const baseProps = {
                        // ignoreButtonsHover: pageViewData.isCanEdit,
                        onEditButtonClick: handleEditButtonClick
                     };

                     const handleHotKeyClick = () => {};

                     switch (item.type) {
                        case DocumentBlockType.CODE:
                           return (
                              <Dropable key={item.id} id={item.id}>
                                 <DocumentBlockBase item={item} {...baseProps}>
                                    <DocumentBlockCode
                                       block={item}
                                       onContentChange={(data) => {
                                          dispatch(
                                             documentPageActions.updateDocumentBlock({
                                                ...item,
                                                content: data
                                             })
                                          );
                                       }}
                                    />
                                 </DocumentBlockBase>
                              </Dropable>
                           );
                        case DocumentBlockType.CHECKBOX:
                           return (
                              <Dropable key={item.id} id={item.id}>
                                 <DocumentBlockBase item={item} {...baseProps}>
                                    <DocumentBlockCheckbox
                                       block={item}
                                       onContentChange={(data) => {
                                          dispatch(
                                             documentPageActions.updateDocumentBlock({
                                                ...item,
                                                content: data
                                             })
                                          );
                                       }}
                                    />
                                 </DocumentBlockBase>
                              </Dropable>
                           );
                        case DocumentBlockType.TEXT:
                           return (
                              <Dropable key={item.id} id={item.id}>
                                 <DocumentBlockBase item={item} {...baseProps}>
                                    <DocumentBlockText
                                       block={item}
                                       onHotKeyInput={handleHotKeyClick}
                                       onContentChange={(data) => {
                                          dispatch(
                                             documentPageActions.updateDocumentBlock({
                                                ...item,
                                                content: data
                                             })
                                          );
                                       }}
                                    />
                                 </DocumentBlockBase>
                              </Dropable>
                           );
                        case DocumentBlockType.LINK:
                           return (
                               <Dropable key={item.id} id={item.id}>
                                  <DocumentBlockBase item={item} {...baseProps}>
                                     <DocumentPageLinkComponent block={item}/>
                                  </DocumentBlockBase>
                               </Dropable>
                           );
                        default:
                           break;
                     }
                  })}
               </SortableContext>
            </DndContext>
         </Paper>
      </Stack>
   );
};

export default PageView;
