import { DndContext, type DragEndEvent, rectIntersection, useDraggable, useDroppable } from "@dnd-kit/core";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface Cards {
    content: string;
}

const KanbanCard = ({
                        title,
                        index,
                        parent,
                    }: {
    title: string;
    index: number;
    parent: string;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
 id: title,
        data: {
            title,
            index,
            parent,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        color: "none",
        height: "auto",
        display: "flex",
        border: "none",
        opacity: isDragging ? 0.8 : 1,
        transition,
        cursor: 'move',
    };

    return (
        <div
            style={style}
            {...listeners}
            {...attributes}
            ref={setNodeRef}
        >
            <span>{title}</span>
        </div>
    );
};

interface KanbanLaneProps {
    title: string;
    items: Cards[];
}

function KanbanLane ({ title, items }: KanbanLaneProps) {
    const { setNodeRef } = useDroppable({
        id: title,
    });
    return (
        <div>
            <div>{title}</div>
            <div style={{ width: 200, height: 300, backgroundColor: 'white' }} ref={setNodeRef}>
                {items.map(({ content: cardTitle }, key) => (
                    <KanbanCard title={cardTitle} key={key} index={key} parent={title}/>
                ))}
            </div>
        </div>
    );
}

export function AddCard ({
                     addCard,
                 }: {
    addCard: (title: string) => void;
}) {
    const [title, setTitle] = useState<string>("");

    return (
        <div>
            <span>
                Card Title
            </span>
            <input
                type="text"
                onChange={(e) => { setTitle(e.target.value); }}
                value={title}
            />
            <button
                onClick={() => {
                    setTitle("");
                    addCard(title);
                }}
            >
                Add Card
            </button>
        </div>
    );
}

export default function KanbanBoard () {
    const [todoItems, setTodoItems] = useState<Cards[]>([]);
    const [doneItems, setDoneItems] = useState<Cards[]>([]);
    const [inProgressItems, setInProgressItems] = useState<Cards[]>([]);
    const [uItems, setuItems] = useState<Cards[]>([]);

    const addNewCard = (title: string) => {
        setuItems([...uItems, { content: title }]);
    };

    const handleDragEnd = (e: DragEndEvent) => {
        const container = e.over?.id;
        const title = e.active.data.current?.content ?? "";
        const index = e.active.data.current?.index ?? 0;
        const parent = e.active.data.current?.parent ?? "ToDo";
        if (container === "ToDo") {
            setTodoItems([...todoItems, { content: title }]);
        } else if (container === "Done") {
            setDoneItems([...doneItems, { content: title }]);
        } else if (container === "Unassigned") {
            setuItems([...uItems, { content: title }]);
        } else {
            setInProgressItems([...inProgressItems, { content: title }]);
        }
        if (parent === "ToDo") {
            setTodoItems([
                ...todoItems.slice(0, index),
                ...todoItems.slice(index + 1),
            ]);
        } else if (parent === "Done") {
            setDoneItems([
                ...doneItems.slice(0, index),
                ...doneItems.slice(index + 1),
            ]);
        } else if (parent === "Unassigned") {
            setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
        } else {
            setInProgressItems([
                ...inProgressItems.slice(0, index),
                ...inProgressItems.slice(index + 1),
            ]);
        }
    };

    return (
        <DndContext
            collisionDetection={rectIntersection}
            onDragEnd={handleDragEnd}
        >
            <div>
                <AddCard addCard={addNewCard}/>
                <div style={{ flexDirection: 'row', display: 'flex', gap: 10 }}>
                    <KanbanLane title="ToDo" items={todoItems}/>
                    <KanbanLane title="In Progress" items={inProgressItems}/>
                    <KanbanLane title="Done" items={doneItems}/>
                    <KanbanLane title="Unassigned" items={uItems}/>
                </div>
            </div>
        </DndContext>
    );
}
