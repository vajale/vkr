// App.js
import React, { useState } from 'react';
import { DndContext, closestCenter, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id }) => {
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
            Item {id}
        </div>
    );
};

const DropZone = ({ id, items, setItems }) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    const style = {
        margin: '20px',
        padding: '20px',
        border: '2px dashed gray',
        minHeight: '200px',
        width: '200px',
    };

    return (
        <div ref={setNodeRef} style={style}>
            <h3>Drop Zone {id}</h3>
            {items.map((item) => (
                <SortableItem key={item} id={item} />
            ))}
        </div>
    );
};

const Leel = () => {
    const [items, setItems] = useState({
        zone1: [1, 2, 3],
        zone2: [4, 5, 6],
    });

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) {
            return;
        }

        const { id: activeId } = active;
        const { id: overId } = over;

        if (activeId in items) {
            return; // Prevent dropping on other zones
        }

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
                const newOverZoneItems = [...items[overZone]];
                newOverZoneItems.splice(items[overZone].indexOf(overId), 0, activeId);

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
                    <DropZone id="zone1" items={items.zone1} setItems={(newItems) => { setItems((prev) => ({ ...prev, zone1: newItems })); }} />
                </SortableContext>
                <SortableContext items={items.zone2} strategy={verticalListSortingStrategy}>
                    <DropZone id="zone2" items={items.zone2} setItems={(newItems) => { setItems((prev) => ({ ...prev, zone2: newItems })); }} />
                </SortableContext>
            </div>
        </DndContext>
    );
};

export default Leel;
