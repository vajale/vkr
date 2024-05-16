import React, { useEffect, useState } from "react";

// Components
import { Box } from "@mui/material";
import CarouselContainer from "@/components/Carousel/CarouselContainer";

// Assets
import ArrowRight from "@/assets/svg/arrowRightMini.svg";
import ArrowLeft from "@/assets/svg/arrowLeftMini.svg";

// Styles
import "./Carousel.scss";

interface IProps {
    children: React.ReactNode;
    itemsLength: number;
    visibleItems: number;
    className?: string;
    activeIndex: number;
}

const Carousel = ({
    children,
    itemsLength,
    visibleItems,
    className,
    activeIndex: activeIdx,
}: IProps) => {
    const [startVisibleIndex, setStartVisibleIndex] = useState(0);

    useEffect(() => {
        const endVisibleIndex = startVisibleIndex + visibleItems - 1;
        if (activeIdx >= 0 && visibleItems) {
            if (activeIdx < startVisibleIndex) {
                setStartVisibleIndex(activeIdx);
            } else if (activeIdx > endVisibleIndex) {
                setStartVisibleIndex(activeIdx - visibleItems + 1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIdx, visibleItems]);

    const updateIndex = (newIndex: number) => {
        if (newIndex < 0) {
            newIndex = itemsLength - 1;
        } else if (newIndex >= itemsLength) {
            newIndex = 0;
        }

        setStartVisibleIndex(newIndex);
    };

    const isPrevBtnDisabled = startVisibleIndex === 0;
    const isNextBtnDisabled = itemsLength - startVisibleIndex === visibleItems;

    const onPrevClick = () => {
        if (!isPrevBtnDisabled) {
            updateIndex(startVisibleIndex - 1);
        }
    };
    const onNextClick = () => {
        if (!isNextBtnDisabled) {
            updateIndex(startVisibleIndex + 1);
        }
    };

    return (
        <Box className={`carousel ${className}`}>
            {itemsLength > visibleItems && (
                <Box
                    className={`carousel__button carousel__button--left ${
                        isPrevBtnDisabled && "carousel__button--disabled"
                    }`}
                    onClick={onPrevClick}>
                    <div>Arrow left</div>
                </Box>
            )}
            <CarouselContainer activeIndex={startVisibleIndex} visibleItems={visibleItems}>
                {children}
            </CarouselContainer>
            {itemsLength > visibleItems && (
                <Box
                    className={`carousel__button carousel__button--right ${
                        isNextBtnDisabled && "carousel__button--disabled"
                    }`}
                    onClick={onNextClick}>
                    <div>Arrow right</div>
                </Box>
            )}
        </Box>
    );
};

export default Carousel;
