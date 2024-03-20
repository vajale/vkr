import React, { useState } from "react";
import {
   type DocumentCheckboxBlock,
   type DocumentCodeBlock,
   type DocumentContentType,
} from "../../../model/types";
import { usePageSettings } from "../../../model/hooks/usePageSettings";

const codeStyle = {
   background: "lightgrey",
   borderRadius: 7,
   border: "none",
   padding: 14,
   color: "none",
   height: "auto",
   marginBottom: 7,
   display: "flex",
   alignItems: "center",
   width: 487,
   outline: "none",
};

interface CodeBlockProps {
   block: DocumentCodeBlock;
   contentEditable?: boolean;
   onContentChange?: (data: DocumentContentType) => void;
   onHotKeyInput?: () => void;
}

const DocumentBlockCode = ({
   block,
   contentEditable,
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
