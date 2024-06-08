import { useState } from "react";

export const useClickPosition = () => {
    const [position, setPosition] = useState({ x: null, y: null });

    const handleClick = (event) => {
        const x = event.clientX;
        const y = event.clientY;
        setPosition({ x, y });
    };

    return { position, handleClick };
};
