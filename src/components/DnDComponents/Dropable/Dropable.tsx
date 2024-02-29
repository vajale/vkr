import { useDroppable } from "@dnd-kit/core";
import React from "react";

interface DropableProps {
   id: string;
   children: React.ReactElement;
}

const Dropable = (props: DropableProps) => {
   const { children, id } = props;

   const { setNodeRef } = useDroppable({
      id,
   });

   return <div ref={setNodeRef}>{children}</div>;
};

export default Dropable;
