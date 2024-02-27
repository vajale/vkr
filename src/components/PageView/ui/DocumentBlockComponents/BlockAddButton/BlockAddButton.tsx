import React, { forwardRef, useMemo, useState } from "react";

interface BlockAddButtonProps {
   onClick?: () => void;
   buttonContent: string;
}

// eslint-disable-next-line react/display-name
const BlockAddButton = forwardRef<HTMLButtonElement, BlockAddButtonProps>(
   (props: BlockAddButtonProps, buttonRef) => {
      const { onClick, buttonContent } = props;

      const handleClick = () => {
         if (onClick == null) return;
         onClick();
      };

      return (
         <button
            ref={buttonRef}
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
   },
);

export default BlockAddButton;
