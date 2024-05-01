import React, { useState } from "react";
import {
   type DocumentCheckboxBlock,
   type DocumentCodeBlock,
   type DocumentContentType,
} from "../../../model/types";
import { usePageSettings } from "../../../model/hooks/usePageSettings";

const codeStyle = {
   background: "#ececec",
   borderRadius: 7,
   border: "none",
   padding: 7,
   color: "none",
   height: "auto",
   marginBottom: 7,
   display: "flex",
   alignItems: "center",
   width: 700,
   outline: "none",
};

interface CodeBlockProps {
   block: DocumentCodeBlock;
   canEdit?: boolean;
   onContentChange?: (data: DocumentContentType) => void;
   onHotKeyInput?: () => void;
}

const DocumentBlockCode = ({
   block,
   canEdit,
   onContentChange,
   onHotKeyInput,
}: CodeBlockProps) => {
   const [content, setContent] = useState<string>(() => block.content);

   const handleContentInput = (textContent: string | null) => {
      if (onContentChange == null || textContent == null) return;

      setContent(textContent);
   };
   const handleContentBlur = () => {
      if (onContentChange != null) {
         onContentChange(content);
      }
   };

   return (
      <textarea
         style={{ ...codeStyle, resize: "none" }}
         onInput={(e) => {
            handleContentInput(e.currentTarget.textContent);
         }}
         disabled={!canEdit}
         spellCheck={true}
         contentEditable={true}
         onBlur={handleContentBlur}
         placeholder="Type / or something..."
         suppressContentEditableWarning={true}>
         {block.content}
      </textarea>
   );
};

export default DocumentBlockCode;
