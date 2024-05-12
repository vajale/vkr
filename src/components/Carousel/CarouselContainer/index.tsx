import React from "react";

// Components
import { Box } from "@mui/material";

// Styles
import "./CarouselContainer.scss";

interface ICarouselProps {
  children: React.ReactNode;
  activeIndex: number;
  visibleItems?: number;
}

const CarouselContainer = ({ children, activeIndex, visibleItems }: ICarouselProps) => {
  const offset = visibleItems ? 100 / visibleItems : 100;

  return (
    <Box className="carousel-container">
      <Box className="carousel-container__inner" style={{ left: -1 * activeIndex * offset + "%" }}>
        {children}
      </Box>
    </Box>
  );
};

export default CarouselContainer;
