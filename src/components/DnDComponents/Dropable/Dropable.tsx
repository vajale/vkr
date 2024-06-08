import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { type Task } from "@/components/PageView/model/types";

interface DropableProps {
   id: string;
   children?: React.ReactElement;
   nodeId?: string
}

const Dropable = (props: DropableProps) => {
   const { children, id, nodeId } = props;

   const { setNodeRef, isOver } = useDroppable({
      id,
   });

   return <div id={nodeId} ref={setNodeRef}>{children}</div>;
};

export default Dropable;
