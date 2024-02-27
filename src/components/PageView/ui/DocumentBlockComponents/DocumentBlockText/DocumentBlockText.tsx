import React from "react";
import { type DocumentContentType, type DocumentTextBlock } from "../../../model/types";

interface TextBlockProps {
   block: DocumentTextBlock;
   contentEditable?: boolean,
   onContentChange?: (data: DocumentContentType) => void
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
   border: "none"
};

const DocumentBlockText = ({ block, contentEditable = true, onContentChange }: TextBlockProps) => {
   const handleContentChange = (textContent: string | null) => {
      if (onContentChange == null || textContent == null) return;

      onContentChange(textContent);
   };

   return (
      <div style={defaultStyle}>
         <div>
            <span onInput={(e) => { handleContentChange(e.currentTarget.textContent); }}
                  contentEditable={contentEditable} suppressContentEditableWarning={true}>{block.content}</span>
         </div>
      </div>
   );
};

export default DocumentBlockText;
