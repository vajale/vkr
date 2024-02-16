import React, { useRef } from "react";

import { useMouseView } from "../../../model/hooks/useMouseView";

import BlockAddButton from "../BlockAddButton/BlockAddButton";

// import styles from "./DocumentBlockBase.module.scss";

interface DocumentBlockBaseProps {
  children: React.ReactNode;
}

const DocumentBlockBase = (props: DocumentBlockBaseProps) => {
  const { children } = props;

  const docRef = useRef<HTMLDivElement>(null);
  const [isHover] = useMouseView(docRef);

  return (
    <div ref={docRef}>
      {isHover && (
        <div>
          <BlockAddButton buttonContent={'#'}/>
          <BlockAddButton buttonContent={'+'}/>
        </div>
      )}
      <div>{children && children}</div>
    </div>
  );
};

export default DocumentBlockBase;
