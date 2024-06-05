import React, { useEffect, useMemo, useState } from "react";
import {
    type DocumentContentType,
    DocumentTextBlock,
    type DocumentTodoBlock,
    Task,
    type Todo
} from "@/components/PageView/model/types";
import { Button, Checkbox, Stack, Typography } from "@mui/material";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useAppDispatch } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";
import { MaterialIcon } from "@/assets/Icon";
import { motion } from "framer-motion";
import EditableTextField from "@/components/PageView/ui/EditableTextField/EditableTextField";

interface TodoProps {
    block: DocumentTodoBlock;
    canEdit?: boolean;
    onContentChange?: (data: DocumentContentType) => void;
    onHotKeyInput?: (id: string, input: string) => void;
}

const DocumentBlockToDo = (props: TodoProps) => {
    const { block, canEdit, onContentChange } = props;

    const dispatch = useAppDispatch();

    const [todos, setTodos] = useState<Todo[] | []>(() => {
        if (block.todos === undefined) {
            return [];
        }

        return block.todos;
    });

    useEffect(() => {
        setTodos(block.todos);
    }, [block.todos]);

    const handleSetCheckTodo = (id: string) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });

        setTodos(newTodos);
        dispatch(pageActions.updateBlock({ ...block, todos: newTodos }));
    };

    const handleCreateNewTask = () => {
        const newTodos = [...todos, {
            id: new Date().toJSON(),
            completed: false,
            title: ``
        }];

        setTodos(newTodos);
        dispatch(pageActions.updateBlock({ ...block, todos: newTodos }));
    };

    const handleRemoveTask = (id: string) => {
        const filterTodos = todos.filter(item => item.id !== id);

        setTodos(filterTodos);
        dispatch(pageActions.updateBlock({ todos: filterTodos }));
    };

    const handleContentChange = (json: string) => {
        if (onContentChange) {
            onContentChange(json);

            dispatch(
                pageActions.updateBlock({ ...block, content: json })
            );
        }
    };

    const handleTaskChange = (id: string, json: string) => {
        console.log(json);

        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, title: json };
            }
            return todo;
        });

        setTodos(newTodos);
        dispatch(
            pageActions.updateBlock({ ...block, todos: newTodos })
        );
    };

    const todosRender = useMemo(() => {
        if (todos === undefined) {
            return null;
        }

        return todos?.map((item) => {
            if (todos.length === 0) {
                return (<div key={item.id} onMouseDown={handleCreateNewTask}></div>);
            }

            return (
                    <Stack alignItems={'center'} flexDirection={'row'} key={item.id}>
                        <Checkbox checked={item.completed} onChange={() => {
                            handleSetCheckTodo(item.id);
                        }}/>
                        <EditableTextField
                            placeholder={'...'}
                            canEdit={canEdit}
                            title={item.title}
                            onContentChange={(jsonString) => {
                                handleTaskChange(item.id, jsonString);
                            }}/>
                        <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                            <Button style={{ minWidth: 30, borderRadius: 4 }} onClick={handleCreateNewTask}>
                                <MaterialIcon name={"MdAdd"}/>
                            </Button>
                            <Button style={{ minWidth: 30, borderRadius: 4 }} onClick={() => {
                                handleRemoveTask(item.id);
                            }}>
                                <MaterialIcon name={"MdDelete"}/>
                            </Button>
                        </motion.div>
                    </Stack>
            );
        });
    }, [todos]);

    return (
        <div>
            <Stack flexDirection={'row'}>
                <EditableTextField
                    placeholder={'Напишите что-нибудь...'}
                    canEdit={canEdit}
                    width={'400px'}
                    title={block.content}
                    onContentChange={handleContentChange}/>
                <Button style={{ minWidth: 30, borderRadius: 4 }} onClick={handleCreateNewTask}>
                    <MaterialIcon name={"MdAdd"}/>
                </Button>
            </Stack>
            <DndContext>
                {todos
                    ? <SortableContext items={todos} strategy={verticalListSortingStrategy}>
                        <Stack marginLeft={3} alignItems={'flex-start'}>
                            {todosRender}
                        </Stack>
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
