import { type DocumentCheckboxBlock, type DocumentContentType } from "../../../model/types";
import React from "react";
import { usePageSettings } from "../../../model/hooks/usePageSettings";

interface CheckboxBlockProps {
   block: DocumentCheckboxBlock;
   contentEditable?: boolean | string;
   onContentChange?: (data: DocumentContentType) => void;
}

const defaultStyle = {
   background: "white",
   padding: 7,
   borderRadius: 7,
   color: "none",
   height: "auto",
   marginBottom: 7,
   display: "flex",
   alignItems: "center",
   border: "none",
   minWidth: 280,
};

const DocumentBlockCheckbox = ({
   block,
   onContentChange,
   contentEditable = "true",
}: CheckboxBlockProps) => {
   const { fullWidth } = usePageSettings();

   const alignItemsStyle = block.content.length > 52 ? "flex-start" : "center";
   const marginStyle = block.content.length > 52 ? 7 : 0;

   const handleContentChange = (newData: string | null) => {
      if (onContentChange == null && newData == null) return;

      onContentChange?.(newData!);
   };

   return (
      <div style={{ display: "flex", flexDirection: "row", alignItems: alignItemsStyle }}>
         <input type={"checkbox"} style={{ marginRight: 7, marginTop: marginStyle }} />
         <div
            style={{ ...defaultStyle, opacity: block.content.length === 0 ? 0.6 : 1 }}
            onInput={(e) => {
               handleContentChange(e.currentTarget.textContent);
            }}
            contentEditable={true}
            suppressContentEditableWarning={true}>
            {block.content.length === 0 ? "Напиши что-нибудь уже...." : block.content}
         </div>
      </div>
   );
};

export default DocumentBlockCheckbox;
