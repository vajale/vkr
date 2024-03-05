import React from "react";
import { type DocumentCheckboxBlock, type DocumentCodeBlock } from "../../../model/types";
import { usePageSettings } from "../../../model/hooks/usePageSettings";

interface CodeBlockProps {
   block: DocumentCodeBlock;
   contentEditable?: boolean;
}

const codeStyle = {
   background: "lightgrey",
   borderRadius: 7,
   padding: 14,
   color: "none",
   height: "auto",
   marginBottom: 7,
   display: "flex",
   alignItems: "center",
   width: " 100%",
};

const DocumentBlockCode = ({ block, contentEditable }: CodeBlockProps) => {
   const { fullWidth } = usePageSettings();

   return (
      <code
         contentEditable={contentEditable}
         suppressContentEditableWarning={true}
         style={codeStyle}>
         {block.content}
      </code>
   );
};

export default DocumentBlockCode;
