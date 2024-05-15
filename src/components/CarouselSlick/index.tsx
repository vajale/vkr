import React, { type FC, useEffect, useRef } from "react";
// Нужен пакет типов yarn add -D @types/react-slick`
import type Slider from "react-slick";

// Styles
import { StyledCarouselSlick } from "./Styled";
import "./Styled/CarouselSlick.scss";

import Arrow from "@/assets/svg/Arrow.svg";

interface ArrowProps {
    onClick?: () => void;
    className?: string;
}

interface CarouselSlickProps {
    visibleItems: number;
    activeIndex?: number;
    className: string[];
    infinite?: boolean;
}

const NextArrow: FC<ArrowProps> = ({ onClick }) => {
    return (
        <div className={`carousel-slick__button carousel-slick__button--right`} onClick={onClick}>
            <img alt={"arrow"} src={Arrow} className="carousel-slick__arrow" />
        </div>
    );
};

const PrevArrow: FC<ArrowProps> = ({ onClick }) => {
    return (
        <div className={`carousel-slick__button carousel-slick__button--left`} onClick={onClick}>
            <img alt={"arrow"} src={Arrow} className="carousel-slick__arrow" />
        </div>
    );
};

export const CarouselSlick: React.FC<CarouselSlickProps> = ({
    children,
    visibleItems,
    activeIndex = 0,
    className,
    infinite = true,
}) => {
    const sliderRef = useRef<Slider>();

    useEffect(() => {
        if (activeIndex >= 0 && sliderRef?.current) {
            sliderRef.current.slickGoTo(activeIndex);
        }
    }, [activeIndex]);

    const settings = {
        dots: false,
        infinite,
        slidesToShow: visibleItems,
        centerPadding: "0px",
        useTransform: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <StyledCarouselSlick ref={sliderRef} {...settings} className={className}>
            {children}
        </StyledCarouselSlick>
    );
};
