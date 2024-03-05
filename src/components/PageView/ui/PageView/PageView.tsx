import React, { useState } from "react";

import PageHeader from "../PageHeader/PageHeader";
import { Paper } from "@mui/material";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import Dropable from "../../../DnDComponents/Dropable/Dropable";
import { documentPageActions, selectDocumentHeaderFlag } from "../../../../store/slices/pageSlice";
import { DocumentBlockType } from "../../model/types";
import DocumentBlockCode from "../DocumentBlockComponents/DocumentBlockCode/DocumentBlockCode";
import DocumentBlockText from "../DocumentBlockComponents/DocumentBlockText/DocumentBlockText";
import DocumentBlockBase from "../DocumentBlockComponents/DocumentBlockBase/DocumentBlockBase";
import DocumentBlockCheckbox from "../DocumentBlockComponents/DocumentCheckbox/DocumentBlockCheckbox";

const PageView = () => {
   const dispatch = useAppDispatch();

   const isHaveHeader = useAppSelector(selectDocumentHeaderFlag);
   const headerLogo = useAppSelector(selectDocumentHeaderFlag);

   // const { data, isLoading, isSuccess } = useGetDocumentsQuery();
   //
   // useEffect(() => {
   //    if (isSuccess) {
   //       dispatch(documentPageActions.updateDocuments(data));
   //    }
   // }, [isLoading, isSuccess]);

   const docs = useAppSelector((state) => state.documentPage.data);
   const [editId, setEditId] = useState<string>();

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
      // const { over } = e;
      //
      // if (over === null) return;
   };

   // const getDocument = useMemo(() => {
   //
   // }, []);

   const isContentEditable = true;

   return (
      <>
         <PageHeader text={headerLogo} isHaveHover={isHaveHeader} />
         <Paper
            sx={{
               width: 600,
               height: 900,
               p: 2,
               bgcolor: "whitesmoke"
            }}>
            <DndContext
               collisionDetection={closestCenter}
               onDragEnd={handleDragEnd}
               onDragMove={handleDragMove}>
               <SortableContext items={docs} strategy={verticalListSortingStrategy}>
                  {docs.map((item) => {
                     const isMenuOpen = editId === item.id;

                     const handleEditButtonClick = (id: string) => {
                        if (id === "") return;

                        setEditId(id);
                     };

                     const handleListClick = (type: DocumentBlockType) => {
                        setEditId("");
                     };

                     const baseProps = {
                        disableEditButtons: isMenuOpen,
                        onEditButtonClick: handleEditButtonClick,
                        onTypeChange: handleListClick,
                        isMenuOpen
                     };

                     switch (item.type) {
                        case DocumentBlockType.CODE:
                           return (
                              <Dropable key={item.id} id={item.id}>
                                 <DocumentBlockBase id={item.id} {...baseProps}>
                                    <DocumentBlockCode block={item} />
                                 </DocumentBlockBase>
                              </Dropable>
                           );
                        case DocumentBlockType.CHECKBOX:
                           return (
                              <Dropable key={item.id} id={item.id}>
                                 <DocumentBlockBase id={item.id} {...baseProps}>
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
                                 <DocumentBlockBase id={item.id} {...baseProps}>
                                    <DocumentBlockText
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
                        default:
                           break;
                     }
                  })}
               </SortableContext>
            </DndContext>
         </Paper>
      </>
   );
};

export default PageView;
