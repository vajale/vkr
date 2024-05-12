import React, { useState } from "react";
import type { DocumentContentType, DocumentTextBlock, DocumentTodoBlock } from "@/components/PageView/model/types";
import { Button, Checkbox, Stack, Typography } from "@mui/material";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch } from "@/store/hooks";
import { documentPageActions } from "@/store/slices/pageSlice";
import { MaterialIcon } from "@/assets/Icon";

interface TodoProps {
    block: DocumentTodoBlock;
    canEdit?: boolean;
    onContentChange?: (data: DocumentContentType) => void;
    onHotKeyInput?: (id: string, input: string) => void;
}

const DocumentBlockToDo = (props: TodoProps) => {
    const { block } = props;
    const dispatch = useAppDispatch();

    const [todos, setTodos] = useState(block.todos);

    const handleSetCheckTodo = (id: string) => {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
        });

        dispatch(documentPageActions.updateDocumentBlock({ ...block, todos }));
    };

    const handleCreateNewTask = () => {
        setTodos(prevState => [...prevState, {
            id: new Date().toJSON(),
            completed: false,
            title: 'Задача'
        }]);

        dispatch(documentPageActions.updateDocumentBlock({ ...block, todos }));
    };

    return (
        <div>
            <Typography variant={block.textType?.variant}>{block.content}</Typography>
            <DndContext>
                <SortableContext items={todos} strategy={verticalListSortingStrategy}>
                    {todos.map((item) => {
                        return (
                            <div key={item.id} id={item.id}>
                                <Stack flexDirection={'row'} alignItems={'center'}>
                                    <Checkbox checked={item.completed} onChange={() => {
                                        handleSetCheckTodo(item.id);
                                    }}/>
                                    <Typography>{item.title}</Typography>
                                    <Button style={{ minWidth: 30, borderRadius: 4 }} onClick={handleCreateNewTask}>
                                        <MaterialIcon name={"MdAdd"}/>
                                    </Button>
                                </Stack>
                            </div>
                        );
                    })}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default DocumentBlockToDo;
