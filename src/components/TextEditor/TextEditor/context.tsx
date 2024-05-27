import * as React from "react";
import { type EditorApi, useEditor } from "./useEditor";

const TextEditorContext = React.createContext<EditorApi | undefined>(undefined);

export const TextEditorProvider: React.FC<{
    children: React.ReactNode,
    json: string,
    width?: string,
    height?: string
}> = ({ children, json, height, width }) => {
    const editorApi = useEditor(json);

    return (
        <div style={{ position: 'relative', width, height, minWidth: 70, maxWidth: 1100 }}>
            <TextEditorContext.Provider value={editorApi}>
                {children}
            </TextEditorContext.Provider>
        </div>
    );
};

export const useEditorApi = () => {
    const context = React.useContext(TextEditorContext);
    if (context === undefined) {
        throw new Error("useEditorApi must be used within TextEditorProvider");
    }

    return context;
};
