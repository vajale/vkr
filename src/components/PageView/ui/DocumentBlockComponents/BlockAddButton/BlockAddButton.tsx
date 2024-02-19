import React, { useMemo, useState } from "react";

import { blockTypes } from "../../../model/hooks/useDocumentParser";

interface BlockAddButtonProps {
   onClick?: () => void;
   buttonContent: string;
}

const BlockAddButton = (props: BlockAddButtonProps) => {
   const { onClick, buttonContent } = props;

   const handleClick = () => {
      if (!onClick) return;
      onClick();
   };

   return (
      <button
         style={{
            width: 20,
            border: "none",
            background: "white",
            borderRadius: 4,
         }}
         onClick={handleClick}>
         {buttonContent}
      </button>
   );
};

export default BlockAddButton;
