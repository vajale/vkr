import React from "react";
import { CarouselSlick } from "@/components/CarouselSlick";
import { StyledCarousel } from "@/components/StatickBlocks/Landing/Carousel/styled";
import { ContentWrapper } from "@/components/StatickBlocks/Landing/ContentWrapper";

const LandingCarousel = () => {
    return (
        <ContentWrapper>
            <StyledCarousel>
                <CarouselSlick
                    visibleItems={1}
                    infinite={true}
                    className={["carousel-items"]}></CarouselSlick>
            </StyledCarousel>
        </ContentWrapper>
    );
};

export default LandingCarousel;
