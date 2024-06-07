import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { type Task } from '@/components/PageView/model/types';
import { CSS } from '@dnd-kit/utilities';

interface Props {
    task: Task,
    children: React.ReactNode
}

const Draggable = ({ task, children }: Props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
        data: {
            task
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
            {children}
        </div>
    );
};

export default Draggable;
