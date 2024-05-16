import { Box } from "@mui/material";
import React, { type CSSProperties } from "react";

import "./CarouselItem.scss";

interface ICarouselItemProps {
    children: React.ReactNode;
    visibleItems?: number;
    style?: CSSProperties;
    onClick?: () => void;
    onDoubleClick?: () => void;
}

export const CarouselItem = ({ children, visibleItems, onClick }: ICarouselItemProps) => {
    const itemWidth = visibleItems ? 100 / visibleItems : 100;

    return (
        <Box onClick={onClick} className="carousel-item" style={{ width: itemWidth + "%" }}>
            {children}
        </Box>
    );
};

export default CarouselItem;
