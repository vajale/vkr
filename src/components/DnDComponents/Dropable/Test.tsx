import React, { useState } from 'react';
import { DndContext, closestCenter, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { mockTasks } from "@/utils/mock/mockdata";
import { type Task } from '@/components/PageView/model/types';

 const mocktasks: Task[] = [
    { id: '2', content: '', priority: '2', time: '00:00:00', date: '' },
    { id: '3', content: '', priority: '3', time: '00:00:00', date: '' },
    { id: '4', content: '', priority: '4', time: '00:00:00', date: '' },
];

const mocktasks2: Task[] = [
    { id: '11', content: "14512", priority: '2', time: '00:00:00', date: '' },
];

const mocktasks3: Task[] = [
    { id: '21', content: "125125", priority: '1', time: '00:00:00', date: '' },
];

export const mocktasks4: Task[] = [
    { id: '31', content: "345435", priority: '3', time: '00:00:00', date: '' },
];

const SortableItem = ({ id, content }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '8px',
        margin: '4px',
        backgroundColor: isDragging ? 'lightgreen' : 'lightblue',
        cursor: 'move',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {content}
        </div>
    );
};

const DropZone = ({ id, items, setItems }) => {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });

    const style = {
        margin: '20px',
        padding: '20px',
        border: '2px dashed gray',
        minHeight: '200px',
        width: '200px',
        backgroundColor: isOver ? 'lightyellow' : 'white',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {items.length === 0 && isOver && (
                <div style={{ height: '50px', backgroundColor: 'lightyellow' }}></div>
            )}
            {items.map((item) => (
                <SortableItem key={item.id} id={item.id} content={item.content} />
            ))}
        </div>
    );
};

const Leel = () => {
    const [items, setItems] = useState({
        zone1: mocktasks3.map(task => task.id),
        zone2: mocktasks.map(task => task.id),
        zone3: mocktasks4.map(task => task.id),
        zone4: mocktasks2.map(task => task.id),
    });

    const allTasks = {
        ...mocktasks3.reduce((acc, task) => ({ ...acc, [task.id]: task }), {}),
        ...mocktasks.reduce((acc, task) => ({ ...acc, [task.id]: task }), {}),
        ...mocktasks4.reduce((acc, task) => ({ ...acc, [task.id]: task }), {}),
        ...mocktasks2.reduce((acc, task) => ({ ...acc, [task.id]: task }), {}),
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) {
            return;
        }

        const { id: activeId } = active;
        const { id: overId } = over;

        const activeZone = findZone(items, activeId);
        const overZone = findZone(items, overId);

        if (activeZone && overZone) {
            if (activeZone === overZone) {
                const newItems = arrayMove(items[activeZone], items[activeZone].indexOf(activeId), items[overZone].indexOf(overId));
                setItems((prevItems) => ({
                    ...prevItems,
                    [activeZone]: newItems,
                }));
            } else {
                const newActiveZoneItems = items[activeZone].filter((item) => item !== activeId);
                const newOverZoneItems = [...items[overZone], activeId];

                setItems((prevItems) => ({
                    ...prevItems,
                    [activeZone]: newActiveZoneItems,
                    [overZone]: newOverZoneItems,
                }));
            }
        }
    };

    const findZone = (items, id) => {
        return Object.keys(items).find((zone) => items[zone].includes(id));
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <SortableContext items={items.zone1} strategy={verticalListSortingStrategy}>
                    <DropZone id="1" items={items.zone1.map(id => allTasks[id])} setItems={(newItems) => { setItems((prev) => ({ ...prev, zone1: newItems })); }} />
                </SortableContext>
                <SortableContext items={items.zone2} strategy={verticalListSortingStrategy}>
                    <DropZone id="2" items={items.zone2.map(id => allTasks[id])} setItems={(newItems) => { setItems((prev) => ({ ...prev, zone2: newItems })); }} />
                </SortableContext>
                <SortableContext items={items.zone3} strategy={verticalListSortingStrategy}>
                    <DropZone id="3" items={items.zone3.map(id => allTasks[id])} setItems={(newItems) => { setItems((prev) => ({ ...prev, zone3: newItems })); }} />
                </SortableContext>
                <SortableContext items={items.zone4} strategy={verticalListSortingStrategy}>
                    <DropZone id="4" items={items.zone4.map(id => allTasks[id])} setItems={(newItems) => { setItems((prev) => ({ ...prev, zone4: newItems })); }} />
                </SortableContext>
            </div>
        </DndContext>
    );
};

export default Leel;
