import React, { useMemo, useState } from "react";
import type { DocumentContentType, DocumentTextBlock, DocumentTodoBlock } from "@/components/PageView/model/types";
import { Button, Checkbox, Stack, Typography } from "@mui/material";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useAppDispatch } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";
import { MaterialIcon } from "@/assets/Icon";

interface TodoProps {
    block: DocumentTodoBlock;
    canEdit?: boolean;
    onContentChange?: (data: DocumentContentType) => void;
    onHotKeyInput?: (id: string, input: string) => void;
}

const DocumentBlockToDo = (props: TodoProps) => {
    const { block, canEdit, onContentChange } = props;

    const [todos, setTodos] = useState(() => block.todos);
    const [content, setContent] = useState<string>(() => block.content);

    const dispatch = useAppDispatch();

    const getFontPadding = useMemo(() => {
        const { textType } = block;

        switch (textType?.variant) {
            case "h4":
                return 2;
            case "h5":
                return 1;
            default:
                return 'subtitle1';
        }
    }, []);

    const handleSetCheckTodo = (id: string) => {
        setTodos(prevTodos => {
            return prevTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
        });

        dispatch(pageActions.updateBlock({ ...block, todos }));
    };

    const handleCreateNewTask = () => {
        setTodos(prevState => [...prevState, {
            id: new Date().toJSON(),
            completed: false,
            title: 'Задача'
        }]);

        dispatch(pageActions.updateBlock({ ...block, todos }));
    };

    const handleRemoveTask = (id: string) => {
        const filterTodos = block.todos.filter(item => item.id === id);
        setTodos(filterTodos);

        dispatch(pageActions.updateBlock({ ...block, todos: filterTodos }));
    };

    const todosRender = useMemo(() => {
        if (todos === undefined) {
            return null;
        }

        return todos?.map((item) => {
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
                        <Button style={{ minWidth: 30, borderRadius: 4 }} onClick={() => {
                            handleRemoveTask(item.id);
                        }}>
                            <MaterialIcon name={"MdDelete"}/>
                        </Button>
                    </Stack>
                </div>
            );
        });
    }, [todos]);

    return (
        <div>
            <Typography width={"900px"} p={getFontPadding}
                        component={'div'}
                        data-placeholder={'asffas'}
                        variant={block.textType?.variant ?? 'subtitle1'}
                        fontWeight={block.textType?.weight}
                        color={block.textType?.fontColor ?? 'none'}
                        contentEditable={canEdit}
                        onInput={(e) => {
                            setContent(e.currentTarget.textContent!);
                        }}
                        onBlur={() => {
                            if (onContentChange != null) {
                                onContentChange(content);
                            }

                            dispatch(pageActions.updateBlock({ ...block, content }));
                        }}>
                {block.content}
            </Typography>
            <DndContext>
                {todos
                    ? <SortableContext items={todos} strategy={verticalListSortingStrategy}>
                        {todosRender}
                    </SortableContext>
                    : <Button style={{ minWidth: 30, borderRadius: 4 }} onClick={handleCreateNewTask}>
                        <MaterialIcon name={"MdAdd"}/>
                    </Button>
                }
            </DndContext>
        </div>
    );
};

export default DocumentBlockToDo;
