import React from "react";
import { CarouselSlick } from "@/components/CarouselSlick";
import { StyledCarousel } from "@/components/StatickBlocks/Landing/Carousel/styled";
import { ContentWrapper } from "@/components/StatickBlocks/Landing/ContentWrapper";
import { CarouselContent } from "@/components/StatickBlocks/Landing/Carousel/content";
import { LANDING_MAIN_CAROUSEL } from "@/components/StatickBlocks/Landing/Carousel/constants";

const LandingCarousel = () => {
    const getCarouselContent = () => {
        return LANDING_MAIN_CAROUSEL.map(({ imgId, title, lHeader, header }, index) => (
            <CarouselContent
                key={imgId}
                imgId={imgId}
                lHeader={lHeader}
                header={header}
                title={title}
                index={index}
            />
        ));
    };

    return (
        <ContentWrapper>
            <StyledCarousel>
                <CarouselSlick visibleItems={1} infinite={true} className={["carousel-items"]}>
                    {getCarouselContent()}
                </CarouselSlick>
            </StyledCarousel>
        </ContentWrapper>
    );
};

export default LandingCarousel;
