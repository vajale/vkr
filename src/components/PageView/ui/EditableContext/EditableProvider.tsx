import React from "react";
import { type ReactNode, useState } from "react";

interface ProviderProps {
   children: ReactNode;
}

const EditableProvider = ({ children }: ProviderProps) => {
   const [editableDocument, setEditableDocument] = useState<number | undefined>(undefined);

   return <div>{children}</div>;
};

export default EditableProvider;
