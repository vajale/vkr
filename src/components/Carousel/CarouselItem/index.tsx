import { Box } from "@mui/material";
import React, { CSSProperties } from "react";

import useSingleAndDoubleClick from "@/hooks/useSingleAndDoubleClick";
import "./CarouselItem.scss";

interface ICarouselItemProps {
  children: React.ReactNode;
  visibleItems?: number;
  style?: CSSProperties;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

export const CarouselItem = ({
  children,
  visibleItems,
  onClick,
  onDoubleClick,
}: ICarouselItemProps) => {
  const itemWidth = visibleItems ? 100 / visibleItems : 100;

  const click = useSingleAndDoubleClick(onClick, onDoubleClick);

  return (
    <Box onClick={click} className="carousel-item" style={{ width: itemWidth + "%" }}>
      {children}
    </Box>
  );
};

export default CarouselItem;
