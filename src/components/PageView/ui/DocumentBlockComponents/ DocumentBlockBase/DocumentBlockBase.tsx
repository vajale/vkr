import React, { useRef } from "react";

import { useMouseView } from "../../../model/hooks/useMouseView";

import BlockAddButton from "../BlockAddButton/BlockAddButton";
import { Stack } from "@mui/material";

// import styles from "./DocumentBlockBase.module.scss";

interface DocumentBlockBaseProps {
   children: React.ReactNode;
   editButtons?: boolean;
}

const DocumentBlockBase = (props: DocumentBlockBaseProps) => {
   const { children, editButtons = true } = props;

   const docRef = useRef<HTMLDivElement>(null);
   const [isHover] = useMouseView(docRef);

   return (
      <Stack flexDirection={"row"} ref={docRef}>
         <Stack flexDirection={"row"} marginRight={1} alignItems={"flex-start"}>
            <div style={{ width: 40 }}>
               {isHover && editButtons && (
                  <Stack flexDirection={"row"} gap={0.4}>
                     <BlockAddButton buttonContent={"#"} />
                     <BlockAddButton buttonContent={"+"} />
                  </Stack>
               )}
            </div>
         </Stack>
         <div>{children && children}</div>
      </Stack>
   );
};

export default DocumentBlockBase;
