import React from "react";
import { StyledCarouselContent } from "@/components/StatickBlocks/Landing/Carousel/content/styled";
import { type ICarouselContent } from "./types";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useFetchLandingDataQuery } from "@/api/landing";

export const CarouselContent = ({ lHeader, header, title, imgId, index }: ICarouselContent) => {
    const { data, isFetching } = useFetchLandingDataQuery({ imageId: imgId });

    const getImageComponent = () => {
        if (isFetching) {
            return <CircularProgress />;
        }

        return <img src={data} alt="logo" className={"logo"} />;
    };

    return (
        <StyledCarouselContent>
            <div className={"description-wrapper"}>
                <div className={"description"}>
                    <div className={"header-large"}>{lHeader}</div>
                    <div className={"header"}>{header}</div>
                    <div className={"title"}>{title}</div>
                </div>
                <Stack gap={5}>
                    <Button className={"try-free"}>
                        <p>попробывать бесплатно</p>
                    </Button>
                    <div className={"counter-wrapper"}>
                        <span className={"counter-value"}>{"0." + index}</span>
                        <span className={"counter"}>
                            Листайте, чтобы узнать подробнее о сервисе
                        </span>
                    </div>
                </Stack>
            </div>
            <div className={"image-wrapper"}>{getImageComponent()}</div>
        </StyledCarouselContent>
    );
};
