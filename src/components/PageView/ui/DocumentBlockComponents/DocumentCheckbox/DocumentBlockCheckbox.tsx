import { type DocumentCheckboxBlock, type DocumentContentType } from "../../../model/types";
import React, { useState } from "react";
import { usePageSettings } from "../../../model/hooks/usePageSettings";

interface CheckboxBlockProps {
   block: DocumentCheckboxBlock;
   contentEditable?: boolean | string;
   onContentChange?: (data: DocumentContentType) => void;
   onHotKeyInput?: (id: string, input: string) => void;
}

const defaultStyle = {
   padding: 7,
   borderRadius: 7,
   color: "none",
   marginBottom: 7,
   display: "flex",
   alignItems: "center",
   border: "none",
   outline: "none",
   resize: "none",
   width: 480,
   height: 50,
   overflow: "hidden",
};

const DocumentBlockCheckbox = ({
   block,
   onContentChange,
   contentEditable = "true",
   onHotKeyInput,
}: CheckboxBlockProps) => {
   const [content, setContent] = useState<string>(() => block.content);

   const handleContentInput = (textContent: string | null) => {
      if (onContentChange == null || textContent == null) return;

      if (textContent === "/" && onHotKeyInput != null) {
         onHotKeyInput(block.id, textContent);
      }

      setContent(textContent);
   };

   const handleContentBlur = () => {
      if (onContentChange != null) {
         onContentChange(content);
      }
   };

   const alignItemsStyle = block.content.length > 52 ? "flex-start" : "center";
   const marginStyle = block.content.length > 52 ? 7 : 0;

   return (
      <div style={{ display: "flex", flexDirection: "row", alignItems: alignItemsStyle }}>
         <input type={"checkbox"} style={{ marginRight: 7, marginTop: marginStyle }} />
         <textarea
            style={{ ...defaultStyle, opacity: block.content.length === 0 ? 0.6 : 1 }}
            onInput={(e) => {
               handleContentInput(e.currentTarget.textContent);
            }}
            spellCheck={true}
            rows={block.content.length / 65}
            contentEditable={true}
            suppressContentEditableWarning={true}
            placeholder="Type / or something..."
            onBlur={handleContentBlur}>
            {block.content}
         </textarea>
      </div>
   );
};

export default DocumentBlockCheckbox;
